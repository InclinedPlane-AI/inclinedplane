/**
 * Inline product demo request (light design system). Posts the same payload
 * to the same Formspree form as the previous RequestDemo dialog and /contact,
 * so triage in the inbox is unchanged.
 */
import { useId, useState, type FormEvent } from "react";
import { PRODUCTS, type ProductId } from "@/data/products";
import { site } from "@/content/site";
import { Button, Label } from "../primitives";
import { cn } from "@/lib/utils";

const FORM_ENDPOINT = "https://formspree.io/f/xwvnakbz";

const fieldClass =
  "w-full font-sans text-[15px] font-normal min-h-[44px] px-3 py-2 border border-ip-rule-dashed rounded-[6px] bg-white text-black box-border focus:outline-2 focus:outline-ip-orange-ink focus:outline-offset-1";

export function DemoRequest({
  initial,
  id = "demo-request",
  title = "See it on a real estate.",
  intro = "A focused session with the engineers who built it. You’ll see the product working, not slides.",
}: {
  initial: ProductId[];
  id?: string;
  title?: string;
  intro?: string;
}) {
  const uid = useId();
  const [selected, setSelected] = useState<ProductId[]>(initial);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", notes: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  const chosen = PRODUCTS.filter((p) => selected.includes(p.id));
  const toggle = (pid: ProductId) =>
    setSelected((prev) => (prev.includes(pid) ? (prev.length > 1 ? prev.filter((p) => p !== pid) : prev) : [...prev, pid]));
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const honeypot = (e.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setError("Add your name and a work email like name@company.com.");
      return;
    }
    setError(null);
    if (honeypot) {
      setStatus("done");
      return;
    }
    setStatus("sending");
    try {
      const names = chosen.map((p) => p.name).join(" + ");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Demo request: ${names}`,
          type: "Product demo request",
          products: names,
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          role: form.role.trim(),
          message: form.notes.trim(),
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id={id} className="bg-ip-grey border-t border-ip-rule">
      <div className="ip-container ip-section grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Label className="mb-4">Request a demo</Label>
          <h2 className="ip-h2 m-0">{title}</h2>
          <p className="mt-4 mb-0 max-w-[520px] text-[17px] leading-[1.6] text-ip-body">{intro}</p>
          <div className="mt-8 border-t-2 border-black">
            {chosen.map((p) => (
              <div key={p.id} className="border-b border-ip-rule-strong py-5">
                <p className="m-0 text-[17px] font-semibold">
                  {p.name} <span className="font-normal text-ip-muted">· {p.tagline}</span>
                </p>
                <ul className="mt-3 mb-0 space-y-1.5 pl-[18px] text-[15px] leading-[1.5] text-ip-body">
                  {p.demoAgenda.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-ip-rule-strong bg-white p-6 sm:p-8">
          {status === "done" ? (
            <div role="status" className="flex min-h-[320px] flex-col justify-center">
              <p className="m-0 text-[22px] font-semibold">Request received.</p>
              <p className="mt-3 mb-0 text-[16px] leading-[1.6] text-ip-body">
                Thanks{form.name ? `, ${form.name.trim().split(" ")[0]}` : ""}. We’ll write to {form.email.trim()} to schedule your{" "}
                {chosen.map((p) => p.name).join(" and ")} demo.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-4 text-[15px]">
              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-2 font-semibold">Which product?</legend>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCTS.map((p) => {
                    const on = selected.includes(p.id);
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => toggle(p.id)}
                        aria-pressed={on}
                        className={cn(
                          "rounded-lg border p-3 text-left transition-colors duration-150",
                          on ? "border-black bg-ip-orange-tint" : "border-ip-rule-strong hover:border-black",
                        )}
                      >
                        <span className="block text-[15px] font-semibold">{p.name}</span>
                        <span className="mt-0.5 block text-[12px] text-ip-muted">{p.kicker}</span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    ["name", "Name", "text", "name", true],
                    ["email", "Work email", "email", "email", true],
                    ["company", "Company", "text", "organization", false],
                    ["role", "Role", "text", "organization-title", false],
                  ] as const
                ).map(([k, label, type, ac, req]) => (
                  <label key={k} htmlFor={`${uid}-${k}`} className="flex flex-col gap-1.5 font-semibold">
                    <span>
                      {label}
                      {!req && <span className="font-normal text-ip-muted"> (optional)</span>}
                    </span>
                    <input id={`${uid}-${k}`} type={type} autoComplete={ac} className={fieldClass} value={form[k]} onChange={set(k)} required={req} />
                  </label>
                ))}
              </div>
              <label htmlFor={`${uid}-notes`} className="flex flex-col gap-1.5 font-semibold">
                <span>
                  Anything we should know? <span className="font-normal text-ip-muted">(optional)</span>
                </span>
                <textarea id={`${uid}-notes`} rows={3} className={cn(fieldClass, "min-h-[96px] resize-y")} value={form.notes} onChange={set("notes")} />
              </label>
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
              {error && (
                <p role="alert" className="m-0 text-[14px] text-[#b42318]">
                  {error}
                </p>
              )}
              {status === "error" && (
                <p role="alert" className="m-0 text-[14px] text-[#b42318]">
                  That didn’t send. Try again, or email{" "}
                  <a className="underline" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </p>
              )}
              <div>
                <Button type="submit" size="md" disabled={status === "sending"}>
                  {status === "sending" ? "Sending" : "Request a demo"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
