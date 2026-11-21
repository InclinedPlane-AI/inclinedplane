/**
 * /thesis — long-form manifesto, restyled for the revamp. Content kept; the
 * revamp removed decorative effects, icon cards, unverifiable figures (claims
 * policy, brief §4.4) and banned words, and switched to US spelling.
 * Section ids are unchanged so existing deep links keep working.
 */
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, buttonClass } from "@/components/site/primitives";
import { BookCta, PageHero } from "@/components/site/sections";
import { ReadingProgress, Toc, TocDisclosure, type TocItem } from "@/components/site/article/blocks";
import { cn } from "@/lib/utils";

const toc: TocItem[] = [
  { id: "the-problem", label: "The problem" },
  { id: "data-maturity", label: "Data maturity" },
  { id: "the-architecture", label: "The architecture" },
  { id: "analytics-bi", label: "Analytics and BI" },
  { id: "ai-revolution", label: "AI in production" },
  { id: "enterprise-principles", label: "Engineering principles" },
  { id: "automation", label: "Automation" },
  { id: "why-inclinedplane", label: "Why InclinedPlane" },
];

const beforeAfter = [
  { dimension: "Reporting", before: "Monthly static PDFs, weeks behind", after: "Live dashboards on governed data" },
  { dimension: "Data quality", before: "Discovered by end users in production", after: "Caught at ingestion by automated checks" },
  { dimension: "Pipeline monitoring", before: "“Did the job run?” Someone checks by hand.", after: "Observability, alerting and freshness tracking" },
  { dimension: "ML and AI", before: "Notebooks on a laptop", after: "Production MLOps with monitoring and retraining" },
  { dimension: "Decision making", before: "Gut feel and last quarter’s numbers", after: "Forecasts and agents on governed data" },
  { dimension: "Incident response", before: "A war room and hours of diagnosis", after: "Detected, traced to a root cause, resolved quickly" },
];

const maturity = [
  { label: "Reactive", desc: "Manual reports, spreadsheet-driven, no single source of truth." },
  { label: "Managed", desc: "A central warehouse, scheduled dashboards, basic governance." },
  { label: "Proactive", desc: "Real-time pipelines, data quality checks, observability built in." },
  { label: "Predictive", desc: "ML models in production, forecasting, anomaly detection, feature stores." },
  { label: "Autonomous", desc: "AI agents acting on data, self-healing pipelines, decision systems." },
];

const layers = [
  {
    label: "Sources",
    items: ["CRM", "ERP", "APIs", "IoT", "SaaS", "Files"],
    title: "Data source integration",
    description:
      "We connect to every system that produces data worth having, whether it’s a SaaS API, an on-premises ERP, IoT sensor streams or flat files on SFTP. Each connector is fault-tolerant, schema-aware and version-controlled.",
    tools: ["Fivetran", "Airbyte", "Custom CDC", "Debezium", "Singer taps"],
  },
  {
    label: "Ingest and transform",
    items: ["CDC streams", "Batch ETL", "dbt models", "Quality gates"],
    title: "Transformation and modeling",
    description:
      "Raw data lands in a bronze layer. dbt models clean, deduplicate and enrich it through silver to gold. Every model is tested, documented and version-controlled. Quality gates check schema, freshness and statistical expectations at every layer transition.",
    tools: ["dbt Core / Cloud", "Apache Spark", "Great Expectations", "Soda"],
  },
  {
    label: "Storage and compute",
    items: ["Data lake", "Warehouse", "Feature store", "Vector DB"],
    title: "Storage and compute layer",
    description:
      "A lakehouse architecture that separates storage from compute. Data lives in columnar formats (Parquet, Delta) on object storage. Compute scales independently, from auto-suspending warehouses for BI to GPU clusters for ML training.",
    tools: ["Snowflake", "BigQuery", "Databricks", "Delta Lake", "Pinecone"],
  },
  {
    label: "Observe and govern",
    items: ["Lineage", "Quality", "Cost", "Access control"],
    title: "Observability and governance",
    description:
      "Every pipeline emits structured telemetry: row counts, schema diffs, freshness targets and cost attribution. Column-level lineage traces every field from source to dashboard. Access control is policy-as-code, auditable and reproducible.",
    tools: ["Monte Carlo", "Atlan", "OpenLineage", "Apache Atlas", "dbt Docs"],
  },
  {
    label: "Intelligence",
    items: ["BI dashboards", "ML models", "LLM agents", "Predictions"],
    title: "Intelligence and AI layer",
    description:
      "The intelligence layer reads curated data through semantic layers (for BI) and feature stores (for ML). Dashboards serve current KPIs. Predictive models score opportunities. LLM agents query data in plain language and trigger workflows.",
    tools: ["Tableau", "Power BI", "MLflow", "LangChain", "Feast"],
  },
  {
    label: "Action",
    items: ["Alerts", "Automations", "Decisions", "Workflows"],
    title: "Action and automation",
    description:
      "The final mile: data doesn’t just inform, it acts. Alerting surfaces anomalies with their likely root cause. Orchestrated workflows span pipelines, ML models, notifications and external APIs. Infrastructure recovers from routine failures on its own.",
    tools: ["Airflow", "Dagster", "Prefect", "Temporal", "n8n"],
  },
];

const analytics = [
  {
    title: "Semantic layer architecture",
    body: "One definition of “revenue” across every dashboard, report and model. No more conflicting numbers in board meetings. Tools like dbt Metrics and Cube enforce a single definition that every consumer inherits.",
  },
  {
    title: "Real-time operational BI",
    body: "Stream processing meets business intelligence. Live order volumes, inventory levels and support ticket targets, updated as events happen through streaming architectures rather than on a schedule.",
  },
  {
    title: "Embedded and contextual",
    body: "Analytics embedded in the tools your teams already use: Slack, CRM, ERP and internal portals. The insight finds the decision-maker, not the other way around, and ad-hoc analyst requests fall.",
  },
  {
    title: "Predictive overlays",
    body: "Every historical metric paired with a forecast. The revenue dashboard shows projected end-of-quarter. The inventory view shows predicted stock-outs. The churn report highlights at-risk accounts with intervention scores.",
  },
  {
    title: "Natural language querying",
    body: "“What was our top-performing channel last quarter, excluding brand?” Answered by an LLM that queries your semantic layer, so more people can use data without bypassing governance.",
  },
  {
    title: "Enterprise KPI frameworks",
    body: "North Star metrics cascade from board-level objectives to team-level KPIs. Every metric has an owner, a threshold, an alert and a drill-down path. Alignment is designed into the architecture.",
  },
];

const mlPipeline = [
  "Feature engineering with real-time and batch feature stores",
  "Model training with experiment tracking (MLflow, W&B)",
  "Automated model validation against baseline metrics",
  "Canary deployments with traffic-split A/B testing",
  "Continuous monitoring for drift, bias and performance",
  "Automated retraining triggered by performance thresholds",
];

const agentic = [
  "Multi-step reasoning agents over enterprise data (LangChain, CrewAI)",
  "Retrieval pipelines with vector databases for grounded answers",
  "Tool-use agents that query APIs, databases and external services",
  "Human-in-the-loop approval for high-stakes decisions",
  "Agent observability: token usage, latency, accuracy, hallucination rates",
  "Guardrails, content filtering and audit trails for compliance",
];

const incident = [
  { label: "Detect", desc: "An anomaly appears in the revenue pipeline: a large deviation from forecast." },
  { label: "Analyze", desc: "An agent correlates it with an upstream schema change in the CRM sync." },
  { label: "Diagnose", desc: "Root cause: a new field mapping in the CRM broke a join condition." },
  { label: "Remediate", desc: "The agent patches the transformation and validates the output against quality gates." },
  { label: "Verify", desc: "Reconciliation passes and downstream dashboards refresh." },
  { label: "Notify", desc: "Stakeholders get an incident summary without anyone being paged." },
];

const principles = [
  {
    title: "Modular by design",
    description: "Every component (pipeline, model, dashboard) is independently deployable, testable and replaceable. No monoliths. No vendor lock-in.",
    example: "Swap Snowflake for BigQuery without touching your dbt models or BI layer.",
  },
  {
    title: "Observability first",
    description: "You can’t improve what you can’t see. Lineage, quality metrics, pipeline health and cost attribution go in on day one, not later.",
    example: "Every pipeline run emits structured telemetry: row counts, schema diffs, freshness targets.",
  },
  {
    title: "Governance as code",
    description: "Access control, data classification, PII masking and retention policies defined in version-controlled configuration, auditable and reproducible.",
    example: "Column-level masking policies in dbt that propagate to every downstream consumer.",
  },
  {
    title: "Version everything",
    description: "Schemas, transformations, models and dashboards, all in git. Every change has a commit, a review and a rollback path. Data infrastructure deserves the same rigor as application code.",
    example: "A pull-request workflow: branch, transform, test, review, merge, deploy.",
  },
  {
    title: "Test before you ship",
    description: "Data contracts, schema validation and statistical tests run in CI before any change reaches production. Bad data stops at the gate.",
    example: "An automated test catches a NULL in a NOT NULL revenue column before it reaches downstream reports.",
  },
  {
    title: "Idempotent and replayable",
    description: "Every pipeline is idempotent and every transformation deterministic. Re-run any job for any point in time and get the same result, which matters for audits and debugging.",
    example: "Backfill six months of data after a logic fix: same results, no side effects.",
  },
  {
    title: "Secure by default",
    description: "Encryption at rest and in transit. Least-privilege access. Row-level security. Privacy-aware patterns in every layer.",
    example: "Marketing sees aggregated metrics and finance sees row-level transactions: same warehouse, different policies.",
  },
  {
    title: "Cost-aware compute",
    description: "Auto-scaling, query optimization and resource tagging mean you pay for what you use. We design for efficiency, not just correctness.",
    example: "Clusters auto-suspend when idle; incremental models process only changed rows.",
  },
  {
    title: "API-first",
    description: "Every data asset is reachable through documented APIs. Metrics, models and datasets are products with service levels, versions and consumer contracts.",
    example: "A product team queries a churn-probability API that serves a live ML model.",
  },
  {
    title: "AI-ready from day one",
    description: "Feature stores, vector databases and embedding pipelines are part of the architecture, not retrofitted. When you’re ready for AI, the infrastructure already is.",
    example: "Support tickets are already embedded in a vector database, ready for semantic search and retrieval.",
  },
  {
    title: "Self-healing pipelines",
    description: "Retry logic, circuit breakers and fallback strategies mean transient failures resolve themselves. Engineers sleep; pipelines don’t.",
    example: "An API timeout at 3 a.m. triggers exponential backoff; the retry succeeds and nobody is woken.",
  },
  {
    title: "Multi-tenant and multi-region",
    description: "Data isolation, regional compliance and tenant-aware architecture for organizations operating across geographies and business units.",
    example: "EU customer data stays in an EU region and US data in a US region: same codebase, policy-driven routing.",
  },
];

const automation = [
  {
    title: "Orchestrated workflows",
    desc: "Multi-system workflows that span data pipelines, ML models, notifications and external APIs. For example, a monthly close automated from data ingestion to the executive report.",
    examples: [
      "Financial close: every pipeline stage gated by quality checks, no manual hand-offs",
      "Supply chain: demand forecast, then procurement trigger, then vendor API call",
    ],
  },
  {
    title: "Alerting with context",
    desc: "Not threshold-based noise. Anomaly detection that understands seasonality, trends and context. Alerts arrive with a likely root cause, an impact assessment and a recommended action.",
    examples: [
      "“Revenue dropped in APAC, caused by a payment gateway timeout”",
      "“Churn risk increased: three high-value accounts show disengagement patterns”",
    ],
  },
  {
    title: "Self-healing infrastructure",
    desc: "Pipelines that detect their own failures, diagnose the cause and run remediation playbooks. Schema drift: adapt. API timeout: back off and retry. Source system down: degrade gracefully with cached data.",
    examples: [
      "A schema change in a source triggers a downstream migration without downtime",
      "A missed freshness target triggers extra compute until the pipeline catches up",
    ],
  },
  {
    title: "AI leadership summaries",
    desc: "Dashboards tell you what happened. We build systems that write plain-language briefings: what changed, why it matters and what to do about it, delivered by email, in Slack or in your tools.",
    examples: [
      "A weekly board report: key metrics, notable movements, risk flags",
      "A daily operations briefing: pipeline health, model performance, anomalies",
    ],
  },
];

function Chapter({ id, label, title, children, first = false }: { id: string; label: string; title: string; children: ReactNode; first?: boolean }) {
  return (
    <section id={id} className={cn("scroll-mt-28 pb-16", first ? "pt-0" : "border-t border-ip-rule pt-14")}>
      <Label className="mb-4">{label}</Label>
      <h2 className="ip-h2 m-0 max-w-[760px]">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

const Thesis = () => (
  <SiteLayout
    seo={{
      title: "Our thesis: data is infrastructure, intelligence is product",
      description:
        "Why enterprises need observable, automated data platforms before AI can work, and how InclinedPlane builds them from source to decision.",
      path: "/thesis",
    }}
  >
    <ReadingProgress />
    <PageHero
      crumbs={[{ label: "Our thesis" }]}
      label="Our thesis"
      title="Data is infrastructure. Intelligence is product."
      lead="A technical case for why enterprises need well-engineered data systems, and how InclinedPlane builds them."
    />

    <div className="ip-container py-[clamp(48px,6vw,88px)]">
      <div className="grid gap-12 lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <div className="sticky top-[110px]">
            <Toc items={toc} title="Contents" />
          </div>
        </aside>

        <div className="min-w-0 max-w-[900px]">
          <TocDisclosure items={toc} />

          <Chapter first id="the-problem" label="The problem" title="The market moved. Most data stacks didn’t.">
            <div className="ip-prose">
              <p>
                Most organizations still treat data as a reporting function: static dashboards on fragile pipelines, monthly cadences that lag behind the market, and analytics teams buried in ad-hoc requests. There is no observability, no testing, no CI/CD and no governance beyond a shared spreadsheet.
              </p>
              <p>
                That was acceptable when markets moved slowly and “data-driven” meant having a BI tool. <strong>It isn’t anymore.</strong>
              </p>
              <p>
                Competitors are deploying automated agents that make decisions in milliseconds. Supply chains are optimized as conditions change. Revenue anomalies are found and resolved before anyone notices. The gap between organizations with solid data infrastructure and those without is widening.
              </p>
              <p>The question isn’t whether to modernize. It’s whether you do it before or after the cost becomes visible.</p>
            </div>
            <figure className="m-0 mt-10">
              <figcaption className="ip-label-sm mb-3">Before and after</figcaption>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] border-collapse text-left text-[15px]">
                  <thead>
                    <tr className="border-b-2 border-black">
                      <th scope="col" className="w-[24%] py-3 pr-4 font-semibold">
                        Dimension
                      </th>
                      <th scope="col" className="py-3 pr-4 font-semibold text-ip-muted">
                        Before
                      </th>
                      <th scope="col" className="py-3 pr-4 font-semibold">
                        After
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {beforeAfter.map((r) => (
                      <tr key={r.dimension} className="border-b border-ip-rule align-top">
                        <th scope="row" className="py-3.5 pr-4 font-semibold">
                          {r.dimension}
                        </th>
                        <td className="py-3.5 pr-4 leading-[1.5] text-ip-muted">{r.before}</td>
                        <td className="py-3.5 pr-4 leading-[1.5] text-black">{r.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </figure>
          </Chapter>

          <Chapter id="data-maturity" label="Data maturity" title="The five levels of data maturity.">
            <div className="ip-prose">
              <p>
                Every organization sits somewhere on the data maturity spectrum. Most are stuck at level 1 or 2: reactive, manual and fragile. The advantage isn’t having data. It’s having <em>infrastructure</em> that turns data into automated, reliable, observable systems.
              </p>
            </div>
            <ol className="m-0 mt-8 flex list-none flex-col gap-2 p-0">
              {maturity.map((m, i) => {
                const last = i === maturity.length - 1;
                return (
                  <li
                    key={m.label}
                    className={cn(
                      "grid grid-cols-[72px_1fr] items-baseline gap-4 rounded-lg border px-5 py-4",
                      last ? "border-ip-orange bg-ip-orange-tint" : "border-ip-rule-strong bg-white",
                    )}
                    style={{ marginLeft: `min(${i * 4}%, ${i * 32}px)` }}
                  >
                    <span className="ip-label-sm">Level {i + 1}</span>
                    <div>
                      <p className="m-0 text-[18px] font-semibold">{m.label}</p>
                      <p className="mt-1 mb-0 text-[15px] leading-[1.5] text-ip-body">{m.desc}</p>
                      {last && <p className="mt-2 mb-0 text-[14px] font-medium text-black">Where we take you.</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </Chapter>

          <Chapter id="the-architecture" label="The architecture" title="From source to decision.">
            <div className="ip-prose">
              <p>
                We don’t build point solutions. We design complete data systems, from raw source ingestion to automated decisions. Every layer is observable, testable and independently scalable. This is the architecture we deploy; open a layer for detail.
              </p>
            </div>
            <div className="mt-8 border-t-2 border-black">
              {layers.map((l, i) => (
                <details key={l.label} className="group border-b border-ip-rule-strong">
                  <summary className="grid cursor-pointer list-none grid-cols-[1fr_auto] items-center gap-4 py-5 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="ip-label-sm block">Layer {i + 1} of {layers.length}</span>
                      <span className="mt-1 block text-[19px] font-semibold">{l.label}</span>
                      <span className="mt-1 block text-[14px] text-ip-muted">{l.items.join(", ")}</span>
                    </span>
                    <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                      <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-black" />
                      <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-black transition-transform duration-200 group-open:scale-y-0" />
                    </span>
                  </summary>
                  <div className="grid gap-6 pb-6 md:grid-cols-[1fr_220px]">
                    <div>
                      <p className="m-0 text-[17px] font-semibold">{l.title}</p>
                      <p className="mt-2 mb-0 text-[16px] leading-[1.6] text-ip-body">{l.description}</p>
                    </div>
                    <div className="md:border-l md:border-ip-rule md:pl-6">
                      <p className="ip-label-sm m-0 mb-2">Typical tools</p>
                      <div className="flex flex-wrap gap-2">
                        {l.tools.map((t) => (
                          <span key={t} className="rounded-full border border-ip-rule-strong px-3 py-1 text-[13px] text-ip-body">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <div className="border-t border-ip-rule-strong pt-5">
                <h3 className="ip-h3 m-0">How data flows</h3>
                <p className="mt-3 mb-0 text-[16px] leading-[1.6] text-ip-body">
                  Raw data enters through CDC streams, API connectors and batch loaders, landing first in a raw (bronze) layer. dbt models clean, deduplicate and enrich it through silver to gold. Quality gates at every transition check schema conformance, freshness and statistical expectations. Only clean, governed data reaches the intelligence layer.
                </p>
              </div>
              <div className="border-t border-ip-rule-strong pt-5">
                <h3 className="ip-h3 m-0">How intelligence is built</h3>
                <p className="mt-3 mb-0 text-[16px] leading-[1.6] text-ip-body">
                  The intelligence layer reads curated data through semantic layers (for BI) and feature stores (for ML). Dashboards serve current KPIs. Predictive models score opportunities, risks and anomalies. LLM agents sit on top, querying data in plain language, triggering workflows and writing executive summaries.
                </p>
              </div>
            </div>
          </Chapter>

          <Chapter id="analytics-bi" label="Analytics and BI" title="Beyond dashboards: analytics that act.">
            <div className="ip-prose">
              <p>
                Traditional BI is a mirror: it shows you what happened. We build analytics systems that work like a compass: they show you what to <em>do</em>. The difference is semantic layers that standardize definitions, analytics embedded where decisions are made, and AI that surfaces insights before you ask.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 border-t-2 border-black sm:grid-cols-2">
              {analytics.map((a, i) => (
                <div key={a.title} className={cn("border-b border-ip-rule-strong py-6", i % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8")}>
                  <h3 className="m-0 text-[18px] font-semibold">{a.title}</h3>
                  <p className="mt-2 mb-0 text-[15px] leading-[1.6] text-ip-body">{a.body}</p>
                </div>
              ))}
            </div>
          </Chapter>

          <Chapter id="ai-revolution" label="AI in production" title="From prediction to autonomous decisions.">
            <div className="ip-prose">
              <p>
                AI in the enterprise isn’t about adding a chatbot. It’s about re-architecting your data systems so that intelligence is a <em>product</em>, not a project: models that ship with monitoring, agents that act on data, feature stores that serve real-time signals. It’s the step from “we have AI” to “AI runs parts of our operations”.
              </p>
            </div>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {[
                ["Production ML pipeline", mlPipeline],
                ["Agentic AI systems", agentic],
              ].map(([title, items]) => (
                <div key={title as string} className="border-t-2 border-black pt-5">
                  <h3 className="ip-h3 m-0">{title as string}</h3>
                  <ul className="mt-4 mb-0 list-none space-y-2.5 p-0">
                    {(items as string[]).map((it) => (
                      <li key={it} className="flex gap-3 text-[15px] leading-[1.5] text-ip-body">
                        <span aria-hidden="true" className="mt-[9px] inline-block h-1.5 w-1.5 shrink-0 bg-ip-orange" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <figure className="m-0 mt-12">
              <figcaption className="ip-label-sm mb-4">Scenario: an incident handled end to end by an agent</figcaption>
              <ol className="m-0 grid list-none grid-cols-1 border-t border-ip-rule-strong p-0 sm:grid-cols-2 lg:grid-cols-3">
                {incident.map((s, i) => (
                  <li key={s.label} className="border-b border-ip-rule py-5 pr-6">
                    <p className="m-0 flex items-baseline gap-3">
                      <span className="font-mono text-[12px] text-ip-muted">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[17px] font-semibold">{s.label}</span>
                    </p>
                    <p className="mt-1.5 mb-0 text-[15px] leading-[1.5] text-ip-body">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </figure>
          </Chapter>

          <Chapter id="enterprise-principles" label="Engineering principles" title="Twelve principles of AI-ready enterprise data architecture.">
            <div className="ip-prose">
              <p>
                These aren’t aspirational values. They are engineering constraints we hold ourselves to on every engagement, each with concrete implementation patterns and automated checks.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-3">
              {principles.map((p) => (
                <div key={p.title} className="border-b border-ip-rule-strong py-6 sm:pr-6">
                  <h3 className="m-0 text-[17px] font-semibold">{p.title}</h3>
                  <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{p.description}</p>
                  <p className="mt-3 mb-0 text-[14px] leading-[1.5] text-ip-muted">For example: {p.example}</p>
                </div>
              ))}
            </div>
          </Chapter>

          <Chapter id="automation" label="Automation" title="Systems that think, act and learn.">
            <div className="ip-prose">
              <p>
                The last stage of data maturity is automation: systems that don’t just inform, but <em>act</em>. We build decision pipelines that monitor business metrics, reason about anomalies, take corrective action and learn from the outcome. This is where data engineering becomes an advantage.
              </p>
            </div>
            <div className="mt-8 grid gap-x-10 gap-y-2 md:grid-cols-2">
              {automation.map((a) => (
                <div key={a.title} className="border-t-2 border-black py-6">
                  <h3 className="ip-h3 m-0">{a.title}</h3>
                  <p className="mt-3 mb-4 text-[15px] leading-[1.6] text-ip-body">{a.desc}</p>
                  <ul className="m-0 list-none space-y-2 border-t border-ip-rule p-0 pt-3">
                    {a.examples.map((ex) => (
                      <li key={ex} className="text-[14px] leading-[1.5] text-ip-muted">
                        {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Chapter>

          <section id="why-inclinedplane" className="scroll-mt-28 border-t border-ip-rule pt-14">
            <div className="relative overflow-hidden rounded-xl bg-ip-grey p-[clamp(28px,5vw,56px)]">
              <div aria-hidden="true" className="ip-pattern-fade-left absolute inset-y-0 right-0 hidden w-[40%] sm:block" />
              <div className="relative max-w-[680px]">
                <Label dot className="mb-4">
                  Why InclinedPlane
                </Label>
                <h2 className="ip-h2 m-0">We don’t just build pipelines. We build leverage.</h2>
                <p className="mt-5 mb-0 text-[17px] leading-[1.65] text-ip-body">
                  An inclined plane is the oldest force multiplier, turning effort into elevation. That’s what we do with data. We take the raw weight of your organization’s information and build the infrastructure that turns it into better decisions, faster execution and intelligence that runs on its own.
                </p>
                <p className="mt-4 mb-0 text-[16px] leading-[1.65] text-ip-body">
                  This isn’t consulting. It’s engineering: production systems, not slide decks; observable infrastructure, not black boxes; AI that ships, not AI that demos. We are a small, deliberate team. We take on fewer clients than we could, because the work demands it, and every system we build is one we’d stake our reputation on. If you want a partner who will tell you the truth about your data estate, sequence your investments correctly and build infrastructure that compounds over time, we should talk.
                </p>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  <BookCta source="thesis" />
                  <Link to="/capabilities" className={buttonClass("secondary")}>
                    Explore the capabilities
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </SiteLayout>
);

export default Thesis;
