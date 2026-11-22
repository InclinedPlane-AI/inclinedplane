/**
 * /products/pipelineiq — pipeline reliability (brief §7.5). Proposed product,
 * MVP stage; the client it runs on stays confidential.
 *
 * Told as one story, the four questions an engineer asks when a night fails:
 * what failed (live today) → why → what does it break → how do we fix it.
 * The hero shows the recorded portal walkthrough (demo data, sample client) and
 * where the product is on that path; each chapter has one interactive piece
 * (debug trail, signature collapse, alert storm, adaptive thresholds, SQL
 * guard); the roadmap closes the loop. Content: src/content/pipelineiq.ts.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { piqLine, piqStatus, piqPillars, piqPersonas, piqAlerts, piqGuarantees, piqSteps, piqLayers, piqFindings, piqAlertNoise, piqFaq, piqVideo, type Severity } from "@/content/pipelineiq";
import { PRODUCTS } from "@/data/products";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Breadcrumbs, Faq } from "@/components/site/sections";
import { Label, Verified, VerifyBadge, buttonClass } from "@/components/site/primitives";
import { IncidentView } from "@/components/site/products/IncidentView";
import { DemoRequest } from "@/components/site/products/DemoRequest";
import { TrustChain } from "@/components/site/products/diagrams";
import { ChapterNav, DemoVideo } from "@/components/site/products/demoKit";
import { DebugTrail } from "@/components/site/products/piq/DebugTrail";
import { SignatureCollapse } from "@/components/site/products/piq/SignatureCollapse";
import { AdaptiveThreshold } from "@/components/site/products/piq/AdaptiveThreshold";
import { SqlGuard } from "@/components/site/products/piq/SqlGuard";
import { FourQuestions } from "@/components/site/products/piq/FourQuestions";
import { NextSteps } from "@/components/site/NextSteps";
import { cn } from "@/lib/utils";

const piq = PRODUCTS.find((p) => p.id === "pipelineiq")!;

const chapters = [
  { id: "morning", label: "The morning after" },
  { id: "error-index", label: "Error index" },
  { id: "alerts", label: "Alerts" },
  { id: "safety", label: "Safety" },
  { id: "who", label: "Who it’s for" },
  { id: "deploy", label: "How we deploy it" },
  { id: "findings", label: "Findings" },
  { id: "heading", label: "Where it’s heading" },
];

const sevCls: Record<Severity, string> = {
  High: "bg-[#fef3f2] text-[#b42318]",
  Medium: "bg-ip-orange-tint text-ip-orange-ink",
  Low: "bg-ip-grey-100 text-ip-body",
  Custom: "bg-black text-white",
};

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

function Personas() {
  const [i, setI] = useState(0);
  const p = piqPersonas[i];
  return (
    <div className="rounded-xl border border-ip-rule-strong bg-white p-4 sm:p-6">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Roles">
        {piqPersonas.map((x, j) => (
          <button
            key={x.role}
            type="button"
            role="tab"
            aria-selected={i === j}
            onClick={() => setI(j)}
            className={cn(
              "min-h-[38px] rounded-md border px-3 text-[13.5px] font-medium transition-colors",
              i === j ? "border-black bg-black text-white" : "border-ip-rule-strong text-ip-body hover:border-black",
            )}
          >
            {x.role}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-6 grid gap-6 border-t border-ip-rule pt-6 md:grid-cols-2">
        <div>
          <p className="ip-label-sm m-0 mb-3">The questions they bring</p>
          <div className="flex flex-wrap gap-2">
            {p.asks.map((a) => (
              <span key={a} className="rounded-xl rounded-bl-sm bg-ip-grey px-3.5 py-2 text-[15px] text-black">
                {a}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="ip-label-sm m-0 mb-3 !text-ip-orange-ink">Where PipelineIQ answers</p>
          <p className="m-0 text-[17px] leading-[1.55] text-black">{p.answers}</p>
        </div>
      </div>
    </div>
  );
}

const ProductPipelineIQ = () => (
  <SiteLayout
    seo={{
      title: "PipelineIQ: pipeline monitoring and ETL debugging",
      description:
        "Read-only pipeline monitoring, alerting and ETL debugging that turns hundreds of failures into a few root causes. Know each morning if data is safe to use.",
      path: "/products/pipelineiq",
    }}
  >
    {/* Hero */}
    <section className="relative overflow-hidden border-b border-ip-rule bg-white">
      <div className="ip-container pt-[clamp(36px,5vw,72px)] pb-[clamp(40px,5vw,72px)]">
        <Breadcrumbs items={[{ label: "Solutions", to: "/products" }, { label: "PipelineIQ" }]} />
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <Label className="mb-5">PipelineIQ · pipeline reliability</Label>
            <h1 className="m-0 text-[clamp(40px,4.4vw,62px)] font-semibold leading-[1.02] tracking-[-0.03em]">{piqLine}</h1>
            <p className="ip-lead mt-6 mb-0 max-w-[560px]">{piq.brief} Read-only, built around your estate, and watching before anyone opens a report.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a href="#morning" className={buttonClass("primary")}>
                See how it works
              </a>
              <a href="#demo-request" className={buttonClass("secondary")}>
                Request a live demo
              </a>
            </div>
            <Verified item={piqStatus} badge={false}>
              <p className="mt-5 mb-0 flex flex-wrap items-center gap-2 text-[14px] text-ip-muted">
                {piqStatus.text} {!piqStatus.verified && <VerifyBadge />}
              </p>
            </Verified>
          </div>
          <div className="min-w-0">
            <DemoVideo src={piqVideo.src} poster={piqVideo.poster} title="PipelineIQ portal" tag={piqVideo.tag} label={piqVideo.label} aspect={piqVideo.aspect} />
            <p className="mt-3 mb-0 text-[13.5px] text-ip-body">{piqVideo.caption}</p>
          </div>
        </div>
        <div className="mt-12 border-t border-ip-rule pt-6">
          <p className="ip-label-sm m-0 mb-4">Where it’s heading: four questions after a failed night</p>
          <FourQuestions compact />
        </div>
      </div>
    </section>

    <ChapterNav chapters={chapters} />

    {/* 01 The morning after */}
    <section id="morning" className="scroll-mt-32 bg-ip-grey">
      <div className="ip-container ip-section">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <ChapterLabel n={1}>The morning after</ChapterLabel>
            <h2 className={h2}>When a night fails, the evidence is scattered.</h2>
            <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">
              The run log knows that a load failed. The orchestrator knows why, buried several clicks deep and kept for about 45 days. The compute engine holds the stack trace, one run at a time. And nobody holds the patterns: which errors recur, which tables are late against their own rhythm, whether a release caused it.
            </p>
            <p className="mt-4 mb-0 text-[17px] font-medium leading-[1.6] text-black">Most data issues are found by the person reading the report. We’d rather find them at 3am, before anyone does.</p>
          </div>
          <DebugTrail />
        </div>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {piqPillars.map((p, i) => (
            <div key={p.title} className="rounded-xl border border-ip-rule-strong bg-white p-6">
              <span className="font-mono text-[12px] text-ip-orange-ink">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 mb-0 text-[20px] font-semibold">{p.title}</h3>
              <p className="mt-2 mb-0 text-[15px] leading-[1.6] text-ip-body">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 02 Error index */}
    <section id="error-index" className="scroll-mt-32 bg-white">
      <div className="ip-container ip-section grid items-center gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
        <div>
          <ChapterLabel n={2}>The error index</ChapterLabel>
          <h2 className={h2}>Hundreds of failures. A handful of problems.</h2>
          <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">
            PipelineIQ merges failures from every tool into one history, separates the root cause from the parents that failed only because a child did, and fingerprints each error so the same fault groups together across runs, tables and environments.
          </p>
          <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-body">
            Each signature opens to the real stack trace, the table’s last runs, the same error elsewhere, the last deployment before it, and links to the exact run in the source tool.
          </p>
        </div>
        <SignatureCollapse />
      </div>
    </section>

    {/* 03 Alerts */}
    <section id="alerts" className="scroll-mt-32 bg-ip-grey">
      <div className="ip-container ip-section">
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <ChapterLabel n={3}>Alerts</ChapterLabel>
            <h2 className={h2}>Signals, not noise.</h2>
            <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">
              Every rule either judges each table against its own history, or rolls up to one alert per environment. One alert per problem: it fires once, updates while the problem lasts, and closes itself when the condition clears.
            </p>
            <Verified item={piqAlertNoise} badge={false}>
              <p className="mt-5 mb-0 border-l-[3px] border-ip-orange pl-4 text-[16px] font-medium leading-[1.5]">
                {piqAlertNoise.text} {!piqAlertNoise.verified && <VerifyBadge className="ml-1" />}
              </p>
            </Verified>
            <ol className="mt-8 mb-0 grid list-none grid-cols-3 gap-0 border-t-2 border-black p-0">
              {[
                ["Fires once", "Per problem, keyed by environment, rule and subject."],
                ["Updates", "While it lasts, instead of firing again every cycle."],
                ["Closes itself", "When a rerun succeeds or the load finishes."],
              ].map(([t, d], i) => (
                <li key={t} className={cn("py-4 pr-3", i > 0 && "border-l border-ip-rule-strong pl-3")}>
                  <p className="m-0 text-[15px] font-semibold">{t}</p>
                  <p className="mt-1 mb-0 text-[13px] leading-[1.45] text-ip-body">{d}</p>
                </li>
              ))}
            </ol>
          </div>
          <IncidentView />
        </div>

        <div className="mt-16 grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <div>
            <h3 className="m-0 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.015em]">Every table is judged against its own history.</h3>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">
              A 4-minute dimension table and an hour-long fact table can’t share one threshold. PipelineIQ’s Slow, Stuck and Stale rules compare each table with its own median, so the threshold moves with the table.
            </p>
            <p className="ip-label-sm mt-8 mb-3">The twelve rules</p>
            <ul className="m-0 grid list-none grid-cols-1 gap-x-4 p-0 sm:grid-cols-2">
              {piqAlerts.map((a) => (
                <li key={a.name} className="flex items-start gap-2.5 border-b border-ip-rule py-2.5">
                  <span className={cn("mt-0.5 w-[58px] shrink-0 rounded py-0.5 text-center font-mono text-[9.5px] uppercase tracking-[0.06em]", sevCls[a.sev])}>{a.sev}</span>
                  <span>
                    <span className="block text-[14px] font-semibold">{a.name}</span>
                    <span className="block text-[12.5px] leading-[1.4] text-ip-body">{a.when}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <AdaptiveThreshold />
        </div>
      </div>
    </section>

    {/* 04 Safety */}
    <section id="safety" className="scroll-mt-32 bg-white">
      <div className="ip-container ip-section grid gap-10 [&>*]:min-w-0 lg:grid-cols-2 lg:gap-14">
        <div>
          <ChapterLabel n={4}>Safety</ChapterLabel>
          <h2 className={h2}>It can’t break what it watches. By construction.</h2>
          <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">The safety principles are enforced in code, not left to good intentions.</p>
          <div className="mt-8 grid grid-cols-1 border-t-2 border-black sm:grid-cols-2">
            {piqGuarantees.map((g, i) => (
              <div key={g.title} className={cn("border-b border-ip-rule-strong py-5 pr-5", i % 2 === 1 && "sm:border-l sm:pl-5")}>
                <p className="m-0 text-[17px] font-semibold">{g.title}</p>
                <p className="mt-1.5 mb-0 text-[14.5px] leading-[1.55] text-ip-body">{g.body}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:pt-12">
          <SqlGuard />
        </div>
      </div>
    </section>

    {/* 05 Who it's for */}
    <section id="who" className="scroll-mt-32 bg-ip-grey">
      <div className="ip-container ip-section">
        <ChapterLabel n={5}>Who it’s for</ChapterLabel>
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={h2}>Built for the engine room.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-body">
            For the data engineers and platform people who build, run and support the pipelines. Business users never need to open it; they just stop hearing about broken numbers.
          </p>
        </div>
        <Personas />
      </div>
    </section>

    {/* 06 How we deploy it */}
    <section id="deploy" className="scroll-mt-32 bg-black text-white">
      <div className="ip-container ip-section">
        <ChapterLabel n={6} onDark>
          How we deploy it
        </ChapterLabel>
        <div className="mb-12 grid gap-6 md:grid-cols-[1fr_1.15fr] md:items-end">
          <h2 className={h2}>One core. One layer built for your estate.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-on-dark">
            PipelineIQ isn’t a box you install and bend your platform to fit. It’s a stable core plus an engineer embedded with your team, who builds the layer that understands your services, your statuses, your naming and the quirks nobody documented.
          </p>
        </div>
        <div className="grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div>
            <p className="ip-label-sm m-0 mb-3 !text-ip-on-dark">Client layers: connectors, semantics, pages, alert tuning</p>
            <div className="grid grid-cols-2 gap-2">
              {piqLayers.map((l) => (
                <div key={l.stack} className={cn("rounded-lg p-3.5", l.status === "Live" ? "border border-ip-orange bg-ip-orange/10" : "border border-dashed border-white/30")}>
                  <span className={cn("font-mono text-[10.5px] uppercase tracking-[0.06em]", l.status === "Live" ? "text-ip-orange" : "text-ip-on-dark")}>{l.status}</span>
                  <p className="mt-1 mb-0 text-[14px] font-medium leading-[1.35]">{l.stack}</p>
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="mx-auto my-2 h-6 w-px bg-white/40" />
            <div className="rounded-lg border border-white/60 p-4">
              <p className="m-0 font-mono text-[10.5px] uppercase tracking-[0.06em] text-ip-orange">PipelineIQ core</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {["Portal and design system", "Collector framework", "Error index", "Alert engine", "Local store", "Safety principles"].map((c) => (
                  <span key={c} className="rounded bg-white/10 px-2 py-1 text-[12.5px]">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <ol className="m-0 grid list-none grid-cols-1 gap-0 border-t border-white/30 p-0 sm:grid-cols-2">
            {piqSteps.map((s, i) => (
              <li key={s.title} className={cn("border-b border-white/20 py-5 pr-5", i % 2 === 1 && "sm:border-l sm:pl-5")}>
                <span className="font-mono text-[12px] text-ip-orange">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-1.5 mb-0 text-[17px] font-semibold">{s.title}</p>
                <p className="mt-1 mb-0 text-[14px] leading-[1.55] text-ip-on-dark">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>

    {/* 07 Findings */}
    <section id="findings" className="scroll-mt-32 bg-white">
      <div className="ip-container ip-section">
        <ChapterLabel n={7}>From its first deployment</ChapterLabel>
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={h2}>Findings a generic monitoring tool never gives back.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-body">
            Because the engineer reads your estate as it really is, PipelineIQ surfaces problems in the platform itself. All of these were found by reading, without changing anything.
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {piqFindings.map((f) => (
            <li key={f.title} className="rounded-xl border border-ip-rule-strong p-6 transition-colors hover:border-black">
              <p className="m-0 text-[18px] font-semibold leading-[1.3]">{f.title}</p>
              <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* 08 Where it's heading */}
    <section id="heading" className="scroll-mt-32 bg-ip-grey">
      <div className="ip-container ip-section">
        <ChapterLabel n={8}>Where it’s heading</ChapterLabel>
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className={h2}>From what failed, to why, what it breaks and how to fix it.</h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-body">
            Today PipelineIQ answers the first question. Anything that uses AI, or reads your code or architecture, ships only once you agree, with names masked first.
          </p>
        </div>
        <FourQuestions />

        <div className="mt-16 grid gap-10 [&>*]:min-w-0 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <h3 className="m-0 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.015em]">And where it fits: the trust layer, from pipeline to answer.</h3>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">
              PipelineIQ checks the data arrives reliably. IncLever checks it is ready and meaningful enough for any AI agent. Together they cover the chain from your ERPs to whichever agent you choose.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/products/inclever" className={buttonClass("secondary", "md")}>
                Meet IncLever
              </Link>
              <Link to="/products" className="ip-link self-center text-[15px]">
                Both solutions, side by side
              </Link>
            </div>
          </div>
          <div className="rounded-xl border border-ip-rule-strong bg-white p-5 sm:p-6">
            <TrustChain />
          </div>
        </div>
      </div>
    </section>

    <section className="bg-white">
      <div className="ip-container ip-section max-w-[1000px] !mx-auto">
        <Faq items={piqFaq} />
      </div>
    </section>

    <DemoRequest initial={["pipelineiq"]} title="See PipelineIQ read a platform like yours." intro="We’ll walk you through the portal on a real estate, show how the client layer would map onto your stack, and spell out the read-only access it needs." />

    <NextSteps
      steps={[
        { kicker: "Solutions", title: "IncLever: is the data ready for any agent?", body: "The other half of the trust layer.", to: "/products/inclever" },
        { kicker: "Proof", title: "Case studies", body: "Platforms we’ve built and run, on the same Azure stack.", to: "/case-studies" },
        { kicker: "Capability", title: "Data Engineering and Governance", body: "The Build step PipelineIQ watches over.", to: "/capabilities/data-engineering-governance" },
      ]}
    />
  </SiteLayout>
);

export default ProductPipelineIQ;
