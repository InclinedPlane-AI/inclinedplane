import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Database, Shield, BarChart3, Brain, Zap,
  Layers, CloudCog, Warehouse, GitBranch, FileCheck,
  Activity, Eye, Terminal, Bell, DollarSign,
  PieChart, LayoutDashboard, Gauge, Radio, Users,
  TrendingUp, Cpu, FlaskConical, MessageSquare, Bot,
  Workflow, Siren, Link2, FileText, Sparkles
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";

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
  description: string;
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
    shortTitle: "Data Architecture",
    subtitle: "Entry Point",
    positioning: "We unify and stabilize your data environment.",
    description: "Every intelligent system starts with a solid foundation. We design and build modern data architectures that consolidate fragmented sources, eliminate silos, and create a single source of truth — whether you're migrating from legacy systems or building greenfield. Our approach ensures your data estate is scalable, governed, and ready for whatever comes next.",
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
    tools: ["Azure", "AWS", "GCP", "Databricks", "Snowflake", "BigQuery", "Fabric", "ClickHouse", "dbt", "Terraform", "SQL"],
    benefits: ["60% faster time-to-insight", "Single source of truth across all systems", "Future-proof, cloud-native architecture"],
  },
  {
    number: "02",
    title: "Data Reliability, Observability & DataOps",
    shortTitle: "Reliability & Ops",
    subtitle: "Differentiator",
    positioning: "Architecture before intelligence — reliability is not optional.",
    description: "Most firms skip this layer entirely. We don't. Before any dashboard or model can be trusted, the pipelines feeding them must be bulletproof. We implement engineering-grade observability, automated testing, and CI/CD workflows that catch issues before they reach stakeholders — turning your data platform into a production-grade system.",
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
    tools: ["Airflow", "dbt", "GitHub", "Python", "Docker", "Terraform", "Great Expectations", "Monte Carlo", "Datadog"],
    benefits: ["99.9% pipeline uptime", "Engineering-first credibility", "Proactive anomaly detection"],
  },
  {
    number: "03",
    title: "Intelligence & Analytics Systems",
    shortTitle: "Analytics & Intelligence",
    subtitle: "Visibility Layer",
    positioning: "Automated intelligence & BI — de-risking every decision.",
    description: "Data without visibility is just cost. We build analytics systems that put the right metrics in front of the right people — from C-suite dashboards to embedded operational views. Our semantic layers standardize KPIs across the business, while self-serve tooling empowers teams to answer their own questions without waiting on data teams.",
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
    tools: ["Power BI", "Tableau", "Looker", "dbt", "Snowflake", "BigQuery", "Cube.js", "Metabase"],
    benefits: ["80% reduction in ad-hoc requests", "Real-time operational visibility", "Data-literate, self-sufficient teams"],
  },
  {
    number: "04",
    title: "Predictive & AI Implementation",
    shortTitle: "AI & ML Implementations",
    subtitle: "High-Margin Layer",
    positioning: "AI, predictive & agentic implementation — from experimentation to production.",
    description: "We take AI from proof-of-concept to production. Whether it's demand forecasting, risk scoring, or natural language interfaces over your data — we build, deploy, and monitor ML systems that deliver measurable business impact. No science projects. Every model ships with monitoring, retraining pipelines, and clear ROI metrics.",
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
    tools: ["Python", "OpenAI", "Claude", "Mistral", "LangChain", "Hugging Face", "Databricks", "AWS", "MLflow", "SageMaker", "PyTorch"],
    benefits: ["Production-grade ML in weeks", "Continuous model improvement", "AI-native competitive edge"],
  },
  {
    number: "05",
    title: "Automation & Decision Systems",
    shortTitle: "Automation Systems",
    subtitle: "Future-Forward Layer",
    positioning: "From dashboards to decision systems — autonomous intelligence.",
    description: "The final frontier of data maturity: systems that don't just inform, but act. We build autonomous decision pipelines — AI agents that monitor, reason, and execute. From intelligent alerting to cross-system orchestration, we help leadership move from reading dashboards to receiving action-ready intelligence summaries.",
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
    tools: ["n8n", "Kafka", "LangChain", "Claude", "Mistral", "OpenAI", "Docker", "Python", "Temporal", "Custom Agents"],
    benefits: ["90% faster incident response", "Autonomous decision pipelines", "Leadership-ready intelligence"],
  },
];

/* ── Section content — always full height, details fade in/out ── */
const ServiceContent = ({ pillar, isActive }: { pillar: ServicePillar; isActive: boolean }) => {
  const Icon = pillar.icon;

  return (
    <div className="w-full">
      {/* Top bar */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-muted-foreground/40">{pillar.number}</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full border border-primary/10">
          {pillar.subtitle}
        </span>
      </div>

      {/* Title — always visible */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.3 }}
        transition={{ duration: 0.35 }}
        className="flex items-start gap-4 mb-4"
      >
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-1 transition-colors duration-300 ${isActive ? "bg-primary/10" : "surface-3"}`}>
          <Icon size={20} className={`transition-colors duration-300 ${isActive ? "text-primary" : "text-muted-foreground/40"}`} />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground leading-tight mb-2">
            {pillar.title}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{pillar.positioning}</p>
          <p className="text-sm text-muted-foreground/70 leading-relaxed mt-2">{pillar.description}</p>
          <p className="font-mono text-xs text-primary/50 mt-2 italic">"{pillar.tagline}"</p>
        </div>
      </motion.div>

      {/* Details — fade in/out but keep layout space */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0.08 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-auto"
        style={{ pointerEvents: isActive ? "auto" : "none" }}
      >
        <div className="pt-4 pl-0 lg:pl-[60px]">
          {/* Capabilities */}
          <div className="glass-panel rounded-xl p-5 sm:p-6 mb-4">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50 mb-4">Capabilities</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {pillar.items.map(({ label, icon: ItemIcon }) => (
                <div key={label} className="flex items-center gap-2.5 py-1.5">
                  <div className="w-6 h-6 rounded-md surface-2 flex items-center justify-center shrink-0">
                    <ItemIcon size={12} className="text-primary/70" />
                  </div>
                  <span className="text-sm text-foreground/80">{label}</span>
                </div>
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
    </div>
  );
};

/* ── Main page ── */
const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const isClickScrolling = useRef(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Track scroll position to update active index */
  useEffect(() => {
    const handleScroll = () => {
      if (isClickScrolling.current) return;

      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = 0;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (el && el.offsetTop <= scrollY) {
          current = i;
        }
      }

      setActiveIndex(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((index: number) => {
    setActiveIndex(index);
    isClickScrolling.current = true;
    const el = sectionRefs.current[index];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 128;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => { isClickScrolling.current = false; }, 1200);
    }
  }, []);

  return (
    <PageLayout>
      <SEOHead
        title="Data Engineering Services"
        description="Cloud data warehousing, BI modernization, DataOps, AI automation workflows, and observability-first pipeline engineering. Enterprise-grade data services."
        path="/services"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          provider: { "@type": "Organization", name: "Inclined Plane" },
          serviceType: "Data Engineering Consulting",
          areaServed: "Worldwide",
          description: "End-to-end data engineering services including cloud warehouse architecture, BI modernization, DataOps, and AI automation.",
        }}
      />
      <PageHero
        label="Services"
        title={<>What We <span className="text-gradient-orange">Build.</span></>}
        subtitle="Five layers of data infrastructure — from foundation to autonomous intelligence."
      />
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Mobile: horizontal pill nav */}
          <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide -mx-6 px-6 sticky top-16 z-20 py-2 bg-background/80 backdrop-blur-md">
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
                <div
                  key={pillar.number}
                  id={pillar.shortTitle.toLowerCase().replace(/[\s&]+/g, '-')}
                  ref={(el) => { sectionRefs.current[i] = el; }}
                  className="py-10 lg:py-14"
                >
                  <ServiceContent pillar={pillar} isActive={activeIndex === i} />
                  {i < pillars.length - 1 && (
                    <div className="border-t border-border/30 mt-10 lg:mt-14" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="mt-16 lg:mt-24"
          >
            <div className="glass-panel-strong rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden border border-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/3 pointer-events-none" />
              <div className="relative z-10">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60 mb-3">Ready to start?</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Impressed? Let's <span className="text-gradient-orange">Build Together.</span>
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                  Whether you need a solid data foundation or autonomous decision systems — we'll design the roadmap and deliver results.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => navigate("/contact")}
                    className="px-6 py-3 rounded-xl bg-gradient-orange text-white font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Book a Discovery Call
                  </button>
                  <a
                    href="mailto:support@inclinedplane.com"
                    className="px-6 py-3 rounded-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30 font-medium text-sm transition-colors"
                  >
                    Or drop us an email →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
