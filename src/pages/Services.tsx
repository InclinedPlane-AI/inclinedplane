import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Database,
  Shield,
  BarChart3,
  Brain,
  Zap,
  Layers,
  CloudCog,
  Warehouse,
  GitBranch,
  FileCheck,
  Activity,
  Eye,
  Terminal,
  Bell,
  DollarSign,
  PieChart,
  LayoutDashboard,
  Gauge,
  Radio,
  Users,
  TrendingUp,
  Cpu,
  FlaskConical,
  MessageSquare,
  Bot,
  Workflow,
  Siren,
  Link2,
  FileText,
  Sparkles,
  Compass,
  Target,
  Map,
  Briefcase,
  ClipboardCheck,
  Lightbulb,
} from "lucide-react";
import { useState, useEffect, useCallback, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import SectionGlow from "@/components/SectionGlow";
import { accentFor } from "@/data/services";

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

const advisoryPillar: ServicePillar = {
  number: "00",
  title: "Data & AI Consultancy",
  shortTitle: "Clarity Layer",
  subtitle: "Clarity Layer",
  positioning: "Know before you build.",
  description:
    "Most enterprises are sitting on fragmented data, half-adopted tools, and AI ambitions with no clear path forward. We change that. We work with leadership and data teams to cut through the noise, auditing what you have, identifying what's holding you back, and building a roadmap that turns AI from a boardroom talking point into a funded, sequenced plan of action. No fluff. No generic frameworks. Just a clear view of where you are, where you need to go, and exactly how to get there.",
  tagline: "Clarity before code.",
  icon: Compass,
  items: [
    { label: "Data & AI maturity assessment", icon: ClipboardCheck },
    { label: "AI opportunity identification & prioritisation", icon: Lightbulb },
    { label: "Technology & vendor selection", icon: Target },
    { label: "Data & AI strategy & roadmap", icon: Map },
    { label: "Business case development for AI initiatives", icon: FileText },
    { label: "Operating model & team design for AI-readiness", icon: Users },
  ],
  tools: ["Maturity Frameworks", "ROI Modeling", "Vendor Scorecards", "Capability Mapping", "Roadmapping", "Workshops"],
  benefits: [
    "A boardroom-ready AI roadmap your leadership can fund and act on",
    "Clarity on which AI bets will deliver ROI, and which to avoid",
    "A data foundation sequenced for your AI ambitions, not just today's reporting needs",
  ],
};

const pillars: ServicePillar[] = [
  {
    number: "01",
    title: "Data Foundation & Architecture Modernization",
    shortTitle: "Data Architecture",
    subtitle: "AI-Readiness Foundation",
    positioning: "We unify and stabilize your data environment.",
    description:
      "Every intelligent system starts with a solid foundation. We design and build modern data architectures that consolidate fragmented sources, eliminate silos, and create a single source of truth, whether you're migrating from legacy systems or building greenfield. Our approach ensures your data estate is scalable, governed, and ready for whatever comes next. AI-assisted architecture design means faster scoping, fewer blind spots, and a foundation that's ready for your future AI ambitions, not just your current ones.",
    tagline: "Build once. Scale forever.",
    icon: Database,
    items: [
      { label: "AI-ready enterprise data architecture", icon: Layers },
      { label: "Data platform engineering", icon: Database },
      { label: "Cloud migration & redesign", icon: CloudCog },
      { label: "Lakehouse & warehouse design", icon: Warehouse },
      { label: "Legacy integration", icon: Link2 },
      { label: "Data modeling & schema design", icon: GitBranch },
      { label: "Governance frameworks", icon: Shield },
    ],
    tools: [
      "Azure",
      "AWS",
      "GCP",
      "Databricks",
      "Snowflake",
      "BigQuery",
      "Fabric",
      "ClickHouse",
      "dbt",
      "Terraform",
      "SQL",
    ],
    benefits: [
      "60% faster time-to-insight",
      "Single source of truth across all systems",
      " AI-ready by design: every architecture decision we make accounts for the data demands of future AI and ML systems.",
    ],
  },
  {
    number: "02",
    title: "Data Reliability, Observability & DataOps",
    shortTitle: "Reliability & Ops",
    subtitle: "Reliability Layer",
    positioning: "Architecture before intelligence. Reliability is not optional.",
    description:
      "Most firms skip this layer entirely. We don't. Before any dashboard or model can be trusted, the pipelines feeding them must be bulletproof. We implement production-grade observability, automated testing, and CI/CD workflows that catch issues before they reach stakeholders, turning your data platform into a production-grade system. We use AI-powered monitoring tools to detect anomalies faster than any manual process, because reliable pipelines aren't just good engineering, they're a prerequisite for any AI system you'll build on top.",
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
    tools: [
      "Airflow",
      "dbt",
      "GitHub",
      "Python",
      "Docker",
      "Terraform",
      "Great Expectations",
      "Monte Carlo",
      "Datadog",
    ],
    benefits: ["99.9% pipeline uptime", "Engineering-first credibility", "Proactive anomaly detection"],
  },
  {
    number: "03",
    title: "Intelligence & Analytics Systems",
    shortTitle: "Analytics & Intelligence",
    subtitle: "Analytics Layer",
    positioning: "Automated intelligence & BI, de-risking every decision.",
    description:
      "Data without visibility is just cost. We build analytics systems that put the right metrics in front of the right people, from C-suite dashboards to embedded operational views. Our semantic layers standardize KPIs across the business, while self-serve tooling empowers teams to answer their own questions without waiting on data teams.",
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
    benefits: [
      "80% reduction in ad-hoc requests",
      "Real-time operational visibility",
      "Data-literate, self-sufficient teams",
    ],
  },
  {
    number: "04",
    title: "Predictive & AI Implementation",
    shortTitle: "AI & ML Implementations",
    subtitle: "Predictive Layer",
    positioning: "AI, predictive & agentic implementation, from experimentation to production.",
    description:
      "We take AI from proof-of-concept to production. Whether it's demand forecasting, risk scoring, or natural language interfaces over your data. We build, deploy, and monitor ML systems that deliver measurable business impact. No science projects. Every model ships with monitoring, retraining pipelines, and clear ROI metrics.",
    tagline: "No science projects. Just production.",
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
    tools: [
      "Python",
      "OpenAI",
      "Claude",
      "Mistral",
      "LangChain",
      "Hugging Face",
      "Databricks",
      "AWS",
      "MLflow",
      "SageMaker",
      "PyTorch",
    ],
    benefits: ["Production-grade ML in weeks", "Continuous model improvement", "AI-first competitive edge"],
  },
  {
    number: "05",
    title: "Automation & Decision Systems",
    shortTitle: "Automation Systems",
    subtitle: "Intelligence Layer",
    positioning: "From dashboards to decision systems: automated intelligence.",
    description:
      "The final frontier of data maturity: systems that don't just inform, but act. We build automated decision pipelines. AI agents that monitor, reason, and execute. From intelligent alerting to cross-system orchestration, we help leadership move from reading dashboards to receiving action-ready intelligence summaries.",
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
    tools: [
      "n8n",
      "Kafka",
      "LangChain",
      "Claude",
      "Mistral",
      "OpenAI",
      "Docker",
      "Python",
      "Temporal",
      "Custom Agents",
    ],
    benefits: ["90% faster incident response", "Automated decision pipelines", "Leadership-ready intelligence"],
  },
];

/* ── Section content ──
 * Each layer carries its own accent colour (src/data/services.ts), exposed as
 * the --layer CSS variable and used as hsl(var(--layer) / alpha) throughout.
 */
const layerStyle = (number: string) => ({ "--layer": accentFor(number) }) as React.CSSProperties;

const ServiceContent = ({ pillar, isActive }: { pillar: ServicePillar; isActive: boolean }) => {
  const Icon = pillar.icon;

  return (
    <div
      style={layerStyle(pillar.number)}
      className={`relative w-full overflow-hidden rounded-3xl border border-[hsl(var(--layer)/0.22)] bg-card/70 p-5 sm:p-8 lg:p-10 transition-shadow duration-500 ${
        isActive ? "shadow-[0_24px_70px_-30px_hsl(var(--layer)/0.55)]" : "shadow-sm"
      }`}
    >
      {/* Tint washes, dot texture, watermark number, accent edge */}
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--layer)/0.13)] via-[hsl(var(--layer)/0.035)] to-transparent pointer-events-none" />
      <div className="absolute -top-28 -right-24 w-80 h-80 rounded-full bg-[hsl(var(--layer)/0.16)] blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--layer) / 0.22) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(to bottom left, black, transparent 55%)",
          WebkitMaskImage: "linear-gradient(to bottom left, black, transparent 55%)",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute right-4 sm:right-8 -top-2 font-mono font-bold leading-none text-[6rem] sm:text-[9rem] text-[hsl(var(--layer)/0.09)] select-none pointer-events-none"
      >
        {pillar.number}
      </span>
      <div className="absolute left-0 top-10 bottom-10 w-1 rounded-r-full bg-gradient-to-b from-[hsl(var(--layer))] via-[hsl(var(--layer)/0.5)] to-transparent" />

      <div className="relative">
        <div className="flex items-start gap-4 mb-5">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-[hsl(var(--layer)/0.28)] to-[hsl(var(--layer)/0.08)] border border-[hsl(var(--layer)/0.3)] transition-transform duration-500 ${
              isActive ? "scale-105" : ""
            }`}
          >
            <Icon size={22} className="text-[hsl(var(--layer))]" />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="font-mono text-[10px] text-[hsl(var(--layer))] tracking-wider">{pillar.number}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-md border border-[hsl(var(--layer)/0.35)] text-[hsl(var(--layer))] bg-[hsl(var(--layer)/0.08)]">
                {pillar.subtitle}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">{pillar.title}</h2>
          </div>
        </div>

        <p className="text-base sm:text-lg font-medium text-foreground/90 leading-relaxed mb-3">{pillar.positioning}</p>
        <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">{pillar.description}</p>
        <blockquote className="mt-4 pl-3 border-l-2 border-[hsl(var(--layer))] font-mono text-xs sm:text-sm italic text-[hsl(var(--layer))]">
          "{pillar.tagline}"
        </blockquote>

        {/* Capabilities */}
        <div className="mt-8">
          <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Capabilities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {pillar.items.map(({ label, icon: ItemIcon }) => (
              <div
                key={label}
                className="group flex items-center gap-3 rounded-xl border border-[hsl(var(--layer)/0.14)] bg-background/60 px-3 py-2.5 hover:border-[hsl(var(--layer)/0.4)] hover:bg-[hsl(var(--layer)/0.06)] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[hsl(var(--layer)/0.12)]">
                  <ItemIcon size={15} className="text-[hsl(var(--layer))]" />
                </div>
                <span className="text-sm text-foreground/90">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack + Outcomes */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-4">
          <div className="rounded-2xl border border-border/60 bg-background/50 p-5">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {pillar.tools.map((tool) => (
                <span
                  key={tool}
                  className="text-[11px] px-2.5 py-1 rounded-md bg-background/80 text-foreground/80 border border-border font-mono hover:border-[hsl(var(--layer)/0.5)] hover:text-[hsl(var(--layer))] transition-colors"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-[hsl(var(--layer)/0.3)] bg-gradient-to-br from-[hsl(var(--layer)/0.14)] to-[hsl(var(--layer)/0.04)] p-5">
            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--layer))] mb-3">Outcomes</h4>
            <div className="space-y-2.5">
              {pillar.benefits.map((b) => (
                <div key={b} className="flex items-start gap-2">
                  <CheckCircle2 size={15} className="text-[hsl(var(--layer))] shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/90 leading-snug">{b.trim()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Main page ── */
const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Combined list: index 0 = advisory, 1..N = delivery pillars
  const allPillars: ServicePillar[] = [advisoryPillar, ...pillars];

  /* Track scroll position to update active index */
  useEffect(() => {
    const handleScroll = () => {
      const threshold = 160;
      let current = 0;

      for (let i = 0; i < sectionRefs.current.length; i++) {
        const el = sectionRefs.current[i];
        if (!el) continue;

        const top = el.getBoundingClientRect().top;
        if (top <= threshold) {
          current = i;
        }
      }

      setActiveIndex((prev) => (prev === current ? prev : current));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollTo = useCallback((index: number) => {
    setActiveIndex(index);
    const el = sectionRefs.current[index];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 128;
      window.scrollTo({ top, behavior: "smooth" });
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
          provider: { "@type": "Organization", name: "InclinedPlane" },
          serviceType: "Data Engineering Consulting",
          areaServed: "Worldwide",
          description:
            "End-to-end data engineering services including cloud warehouse architecture, BI modernization, DataOps, and AI automation.",
        }}
      />
      <PageHero
        label="Services"
        title={
          <>
            What We <span className="text-gradient-orange">Do.</span>
          </>
        }
        subtitle={`Five layers of data infrastructure, from foundation to automated intelligence. Every layer we build is AI-enabled in delivery and AI-ready in design, so your data infrastructure doesn't just work today, it supports whatever you build tomorrow.`}
      >
        {/* The inclined plane: each layer a step up. Click a step to jump to it. */}
        <div className="relative mt-10 sm:mt-12 mx-auto max-w-3xl">
          <div className="flex items-end gap-1.5 sm:gap-3 h-44 sm:h-52">
            {allPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.button
                  key={p.number}
                  type="button"
                  onClick={() => scrollTo(i)}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${30 + i * 14}%`, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.25 + i * 0.08, ease: "easeOut" }}
                  style={layerStyle(p.number)}
                  aria-label={`Jump to ${p.shortTitle}`}
                  className="group relative flex-1 rounded-t-xl border border-b-0 border-[hsl(var(--layer)/0.45)] bg-gradient-to-t from-[hsl(var(--layer)/0.06)] to-[hsl(var(--layer)/0.3)] hover:to-[hsl(var(--layer)/0.5)] transition-colors text-left overflow-hidden"
                >
                  <span className="absolute top-2 left-2 right-2 flex flex-col items-start gap-1">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[hsl(var(--layer))]" />
                    <span className="font-mono text-[9px] sm:text-[10px] text-[hsl(var(--layer))]">{p.number}</span>
                    <span className="hidden sm:block text-[10px] lg:text-[11px] font-semibold text-foreground leading-tight">{p.shortTitle}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="mt-2 flex justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-muted-foreground">
            <span>Advisory · start here</span>
            <span>Automated intelligence →</span>
          </div>
        </div>
      </PageHero>
      <div className="relative pb-24 overflow-x-clip">
        {/* Warm page tint so the page doesn't read as flat white */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.035] via-transparent to-primary/[0.04] pointer-events-none" />
        <SectionGlow position="top-left" size={700} />
        <SectionGlow position="bottom-right" size={700} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          {/* Mobile: horizontal pill nav */}
          <div className="lg:hidden mb-6 overflow-x-auto scrollbar-hide -mx-6 px-6 sticky top-16 z-20 py-2 bg-background/80 backdrop-blur-md">
            <div className="flex gap-2 w-max">
              {allPillars.map((p, i) => (
                <button
                  key={p.number}
                  onClick={() => scrollTo(i)}
                  style={layerStyle(p.number)}
                  className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeIndex === i
                    ? "bg-[hsl(var(--layer)/0.12)] text-[hsl(var(--layer))] border border-[hsl(var(--layer)/0.35)]"
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
                  {allPillars.map((p, i) => {
                    const Icon = p.icon;
                    const active = activeIndex === i;
                    const isAdvisory = i === 0;
                    const showDeliveryLabel = i === 1;
                    return (
                      <div key={p.number}>
                        {isAdvisory && (
                          <div className="px-3 pb-2 pt-1">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
                              — Advisory
                            </span>
                          </div>
                        )}
                        {showDeliveryLabel && (
                          <div className="px-3 pb-2 pt-4 border-t border-border/30 mt-2">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-primary/60">
                              — Delivery
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => scrollTo(i)}
                          style={layerStyle(p.number)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-300 group border ${active
                            ? "bg-[hsl(var(--layer)/0.1)] border-[hsl(var(--layer)/0.3)] text-foreground shadow-sm"
                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--layer)/0.05)]"
                            }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${active ? "bg-[hsl(var(--layer)/0.2)]" : "bg-[hsl(var(--layer)/0.08)]"
                              }`}
                          >
                            <Icon size={15} className={active ? "text-[hsl(var(--layer))]" : "text-[hsl(var(--layer)/0.6)]"} />
                          </div>
                          <div className="min-w-0">
                            <span className="font-mono text-[9px] text-[hsl(var(--layer))] block leading-none mb-0.5">
                              {p.number}
                            </span>
                            <span className={`text-sm font-medium truncate block ${active ? "text-foreground" : ""}`}>
                              {p.shortTitle}
                            </span>
                          </div>
                          <div
                            className={`ml-auto w-0.5 h-5 rounded-full transition-all ${active ? "bg-[hsl(var(--layer))]" : "bg-transparent"}`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </nav>

                {/* Progress */}
                <div className="mt-6 px-3">
                  <div className="h-1 rounded-full surface-3 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(to right, ${allPillars.map((x) => `hsl(${accentFor(x.number)})`).join(", ")})`,
                        backgroundSize: "12.5rem 100%",
                      }}
                      animate={{
                        width: activeIndex === 0 ? "0%" : `${(activeIndex / pillars.length) * 100}%`,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground/40 mt-2">
                    {activeIndex === 0 ? "Advisory" : `${activeIndex} / ${pillars.length}`}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: content sections */}
            <div className="flex-1 min-w-0">
              {/* Advisory divider */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">— Advisory</span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-border/40 to-transparent" />
              </div>

              {/* Advisory section — subtly distinct background */}
              <div className="relative mt-4 mb-12 lg:mb-16">
                <div className="relative">
                  <div
                    id={advisoryPillar.shortTitle.toLowerCase().replace(/[\s&]+/g, "-")}
                    ref={(el) => {
                      sectionRefs.current[0] = el;
                    }}
                  >
                    <ServiceContent pillar={advisoryPillar} isActive={activeIndex === 0} />
                  </div>
                </div>
              </div>

              {/* Delivery divider */}
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">— Delivery</span>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-border/40 to-transparent" />
              </div>

              <div className="mt-4 mb-10 lg:mb-14 space-y-8">
                {pillars.map((pillar, i) => {
                  const idx = i + 1; // offset for advisory at 0
                  return (
                    <div
                      key={pillar.number}
                      id={pillar.shortTitle.toLowerCase().replace(/[\s&]+/g, "-")}
                      ref={(el) => {
                        sectionRefs.current[idx] = el;
                      }}
                    >
                      <ServiceContent pillar={pillar} isActive={activeIndex === idx} />
                    </div>
                  );
                })}
              </div>
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
            <div className="glass-panel-strong rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none" />
              <div
                className="absolute inset-x-0 top-0 h-1 pointer-events-none"
                style={{ background: `linear-gradient(to right, ${allPillars.map((x) => `hsl(${accentFor(x.number)})`).join(", ")})` }}
              />
              <div className="relative z-10">
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary/60 mb-3">Let's talk</p>
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                  Find your starting point.
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                  Whether you need a solid data foundation or automated decision systems, we'll design the roadmap and
                  deliver results.
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
