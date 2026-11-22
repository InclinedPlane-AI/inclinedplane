/**
 * /insights — the evidence page: industry numbers, shifts and what they mean,
 * every figure with its source (brief §2.1: industry statistics only on
 * explainer pages, never the homepage, always attributed). Data and editorial
 * copy: src/content/insights.ts. Each figure is `verified: false` until a
 * person has checked the source link (staging badge; hidden in production).
 */
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { insightMoves, insightStats, insightThemes, type InsightStat } from "@/content/insights";
import { visible, SHOW_UNVERIFIED } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, VerifyBadge } from "@/components/site/primitives";
import { BookCta, CtaBand, PageHero } from "@/components/site/sections";
import { NextSteps } from "@/components/site/NextSteps";
import { cn } from "@/lib/utils";

const stats = visible(insightStats);
const refNo = new Map(stats.map((s, i) => [s.id, i + 1]));

function formatDate(d: string) {
  const [y, m] = d.split("-");
  if (!m) return y;
  return new Date(Number(y), Number(m) - 1, 1).toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function StatCard({ s, large = false }: { s: InsightStat; large?: boolean }) {
  return (
    <figure className={cn("m-0 flex h-full flex-col rounded-xl border border-ip-rule-strong bg-white p-6", large && "sm:p-8")}>
      <p className={cn("m-0 font-semibold leading-none tracking-[-0.03em] text-black", large ? "text-[clamp(56px,6vw,80px)]" : "text-[clamp(40px,4vw,52px)]")}>
        {s.figure}
      </p>
      <blockquote className={cn("m-0 mt-4 text-black", large ? "text-[19px] leading-[1.45]" : "text-[16.5px] leading-[1.5]")}>{s.claim}</blockquote>
      {s.note && <p className="mt-2 mb-0 text-[13.5px] leading-[1.5] text-ip-muted">{s.note}</p>}
      <figcaption className="mt-auto pt-5 text-[13.5px] leading-[1.45] text-ip-body">
        <a href={s.url} target="_blank" rel="noopener" className="ip-link text-[13.5px]">
          {s.source}
        </a>
        <span className="text-ip-muted">
          {" "}
          · {formatDate(s.date)}
          {!s.primary && " · via secondary source"} · <sup>[{refNo.get(s.id)}]</sup>
        </span>
        {!s.verified && <VerifyBadge className="ml-2 mt-1" />}
      </figcaption>
    </figure>
  );
}

const Insights = () => {
  const hero = stats.find((s) => s.hero);
  return (
    <SiteLayout
      seo={{
        title: "Insights: why enterprise AI stalls on data, in numbers",
        description:
          "AI readiness gaps, agent failure rates, the cost of poor data and the market shifts reshaping data foundations, every figure linked to its source.",
        path: "/insights",
      }}
    >
      <PageHero
        crumbs={[{ label: "Resources", to: "/resources" }, { label: "Insights" }]}
        label="Insights"
        dot
        title="AI is moving faster than most enterprises’ data."
        lead="Enterprises are committing to AI agents. The numbers say most of their data isn’t ready, and that the gap, not the model, is what stops agents reaching production. Here is the evidence, every figure linked to its source."
        aside={hero ? <div className="sm:max-w-[400px]"><StatCard s={hero} large /></div> : undefined}
      >
        <a href="#what-to-do" className="ip-link text-[16px] font-medium">
          Skip to what leaders are doing about it
        </a>
      </PageHero>

      {SHOW_UNVERIFIED && (
        <div className="border-b border-ip-rule bg-[#fef3f2]">
          <p className="ip-container m-0 py-3 text-[13.5px] text-[#b42318]">
            Staging note: every figure was read on its linked page when added (22 Nov 2026). Gartner, McKinsey and Snowflake originals blocked automated checks, so those link to the reporting page plus the original. A person must open each link and set verified: true before launch; unverified figures are hidden in production.
          </p>
        </div>
      )}

      {insightThemes.map((t, i) => {
        const items = stats.filter((s) => s.theme === t.id && !s.hero);
        if (!items.length) return null;
        return (
          <section key={t.id} id={t.id} className={cn(i % 2 === 0 ? "bg-white" : "bg-ip-grey", "scroll-mt-24")}>
            <div className="ip-container ip-section">
              <SectionIntro label={t.label} title={t.title}>
                <p className="m-0">{t.intro}</p>
              </SectionIntro>
              <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", items.length >= 3 && "lg:grid-cols-3")}>
                {items.map((s) => (
                  <StatCard key={s.id} s={s} />
                ))}
              </div>
              {t.soWhat && (
                <p className="mt-8 mb-0 max-w-[760px] border-l-[3px] border-ip-orange pl-5 text-[17px] font-medium leading-[1.55] text-black">
                  {t.soWhat}
                  {t.link && (
                    <>
                      {" "}
                      <Link to={t.link.to} className="ip-link text-[17px] font-normal">
                        {t.link.label}
                      </Link>
                    </>
                  )}
                </p>
              )}
            </div>
          </section>
        );
      })}

      <section id="what-to-do" className="bg-black text-white scroll-mt-24">
        <div className="ip-container ip-section">
          <Label onDark className="mb-4">
            What leaders are doing about it
          </Label>
          <h2 className="ip-h2 m-0 max-w-[820px]">The enterprises that get agents into production fix the data first.</h2>
          <ol className="mt-10 mb-0 grid list-none grid-cols-1 gap-0 border-t border-white/30 p-0 md:grid-cols-2">
            {insightMoves.map((m, i) => (
              <li key={m.title} className={cn("border-b border-white/20 py-6", i % 2 === 0 ? "md:pr-10" : "md:border-l md:border-white/20 md:pl-10")}>
                <p className="m-0 text-[19px] font-semibold">
                  <span className="mr-3 font-mono text-[13px] text-ip-orange">{String(i + 1).padStart(2, "0")}</span>
                  {m.title}
                </p>
                <p className="mt-2 mb-0 text-[16px] leading-[1.6] text-ip-on-dark">
                  {m.body}{" "}
                  <Link to={m.to} className="text-white underline decoration-ip-orange underline-offset-4">
                    {m.linkLabel}
                  </Link>
                </p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <BookCta source="insights-moves" label="See where your data stands" />
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="bg-white">
        <div className="ip-container ip-section">
          <SectionIntro label="Sources" title="Every figure, and where it comes from.">
            <p className="m-0">
              Predictions are labelled as predictions, and survey figures as survey figures. Where we could only find a figure reported by a secondary source, we say so and name the original. Spotted an error?{" "}
              <a className="ip-link" href="mailto:support@inclinedplane.com">
                Tell us
              </a>
              .
            </p>
          </SectionIntro>
          <ol className="m-0 list-none space-y-2.5 border-t-2 border-black p-0 pt-5 text-[14.5px] leading-[1.55]">
            {stats.map((s) => (
              <li key={s.id} className="grid grid-cols-[36px_1fr] gap-2">
                <span className="font-mono text-ip-muted">[{refNo.get(s.id)}]</span>
                <span className="text-ip-body">
                  <a href={s.url} target="_blank" rel="noopener" className="ip-link text-[14.5px]">
                    {s.source}
                  </a>
                  , {formatDate(s.date)}.
                  {s.note && <Fragment> {s.note}</Fragment>}
                  {s.primaryUrl && (
                    <Fragment>
                      {" "}
                      <a href={s.primaryUrl} target="_blank" rel="noopener" className="ip-link text-[14.5px]">
                        Original source
                      </a>
                      .
                    </Fragment>
                  )}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <NextSteps
        tone="grey"
        steps={[
          { kicker: "Concept", title: "Context engineering, explained", body: "The layers that close the gap these numbers describe.", to: "/context-engineering" },
          { kicker: "Tool", title: "Score your own data", body: "The 16-point AI data readiness checklist.", to: "/readiness-checklist" },
          { kicker: "Solutions", title: "IncLever and PipelineIQ", body: "Products that check readiness and reliability.", to: "/products" },
        ]}
      />

      <CtaBand source="mid-insights" />
    </SiteLayout>
  );
};

export default Insights;
