/**
 * The assessment booking flow (founder's homepage, 22 Nov 2026), shared by
 * the booking dialog and the /assessment page:
 *
 *   time       pick a slot in Calendly (collects name + work email)
 *   questions  three optional questions → Formspree, tagged with the booking
 *   done       "A calendar invite is on its way…"
 *
 *   no-slot    fallback: "Can't find a time?" → details + questions → Formspree
 *   no-slot-done
 */
import { useCallback, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { booking, site } from "@/content/site";
import { CalendarPanel, type ScheduledEvent } from "./CalendarPanel";
import { AssessmentForm } from "./AssessmentForm";
import { Button } from "../primitives";

export type BookingStep = "time" | "questions" | "done" | "no-slot" | "no-slot-done";

export const stepTitles: Record<BookingStep, string> = {
  time: "Pick a time that suits you",
  questions: "Three quick questions",
  done: "You’re booked",
  "no-slot": "Tell us how to reach you",
  "no-slot-done": "Thanks. We’ll be in touch",
};

export function stepLabel(step: BookingStep) {
  const base = "AI Data Readiness Assessment";
  if (step === "time") return `${base} · Step 1 of 2`;
  if (step === "questions") return `${base} · Step 2 of 2`;
  return base;
}

export function BookingFlow({
  source,
  calendarHeight = 600,
  onStepChange,
  onClose,
}: {
  source: string;
  calendarHeight?: number;
  onStepChange?: (step: BookingStep) => void;
  onClose?: () => void;
}) {
  const [step, setStep] = useState<BookingStep>("time");
  const [scheduled, setScheduled] = useState<ScheduledEvent | null>(null);

  useEffect(() => onStepChange?.(step), [step, onStepChange]);

  const onScheduled = useCallback(
    (e: ScheduledEvent) => {
      setScheduled(e);
      setStep("questions");
      track("assessment_booked", { source });
    },
    [source],
  );

  if (step === "time") {
    return (
      <div className="mt-4 flex flex-col gap-4">
        <p className="m-0 text-[15px] leading-[1.55] text-ip-body">
          Free, {booking.durationMinutes} minutes, on your own data. Choose a slot; the booking asks only for your name and work email.
        </p>
        <CalendarPanel height={calendarHeight} onScheduled={onScheduled} />
        <p className="m-0 text-[14px] text-ip-body">
          Can’t find a time that works?{" "}
          <button type="button" className="ip-link min-h-0 text-[14px] font-medium" onClick={() => setStep("no-slot")}>
            Send us your details instead
          </button>
        </p>
      </div>
    );
  }

  if (step === "questions") {
    return (
      <div className="mt-4">
        <p className="m-0 text-[15px] leading-[1.55] text-ip-body">Optional, but it lets us spend the {booking.durationMinutes} minutes on your data, not on background.</p>
        <AssessmentForm
          variant="after-booking"
          source={source}
          scheduled={scheduled}
          onSubmitted={() => {
            track("assessment_answers", { source });
            setStep("done");
          }}
          onSkip={() => setStep("done")}
          onBack={booking.calendarConfigured ? undefined : () => setStep("time")}
        />
      </div>
    );
  }

  if (step === "no-slot") {
    return (
      <div className="mt-4">
        <p className="m-0 text-[15px] leading-[1.55] text-ip-body">We’ll reply by email to find a time that suits you.</p>
        <AssessmentForm
          variant="no-slot"
          source={source}
          onSubmitted={() => {
            track("assessment_no_slot", { source });
            setStep("no-slot-done");
          }}
          onBack={() => setStep("time")}
        />
      </div>
    );
  }

  return (
    <div className="mt-4 flex flex-col items-start gap-4">
      <p className="m-0 text-[15px] leading-[1.55] text-ip-body">
        {step === "done"
          ? "A calendar invite is on its way to your inbox. We will review your answers before the call."
          : `We’ve got your details and will email you to find a time. If it’s urgent, write to ${site.email}.`}
      </p>
      {onClose && (
        <Button size="md" variant="secondary" onClick={onClose}>
          Close
        </Button>
      )}
    </div>
  );
}
