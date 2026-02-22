import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";

const Thesis = () => {
  return (
    <PageLayout>
      <PageHero
        label="Our Thesis"
        title={<>Data Is Infrastructure.{" "}<span className="text-gradient-orange">Intelligence Is Product.</span></>}
      />

      <div className="pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-16">
            {[
              {
                title: "The Old Model Is Broken",
                body: "Most organizations still treat data as a reporting function — static dashboards, monthly cadences, reactive analytics. This was adequate when markets moved slowly. It is catastrophically inadequate in the age of AI.",
              },
              {
                title: "Data as a Living System",
                body: "We believe data infrastructure should behave like a product: versioned, observable, tested, and continuously deployed. Every pipeline is a production system. Every model is a service. Every insight must be operationalized.",
              },
              {
                title: "Observability Is Non-Negotiable",
                body: "You cannot optimize what you cannot observe. We build data systems with observability as a first-class citizen — not an afterthought. Data quality gates, lineage tracking, anomaly detection, and automated incident response are embedded from day one.",
              },
              {
                title: "From Prediction to Autonomous Decision",
                body: "The final leap is from predictive models to decision systems. AI agents that can act on data, trigger workflows, adjust parameters, and learn from outcomes. This is where the real competitive advantage lives.",
              },
            ].map(({ title, body }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl font-bold text-foreground mb-4">{title}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Thesis;
