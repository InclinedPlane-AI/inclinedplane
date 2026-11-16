import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import RotatingText from "@/components/RotatingText";
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
  Factory,
  Truck,
  Package,
  Store,
} from "lucide-react";

import ServicesExplorer from "@/components/home/ServicesExplorer";
import LiveHealthDemo from "@/components/home/LiveHealthDemo";
import AIImperative from "@/components/home/AIImperative";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import CaseStudyMedia from "@/components/case-study/CaseStudyMedia";
import { caseStudies } from "@/data/caseStudies";
import { PRODUCTS } from "@/data/products";

const SLIDE_COUNT = 11;

// Results slide reads its numbers straight from the case study data so the
// home page can never drift from what each case study actually says.
const RESULT_STUDIES = ["engine-demand-forecast", "ev-battery-predictive", "ecom-inventory"]
  .map((id) => caseStudies.find((c) => c.id === id))
  .filter((c): c is (typeof caseStudies)[number] => !!c && !!c.metrics?.length);

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
  const rotatingWords = ["Growth", "Intelligence"];
  const [rotatingIndex, setRotatingIndex] = useState(0);
  const rotatingWord = rotatingWords[rotatingIndex];
  useEffect(() => {
    const id = setInterval(() => {
      setRotatingIndex((i) => (i + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

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

  const getActiveNavOverride = () => {
    switch (currentSlide) {
      case 0:
      case 1:
        return "/"; // Home
      case 2:
        return "/thesis"; // The Problem
      case 3:
        return "/thesis"; // Our Focus (Industries page commented out — keep underline on Thesis)
      case 4:
        return "/services"; // Our Services
      case 5:
        return "/products"; // Our Products
      case 6:
        return "/case-studies"; // Proven Results
      case 7:
      case 8:
        return "/about"; // Evolution + Why Us
      case 9:
        return "/careers"; // Careers Teaser
      case 10:
        return "/contact"; // Final CTA
      default:
        return "/"; //close section
    }
  };

  return (
    <div className="bg-background">
      <SEOHead
        title="InclinedPlane — Data Architecture & Analytics for the AI Era"
        description="AI-ready data platforms, observability-first pipelines, and decision systems that turn complexity into operational intelligence. Data engineering consultancy for modern enterprises."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "InclinedPlane",
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
      <Navbar activeOverride={getActiveNavOverride()} />
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
                    Data Leveraged <span className="text-gradient-orange">Intelligence Deployed</span>
                  </h1>
                  <p className="text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 sm:mb-8 text-justify">
                    We build the data infrastructure and AI systems that power demanding enterprises, from a solid
                    foundation all the way to automated decision-making.
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
                  className="mt-8 sm:mt-12 flex flex-wrap items-center gap-2.5 pointer-events-auto"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mr-1">Our products</span>
                  {PRODUCTS.map((p) => (
                    <Link
                      key={p.id}
                      to={p.path}
                      className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3.5 py-1.5 text-xs text-foreground hover:border-primary/60 hover:bg-primary/10 transition-colors"
                    >
                      <span className="font-semibold">{p.name}</span>
                      <span className="text-muted-foreground hidden sm:inline">{p.kicker}</span>
                      <ArrowRight size={12} className="text-primary transition-transform group-hover:translate-x-0.5" />
                    </Link>
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
          <section className="snap-section flex items-center justify-center relative">
            <SectionGlow position="bottom-right" size={700} />
            <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2 text-center">
                  The AI Imperative — In Numbers
                </p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight text-center max-w-3xl mx-auto mb-6 lg:mb-8">
                  The opportunity is real. The intent is there.{" "}
                  <span className="text-gradient-orange">The infrastructure isn't.</span>
                </h2>
              </motion.div>

              <AIImperative />
            </div>
          </section>

          {/* SLIDE 3 — THE PROBLEM */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="top-right" size={600} />
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-5 sm:mb-8">
                <p className="font-mono text-[10px] sm:text-xs text-primary tracking-widest uppercase mb-2 sm:mb-4">
                  Why This Matters
                </p>
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  The Old Model Is <span className="text-gradient-orange">No Longer Enough.</span>
                </h2>
                <motion.p
                  {...fadeUp(0.05)}
                  className="text-xs sm:text-base text-muted-foreground leading-relaxed mt-3 sm:mt-5 text-center font-normal lg:text-base"
                >
                  Most organisations still treat data as a reporting function: static dashboards, fragile pipelines,
                  and analytics teams buried in ad-hoc requests. Meanwhile, your competitors are deploying automated
                  agents that make decisions in milliseconds. The gap between organisations that have solid
                  data infrastructure and those that don't is widening fast.
                </motion.p>
              </motion.div>
              <motion.div {...fadeUp(0.1)}>
                <LiveHealthDemo />
              </motion.div>
              <motion.div {...fadeUp(0.3)} className="mt-5 sm:mt-8 text-center">
                <Link
                  to="/thesis"
                  className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass-panel text-foreground font-medium text-xs sm:text-sm hover:text-primary transition-colors"
                >
                  Read our full thesis <ArrowRight size={16} />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 5 — ARCHITECTURE SNAPSHOT */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="top-right" size={700} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              {/* Header */}
              <motion.div {...fadeUp()} className="mb-5">
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2 text-center">OUR FOCUS</p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3 text-center">
                  Built for Complex, <span className="text-gradient-orange">High-Stakes Enterprises.</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-xl mx-auto text-sm">
                  We work with mid-to-large enterprises where data infrastructure isn't a nice-to-have. It's
                  operational-critical.
                </p>
              </motion.div>

              {/* Verticals row */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
                {[
                  { icon: Factory, title: "Manufacturing" },
                  { icon: Zap, title: "Energy & Utilities" },
                  { icon: Truck, title: "Logistics & Supply Chain" },
                  { icon: Package, title: "FMCG" },
                  { icon: Store, title: "Enterprise Retail" },
                ].map(({ icon: Icon, title }, i) => (
                  <motion.div key={title} {...fadeUp(i * 0.05)} className="flex items-center">
                    <div
                      className="glass-panel rounded-lg p-3 sm:px-5 flex items-center gap-3 border border-muted/30 group hover:glow-orange transition-shadow"
                      data-cursor-hover
                    >
                      <div className="w-8 h-8 rounded-md surface-3 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
                        <Icon size={16} className="text-primary" />
                      </div>
                      <p className="font-semibold text-foreground text-sm">{title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Target Audience Stats — removed per request */}
              {/*
              <motion.div {...fadeUp(0.3)} className="text-center mb-12">
                <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 px-6 py-3 rounded-full surface-2 border border-border/50 shadow-sm">
                  <p className="text-sm font-medium text-foreground">
                    <span className="text-primary mr-1">500–10,000</span> employees
                  </p>
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <p className="text-sm font-medium text-foreground">
                    <span className="text-primary mr-1">$100M–$2B</span> revenue
                  </p>
                  <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-muted-foreground/40" />
                  <p className="text-sm font-medium text-foreground">US and UK markets</p>
                </div>
              </motion.div>
              */}

              {/* Auto-scrolling tech stack marquee */}
              <motion.div {...fadeUp(0.2)}>
                <p className="text-center text-xs text-muted-foreground mb-4 tracking-wide uppercase font-mono">
                  Tools & Platforms We Work With
                </p>
                <TechStackGrid />
              </motion.div>
            </div>
          </section>

          {/* SLIDE 4 — OUR SERVICES */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="top-right" size={600} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-5 sm:mb-8">
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2 sm:mb-3">OUR SERVICES</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Engineered for <span className="text-gradient-orange">Intelligence.</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground text-center max-w-2xl mx-auto">
                  A continuous journey from clarity to intelligence, every service AI-enabled in delivery and AI-ready
                  in design.
                </p>
              </motion.div>
              <motion.div {...fadeUp(0.1)} className="mb-5 sm:mb-8">
                <ServicesExplorer />
              </motion.div>
              <motion.div {...fadeUp(0.4)} className="text-center">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full glass-panel text-foreground font-medium text-sm hover:text-primary transition-colors group"
                >
                  Explore all services{" "}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 5 — OUR PRODUCTS */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="top-left" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-2 sm:mb-3">OUR PRODUCTS</p>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-3">
                  Built in the field. <span className="text-gradient-orange">Proven on real estates.</span>
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Two platforms that grew out of our delivery work: one for the engineers who keep data flowing, one for the
                  people who make decisions with it.
                </p>
              </motion.div>
              <ProductsShowcase />
              <motion.div {...fadeUp(0.3)} className="mt-6 sm:mt-8 text-center">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full glass-panel text-foreground font-medium text-sm hover:text-primary transition-colors group"
                >
                  Compare both products <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 6 — VALUE PROPOSITION / IMPACT */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="bottom-right" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                  PROVEN RESULTS
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                  Results <span className="text-gradient-orange">That Compound.</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-14">
                  Every system we build is one we'd stake our reputation on. Because we do.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-3 gap-6 mb-10">
                {RESULT_STUDIES.map((cs, i) => {
                  const m = cs.metrics![0];
                  return (
                    <motion.div key={cs.id} {...fadeUp(i * 0.08)}>
                      <Link
                        to={`/case-studies/${cs.id}`}
                        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/80 hover:border-primary/40 hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_hsl(25_100%_50%/0.5)] transition-all duration-300"
                      >
                        <div className="relative">
                          <CaseStudyMedia src={cs.image} alt={cs.title} className="h-28 sm:h-32" shade />
                          <span className="absolute bottom-2.5 left-4 font-mono text-[10px] uppercase tracking-wider text-white/85">{cs.industry}</span>
                        </div>
                        <div className="p-6 flex flex-1 flex-col">
                          <p className="text-4xl lg:text-5xl font-bold mb-2 text-gradient-orange">
                            {typeof m.value === "number" ? (
                              <AnimatedCounter end={m.value} suffix={m.suffix || ""} prefix={m.prefix || ""} />
                            ) : (
                              <>{m.prefix || ""}{m.value}{m.suffix || ""}</>
                            )}
                          </p>
                          <p className="text-sm text-foreground font-medium mb-4">{m.label}</p>
                          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between gap-2">
                            <p className="text-xs text-muted-foreground leading-snug line-clamp-2">{cs.title}</p>
                            <ArrowRight size={14} className="text-primary shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              <motion.div {...fadeUp(0.4)} className="text-center">
                <Link
                  to="/case-studies"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel text-foreground font-medium hover:text-primary transition-colors group"
                >
                  See our case studies{" "}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 8 — THE EVOLUTION */}
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
                      <span className="text-foreground font-medium">navigation isn't enough. You need momentum.</span>
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
                        before: "BI Services",
                        after: "AI-Native Engineering & Analytics",
                        desc: "Capability upgrade",
                      },
                      { before: "Reporting Focus", after: "Autonomous Decisions", desc: "Value delivery" },
                    ].map(({ before, after, desc }, i) => (
                      <motion.div
                        key={desc}
                        {...fadeUp(0.2 + i * 0.06)}
                        className="glass-panel rounded-xl p-4 sm:p-5 flex items-center gap-3 sm:gap-4 group hover:glow-orange transition-shadow"
                        data-cursor-hover
                      >
                        <div className="w-[38%] shrink-0">
                          <p className="text-xs sm:text-sm text-muted-foreground italic line-through decoration-muted-foreground/60">
                            {before}
                          </p>
                        </div>
                        <ArrowRight size={14} className="text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs sm:text-sm text-foreground font-semibold">{after}</p>
                        </div>
                        <span className="text-[10px] sm:text-xs text-muted-foreground font-mono hidden sm:block shrink-0">
                          {desc}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SLIDE 7 — WHY INCLINED PLANE */}
          <section className="snap-section flex items-center relative">
            <SectionGlow position="bottom-right" size={700} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()}>
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4 text-center">
                  THE INCLINEDPLANE DIFFERENCE
                </p>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 text-center">
                  We Don't Just Build Pipelines. <span className="text-gradient-orange">We Build Leverage.</span>
                </h2>
                <p className="text-muted-foreground text-center max-w-xl mx-auto mb-14">
                  The InclinedPlane advantage, purpose-built for the AI era.
                </p>
              </motion.div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
                {[
                  {
                    icon: Cpu,
                    title: "Engineers, not consultants",
                    desc: "Every engagement ends with production-grade systems in your hands, not a deck, not a roadmap to a roadmap.",
                  },
                  {
                    icon: Sparkles,
                    title: "AI-native by default",
                    desc: "Every pipeline, schema, and workflow is designed for AI from day one, not retrofitted when you're ready to scale.",
                  },
                  {
                    icon: Rocket,
                    title: "Full-journey partners",
                    desc: "We take you from data foundation to automated intelligence. You don't need five different vendors to get there.",
                  },
                  {
                    icon: Shield,
                    title: "Deliberate and selective",
                    desc: "We take on fewer clients than we could. Every system we build is one we'd stake our reputation on. Because we do.",
                  },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <motion.div
                    key={title}
                    {...fadeUp(i * 0.06)}
                    className="glass-panel rounded-xl p-6 text-center group hover:glow-orange transition-shadow flex flex-col items-center"
                    data-cursor-hover
                  >
                    <div className="w-12 h-12 rounded-xl surface-3 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </motion.div>
                ))}
              </div>
              <motion.div {...fadeUp(0.3)} className="text-center">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-panel text-foreground font-medium hover:text-primary transition-colors group"
                >
                  Learn about our approach{" "}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* SLIDE 9 — CORE CAPABILITIES (Commented out) */}
          {false && (
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
          )}


          {/* SLIDE 8 — CAREERS TEASER */}
          <section className="snap-section flex items-center relative overflow-hidden">
            <SectionGlow position="top-right" size={650} />
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <motion.div {...fadeUp()} className="text-center mb-10 sm:mb-12">
                <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Careers</p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-5">
                  Build What <span className="text-gradient-orange">Comes Next.</span>
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-sm sm:text-base">
                  We don't optimize for size. We optimize for the quality of the engineers in the room. Every person
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

          {/* SLIDE 9 — FINAL CTA */}
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
                  Most engagements start with a single conversation. No pitch deck. No proposal. Just an honest
                  assessment of where you are and what's possible.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Link
                    to="/contact"
                    data-cursor-hover
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-3.5 sm:py-4 rounded-lg font-medium text-base sm:text-lg hover:opacity-90 transition-opacity glow-orange-strong"
                  >
                    Book a Discovery Call <ArrowRight size={18} />
                  </Link>
                  <Link
                    to="/thesis"
                    data-cursor-hover
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 glass-panel px-8 py-3.5 sm:py-4 rounded-lg font-medium text-foreground hover:bg-muted/20 transition-colors"
                  >
                    Read Our Thesis <ArrowRight size={18} />
                  </Link>
                </div>
                <div className="mt-10 sm:mt-16 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[10px] sm:text-xs font-mono text-muted-foreground/40">
                  {["Snowflake Partner", "AWS Partner", "dbt Certified"].map((badge) => (
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
        <div className="lg:snap-section lg:flex lg:flex-col lg:justify-end lg:min-h-screen lg:!pb-0">
          <div className="hidden lg:block lg:flex-1" />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
