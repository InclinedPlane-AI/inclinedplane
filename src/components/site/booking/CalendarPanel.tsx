/**
 * Booking calendar. Uses a plain Calendly iframe (no third-party script),
 * mounted only when this panel renders. Until `booking.calendarConfigured`
 * is true, staging shows a clearly marked placeholder and production shows
 * an email fallback.
 */
import { booking, site } from "@/content/site";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { VerifyBadge } from "../primitives";

export function CalendarPanel({ email, height = 620 }: { email?: string; height?: number }) {
  if (booking.calendarConfigured) {
    const params = new URLSearchParams({ hide_gdpr_banner: "1", primary_color: "f47920" });
    if (email) params.set("email", email);
    if (typeof window !== "undefined") params.set("embed_domain", window.location.host);
    params.set("embed_type", "Inline");
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
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-ip-rule-dashed bg-ip-grey px-6 py-10 text-center" style={{ minHeight: Math.min(height, 300) }}>
      {SHOW_UNVERIFIED && <VerifyBadge />}
      <p className="m-0 text-[17px] font-semibold text-black">Pick a {booking.durationMinutes}-minute slot</p>
      <p className="m-0 max-w-[380px] text-[15px] leading-[1.55] text-ip-body">
        {SHOW_UNVERIFIED
          ? "The booking calendar connects here once the Calendly link is set in src/content/site.ts."
          : "Email us two or three times that suit you and we’ll send an invite."}
      </p>
      <a
        className="ip-link text-[15px]"
        href={`mailto:${site.email}?subject=${encodeURIComponent("AI Data Readiness Assessment: times")}${email ? `&body=${encodeURIComponent(`From: ${email}`)}` : ""}`}
      >
        {site.email}
      </a>
    </div>
  );
}
