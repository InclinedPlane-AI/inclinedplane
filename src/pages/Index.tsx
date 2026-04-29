import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";

import SlideProgress from "@/components/SlideProgress";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import AuroraBackground from "@/components/AuroraBackground";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link } from "react-router-dom";
import OrbitalGraphic from "@/components/OrbitalGraphic";
import SectionGlow from "@/components/SectionGlow";
import TechStackGrid from "@/components/TechStackGrid";
import InteractiveDotGrid from "@/components/InteractiveDotGrid";
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  BarChart3,
  Eye,
  Brain,
  Zap,
  Cloud,
  TrendingUp,
  Shield,
  Clock,
  Globe,
  Cpu,
  Layers,
  Activity,
  CheckCircle2,
  Quote,
  Sparkles,
  Target,
  Rocket,
  Heart,
} from "lucide-react";

const SLIDE_COUNT = 12;

// Shared viewport config for all whileInView — only animate once
const vp = { once: true, amount: 0.2 } as const;

// Lighter transition defaults
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay, ease: "easeOut" as const },
  viewport: vp,
});

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
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollTop = container.scrollTop;
        const vh = window.innerHeight;
        const index = Math.round(scrollTop / vh);
        setCurrentSlide(Math.min(index, SLIDE_COUNT - 1));
        ticking = false;
      });
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
      <SEOHead
        title="Inclined Plane — AI-Native Data Engineering"
        description="AI-ready data platforms, observability-first pipelines, and decision systems that turn complexity into operational intelligence. Data engineering consultancy for modern enterprises."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "Inclined Plane",
          description:
            "AI-native data engineering consultancy specializing in cloud data warehouses, BI modernization, DataOps, and AI automation workflows.",
          url: "https://inclinedplane.com",
          priceRange: "$$$$",
          areaServed: "Worldwide",
          serviceType: [
            "Data Engineering",
            "AI Automation",
            "Business Intelligence",
            "Cloud Data Warehousing",
            "DataOps",
          ],
        }}
      />
      <Navbar />
      <SlideProgress total={SLIDE_COUNT} current={currentSlide} onDotClick={scrollToSlide} />
      <ScrollProgressBar containerRef={containerRef} />

      <div ref={containerRef} className="snap-container scrollbar-hide">
        {/* SLIDE 1 — HERO */}
        <section className="snap-section flex items-center relative overflow-hidden">
          <AuroraBackground />
          <InteractiveDotGrid />
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full pointer-events-none">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="pointer-events-auto"
                >
                  <motion.p
                    className="font-mono text-[11px] sm:text-[13px] tracking-widest uppercase mb-4 sm:mb-6 inline-block font-medium"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, hsl(var(--orange-start) / 0.8) 0%, hsl(var(--orange-start) / 0.8) 40%, hsl(0 0% 100% / 0.6) 50%, hsl(var(--orange-start) / 0.8) 60%, hsl(var(--orange-start) / 0.8) 100%)",
                      backgroundSize: "400% 100%",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                    animate={{ backgroundPosition: ["150% center", "-50% center"] }}
                    transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 3, ease: "linear" }}
                  >
                    The Architecture of Enterprise Velocity
                  </motion.p>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-[1.1] tracking-tight mb-4 sm:mb-6">
                    Data Engineered. <span className="text-gradient-orange">Intelligence Deployed.</span>
                  </h1>
                  <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 sm:mb-8 text-justify">
                    We build the data infrastructure and AI systems that power high-velocity enterprises — from a
                    solid foundation all the way to autonomous decision-making.
                  </p>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pointer-events-auto">
                    <Link
                      to="/contact"
                      data-cursor-hover
                      className="inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-6 sm:px-7 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity glow-orange"
                    >
                      Book a Discovery Call <ArrowRight size={16} />
                    </Link>
                    <Link
                      to="/thesis"
                      data-cursor-hover
                      className="inline-flex items-center justify-center gap-2 glass-panel px-6 sm:px-7 py-3 rounded-lg font-medium text-sm text-foreground hover:bg-muted/20 transition-colors"
                    >
                      Read Our Thesis <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="mt-8 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono text-muted-foreground"
                >
                  {["AWS", "Azure", "Snowflake", "Databricks", "dbt", "n8n"].map((t) => (
                    <span key={t} className="opacity-50">
                      {t}
                    </span>
                  ))}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="hidden lg:flex items-center justify-center pointer-events-auto"
              >
                <OrbitalGraphic />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Grain overlay for content sections (excludes hero & footer) */}
        <div className="grain-overlay relative">
          {/* SLIDE 2 — AI TRANSFORMATION FACTS (Bento) */}
          <section className="snap-section flex items-center justify-center relative py-16 sm:py-20 lg:py-12">
            <SectionGlow position="bottom-right" size={700} />
            <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2 text-center">
                  The AI Imperative — In Numbers
                </p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight text-center max-w-3xl mx-auto mb-6 lg:mb-8">
                  The opportunity is real. The intent is there.{" "}
                  <span className="text-gradient-orange">The infrastructure isn't.</span>
                </p>
              </motion.div>

              {/* Three-column narrative: Opportunity → Intent → Gap */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">
                {[
                  {
                    key: "opportunity",
                    label: "The Opportunity",
                    sub: "The prize is enormous.",
                    dot: "bg-green-400",
                    tint: "",
                    stats: [
                      {
                        num: "$15.7T",
                        desc: "Projected AI contribution to global GDP by 2030.",
                        src: "PwC, 2024",
                        link: "https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf",
                      },
                      {
                        num: "25–40%",
                        desc: "Maintenance cost reduction unlocked by enterprise AI adoption.",
                        src: "McKinsey, 2025",
                        link: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
                      },
                      {
                        num: "370%",
                        desc: "ROI for GenAI early adopters; top performers report up to 1030%.",
                        src: "Industry Sources, 2025",
                        link: "https://www.fullview.io/blog/ai-statistics",
                      },
                    ],
                  },
                  {
                    key: "intent",
                    label: "The Intent",
                    sub: "Enterprises are moving.",
                    dot: "bg-amber-400",
                    tint: "bg-amber-500/[0.04]",
                    stats: [
                      {
                        num: "78%",
                        desc: "Of organizations now use AI in at least one business function.",
                        src: "McKinsey, 2025",
                        link: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
                      },
                      {
                        num: "#1",
                        desc: "AI/GenAI ranked the top digital supply chain investment priority.",
                        src: "Gartner, 2024",
                        link: "https://www.gartner.com/en/newsroom/press-releases/2024-10-30-gartner-survey-shows-ai-and-generative-ai-top-digital-supply-chain-investment-priorities",
                      },
                      {
                        num: "$53B",
                        desc: "Forecast spend on agentic AI in supply chain software by 2030.",
                        src: "Gartner, 2026",
                        link: "https://www.gartner.com/en/newsroom/press-releases/2026-04-07-gartner-forecasts-supply-chain-management-software-with-agentic-ai-will-grow-to-53-billion-in-spend-by-2030",
                      },
                    ],
                  },
                  {
                    key: "gap",
                    label: "The Gap",
                    sub: "Most aren't ready.",
                    dot: "bg-red-400",
                    tint: "bg-primary/[0.06]",
                    stats: [
                      {
                        num: "23%",
                        desc: "Of supply chain organizations have a formal AI strategy.",
                        src: "Gartner, 2025",
                        link: "https://www.gartner.com/en/newsroom/2025-06-11-gartner-survey-shows-just-23-percent-of-supply-chain-organizations-have-a-formal-ai-strategy",
                      },
                      {
                        num: "70–85%",
                        desc: "Of AI projects fail to deliver expected business value.",
                        src: "Industry Sources, 2025",
                        link: "https://www.fullview.io/blog/ai-statistics",
                      },
                      {
                        num: "1 in 5",
                        desc: "Companies have mature AI governance in place.",
                        src: "Deloitte, 2025",
                        link: "https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html",
                      },
                    ],
                  },
                ].map((col, colIdx) => (
                  <motion.div key={col.key} {...fadeUp(colIdx * 0.08)} className="flex flex-col gap-3">
                    <div className={`glass-panel rounded-xl p-5 lg:p-6 ${col.tint}`}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${col.dot} shadow-[0_0_8px_currentColor]`} />
                        <p className="font-mono tracking-widest uppercase text-xl font-semibold text-foreground">{col.label}</p>
                      </div>
                      <p className="text-base lg:text-lg text-secondary-foreground font-normal">{col.sub}</p>
                    </div>
                    {col.stats.map((s, i) => {
                      const CardTag: any = s.link ? "a" : "div";
                      const linkProps = s.link ? { href: s.link, target: "_blank", rel: "noopener noreferrer" } : {};
                      return (
                        <CardTag
                          key={i}
                          {...linkProps}
                          className={`glass-panel rounded-xl p-2.5 lg:p-3 flex flex-col justify-between min-h-[4.5rem] lg:min-h-[5rem] transition-all duration-300 hover:-translate-y-1 hover:glow-orange hover:border-primary/40 ${s.link ? "group cursor-pointer" : "cursor-default"} ${col.tint}`}
                          data-cursor-hover
                        >
                          <div>
                            <p className="text-base lg:text-lg xl:text-xl font-bold text-gradient-orange mb-1">
                              {s.num}
                            </p>
                            <p className="text-[10px] text-secondary-foreground leading-snug">{s.desc}</p>
                          </div>
                          <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-border/40">
                            <span className="font-mono text-[8px] text-muted-foreground/60 uppercase">{s.src}</span>
                            {s.link && (
                              <span className="w-4 h-4 rounded surface-3 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <ArrowUpRight size={8} className="text-primary" />
                              </span>
                            )}
                          </div>
                        </CardTag>
                      );
                    })}
                  </motion.div>
                ))}
              </div>

              {/* Closing banner */}
              <motion.div {...fadeUp(0.3)} className="mt-6 lg:mt-8 text-center">
                <p className="text-base sm:text-lg lg:text-xl font-semibold text-foreground leading-relaxed max-w-3xl mx-auto">
                  "The gap between AI ambition and AI reality almost always starts with data infrastructure. We close
                  that gap — and build everything on top of it.{" "}
                  <span className="text-gradient-orange">We do both.</span>"
                </p>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 3 — THE PROBLEM */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="top-right" size={600} />
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                <p className="font-mono text-[10px] sm:text-xs text-primary tracking-widest uppercase mb-3 sm:mb-4">
                  The Problem
                </p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Dashboards Are Not <span className="text-gradient-orange">Competitive Advantage.</span>
                </h2>
              </motion.div>
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                  {[
                    "[WARN] Pipeline failed: stale data — 47min lag",
                    "[ERR]  Model drift detected — no retraining trigger",
                    "[WARN] Dashboard refresh: manual, weekly cadence",
                    "[ERR]  No observability — blind spot in pipeline health",
                    "[INFO] Business asking: 'Can we predict demand?'",
                    "[ERR]  68% of AI projects fail from bad data infra",
                  ].map((log, i) => (
                    <motion.div
                      key={i}
                      {...fadeUp(0.1 + i * 0.06)}
                      className={`px-4 py-2 rounded surface-2 ${log.includes("[ERR]") ? "text-destructive/80 border-l-2 border-destructive/50" : log.includes("[WARN]") ? "text-orange-300 border-l-2 border-orange-500/30" : "text-muted-foreground border-l-2 border-muted-foreground/40"}`}
                    >
                      {log}
                    </motion.div>
                  ))}
                </div>
                <motion.div {...fadeUp(0.15)}>
                  <div className="glass-panel rounded-2xl p-8">
                    <p className="text-sm text-muted-foreground mb-6">Pipeline Health Score</p>
                    <div className="space-y-5">
                      {[
                        { label: "Data Freshness", value: 34 },
                        { label: "Pipeline Reliability", value: 52 },
                        { label: "Model Accuracy", value: 41 },
                        { label: "Observability Coverage", value: 18 },
                        { label: "AI Readiness", value: 12 },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <div className="flex justify-between text-sm mb-1.5">
                            <span className="text-secondary-foreground">{label}</span>
                            <span className="text-destructive/80 font-mono">{value}%</span>
                          </div>
                          <div className="h-1.5 rounded-full surface-3">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${value}%` }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              viewport={vp}
                              className="h-full rounded-full bg-destructive/60"
                            />
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
                </motion.div>
              </div>
            </div>
          </section>

          {/* SLIDE 4 — THE EVOLUTION */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="bottom-left" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">The Evolution</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  From Sail to <span className="text-gradient-orange">Leverage.</span>
                </h2>
              </motion.div>
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <motion.div {...fadeUp(0.1)}>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
                      For years, as <span className="text-foreground font-medium">Sail Analytics</span>, we built a
                      foundation of enterprise trust by delivering high-stakes data analytics and engineering services
                      to complex organizations. We helped our clients navigate the vast seas of information with
                      precision and reliability.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-6 text-justify">
                      But in the age of Artificial Intelligence,{" "}
                      <span className="text-foreground font-medium">navigation isn't enough — you need momentum.</span>
                    </p>
                    <p className="text-muted-foreground leading-relaxed text-justify">
                      <span className="text-gradient-orange font-semibold">InclinedPlane</span> represents a fundamental
                      shift: providing the strategic leverage your business needs. We transform raw data into a
                      sophisticated lever that multiplies your team's efforts and accelerates your trajectory.
                    </p>
                  </motion.div>
                </div>
                <motion.div {...fadeUp(0.15)}>
                  <div className="flex flex-col gap-4">
                    {[
                      { before: "Sail Analytics", after: "InclinedPlane", desc: "Brand evolution" },
                      { before: "Data Navigation", after: "Data Leverage", desc: "Strategic shift" },
                      {
                        before: "Legacy BI Services",
                        after: "AI-Native Engineering & Analytics",
                        desc: "Capability upgrade",
                      },
                      { before: "Reporting Focus", after: "Decision Intelligence", desc: "Value delivery" },
                    ].map(({ before, after, desc }, i) => (
                      <motion.div
                        key={desc}
                        {...fadeUp(0.2 + i * 0.06)}
                        className="glass-panel rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 group hover:glow-orange transition-shadow"
                        data-cursor-hover
                      >
                        <div className="w-[38%] shrink-0">
                          <p className="text-xs sm:text-sm text-muted-foreground/40 italic">{before}</p>
                        </div>
                        <ArrowRight size={14} className="text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-foreground font-semibold">{after}</p>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-muted-foreground font-mono hidden sm:block shrink-0">
                          {desc}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SLIDE 5 — CORE CAPABILITIES */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="top-left" size={700} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                  Core Capabilities
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-center">
                  How We <span className="text-gradient-orange">Deliver.</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                  Three pillars of capability engineered for the AI-driven enterprise.
                </p>
              </motion.div>
              <div className="grid lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Database,
                    title: "Enterprise Data Architecture & AI-Readiness",
                    headline: "Foundations Built for Scale and Intelligence.",
                    desc: "Modern growth requires more than just storage — it requires flow and foresight. We design and implement enterprise-grade data pipelines and architectures that ensure your organization is AI-ready.",
                    bullets: [
                      "AI-Ready Infrastructure",
                      "Legacy Integration",
                      "Real-Time Sync",
                      "Cloud-Native Warehousing",
                    ],
                  },
                  {
                    icon: BarChart3,
                    title: "Automated Intelligence & BI",
                    headline: "Decision-Making, De-risked.",
                    desc: "Stop looking in the rearview mirror. We build automated reporting environments that provide leadership and operations with the clarity they need to act, not just react.",
                    bullets: [
                      "Executive KPI Dashboards",
                      "Operational Reporting",
                      "Automated Workflows",
                      "Self-Serve Analytics",
                    ],
                  },
                  {
                    icon: Brain,
                    title: "AI, Predictive & Agentic Implementation",
                    headline: "Predicting the Future by Engineering It.",
                    desc: "The leap from analytics to AI is where competitive advantages are won. We implement cutting-edge predictive solutions and autonomous agents that turn 'what if' into 'what's next.'",
                    bullets: [
                      "Agentic AI Systems",
                      "Operational Risk Mitigation",
                      "Predictive Maintenance",
                      "Growth Modeling",
                    ],
                  },
                ].map(({ icon: Icon, title, headline, desc, bullets }, i) => (
                  <motion.div
                    key={title}
                    {...fadeUp(i * 0.08)}
                    className="glass-panel rounded-xl p-7 group flex flex-col hover:glow-orange transition-shadow"
                    data-cursor-hover
                  >
                    <div className="w-11 h-11 rounded-lg surface-3 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <p className="text-xs text-primary font-mono mb-2">{headline}</p>
                    <h3 className="font-semibold text-foreground text-base mb-3">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1 text-justify">{desc}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {bullets.map((b) => (
                        <div key={b} className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                          <CheckCircle2 size={11} className="text-primary shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SLIDE 6 — VALUE PROPOSITION / IMPACT */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="bottom-right" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">Impact</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                  Turn Data Gravity into <span className="text-gradient-orange">Growth Momentum.</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
                  Data can be a weight or a lever. Without the right architecture, it's a liability that slows you down.
                  With InclinedPlane, it becomes the force multiplier that lifts your enterprise to its next stage of
                  growth.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                {[
                  {
                    value: 70,
                    suffix: "%",
                    label: "Faster Time-to-Insight",
                    desc: "Reduce the gap between raw data and actionable intelligence.",
                  },
                  {
                    value: 100,
                    suffix: "%",
                    label: "Pipeline Automation",
                    desc: "Eliminate manual error through full pipeline automation.",
                  },
                  {
                    value: 3,
                    suffix: "x",
                    label: "Team Leverage",
                    desc: "Reallocate human capital from data entry to strategic AI-driven initiatives.",
                  },
                ].map(({ value, suffix, label, desc }, i) => (
                  <motion.div
                    key={label}
                    {...fadeUp(i * 0.08)}
                    className="glass-panel rounded-xl p-8 text-center group hover:glow-orange transition-shadow"
                  >
                    <p className="text-4xl lg:text-5xl font-bold mb-3">
                      <AnimatedCounter end={value} suffix={suffix} prefix={suffix === "x" ? "" : "Up to "} />
                    </p>
                    <p className="text-sm text-foreground font-medium mb-2">{label}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { value: "Speed", label: "Time-to-insight reduction" },
                  { value: "Accuracy", label: "Full pipeline automation" },
                  { value: "Growth", label: "AI-driven strategic initiatives" },
                  { value: "Scale", label: "Enterprise-grade architecture" },
                ].map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    {...fadeUp(0.3 + i * 0.05)}
                    className="surface-2 rounded-lg px-5 py-4 text-center"
                  >
                    <p className="text-xl font-bold text-gradient-orange mb-1">{value}</p>
                    <p className="text-[11px] text-muted-foreground">{label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SLIDE 7 — ARCHITECTURE SNAPSHOT */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="top-right" size={700} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              {/* Header */}
              <motion.div {...fadeUp()} className="mb-5">
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2 text-center">
                  Architecture
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-center">
                  The Intelligence <span className="text-gradient-orange">Stack.</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-xl mx-auto text-sm">
                  A modern, composable architecture designed for AI-readiness from day one.
                </p>
              </motion.div>

              {/* Pipeline row */}
              <div className="flex flex-col md:flex-row items-stretch gap-2 justify-center mb-8">
                {[
                  { icon: Database, title: "Sources", desc: "APIs, DBs, Events", color: "border-muted/30" },
                  { icon: Layers, title: "Warehouse", desc: "Snowflake • BigQuery", color: "border-muted/30" },
                  { icon: Eye, title: "Observability", desc: "Quality • Lineage", color: "border-muted/30" },
                  { icon: BarChart3, title: "Intelligence", desc: "Forecasting • BI", color: "border-primary/30" },
                  { icon: Brain, title: "AI Layer", desc: "LLMs • Agents", color: "border-primary/40" },
                  { icon: Zap, title: "Automation", desc: "Workflows • Alerts", color: "border-primary/50" },
                ].map(({ icon: Icon, title, desc, color }, i) => (
                  <motion.div key={title} {...fadeUp(i * 0.04)} className="flex items-center gap-2">
                    <div
                      className={`glass-panel rounded-lg p-3 flex-1 min-w-[110px] border ${color} group hover:glow-orange transition-shadow text-center`}
                      data-cursor-hover
                    >
                      <div className="w-8 h-8 rounded-md surface-3 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/10 transition-colors">
                        <Icon size={15} className="text-primary" />
                      </div>
                      <p className="font-semibold text-foreground text-xs mb-0.5">{title}</p>
                      <p className="text-[9px] text-muted-foreground leading-tight">{desc}</p>
                    </div>
                    {i < 5 && <ArrowRight size={12} className="text-muted-foreground/30 shrink-0 hidden md:block" />}
                  </motion.div>
                ))}
              </div>

              {/* Auto-scrolling tech stack marquee */}
              <motion.div {...fadeUp(0.2)}>
                <p className="text-center text-xs text-muted-foreground mb-4 tracking-wide uppercase font-mono">
                  Tools & Platforms We Work With
                </p>
                <TechStackGrid />
              </motion.div>
            </div>
          </section>

          {/* SLIDE 8 — TESTIMONIALS */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="bottom-left" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                  What Leaders Say
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-14 text-center">
                  Trusted by <span className="text-gradient-orange">Decision Makers.</span>
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    quote:
                      "Inclined Plane didn't just build us a data platform — they built the foundation for our entire AI strategy. Our forecasting accuracy went from guesswork to 98%.",
                    name: "Sarah Chen",
                    title: "VP of Data, Retail Co.",
                    metric: "98% forecast accuracy",
                  },
                  {
                    quote:
                      "Within 6 weeks, our sales team had real-time intelligence that previously took analysts days to compile. Pipeline velocity increased 3x.",
                    name: "Marcus Williams",
                    title: "CRO, B2B SaaS Platform",
                    metric: "3x pipeline velocity",
                  },
                  {
                    quote:
                      "The observability layer they implemented caught a critical data quality issue that would have cost us $2M in bad decisions. It paid for itself day one.",
                    name: "Dr. Priya Sharma",
                    title: "Chief Data Officer, FinServ",
                    metric: "$2M+ saved",
                  },
                ].map(({ quote, name, title, metric }, i) => (
                  <motion.div
                    key={name}
                    {...fadeUp(i * 0.1)}
                    className="glass-panel rounded-xl p-7 flex flex-col justify-between group hover:glow-orange transition-shadow"
                    data-cursor-hover
                  >
                    <div>
                      <Quote size={20} className="text-primary/40 mb-4" />
                      <p className="text-sm text-secondary-foreground leading-relaxed mb-6 text-justify">{quote}</p>
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
            <SectionGlow position="top-left" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">Our Work</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-12 text-center">
                  Case <span className="text-gradient-orange">Studies.</span>
                </h2>
              </motion.div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Demand Forecasting Engine",
                    industry: "Retail & CPG",
                    result: "24% stock-out reduction",
                    stack: "Snowflake • dbt • Python",
                  },
                  {
                    title: "Real-Time Sales Intelligence",
                    industry: "B2B SaaS",
                    result: "15% pipeline efficiency lift",
                    stack: "BigQuery • Fivetran • Metabase",
                  },
                  {
                    title: "Observability-First Platform",
                    industry: "Financial Services",
                    result: "98%+ data freshness SLA",
                    stack: "Databricks • Monte Carlo",
                  },
                ].map(({ title, industry, result, stack }, i) => (
                  <motion.div
                    key={title}
                    {...fadeUp(i * 0.08)}
                    className="glass-panel rounded-xl p-6 group hover:glow-orange transition-shadow"
                    data-cursor-hover
                  >
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

          {/* SLIDE 10 — WHY INCLINED PLANE */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="bottom-right" size={700} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">Why Us</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                  Why Modern Enterprises <span className="text-gradient-orange">Partner With Us.</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
                  The InclinedPlane advantage — purpose-built for the AI era.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  {
                    icon: Brain,
                    title: "Intelligence-First Approach",
                    desc: "We don't just deliver dashboards — we deliver the AI models that make sense of them.",
                  },
                  {
                    icon: Globe,
                    title: "US Market Expertise",
                    desc: "Restructured specifically to handle the regulatory and scaling needs of American enterprise sectors.",
                  },
                  {
                    icon: Cpu,
                    title: "Full-Stack Implementation",
                    desc: "We aren't just consultants. We are the engineers who build, deploy, and manage your data's lifecycle.",
                  },
                  {
                    icon: Sparkles,
                    title: "AI-Native Architecture",
                    desc: "Every pipeline, every schema, every workflow — designed for AI from day one.",
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    {...fadeUp(i * 0.06)}
                    className="glass-panel rounded-xl p-6 text-center group hover:glow-orange transition-shadow"
                    data-cursor-hover
                  >
                    <div className="w-12 h-12 rounded-xl surface-3 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div
                {...fadeUp(0.3)}
                className="mt-8 sm:mt-10 glass-panel rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  {["SOC 2 Ready", "Multi-Cloud", "24/7 Monitoring"].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-secondary-foreground">
                      <CheckCircle2 size={14} className="text-primary" />
                      <span>{badge}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/about"
                  data-cursor-hover
                  className="text-sm text-primary flex items-center gap-1 hover:gap-2 transition-all"
                >
                  Learn about our approach <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 11 — CAREERS TEASER */}
          <section className="snap-section flex items-center relative overflow-hidden">
            <SectionGlow position="top-right" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()} className="text-center mb-10 sm:mb-12">
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Careers</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5">
                  Build What <span className="text-gradient-orange">Comes Next.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                  We don't optimize for size — we optimize for the quality of the engineers in the room. Every person
                  here is expected to set direction, ship production work, and raise the bar. In return, you get
                  autonomy, ownership, and the chance to work on problems that matter to the businesses we partner with.
                </p>
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[
                  { icon: Brain, title: "Engineering Rigor" },
                  { icon: Sparkles, title: "AI-Native by Default" },
                  { icon: Heart, title: "Ownership & Craft" },
                  { icon: Globe, title: "Remote-First, Async-Friendly" },
                ].map(({ icon: Icon, title }, i) => (
                  <motion.div
                    key={title}
                    {...fadeUp(i * 0.06)}
                    className="glass-panel rounded-xl p-5 flex items-center gap-3 group hover:glow-orange transition-shadow"
                    data-cursor-hover
                  >
                    <div className="w-10 h-10 rounded-lg surface-3 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/10 transition-colors">
                      <Icon size={16} className="text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">{title}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                {...fadeUp(0.2)}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <Link
                  to="/careers"
                  data-cursor-hover
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-7 py-3.5 rounded-lg font-medium text-sm sm:text-base hover:opacity-90 transition-opacity glow-orange"
                >
                  See Open Roles <ArrowRight size={16} />
                </Link>
                <a
                  href="mailto:careers@inclinedplane.com"
                  data-cursor-hover
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-panel px-7 py-3.5 rounded-lg font-medium text-sm sm:text-base text-foreground hover:bg-muted/20 transition-colors"
                >
                  careers@inclinedplane.com
                </a>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 12 — FINAL CTA */}
          <section className="snap-section flex items-center relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full opacity-[0.08] blur-[120px] bg-gradient-orange top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 will-change-transform" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 text-center">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-[10px] sm:text-xs text-primary tracking-widest uppercase mb-4 sm:mb-6">
                  Ready to Apply Leverage?
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-6">
                  Let's Restructure Your Data for an <span className="text-gradient-orange">AI-Driven Future.</span>
                </h2>
                <p className="text-sm sm:text-lg text-muted-foreground mb-8 sm:mb-10 max-w-xl mx-auto">
                  Let's discuss how we can restructure your data environment for an AI-driven future.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Link
                    to="/contact"
                    data-cursor-hover
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-3.5 sm:py-4 rounded-lg font-medium text-base sm:text-lg hover:opacity-90 transition-opacity glow-orange-strong"
                  >
                    Contact Our Team <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/thesis"
                    data-cursor-hover
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-panel px-8 py-3.5 sm:py-4 rounded-lg font-medium text-foreground hover:bg-muted/20 transition-colors"
                  >
                    Read Our Thesis
                  </Link>
                </div>
                <div className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs font-mono text-muted-foreground/40">
                  {["Snowflake Partner", "AWS Partner", "dbt Certified", "SOC 2 Ready"].map((badge) => (
                    <span key={badge} className="flex items-center gap-1.5">
                      <CheckCircle2 size={10} className="text-primary/50" /> {badge}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </div>
        {/* end grain-overlay */}

        {/* Footer */}
        <div className="lg:snap-section lg:flex lg:flex-col lg:justify-end lg:min-h-screen">
          <div className="hidden lg:block lg:flex-1" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
