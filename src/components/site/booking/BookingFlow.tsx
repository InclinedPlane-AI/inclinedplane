/**
 * The assessment booking flow, shared by the booking dialog and /assessment:
 *
 *   time          pick a slot in the Calendly embed (collects name + work email)
 *   → booked      the embed posts `calendly.event_scheduled`; we navigate to
 *                 /assessment/thank-you (a page on our domain, so every booking
 *                 is a trackable page view). The three optional questions live
 *                 on that page.
 *
 *   no-slot       fallback: "Can't find a time?" → details + questions → Formspree
 *   no-slot-done
 */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { track } from "@vercel/analytics";
import { booking, site } from "@/content/site";
import { CalendarPanel, type ScheduledEvent } from "./CalendarPanel";
import { AssessmentForm } from "./AssessmentForm";
import { Button } from "../primitives";

export type BookingStep = "time" | "no-slot" | "no-slot-done";

export const THANK_YOU_PATH = "/assessment/thank-you";

/** Router state handed to the thank-you page. */
export interface BookedState extends ScheduledEvent {
  source?: string;
}

export const stepTitles: Record<BookingStep, string> = {
  time: "Pick a time that suits you",
  "no-slot": "Tell us how to reach you",
  "no-slot-done": "Thanks. We’ll be in touch",
};

export function stepLabel(step: BookingStep) {
  return step === "time" ? "AI Data Readiness Assessment · Step 1 of 2" : "AI Data Readiness Assessment";
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
  const navigate = useNavigate();
  const [step, setStep] = useState<BookingStep>("time");

  useEffect(() => onStepChange?.(step), [step, onStepChange]);

  const onScheduled = useCallback(
    (e: ScheduledEvent) => {
      track("assessment_booked", { source });
      const state: BookedState = { ...e, source };
      navigate(THANK_YOU_PATH, { state });
    },
    [navigate, source],
  );

  if (step === "time") {
    return (
      <div className="mt-4 flex flex-col gap-4">
        <p className="m-0 text-[15px] leading-[1.55] text-ip-body">
          Free, {booking.durationMinutes} minutes, on your own data. Choose a slot; the booking asks only for your name and work email.
        </p>
        <CalendarPanel height={calendarHeight} source={source} onScheduled={onScheduled} />
        <p className="m-0 text-[14px] text-ip-body">
          Can’t find a time that works?{" "}
          <button type="button" className="ip-link min-h-0 text-[14px] font-medium" onClick={() => setStep("no-slot")}>
            Send us your details instead
          </button>
        </p>
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
        We’ve got your details and will email you to find a time. If it’s urgent, write to {site.email}.
      </p>
      {onClose && (
        <Button size="md" variant="secondary" onClick={onClose}>
          Close
        </Button>
      )}
    </div>
  );
}
