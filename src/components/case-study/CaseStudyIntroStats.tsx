import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll over a tall container so the panel rises slowly over the hero.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Panel slides up from below the viewport and overlays the sticky hero.
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["60%", "0%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5], [0, 0.6, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.96, 1]);

  return (
    // Tall scroll container — defines the scroll distance over which the panel rises.
    <section ref={containerRef} className="relative w-full h-[180vh] -mt-[88vh]">
      {/* Sticky stage that pins the overlay panel within the hero viewport */}
      <div className="sticky top-0 h-screen w-full flex items-end justify-center pointer-events-none">
        <motion.div
          style={{ y, opacity, scale }}
          className="pointer-events-auto relative w-[92%] max-w-6xl mx-auto rounded-t-[2.5rem] sm:rounded-t-[3rem] overflow-hidden
                     bg-white/5 backdrop-blur-2xl backdrop-saturate-150
                     border border-white/15 border-b-0
                     shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.6)]
                     p-8 sm:p-12 lg:p-16
                     min-h-[70vh] flex flex-col justify-center"
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