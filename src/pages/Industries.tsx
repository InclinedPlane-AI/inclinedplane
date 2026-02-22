import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import IndustryDetail from "@/components/IndustryDetail";
import { motion } from "framer-motion";
import { useState } from "react";
import { industries } from "@/data/industries";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
  ArrowRight, Layers, Search, Lightbulb, Rocket, MessageSquare, ArrowUpRight
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
};

const transformationSteps = [
  {
    number: "01",
    icon: Search,
    title: "Discovery & Assessment",
    description: "We begin with a deep-dive into your current data landscape — sources, quality, gaps, and maturity. No generic audits. We map your specific workflows, pain points, and opportunities to build a prioritized roadmap tailored to your business goals.",
    detail: "Typical duration: 2–3 weeks",
  },
  {
    number: "02",
    icon: Lightbulb,
    title: "Strategy & Architecture",
    description: "Based on the assessment, we co-design a data and AI strategy with your leadership. This includes selecting the right technology stack, defining governance frameworks, and aligning every initiative to measurable business outcomes.",
    detail: "Deliverable: Strategic roadmap & architecture blueprint",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Proof of Value",
    description: "We pick the highest-impact use case and build a working prototype in 4–6 weeks. This isn't a slide deck — it's a deployed, functional solution demonstrating real ROI on your own data, so stakeholders can see the transformation in action.",
    detail: "Timeline: 4–6 weeks to first results",
  },
  {
    number: "04",
    icon: MessageSquare,
    title: "Let's Talk",
    description: "Ready to explore what data and AI can do for your organization? Book a no-obligation strategy session with our domain experts. We'll discuss your challenges, ambitions, and the fastest path to measurable impact.",
    detail: "30-minute call · No commitment",
    isCTA: true,
  },
];

const Industries = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const activeIndustry = industries.find((i) => i.id === selected) ?? null;

  return (
    <PageLayout>
      <PageHero
        label="Industries"
        title={<>Built for <span className="text-gradient-orange">Your Domain.</span></>}
        subtitle="Deep vertical expertise meets world-class data engineering. We don't just understand your data — we understand your business."
      />

      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Industry Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-[2]">
            {industries.map((ind, i) => {
              const Icon = iconMap[ind.icon] || Layers;
              return (
                <motion.button
                  key={ind.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => setSelected(ind.id)}
                  data-cursor-hover
                  className="group relative rounded-xl overflow-hidden text-left transition-all hover:scale-[1.02]"
                  style={{
                    background: "hsl(var(--card))",
                    isolation: "isolate",
                    border: "1px solid hsl(25 100% 50% / 0.15)",
                    boxShadow: "0 8px 32px -8px hsl(25 100% 50% / 0.12), 0 2px 8px hsl(25 100% 50% / 0.08), inset 0 1px 0 hsl(25 100% 80% / 0.08)",
                  }}
                >
                  {/* Subtle orange glow at top */}
                  <div
                    className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]"
                    style={{
                      background: "radial-gradient(ellipse at 50% 0%, hsl(25 100% 50%), transparent 60%)",
                    }}
                  />

                  {/* Image */}
                  <div className="relative h-40 overflow-hidden z-[1]">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div
                      className="absolute top-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center glass-panel"
                      style={{ borderColor: `hsl(${ind.color} / 0.3)` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: `hsl(${ind.color})` }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 relative z-[1]">
                    <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                      {ind.tagline}
                    </p>

                    {/* Quick stats preview */}
                    <div className="flex items-center gap-4 mb-3">
                      {ind.impactMetrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="text-sm font-bold text-gradient-orange">{m.value}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Use case pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {ind.useCases.slice(0, 3).map((uc) => (
                        <span key={uc.title} className="px-2 py-0.5 rounded-full text-[10px] surface-2 text-secondary-foreground border border-border/30">
                          {uc.title}
                        </span>
                      ))}
                      {ind.useCases.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] text-muted-foreground">
                          +{ind.useCases.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Transformation Journey Section */}
          <div className="mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase surface-2 text-primary border border-primary/20 mb-6">
                Your Transformation Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Transform? <span className="text-gradient-orange">Here's How We Start.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                No matter your industry, the path to data-driven excellence follows a proven framework.
                We meet you where you are and accelerate you to where you need to be.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting line */}
              <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden sm:block" />

              <div className="space-y-8 lg:space-y-12">
                {transformationSteps.map((step, i) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`relative flex flex-col lg:flex-row items-start gap-6 ${
                      i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Step number circle */}
                    <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 hidden sm:flex">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold z-10 ${
                        step.isCTA
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                          : "surface-2 text-foreground border border-border/50"
                      }`}>
                        {step.number}
                      </div>
                    </div>

                    {/* Spacer for alternating layout */}
                    <div className="hidden lg:block lg:w-1/2" />

                    {/* Content card */}
                    <div className={`w-full lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12" : "lg:pl-12"} sm:pl-20 lg:pl-0`}>
                      <div
                        onClick={step.isCTA ? () => navigate("/contact") : undefined}
                        className={`rounded-2xl p-6 sm:p-8 transition-all ${
                          step.isCTA
                            ? "cursor-pointer border-2 border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 hover:scale-[1.02]"
                            : "glass-panel"
                        }`}
                        data-cursor-hover={step.isCTA || undefined}
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            step.isCTA ? "bg-primary/10" : "surface-2"
                          }`}>
                            <step.icon className={`w-5 h-5 ${step.isCTA ? "text-primary" : "text-foreground"}`} />
                          </div>
                          <div className="flex-1">
                            <span className="text-xs font-mono text-primary sm:hidden">
                              {step.number}
                            </span>
                            <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                              {step.description}
                            </p>
                            <p className={`text-xs font-medium ${step.isCTA ? "text-primary" : "text-muted-foreground/70"}`}>
                              {step.detail}
                            </p>
                            {step.isCTA && (
                              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                                Book a Strategy Session <ArrowUpRight className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <IndustryDetail
        industry={activeIndustry}
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </PageLayout>
  );
};

export default Industries;
