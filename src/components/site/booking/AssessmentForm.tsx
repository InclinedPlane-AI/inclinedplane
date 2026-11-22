/**
 * Booking forms, posting to the existing Formspree form (no new backend).
 *
 *  variant="after-booking": the founder's three OPTIONAL questions (role, main
 *    platform, biggest blocker) plus the work email used to book, so the
 *    answers can be matched to the Calendly booking. Sends the booking IDs.
 *  variant="no-slot": fallback when no time suits: name + work email + the
 *    three questions + an optional note. We reply by email to find a time.
 *
 * Any field can be pre-filled from the URL (outbound links):
 *   ?name=&email=&role=&platform=&blocker=
 */
import { useId, useMemo, useState, type FormEvent } from "react";
import { booking } from "@/content/site";
import { Button, ArrowIcon } from "../primitives";
import type { ScheduledEvent } from "./CalendarPanel";
import { cn } from "@/lib/utils";

export interface AssessmentAnswers {
  name: string;
  email: string;
  role: string;
  platform: string;
  blocker: string;
  note: string;
}

const fieldClass =
  "w-full font-sans text-[15px] font-normal min-h-[44px] px-3 py-2 border border-ip-rule-dashed rounded-[6px] bg-white text-black box-border focus:outline-2 focus:outline-ip-orange-ink focus:outline-offset-1";

export function readPrefill(): Partial<AssessmentAnswers> {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const pick = (k: string, list: readonly string[]) => {
    const v = p.get(k);
    return v ? (list.find((o) => o.toLowerCase() === v.toLowerCase()) ?? "") : "";
  };
  return {
    // `invitee_*` are what Calendly appends when it redirects to our thank-you page.
    name: p.get("name") ?? p.get("invitee_full_name") ?? "",
    email: p.get("email") ?? p.get("invitee_email") ?? "",
    role: pick("role", booking.questions.role),
    platform: pick("platform", booking.questions.platform),
    blocker: pick("blocker", booking.questions.blocker),
  };
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function postToFormspree(payload: Record<string, string>) {
  const res = await fetch(booking.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ page: window.location.href, ...payload }),
  });
  if (!res.ok) throw new Error(String(res.status));
}

export function AssessmentForm({
  variant,
  source,
  scheduled,
  onSubmitted,
  onSkip,
  onBack,
}: {
  variant: "after-booking" | "no-slot";
  source: string;
  scheduled?: ScheduledEvent | null;
  onSubmitted: (answers: AssessmentAnswers) => void;
  onSkip?: () => void;
  onBack?: () => void;
}) {
  const uid = useId();
  const prefill = useMemo(readPrefill, []);
  const [a, setA] = useState<AssessmentAnswers>({
    name: prefill.name ?? "",
    email: prefill.email ?? "",
    role: prefill.role ?? "",
    platform: prefill.platform ?? "",
    blocker: prefill.blocker ?? "",
    note: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const set = (k: keyof AssessmentAnswers) => (e: { target: { value: string } }) => setA((x) => ({ ...x, [k]: e.target.value }));
  const noSlot = variant === "no-slot";

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    const next: typeof errors = {};
    if (!EMAIL_RE.test(a.email))
      next.email = noSlot ? "Enter a work email like name@company.com." : "Enter the email you booked with, so we can match your answers.";
    if (noSlot && !a.name.trim()) next.name = "Tell us your name.";
    setErrors(next);
    if (Object.keys(next).length) return;
    if (honeypot) return onSubmitted(a);
    setStatus("sending");
    try {
      await postToFormspree({
        _subject: noSlot ? "Assessment request (no slot booked)" : "Assessment booked: answers to the three questions",
        formType: noSlot ? "assessment-no-slot" : "assessment-booked",
        source,
        name: a.name || "Not given",
        email: a.email,
        role: a.role || "Not given",
        platform: a.platform || "Not given",
        blocker: a.blocker || "Not given",
        note: a.note || "",
        calendlyEvent: scheduled?.eventUri ?? "",
        calendlyInvitee: scheduled?.inviteeUri ?? "",
      });
      setStatus("idle");
      onSubmitted(a);
    } catch {
      setStatus("error");
    }
  }

  const selects: { key: "role" | "platform" | "blocker"; label: string; options: readonly string[] }[] = [
    { key: "role", label: "Your role", options: booking.questions.role },
    { key: "platform", label: "Main data platform", options: booking.questions.platform },
    { key: "blocker", label: "Biggest blocker", options: booking.questions.blocker },
  ];

  const textField = (key: "name" | "email", label: string, type: string, auto: string, placeholder: string) => {
    const id = `${uid}-${key}`;
    const err = errors[key];
    return (
      <label htmlFor={id} className="flex flex-col gap-1.5 font-semibold">
        {label}
        <input
          id={id}
          type={type}
          autoComplete={auto}
          placeholder={placeholder}
          className={cn(fieldClass, err && "border-[#b42318]")}
          value={a[key]}
          onChange={set(key)}
          aria-invalid={!!err}
          aria-describedby={err ? `${id}-err` : undefined}
          required
        />
        {err && (
          <span id={`${id}-err`} className="text-[13px] font-normal text-[#b42318]">
            {err}
          </span>
        )}
      </label>
    );
  };

  return (
    <form onSubmit={submit} noValidate className="mt-5 flex flex-col gap-3.5 text-[15px]">
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
        {noSlot && textField("name", "Your name", "text", "name", "Jane Smith")}
        {textField("email", noSlot ? "Work email" : "Work email you booked with", "email", "email", "name@company.com")}
        {selects.map((s) => {
          const id = `${uid}-${s.key}`;
          return (
            <label key={s.key} htmlFor={id} className="flex flex-col gap-1.5 font-semibold">
              <span>
                {s.label} <span className="font-normal text-ip-muted">(optional)</span>
              </span>
              <select id={id} className={fieldClass} value={a[s.key]} onChange={set(s.key)}>
                <option value="">Select</option>
                {s.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          );
        })}
        {noSlot && (
          <label htmlFor={`${uid}-note`} className="flex flex-col gap-1.5 font-semibold sm:col-span-2">
            <span>
              Times that suit you, or anything else <span className="font-normal text-ip-muted">(optional)</span>
            </span>
            <textarea id={`${uid}-note`} rows={3} className={cn(fieldClass, "min-h-[88px]")} value={a.note} onChange={set("note")} />
          </label>
        )}
      </div>
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
      <div className="mt-1.5 flex flex-wrap items-center gap-3">
        <Button type="submit" size="md" disabled={status === "sending"}>
          {status === "sending" ? "Sending" : noSlot ? "Send my details" : "Send my answers"}
          <ArrowIcon size={16} />
        </Button>
        {onBack && (
          <Button type="button" size="md" variant="secondary" onClick={onBack}>
            Back
          </Button>
        )}
        {onSkip && (
          <button type="button" onClick={onSkip} className="ip-link min-h-[44px] text-[14px] font-medium">
            Skip the questions
          </button>
        )}
      </div>
    </form>
  );
}
