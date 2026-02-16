import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { Database, Cloud, BarChart3, Eye, Brain, Zap } from "lucide-react";

const services = [
  { icon: Database, title: "Data Platform Engineering", desc: "Modern lakehouse and warehouse architectures built for scale, governance, and AI readiness. We design and implement platforms on Snowflake, Databricks, BigQuery, and Redshift — optimized for your workload patterns.", details: "Schema design • Data modeling • Ingestion pipelines • Governance frameworks • Cost optimization" },
  { icon: Cloud, title: "Cloud Warehouse Architecture", desc: "Multi-cloud warehouse strategies that balance performance, cost, and flexibility. From initial architecture through migration and ongoing optimization.", details: "Cloud migration • Multi-cloud strategy • Performance tuning • Cost management • Security" },
  { icon: BarChart3, title: "BI Modernization", desc: "Transform legacy reporting into real-time, embedded analytics. Self-serve intelligence platforms that put data in the hands of decision-makers.", details: "Dashboard modernization • Embedded analytics • Semantic layers • Self-serve BI • Real-time reporting" },
  { icon: Eye, title: "DataOps & Observability", desc: "Pipeline monitoring, data quality gates, lineage tracking, and automated incident response. Observability as a first-class citizen, not an afterthought.", details: "Pipeline monitoring • Data quality • Lineage tracking • Anomaly detection • Incident response" },
  { icon: Brain, title: "Forecasting Systems", desc: "Demand planning, inventory optimization, and predictive models with production-grade MLOps. From experimentation to deployed, monitored prediction services.", details: "Demand forecasting • Inventory optimization • MLOps • Model monitoring • A/B testing" },
  { icon: Zap, title: "AI Automation Workflows", desc: "n8n, LangChain, and custom AI agents — orchestrating decisions from data to action. Automated workflows that learn and adapt.", details: "AI agents • Workflow orchestration • LangChain • n8n • Custom automation" },
];

const ServicesPage = () => {
  return (
    <PageLayout>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Services</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              What We <span className="text-gradient-orange">Build.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              End-to-end data systems engineered for AI readiness, operational intelligence, and continuous delivery.
            </p>
          </motion.div>

          <div className="space-y-6">
            {services.map(({ icon: Icon, title, desc, details }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel rounded-xl p-8 group hover:glow-orange transition-all"
                data-cursor-hover
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  <div className="w-12 h-12 rounded-lg surface-3 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground mb-3">{title}</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">{desc}</p>
                    <p className="font-mono text-xs text-muted-foreground/60">{details}</p>
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

export default ServicesPage;
