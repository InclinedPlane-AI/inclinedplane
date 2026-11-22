/**
 * /assessment — the AI Data Readiness Assessment (brief §7.6). The primary
 * conversion page: what it covers, the tiers (two when flags.twoTierAssessment),
 * a sample findings report, how it works, both booking paths inline, FAQ.
 * Every "Book an assessment" CTA on the site can also deep-link here.
 */
import { useState } from "react";
import { site, booking } from "@/content/site";
import { flags } from "@/content/flags";
import { coverage, tiers, steps, assessmentFaq } from "@/content/assessment";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, buttonClass } from "@/components/site/primitives";
import { Faq, PageHero, Reassure } from "@/components/site/sections";
import { BookingFlow, stepLabel, stepTitles, type BookingStep } from "@/components/site/booking/BookingFlow";
import { ChecklistDone, ChecklistForm } from "@/components/site/booking/ChecklistOffer";
import { FindingsReport } from "@/components/site/products/FindingsReport";
import { cn } from "@/lib/utils";

function InlineBooking() {
  const [step, setStep] = useState<BookingStep>("time");
  const [checklistDone, setChecklistDone] = useState(false);
  return (
    <section id="book" className="bg-white border-t border-ip-rule scroll-mt-24">
      <div className="ip-container ip-section">
        <SectionIntro label="Book" title="Pick a time. We’ll do the rest.">
          <p className="m-0">Choose a slot. Once you’re booked, three optional questions help the call go straight to your data. A senior engineer joins the call.</p>
        </SectionIntro>
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="rounded-xl border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-6 sm:p-8">
            <Label small className="mb-2">
              {stepLabel(step)}
            </Label>
            <h3 className="m-0 text-[22px] font-semibold leading-[1.2]">{stepTitles[step]}</h3>
            <BookingFlow source="assessment-page" calendarHeight={640} onStepChange={setStep} />
          </div>
          <div className="self-start rounded-xl border border-ip-rule-strong bg-ip-grey p-6 sm:p-8">
            <Label small className="mb-2">
              Not ready to talk yet?
            </Label>
            <h3 className="m-0 text-[22px] font-semibold leading-[1.2]">
              {checklistDone ? "Your checklist is downloading" : "Run the checklist yourself first."}
            </h3>
            {checklistDone ? (
              <ChecklistDone onBook={() => document.getElementById("book")?.scrollIntoView({ behavior: "smooth" })} />
            ) : (
              <>
                <p className="mt-3 mb-0 text-[15px] leading-[1.55] text-ip-body">
                  One page, sixteen checks across quality, context, access and governance. The same checks we apply in the assessment.
                </p>
                <ChecklistForm source="assessment-page" onDone={() => setChecklistDone(true)} />
              </>
            )}
          </div>
        </div>
        <Reassure className="mt-5" />
      </div>
    </section>
  );
}

const Assessment = () => {
  const shownSteps = steps.filter((s) => !s.tier || flags.twoTierAssessment);
  return (
    <SiteLayout
      seo={{
        title: "AI Data Readiness Assessment",
        description:
          "A 45-minute AI Data Readiness Assessment with a senior engineer: quality, context, access and governance, checked against what your AI agents need.",
        path: "/assessment",
      }}
    >
      <PageHero
        crumbs={[{ label: "AI Data Readiness Assessment" }]}
        label={site.tagline}
        dot
        title="AI Data Readiness Assessment"
        lead={site.cta.finalBody}
        aside={
          <ul className="m-0 grid w-[calc(100vw-32px)] max-w-[420px] list-none grid-cols-2 border-t-2 border-black p-0 sm:w-[420px]">
            {coverage.map((c, i) => (
              <li key={c.area} className={cn("border-b border-ip-rule-strong py-4", i % 2 === 0 ? "pr-4" : "border-l pl-4")}>
                <span className="block text-[18px] font-semibold">{c.area}</span>
                <span className="mt-1 block text-[13px] leading-[1.45] text-ip-muted">{c.question}</span>
              </li>
            ))}
          </ul>
        }
      >
        <a href="#book" className={buttonClass("primary")}>
          {site.cta.primary}
        </a>
        <a href="#what-you-get" className={buttonClass("secondary")}>
          See a sample report
        </a>
      </PageHero>

      {/* What it covers */}
      <section className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="What it covers" title="Four questions every AI agent will ask of your data.">
            <p className="m-0">We check each against the data your chosen use case depends on, not your whole estate.</p>
          </SectionIntro>
          <div className="grid grid-cols-1 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-4">
            {coverage.map((c, i) => (
              <div key={c.area} className={cn("border-b border-ip-rule-strong py-7 pr-6", i > 0 && "lg:border-l lg:pl-6", i % 2 === 1 && "sm:border-l sm:pl-6")}>
                <h3 className="ip-h3 m-0">{c.area}</h3>
                <p className="mt-2 mb-0 text-[16px] font-medium leading-[1.45]">{c.question}</p>
                <ul className="mt-4 mb-0 space-y-1.5 pl-[18px] text-[15px] leading-[1.5] text-ip-body">
                  {c.checks.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="bg-white">
        <div className="ip-container ip-section">
          <SectionIntro
            label={flags.twoTierAssessment ? "Two levels" : "The conversation"}
            title={flags.twoTierAssessment ? "Start with a conversation. Go deeper when it’s worth it." : "A 45-minute conversation with a senior engineer."}
          />
          <div className={cn("grid gap-6", flags.twoTierAssessment && "md:grid-cols-2")}>
            {[tiers.conversation, ...(flags.twoTierAssessment ? [tiers.assessment] : [])].map((t, i) => (
              <div
                key={t.name}
                className={cn("flex flex-col rounded-xl border p-6 sm:p-8", i === 0 ? "border-ip-rule-strong bg-white" : "border-black bg-black text-white")}
              >
                <Label small onDark={i === 1} className="mb-3">
                  {t.format}
                </Label>
                <h3 className="m-0 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.015em]">{t.name}</h3>
                <p className={cn("mt-2 mb-0 text-[16px] font-medium", i === 0 ? "text-ip-orange-ink" : "text-ip-orange")}>{t.price}</p>
                <p className={cn("mt-4 mb-0 text-[16px] leading-[1.6]", i === 0 ? "text-ip-body" : "text-ip-on-dark")}>{t.body}</p>
                <p className={cn("ip-label-sm mt-6 mb-2", i === 1 && "!text-ip-on-dark")}>You leave with</p>
                <ul className={cn("m-0 space-y-1.5 pl-[18px] text-[15px] leading-[1.5]", i === 0 ? "text-black" : "text-white")}>
                  {t.leaveWith.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you get */}
      <section id="what-you-get" className="bg-ip-grey scroll-mt-24">
        <div className="ip-container ip-section">
          <SectionIntro label="What you get" title="Findings you can act on, with the evidence attached.">
            <p className="m-0">Every finding names the check, the data it was run on and what it found. This preview uses a fictional company.</p>
          </SectionIntro>
          <FindingsReport />
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white">
        <div className="ip-container ip-section">
          <SectionIntro label="How it works" title="From a booked call to a roadmap." />
          <ol className="m-0 grid list-none grid-cols-1 border-t-2 border-black p-0 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
            {shownSteps.map((s, i) => (
              <li key={s.title} className={cn("border-b border-ip-rule-strong py-7 md:pr-6", i > 0 && "md:border-l md:pl-6")}>
                <span className="font-mono text-[13px] font-medium text-ip-muted">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 mb-0 text-[19px] font-semibold leading-[1.25]">{s.title}</p>
                <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <InlineBooking />

      <section className="bg-white border-t border-ip-rule">
        <div className="ip-container ip-section max-w-[1000px] !mx-auto">
          <Faq items={assessmentFaq} />
        </div>
      </section>
    </SiteLayout>
  );
};

export default Assessment;
