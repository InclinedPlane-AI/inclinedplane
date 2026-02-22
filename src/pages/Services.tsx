import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import {
  Database, Shield, BarChart3, Brain, Zap,
  Layers, CloudCog, Warehouse, GitBranch, FileCheck,
  Activity, Eye, Terminal, Bell, DollarSign,
  PieChart, LayoutDashboard, Gauge, Radio, Users,
  TrendingUp, Cpu, FlaskConical, MessageSquare, Bot,
  Workflow, Siren, Link2, FileText, Sparkles
} from "lucide-react";
import { useState } from "react";

interface ServiceItem {
  label: string;
  icon: React.ElementType;
}

interface ServicePillar {
  number: string;
  title: string;
  subtitle: string;
  positioning: string;
  tagline: string;
  icon: React.ElementType;
  color: string;
  items: ServiceItem[];
  tools: string[];
  benefits: string[];
}

const pillars: ServicePillar[] = [
  {
    number: "01",
    title: "Data Foundation & Architecture Modernization",
    subtitle: "Entry Point",
    positioning: "We unify and stabilize your data environment.",
    tagline: "Build once. Scale forever.",
    icon: Database,
    color: "from-orange-500 to-amber-500",
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
    subtitle: "Differentiator",
    positioning: "Architecture before intelligence — reliability is not optional.",
    tagline: "If you can't trust it, you can't use it.",
    icon: Shield,
    color: "from-emerald-500 to-teal-500",
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
    subtitle: "Visibility Layer",
    positioning: "Automated intelligence & BI — de-risking every decision.",
    tagline: "From data to decisions in seconds.",
    icon: BarChart3,
    color: "from-blue-500 to-indigo-500",
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
    subtitle: "High-Margin Layer",
    positioning: "AI, predictive & agentic implementation — from experimentation to production.",
    tagline: "Predict. Adapt. Outperform.",
    icon: Brain,
    color: "from-violet-500 to-purple-500",
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
    subtitle: "Future-Forward Layer",
    positioning: "From dashboards to decision systems — autonomous intelligence.",
    tagline: "Systems that think, act, and learn.",
    icon: Zap,
    color: "from-rose-500 to-pink-500",
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

const ServiceCard = ({ pillar, index }: { pillar: ServicePillar; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const Icon = pillar.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      viewport={{ once: true }}
      className="glass-panel rounded-2xl overflow-hidden group"
      data-cursor-hover
    >
      {/* Header */}
      <div
        className="p-6 sm:p-8 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-start gap-5">
          {/* Number + Icon */}
          <div className="shrink-0 flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground/50">{pillar.number}</span>
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Icon size={22} className="text-primary" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70 bg-primary/5 px-2 py-0.5 rounded-full">
                {pillar.subtitle}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-2 leading-tight">
              {pillar.title}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pillar.positioning}
            </p>
            <p className="font-mono text-xs text-primary/60 mt-2 italic">
              "{pillar.tagline}"
            </p>
          </div>

          {/* Expand indicator */}
          <div className="shrink-0 mt-2">
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-6 h-6 rounded-full surface-3 flex items-center justify-center"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" className="text-muted-foreground">
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Expanded content */}
      <motion.div
        initial={false}
        animate={{
          height: expanded ? "auto" : 0,
          opacity: expanded ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 sm:px-8 pb-8 pt-0">
          <div className="border-t border-border/50 pt-6">
            {/* Capabilities grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {pillar.items.map(({ label, icon: ItemIcon }) => (
                <div key={label} className="flex items-center gap-3 py-2">
                  <div className="w-7 h-7 rounded-lg surface-2 flex items-center justify-center shrink-0">
                    <ItemIcon size={14} className="text-primary/70" />
                  </div>
                  <span className="text-sm text-foreground/80">{label}</span>
                </div>
              ))}
            </div>

            {/* Tools & Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Tools */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-3">
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {pillar.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs px-2.5 py-1 rounded-md surface-2 text-muted-foreground border border-border/30 font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-3">
                  Key Outcomes
                </h4>
                <div className="space-y-2">
                  {pillar.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      <span className="text-xs text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServicesPage = () => {
  return (
    <PageLayout>
      <div className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              What We <span className="text-gradient-orange">Build.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Five layers of data infrastructure — from foundation to autonomous intelligence.
            </p>
          </motion.div>

          {/* Pipeline visual */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-1 sm:gap-2 mb-16 overflow-x-auto py-4"
          >
            {pillars.map((p, i) => (
              <div key={p.number} className="flex items-center gap-1 sm:gap-2 shrink-0">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg surface-3 flex items-center justify-center">
                    <p.icon size={16} className="text-primary" />
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] text-muted-foreground/50 text-center max-w-[60px] sm:max-w-[80px] leading-tight">
                    {p.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </div>
                {i < pillars.length - 1 && (
                  <div className="w-4 sm:w-8 h-px bg-border/50 mt-[-12px]" />
                )}
              </div>
            ))}
          </motion.div>

          {/* Service cards */}
          <div className="space-y-4">
            {pillars.map((pillar, i) => (
              <ServiceCard key={pillar.number} pillar={pillar} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServicesPage;
