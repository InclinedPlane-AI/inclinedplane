/**
 * /case-studies/:slug (brief §6.2). Outcome-led title, meta (industry,
 * region, capabilities shown, stack), key results as plain text, then
 * Opportunity → Solution → Impact, related case studies and the CTA.
 * Stories come from src/data/caseStudyDetails.ts; tags and titles from
 * src/content/caseStudyMeta.ts.
 */
import { capabilityById } from "@/content/capabilities";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label } from "@/components/site/primitives";
import { BookCta, Breadcrumbs, CaseStudyCard, FinalCta } from "@/components/site/sections";
import { StepLink } from "@/components/site/cases/CaseRow";
import { caseById, formatMetric, relatedCases } from "@/components/site/cases/caseData";
import { CaseFlow } from "@/components/site/cases/FeaturedCase";
import { caseStories } from "@/content/caseStudyStories";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

const sectionLabel: Record<string, string> = { opportunity: "Opportunity", solution: "Solution", impact: "Impact" };

const CaseStudyDetailPage = () => {
  const { slug = "" } = useParams();
  const entry = caseById[slug];
  if (!entry) return <NotFound />;

  const { cs, meta, detail } = entry;
  const results = cs.metrics?.length
    ? cs.metrics.map((m) => ({ value: formatMetric(m), label: m.label }))
    : [meta.headline, meta.secondary].filter(Boolean).map((r) => ({ value: r!.value, label: r!.label }));
  const sections = detail
    ? detail.sections.map((s) => ({ id: s.id, label: sectionLabel[s.id] ?? s.label, heading: s.heading, body: s.body, bullets: s.bullets }))
    : cs.sections.map((s, i) => ({ id: `section-${i}`, label: s.heading, heading: "", body: s.body, bullets: s.bullets }));
  const lead = detail?.heroSubtitle ?? cs.summary;
  const story = caseStories[entry.id];
  const sameClient = story?.sameClient ? caseById[story.sameClient.id] : undefined;
  const related = relatedCases(entry, 3).filter((r) => r.id !== sameClient?.id);

  return (
    <SiteLayout seo={{ title: meta.title.replace(/\.$/, ""), description: cs.summary, path: `/case-studies/${entry.id}` }}>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-ip-rule bg-white">
        <div aria-hidden="true" className="ip-pattern-fade-left absolute inset-y-0 right-0 hidden w-[34%] opacity-70 xl:block" />
        <div className="ip-container relative pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,5vw,64px)]">
          <Breadcrumbs items={[{ label: "Case studies", to: "/case-studies" }, { label: meta.title.replace(/\.$/, "") }]} />
          <Label dot className="mb-6">
            {cs.industry}
            {meta.region ? `, ${meta.region}` : ""}
          </Label>
          <h1 className="ip-h1-page m-0 max-w-[920px]">{meta.title}</h1>
          <p className="ip-lead mt-6 mb-0 max-w-[700px]">{lead}</p>
          {story ? (
            <p className="mt-5 mb-0 font-mono text-[12.5px] uppercase leading-[1.5] tracking-[0.04em] text-ip-muted">{story.context}</p>
          ) : (
            <p className="mt-4 mb-0 text-[14px] text-ip-muted">Case study: {cs.title}</p>
          )}
        </div>
      </section>

      {/* Key results + meta */}
      <section aria-label="Key results" className="border-b border-ip-rule bg-white">
        <div className="ip-container">
          <dl className={cn("m-0 grid grid-cols-1 sm:grid-cols-2", results.length >= 3 ? "lg:grid-cols-4" : "lg:grid-cols-3")}>
            {results.map((r, i) => (
              <div
                key={r.label}
                className={cn("border-ip-rule py-7 sm:pr-6", i > 0 && "border-t sm:border-t-0", i % 2 === 1 && "sm:border-l sm:pl-6", i >= 2 && "sm:border-t lg:border-t-0", i > 0 && "lg:border-l lg:pl-6")}
              >
                <div aria-hidden="true" className="mb-4 h-1 w-8 bg-ip-orange" />
                <dt className="ip-label-sm">{r.label}</dt>
                <dd className="m-0 mt-2.5 text-[clamp(30px,3.2vw,42px)] font-semibold leading-none tracking-[-0.02em]">{r.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* At a glance + how the pieces connect (case studies with a story entry) */}
      {story && (
        <section aria-label="At a glance" className="border-b border-ip-rule bg-ip-grey">
          <div className="ip-container ip-section grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
            <div>
              <Label className="mb-5">At a glance</Label>
              <dl className="m-0 border-t-2 border-black">
                {story.glance.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-4 border-b border-ip-rule-strong py-3.5 sm:grid-cols-[130px_1fr]">
                    <dt className="ip-label-sm pt-0.5">{k}</dt>
                    <dd className="m-0 text-[15.5px] leading-[1.5] text-black">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <CaseFlow story={story} />
          </div>
        </section>
      )}

      {/* Story */}
      <section className="bg-white">
        <div className="ip-container ip-section grid gap-12 lg:grid-cols-[260px_minmax(0,720px)] lg:justify-between xl:grid-cols-[280px_minmax(0,760px)]">
          <aside className="lg:sticky lg:top-[calc(var(--ip-header-h)+32px)] lg:self-start">
            <div className="flex flex-col gap-6 border-t-2 border-black pt-5">
              <div>
                <p className="ip-label-sm m-0 mb-2.5">Capabilities shown</p>
                <div className="flex flex-wrap gap-1.5">
                  {meta.steps.map((s) => (
                    <StepLink key={s} step={s} />
                  ))}
                  {SHOW_UNVERIFIED && meta.proposedSteps?.map((s) => <StepLink key={s} step={s} proposed />)}
                </div>
                <ul className="mt-3 mb-0 list-none space-y-1 p-0 text-[14px] text-ip-body">
                  {meta.steps.map((s) => (
                    <li key={s}>{capabilityById[s].name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="ip-label-sm m-0 mb-1.5">Industry</p>
                <p className="m-0 text-[15px]">{cs.industry}</p>
              </div>
              {meta.region && (
                <div>
                  <p className="ip-label-sm m-0 mb-1.5">Region</p>
                  <p className="m-0 text-[15px]">{meta.region}</p>
                </div>
              )}
              {cs.stack && (
                <div>
                  <p className="ip-label-sm m-0 mb-1.5">Stack</p>
                  <p className="m-0 text-[15px] leading-[1.5]">{cs.stack}</p>
                </div>
              )}
              {detail && (
                <nav aria-label="On this page" className="hidden border-t border-ip-rule pt-5 lg:block">
                  <p className="ip-label-sm m-0 mb-2.5">On this page</p>
                  <ul className="m-0 list-none space-y-2 p-0 text-[15px]">
                    {sections.map((s) => (
                      <li key={s.id}>
                        <a href={`#${s.id}`} className="text-ip-body no-underline hover:text-black hover:underline underline-offset-4">
                          {s.label}
                        </a>
                      </li>
                    ))}
                    {story?.challenges && (
                      <li>
                        <a href="#challenges" className="text-ip-body no-underline hover:text-black hover:underline underline-offset-4">
                          How we solved it
                        </a>
                      </li>
                    )}
                  </ul>
                </nav>
              )}
            </div>
          </aside>

          <article className="min-w-0">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className={cn(i > 0 && "mt-14 border-t border-ip-rule pt-12")}>
                <Label dot={s.id === "impact"} className="mb-4">
                  {s.label}
                </Label>
                <h2 id={`${s.id}-h`} className="m-0 text-[clamp(26px,2.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em]">
                  {s.heading || s.label}
                </h2>
                {s.body && <p className="mt-5 mb-0 text-[18px] leading-[1.7] text-ip-body">{s.body}</p>}
                {s.bullets && s.bullets.length > 0 && (
                  <ul className="mt-6 mb-0 list-none space-y-0 border-t border-ip-rule p-0">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-4 border-b border-ip-rule py-3.5 text-[17px] leading-[1.55]">
                        <span aria-hidden="true" className={cn("mt-[9px] h-2 w-2 shrink-0", s.id === "impact" ? "bg-ip-orange" : "bg-black")} />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {story?.challenges && (
              <section id="challenges" aria-labelledby="challenges-h" className="mt-14 border-t border-ip-rule pt-12">
                <Label className="mb-4">How we solved it</Label>
                <h2 id="challenges-h" className="m-0 text-[clamp(26px,2.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em]">
                  The hard parts, and what we did about them
                </h2>
                <div className="mt-6 border-t-2 border-black">
                  {story.challenges.map(([c, sol]) => (
                    <div key={c} className="grid gap-2 border-b border-ip-rule-strong py-4 sm:grid-cols-2 sm:gap-8">
                      <p className="m-0 text-[16px] font-semibold leading-[1.45] text-black">{c}</p>
                      <p className="m-0 flex gap-3 text-[16px] leading-[1.5] text-ip-body">
                        <span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 bg-ip-orange" />
                        {sol}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {sameClient && story?.sameClient && (
              <Link
                to={`/case-studies/${sameClient.id}`}
                className="group mt-10 flex flex-col gap-1.5 rounded-xl border border-ip-orange p-6 no-underline transition-colors hover:border-black sm:p-7"
              >
                <span className="ip-label-sm">Same client</span>
                <span className="text-[20px] font-semibold leading-[1.3] text-black group-hover:underline underline-offset-4 decoration-1">{sameClient.meta.title}</span>
                <span className="text-[15px] text-ip-body">{story.sameClient.label}</span>
              </Link>
            )}

            <div className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-xl border border-ip-rule-strong bg-ip-grey p-6 sm:p-8">
              <p className="m-0 max-w-[420px] text-[19px] font-semibold leading-[1.35]">Facing something similar? Start with a 45-minute readiness assessment.</p>
              <BookCta source={`case-${entry.id}`} label="Book an assessment" size="md" />
            </div>
          </article>
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-ip-rule bg-ip-grey">
          <div className="ip-container ip-section">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <Label className="mb-3">Related work</Label>
                <h2 className="ip-h2 m-0">Case studies with the same capabilities.</h2>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <CaseStudyCard key={r.id} id={r.id} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta source={`final-case-${entry.id}`} />
    </SiteLayout>
  );
};

export default CaseStudyDetailPage;
