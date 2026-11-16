import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, ChevronRight } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import type { CaseStudy } from "@/data/caseStudies";
import CaseStudyMedia from "./CaseStudyMedia";

/*
 * The single hero used by every case study page. Always dark (both themes),
 * so the navbar's light variant stays legible: text on the left, the framed
 * duotone image on the right, and the outcome metrics along the bottom.
 */
interface Props {
  cs: CaseStudy;
  title: string;
  subtitle: string;
  onPrimaryCta: () => void;
}

const CaseStudyHero = ({ cs, title, subtitle, onPrimaryCta }: Props) => {
  const Icon = cs.icon;
  const stack = (cs.stack ?? "").split(",").map((s) => s.trim()).filter(Boolean);

  return (
    <section className="relative overflow-hidden bg-[#0b0908] text-white">
      {/* Grid + glows */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 30% 30%, black 20%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at 30% 30%, black 20%, transparent 75%)",
        }}
      />
      <div aria-hidden="true" className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-[hsl(25_100%_50%/0.18)] blur-[120px]" />
      <div aria-hidden="true" className="absolute -bottom-40 right-0 h-[420px] w-[420px] rounded-full bg-[hsl(35_100%_55%/0.12)] blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 sm:pt-32 pb-12">
        <nav className="flex items-center gap-1 text-xs text-white/50 mb-8" aria-label="Breadcrumb">
          <Link to="/case-studies" className="hover:text-[hsl(25_100%_60%)] transition-colors">
            Case studies
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-white/80">{cs.industry}</span>
        </nav>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 mb-6">
              <Icon className="w-3.5 h-3.5 text-[hsl(25_100%_60%)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">Case study · {cs.industry}</span>
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-5">{title}</h1>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed mb-7 max-w-xl">{subtitle}</p>
            {stack.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-8">
                {stack.map((t) => (
                  <span key={t} className="font-mono text-[11px] px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.04] text-white/75">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={onPrimaryCta}
                className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity glow-orange"
              >
                Read the story <ArrowDown className="w-4 h-4" />
              </button>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 rounded-lg text-sm font-medium text-white/90 hover:border-[hsl(25_100%_60%)] hover:text-white transition-colors"
              >
                Start a conversation <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-[28px] bg-gradient-to-br from-[hsl(25_100%_50%/0.35)] to-transparent blur-2xl" aria-hidden="true" />
            <div className="relative rounded-3xl p-1.5 bg-gradient-to-br from-white/20 via-white/5 to-white/10">
              <CaseStudyMedia src={cs.image} alt={cs.title} eager className="aspect-[4/3] rounded-[20px]" />
            </div>
          </motion.div>
        </div>

        {/* Outcome metrics */}
        {cs.metrics && cs.metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`mt-14 grid grid-cols-1 ${["sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3"][Math.min(cs.metrics.length, 3) - 1]} border-t border-white/10`}
          >
            {cs.metrics.map((m, i) => (
              <div key={m.label} className={`py-6 sm:px-6 ${i > 0 ? "border-t sm:border-t-0 sm:border-l border-white/10" : ""} ${i === 0 ? "sm:pl-0" : ""}`}>
                <p className="text-3xl sm:text-4xl font-bold tracking-tight text-gradient-orange leading-none mb-2">
                  {typeof m.value === "number" ? (
                    <AnimatedCounter end={m.value} prefix={m.prefix || ""} suffix={m.suffix || ""} />
                  ) : (
                    <>
                      {m.prefix || ""}
                      {m.value}
                      {m.suffix || ""}
                    </>
                  )}
                </p>
                <p className="text-sm text-white/60">{m.label}</p>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CaseStudyHero;
