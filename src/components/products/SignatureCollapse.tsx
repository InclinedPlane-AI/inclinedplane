import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { DemoTag } from "./shared";

/*
 * "Noise to signal" demo for PipelineIQ's error index.
 * Stage 0: every failure from every tool, scattered.
 * Stage 1: cascaded parent failures fade out, leaving root causes.
 * Stage 2: root causes collapse into error signatures.
 * Purely illustrative: 80 dots stand in for the real counts shown in the stat row.
 */

const SIGNATURES = [
  { label: "File overwritten mid-read", size: 14 },
  { label: "Integration runtime offline", size: 10 },
  { label: "Schema mismatch on load", size: 8 },
  { label: "Source connection timeout", size: 7 },
  { label: "Duplicate key in merge", size: 6 },
  { label: "Permission denied on lake path", size: 5 },
  { label: "Notebook out of memory", size: 4 },
  { label: "+22 smaller signatures", size: 2 },
];
const CASCADED = 24;
const SOURCES = ["Orchestrator", "Run log", "Compute"] as const;
const SOURCE_COLORS = ["hsl(25 100% 55%)", "hsl(35 100% 64%)", "hsl(200 70% 60%)"];

const STAGES = [
  { stat: "565", unit: "failures", caption: "Every failure from three different tools, each holding one piece of the story." },
  { stat: "394", unit: "root causes", caption: "Parents that failed only because a child did are hidden. One broken notebook is one problem, not three." },
  { stat: "29", unit: "error signatures", caption: "IDs, paths and numbers are stripped from each error, so the same fault groups together across runs." },
];

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Dot {
  id: number;
  root: boolean;
  sig: number; // -1 for cascaded
  k: number; // index inside its signature cluster
  source: number;
  sx: number; // scattered position, %
  sy: number;
}

const SignatureCollapse = () => {
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  const dots = useMemo<Dot[]>(() => {
    const rand = mulberry32(7);
    const out: Dot[] = [];
    let id = 0;
    SIGNATURES.forEach((s, sig) => {
      for (let k = 0; k < s.size; k++) {
        out.push({ id: id++, root: true, sig, k, source: Math.floor(rand() * 3), sx: 0, sy: 0 });
      }
    });
    for (let i = 0; i < CASCADED; i++) {
      out.push({ id: id++, root: false, sig: -1, k: 0, source: Math.floor(rand() * 3), sx: 0, sy: 0 });
    }
    // shuffle so the scatter mixes roots and cascades
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    out.forEach((d) => {
      d.sx = 4 + rand() * 92;
      d.sy = 6 + rand() * 82;
    });
    return out;
  }, []);

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const t = setTimeout(() => setStage((s) => (s + 1) % 3), stage === 2 ? 4200 : 3000);
    return () => clearTimeout(t);
  }, [auto, inView, reduce, stage]);

  const pick = (s: number) => {
    setAuto(false);
    setStage(s);
  };

  // Cluster centres: 4 x 2 grid
  const centre = (sig: number) => ({ left: 12.5 + (sig % 4) * 25, top: 30 + Math.floor(sig / 4) * 46 });

  return (
    <div ref={ref} className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1" role="tablist" aria-label="Error index stages">
          {["All failures", "Root causes", "Signatures"].map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={stage === i}
              onClick={() => pick(i)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                stage === i ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <DemoTag />
      </div>

      {/* Stage stat */}
      <div className="flex items-baseline gap-3 mb-1">
        <motion.span
          key={stage}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-gradient-orange tabular-nums"
        >
          {STAGES[stage].stat}
        </motion.span>
        <span className="text-sm sm:text-base text-foreground font-medium">{STAGES[stage].unit}</span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 min-h-[2.5rem]">{STAGES[stage].caption}</p>

      {/* Field */}
      <div className="relative h-[300px] sm:h-[320px] rounded-xl bg-background/60 border border-border overflow-hidden">
        {dots.map((d) => {
          let left = d.sx;
          let top = d.sy;
          let x = 0;
          let y = 0;
          let opacity = 1;
          let scale = 1;
          if (stage >= 1 && !d.root) {
            opacity = 0.08;
            scale = 0.6;
          }
          if (stage === 2 && d.root) {
            const c = centre(d.sig);
            left = c.left;
            top = c.top;
            const a = d.k * 2.39996;
            const r = 5.2 * Math.sqrt(d.k);
            x = Math.cos(a) * r;
            y = Math.sin(a) * r - 10;
          }
          return (
            <motion.span
              key={d.id}
              className="absolute h-2 w-2 -ml-1 -mt-1 rounded-full"
              style={{ background: SOURCE_COLORS[d.source] }}
              animate={{ left: `${left}%`, top: `${top}%`, x, y, opacity, scale }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 70, damping: 16, mass: 0.8 }}
            />
          );
        })}

        {/* Cluster labels */}
        {SIGNATURES.map((s, i) => {
          const c = centre(i);
          return (
            <motion.div
              key={s.label}
              className="absolute -translate-x-1/2 w-[23%] text-center pointer-events-none"
              style={{ left: `${c.left}%`, top: `calc(${c.top}% + 26px)` }}
              animate={{ opacity: stage === 2 ? 1 : 0 }}
              transition={{ duration: 0.4, delay: stage === 2 ? 0.5 : 0 }}
            >
              <p className="text-[10px] sm:text-[11px] leading-tight text-foreground/90 font-medium">{s.label}</p>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-muted-foreground">
        {SOURCES.map((s, i) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: SOURCE_COLORS[i] }} />
            {s}
          </span>
        ))}
        <span className="sm:ml-auto">Counts from the first deployment. Dots are illustrative.</span>
      </div>
    </div>
  );
};

export default SignatureCollapse;
