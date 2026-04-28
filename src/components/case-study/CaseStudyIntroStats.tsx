import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

interface IntroStat {
  value: number | string;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface CaseStudyIntroStatsProps {
  intro: string;
  stats: IntroStat[];
  referenceLabel?: string;
  referenceUrl?: string;
}

const CaseStudyIntroStats = ({
  intro,
  stats,
  referenceLabel,
  referenceUrl,
}: CaseStudyIntroStatsProps) => {
  return (
    <section className="relative w-full bg-background">
      {/* Glass panel sits cleanly below the hero with generous breathing room */}
      <div className="flex items-center justify-center px-6 lg:px-8 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden
                     bg-white/5 backdrop-blur-2xl backdrop-saturate-150
                     border border-white/10
                     shadow-[0_20px_80px_-20px_rgba(0,0,0,0.5)]
                     p-8 sm:p-12 lg:p-16"
        >
          {/* Intro paragraph */}
          <p className="text-xl sm:text-2xl lg:text-3xl text-foreground/90 font-light leading-snug max-w-4xl mx-auto text-center">
            {intro}
          </p>

          {/* Stats row with vertical dividers */}
          <div
            className={`mt-14 sm:mt-20 grid grid-cols-1 gap-10 sm:gap-0 max-w-4xl mx-auto ${
              stats.length === 2
                ? "sm:grid-cols-2"
                : stats.length === 3
                ? "sm:grid-cols-3"
                : "sm:grid-cols-4"
            }`}
          >
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={`text-center px-4 ${
                  idx > 0 ? "sm:border-l sm:border-white/15" : ""
                }`}
              >
                <p className="text-5xl sm:text-6xl lg:text-7xl font-light text-foreground tracking-tight leading-none">
                  {typeof s.value === "number" ? (
                    <AnimatedCounter
                      end={s.value}
                      prefix={s.prefix || ""}
                      suffix={s.suffix || ""}
                    />
                  ) : (
                    <>
                      {s.prefix || ""}
                      {s.value}
                      {s.suffix || ""}
                    </>
                  )}
                </p>
                <p className="mt-4 text-sm sm:text-base text-foreground/70 font-light">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Reference link */}
          {referenceUrl && (
            <div className="mt-14 pt-6 border-t border-white/10 flex justify-center">
              <a
                href={referenceUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-foreground/60 hover:text-primary transition-colors"
              >
                <span className="uppercase tracking-widest">Reference</span>
                <span className="text-foreground/40">·</span>
                <span>{referenceLabel || referenceUrl}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudyIntroStats;