/**
 * /assessment/thank-you — where a completed booking lands.
 *
 * Reached two ways:
 *  1. From our booking dialog or /assessment: the Calendly embed posts
 *     `calendly.event_scheduled` and BookingFlow navigates here (router state
 *     carries the Calendly event/invitee IDs and the CTA source).
 *  2. Directly from Calendly, if its "redirect to an external site" option is
 *     set to this URL (people booking from an emailed Calendly link). Calendly
 *     can append invitee_email / invitee_full_name, which pre-fill the form.
 *
 * Being a real page on our domain, every booking is a page view we can count
 * as a conversion (Vercel Web Analytics records page views on the free plan).
 * noIndex: excluded from search and the sitemap.
 */
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { booking, site } from "@/content/site";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, buttonClass } from "@/components/site/primitives";
import { ChecklistCta } from "@/components/site/sections";
import { AssessmentForm } from "@/components/site/booking/AssessmentForm";
import type { BookedState } from "@/components/site/booking/BookingFlow";

const nextSteps = [
  {
    title: "Check your inbox",
    body: "Calendly sends the calendar invite with the meeting link. Use it to reschedule if you need to.",
  },
  {
    title: "We read your answers",
    body: "If you answer the three questions on this page, we look at them before the call, so the time goes on your data.",
  },
  {
    title: `${booking.durationMinutes} minutes on your data`,
    body: "A senior engineer looks at your data estate through what AI agents need: quality, context, access and governance.",
  },
  {
    title: "You leave with a clear view",
    body: "The gaps, the risks and the fastest path to production AI, whether or not we work together afterwards.",
  },
];

const ThankYou = () => {
  const { state } = useLocation() as { state: BookedState | null };
  const [answered, setAnswered] = useState(false);

  return (
    <SiteLayout
      seo={{
        title: "You’re booked: AI Data Readiness Assessment",
        description: "Your AI Data Readiness Assessment is booked. What happens next, and three optional questions to make the call count.",
        path: "/assessment/thank-you",
        noIndex: true,
      }}
    >
      <section className="border-b border-ip-rule bg-white">
        <div className="ip-container pt-[clamp(48px,7vw,96px)] pb-[clamp(40px,5vw,72px)]">
          <Label dot className="mb-6">
            AI Data Readiness Assessment
          </Label>
          <h1 className="ip-h1-page m-0">You’re booked.</h1>
          <p className="ip-lead mt-6 mb-0 max-w-[640px]">
            A calendar invite is on its way to your inbox. Thank you for making the time; we’ll make the {booking.durationMinutes} minutes count.
          </p>
        </div>
      </section>

      <section className="bg-ip-grey">
        <div className="ip-container ip-section grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {/* Three optional questions */}
          <div className="rounded-xl border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-6 sm:p-8">
            <Label small className="mb-2">
              Optional · about a minute
            </Label>
            {answered ? (
              <>
                <h2 className="m-0 text-[24px] font-semibold leading-[1.2]">Thanks. We’ll read these before the call.</h2>
                <p className="mt-3 mb-0 text-[15px] leading-[1.55] text-ip-body">
                  Anything else we should know beforehand? Reply to the calendar invite or write to{" "}
                  <a className="ip-link text-[15px] font-medium" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </p>
              </>
            ) : (
              <>
                <h2 className="m-0 text-[24px] font-semibold leading-[1.2]">Three quick questions</h2>
                <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">
                  Optional, but it lets us spend the {booking.durationMinutes} minutes on your data, not on background.
                </p>
                <AssessmentForm
                  variant="after-booking"
                  source={state?.source ?? "thank-you"}
                  scheduled={state}
                  onSubmitted={() => setAnswered(true)}
                />
              </>
            )}
          </div>

          {/* What happens next (a real sequence) */}
          <div>
            <Label className="mb-5">What happens next</Label>
            <ol className="m-0 list-none border-t-2 border-black p-0">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[36px_1fr] gap-3 border-b border-ip-rule-strong py-5">
                  <span className="font-mono text-[13px] text-ip-muted">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="m-0 text-[18px] font-semibold leading-[1.3]">{s.title}</p>
                    <p className="mt-1.5 mb-0 text-[15px] leading-[1.55] text-ip-body">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="ip-container ip-section grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <Label className="mb-4">Before the call</Label>
            <h2 className="ip-h2 m-0">Run the checklist on your own data.</h2>
          </div>
          <div>
            <p className="m-0 text-[17px] leading-[1.6] text-ip-body">
              Sixteen checks across quality, context, access and governance, on one page. Bring your ticks to the call and we’ll start from there.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ChecklistCta source="thank-you" />
              <Link to="/learn/what-ai-readiness-means" className="ip-link text-[15px]">
                What AI readiness actually means
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ip-rule bg-white">
        <div className="ip-container flex flex-wrap items-center justify-between gap-4 py-10">
          <p className="m-0 text-[15px] text-ip-body">Want to see the kind of work we do?</p>
          <div className="flex flex-wrap gap-3">
            <Link to="/case-studies" className={buttonClass("secondary", "md")}>
              Case studies
            </Link>
            <Link to="/capabilities/context-engineering" className={buttonClass("secondary", "md")}>
              Context engineering
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default ThankYou;
