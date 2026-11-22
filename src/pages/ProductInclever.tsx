/**
 * /products/inclever — IncLever, our accelerator for Contextualize and Enable
 * (brief §7.4). Told as four steps that make an AI answer safe:
 * check the data → hold the AI to your definitions → answer through three
 * gates → keep watch. Hero: the sample-data demo clip. Each step has one
 * interactive piece (two assistants, certificate, question flow); the page
 * closes on proof and the trust layer it forms with PipelineIQ.
 * Content: src/content/inclever.ts.
 */
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { incleverDemoUrl, incleverPains, auditStages, verdicts, answerLevels, tasks, surfaces, personas, comparison, howItRuns, incleverFaq } from "@/content/inclever";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { ArrowIcon, Label, Verified, VerifyBadge, buttonClass } from "@/components/site/primitives";
import { Breadcrumbs, Faq, IncleverDemoFrame } from "@/components/site/sections";
import { ComparisonTable, InclineFit, TrustChain } from "@/components/site/products/diagrams";
import { DemoRequest } from "@/components/site/products/DemoRequest";
import { ChapterNav } from "@/components/site/products/demoKit";
import { QuestionFlow } from "@/components/site/products/inc/QuestionFlow";
import { TwoAssistants } from "@/components/site/products/inc/TwoAssistants";
import { Certificate } from "@/components/site/products/inc/Certificate";
import { caseById } from "@/components/site/cases/caseData";
import { NextSteps } from "@/components/site/NextSteps";
import { cn } from "@/lib/utils";

const chapters = [
  { id: "problem", label: "The problem" },
  { id: "check", label: "Check" },
  { id: "define", label: "Define" },
  { id: "answer", label: "Answer" },
  { id: "watch", label: "Keep watch" },
  { id: "who", label: "Who relies on it" },
  { id: "proof", label: "Proof" },
];

const story = [
  { step: "Check", title: "Check the data", body: "Versioned rules, an evidenced verdict for each, a certificate issued or withheld." },
  { step: "Define", title: "Hold the AI to your definitions", body: "It selects from what you’ve defined. It never invents a metric." },
  { step: "Answer", title: "Answer through three gates", body: "Entitlement, answerability, assurance. Always in that order." },
  { step: "Keep watch", title: "Keep watch", body: "Every decision on record; every gap becomes owned work." },
];

const h2 = "m-0 text-[clamp(30px,3.6vw,46px)] font-semibold leading-[1.06] tracking-[-0.025em]";

function ChapterLabel({ n, children, onDark = false }: { n: number; children: string; onDark?: boolean }) {
  return (
    <Label className="mb-5" onDark={onDark}>
      <span className={cn("font-mono", onDark ? "text-ip-orange" : "text-ip-orange-ink")}>{String(n).padStart(2, "0")}</span>
      <span aria-hidden="true">·</span>
      {children}
    </Label>
  );
}

function DemoLink({ variant = "primary" as "primary" | "secondary" }) {
  return (
    <a href={incleverDemoUrl} target="_blank" rel="noopener" className={buttonClass(variant)}>
      Try the interactive demo
      <ArrowIcon />
    </a>
  );
}

const proof = caseById["governed-finance-semantic-layer"];

const ProductInclever = () => (
  <SiteLayout
    seo={{
      title: "IncLever: AI data readiness and governed analytics",
      description:
        "IncLever audits data and definitions against explicit rules, certifies readiness with evidence, and answers questions only on data that has passed.",
      path: "/products/inclever",
    }}
  >
    {/* Hero */}
    <section className="relative overflow-hidden border-b border-ip-rule bg-white">
      <div className="ip-container pt-[clamp(36px,5vw,72px)] pb-[clamp(40px,5vw,72px)]">
        <Breadcrumbs items={[{ label: "Solutions", to: "/products" }, { label: "IncLever" }]} />
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <Label dot className="mb-5">
              IncLever · our accelerator for Contextualize and Enable
            </Label>
            <h1 className="ip-h1-page m-0">AI answers you can audit.</h1>
            <p className="ip-lead mt-6 mb-0 max-w-[580px]">
              IncLever checks your data and its business definitions against explicit rules, shows the evidence for every finding, and lets people and AI agents ask questions only of data that has passed.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <DemoLink />
              <a href="#answer" className={buttonClass("secondary")}>
                Watch a question travel
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Audit", "Remediate", "Monitor", "Intelligent Routing"].map((t) => (
                <span key={t} className="ip-label-sm !text-black rounded border border-ip-rule-strong px-2.5 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-col gap-3">
            <IncleverDemoFrame />
          </div>
        </div>

        <ol className="mt-12 mb-0 grid list-none grid-cols-1 gap-0 border-t border-ip-rule p-0 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {story.map((s, i) => (
            <li key={s.step} className={cn("relative py-3 pr-5", i > 0 && "lg:border-l lg:border-ip-rule lg:pl-5")}>
              <a href={`#${chapters[i + 1].id}`} className="group block no-underline">
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ip-orange-ink">Step {i + 1}</span>
                <span className="mt-1 block text-[17px] font-semibold text-black group-hover:underline underline-offset-4 decoration-1">{s.title}</span>
                <span className="mt-1 block text-[14px] leading-[1.5] text-ip-body">{s.body}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <ChapterNav chapters={chapters} />

    {/* 01 The problem */}
    <section id="problem" className="scroll-mt-32 bg-ip-grey">
      <div className="ip-container ip-section">
        <ChapterLabel n={1}>The problem</ChapterLabel>
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={h2}>Agents fail on data nobody has checked or defined.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-body">
            Most companies want an AI agent in front of their data. Almost none can say, with evidence, whether that data is fit for an AI to answer from. What we hear from data leaders:
          </p>
        </div>
        <ul className="m-0 mb-14 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-3">
          {incleverPains.map((q) => (
            <li key={q} className="rounded-xl border border-ip-rule-strong bg-white p-6">
              <blockquote className="m-0 text-[clamp(17px,1.6vw,20px)] font-medium leading-[1.45]">“{q}”</blockquote>
            </li>
          ))}
        </ul>
        <TwoAssistants />
      </div>
    </section>

    {/* 02 Check */}
    <section id="check" className="scroll-mt-32 bg-white">
      <div className="ip-container ip-section">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <ChapterLabel n={2}>Check the data</ChapterLabel>
            <h2 className={h2}>Every data asset audited against explicit rules.</h2>
            <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">
              The AI Readiness Control Tower never answers business questions. It runs versioned rules against each data asset and business definition, records a verdict for each, and issues or withholds a readiness certificate. Evidence past its shelf life counts as no evidence, never as a pass.
            </p>
            <dl className="m-0 mt-7 border-t-2 border-black">
              {verdicts.map((v) => (
                <div key={v.name} className="grid grid-cols-[130px_1fr] gap-3 border-b border-ip-rule-strong py-3 text-[15px]">
                  <dt className="font-semibold">{v.name}</dt>
                  <dd className="m-0 text-ip-body">{v.body}</dd>
                </div>
              ))}
            </dl>
          </div>
          <Certificate />
        </div>

        <p className="ip-label-sm mt-16 mb-4">The audit, stage by stage</p>
        <ol className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {auditStages.map((s, i) => (
            <li key={s.title} className={cn("flex flex-col rounded-lg border p-4", i === auditStages.length - 1 ? "border-ip-orange bg-ip-orange-tint" : "border-ip-rule-strong")}>
              <span className="font-mono text-[11px] text-ip-muted">{String(i).padStart(2, "0")}</span>
              <span className="mt-1 text-[15.5px] font-semibold leading-[1.25]">{s.title}</span>
              <span className="mt-1.5 text-[13px] leading-[1.45] text-ip-body">{s.checks}</span>
              <span className="mt-auto pt-3 text-[12px] leading-[1.4] text-ip-muted">Flags: {s.flag}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* 03 Define */}
    <section id="define" className="scroll-mt-32 bg-ip-grey">
      <div className="ip-container ip-section grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <div>
          <ChapterLabel n={3}>Hold the AI to your definitions</ChapterLabel>
          <h2 className={h2}>It selects. It never invents.</h2>
          <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">
            The AI can only pick from the metrics, dimensions and time windows your organization has defined. If nothing matches, it says so, and the gap becomes owned work: declare the metric, or teach it the word your people use.
          </p>
          <p className="mt-5 mb-0 text-[16px]">
            <Link to="/context-engineering" className="ip-link text-[16px]">
              Why definitions matter: context engineering, explained
            </Link>
          </p>
        </div>
        <div className="rounded-xl border border-ip-rule-strong bg-white p-5 sm:p-6">
          <p className="ip-label-sm m-0 mb-4">Every gap becomes a task, with an owner and a clock</p>
          <ol className="m-0 list-none space-y-2 p-0">
            {tasks.map((t) => (
              <li key={t.task} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-ip-rule px-3.5 py-2.5 sm:grid-cols-[140px_1fr_150px_auto]">
                <span className="text-[15px] font-semibold">{t.task}</span>
                <span className="order-3 col-span-2 text-[13.5px] text-ip-body sm:order-none sm:col-span-1">{t.when}</span>
                <span className="hidden text-[13px] text-ip-muted sm:block">{t.owner}</span>
                <span className="rounded bg-black px-2 py-0.5 text-right font-mono text-[12px] text-white">{t.clock}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    {/* 04 Answer */}
    <section id="answer" className="scroll-mt-32 bg-white">
      <div className="ip-container ip-section">
        <ChapterLabel n={4}>Answer through three gates</ChapterLabel>
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={h2}>Plain-English answers, only when the data has earned them.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-body">
            People ask in Microsoft Teams. Every confirmed question passes three gates, always in the same order. Answers carry their evidence; otherwise IncLever holds the answer for a named reviewer, or refuses and names the failing check. Pick a question and watch.
          </p>
        </div>
        <QuestionFlow />
        <div className="mt-12 grid gap-8 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <h3 className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.15] tracking-[-0.015em]">Four levels of answer, set by the audit verdicts.</h3>
            <p className="mt-3 mb-0 text-[15.5px] leading-[1.6] text-ip-body">
              Intelligent Routing answers from signed-off dashboards first, which avoids redundant model queries and keeps answers consistent with what people already trust.
            </p>
          </div>
          <dl className="m-0 grid grid-cols-1 border-t-2 border-black sm:grid-cols-2">
            {answerLevels.map((l, i) => (
              <div key={l.name} className={cn("border-b border-ip-rule-strong py-4", i % 2 === 1 ? "sm:border-l sm:pl-5" : "sm:pr-5")}>
                <dt className="text-[16px] font-semibold">{l.name}</dt>
                <dd className="m-0 mt-1 text-[14px] leading-[1.5] text-ip-body">{l.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>

    {/* 05 Keep watch */}
    <section id="watch" className="scroll-mt-32 bg-black text-white">
      <div className="ip-container ip-section">
        <ChapterLabel n={5} onDark>
          Keep watch
        </ChapterLabel>
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-end">
          <h2 className={h2}>In your environment, on your rules, on the record.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-on-dark">Readiness isn’t a one-off report. IncLever keeps checking, keeps a permanent record of every decision, and routes every gap to the person who owns it.</p>
        </div>
        <div className="grid grid-cols-1 border-t border-white/30 sm:grid-cols-2 lg:grid-cols-4">
          {howItRuns.map((h, i) => (
            <Verified key={h.title} item={h} badge={false}>
              <div className={cn("border-b border-white/20 py-6 pr-6", i > 0 && "lg:border-l lg:border-white/20 lg:pl-6", i % 2 === 1 && "sm:border-l sm:border-white/20 sm:pl-6")}>
                <p className="m-0 text-[18px] font-semibold">{h.title}</p>
                <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-on-dark">{h.body}</p>
                {!h.verified && <VerifyBadge className="mt-3" />}
              </div>
            </Verified>
          ))}
        </div>
        <p className="ip-label-sm mt-12 mb-4 !text-ip-on-dark">Four surfaces</p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {surfaces.map((s) => (
            <div key={s.name} className="rounded-lg border border-white/25 p-4">
              <p className="m-0 text-[16px] font-semibold">{s.name}</p>
              <p className="mt-1 mb-0 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ip-orange">{s.who}</p>
              <p className="mt-2 mb-0 text-[14px] leading-[1.5] text-ip-on-dark">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 06 Who relies on it */}
    <section id="who" className="scroll-mt-32 bg-white">
      <div className="ip-container ip-section">
        <ChapterLabel n={6}>Who relies on it</ChapterLabel>
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={h2}>Used by the people who need the numbers, governed by the people who own them.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-body">Chatbots answer anything but can’t tell you when they’re wrong. Dashboards are trustworthy but only answer what someone built in advance. IncLever is built to give you both.</p>
        </div>
        <ul className="m-0 mb-14 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {personas.map((p) => (
            <li key={p.role} className="flex flex-col rounded-lg border border-ip-rule-strong p-4">
              <span className="text-[15.5px] font-semibold">{p.role}</span>
              <span className="mt-1.5 text-[13.5px] leading-[1.45] text-ip-muted">{p.cares}</span>
              <span className="mt-3 border-t border-ip-rule pt-3 text-[14px] leading-[1.5] text-black">{p.gets}</span>
            </li>
          ))}
        </ul>
        <ComparisonTable columns={comparison.columns} rows={comparison.rows} highlight={2} />
      </div>
    </section>

    {/* 07 Proof + trust layer */}
    <section id="proof" className="scroll-mt-32 bg-ip-grey">
      <div className="ip-container ip-section">
        <ChapterLabel n={7}>Proof, and where it fits</ChapterLabel>
        {proof ? (
          <Link
            to={`/case-studies/${proof.id}`}
            className="group grid gap-8 rounded-xl border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-6 no-underline transition-colors hover:border-black hover:border-t-ip-orange sm:p-9 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center"
          >
            <span className="flex flex-col gap-3">
              <span className="ip-label-sm">Case study · {proof.cs.industry}</span>
              <span className="text-[clamp(24px,2.6vw,34px)] font-semibold leading-[1.15] tracking-[-0.02em] text-black group-hover:underline underline-offset-4 decoration-1">{proof.meta.title}</span>
              <span className="text-[16px] leading-[1.6] text-ip-body">{proof.cs.summary}</span>
              <span className="mt-2 text-[15px] font-semibold text-black">
                Read the case study <span aria-hidden="true">→</span>
              </span>
            </span>
            <span className="grid grid-cols-2 gap-0 border-t border-ip-rule lg:border-t-0 lg:border-l lg:pl-8">
              {(proof.cs.metrics ?? []).slice(0, 4).map((m, i) => (
                <span key={m.label} className={cn("flex flex-col py-4", i % 2 === 1 && "border-l border-ip-rule pl-4", i >= 2 && "border-t border-ip-rule")}>
                  <span className="text-[30px] font-semibold leading-none tracking-[-0.02em] text-black">{`${m.prefix ?? ""}${m.value}${m.suffix ?? ""}`}</span>
                  <span className="mt-1.5 text-[13px] leading-[1.4] text-ip-body">{m.label}</span>
                </span>
              ))}
            </span>
          </Link>
        ) : (
          SHOW_UNVERIFIED && (
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-ip-rule-dashed bg-white px-6 py-5">
              <span className="text-[15px] text-ip-muted">The governed finance semantic layer case study appears here once PR #20 is merged.</span>
              <VerifyBadge />
            </div>
          )
        )}

        <div className="mt-14 grid gap-10 [&>*]:min-w-0 lg:grid-cols-2">
          <div className="rounded-xl border border-ip-rule-strong bg-white p-5 sm:p-6">
            <p className="ip-label-sm m-0 mb-3">With our team</p>
            <p className="m-0 text-[clamp(20px,2vw,24px)] font-semibold leading-[1.3]">{site.incleverLine2}</p>
            <div className="mt-5">
              <InclineFit caption="IncLever speeds up Contextualize and Enable. Build and Activate are where the rest of our work sits." />
            </div>
          </div>
          <div className="rounded-xl border border-ip-rule-strong bg-white p-5 sm:p-6">
            <p className="ip-label-sm m-0 mb-3">The trust layer</p>
            <p className="m-0 text-[clamp(20px,2vw,24px)] font-semibold leading-[1.3]">PipelineIQ checks the data arrives. IncLever checks it’s ready for any agent.</p>
            <div className="mt-5">
              <TrustChain />
            </div>
            <Link to="/products/pipelineiq" className="ip-link mt-4 inline-block text-[15px]">
              Meet PipelineIQ
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="ip-container ip-section max-w-[1000px] !mx-auto">
        <Faq items={incleverFaq} />
      </div>
    </section>

    <DemoRequest initial={["inclever"]} intro="Watch questions travel through the three gates live, see a readiness certificate issued and withheld, and talk through what an assessment on one of your data assets involves." />

    <NextSteps
      steps={[
        { kicker: "Start here", title: "The AI Data Readiness Assessment", body: "A free 45-minute look at your data, backed by IncLever.", to: "/assessment" },
        { kicker: "Solutions", title: "PipelineIQ: is the data arriving reliably?", body: "The other half of the trust layer.", to: "/products/pipelineiq" },
        { kicker: "Capability", title: "AI and Agent Readiness", body: "The Enable step IncLever accelerates.", to: "/capabilities/ai-agent-readiness" },
      ]}
    />
  </SiteLayout>
);

export default ProductInclever;
