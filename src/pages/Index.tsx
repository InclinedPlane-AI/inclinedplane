import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SlideProgress from "@/components/SlideProgress";
import AuroraBackground from "@/components/AuroraBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link } from "react-router-dom";
import {
  ArrowRight, Database, BarChart3, Eye, Brain, Zap, Cloud,
  TrendingUp, Shield, Clock, Globe, Cpu, Layers, Activity,
  CheckCircle2, Quote, Sparkles, Target, Rocket
} from "lucide-react";

const SLIDE_COUNT = 11;

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
      if (e.key === "ArrowDown" && currentSlide < SLIDE_COUNT - 1) scrollToSlide(currentSlide + 1);
      else if (e.key === "ArrowUp" && currentSlide > 0) scrollToSlide(currentSlide - 1);
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
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
                  <p className="font-mono text-xs text-primary tracking-widest uppercase mb-6">AI-Native Data Engineering</p>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.08] tracking-tight mb-6">
                    Engineering Momentum for the{" "}
                    <span className="text-gradient-orange">Intelligence Era.</span>
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-8">
                    AI-ready data platforms, observability-first pipelines, and decision systems that turn complexity into operational intelligence.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/contact" data-cursor-hover className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-7 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange">
                      Start a Build <ArrowRight size={16} />
                    </Link>
                    <Link to="/case-studies" data-cursor-hover className="inline-flex items-center gap-2 glass-panel px-7 py-3 rounded-lg font-medium text-foreground hover:bg-muted/20 transition-colors">
                      View Case Studies
                    </Link>
                  </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="mt-12 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground">
                  {["AWS", "Azure", "Snowflake", "Databricks", "dbt", "n8n"].map((t) => (
                    <span key={t} className="opacity-50 hover:opacity-100 transition-opacity">{t}</span>
                  ))}
                </motion.div>
              </div>
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 1 }} className="hidden lg:flex items-center justify-center">
                <div className="relative w-80 h-80">
                  <div className="absolute inset-[30%] rounded-full bg-gradient-orange opacity-20 blur-2xl animate-pulse-glow" />
                  <div className="absolute inset-[35%] rounded-full glass-panel-strong flex items-center justify-center">
                    <Brain className="text-primary" size={28} />
                  </div>
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
                      <motion.div key={label} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 + delay * 0.2, duration: 0.5 }}
                        className="absolute glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-xs group hover:glass-panel-strong transition-all"
                        style={{ left: `calc(50% + ${x}px - 45px)`, top: `calc(50% + ${y}px - 16px)` }} data-cursor-hover>
                        <Icon size={14} className="text-primary" />
                        <span className="text-secondary-foreground group-hover:text-foreground transition-colors">{label}</span>
                      </motion.div>
                    );
                  })}
                  <div className="absolute inset-[15%] rounded-full border border-muted/20" />
                  <div className="absolute inset-[5%] rounded-full border border-muted/10" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SLIDE 2 — AI TRANSFORMATION FACTS */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">The AI Imperative</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 text-center">
                AI Is Rewriting the <span className="text-gradient-orange">Rules.</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
                Companies that fail to build AI-ready infrastructure today will be irrelevant tomorrow. The data speaks for itself.
              </p>
            </SlideReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                { stat: "$15.7T", label: "Projected AI contribution to global GDP by 2030", icon: Globe, source: "PwC" },
                { stat: "77%", label: "Of enterprises say AI is critical to their business strategy", icon: Target, source: "McKinsey" },
                { stat: "10x", label: "Faster time-to-insight with modern data platforms", icon: Rocket, source: "Gartner" },
                { stat: "40%", label: "Of data leaders cite quality as their #1 blocker to AI", icon: Shield, source: "Deloitte" },
                { stat: "3.5x", label: "Higher ROI for companies with mature data operations", icon: TrendingUp, source: "Forrester" },
                { stat: "68%", label: "Of AI projects fail due to poor data infrastructure", icon: Activity, source: "Gartner" },
              ].map(({ stat, label, icon: Icon, source }, i) => (
                <motion.div key={stat} initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}
                  className="glass-panel rounded-xl p-6 group hover:glow-orange transition-all tilt-card" data-cursor-hover>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg surface-3 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <span className="font-mono text-[10px] text-muted-foreground/50 uppercase">{source}</span>
                  </div>
                  <p className="text-3xl font-bold text-gradient-orange text-glow-orange mb-2">{stat}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 3 — THE PROBLEM */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <SlideReveal>
                  <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">The Problem</p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-8">
                    Dashboards Are Not{" "}<span className="text-gradient-orange">Competitive Advantage.</span>
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
                      "[ERR]  68% of AI projects fail from bad data infra",
                    ].map((log, i) => (
                      <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.12 }} viewport={{ once: true }}
                        className={`px-4 py-2 rounded surface-2 ${log.includes("[ERR]") ? "text-destructive/80 border-l-2 border-destructive/50" : log.includes("[WARN]") ? "text-orange-300 border-l-2 border-orange-500/30" : "text-muted-foreground"}`}>
                        {log}
                      </motion.div>
                    ))}
                  </div>
                </SlideReveal>
              </div>
              <SlideReveal delay={0.3}>
                <div className="glass-panel rounded-2xl p-8">
                  <p className="text-sm text-muted-foreground mb-6">Pipeline Health Score</p>
                  <div className="space-y-5">
                    {[
                      { label: "Data Freshness", value: 34, color: "bg-destructive/60" },
                      { label: "Pipeline Reliability", value: 52, color: "bg-destructive/60" },
                      { label: "Model Accuracy", value: 41, color: "bg-destructive/60" },
                      { label: "Observability Coverage", value: 18, color: "bg-destructive/60" },
                      { label: "AI Readiness", value: 12, color: "bg-destructive/80" },
                    ].map(({ label, value, color }) => (
                      <div key={label}>
                        <div className="flex justify-between text-sm mb-1.5">
                          <span className="text-secondary-foreground">{label}</span>
                          <span className="text-destructive/80 font-mono">{value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full surface-3">
                          <motion.div initial={{ width: 0 }} whileInView={{ width: `${value}%` }}
                            transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}
                            className={`h-full rounded-full ${color}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-xs text-destructive/70 font-mono flex items-center gap-2">
                      <Activity size={12} /> Overall: Critical — Infrastructure not AI-ready
                    </p>
                  </div>
                </div>
              </SlideReveal>
            </div>
          </div>
        </section>

        {/* SLIDE 4 — THE SHIFT */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">The Shift</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6 text-center">
                From Reporting to{" "}<span className="text-gradient-orange">Decision Intelligence.</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-16">
                The maturity curve from basic reporting to autonomous AI decision systems.
              </p>
            </SlideReveal>
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-0">
              {[
                { stage: "Reporting", desc: "Static dashboards", pct: "20%" },
                { stage: "Monitoring", desc: "Alerts & thresholds", pct: "35%" },
                { stage: "Prediction", desc: "ML-driven forecasts", pct: "55%" },
                { stage: "Automation", desc: "Event-driven pipelines", pct: "75%" },
                { stage: "AI Decisions", desc: "Autonomous systems", pct: "95%" },
              ].map(({ stage, desc, pct }, i) => (
                <motion.div key={stage} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.2 }} viewport={{ once: true }} className="flex items-center gap-2 md:gap-0">
                  <div className={`glass-panel rounded-xl px-6 py-5 text-center min-w-[160px] transition-all relative overflow-hidden ${i === 4 ? "glow-orange border border-primary/30" : ""}`}>
                    <p className={`font-semibold text-sm mb-1 relative z-10 ${i === 4 ? "text-gradient-orange" : "text-foreground"}`}>{stage}</p>
                    <p className="text-xs text-muted-foreground relative z-10">{desc}</p>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-orange opacity-40" style={{ width: pct }} />
                  </div>
                  {i < 4 && <ArrowRight size={16} className="text-muted-foreground/40 mx-2 hidden md:block" />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 5 — SERVICES BENTO GRID */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">What We Build</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
                End-to-End <span className="text-gradient-orange">Data Systems.</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
                From raw data ingestion to autonomous AI workflows — everything your intelligence stack needs.
              </p>
            </SlideReveal>
            {/* Bento grid layout */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[140px] lg:auto-rows-[160px]">
              {[
                { icon: Database, title: "Data Platform Engineering", desc: "Modern lakehouse and warehouse architectures built for scale and AI readiness.", span: "col-span-2 row-span-2" },
                { icon: Cloud, title: "Cloud Warehouse", desc: "Snowflake, BigQuery, Redshift — optimized for performance.", span: "col-span-1 row-span-1" },
                { icon: BarChart3, title: "BI Modernization", desc: "Real-time embedded analytics and self-serve intelligence.", span: "col-span-1 row-span-1" },
                { icon: Eye, title: "DataOps & Observability", desc: "Pipeline monitoring, data quality gates, and automated incident response.", span: "col-span-2 row-span-1" },
                { icon: Brain, title: "Forecasting Systems", desc: "Demand planning and predictive models with production-grade MLOps.", span: "col-span-1 row-span-1" },
                { icon: Zap, title: "AI Automation", desc: "n8n, LangChain, and custom agents orchestrating decisions.", span: "col-span-1 row-span-1" },
              ].map(({ icon: Icon, title, desc, span }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }} viewport={{ once: true }}
                  className={`${span} glass-panel rounded-xl p-5 lg:p-6 group tilt-card flex flex-col justify-between hover:glow-orange transition-all`} data-cursor-hover>
                  <div>
                    <div className="w-9 h-9 rounded-lg surface-3 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-colors">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-1.5">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                  <span className="text-[10px] text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-2">
                    Learn more <ArrowRight size={10} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 6 — OUTCOMES & METRICS */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">Outcomes & Proof</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                Numbers That <span className="text-gradient-orange">Move.</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
                Real results from production deployments across retail, SaaS, and financial services.
              </p>
            </SlideReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {[
                { value: 24, suffix: "%", label: "Stock-Out Reduction", detail: "Retail & CPG" },
                { value: 15, suffix: "%", label: "Sales Efficiency Lift", detail: "B2B SaaS" },
                { value: 98, suffix: "%+", label: "Data Freshness SLA", detail: "Financial Services" },
                { value: 17, suffix: "%", label: "Inventory Value Reduction", detail: "Supply Chain" },
              ].map(({ value, suffix, label, detail }, i) => (
                <motion.div key={label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="glass-panel rounded-xl p-8 text-center group hover:glow-orange transition-all">
                  <p className="text-4xl lg:text-5xl font-bold mb-3">
                    <AnimatedCounter end={value} suffix={suffix} />
                  </p>
                  <p className="text-sm text-foreground font-medium mb-1">{label}</p>
                  <p className="text-xs text-muted-foreground font-mono">{detail}</p>
                </motion.div>
              ))}
            </div>
            {/* Secondary stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { value: "60%", label: "Faster incident resolution" },
                { value: "3x", label: "Faster lead response time" },
                { value: "50+", label: "Production pipelines managed" },
                { value: "<2hr", label: "Average deployment time" },
              ].map(({ value, label }, i) => (
                <motion.div key={label} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }} viewport={{ once: true }}
                  className="surface-2 rounded-lg px-5 py-4 text-center">
                  <p className="text-xl font-bold text-gradient-orange mb-1">{value}</p>
                  <p className="text-[11px] text-muted-foreground">{label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 7 — ARCHITECTURE SNAPSHOT */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">Architecture</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                The Intelligence <span className="text-gradient-orange">Stack.</span>
              </h2>
              <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
                A modern, composable architecture designed for AI-readiness from day one.
              </p>
            </SlideReveal>
            <div className="flex flex-col md:flex-row items-stretch gap-3 justify-center">
              {[
                { icon: Database, title: "Sources", desc: "APIs, Databases, Events, Files", color: "border-muted/30" },
                { icon: Layers, title: "Warehouse", desc: "Snowflake • BigQuery • Databricks", color: "border-muted/30" },
                { icon: Eye, title: "Observability", desc: "Quality • Lineage • Monitoring", color: "border-muted/30" },
                { icon: BarChart3, title: "Intelligence", desc: "Forecasting • ML Models • BI", color: "border-primary/30" },
                { icon: Brain, title: "AI Layer", desc: "LLMs • Agents • Decision Systems", color: "border-primary/40" },
                { icon: Zap, title: "Automation", desc: "Workflows • Actions • Alerts", color: "border-primary/50" },
              ].map(({ icon: Icon, title, desc, color }, i) => (
                <motion.div key={title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.12 }} viewport={{ once: true }}
                  className="flex items-center gap-3">
                  <div className={`glass-panel rounded-xl p-5 flex-1 min-w-[140px] border ${color} group hover:glow-orange transition-all text-center`} data-cursor-hover>
                    <div className="w-10 h-10 rounded-lg surface-3 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <p className="font-semibold text-foreground text-sm mb-1">{title}</p>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                  {i < 5 && <ArrowRight size={14} className="text-muted-foreground/30 shrink-0 hidden md:block" />}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 8 — TESTIMONIALS */}
        <section className="snap-section flex items-center relative overflow-hidden">
          <div className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] animate-aurora-1 blur-[100px] bg-gradient-orange top-1/4 -left-40" />
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">What Leaders Say</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-14 text-center">
                Trusted by <span className="text-gradient-orange">Decision Makers.</span>
              </h2>
            </SlideReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  quote: "Inclined Plane didn't just build us a data platform — they built the foundation for our entire AI strategy. Our forecasting accuracy went from guesswork to 98%.",
                  name: "Sarah Chen",
                  title: "VP of Data, Retail Co.",
                  metric: "98% forecast accuracy",
                },
                {
                  quote: "Within 6 weeks, our sales team had real-time intelligence that previously took analysts days to compile. Pipeline velocity increased 3x.",
                  name: "Marcus Williams",
                  title: "CRO, B2B SaaS Platform",
                  metric: "3x pipeline velocity",
                },
                {
                  quote: "The observability layer they implemented caught a critical data quality issue that would have cost us $2M in bad decisions. It paid for itself day one.",
                  name: "Dr. Priya Sharma",
                  title: "Chief Data Officer, FinServ",
                  metric: "$2M+ saved",
                },
              ].map(({ quote, name, title, metric }, i) => (
                <motion.div key={name} initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: i * 0.15, duration: 0.6 }} viewport={{ once: true }}
                  className="glass-panel rounded-xl p-7 flex flex-col justify-between group hover:glow-orange transition-all" data-cursor-hover>
                  <div>
                    <Quote size={20} className="text-primary/40 mb-4" />
                    <p className="text-sm text-secondary-foreground leading-relaxed mb-6">{quote}</p>
                  </div>
                  <div>
                    <div className="border-t border-border pt-4 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{name}</p>
                        <p className="text-xs text-muted-foreground">{title}</p>
                      </div>
                      <span className="text-xs font-mono text-gradient-orange font-semibold">{metric}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SLIDE 9 — CASE STUDIES PREVIEW */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">Our Work</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
                Case <span className="text-gradient-orange">Studies.</span>
              </h2>
            </SlideReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Demand Forecasting Engine", industry: "Retail & CPG", result: "24% stock-out reduction", stack: "Snowflake • dbt • Python" },
                { title: "Real-Time Sales Intelligence", industry: "B2B SaaS", result: "15% pipeline efficiency lift", stack: "BigQuery • Fivetran • Metabase" },
                { title: "Observability-First Platform", industry: "Financial Services", result: "98%+ data freshness SLA", stack: "Databricks • Monte Carlo" },
              ].map(({ title, industry, result, stack }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }} viewport={{ once: true }}
                  className="glass-panel rounded-xl p-6 group tilt-card hover:glow-orange transition-all" data-cursor-hover>
                  <p className="font-mono text-xs text-primary mb-3">{industry}</p>
                  <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-sm text-gradient-orange font-semibold mb-3">{result}</p>
                  <p className="text-[10px] text-muted-foreground font-mono mb-4">{stack}</p>
                  <span className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={12} />
                  </span>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link to="/case-studies" data-cursor-hover
                className="inline-flex items-center gap-2 glass-panel px-6 py-3 rounded-lg text-sm font-medium text-foreground hover:bg-muted/20 transition-colors">
                View All Case Studies <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>

        {/* SLIDE 10 — WHY INCLINED PLANE */}
        <section className="snap-section flex items-center relative">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">Why Us</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-14 text-center">
                Engineering <span className="text-gradient-orange">Advantage.</span>
              </h2>
            </SlideReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { icon: Sparkles, title: "AI-Native Thinking", desc: "We don't bolt AI on. We architect for it from day one. Every pipeline, every schema, every workflow." },
                { icon: Eye, title: "Observability-First", desc: "Data quality isn't a feature — it's the foundation. We instrument everything and monitor continuously." },
                { icon: Clock, title: "Speed to Production", desc: "We ship in weeks, not quarters. Production-grade systems with CI/CD, testing, and monitoring built in." },
                { icon: Cpu, title: "Full-Stack Data", desc: "From ingestion to AI-powered automation. We own the entire stack so nothing falls through the cracks." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.12 }} viewport={{ once: true }}
                  className="glass-panel rounded-xl p-6 text-center group hover:glow-orange transition-all" data-cursor-hover>
                  <div className="w-12 h-12 rounded-xl surface-3 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }} viewport={{ once: true }}
              className="mt-10 glass-panel rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {[CheckCircle2, CheckCircle2, CheckCircle2].map((Icon, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-secondary-foreground">
                    <Icon size={14} className="text-primary" />
                    <span>{["SOC 2 Ready", "Multi-Cloud", "24/7 Monitoring"][i]}</span>
                  </div>
                ))}
              </div>
              <Link to="/about" data-cursor-hover className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all">
                Learn about our approach <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* SLIDE 11 — FINAL CTA */}
        <section className="snap-section flex items-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute w-[800px] h-[800px] rounded-full opacity-[0.1] animate-aurora-2 blur-[120px] bg-gradient-orange top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.06] animate-aurora-3 blur-[80px] bg-gradient-orange top-1/4 left-1/4" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <SlideReveal>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-6">Let's Build</p>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Build Systems That{" "}<span className="text-gradient-orange">Move.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
                If you're serious about AI-ready architecture and operational intelligence, let's build.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" data-cursor-hover
                  className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-4 rounded-lg font-medium text-lg hover:opacity-90 transition-opacity glow-orange-strong">
                  Start the Conversation <ArrowRight size={18} />
                </Link>
                <Link to="/thesis" data-cursor-hover
                  className="inline-flex items-center gap-2 glass-panel px-8 py-4 rounded-lg font-medium text-foreground hover:bg-muted/20 transition-colors">
                  Read Our Thesis
                </Link>
              </div>
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }}
                className="mt-16 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-muted-foreground/40">
                {["Snowflake Partner", "AWS Partner", "dbt Certified", "SOC 2 Ready"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5">
                    <CheckCircle2 size={10} className="text-primary/50" /> {badge}
                  </span>
                ))}
              </motion.div>
            </SlideReveal>
          </div>
        </section>

        {/* Footer */}
        <div className="snap-section flex flex-col justify-end">
          <div className="flex-1" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

const SlideReveal = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: "easeOut" }} viewport={{ once: true, amount: 0.3 }}>
    {children}
  </motion.div>
);

export default Index;
