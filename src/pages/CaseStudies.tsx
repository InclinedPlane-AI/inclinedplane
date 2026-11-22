/**
 * /case-studies (brief §7.7). The two featured case studies large, then every
 * case study in a filterable list (capability step × industry). The full list
 * is in the prerendered HTML; filtering only hides rows. Filter state mirrors
 * to ?step=&industry= so a filtered view can be shared.
 */
import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { capabilityById, type StepId } from "@/content/capabilities";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, StepTag } from "@/components/site/primitives";
import {
  CtaBand,
  FinalCta,
  PageHero,
  featuredCaseStudyIds,
} from "@/components/site/sections";
import { CaseRow } from "@/components/site/cases/CaseRow";
import {
  caseById,
  caseEntries,
  industryGroups,
  stepOrder,
  type CaseEntry,
} from "@/components/site/cases/caseData";
import { cn } from "@/lib/utils";

function FeaturedCase({ entry }: { entry: CaseEntry }) {
  const { cs, meta } = entry;
  const results = [meta.headline, meta.secondary].filter(Boolean) as {
    value: string;
    label: string;
  }[];
  return (
    <article className="group relative flex flex-col rounded-xl border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-[clamp(24px,3vw,40px)] transition-colors duration-200 hover:border-black hover:border-t-ip-orange">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="ip-label-sm">
          {cs.industry}
          {meta.region ? `, ${meta.region}` : ""}
        </span>
        <span className="ip-label-sm !text-black">Featured</span>
      </div>
      <h3 className="mt-5 mb-0 text-[clamp(24px,2.4vw,32px)] font-semibold leading-[1.15] tracking-[-0.015em]">
        <Link
          to={`/case-studies/${entry.id}`}
          className="no-underline after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:underline underline-offset-4 decoration-1"
        >
          {meta.title}
        </Link>
      </h3>
      <p className="mt-4 mb-0 max-w-[560px] text-[16px] leading-[1.6] text-ip-body">
        {cs.summary}
      </p>
      <dl
        className={cn(
          "mt-7 grid border-t border-ip-rule",
          results.length > 1 ? "grid-cols-2" : "grid-cols-1",
        )}
      >
        {results.map((r, i) => (
          <div
            key={r.label}
            className={cn(
              "pt-4",
              i > 0 ? "border-l border-ip-rule pl-4" : "pr-4",
            )}
          >
            <dt className="ip-label-sm">{r.label}</dt>
            <dd className="m-0 mt-2 text-[clamp(30px,3vw,40px)] font-semibold leading-none tracking-[-0.02em]">
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
      <div className="relative z-10 mt-7 flex flex-wrap gap-2">
        {meta.steps.map((s) => (
          <StepTag key={s} step={s} />
        ))}
        {SHOW_UNVERIFIED &&
          meta.proposedSteps?.map((s) => <StepTag key={s} step={s} proposed />)}
      </div>
      <span className="mt-auto pt-7 text-[15px] font-semibold">
        Read the case study
      </span>
    </article>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
  count,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-[40px] items-center gap-2 rounded-full border px-4 text-[14px] font-medium transition-colors duration-150",
        pressed
          ? "border-black bg-black text-white"
          : "border-ip-rule-strong bg-white text-ip-body hover:border-black hover:text-black",
      )}
    >
      {children}
      <span
        className={cn(
          "font-mono text-[11px] tabular-nums",
          pressed ? "text-ip-on-dark" : "text-ip-muted",
        )}
      >
        {count}
      </span>
    </button>
  );
}

const CaseStudies = () => {
  const featured = featuredCaseStudyIds()
    .map((id) => caseById[id])
    .filter(Boolean);
  const [step, setStep] = useState<StepId | "all">("all");
  const [group, setGroup] = useState<string>("all");

  // Restore a shared filter from the URL once on mount.
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const s = p.get("step");
    const g = p.get("industry");
    if (s && (stepOrder as string[]).includes(s)) setStep(s as StepId);
    if (g && industryGroups.some((x) => x.id === g)) setGroup(g);
  }, []);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    if (step === "all") p.delete("step");
    else p.set("step", step);
    if (group === "all") p.delete("industry");
    else p.set("industry", group);
    const q = p.toString();
    window.history.replaceState(
      window.history.state,
      "",
      `${window.location.pathname}${q ? `?${q}` : ""}${window.location.hash}`,
    );
  }, [step, group]);

  const matches = (e: CaseEntry, s = step, g = group) =>
    (s === "all" || e.meta.steps.includes(s)) &&
    (g === "all" || e.groups.includes(g));

  const shown = caseEntries.filter((e) => matches(e));
  const stepsWithWork = stepOrder.filter((s) =>
    caseEntries.some((e) => e.meta.steps.includes(s)),
  );
  const groupsWithWork = industryGroups.filter((g) =>
    caseEntries.some((e) => e.groups.includes(g.id)),
  );

  return (
    <SiteLayout
      seo={{
        title: "Case studies: enterprise data platforms in production",
        description:
          "Data platforms, multi-ERP models, BI and forecasting for manufacturing, FMCG, energy, logistics and retail, filterable by capability and industry.",
        path: "/case-studies",
      }}
    >
      <PageHero
        crumbs={[{ label: "Case studies" }]}
        label="Case studies"
        title="Proven at enterprise scale."
        lead="Work on real enterprise data: the business problem, what we built and what was measured. Client names are withheld and details anonymized until each client approves."
      />

      {/* Featured */}
      <section className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro
            label="Featured"
            title="Two platforms that show how we work."
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {featured.map((e) => (
              <FeaturedCase key={e.id} entry={e} />
            ))}
          </div>
        </div>
      </section>

      {/* All case studies */}
      <section className="bg-white">
        <div className="ip-container ip-section">
          <SectionIntro
            label="All case studies"
            title="Filter by capability or industry."
          >
            <p className="m-0">
              Each case study is tagged with the capabilities it shows on our
              path:{" "}
              {stepOrder.map((s, i) => (
                <span key={s}>
                  <Link
                    to={capabilityById[s].path}
                    className="ip-link text-[17px] font-medium"
                  >
                    {capabilityById[s].step}
                  </Link>
                  {i < stepOrder.length - 2
                    ? ", "
                    : i === stepOrder.length - 2
                      ? " and "
                      : "."}
                </span>
              ))}
            </p>
          </SectionIntro>

          <div className="flex flex-col gap-5 border-t-2 border-black pt-6">
            <div
              role="group"
              aria-label="Filter by capability"
              className="flex flex-col gap-2 sm:flex-row sm:gap-4"
            >
              <span className="ip-label-sm shrink-0 sm:w-[110px] sm:pt-3">
                Capability
              </span>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  pressed={step === "all"}
                  onClick={() => setStep("all")}
                  count={caseEntries.filter((e) => matches(e, "all")).length}
                >
                  All
                </FilterButton>
                {stepsWithWork.map((s) => (
                  <FilterButton
                    key={s}
                    pressed={step === s}
                    onClick={() => setStep(step === s ? "all" : s)}
                    count={caseEntries.filter((e) => matches(e, s)).length}
                  >
                    {capabilityById[s].step}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div
              role="group"
              aria-label="Filter by industry"
              className="flex flex-col gap-2 sm:flex-row sm:gap-4"
            >
              <span className="ip-label-sm shrink-0 sm:w-[110px] sm:pt-3">
                Industry
              </span>
              <div className="flex flex-wrap gap-2">
                <FilterButton
                  pressed={group === "all"}
                  onClick={() => setGroup("all")}
                  count={
                    caseEntries.filter((e) => matches(e, step, "all")).length
                  }
                >
                  All
                </FilterButton>
                {groupsWithWork.map((g) => (
                  <FilterButton
                    key={g.id}
                    pressed={group === g.id}
                    onClick={() => setGroup(group === g.id ? "all" : g.id)}
                    count={
                      caseEntries.filter((e) => matches(e, step, g.id)).length
                    }
                  >
                    {g.name}
                  </FilterButton>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule-strong pb-4">
              <p aria-live="polite" className="m-0 text-[14px] text-ip-muted">
                Showing {shown.length} of {caseEntries.length} case studies
              </p>
              {(step !== "all" || group !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setStep("all");
                    setGroup("all");
                  }}
                  className="ip-link min-h-[40px] text-[14px]"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          <ul className="m-0 list-none p-0" aria-label="Case studies">
            {caseEntries.map((e) => (
              <CaseRow key={e.id} entry={e} hidden={!matches(e)} />
            ))}
          </ul>
          {shown.length === 0 && (
            <div className="border-b border-ip-rule-strong py-10">
              <p className="m-0 text-[17px] font-medium">
                No case study matches both filters yet.
              </p>
              <p className="mt-2 mb-0 text-[15px] text-ip-body">
                Try one filter at a time, or{" "}
                <button
                  type="button"
                  className="ip-link min-h-0 text-[15px]"
                  onClick={() => {
                    setStep("all");
                    setGroup("all");
                  }}
                >
                  show all case studies
                </button>
                .
              </p>
            </div>
          )}
        </div>
      </section>

      <CtaBand source="mid-case-studies" />
      <FinalCta source="final-case-studies" />
    </SiteLayout>
  );
};

export default CaseStudies;
