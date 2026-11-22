/**
 * Booking calendar: a plain Calendly inline iframe (no Calendly script). With
 * `embed_domain` + `embed_type=Inline` set, Calendly posts
 * `calendly.event_scheduled` to this window when someone books, which is how
 * the flow advances and how we get the booking's IDs without a paid webhook.
 *
 * Until `booking.calendarConfigured` is true: staging shows a marked
 * placeholder (with a button to walk through the flow), production shows an
 * email fallback.
 */
import { useEffect } from "react";
import { booking, site } from "@/content/site";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { Button, VerifyBadge } from "../primitives";

export interface ScheduledEvent {
  eventUri?: string;
  inviteeUri?: string;
}

export function CalendarPanel({
  email,
  name,
  height = 620,
  onScheduled,
}: {
  email?: string;
  name?: string;
  height?: number;
  onScheduled?: (e: ScheduledEvent) => void;
}) {
  useEffect(() => {
    if (!onScheduled || !booking.calendarConfigured) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      const data = e.data as { event?: string; payload?: { event?: { uri?: string }; invitee?: { uri?: string } } };
      if (data?.event === "calendly.event_scheduled") {
        onScheduled({ eventUri: data.payload?.event?.uri, inviteeUri: data.payload?.invitee?.uri });
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onScheduled]);

  if (booking.calendarConfigured) {
    const params = new URLSearchParams({ hide_gdpr_banner: "1", primary_color: "f47920", embed_type: "Inline" });
    if (typeof window !== "undefined") params.set("embed_domain", window.location.host);
    if (email) params.set("email", email);
    if (name) params.set("name", name);
    return (
      <iframe
        title={`Pick a time for a ${booking.durationMinutes}-minute AI Data Readiness Assessment`}
        src={`${booking.calendlyUrl}?${params.toString()}`}
        loading="lazy"
        className="w-full rounded-lg border border-ip-rule bg-white"
        style={{ height }}
      />
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-ip-rule-dashed bg-ip-grey px-6 py-10 text-center"
      style={{ minHeight: Math.min(height, 300) }}
    >
      {SHOW_UNVERIFIED && <VerifyBadge />}
      <p className="m-0 text-[17px] font-semibold text-black">Pick a {booking.durationMinutes}-minute slot</p>
      <p className="m-0 max-w-[400px] text-[15px] leading-[1.55] text-ip-body">
        {SHOW_UNVERIFIED
          ? "The Calendly calendar appears here once its link is set in src/content/site.ts. It collects name and work email."
          : "Email us two or three times that suit you and we’ll send an invite."}
      </p>
      {SHOW_UNVERIFIED && onScheduled ? (
        <Button size="md" variant="secondary" onClick={() => onScheduled({})}>
          Preview the next step
        </Button>
      ) : (
        <a
          className="ip-link text-[15px]"
          href={`mailto:${site.email}?subject=${encodeURIComponent("AI Data Readiness Assessment: times")}${email ? `&body=${encodeURIComponent(`From: ${email}`)}` : ""}`}
        >
          {site.email}
        </a>
      )}
    </div>
  );
}
