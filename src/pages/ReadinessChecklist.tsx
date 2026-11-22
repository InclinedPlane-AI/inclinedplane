/**
 * /readiness-checklist — the AI data readiness checklist as a page (it used to
 * exist only as a dialog). All sixteen checks are in the HTML; ticking them
 * gives a live score against the checklist's own scoring bands. The PDF
 * download uses the same form as the dialog (work email → Formspree → PDF).
 * Content: src/content/checklist.json (draft v0.1, founder reviewing).
 */
import { useState } from "react";
import checklist from "@/content/checklist.json";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, VerifyBadge } from "@/components/site/primitives";
import { BookCta, PageHero, Reassure } from "@/components/site/sections";
import { ChecklistDone, ChecklistForm } from "@/components/site/booking/ChecklistOffer";
import { useBooking } from "@/components/site/booking/BookingProvider";
import { NextSteps } from "@/components/site/NextSteps";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { cn } from "@/lib/utils";

const total = checklist.sections.reduce((n, s) => n + s.checks.length, 0);

/** "14 to 16" / "9 to 13" / "8 or fewer" → does `n` fall in the band? */
function inBand(range: string, n: number) {
  const nums = range.match(/\d+/g)?.map(Number) ?? [];
  if (/or fewer/.test(range)) return n <= nums[0];
  if (/or more/.test(range)) return n >= nums[0];
  return n >= nums[0] && n <= (nums[1] ?? nums[0]);
}

const ReadinessChecklist = () => {
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [doneEmail, setDoneEmail] = useState<string>();
  const { open } = useBooking();
  const score = ticked.size;
  const band = checklist.scoring.find((b) => inBand(b.range, score));

  const toggle = (key: string) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <SiteLayout
      seo={{
        title: "AI data readiness checklist: 16 checks before agents",
        description:
          "Sixteen checks to run before an AI agent touches your data, across quality, context, access and governance. Score yourself, then download the PDF.",
        path: "/readiness-checklist",
      }}
    >
      <PageHero
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Readiness checklist" }]}
        label="Readiness checklist"
        title="Sixteen checks before an AI agent touches your data."
        lead={`${checklist.subtitle} Tick them here for an instant score, or download the one-page PDF.`}
      >
        <a href="#download" className="ip-link text-[16px] font-medium">
          Download the PDF
        </a>
        {SHOW_UNVERIFIED && checklist.status === "draft" && (
          <span className="flex basis-full flex-wrap items-center gap-2 text-[13px] text-ip-muted">
            <VerifyBadge /> Draft {checklist.version}, awaiting founder review.
          </span>
        )}
      </PageHero>

      <section className="bg-white">
        <div className="ip-container ip-section grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-14">
          <div>
            <p className="m-0 mb-8 max-w-[680px] border-l-[3px] border-ip-orange pl-5 text-[17px] leading-[1.6] text-black">{checklist.howTo}</p>
            <div className="flex flex-col gap-10">
              {checklist.sections.map((s) => (
                <fieldset key={s.area} className="m-0 border-0 p-0">
                  <legend className="mb-1 p-0">
                    <span className="ip-label">{s.area}</span>
                  </legend>
                  <p className="m-0 mb-4 text-[19px] font-semibold leading-[1.3]">{s.question}</p>
                  <ul className="m-0 list-none border-t-2 border-black p-0">
                    {s.checks.map((c, i) => {
                      const key = `${s.area}-${i}`;
                      const on = ticked.has(key);
                      return (
                        <li key={key} className="border-b border-ip-rule-strong">
                          <label className="flex cursor-pointer items-start gap-4 py-4">
                            <input type="checkbox" checked={on} onChange={() => toggle(key)} className="peer sr-only" />
                            <span
                              aria-hidden="true"
                              className={cn(
                                "mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[4px] border-2 transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ip-orange-ink",
                                on ? "border-black bg-black text-white" : "border-ip-rule-dashed bg-white",
                              )}
                            >
                              {on && (
                                <svg width="13" height="13" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M2.5 6.2l2.4 2.3 4.6-5" />
                                </svg>
                              )}
                            </span>
                            <span className={cn("text-[16px] leading-[1.55]", on ? "text-black" : "text-ip-body")}>{c}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </fieldset>
              ))}
            </div>
          </div>

          {/* Live score */}
          <aside aria-label="Your score" className="lg:sticky lg:top-[100px] lg:self-start">
            <div className="rounded-xl border border-ip-rule-strong bg-white p-6" aria-live="polite">
              <p className="ip-label-sm m-0">Your score</p>
              <p className="m-0 mt-1 text-[56px] font-semibold leading-none tracking-[-0.03em]">
                {score}
                <span className="text-[24px] text-ip-muted">/{total}</span>
              </p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ip-grey-100" aria-hidden="true">
                <div className="h-full bg-ip-orange transition-[width] duration-300" style={{ width: `${(score / total) * 100}%` }} />
              </div>
              <ul className="mt-5 mb-0 list-none space-y-2 p-0">
                {checklist.scoring.map((b) => (
                  <li key={b.range} className={cn("rounded-md border px-3 py-2 text-[14px] leading-[1.45]", band === b ? "border-black bg-ip-grey text-black" : "border-ip-rule text-ip-muted")}>
                    <span className="font-semibold">{b.range}:</span> {b.meaning}
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-ip-rule pt-5">
                <p className="m-0 text-[14.5px] leading-[1.5] text-ip-body">{checklist.cta.body}</p>
                <BookCta source="checklist-page-score" label="Book the assessment" size="md" className="mt-4 w-full" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="download" className="bg-ip-grey scroll-mt-24">
        <div className="ip-container ip-section grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <Label className="mb-4">Download</Label>
            <h2 className="ip-h2 m-0">Take it to your next data review.</h2>
            <p className="mt-4 mb-0 max-w-[520px] text-[17px] leading-[1.6] text-ip-body">
              The same sixteen checks on one printable page, with the scoring bands. Work through it with your data owners for one AI use case.
            </p>
          </div>
          <div className="rounded-xl border border-ip-rule-strong bg-white p-6 sm:p-8">
            <p className="m-0 text-[19px] font-semibold">{checklist.title} (PDF)</p>
            {doneEmail ? <ChecklistDone onBook={() => open({ source: "checklist-page-done" })} /> : <ChecklistForm source="checklist-page" onDone={setDoneEmail} />}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="ip-container py-[clamp(48px,6vw,72px)]">
          <SectionIntro label="Second opinion" title={checklist.cta.title} className="!mb-6">
            <p className="m-0">{checklist.cta.body}</p>
          </SectionIntro>
          <div className="flex flex-wrap items-center gap-4">
            <BookCta source="checklist-page" />
            <Reassure />
          </div>
        </div>
      </section>

      <NextSteps
        tone="grey"
        steps={[
          { kicker: "Learn", title: "What AI readiness actually means", body: "The five checks explained, with a simulator.", to: "/learn/what-ai-readiness-means" },
          { kicker: "Concept", title: "Context engineering, explained", body: "Why agents need business meaning written down.", to: "/context-engineering" },
          { kicker: "Solutions", title: "IncLever and PipelineIQ", body: "Products that check readiness and reliability on your own data.", to: "/products" },
        ]}
      />
    </SiteLayout>
  );
};

export default ReadinessChecklist;
