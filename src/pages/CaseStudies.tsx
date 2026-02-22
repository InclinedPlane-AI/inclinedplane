import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ArrowRight, Database, BarChart3, Eye, TrendingUp, CheckCircle2, Layers } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link } from "react-router-dom";

const cases = [
  {
    title: "Demand Forecasting Engine",
    industry: "Retail & CPG",
    challenge: "Chronic stock-outs and overstock costing millions annually. No automated demand signals. Manual spreadsheet-based planning cycles.",
    approach: "Built an ML-driven demand forecasting platform with automated retraining, real-time inventory signals, and POS data integration across 200+ stores.",
    impact: "24% stock-out reduction, 17% inventory value reduction.",
    stack: "Snowflake, dbt, Python, Airflow, Looker",
    metrics: [
      { value: 24, suffix: "%", label: "Stock-out reduction" },
      { value: 17, suffix: "%", label: "Inventory value reduction" },
      { value: 200, suffix: "+", label: "Stores integrated" },
    ],
    icon: Database,
    featured: true,
  },
  {
    title: "Real-Time Sales Intelligence",
    industry: "B2B SaaS",
    challenge: "Sales teams relying on stale CRM data and gut instinct. No visibility into product usage patterns or engagement signals.",
    approach: "Built a real-time pipeline aggregating product usage, CRM, and engagement data into a unified scoring model with automated alerts.",
    impact: "15% pipeline efficiency lift, 3x faster lead response.",
    stack: "BigQuery, Fivetran, dbt, Metabase, n8n",
    metrics: [
      { value: 15, suffix: "%", label: "Pipeline efficiency lift" },
      { value: 3, suffix: "x", label: "Faster lead response" },
      { value: 50, suffix: "K+", label: "Leads scored daily" },
    ],
    icon: BarChart3,
    featured: true,
  },
  {
    title: "Observability-First Data Platform",
    industry: "Financial Services",
    challenge: "No visibility into data pipeline health. Failures discovered hours later by downstream consumers. Regulatory risk from stale data.",
    approach: "Implemented end-to-end observability with data quality gates, lineage tracking, automated alerting, and compliance monitoring.",
    impact: "98%+ data freshness SLA, 60% reduction in incident resolution time.",
    stack: "Databricks, Great Expectations, Monte Carlo, PagerDuty",
    metrics: [
      { value: 98, suffix: "%+", label: "Data freshness SLA" },
      { value: 60, suffix: "%", label: "Faster incidents" },
      { value: 400, suffix: "+", label: "Tables monitored" },
    ],
    icon: Eye,
    featured: true,
  },
  {
    title: "Supply Chain Intelligence Hub",
    industry: "Manufacturing",
    challenge: "Fragmented data across ERP, WMS, and logistics systems. No unified view of supply chain performance or predictive capabilities.",
    approach: "Unified 12+ data sources into a cloud-native warehouse with real-time dashboards, anomaly detection, and supplier risk scoring.",
    impact: "30% reduction in lead time variability, $4M annual savings.",
    stack: "Snowflake, Fivetran, dbt, Sigma, Python",
    metrics: [
      { value: 30, suffix: "%", label: "Lead time improvement" },
      { value: 4, suffix: "M", label: "Annual savings", prefix: "$" },
      { value: 12, suffix: "+", label: "Sources unified" },
    ],
    icon: Layers,
    featured: false,
  },
  {
    title: "Customer Churn Prediction System",
    industry: "Telecom",
    challenge: "High churn rates with no early warning system. Retention campaigns were reactive and untargeted, wasting marketing spend.",
    approach: "Deployed a churn prediction model with feature engineering from usage, billing, and support data. Integrated with campaign automation.",
    impact: "22% churn reduction, 35% improvement in retention campaign ROI.",
    stack: "BigQuery, Vertex AI, dbt, Looker, n8n",
    metrics: [
      { value: 22, suffix: "%", label: "Churn reduction" },
      { value: 35, suffix: "%", label: "Better campaign ROI" },
      { value: 2, suffix: "M+", label: "Customers scored" },
    ],
    icon: TrendingUp,
    featured: false,
  },
];

const CaseStudies = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Case Studies"
        description="Real-world results from AI-native data engineering. Demand forecasting, pipeline automation, executive dashboards, and churn prediction case studies."
        path="/case-studies"
      />
      <PageHero
        label="Case Studies"
        title={<>Proof in <span className="text-gradient-orange">Production.</span></>}
        subtitle="Real outcomes from production deployments. Not proofs of concept — production systems that move the needle."
      />
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Aggregate stats strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { value: "5+", label: "Production Deployments" },
              { value: "98%+", label: "Average SLA Achievement" },
              { value: "$10M+", label: "Client Value Created" },
              { value: "4", label: "Industries Served" },
            ].map(({ value, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-panel rounded-xl px-5 py-6 text-center">
                <p className="text-2xl font-bold text-gradient-orange text-glow-orange mb-1">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Featured cases — bento grid */}
          <div className="mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-8">Featured Work</motion.p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {cases.filter(c => c.featured).map(({ title, industry, challenge, approach, impact, stack, metrics, icon: Icon }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`glass-panel rounded-2xl p-8 group hover:glow-orange transition-all ${i === 0 ? "md:col-span-2" : ""}`}>
                  <div className={`${i === 0 ? "grid md:grid-cols-2 gap-8" : ""}`}>
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-lg surface-3 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Icon size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-primary uppercase">{industry}</p>
                          <h2 className="text-xl font-bold text-foreground">{title}</h2>
                        </div>
                      </div>
                      <div className="space-y-4 mb-6">
                        <div>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Challenge</h3>
                          <p className="text-sm text-secondary-foreground leading-relaxed">{challenge}</p>
                        </div>
                        <div>
                          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5">Approach</h3>
                          <p className="text-sm text-secondary-foreground leading-relaxed">{approach}</p>
                        </div>
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground/60">{stack}</p>
                    </div>
                    <div className={`${i === 0 ? "flex flex-col justify-center" : "mt-6"}`}>
                      <div className="grid grid-cols-3 gap-3">
                        {metrics.map(({ value, suffix, label, prefix }, j) => (
                          <motion.div key={label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 + j * 0.1 }} viewport={{ once: true }}
                            className="surface-2 rounded-xl p-4 text-center">
                            <p className="text-2xl font-bold text-gradient-orange text-glow-orange mb-1">
                              <AnimatedCounter end={value} suffix={suffix} prefix={prefix || ""} />
                            </p>
                            <p className="text-[10px] text-muted-foreground">{label}</p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="mt-4 surface-2 rounded-lg p-4">
                        <p className="text-sm font-semibold text-gradient-orange mb-1">Impact</p>
                        <p className="text-sm text-secondary-foreground">{impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* More case studies */}
          <div className="mb-20">
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="font-mono text-xs text-primary tracking-widest uppercase mb-8">More Work</motion.p>
            <div className="grid md:grid-cols-2 gap-6">
              {cases.filter(c => !c.featured).map(({ title, industry, challenge, impact, stack, metrics, icon: Icon }, i) => (
                <motion.div key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-xl p-7 group hover:glow-orange transition-all">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-9 h-9 rounded-lg surface-3 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-primary uppercase">{industry}</p>
                      <h2 className="text-lg font-bold text-foreground">{title}</h2>
                    </div>
                  </div>
                  <p className="text-sm text-secondary-foreground mb-4 leading-relaxed">{challenge}</p>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {metrics.map(({ value, suffix, label, prefix }) => (
                      <div key={label} className="surface-2 rounded-lg p-3 text-center">
                        <p className="text-lg font-bold text-gradient-orange mb-0.5">
                          <AnimatedCounter end={value} suffix={suffix} prefix={prefix || ""} />
                        </p>
                        <p className="text-[9px] text-muted-foreground">{label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[10px] text-muted-foreground/60">{stack}</p>
                    <span className="text-xs text-primary flex items-center gap-1">
                      <CheckCircle2 size={10} /> In Production
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-panel rounded-2xl p-10 text-center glow-orange">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Build Your <span className="text-gradient-orange">Success Story?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Let's discuss how we can engineer the same level of impact for your data infrastructure.
            </p>
            <Link to="/contact" data-cursor-hover
              className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange">
              Start a Conversation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CaseStudies;
