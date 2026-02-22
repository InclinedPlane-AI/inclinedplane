import PageLayout from "@/components/PageLayout";
import { motion, useInView } from "framer-motion";
import {
  Database, Shield, BarChart3, Brain, Zap,
  Layers, CloudCog, Warehouse, GitBranch, FileCheck,
  Activity, Eye, Terminal, Bell, DollarSign,
  PieChart, LayoutDashboard, Gauge, Radio, Users,
  TrendingUp, Cpu, FlaskConical, MessageSquare, Bot,
  Workflow, Siren, Link2, FileText, Sparkles
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";

interface ServiceItem {
  label: string;
  icon: React.ElementType;
}

interface ServicePillar {
  number: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  positioning: string;
  tagline: string;
  icon: React.ElementType;
  items: ServiceItem[];
  tools: string[];
  benefits: string[];
}

const pillars: ServicePillar[] = [
  {
    number: "01",
    title: "Data Foundation & Architecture Modernization",
    shortTitle: "Foundation",
    subtitle: "Entry Point",
    positioning: "We unify and stabilize your data environment.",
    tagline: "Build once. Scale forever.",
    icon: Database,
    items: [
      { label: "Enterprise data architecture", icon: Layers },
      { label: "Data platform engineering", icon: Database },
      { label: "Cloud migration & redesign", icon: CloudCog },
      { label: "Lakehouse & warehouse design", icon: Warehouse },
      { label: "Legacy integration", icon: Link2 },
      { label: "Data modeling & schema design", icon: GitBranch },
      { label: "Governance frameworks", icon: Shield },
    ],
    tools: ["Snowflake", "Databricks", "BigQuery", "Redshift", "Azure Synapse", "dbt", "Terraform"],
    benefits: ["60% faster time-to-insight", "Single source of truth", "Future-proof architecture"],
  },
  {
    number: "02",
    title: "Data Reliability, Observability & DataOps",
    shortTitle: "Reliability",
    subtitle: "Differentiator",
    positioning: "Architecture before intelligence — reliability is not optional.",
    tagline: "If you can't trust it, you can't use it.",
    icon: Shield,
    items: [
      { label: "Pipeline monitoring", icon: Activity },
      { label: "Data quality frameworks", icon: FileCheck },
      { label: "Lineage tracking", icon: Eye },
      { label: "CI/CD for pipelines", icon: Terminal },
      { label: "Git-based version control", icon: GitBranch },
      { label: "SLA enforcement & alerting", icon: Bell },
      { label: "Performance & cost optimization", icon: DollarSign },
    ],
    tools: ["Great Expectations", "Monte Carlo", "dbt Tests", "Airflow", "GitHub Actions", "Datadog"],
    benefits: ["99.9% pipeline uptime", "Engineering-first credibility", "Proactive anomaly detection"],
  },
  {
    number: "03",
    title: "Intelligence & Analytics Systems",
    shortTitle: "Intelligence",
    subtitle: "Visibility Layer",
    positioning: "Automated intelligence & BI — de-risking every decision.",
    tagline: "From data to decisions in seconds.",
    icon: BarChart3,
    items: [
      { label: "Executive dashboards", icon: LayoutDashboard },
      { label: "Operational reporting", icon: PieChart },
      { label: "Embedded analytics", icon: BarChart3 },
      { label: "KPI standardization", icon: Gauge },
      { label: "Semantic layers", icon: Layers },
      { label: "Real-time reporting", icon: Radio },
      { label: "Self-serve BI", icon: Users },
    ],
    tools: ["Power BI", "Tableau", "Looker", "Metabase", "Cube.js", "dbt Semantic Layer"],
    benefits: ["80% reduction in ad-hoc requests", "Real-time operational visibility", "Data-literate teams"],
  },
  {
    number: "04",
    title: "Predictive & AI Implementation",
    shortTitle: "Predictive AI",
    subtitle: "High-Margin Layer",
    positioning: "AI, predictive & agentic implementation — from experimentation to production.",
    tagline: "Predict. Adapt. Outperform.",
    icon: Brain,
    items: [
      { label: "Forecasting systems", icon: TrendingUp },
      { label: "Growth & risk modeling", icon: FlaskConical },
      { label: "ML model deployment & MLOps", icon: Cpu },
      { label: "Model monitoring", icon: Activity },
      { label: "Feature engineering", icon: GitBranch },
      { label: "LLM integration", icon: Brain },
      { label: "Natural language querying", icon: MessageSquare },
    ],
    tools: ["Python", "Scikit-learn", "PyTorch", "MLflow", "SageMaker", "OpenAI", "LangChain", "Hugging Face"],
    benefits: ["Production-grade ML in weeks", "Continuous model improvement", "AI-native competitive edge"],
  },
  {
    number: "05",
    title: "Automation & Decision Systems",
    shortTitle: "Automation",
    subtitle: "Future-Forward Layer",
    positioning: "From dashboards to decision systems — autonomous intelligence.",
    tagline: "Systems that think, act, and learn.",
    icon: Zap,
    items: [
      { label: "AI agents", icon: Bot },
      { label: "Workflow orchestration", icon: Workflow },
      { label: "Intelligent alerts", icon: Siren },
      { label: "Action-triggered dashboards", icon: Sparkles },
      { label: "Procurement + forecasting integration", icon: Link2 },
      { label: "Automated anomaly response", icon: Shield },
      { label: "AI-assisted leadership summaries", icon: FileText },
    ],
    tools: ["n8n", "LangChain", "Claude", "Mistral", "Kafka", "Temporal", "Custom Agents"],
    benefits: ["90% faster incident response", "Autonomous decision pipelines", "Leadership-ready intelligence"],
  },
];

/* ── Single section observed by IntersectionObserver ── */
const ServiceSection = ({
  pillar,
  index,
  isActive,
}: {
  pillar: ServicePillar;
  index: number;
  isActive: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px", once: false });
  const show = isActive || isInView;
  const Icon = pillar.icon;

  return (
    <div ref={ref} className="scroll-mt-32 min-h-[60vh] lg:min-h-[70vh] flex items-start py-8 lg:py-16" id={`service-${index}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: show ? 1 : 0.3, y: show ? 0 : 10 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-xs text-muted-foreground/40">{pillar.number}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
            {pillar.subtitle}
          </span>
        </div>

        {/* Title */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-1">
            <Icon size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2">
              {pillar.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{pillar.positioning}</p>
            <p className="font-mono text-xs text-primary/50 mt-1.5 italic">"{pillar.tagline}"</p>
          </div>
        </div>

        {/* Expanded content — animated */}
        <motion.div
          initial={false}
          animate={{ opacity: show ? 1 : 0, height: show ? "auto" : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 pl-0 lg:pl-[60px]">
            {/* Capabilities */}
            <div className="glass-panel rounded-xl p-5 sm:p-6 mb-4">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-4">Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pillar.items.map(({ label, icon: ItemIcon }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: show ? 1 : 0, x: show ? 0 : -8 }}
                    transition={{ delay: show ? i * 0.04 : 0, duration: 0.3 }}
                    className="flex items-center gap-2.5 py-1.5"
                  >
                    <div className="w-6 h-6 rounded-md surface-2 flex items-center justify-center shrink-0">
                      <ItemIcon size={12} className="text-primary/70" />
                    </div>
                    <span className="text-sm text-foreground/80">{label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tools + Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-panel rounded-xl p-5">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-3">Stack</h4>
                <div className="flex flex-wrap gap-1.5">
                  {pillar.tools.map((tool) => (
                    <span key={tool} className="text-[11px] px-2 py-0.5 rounded-md surface-2 text-muted-foreground border border-border/30 font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              <div className="glass-panel rounded-xl p-5">
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-3">Outcomes</h4>
                <div className="space-y-2">
                  {pillar.benefits.map((b) => (
                    <div key={b} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span className="text-xs text-muted-foreground">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

/* ── Main page ── */
const ServicesPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const isClickScrolling = useRef(false);

  /* Observe which section is in viewport */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );

    document.querySelectorAll("[data-index]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = useCallback((index: number) => {
    setActiveIndex(index);
    isClickScrolling.current = true;
    const el = document.getElementById(`service-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => { isClickScrolling.current = false; }, 800);
    }
  }, []);

  return (
    <PageLayout>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12 lg:mb-16">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              What We <span className="text-gradient-orange">Build.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five layers of data infrastructure — from foundation to autonomous intelligence.
            </p>
          </motion.div>

          {/* Mobile: horizontal pill nav */}
          <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide -mx-6 px-6">
            <div className="flex gap-2 w-max">
              {pillars.map((p, i) => (
                <button
                  key={p.number}
                  onClick={() => scrollTo(i)}
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    activeIndex === i
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "surface-2 text-muted-foreground border border-border/30"
                  }`}
                >
                  <p.icon size={14} />
                  {p.shortTitle}
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: left nav + right content */}
          <div className="flex gap-10">
            {/* Left sticky nav — desktop only */}
            <div className="hidden lg:block w-56 shrink-0">
              <div className="sticky top-32">
                <nav className="space-y-1">
                  {pillars.map((p, i) => {
                    const Icon = p.icon;
                    const active = activeIndex === i;
                    return (
                      <button
                        key={p.number}
                        onClick={() => scrollTo(i)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 group ${
                          active
                            ? "glass-panel-strong text-foreground"
                            : "text-muted-foreground/60 hover:text-muted-foreground hover:bg-muted/30"
                        }`}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          active ? "bg-primary/15" : "surface-3 group-hover:bg-muted"
                        }`}>
                          <Icon size={15} className={active ? "text-primary" : "text-muted-foreground/50"} />
                        </div>
                        <div className="min-w-0">
                          <span className={`font-mono text-[10px] block ${active ? "text-primary/60" : "text-muted-foreground/30"}`}>
                            {p.number}
                          </span>
                          <span className={`text-sm font-medium truncate block ${active ? "text-foreground" : ""}`}>
                            {p.shortTitle}
                          </span>
                        </div>
                        {/* Active indicator line */}
                        <div className={`ml-auto w-0.5 h-5 rounded-full transition-all ${active ? "bg-primary" : "bg-transparent"}`} />
                      </button>
                    );
                  })}
                </nav>

                {/* Progress */}
                <div className="mt-6 px-3">
                  <div className="h-1 rounded-full surface-3 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-orange rounded-full"
                      animate={{ width: `${((activeIndex + 1) / pillars.length) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground/40 mt-2">
                    {activeIndex + 1} / {pillars.length}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: content sections */}
            <div className="flex-1 min-w-0">
              {pillars.map((pillar, i) => (
                <div key={pillar.number} data-index={i}>
                  <ServiceSection pillar={pillar} index={i} isActive={activeIndex === i} />
                  {i < pillars.length - 1 && (
                    <div className="border-t border-border/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
