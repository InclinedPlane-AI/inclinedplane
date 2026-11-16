import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Activity, ShieldCheck } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import PipelineIQ from "@/components/products/PipelineIQ";
import Inclever from "@/components/products/Inclever";
import { fadeUp } from "@/components/products/shared";

const PRODUCTS = [
  {
    id: "pipelineiq",
    name: "PipelineIQ",
    icon: Activity,
    kicker: "Pipeline observability",
    line: "Read-only monitoring, alerting and ETL debugging that turns hundreds of failures into a handful of root causes.",
  },
  {
    id: "inclever",
    name: "Inclever",
    icon: ShieldCheck,
    kicker: "Governed AI analytics",
    line: "Ask your data anything in Teams. Get an answer you can audit, or an honest reason why not.",
  },
];

/** Sticky in-page switcher that tracks which product section is on screen. */
const ProductSwitcher = () => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = PRODUCTS.map((p) => document.getElementById(p.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 112, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="sticky top-16 z-30 py-2">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-center">
        <div className="glass-panel-strong rounded-full p-1 flex gap-1 shadow-lg">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => go(p.id)}
              aria-current={active === p.id ? "true" : undefined}
              className={`relative px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                active === p.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === p.id && (
                <motion.span layoutId="product-pill" className="absolute inset-0 rounded-full bg-gradient-orange" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
              )}
              <span className="relative">{p.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const Products = () => (
  <PageLayout>
    <SEOHead
      title="Products — PipelineIQ & Inclever"
      description="PipelineIQ: read-only pipeline monitoring and ETL debugging. Inclever: governed AI analytics with an AI Readiness Control Tower that audits whether your data is fit for AI."
      path="/products"
    />
    <PageHero
      label="Products"
      title={
        <>
          Built in the field. <span className="text-gradient-orange">Proven on real estates.</span>
        </>
      }
      subtitle="Two platforms that grew out of our delivery work: one watches your data pipelines and tells you why they broke; the other lets people ask your data questions and only answers when the data has earned it."
    >
      <div className="mt-10 grid sm:grid-cols-2 gap-4 text-left">
        {PRODUCTS.map((p, i) => (
          <motion.a
            key={p.id}
            href={`#${p.id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.1 }}
            className="group glass-panel rounded-2xl p-5 sm:p-6 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <ArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-y-0.5 transition-all" />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-1">{p.kicker}</p>
            <p className="text-xl font-bold text-foreground mb-1.5">{p.name}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.line}</p>
          </motion.a>
        ))}
      </div>
    </PageHero>

    {/* Wrapper bounds the sticky switcher to the two product sections */}
    <div className="relative">
      <ProductSwitcher />

      <PipelineIQ />

    <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8" aria-hidden="true">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>

      <Inclever />
    </div>

    {/* ── Closing CTA ── */}
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <SectionGlow position="center" size={600} />
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
        <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 sm:p-12 text-center">
          <p className="font-mono text-[11px] text-primary tracking-[0.25em] uppercase mb-3">Start small</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
            See your own data's <span className="text-gradient-orange">readiness score</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
            We'll run an AI Readiness Assessment on one of your data assets and hand you the certificate, issued or
            withheld, with every finding named. Or let us show you PipelineIQ reading a platform like yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity glow-orange"
            >
              Request a readiness assessment <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-lg text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
            >
              Book a PipelineIQ walkthrough
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  </PageLayout>
);

export default Products;
