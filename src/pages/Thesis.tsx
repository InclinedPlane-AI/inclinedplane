import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import { motion, AnimatePresence } from "framer-motion";
import {
  Database, Shield, BarChart3, Brain, Zap, Layers, Eye, Activity,
  GitBranch, FileCheck, Cloud, Lock, Workflow, Bot, Cpu, Terminal,
  TrendingUp, ArrowRight, CheckCircle2, AlertTriangle, Server,
  Gauge, Radio, RefreshCw, Search, LineChart, Sparkles, Target,
  Building2, ShieldCheck, Cog, Network, Boxes, Rocket, LayoutDashboard,
  Download, ChevronDown, X as XIcon
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThesisTOC from "@/components/ThesisTOC";
import ReadingProgressBar from "@/components/ReadingProgressBar";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
};

/* ─── Architecture Flow Diagram — Interactive ─── */
const layerDetails = [
  {
    label: "Sources", color: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-orange-500/30", activeColor: "border-orange-500/60 glow-orange",
    items: ["CRM", "ERP", "APIs", "IoT", "SaaS", "Files"], icon: Database,
    detail: {
      title: "Data Source Integration",
      description: "We connect to every system that generates value-bearing data — whether it's a SaaS API, an on-prem ERP, IoT sensor streams, or flat files on SFTP. Each connector is fault-tolerant, schema-aware, and version-controlled.",
      tools: ["Fivetran", "Airbyte", "Custom CDC", "Debezium", "Singer Taps"],
      metrics: ["50+ pre-built connectors", "< 5 min setup per source", "99.9% ingestion SLA"],
    },
  },
  {
    label: "Ingest & Transform", color: "from-orange-500/15 to-orange-400/5",
    borderColor: "border-orange-400/25", activeColor: "border-orange-400/60 glow-orange",
    items: ["CDC Streams", "Batch ETL", "dbt Models", "Quality Gates"], icon: GitBranch,
    detail: {
      title: "Transformation & Modeling",
      description: "Raw data lands in a bronze layer. dbt models progressively clean, deduplicate, and enrich through silver to gold. Every model is tested, documented, and version-controlled. Quality gates validate schema, freshness, and statistical expectations at every layer transition.",
      tools: ["dbt Core / Cloud", "Apache Spark", "Great Expectations", "Soda"],
      metrics: ["100% test coverage on gold models", "< 30 min end-to-end latency", "Automated schema drift detection"],
    },
  },
  {
    label: "Storage & Compute", color: "from-orange-400/15 to-orange-300/5",
    borderColor: "border-orange-400/20", activeColor: "border-orange-400/60 glow-orange",
    items: ["Data Lake", "Warehouse", "Feature Store", "Vector DB"], icon: Server,
    detail: {
      title: "Storage & Compute Layer",
      description: "A modern lakehouse architecture separating storage from compute. Data lives in columnar formats (Parquet/Delta) on object storage. Compute scales independently — from auto-suspending warehouses for BI to GPU clusters for ML training.",
      tools: ["Snowflake", "BigQuery", "Databricks", "Delta Lake", "Pinecone"],
      metrics: ["60% avg cost reduction vs. legacy", "Auto-scaling 0 → 128 nodes", "Sub-second query on TB-scale data"],
    },
  },
  {
    label: "Observe & Govern", color: "from-primary/15 to-primary/5",
    borderColor: "border-primary/20", activeColor: "border-primary/60 glow-orange",
    items: ["Lineage", "Quality", "Cost", "Access Control"], icon: Eye,
    detail: {
      title: "Observability & Governance",
      description: "Every pipeline emits structured telemetry: row counts, schema diffs, freshness SLAs, and cost attribution. Column-level lineage traces every field from source to dashboard. Access control is policy-as-code — auditable and reproducible.",
      tools: ["Monte Carlo", "Atlan", "OpenLineage", "Apache Atlas", "dbt Docs"],
      metrics: ["End-to-end column lineage", "Real-time freshness monitoring", "SOC 2 / GDPR compliant"],
    },
  },
  {
    label: "Intelligence", color: "from-primary/20 to-accent/10",
    borderColor: "border-primary/25", activeColor: "border-primary/60 glow-orange",
    items: ["BI Dashboards", "ML Models", "LLM Agents", "Predictions"], icon: Brain,
    detail: {
      title: "Intelligence & AI Layer",
      description: "The intelligence layer consumes curated data through semantic layers (for BI) and feature stores (for ML). Dashboards serve real-time KPIs. Predictive models score opportunities. LLM-powered agents query data in natural language and trigger workflows autonomously.",
      tools: ["Tableau", "Power BI", "MLflow", "LangChain", "Feast"],
      metrics: ["Real-time dashboard refresh", "Model serving < 100ms p99", "NL query accuracy > 92%"],
    },
  },
  {
    label: "Action", color: "from-accent/20 to-accent/5",
    borderColor: "border-accent/30", activeColor: "border-accent/60 glow-orange",
    items: ["Alerts", "Automations", "Decisions", "Workflows"], icon: Zap,
    detail: {
      title: "Action & Automation",
      description: "The final mile: data doesn't just inform — it acts. Intelligent alerting surfaces anomalies with root cause analysis. Orchestrated workflows span pipelines, ML models, notifications, and external APIs. Self-healing infrastructure handles failures autonomously.",
      tools: ["Airflow", "Dagster", "Prefect", "Temporal", "n8n"],
      metrics: ["Zero manual intervention on 80% of incidents", "End-to-end orchestration", "AI-generated briefings"],
    },
  },
];

const ArchitectureDiagram = () => {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      {/* Pipeline grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
        {/* Animated flow line (desktop) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0 overflow-hidden" preserveAspectRatio="none">
          <defs>
            <linearGradient id="flow-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(25 100% 50%)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="hsl(31 100% 55%)" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(35 100% 64%)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <motion.line
            x1="8%" y1="50%" x2="92%" y2="50%"
            stroke="url(#flow-grad)" strokeWidth="2" strokeLinecap="round"
            strokeDasharray="6 8"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -28 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="4" fill="hsl(25 100% 50%)" opacity="0.8"
            initial={{ cx: "8%", cy: "50%" }}
            animate={{ cx: "92%", cy: "50%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.circle
            r="8" fill="hsl(25 100% 50%)" opacity="0.15"
            initial={{ cx: "8%", cy: "50%" }}
            animate={{ cx: "92%", cy: "50%" }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        {layerDetails.map((layer, i) => {
          const Icon = layer.icon;
          const isActive = activeLayer === i;
          return (
            <motion.div
              key={layer.label}
              {...stagger}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="relative z-[1]"
            >
              <button
                onClick={() => setActiveLayer(isActive ? null : i)}
                className={`w-full text-left glass-panel rounded-xl p-4 h-full border transition-all duration-300 cursor-pointer ${
                  isActive ? layer.activeColor : `${layer.borderColor} hover:scale-[1.03] hover:border-primary/30`
                }`}
                data-cursor-hover
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-mono text-[10px] text-primary/50">{String(i + 1).padStart(2, "0")}</span>
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${layer.color} flex items-center justify-center`}>
                    <Icon size={14} className="text-primary" />
                  </div>
                </div>
                <h4 className="text-xs font-semibold text-foreground mb-2">{layer.label}</h4>
                <div className="space-y-1">
                  {layer.items.map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <div className="w-1 h-1 rounded-full bg-primary/40" />
                      <span className="text-[10px] text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-1 text-primary/40">
                  <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={12} />
                  </motion.div>
                  <span className="text-[9px] font-mono">{isActive ? "collapse" : "details"}</span>
                </div>
              </button>

              {i < layerDetails.length - 1 && (
                <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                  <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                    <ArrowRight size={12} className="text-primary/40" />
                  </motion.div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Expanded detail panel */}
      <AnimatePresence mode="wait">
        {activeLayer !== null && (
          <motion.div
            key={activeLayer}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="mt-4 overflow-hidden"
          >
            <div className="glass-panel-strong rounded-xl p-6 sm:p-8 relative border-primary/15">
              <button onClick={() => setActiveLayer(null)} className="absolute top-4 right-4 text-muted-foreground/50 hover:text-foreground transition-colors" data-cursor-hover>
                <XIcon size={16} />
              </button>
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-orange rounded-t-xl" />

              <div className="grid md:grid-cols-[1fr_auto] gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      {(() => { const Icon = layerDetails[activeLayer].icon; return <Icon size={18} className="text-primary" />; })()}
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-primary/50 uppercase tracking-widest">Stage {activeLayer + 1} of 6</span>
                      <h3 className="text-lg font-bold text-foreground">{layerDetails[activeLayer].detail.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{layerDetails[activeLayer].detail.description}</p>
                  <div className="space-y-2">
                    {layerDetails[activeLayer].detail.metrics.map((m, i) => (
                      <motion.div key={m} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className="text-primary shrink-0" />
                        <span className="text-xs text-foreground/80">{m}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="md:border-l md:border-border/20 md:pl-6 min-w-[180px]">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-3">Technology Stack</p>
                  <div className="flex flex-wrap gap-2">
                    {layerDetails[activeLayer].detail.tools.map((tool, i) => (
                      <motion.span key={tool} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 + 0.15, duration: 0.2 }}
                        className="px-3 py-1.5 rounded-lg text-[11px] font-mono bg-primary/5 text-primary/80 border border-primary/10"
                      >{tool}</motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ─── Maturity Staircase ─── */
const MaturityStaircase = () => {
  const stages = [
    { level: "Level 1", label: "Reactive", desc: "Manual reports, Excel-driven, no single source of truth", status: "outdated" as const },
    { level: "Level 2", label: "Managed", desc: "Centralized warehouse, scheduled dashboards, basic governance", status: "baseline" as const },
    { level: "Level 3", label: "Proactive", desc: "Real-time pipelines, data quality gates, observability built-in", status: "competitive" as const },
    { level: "Level 4", label: "Predictive", desc: "ML models in production, forecasting, anomaly detection, feature stores", status: "advanced" as const },
    { level: "Level 5", label: "Autonomous", desc: "AI agents acting on data, self-healing pipelines, decision systems", status: "frontier" as const },
  ];

  const statusColors = {
    outdated: "border-destructive/30 text-destructive/70",
    baseline: "border-muted-foreground/30 text-muted-foreground",
    competitive: "border-primary/30 text-primary/70",
    advanced: "border-primary/40 text-primary",
    frontier: "border-accent/50 text-accent",
  };

  return (
    <div className="relative">
      {/* Rising line */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-destructive/20 via-primary/30 to-accent/40 hidden sm:block" />

      <div className="space-y-4">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.level}
            {...stagger}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="relative flex gap-4 items-start"
          >
            {/* Dot on timeline */}
            <div className={`hidden sm:flex relative z-10 w-12 h-12 rounded-xl glass-panel items-center justify-center shrink-0 ${i === stages.length - 1 ? "border-accent/40" : ""}`}>
              <span className="font-mono text-xs font-bold text-primary">{i + 1}</span>
            </div>

            <div className={`flex-1 glass-panel rounded-xl p-4 sm:p-5 ${i === stages.length - 1 ? "border-accent/20 glow-orange" : ""}`}
              style={i === stages.length - 1 ? {
                background: "linear-gradient(135deg, hsl(var(--glass-strong-bg) / var(--glass-strong-opacity)), hsl(var(--orange-start) / 0.05))"
              } : undefined}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] text-muted-foreground/50 sm:hidden">{stage.level}</span>
                <h4 className="text-sm font-bold text-foreground">{stage.label}</h4>
                <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusColors[stage.status]}`}>
                  {stage.status}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{stage.desc}</p>
              {i === stages.length - 1 && (
                <p className="text-[10px] font-mono text-primary/60 mt-2 italic">← Where we take you</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

/* ─── Principle Card ─── */
const PrincipleCard = ({ icon: Icon, title, description, example, index }: {
  icon: React.ElementType;
  title: string;
  description: string;
  example: string;
  index: number;
}) => (
  <motion.div
    {...stagger}
    transition={{ delay: index * 0.06, duration: 0.4 }}
    className="glass-panel rounded-xl p-5 sm:p-6 group hover:border-primary/20 transition-colors duration-300"
  >
    <div className="flex items-start gap-3 mb-3">
      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
        <Icon size={16} className="text-primary" />
      </div>
      <div>
        <h4 className="text-sm font-bold text-foreground mb-1">{title}</h4>
        <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-border/30">
      <div className="flex items-start gap-2">
        <Terminal size={10} className="text-primary/50 mt-0.5 shrink-0" />
        <p className="text-[11px] font-mono text-muted-foreground/70 leading-relaxed italic">{example}</p>
      </div>
    </div>
  </motion.div>
);

/* ─── Automation Visual ─── */
const AutomationFlow = () => {
  const steps = [
    { icon: Search, label: "Detect", desc: "Anomaly detected in revenue pipeline — 23% deviation from forecast" },
    { icon: Brain, label: "Analyze", desc: "AI agent correlates with upstream schema change in CRM sync" },
    { icon: AlertTriangle, label: "Diagnose", desc: "Root cause: new field mapping in Salesforce broke join condition" },
    { icon: Cog, label: "Remediate", desc: "Agent patches transformation, validates output against quality gates" },
    { icon: CheckCircle2, label: "Verify", desc: "Data reconciliation passes, downstream dashboards auto-refresh" },
    { icon: Radio, label: "Notify", desc: "Stakeholders notified with incident summary, zero manual intervention" },
  ];

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.label}
              {...stagger}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="glass-panel rounded-xl p-4 relative"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-[10px] text-primary/40">{String(i + 1).padStart(2, "0")}</span>
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon size={13} className="text-primary" />
                </div>
                <h4 className="text-xs font-bold text-foreground">{step.label}</h4>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── Before / After Comparison ─── */
const BeforeAfter = () => {
  const comparisons = [
    { dimension: "Reporting", before: "Monthly static PDFs, 3-week lag", after: "Real-time dashboards, sub-second refresh" },
    { dimension: "Data Quality", before: "Discovered by end-users in production", after: "Caught at ingestion with automated gates" },
    { dimension: "Pipeline Monitoring", before: "\"Did the job run?\" — check manually", after: "Full observability, auto-alerting, SLA tracking" },
    { dimension: "ML / AI", before: "Jupyter notebooks on a laptop", after: "Production MLOps with monitoring & retraining" },
    { dimension: "Decision Making", before: "Gut feel + last quarter's numbers", after: "AI-powered forecasts + autonomous agents" },
    { dimension: "Incident Response", before: "War room, 4+ hours to diagnose", after: "Auto-detected, root-caused, resolved in minutes" },
  ];

  return (
    <div className="glass-panel rounded-xl overflow-hidden">
      {/* Header */}
      <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-border/30">
        <div className="p-3 sm:p-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">Dimension</span>
        </div>
        <div className="p-3 sm:p-4 border-l border-border/30 bg-destructive/5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-destructive/60">Before</span>
        </div>
        <div className="p-3 sm:p-4 border-l border-border/30 bg-primary/5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60">After</span>
        </div>
      </div>
      {/* Rows */}
      {comparisons.map((row, i) => (
        <motion.div
          key={row.dimension}
          {...stagger}
          transition={{ delay: i * 0.06, duration: 0.3 }}
          className={`grid grid-cols-[1fr_1fr_1fr] ${i < comparisons.length - 1 ? "border-b border-border/20" : ""}`}
        >
          <div className="p-3 sm:p-4 flex items-center">
            <span className="text-xs font-semibold text-foreground">{row.dimension}</span>
          </div>
          <div className="p-3 sm:p-4 border-l border-border/20 bg-destructive/[0.02]">
            <p className="text-[11px] text-muted-foreground/70 leading-relaxed">{row.before}</p>
          </div>
          <div className="p-3 sm:p-4 border-l border-border/20 bg-primary/[0.02]">
            <p className="text-[11px] text-muted-foreground leading-relaxed">{row.after}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};


/* ─── MAIN PAGE ─── */
const Thesis = () => {
  const navigate = useNavigate();

  const principles = [
    {
      icon: Layers,
      title: "Modular by Design",
      description: "Every component — pipeline, model, dashboard — is independently deployable, testable, and replaceable. No monoliths. No vendor lock-in.",
      example: "e.g. Swap Snowflake for BigQuery without touching your dbt models or BI layer",
    },
    {
      icon: Eye,
      title: "Observability-First",
      description: "You cannot optimize what you cannot see. Lineage, quality metrics, pipeline health, and cost attribution are embedded from day one — not bolted on later.",
      example: "e.g. Every pipeline run emits structured telemetry: row counts, schema diffs, freshness SLAs",
    },
    {
      icon: Shield,
      title: "Governance as Code",
      description: "Access control, data classification, PII masking, and retention policies defined in version-controlled configuration — auditable and reproducible.",
      example: "e.g. Column-level masking policies in dbt that propagate through to every downstream consumer",
    },
    {
      icon: GitBranch,
      title: "Version Everything",
      description: "Schemas, transformations, models, dashboards — all in git. Every change has a commit, a review, and a rollback path. Data infrastructure deserves the same rigor as application code.",
      example: "e.g. PR-based workflow: branch → transform → test → review → merge → deploy",
    },
    {
      icon: FileCheck,
      title: "Test Before You Ship",
      description: "Data contracts, schema validation, and statistical tests run in CI before any change reaches production. Bad data stops at the gate.",
      example: "e.g. Automated tests catch a NULL in a NOT NULL revenue column before it corrupts 14 downstream reports",
    },
    {
      icon: RefreshCw,
      title: "Idempotent & Replayable",
      description: "Every pipeline is idempotent. Every transformation is deterministic. Re-run any job at any point in time and get the same result — critical for audits and debugging.",
      example: "e.g. Backfill 6 months of data after a logic fix — same results, zero side effects",
    },
    {
      icon: Lock,
      title: "Security by Default",
      description: "Encryption at rest and in transit. Least-privilege access. Row-level security. SOC 2 and GDPR-aware design patterns baked into every layer.",
      example: "e.g. Marketing sees aggregated metrics; Finance sees row-level transactions — same warehouse, different policies",
    },
    {
      icon: Gauge,
      title: "Cost-Aware Compute",
      description: "Auto-scaling, query optimization, and resource tagging ensure you only pay for what you use. We design for efficiency, not just correctness.",
      example: "e.g. Cluster auto-suspends after 5 min idle; incremental models process only changed rows",
    },
    {
      icon: Network,
      title: "API-First Everything",
      description: "Every data asset is accessible via well-documented APIs. Metrics, models, and datasets are products with SLAs, versioning, and consumer contracts.",
      example: "e.g. Product team queries a churn-probability API that serves a live ML model behind a REST endpoint",
    },
    {
      icon: Rocket,
      title: "AI-Ready from Day One",
      description: "Feature stores, vector databases, and embedding pipelines are built into the architecture — not retrofitted. When you're ready for AI, the infrastructure already is.",
      example: "e.g. Your support tickets are already embedded in a vector DB, ready for semantic search and RAG",
    },
    {
      icon: Activity,
      title: "Self-Healing Pipelines",
      description: "Automated retry logic, circuit breakers, and fallback strategies mean transient failures resolve themselves. Engineers sleep; pipelines don't.",
      example: "e.g. API timeout at 3 AM → exponential backoff → retry succeeds → no human intervention needed",
    },
    {
      icon: Boxes,
      title: "Multi-Tenant & Multi-Region",
      description: "Data isolation, regional compliance, and tenant-aware architectures for organizations operating across geographies and business units.",
      example: "e.g. EU customer data stays in eu-west-1; US data in us-east-1 — same codebase, policy-driven routing",
    },
  ];

  return (
    <PageLayout>
      <ReadingProgressBar />
      <div className="overflow-x-hidden">
      <PageHero
        label="Our Thesis"
        title={<>Data Is Infrastructure.{" "}<span className="text-gradient-orange">Intelligence Is Product.</span></>}
        subtitle="A deep technical manifesto on why modern enterprises need engineering-grade data systems — and how InclinedPlane builds them."
      />

      <ThesisTOC />

      {/* PDF Download Bar */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mb-8 print:hidden">
        <motion.div {...fadeUp} className="flex justify-end">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl glass-panel text-sm font-medium text-foreground hover:border-primary/30 transition-colors"
            data-cursor-hover
          >
            <Download size={15} className="text-primary" />
            <span>Download as PDF</span>
          </button>
        </motion.div>
      </div>

      <div className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 1 — THE PROBLEM */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="the-problem" className="relative mb-24 scroll-mt-24">
            <SectionGlow position="top-left" size={500} />

            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">The Problem</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                The Old Model Is <span className="text-gradient-orange">Catastrophically</span> Inadequate
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Most organizations still treat data as a reporting function — static dashboards built on fragile pipelines,
                monthly cadences that lag behind market shifts, and analytics teams buried in ad-hoc requests. There is no
                observability. No testing. No CI/CD. No governance beyond a shared Google Sheet.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This was adequate when markets moved slowly and "data-driven" meant having a BI tool. It is <strong className="text-foreground">catastrophically
                inadequate</strong> in the age of AI, where your competitors are deploying autonomous agents that make decisions
                in milliseconds while your team is still waiting for last month's revenue reconciliation.
              </p>
            </motion.div>

            {/* Before / After */}
            <motion.div {...fadeUp}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-4">The Transformation</p>
              <BeforeAfter />
            </motion.div>
          </section>


          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 2 — DATA MATURITY */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="data-maturity" className="relative mb-24 scroll-mt-24">
            <SectionGlow position="top-right" size={450} />

            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Data Maturity</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                The Five Levels of <span className="text-gradient-orange">Data Maturity</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Every organization sits somewhere on the data maturity spectrum. Most are stuck at Level 1 or 2 — reactive,
                manual, and fragile. The competitive edge isn't just having data; it's having <em>infrastructure</em> that
                turns data into autonomous, reliable, observable systems.
              </p>
            </motion.div>

            <MaturityStaircase />
          </section>


          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 3 — THE ARCHITECTURE */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="the-architecture" className="relative mb-24 scroll-mt-24">
            <SectionGlow position="center" size={600} />

            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">The Architecture</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                End-to-End <span className="text-gradient-orange">Intelligence Pipeline</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We don't build point solutions. We architect complete data systems — from raw source ingestion to
                autonomous decision-making. Every layer is observable, testable, and independently scalable.
                Here's the architecture we deploy:
              </p>
            </motion.div>

            <ArchitectureDiagram />

            {/* Architecture narrative */}
            <motion.div {...fadeUp} className="mt-10 grid md:grid-cols-2 gap-6">
              <div className="glass-panel rounded-xl p-6">
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Database size={14} className="text-primary" /> How Data Flows
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Raw data enters through CDC streams, API connectors, and batch loaders — landing first in a raw zone
                  (bronze layer). dbt models clean, deduplicate, and enrich it through silver to gold. Quality gates at
                  every transition validate schema conformance, freshness SLAs, and statistical expectations. Only clean,
                  governed data reaches the intelligence layer.
                </p>
              </div>
              <div className="glass-panel rounded-xl p-6">
                <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                  <Brain size={14} className="text-primary" /> How Intelligence Is Built
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  The intelligence layer consumes curated data through semantic layers (for BI) and feature stores (for ML).
                  Dashboards serve real-time KPIs. Predictive models score opportunities, risks, and anomalies.
                  LLM-powered agents sit on top — querying data in natural language, triggering workflows, and generating
                  executive summaries without human intervention.
                </p>
              </div>
            </motion.div>
          </section>


          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 4 — BI & ANALYTICS REVOLUTION */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="analytics-bi" className="relative mb-24 scroll-mt-24">
            <SectionGlow position="bottom-left" size={400} />

            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Analytics & BI</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Beyond Dashboards: <span className="text-gradient-orange">Analytics That Act</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Traditional BI is a mirror — it shows you what happened. We build analytics systems that are a compass —
                they show you what to <em>do</em>. The difference is semantic layers that standardize truth, embedded analytics
                that live where decisions are made, and AI overlays that surface insights before you ask.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: LayoutDashboard,
                  title: "Semantic Layer Architecture",
                  body: "One definition of 'revenue' across every dashboard, report, and model. No more conflicting numbers in board meetings. Tools like dbt Metrics and Cube.js enforce a single source of truth that every consumer inherits.",
                },
                {
                  icon: LineChart,
                  title: "Real-Time Operational BI",
                  body: "Stream processing meets business intelligence. Live order volumes, inventory levels, support ticket SLAs — all updating in real-time. Not 'refreshed every 15 minutes' — genuinely real-time via streaming architectures.",
                },
                {
                  icon: Target,
                  title: "Embedded & Contextual",
                  body: "Analytics embedded directly into the tools your teams already use — Slack, CRM, ERP, internal portals. The insight finds the decision-maker, not the other way around. 80% reduction in ad-hoc analyst requests.",
                },
                {
                  icon: TrendingUp,
                  title: "Predictive Overlays",
                  body: "Every historical metric paired with a forward-looking forecast. Revenue dashboard shows projected end-of-quarter. Inventory view shows predicted stockouts. Churn report highlights at-risk accounts with intervention scores.",
                },
                {
                  icon: Bot,
                  title: "Natural Language Querying",
                  body: "\"What was our top-performing channel last quarter, excluding brand?\" — answered in seconds by an LLM that queries your semantic layer. Democratizes data access without compromising governance.",
                },
                {
                  icon: Building2,
                  title: "Enterprise KPI Frameworks",
                  body: "North Star metrics cascade from board-level OKRs to team-level KPIs. Every metric has an owner, a threshold, an alert, and a drill-down path. Alignment isn't aspirational — it's architectural.",
                },
              ].map((card, i) => {
                const CardIcon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    {...stagger}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    className="glass-panel rounded-xl p-5 hover:border-primary/15 transition-colors duration-300"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <CardIcon size={15} className="text-primary" />
                    </div>
                    <h4 className="text-sm font-bold text-foreground mb-2">{card.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{card.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </section>


          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 5 — AI REVOLUTION */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="ai-revolution" className="relative mb-24 scroll-mt-24">
            <SectionGlow position="top-right" size={500} />

            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">The AI Revolution</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                From Prediction to <span className="text-gradient-orange">Autonomous Decision</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The AI revolution isn't about adding a chatbot. It's about fundamentally re-architecting your data systems
                so that intelligence is a <em>product</em>, not a project. Models that ship with monitoring. Agents that
                act on data autonomously. Feature stores that serve real-time signals. This is the leap from "we have AI"
                to "AI runs our operations."
              </p>
            </motion.div>

            {/* AI Architecture pillars */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <motion.div {...fadeUp} className="glass-panel-strong rounded-xl p-6 border-primary/15">
                <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Cpu size={14} className="text-primary" /> Production ML Pipeline
                </h4>
                <div className="space-y-3">
                  {[
                    "Feature engineering with real-time and batch feature stores",
                    "Model training with experiment tracking (MLflow, W&B)",
                    "Automated model validation against baseline metrics",
                    "Canary deployments with traffic-split A/B testing",
                    "Continuous monitoring for drift, bias, and performance",
                    "Automated retraining triggered by performance thresholds",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...fadeUp} className="glass-panel-strong rounded-xl p-6 border-accent/15">
                <h4 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Bot size={14} className="text-primary" /> Agentic AI Systems
                </h4>
                <div className="space-y-3">
                  {[
                    "Multi-step reasoning agents over enterprise data (LangChain, CrewAI)",
                    "RAG pipelines with vector databases for contextual retrieval",
                    "Tool-use agents that query APIs, databases, and external services",
                    "Human-in-the-loop approval workflows for high-stakes decisions",
                    "Agent observability: token usage, latency, accuracy, hallucination rates",
                    "Guardrails, content filtering, and audit trails for compliance",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={12} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-xs text-muted-foreground leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Real-world scenario */}
            <motion.div {...fadeUp}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-4">Real-World Scenario: Autonomous Incident Response</p>
              <AutomationFlow />
            </motion.div>
          </section>


          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 6 — ENTERPRISE PRINCIPLES */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="enterprise-principles" className="relative mb-24 scroll-mt-24">
            <SectionGlow position="center" size={550} />

            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Engineering Principles</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                12 Principles of <span className="text-gradient-orange">Enterprise-Ready</span> Architecture
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                These aren't aspirational values. They are hard engineering constraints we enforce in every engagement.
                Each principle has concrete implementation patterns, automated checks, and measurable outcomes.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {principles.map((p, i) => (
                <PrincipleCard key={p.title} {...p} index={i} />
              ))}
            </div>
          </section>


          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 7 — AUTOMATION & DECISION SYSTEMS */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="automation" className="relative mb-24 scroll-mt-24">
            <SectionGlow position="bottom-right" size={450} />

            <motion.div {...fadeUp} className="max-w-3xl mb-10">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Automation</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Systems That <span className="text-gradient-orange">Think, Act, and Learn</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                The final frontier of data maturity is automation — systems that don't just inform, but <em>act</em>.
                We build autonomous decision pipelines that monitor business metrics, reason about anomalies,
                execute corrective actions, and learn from outcomes. This is where data engineering becomes
                competitive advantage.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: Workflow,
                  title: "Orchestrated Workflows",
                  desc: "Complex, multi-system workflows that span data pipelines, ML models, notifications, and external APIs. Think: monthly close process automated end-to-end — from data ingestion to executive report delivery.",
                  examples: ["Automated financial close: 14 pipeline stages, 23 quality gates, zero manual steps", "Supply chain optimization: demand forecast → procurement trigger → vendor API call"],
                },
                {
                  icon: Sparkles,
                  title: "Intelligent Alerting",
                  desc: "Not threshold-based noise. AI-powered anomaly detection that understands seasonality, trends, and context. Alerts come with root cause analysis, impact assessment, and recommended actions.",
                  examples: ["\"Revenue dropped 12% — caused by payment gateway timeout in APAC region\"", "\"Customer churn risk increased — 3 high-value accounts showing disengagement patterns\""],
                },
                {
                  icon: ShieldCheck,
                  title: "Self-Healing Infrastructure",
                  desc: "Pipelines that detect their own failures, diagnose root causes, and execute remediation playbooks. Schema drift? Auto-adapt. API timeout? Exponential backoff. Source system down? Graceful degradation with cached data.",
                  examples: ["Schema change in source → automatic downstream migration → zero downtime", "Pipeline SLA breach → auto-scale compute → catch up within 15 minutes"],
                },
                {
                  icon: Brain,
                  title: "AI Leadership Summaries",
                  desc: "Executive dashboards are dead. We build AI systems that generate natural-language briefings — summarizing what changed, why it matters, and what to do about it. Delivered via email, Slack, or embedded in your tools.",
                  examples: ["Weekly AI-generated board report: key metrics, notable movements, risk flags", "Daily ops briefing: pipeline health, model performance, anomaly digest"],
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    {...stagger}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                    className="glass-panel rounded-xl p-6 hover:border-primary/15 transition-colors duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <h4 className="text-sm font-bold text-foreground">{item.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                    <div className="space-y-2">
                      {item.examples.map((ex, j) => (
                        <div key={j} className="flex items-start gap-2 pt-2 border-t border-border/20">
                          <Terminal size={10} className="text-primary/40 mt-0.5 shrink-0" />
                          <p className="text-[10px] font-mono text-muted-foreground/60 italic leading-relaxed">{ex}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>


          {/* ════════════════════════════════════════════════════════════ */}
          {/* SECTION 8 — WHY INCLINEDPLANE */}
          {/* ════════════════════════════════════════════════════════════ */}
          <section id="why-inclinedplane" className="relative mb-16 scroll-mt-24">
            <motion.div {...fadeUp}>
              <div className="glass-panel-strong rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden border border-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/3 pointer-events-none" />

                <div className="relative z-10">
                  <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Why InclinedPlane</p>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                    We Don't Just Build Pipelines. <br className="hidden sm:block" />
                    <span className="text-gradient-orange">We Build Leverage.</span>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
                    An inclined plane is the oldest force multiplier — transforming effort into elevation.
                    That's exactly what we do with data. We take the raw weight of your organization's information
                    and build the infrastructure that converts it into upward momentum — better decisions, faster execution,
                    autonomous intelligence.
                  </p>
                  <p className="text-sm text-muted-foreground/70 max-w-2xl mx-auto mb-8">
                    This isn't consulting. This is engineering. Production-grade systems, not slide decks.
                    Observable infrastructure, not black boxes. AI that ships, not AI that demos.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={() => navigate("/services")}
                      className="px-6 py-3 rounded-xl bg-gradient-orange text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity"
                      data-cursor-hover
                    >
                      Explore Our Services
                    </button>
                    <button
                      onClick={() => navigate("/contact")}
                      className="px-6 py-3 rounded-xl glass-panel text-foreground font-medium text-sm hover:border-primary/30 transition-colors"
                      data-cursor-hover
                    >
                      Start a Conversation
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

        </div>
      </div>
      </div>
    </PageLayout>
  );
};

export default Thesis;
