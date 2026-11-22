/**
 * /products/inclever — IncLever, our accelerator for Contextualize and Enable
 * (brief §7.4). Substance kept from the previous page, restructured:
 * hero → problem → what it does (readiness checks, context and definitions,
 * governed natural-language analytics) → demo → how it runs → with our team /
 * where it fits → who relies on it → comparison → proof → FAQ → demo request.
 * The demo frame is the page's one memorable moment.
 */
import { site } from "@/content/site";
import {
  incleverDemoUrl,
  incleverPains,
  auditStages,
  verdicts,
  gates,
  answerLevels,
  tasks,
  surfaces,
  personas,
  comparison,
  howItRuns,
  incleverFaq,
} from "@/content/inclever";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowIcon, Label, SectionIntro, Verified, VerifyBadge, buttonClass } from "@/components/site/primitives";
import { BookCta, Faq, IncleverDemoFrame, PageHero } from "@/components/site/sections";
import { ComparisonTable, InclineFit } from "@/components/site/products/diagrams";
import { DemoRequest } from "@/components/site/products/DemoRequest";
import { RowsTable } from "@/components/site/products/RowsTable";
import { cn } from "@/lib/utils";

function DemoLink({ variant = "primary" as "primary" | "secondary" }) {
  return (
    <a href={incleverDemoUrl} target="_blank" rel="noopener" className={buttonClass(variant)}>
      Try the interactive demo
      <ArrowIcon />
    </a>
  );
}

const ProductInclever = () => (
  <SiteLayout
    seo={{
      title: "IncLever: AI data readiness and governed analytics",
      description:
        "IncLever audits data and definitions against explicit rules, certifies readiness with evidence, and answers questions only on data that has passed.",
      path: "/products/inclever",
    }}
  >
    <PageHero
      crumbs={[{ label: "Solutions", to: "/products" }, { label: "IncLever" }]}
      label="Our accelerator for Contextualize and Enable"
      dot
      title="IncLever"
      lead="The control plane for trusted, AI-ready data. IncLever checks your data and its business definitions against explicit rules, shows the evidence for every finding, and lets people and AI agents ask questions only of data that has passed."
      aside={
        <div className="flex w-[calc(100vw-32px)] flex-wrap gap-2 md:w-[300px]">
          {["Audit", "Remediate", "Monitor", "Intelligent Routing"].map((t) => (
            <span key={t} className="ip-label !text-black rounded border border-black px-2.5 py-1.5 !tracking-[0.06em]">
              {t}
            </span>
          ))}
        </div>
      }
    >
      <DemoLink />
      <BookCta source="hero-inclever" variant="secondary" label={site.cta.header} arrow={false} />
    </PageHero>

    {/* The problem */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="The problem" title="Agents and analytics fail on data nobody has checked or defined." titleClass="text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.02em]">
          <p className="m-0">
            Most companies want to put an AI agent in front of their data. Almost none can say, with evidence, whether that data is fit for an AI to answer from. What we hear from data leaders:
          </p>
        </SectionIntro>
        <ul className="m-0 grid list-none grid-cols-1 border-t-2 border-black p-0 md:grid-cols-3">
          {incleverPains.map((q, i) => (
            <li key={q} className={cn("border-b border-ip-rule-strong py-6 md:pr-8", i > 0 && "md:border-l md:pl-8")}>
              <blockquote className="m-0 text-[clamp(18px,1.7vw,21px)] font-medium leading-[1.4]">“{q}”</blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* What it does */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="What it does" title="Three jobs, in the order that makes answers safe.">
          <p className="m-0">IncLever never guesses. It checks the data, holds the AI to your definitions, and only then answers.</p>
        </SectionIntro>

        {/* 1. Readiness checks */}
        <div className="grid gap-10 [&>*]:min-w-0 border-t-2 border-black py-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Label small className="mb-3">
              Readiness checks, with evidence
            </Label>
            <h3 className="m-0 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.015em]">Every data asset audited against explicit rules.</h3>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">
              The AI Readiness Control Tower never answers business questions. It runs versioned rules against each data asset and business definition, records a verdict for each, and issues or withholds a readiness certificate. Evidence that has aged past its shelf life counts as no evidence, never as a pass.
            </p>
            <dl className="m-0 mt-6 border-t border-ip-rule">
              {verdicts.map((v) => (
                <div key={v.name} className="grid grid-cols-[120px_1fr] gap-3 border-b border-ip-rule py-2.5 text-[15px]">
                  <dt className="font-semibold">{v.name}</dt>
                  <dd className="m-0 text-ip-body">{v.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div>
            <p className="ip-label-sm m-0 mb-3">The audit, stage by stage</p>
            <ol className="m-0 list-none border-t border-ip-rule p-0">
              {auditStages.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[36px_1fr] gap-3 border-b border-ip-rule py-3.5 sm:grid-cols-[36px_170px_1fr] sm:gap-4">
                  <span className="font-mono text-[13px] text-ip-muted">{String(i).padStart(2, "0")}</span>
                  <span className="text-[16px] font-semibold">{s.title}</span>
                  <span className="col-span-2 text-[14px] leading-[1.5] text-ip-body sm:col-span-1">
                    {s.checks} <span className="text-ip-muted">Flags: {s.flag}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* 2. Context and definitions */}
        <div className="grid gap-10 [&>*]:min-w-0 border-t-2 border-black py-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Label small className="mb-3">
              Context and definitions
            </Label>
            <h3 className="m-0 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.015em]">It selects. It never invents.</h3>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">
              The AI can only pick from the metrics, dimensions and time windows your organization has defined. If nothing matches, it says so, and the gap becomes owned work: declare the metric, or teach it the word your people use.
            </p>
          </div>
          <div>
            <p className="ip-label-sm m-0 mb-3">Every gap becomes a task with an owner and a clock</p>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-[15px]">
                <thead>
                  <tr className="border-b-2 border-black text-left">
                    <th scope="col" className="py-2 pr-3 font-semibold">Task</th>
                    <th scope="col" className="py-2 pr-3 font-semibold">When</th>
                    <th scope="col" className="py-2 pr-3 font-semibold">Owner</th>
                    <th scope="col" className="py-2 text-right font-semibold">Clock</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((t) => (
                    <tr key={t.task} className="border-b border-ip-rule align-top">
                      <td className="py-2.5 pr-3 font-medium">{t.task}</td>
                      <td className="py-2.5 pr-3 text-ip-body">{t.when}</td>
                      <td className="py-2.5 pr-3 text-ip-body">{t.owner}</td>
                      <td className="py-2.5 text-right font-mono text-[13px]">{t.clock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 3. Governed analytics */}
        <div className="grid gap-10 [&>*]:min-w-0 border-t-2 border-black pt-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Label small className="mb-3">
              Natural-language analytics on governed data
            </Label>
            <h3 className="m-0 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.015em]">Plain-English answers, only when the data has earned them.</h3>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">
              People ask in Microsoft Teams. Every confirmed question passes three gates, always in the same order. Answers carry their evidence; otherwise IncLever holds the answer for a named reviewer, or refuses and names the failing check. Its Intelligent Routing layer answers from signed-off dashboards first, which avoids redundant LLM queries and keeps answers consistent.
            </p>
          </div>
          <div className="flex flex-col gap-8">
            <ol className="m-0 grid list-none grid-cols-1 gap-2 p-0 sm:grid-cols-3">
              {gates.map((g, i) => (
                <li key={g.name} className={cn("rounded-lg border p-4", i === 2 ? "border-ip-orange bg-ip-orange-tint" : "border-ip-rule-strong bg-white")}>
                  <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ip-muted">Gate {i + 1}</span>
                  <p className="mt-1 mb-0 text-[17px] font-semibold">{g.name}</p>
                  <p className="mt-1.5 mb-0 text-[14px] leading-[1.5] text-ip-body">{g.body}</p>
                </li>
              ))}
            </ol>
            <div>
              <p className="ip-label-sm m-0 mb-3">Four levels of answer, set by the audit verdicts</p>
              <dl className="m-0 grid grid-cols-1 border-t border-ip-rule sm:grid-cols-2">
                {answerLevels.map((l, i) => (
                  <div key={l.name} className={cn("border-b border-ip-rule py-3", i % 2 === 1 ? "sm:border-l sm:pl-5" : "sm:pr-5")}>
                    <dt className="text-[15px] font-semibold">{l.name}</dt>
                    <dd className="m-0 mt-1 text-[14px] leading-[1.5] text-ip-body">{l.body}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Demo */}
    <section id="demo" className="bg-ip-grey scroll-mt-24">
      <div className="ip-container ip-section grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Label dot className="mb-4">
            Interactive demo
          </Label>
          <h2 className="ip-h2 m-0">Run an audit on sample data.</h2>
          <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-body">
            See an audit run, the problems it finds and AI questions being checked against the verdicts. It takes about five minutes, uses fictional data and needs nothing installed.
          </p>
          <div className="mt-7 flex flex-wrap gap-3.5">
            <DemoLink />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <IncleverDemoFrame />
        </div>
      </div>
    </section>

    {/* How it runs + surfaces */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="How it runs" title="In your environment, on your rules." />
        <div className="grid grid-cols-1 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-4">
          {howItRuns.map((h, i) => (
            <Verified key={h.title} item={h} badge={false}>
              <div className={cn("border-b border-ip-rule-strong py-6 pr-6", i > 0 && "lg:border-l lg:pl-6", i % 2 === 1 && "sm:border-l sm:pl-6")}>
                <p className="m-0 text-[18px] font-semibold">{h.title}</p>
                <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{h.body}</p>
                {!h.verified && <VerifyBadge className="mt-3" />}
              </div>
            </Verified>
          ))}
        </div>

        <p className="ip-label-sm mt-14 mb-3">Four surfaces</p>
        <RowsTable columns={["Surface", "For", "What it does"]} rows={surfaces.map((x) => [x.name, x.who, x.body])} />
      </div>
    </section>

    {/* With our team + where it fits */}
    <section className="bg-black text-white">
      <div className="ip-container ip-section grid gap-12 [&>*]:min-w-0 lg:grid-cols-2 lg:items-end">
        <div>
          <Label onDark className="mb-4">
            With our team
          </Label>
          <p className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.25] tracking-[-0.015em]">{site.incleverLine2}</p>
          <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-on-dark">{site.incleverLine}</p>
        </div>
        <div className="rounded-xl bg-white p-5 text-black sm:p-6">
          <InclineFit caption="IncLever speeds up Contextualize and Enable. Build and Activate are where the rest of our work sits." />
        </div>
      </div>
    </section>

    {/* Who relies on it */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Who relies on it" title="Built for the people who use the data, governed by the people who own it." titleClass="text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.02em]" />
        <RowsTable columns={["Role", "Cares about", "Gets"]} rows={personas.map((x) => [x.role, x.cares, x.gets])} minWidth={620} />

        <div className="mt-16">
          <SectionIntro label="Compared" title="A chatbot, a dashboard, or both." titleClass="text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.02em]">
            <p className="m-0">Chatbots answer anything but can’t tell you when they’re wrong. Dashboards are trustworthy but only answer what someone built in advance. IncLever is built to give you both.</p>
          </SectionIntro>
          <ComparisonTable columns={comparison.columns} rows={comparison.rows} highlight={2} />
        </div>
      </div>
    </section>

    {/* Proof: staging-only placeholder until an approved result exists */}
    {SHOW_UNVERIFIED && (
      <section className="bg-white border-t border-ip-rule">
        <div className="ip-container py-12">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-ip-rule-dashed bg-ip-grey px-6 py-5">
            <span className="ip-label-sm">Proof</span>
            <span className="text-[15px] text-ip-muted">An approved, anonymized IncLever result goes here (industry, what it found, what changed).</span>
            <VerifyBadge />
          </div>
        </div>
      </section>
    )}

    <section className="bg-white border-t border-ip-rule">
      <div className="ip-container ip-section max-w-[1000px] !mx-auto">
        <Faq items={incleverFaq} />
      </div>
    </section>

    <DemoRequest initial={["inclever"]} intro="Watch questions travel through the three gates live, see a readiness certificate issued and withheld, and talk through what an assessment on one of your data assets involves." />
  </SiteLayout>
);

export default ProductInclever;
