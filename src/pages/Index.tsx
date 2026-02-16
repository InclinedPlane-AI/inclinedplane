import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SlideProgress from "@/components/SlideProgress";
import AuroraBackground from "@/components/AuroraBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link } from "react-router-dom";
import { ArrowRight, Database, BarChart3, Eye, Brain, Zap, Cloud } from "lucide-react";

const SLIDE_COUNT = 7;

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToSlide = useCallback((index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const sections = container.querySelectorAll(".snap-section");
    sections[index]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const vh = window.innerHeight;
      const index = Math.round(scrollTop / vh);
      setCurrentSlide(Math.min(index, SLIDE_COUNT - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentSlide < SLIDE_COUNT - 1) {
        scrollToSlide(currentSlide + 1);
      } else if (e.key === "ArrowUp" && currentSlide > 0) {
        scrollToSlide(currentSlide - 1);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentSlide, scrollToSlide]);

  return (
    <div className="bg-background">
      <CustomCursor />
      <Navbar />
      <SlideProgress total={SLIDE_COUNT} current={currentSlide} onDotClick={scrollToSlide} />

      <div ref={containerRef} className="snap-container scrollbar-hide">
        {/* SLIDE 1 — HERO */}
        <section className="snap-section flex items-center relative overflow-hidden">
          <AuroraBackground />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="font-mono text-xs text-primary tracking-widest uppercase mb-6">
                    AI-Native Data Engineering
                  </p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.08] tracking-tight mb-6">
                    Engineering Momentum for the{" "}
                    <span className="text-gradient-orange">Intelligence Era.</span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
                    AI-ready data platforms, observability-first pipelines, and decision systems that turn complexity into operational intelligence.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link
                      to="/contact"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-7 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange"
                    >
                      Start a Build <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/case-studies"
                      data-cursor-hover
                      className="inline-flex items-center gap-2 glass-panel px-7 py-3 rounded-lg font-medium text-foreground hover:bg-muted/20 transition-colors"
                    >
                      View Case Studies
                    </Link>
                  </div>
                </motion.div>
                {/* Trust strip */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="mt-12 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground"
                >
                  {["AWS", "Azure", "Snowflake", "Databricks", "dbt", "n8n"].map((t) => (
                    <span key={t} className="opacity-50 hover:opacity-100 transition-opacity">
                      {t}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Hero Visual - Orbital */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="hidden lg:flex items-center justify-center"
              >
                <div className="relative w-80 h-80">
                  {/* Central orb */}
                  <div className="absolute inset-[30%] rounded-full bg-gradient-orange opacity-20 blur-2xl animate-pulse-glow" />
                  <div className="absolute inset-[35%] rounded-full glass-panel-strong flex items-center justify-center">
                    <Brain className="text-primary" size={28} />
                  </div>
                  {/* Orbital rings */}
                  {[
                    { label: "Ingest", icon: Database, angle: 0, delay: 0 },
                    { label: "Model", icon: Cloud, angle: 72, delay: 0.5 },
                    { label: "Observe", icon: Eye, angle: 144, delay: 1 },
                    { label: "Predict", icon: BarChart3, angle: 216, delay: 1.5 },
                    { label: "Automate", icon: Zap, angle: 288, delay: 2 },
                  ].map(({ label, icon: Icon, angle, delay }) => {
                    const r = 130;
                    const rad = (angle * Math.PI) / 180;
                    const x = Math.cos(rad) * r;
                    const y = Math.sin(rad) * r;
                    return (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + delay * 0.2, duration: 0.5 }}
                        className="absolute glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-xs group hover:glass-panel-strong transition-all"
                        style={{
                          left: `calc(50% + ${x}px - 45px)`,
                          top: `calc(50% + ${y}px - 16px)`,
                        }}
                        data-cursor-hover
                      >
                        <Icon size={14} className="text-primary" />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">
                          {label}
                        </span>
                      </motion.div>
                    );
                  })}
                  {/* Ring borders */}
                  <div className="absolute inset-[15%] rounded-full border border-muted/20" />
                  <div className="absolute inset-[5%] rounded-full border border-muted/10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SLIDE 2 — THE PROBLEM */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SlideReveal>
                  <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
                    The Problem
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                    Dashboards Are Not{" "}
                    <span className="text-gradient-orange">Competitive Advantage.</span>
                  </h2>
                </SlideReveal>
                <SlideReveal delay={0.2}>
                  <div className="space-y-3 font-mono text-sm">
                    {[
                      "[WARN] Pipeline failed: stale data — 47min lag",
                      "[ERR]  Model drift detected — no retraining trigger",
                      "[WARN] Dashboard refresh: manual, weekly cadence",
                      "[ERR]  No observability — blind spot in pipeline health",
                      "[INFO] Business asking: 'Can we predict demand?'",
                    ].map((log, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.15 }}
                        viewport={{ once: true }}
                        className={`px-4 py-2 rounded surface-2 ${
                          log.includes("[ERR]")
                            ? "text-destructive/80 border-l-2 border-destructive/50"
                            : log.includes("[WARN]")
                            ? "text-orange-300 border-l-2 border-orange-500/30"
                            : "text-muted-foreground"
                        }`}
                      >
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </SlideReveal>
              </div>
              <SlideReveal delay={0.3}>
                <div className="glass-panel rounded-2xl p-8">
                  <p className="text-sm text-muted-foreground mb-4">Pipeline Health Score</p>
                  <div className="space-y-4">
                    {[
                      { label: "Data Freshness", value: 34 },
                      { label: "Pipeline Reliability", value: 52 },
                      { label: "Model Accuracy", value: 41 },
                      { label: "Observability Coverage", value: 18 },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-secondary-foreground">{label}</span>
                          <span className="text-destructive/80 font-mono">{value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full surface-3">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${value}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true }}
                            className="h-full rounded-full bg-destructive/60"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideReveal>
            </div>
          </div>
        </section>

        {/* SLIDE 3 — THE SHIFT */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                The Shift
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-16 text-center">
                From Reporting to{" "}
                <span className="text-gradient-orange">Decision Intelligence.</span>
              </h2>
            </SlideReveal>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
              {[
                { stage: "Reporting", desc: "Static dashboards" },
                { stage: "Monitoring", desc: "Alerts & thresholds" },
                { stage: "Prediction", desc: "ML-driven forecasts" },
                { stage: "Automation", desc: "Event-driven pipelines" },
                { stage: "AI Decisions", desc: "Autonomous systems" },
              ].map(({ stage, desc }, i) => (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 md:gap-0"
                >
                  <div
                    className={`glass-panel rounded-xl px-6 py-5 text-center min-w-[160px] transition-all ${
                      i === 4 ? "glow-orange border-primary/30" : ""
                    }`}
                  >
                    <p
                      className={`font-semibold text-sm mb-1 ${
                        i === 4 ? "text-gradient-orange" : "text-foreground"
                      }`}
                    >
                      {stage}
                    </p>
                    <p className="text-xs text-muted-foreground">{desc}</p>
                  </div>
                  {i < 4 && (
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground/40 mx-2 hidden md:block"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 4 — SERVICES */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                What We Build
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
                End-to-End <span className="text-gradient-orange">Data Systems.</span>
              </h2>
            </SlideReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Database, title: "Data Platform Engineering", desc: "Modern lakehouse and warehouse architectures built for scale, governance, and AI readiness." },
                { icon: Cloud, title: "Cloud Warehouse Architecture", desc: "Snowflake, BigQuery, Redshift — optimized for cost, performance, and multi-cloud." },
                { icon: BarChart3, title: "BI Modernization", desc: "From legacy reports to real-time embedded analytics and self-serve intelligence." },
                { icon: Eye, title: "DataOps & Observability", desc: "Pipeline monitoring, data quality gates, lineage tracking, and automated incident response." },
                { icon: Brain, title: "Forecasting Systems", desc: "Demand planning, inventory optimization, and predictive models with production-grade MLOps." },
                { icon: Zap, title: "AI Automation Workflows", desc: "n8n, LangChain, and custom agents — orchestrating decisions from data to action." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-xl p-6 tilt-card group"
                  data-cursor-hover
                >
                  <div className="w-10 h-10 rounded-lg surface-3 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 5 — OUTCOMES */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                Outcomes & Proof
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-16 text-center">
                Numbers That <span className="text-gradient-orange">Move.</span>
              </h2>
            </SlideReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: 24, suffix: "%", label: "Stock-Out Reduction" },
                { value: 15, suffix: "%", label: "Sales Efficiency Lift" },
                { value: 98, suffix: "%+", label: "Predictive Accuracy" },
                { value: 17, suffix: "%", label: "Inventory Value Reduction" },
              ].map(({ value, suffix, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-xl p-8 text-center"
                >
                  <p className="text-4xl lg:text-5xl font-bold mb-3">
                    <AnimatedCounter end={value} suffix={suffix} />
                  </p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 6 — CASE STUDIES PREVIEW */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                Our Work
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
                Case <span className="text-gradient-orange">Studies.</span>
              </h2>
            </SlideReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Demand Forecasting Engine", industry: "Retail & CPG", result: "24% stock-out reduction" },
                { title: "Real-Time Sales Intelligence", industry: "B2B SaaS", result: "15% pipeline efficiency lift" },
                { title: "Observability-First Data Platform", industry: "Financial Services", result: "98%+ data freshness SLA" },
              ].map(({ title, industry, result }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-xl p-6 group tilt-card"
                  data-cursor-hover
                >
                  <p className="font-mono text-xs text-primary mb-3">{industry}</p>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{result}</p>
                  <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                to="/case-studies"
                data-cursor-hover
                className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted/20 transition-colors"
              >
                View All Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* SLIDE 7 — FINAL CTA */}
        <section className="snap-section flex items-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.08] animate-aurora-2 blur-[100px] bg-gradient-orange top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <SlideReveal>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Build Systems That{" "}
                <span className="text-gradient-orange">Move.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                If you're serious about AI-ready architecture and operational intelligence, let's build.
              </p>
              <Link
                to="/contact"
                data-cursor-hover
                className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity glow-orange-strong"
              >
                Start the Conversation <ArrowRight size={18} />
              </Link>
            </SlideReveal>
          </div>
        </section>

        {/* Footer as final section */}
        <div className="snap-section flex flex-col justify-end">
          <div className="flex-1" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

// Simple reveal wrapper
const SlideReveal = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
  >
    {children}
  </motion.div>
);

export default Index;
