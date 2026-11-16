import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

/*
 * Small looping "live" previews of each product's core idea, used on the
 * home page products slide and the /products overview. Illustrative only.
 */

/* ── PipelineIQ: live triage console ──
 * Failures stream in from every tool, then collapse into a few root-cause
 * signatures with one alert each. Loops while on screen.
 */
const STREAM = [
  ["fct_order_lines", "FAILED_READ_FILE"],
  ["stg_crm_contacts", "Runtime offline"],
  ["dim_customer", "FAILED_READ_FILE"],
  ["stg_quotes", "Runtime offline"],
  ["fct_sales", "Schema mismatch"],
  ["stg_invoice_lines", "Runtime offline"],
  ["dim_product", "FAILED_READ_FILE"],
  ["stg_parts", "Schema mismatch"],
];
const SIGS = [
  { label: "Integration runtime offline", n: 105, w: 100 },
  { label: "File overwritten mid-read", n: 42, w: 42 },
  { label: "Schema mismatch on load", n: 18, w: 18 },
];

export const PipelinePreview = ({ run }: { run: boolean }) => {
  const [tick, setTick] = useState(0);
  const [grouped, setGrouped] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!run || reduce) return;
    const t = setTimeout(
      () => {
        if (grouped) {
          setGrouped(false);
          setTick(0);
        } else if (tick >= 14) setGrouped(true);
        else setTick((v) => v + 1);
      },
      grouped ? 4200 : 230,
    );
    return () => clearTimeout(t);
  }, [run, tick, grouped, reduce]);

  const isGrouped = reduce || grouped;
  const failures = isGrouped ? 565 : Math.min(565, Math.round((tick / 14) * 565));
  const rows = Array.from({ length: Math.min(tick, 5) }, (_, i) => {
    const n = tick - i;
    return { id: n, table: STREAM[n % STREAM.length][0], err: STREAM[n % STREAM.length][1], ts: `02:14:${String(9 + n * 2).padStart(2, "0")}` };
  });

  return (
    <div className="rounded-2xl border border-border bg-[#0d0b0a] text-white overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-white/10">
        <span className="font-mono text-[10px] text-white/55">pipelineiq · TEST</span>
        <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] ${isGrouped ? "text-emerald-400" : "text-red-400"}`}>
          <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isGrouped ? "bg-emerald-400" : "bg-red-400"}`} />
          {isGrouped ? "grouped" : "ingesting"}
        </span>
      </div>
      <div className="px-3.5 pt-3 flex items-baseline gap-2">
        <span className="text-2xl font-bold tabular-nums text-white">{failures}</span>
        <span className="text-[11px] text-white/55">failures</span>
        <AnimatePresence>
          {isGrouped && (
            <motion.span initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} className="flex items-baseline gap-2">
              <ArrowRight className="w-3.5 h-3.5 text-[hsl(30_100%_60%)] self-center" />
              <span className="text-2xl font-bold tabular-nums text-gradient-orange">29</span>
              <span className="text-[11px] text-white/55">signatures</span>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className="p-3.5 pt-2.5 h-[150px] overflow-hidden">
        <AnimatePresence mode="wait">
          {isGrouped ? (
            <motion.div key="g" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {SIGS.map((sg, i) => (
                <div key={sg.label}>
                  <div className="flex justify-between text-[10px] sm:text-[11px] mb-1">
                    <span className="text-white/85">{sg.label}</span>
                    <span className="font-mono text-white/50">×{sg.n}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <motion.div className="h-full rounded-full bg-gradient-orange" initial={{ width: 0 }} animate={{ width: `${sg.w}%` }} transition={{ duration: 0.6, delay: i * 0.12 }} />
                  </div>
                </div>
              ))}
              <p className="pt-1 text-[10px] text-emerald-400 font-mono">+26 smaller · 3 alerts, not 368</p>
            </motion.div>
          ) : (
            <motion.div key="s" exit={{ opacity: 0 }} className="space-y-1 font-mono text-[10px] sm:text-[11px]">
              {rows.map((r) => (
                <motion.div key={r.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }} className="flex items-center gap-2 rounded bg-white/[0.04] px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400 shrink-0" />
                  <span className="text-white/35">{r.ts}</span>
                  <span className="text-white/80 truncate">{r.table}</span>
                  <span className="ml-auto text-red-300 shrink-0">{r.err}</span>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ── Inclever: live Teams thread ──
 * Cycles three real outcomes: a governed answer, a held answer, a refusal.
 */
type G = "pass" | "fail" | "skip";
const SCENES: { q: string; gates: G[]; tone: "good" | "hold" | "refuse"; a: string }[] = [
  { q: "How did we do on margin last month?", gates: ["pass", "pass", "pass"], tone: "good", a: "38.4% gross margin · vouched for by the latest audit" },
  { q: "Total sales across all regions?", gates: ["pass", "pass", "fail"], tone: "hold", a: "Held: amount column mixes currencies · routed to data owner (24h)" },
  { q: "Break down margin by plant", gates: ["pass", "fail", "skip"], tone: "refuse", a: "“Plant” isn't defined yet · routed to the definitions owner (72h)" },
];
const GATES = ["Entitlement", "Answerability", "Assurance"];
const gateCls: Record<G, string> = {
  pass: "border-emerald-500/40 bg-emerald-500/10 text-emerald-500",
  fail: "border-red-500/40 bg-red-500/10 text-red-500",
  skip: "border-border text-muted-foreground/60",
};
const toneCls = {
  good: "border-emerald-500/40 bg-emerald-500/5",
  hold: "border-amber-500/40 bg-amber-500/5",
  refuse: "border-primary/40 bg-primary/5",
};

export const IncleverPreview = ({ run }: { run: boolean }) => {
  const [scene, setScene] = useState(0);
  const [t, setT] = useState(0); // 0 typing, 1-3 gates, 4 answer
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!run || reduce) return;
    const id = setTimeout(
      () => {
        if (t >= 4) {
          setScene((x) => (x + 1) % SCENES.length);
          setT(0);
        } else setT((v) => v + 1);
      },
      t === 4 ? 2800 : t === 0 ? 700 : 520,
    );
    return () => clearTimeout(id);
  }, [run, t, reduce]);
  const v = reduce ? 4 : t;
  const sc = SCENES[scene];

  return (
    <div className="rounded-2xl border border-border bg-background/70 overflow-hidden">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border">
        <span className="text-[10px] font-medium text-foreground"># finance-questions</span>
        <div className="flex gap-1">
          {SCENES.map((_, i) => (
            <span key={i} className={`h-1.5 rounded-full transition-all ${i === scene ? "w-4 bg-primary" : "w-1.5 bg-muted-foreground/30"}`} />
          ))}
        </div>
      </div>
      <div className="p-3.5 h-[186px] space-y-2.5">
        <AnimatePresence mode="wait">
          <motion.div key={scene} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="space-y-2.5">
            <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-primary text-primary-foreground px-3 py-1.5 text-xs">{sc.q}</p>
            <div className="flex flex-wrap gap-1.5">
              {GATES.map((g, i) => {
                const state: G | undefined = v > i ? sc.gates[i] : undefined;
                return (
                  <motion.span
                    key={g}
                    animate={state === "fail" && !reduce ? { x: [0, -3, 3, -2, 0] } : { x: 0 }}
                    className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors duration-300 ${state ? gateCls[state] : "border-border text-muted-foreground"}`}
                  >
                    {state === "pass" ? <Check className="w-3 h-3" /> : state === "fail" ? <span className="font-bold">✕</span> : <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />} {g}
                  </motion.span>
                );
              })}
            </div>
            {v === 0 && (
              <span className="inline-flex gap-1 px-3 py-2 rounded-xl bg-muted">
                {[0, 1, 2].map((i) => (
                  <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </span>
            )}
            <AnimatePresence>
              {v >= 4 && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`w-fit max-w-full rounded-xl rounded-bl-sm border px-3 py-1.5 text-xs text-foreground ${toneCls[sc.tone]}`}>
                  {sc.a}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

