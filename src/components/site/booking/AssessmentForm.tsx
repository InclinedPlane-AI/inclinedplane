/**
 * The five qualifying questions + work email (founder's assessment flow).
 * Posts to the existing Formspree form used by /contact, so no new backend.
 * Only role and work email are required (brief §7.6). Any field can be
 * pre-filled from the URL for outbound links: ?role=&size=&platform=&stage=&blocker=&email=
 */
import { useId, useMemo, useState, type FormEvent } from "react";
import { booking } from "@/content/site";
import { Button, ArrowIcon } from "../primitives";
import { cn } from "@/lib/utils";

export interface AssessmentAnswers {
  role: string;
  companySize: string;
  platform: string;
  aiStage: string;
  blocker: string;
  email: string;
}

const fieldClass =
  "w-full font-sans text-[15px] font-normal min-h-[44px] px-3 py-2 border border-ip-rule-dashed rounded-[6px] bg-white text-black box-border focus:outline-2 focus:outline-ip-orange-ink focus:outline-offset-1";

function readPrefill(): Partial<AssessmentAnswers> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const pick = (k: string, list: readonly string[]) => {
    const v = p.get(k);
    if (!v) return "";
    return list.find((o) => o.toLowerCase() === v.toLowerCase()) ?? "";
  };
  return {
    role: pick("role", booking.questions.role),
    companySize: pick("size", booking.questions.companySize),
    platform: pick("platform", booking.questions.platform),
    aiStage: pick("stage", booking.questions.aiStage),
    blocker: pick("blocker", booking.questions.blocker),
    email: p.get("email") ?? "",
  };
}

export function AssessmentForm({
  source,
  onSubmitted,
  compact = false,
}: {
  source: string;
  onSubmitted: (answers: AssessmentAnswers) => void;
  compact?: boolean;
}) {
  const uid = useId();
  const prefill = useMemo(readPrefill, []);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    role: prefill.role ?? "",
    companySize: prefill.companySize ?? "",
    platform: prefill.platform ?? "",
    aiStage: prefill.aiStage ?? "",
    blocker: prefill.blocker ?? "",
    email: prefill.email ?? "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<{ role?: string; email?: string }>({});

  const set = (k: keyof AssessmentAnswers) => (e: { target: { value: string } }) =>
    setAnswers((a) => ({ ...a, [k]: e.target.value }));

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    const next: typeof errors = {};
    if (!answers.role) next.role = "Choose the role closest to yours.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) next.email = "Enter a work email like name@company.com.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (honeypot) {
      onSubmitted(answers);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(booking.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "AI Data Readiness Assessment request",
          formType: "assessment",
          source,
          page: window.location.href,
          role: answers.role,
          companySize: answers.companySize || "Not given",
          platform: answers.platform || "Not given",
          aiStage: answers.aiStage || "Not given",
          blocker: answers.blocker || "Not given",
          email: answers.email,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("idle");
      onSubmitted(answers);
    } catch {
      setStatus("error");
    }
  }

  const selects: { key: keyof AssessmentAnswers; label: string; options: readonly string[]; required?: boolean }[] = [
    { key: "role", label: "Your role", options: booking.questions.role, required: true },
    { key: "companySize", label: "Company size", options: booking.questions.companySize },
    { key: "platform", label: "Main data platform", options: booking.questions.platform },
    { key: "aiStage", label: "Where is AI in your organization today?", options: booking.questions.aiStage },
    { key: "blocker", label: "Biggest blocker", options: booking.questions.blocker },
  ];

  return (
    <form onSubmit={submit} noValidate className={cn("flex flex-col gap-3.5 text-[15px]", compact ? "" : "mt-5")}>
      <div className={cn("grid gap-3.5", compact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2")}>
        {selects.map((s) => {
          const id = `${uid}-${s.key}`;
          const err = s.key === "role" ? errors.role : undefined;
          return (
            <label key={s.key} htmlFor={id} className="flex flex-col gap-1.5 font-semibold">
              <span>
                {s.label}
                {!s.required && <span className="font-normal text-ip-muted"> (optional)</span>}
              </span>
              <select
                id={id}
                className={cn(fieldClass, err && "border-[#b42318]")}
                value={answers[s.key]}
                onChange={set(s.key)}
                aria-invalid={!!err}
                aria-describedby={err ? `${id}-err` : undefined}
                required={s.required}
              >
                <option value="">Select</option>
                {s.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              {err && (
                <span id={`${id}-err`} className="text-[13px] font-normal text-[#b42318]">
                  {err}
                </span>
              )}
            </label>
          );
        })}
        <label htmlFor={`${uid}-email`} className="flex flex-col gap-1.5 font-semibold">
          Work email
          <input
            id={`${uid}-email`}
            type="email"
            autoComplete="email"
            placeholder="name@company.com"
            className={cn(fieldClass, errors.email && "border-[#b42318]")}
            value={answers.email}
            onChange={set("email")}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? `${uid}-email-err` : undefined}
            required
          />
          {errors.email && (
            <span id={`${uid}-email-err`} className="text-[13px] font-normal text-[#b42318]">
              {errors.email}
            </span>
          )}
        </label>
      </div>
      {/* Formspree honeypot */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {status === "error" && (
        <p role="alert" className="m-0 text-[14px] text-[#b42318]">
          That didn’t send. Check your connection and try again, or email{" "}
          <a className="underline" href="mailto:support@inclinedplane.com">
            support@inclinedplane.com
          </a>
          .
        </p>
      )}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-1.5">
        <Button type="submit" size="md" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : "Next: pick a time"}
          <ArrowIcon size={16} />
        </Button>
        <span className="text-[13px] text-ip-muted">Takes about a minute.</span>
      </div>
    </form>
  );
}
