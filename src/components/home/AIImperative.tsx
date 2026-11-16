import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowRight, ChevronRight, Quote } from "lucide-react";

/*
 * Home page "The AI imperative, in numbers": Opportunity → Intent → Gap as
 * three connected cards. Each leads with one hero statistic (counting up when
 * numeric) and two supporting statistics. Every figure keeps its source link.
 */

interface Stat {
  num: string;
  desc: string;
  src: string;
  link: string;
}
interface Column {
  key: string;
  step: string;
  label: string;
  sub: string;
  tone: string; // HSL triple
  hero: Stat;
  rest: Stat[];
}

const COLUMNS: Column[] = [
  {
    key: "opportunity",
    step: "01",
    label: "The Opportunity",
    sub: "The prize is enormous.",
    tone: "152 60% 42%",
    hero: {
      num: "$15.7T",
      desc: "Projected AI contribution to global GDP by 2030.",
      src: "PwC, 2024",
      link: "https://www.pwc.com/gx/en/issues/analytics/assets/pwc-ai-analysis-sizing-the-prize-report.pdf",
    },
    rest: [
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
    step: "02",
    label: "The Intent",
    sub: "Enterprises are moving.",
    tone: "38 92% 50%",
    hero: {
      num: "78%",
      desc: "Of organizations now use AI in at least one business function.",
      src: "McKinsey, 2025",
      link: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    },
    rest: [
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
    step: "03",
    label: "The Gap",
    sub: "Most aren't ready.",
    tone: "0 72% 55%",
    hero: {
      num: "70–85%",
      desc: "Of AI projects fail to deliver expected business value.",
      src: "Industry Sources, 2025",
      link: "https://www.fullview.io/blog/ai-statistics",
    },
    rest: [
      {
        num: "23%",
        desc: "Of supply chain organizations have a formal AI strategy.",
        src: "Gartner, 2025",
        link: "https://www.gartner.com/en/newsroom/2025-06-11-gartner-survey-shows-just-23-percent-of-supply-chain-organizations-have-a-formal-ai-strategy",
      },
      {
        num: "1 in 5",
        desc: "Companies have mature AI governance in place.",
        src: "Deloitte, 2025",
        link: "https://www.deloitte.com/us/en/what-we-do/capabilities/applied-artificial-intelligence/content/state-of-ai-in-the-enterprise.html",
      },
    ],
  },
];

/** Counts the numeric part of strings like "$15.7T" or "78%" up from zero. */
const CountUp = ({ value, run }: { value: string; run: boolean }) => {
  const m = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(m && !reduce ? 0 : 1);
  useEffect(() => {
    if (!m || !run || reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setShown(1 - Math.pow(1 - p, 3));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [run, reduce]);
  if (!m || value.includes("–")) return <>{value}</>;
  const [, pre, num, post] = m;
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  return (
    <>
      {pre}
      {(parseFloat(num) * shown).toFixed(decimals)}
      {post}
    </>
  );
};

const AIImperative = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref}>
      <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {COLUMNS.map((col, i) => (
          <div key={col.key} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.12 }}
            style={{ "--tone": col.tone } as React.CSSProperties}
            className="group/col relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/80 shadow-sm"
          >
            {/* status accent */}
            <div className="absolute inset-x-0 top-0 h-1 bg-[hsl(var(--tone))]" />
            <div className="absolute -top-20 -right-16 h-44 w-44 rounded-full bg-[hsl(var(--tone)/0.12)] blur-3xl pointer-events-none" />

            <div className="relative p-5 lg:p-6 pb-4">
              <div className="flex items-center gap-2.5 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--tone))] opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--tone))]" />
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{col.step}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[hsl(var(--tone))]">{col.label}</span>
              </div>
              <h3 className="text-lg lg:text-xl font-semibold text-foreground tracking-tight">{col.sub}</h3>
            </div>

            {/* hero stat */}
            <a
              href={col.hero.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="group relative mx-5 lg:mx-6 rounded-xl border border-[hsl(var(--tone)/0.25)] bg-[hsl(var(--tone)/0.06)] p-4 hover:border-[hsl(var(--tone)/0.5)] transition-colors"
            >
              <p
                className={`text-4xl lg:text-5xl font-bold tracking-tight leading-none mb-2 tabular-nums ${
                  col.key === "gap" ? "bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent" : "text-gradient-orange"
                }`}
              >
                <CountUp value={col.hero.num} run={inView} />
              </p>
              <p className="text-sm text-foreground/85 leading-snug mb-3">{col.hero.desc}</p>
              <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                {col.hero.src} <ArrowUpRight size={11} />
              </span>
            </a>

            {/* supporting stats */}
            <div className="relative p-5 lg:p-6 pt-3 lg:pt-3 mt-1 divide-y divide-border/70">
              {col.rest.map((s) => (
                <a
                  key={s.num}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="group flex items-start gap-3 py-3 first:pt-2 last:pb-0"
                >
                  <span className="w-[5.25rem] shrink-0 whitespace-nowrap text-lg font-bold text-foreground tabular-nums leading-tight">{s.num}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs text-secondary-foreground leading-snug">{s.desc}</span>
                    <span className="mt-1 inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                      {s.src} <ArrowUpRight size={10} />
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
          {/* connector chevron to the next column */}
          {i < COLUMNS.length - 1 && (
            <span className="hidden lg:flex absolute -right-[22px] top-1/2 z-10 h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background shadow-md">
              <ChevronRight className="w-4 h-4 text-primary" />
            </span>
          )}
          </div>
        ))}
      </div>

      {/* Closing banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.35 }}
        className="relative mt-5 lg:mt-7 overflow-hidden rounded-2xl bg-[#0d0b0a] text-white px-5 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8"
      >
        <div className="absolute -left-10 -top-16 h-40 w-72 rounded-full bg-[hsl(25_100%_50%/0.25)] blur-3xl pointer-events-none" />
        <Quote className="relative hidden sm:block w-8 h-8 text-[hsl(25_100%_58%)] shrink-0" />
        <p className="relative flex-1 text-base sm:text-lg lg:text-xl font-semibold leading-snug">
          The gap between AI ambition and AI reality almost always starts with data infrastructure.{" "}
          <span className="text-gradient-orange">We close that gap and build everything on top of it.</span>
        </p>
        <Link
          to="/services"
          className="relative inline-flex shrink-0 items-center gap-2 self-start sm:self-auto rounded-lg bg-gradient-orange px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
        >
          How we close it <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
};

export default AIImperative;
