/**
 * /industries (brief §7.8). Manufacturing and distribution leads (flag
 * leadVertical), then FMCG, energy and utilities, logistics and retail. Each
 * industry is an anchored section (home links to /industries#<id>): the data
 * problems specific to it, the capabilities that address them, related work.
 */
import { Link } from "react-router-dom";
import { capabilityById } from "@/content/capabilities";
import { flags } from "@/content/flags";
import { industries, type Industry } from "@/content/industries";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label } from "@/components/site/primitives";
import {
  BookCta,
  CtaBand,
  FinalCta,
  PageHero,
} from "@/components/site/sections";
import { CaseRow, StepLink } from "@/components/site/cases/CaseRow";
import { caseById } from "@/components/site/cases/caseData";
import { cn } from "@/lib/utils";

function IndustrySection({ ind, lead }: { ind: Industry; lead: boolean }) {
  const cases = ind.caseStudyIds.map((id) => caseById[id]).filter(Boolean);
  return (
    <section
      id={ind.id}
      aria-labelledby={`${ind.id}-h`}
      className={cn(
        "scroll-mt-[calc(var(--ip-header-h)+24px)]",
        lead ? "bg-ip-grey" : "bg-white border-t border-ip-rule",
      )}
    >
      <div className="ip-container ip-section grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <Label dot={lead} className="mb-4">
            {lead ? "Where we start" : "Industry"}
          </Label>
          <h2
            id={`${ind.id}-h`}
            className={cn(
              "m-0 font-semibold tracking-[-0.025em]",
              lead ? "ip-h2-xl" : "ip-h2",
            )}
          >
            {ind.name}
          </h2>
          <p className="mt-5 mb-0 max-w-[480px] text-[19px] font-medium leading-[1.5]">
            {ind.short}
          </p>
          {lead && (
            <p className="mt-4 mb-0 max-w-[480px] text-[17px] leading-[1.6] text-ip-body">
              Multi-ERP estates are where our evidence lives: operating
              companies across countries, each with its own codes, brought onto
              one platform and one set of definitions.
            </p>
          )}
          <div className="mt-8">
            <p className="ip-label-sm m-0 mb-3">Capabilities that apply</p>
            <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
              {ind.steps.map((s) => (
                <li key={s} className="flex items-center gap-3">
                  <StepLink step={s} />
                  <Link
                    to={capabilityById[s].path}
                    className="ip-link text-[15px] font-medium"
                  >
                    {capabilityById[s].name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="border-t-2 border-black pt-[18px]">
            <p className="ip-label-sm m-0 mb-1">Where the data breaks</p>
            <ul className="m-0 list-none p-0">
              {ind.problems.map((p) => (
                <li
                  key={p}
                  className="flex gap-4 border-b border-ip-rule py-4 text-[17px] leading-[1.55]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[10px] h-2 w-2 shrink-0 bg-ip-orange"
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          {cases.length > 0 && (
            <div>
              <p className="ip-label-sm m-0 mb-1">Related work</p>
              <ul
                className="m-0 list-none border-t border-ip-rule-strong p-0"
                aria-label={`${ind.name} case studies`}
              >
                {cases.map((e) => (
                  <CaseRow key={e.id} entry={e} dense />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

const Industries = () => {
  const ordered = flags.leadVertical
    ? industries
    : [...industries].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <SiteLayout
      seo={{
        title: "Industries: manufacturing, FMCG, energy, logistics, retail",
        description:
          "Data engineering and AI readiness for multi-entity businesses in manufacturing and distribution, FMCG, energy, logistics and retail.",
        path: "/industries",
      }}
    >
      <PageHero
        crumbs={[{ label: "Industries" }]}
        label="Industries"
        title="Built for complex, multi-entity businesses."
        lead={
          flags.leadVertical
            ? "We work where enterprise data is hardest: many operating companies, many ERPs, years of acquisitions. Manufacturing and distribution comes first. The same problems, and the same fixes, show up in FMCG, energy, logistics and retail."
            : "We work where enterprise data is hardest: many operating companies, many ERPs, years of acquisitions, across manufacturing, FMCG, energy, logistics and retail."
        }
      >
        <BookCta source="hero-industries" />
      </PageHero>

      <nav
        aria-label="Industries on this page"
        className="border-b border-ip-rule bg-white"
      >
        <div className="ip-container">
          <ul className="m-0 flex list-none gap-x-7 gap-y-2 overflow-x-auto p-0 py-4 text-[15px] scrollbar-hide">
            {ordered.map((ind) => (
              <li key={ind.id} className="shrink-0">
                <a
                  href={`#${ind.id}`}
                  className="inline-flex min-h-[40px] items-center text-ip-body no-underline hover:text-black hover:underline underline-offset-4"
                >
                  {ind.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {ordered.map((ind, i) => (
        <IndustrySection
          key={ind.id}
          ind={ind}
          lead={flags.leadVertical && i === 0}
        />
      ))}

      <CtaBand source="mid-industries" />
      <FinalCta source="final-industries" />
    </SiteLayout>
  );
};

export default Industries;
