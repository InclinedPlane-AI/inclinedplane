/**
 * Featured case study panel (home + top of /case-studies) and the data-flow
 * diagram it shares with the detail page. Content: caseStudyMeta.ts (title,
 * tags), caseStudies.ts (summary) and caseStudyStories.ts (context line,
 * highlights, flow). The whole panel is one link.
 */
import { Link } from "react-router-dom";
import { caseStories, type CaseStory } from "@/content/caseStudyStories";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { StepTag } from "../primitives";
import { caseById } from "./caseData";
import { cn } from "@/lib/utils";

/** Source → outcome, drawn as connected stages. Vertical on phones, horizontal from `lg` when `horizontal`. */
export function CaseFlow({ story, horizontal = false, className }: { story: CaseStory; horizontal?: boolean; className?: string }) {
  return (
    <figure className={cn("m-0", className)}>
      <figcaption className="ip-label-sm mb-4">{story.flowTitle}</figcaption>
      <ol className={cn("m-0 flex list-none flex-col gap-0 p-0", horizontal && "lg:flex-row lg:items-stretch")}>
        {story.flow.map((st, i) => {
          const last = i === story.flow.length - 1;
          return (
            <li key={st.title} className={cn("flex flex-col", horizontal && "lg:flex-1 lg:flex-row lg:items-center")}>
              <div
                className={cn(
                  "rounded-lg border px-4 py-3",
                  horizontal && "lg:h-full lg:w-full",
                  st.accent ? "border-ip-orange bg-ip-orange-tint" : last ? "border-black bg-black text-white" : "border-ip-rule-strong bg-white",
                )}
              >
                <p className={cn("m-0 text-[15px] font-semibold leading-[1.25]", last ? "text-white" : "text-black")}>{st.title}</p>
                <p className={cn("mt-1 mb-0 text-[13px] leading-[1.45]", last ? "text-ip-on-dark" : "text-ip-body")}>{st.detail}</p>
              </div>
              {!last && (
                <span aria-hidden="true" className={cn("flex h-6 items-center justify-center text-ip-muted", horizontal && "lg:h-auto lg:w-6 lg:shrink-0")}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn(horizontal && "lg:-rotate-90")}>
                    <path d="M7 1v11M3 8l4 4 4-4" />
                  </svg>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

export function FeaturedCaseStudy({ id, headingLevel = "h3" }: { id: string; headingLevel?: "h2" | "h3" }) {
  const entry = caseById[id];
  const story = caseStories[id];
  if (!entry) return null;
  const { cs, meta } = entry;
  const H = headingLevel;
  const highlights = story?.highlights ?? [meta.headline, ...(meta.secondary ? [meta.secondary] : [])];

  return (
    <article className="group relative overflow-hidden rounded-xl border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white transition-colors duration-200 hover:border-black hover:border-t-ip-orange">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="flex flex-col p-[clamp(24px,3.2vw,44px)]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="ip-label-sm !text-black">Featured</span>
            <span aria-hidden="true" className="h-3 w-px bg-ip-rule-strong" />
            <span className="ip-label-sm">
              {cs.industry}
              {meta.region ? `, ${meta.region}` : ""}
            </span>
          </div>
          <H className="mt-5 mb-0 text-[clamp(26px,2.8vw,36px)] font-semibold leading-[1.12] tracking-[-0.02em]">
            <Link
              to={`/case-studies/${id}`}
              className="no-underline after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:underline underline-offset-4 decoration-1"
            >
              {meta.title}
            </Link>
          </H>
          {story && <p className="mt-3 mb-0 font-mono text-[12.5px] uppercase leading-[1.5] tracking-[0.04em] text-ip-muted">{story.context}</p>}
          <p className="mt-4 mb-0 max-w-[620px] text-[16.5px] leading-[1.6] text-ip-body">{cs.summary}</p>

          <dl className="mt-7 grid grid-cols-2 gap-0 border-t border-ip-rule">
            {highlights.map((h, i) => (
              <div key={h.label} className={cn("flex flex-col-reverse justify-end pt-4 pb-1", i % 2 === 1 ? "border-l border-ip-rule pl-4" : "pr-4", i >= 2 && "mt-3 border-t border-ip-rule")}>
                <dt className="mt-2 text-[13.5px] leading-[1.4] text-ip-body">{h.label}</dt>
                <dd className="m-0 text-[clamp(28px,2.8vw,38px)] font-semibold leading-none tracking-[-0.02em]">{h.value}</dd>
              </div>
            ))}
          </dl>

          <div className="relative z-10 mt-7 flex flex-wrap gap-2">
            {meta.steps.map((s) => (
              <StepTag key={s} step={s} />
            ))}
            {SHOW_UNVERIFIED && meta.proposedSteps?.map((s) => <StepTag key={s} step={s} proposed />)}
          </div>
          <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[15px] font-semibold">
            Read the case study
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>

        {story && (
          <div className="border-t border-ip-rule bg-ip-grey p-[clamp(24px,3vw,40px)] lg:border-t-0 lg:border-l">
            <CaseFlow story={story} />
          </div>
        )}
      </div>
    </article>
  );
}
