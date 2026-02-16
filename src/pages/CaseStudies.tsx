import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cases = [
  { title: "Demand Forecasting Engine", industry: "Retail & CPG", challenge: "Chronic stock-outs and overstock costing millions annually.", approach: "Built an ML-driven demand forecasting platform with automated retraining and real-time inventory signals.", impact: "24% stock-out reduction, 17% inventory value reduction.", stack: "Snowflake, dbt, Python, Airflow, Looker" },
  { title: "Real-Time Sales Intelligence", industry: "B2B SaaS", challenge: "Sales teams relying on stale CRM data and gut instinct.", approach: "Built a real-time pipeline aggregating product usage, CRM, and engagement data into a unified scoring model.", impact: "15% pipeline efficiency lift, 3x faster lead response.", stack: "BigQuery, Fivetran, dbt, Metabase, n8n" },
  { title: "Observability-First Data Platform", industry: "Financial Services", challenge: "No visibility into data pipeline health. Failures discovered hours later by downstream consumers.", approach: "Implemented end-to-end observability with data quality gates, lineage, and automated alerting.", impact: "98%+ data freshness SLA, 60% reduction in incident resolution time.", stack: "Databricks, Great Expectations, Monte Carlo, PagerDuty" },
];

const CaseStudies = () => {
  return (
    <PageLayout>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Case Studies</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Proof in <span className="text-gradient-orange">Production.</span>
            </h1>
          </motion.div>

          <div className="space-y-8">
            {cases.map(({ title, industry, challenge, approach, impact, stack }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel rounded-xl p-8"
              >
                <p className="font-mono text-xs text-primary mb-3">{industry}</p>
                <h2 className="text-2xl font-bold text-foreground mb-6">{title}</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Challenge</h3>
                    <p className="text-sm text-muted-foreground mb-4">{challenge}</p>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Approach</h3>
                    <p className="text-sm text-muted-foreground">{approach}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Impact</h3>
                    <p className="text-sm text-gradient-orange font-semibold mb-4">{impact}</p>
                    <h3 className="text-sm font-semibold text-foreground mb-2">Stack</h3>
                    <p className="text-sm text-muted-foreground font-mono">{stack}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default CaseStudies;
