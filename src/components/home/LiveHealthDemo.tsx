import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Activity, CheckCircle2, Zap } from "lucide-react";

/*
 * "Why this matters" live demo for the home page. Phase "broken": alerts
 * stream into the estate log while the health scores flicker at critical
 * levels. Phase "fixing": each visible alert is resolved with the fix and the
 * layer or product that delivers it, and the scores climb. Phase "healthy":
 * all green, then the loop restarts. Visitors can flip it manually.
 * Illustrative only.
 */

type Level = "ERR" | "WARN" | "INFO";
interface Alert {
  level: Level;
  text: string;
  fix: string;
  by: string;
}

const POOL: Alert[] = [
  { level: "WARN", text: "Pipeline failed: stale data, 47min lag", fix: "Freshness SLA alerting with automatic retry", by: "Reliability Layer" },
  { level: "ERR", text: "Model drift detected, no retraining trigger", fix: "Drift monitor triggers retraining", by: "Predictive Layer" },
  { level: "WARN", text: "Dashboard refresh: manual, weekly cadence", fix: "Automated refresh, real-time KPIs", by: "Analytics Layer" },
  { level: "ERR", text: "No observability, blind spot in pipeline health", fix: "Every load watched, root causes grouped", by: "PipelineIQ" },
  { level: "INFO", text: "Business asking: 'Can we predict demand?'", fix: "Demand forecast running in production", by: "Predictive Layer" },
  { level: "ERR", text: "AI agent answered from unaudited data", fix: "Readiness audit gates every AI answer", by: "Inclever" },
  { level: "ERR", text: "Duplicate keys in orders table", fix: "Data quality rules block bad loads", by: "Reliability Layer" },
  { level: "WARN", text: "ERP extract missed its nightly window", fix: "Orchestrated loads with SLA alerts", by: "Data Architecture" },
  { level: "ERR", text: "Sales and Finance report different revenue", fix: "One governed metric definition", by: "Analytics Layer" },
];

const METRICS = [
  { label: "Data Freshness", low: 34, high: 97 },
  { label: "Pipeline Reliability", low: 52, high: 99 },
  { label: "Model Accuracy", low: 41, high: 94 },
  { label: "Observability Coverage", low: 18, high: 100 },
  { label: "AI Readiness", low: 12, high: 92 },
];

const VISIBLE = 6;
type Phase = "broken" | "fixing" | "healthy";

const levelCls: Record<Level, string> = {
  ERR: "text-red-500 border-red-500/60",
  WARN: "text-amber-500 border-amber-500/60",
  INFO: "text-muted-foreground border-muted-foreground/50",
};

const tone = (v: number) => (v >= 85 ? "hsl(152 60% 42%)" : v >= 55 ? "hsl(38 92% 50%)" : "hsl(0 72% 55%)");

const stamp = (n: number) => {
  const t = 2 * 3600 + 14 * 60 + 7 + n * 13;
  const h = Math.floor(t / 3600) % 24;
  const m = Math.floor((t % 3600) / 60);
  const s = t % 60;
  return [h, m, s].map((x) => String(x).padStart(2, "0")).join(":");
};

const LiveHealthDemo = () => {
  const [phase, setPhase] = useState<Phase>("broken");
  const [auto, setAuto] = useState(true);
  const [count, setCount] = useState(3); // alerts emitted so far
  const [resolved, setResolved] = useState(0); // how many visible alerts are fixed
  const [jitter, setJitter] = useState<number[]>(METRICS.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();

  const visible = useMemo(() => {
    const out: (Alert & { id: number })[] = [];
    for (let n = Math.max(0, count - VISIBLE); n < count; n++) out.push({ ...POOL[n % POOL.length], id: n });
    return out;
  }, [count]);

  // Phase engine
  useEffect(() => {
    if (!inView || reduce) return;
    let t: ReturnType<typeof setTimeout> | undefined;
    if (phase === "broken") {
      t = setTimeout(() => {
        if (auto && count >= 10) setPhase("fixing");
        else setCount((c) => c + 1);
      }, 1100);
    } else if (phase === "fixing") {
      t = setTimeout(() => {
        if (resolved >= visible.length) setPhase("healthy");
        else setResolved((r) => r + 1);
      }, 650);
    } else if (phase === "healthy" && auto) {
      t = setTimeout(() => {
        setResolved(0);
        setCount(3);
        setPhase("broken");
      }, 5000);
    }
    return () => clearTimeout(t);
  }, [phase, count, resolved, visible.length, auto, inView, reduce]);

  // Score flicker while broken
  useEffect(() => {
    if (phase !== "broken" || !inView || reduce) return;
    const id = setInterval(() => setJitter(METRICS.map(() => Math.round((Math.random() - 0.5) * 12))), 1200);
    return () => clearInterval(id);
  }, [phase, inView, reduce]);

  const progress = phase === "broken" ? 0 : phase === "healthy" ? 1 : resolved / Math.max(1, visible.length);
  const values = METRICS.map((m, i) =>
    Math.max(3, Math.min(100, Math.round(m.low + (m.high - m.low) * progress + (phase === "broken" ? jitter[i] : 0)))),
  );
  const overall = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const status = overall >= 85 ? "AI-ready" : overall >= 55 ? "Recovering" : "Critical";

  const goBroken = () => {
    setAuto(false);
    setResolved(0);
    setCount(6);
    setPhase("broken");
  };
  const goFixed = () => {
    setAuto(false);
    if (phase === "broken") {
      setResolved(0);
      setPhase("fixing");
    }
  };

  const R = 34;
  const C = 2 * Math.PI * R;

  return (
    <div ref={ref} className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4 sm:gap-6 items-stretch">
      {/* Estate log */}
      <div className="rounded-2xl border border-border bg-[#0d0b0a] text-white overflow-hidden flex flex-col shadow-xl">
        <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="ml-2 font-mono text-[10px] text-white/50">estate.log</span>
          </div>
          <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] ${phase === "healthy" ? "text-emerald-400" : phase === "fixing" ? "text-amber-400" : "text-red-400"}`}>
            <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${phase === "healthy" ? "bg-emerald-400" : phase === "fixing" ? "bg-amber-400" : "bg-red-400"}`} />
            {phase === "broken" ? "LIVE · your estate today" : phase === "fixing" ? "APPLYING FIXES" : "ALL SYSTEMS HEALTHY"}
          </span>
        </div>
        <div className="flex-1 p-3 sm:p-4 space-y-1.5 font-mono text-[10px] sm:text-[12px] min-h-[290px]">
          <AnimatePresence initial={false} mode="popLayout">
            {visible.map((a, i) => {
              const fixed = phase !== "broken" && i < (phase === "healthy" ? visible.length : resolved);
              return (
                <motion.div
                  key={a.id}
                  layout
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-md border-l-2 px-3 py-1.5 transition-colors duration-300 ${
                    fixed ? "border-emerald-400/70 bg-emerald-500/10" : `${levelCls[a.level]} bg-white/[0.03]`
                  }`}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {fixed ? (
                      <motion.div key="fixed" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-white/35">{stamp(a.id + 40)}</span>
                        <span className="text-emerald-400">[FIXED]</span>
                        <span className="text-white/90">{a.fix}</span>
                        <span className="text-[9px] sm:text-[10px] text-[hsl(30_100%_60%)]">· {a.by}</span>
                      </motion.div>
                    ) : (
                      <motion.div key="raw" exit={{ opacity: 0 }} className="flex flex-wrap items-baseline gap-x-2">
                        <span className="text-white/35">{stamp(a.id)}</span>
                        <span>[{a.level}]</span>
                        <span className="text-white/80">{a.text}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-white/10 text-[10px] sm:text-xs">
          <span className="text-white/50 font-mono">
            {phase === "broken" ? `${count} alerts · 0 owners` : `${phase === "healthy" ? visible.length : resolved}/${visible.length} resolved`}
          </span>
          <div className="flex gap-1 rounded-lg bg-white/[0.06] p-0.5" role="tablist" aria-label="Estate state">
            <button
              role="tab"
              aria-selected={phase === "broken"}
              onClick={goBroken}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${phase === "broken" ? "bg-red-500/80 text-white" : "text-white/60 hover:text-white"}`}
            >
              Without
            </button>
            <button
              role="tab"
              aria-selected={phase !== "broken"}
              onClick={goFixed}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-colors ${phase !== "broken" ? "bg-gradient-orange text-white" : "text-white/60 hover:text-white"}`}
            >
              <Zap className="w-3 h-3" /> With InclinedPlane
            </button>
          </div>
        </div>
      </div>

      {/* Health score */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative h-20 w-20 shrink-0">
            <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
              <circle cx="40" cy="40" r={R} fill="none" strokeWidth="7" className="stroke-muted" />
              <motion.circle
                cx="40"
                cy="40"
                r={R}
                fill="none"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray={C}
                animate={{ strokeDashoffset: C * (1 - overall / 100), stroke: tone(overall) }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xl font-bold tabular-nums" style={{ color: tone(overall) }}>
              {overall}
            </span>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-muted-foreground">Pipeline Health Score</p>
            <motion.p key={status} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-lg font-bold" style={{ color: tone(overall) }}>
              {status}
            </motion.p>
          </div>
        </div>
        <div className="space-y-3 flex-1">
          {METRICS.map((m, i) => (
            <div key={m.label}>
              <div className="flex justify-between text-[11px] sm:text-sm mb-1">
                <span className="text-secondary-foreground">{m.label}</span>
                <span className="font-mono tabular-nums transition-colors duration-500" style={{ color: tone(values[i]) }}>
                  {values[i]}%
                </span>
              </div>
              <div className="h-1.5 rounded-full surface-3 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  animate={{ width: `${values[i]}%`, backgroundColor: tone(values[i]) }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-[10px] sm:text-xs font-mono flex items-center gap-2" style={{ color: tone(overall) }}>
            {overall >= 85 ? <CheckCircle2 size={12} /> : <Activity size={12} />}
            {overall >= 85
              ? "Overall: healthy. Infrastructure AI-ready"
              : overall >= 55
                ? "Overall: recovering. Fixes rolling out"
                : "Overall: critical. Infrastructure not AI-ready"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveHealthDemo;
