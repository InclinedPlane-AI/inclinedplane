import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";

const About = () => {
  return (
    <PageLayout>
      <PageHero
        label="About Us"
        title={<>Built by Engineers.{" "}<span className="text-gradient-orange">Driven by Outcomes.</span></>}
      />

      <div className="pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="space-y-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                Inclined Plane was born from a simple observation: the gap between data investment and data impact is widening. Organizations pour resources into tools, platforms, and dashboards — but the needle rarely moves.
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                We started as Sail Analytics, focused on BI and reporting. As we worked with more organizations, we saw the same pattern: the bottleneck wasn't visualization — it was architecture, automation, and the absence of observability. So we evolved. We became Inclined Plane.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold text-foreground mb-4">Engineering Philosophy</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { title: "Observability First", desc: "If you can't see it, you can't fix it. Every system we build has monitoring from day one." },
                  { title: "Production Mindset", desc: "Every pipeline is a production system. We test, version, monitor, and deploy with engineering rigor." },
                  { title: "Outcome-Driven", desc: "We measure success in business impact, not pipeline count. Revenue, efficiency, accuracy — not vanity metrics." },
                  { title: "AI-Ready by Default", desc: "Every platform we build is designed to support ML workloads, feature stores, and decision automation." },
                ].map(({ title, desc }) => (
                  <div key={title} className="glass-panel rounded-xl p-6">
                    <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default About;
