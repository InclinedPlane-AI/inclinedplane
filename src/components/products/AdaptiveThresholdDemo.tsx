import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { DemoTag } from "./shared";

/*
 * Why fixed thresholds fail. Three tables with very different normal run
 * times; the last run of two of them is genuinely slow. Fixed mode applies one
 * threshold to all; adaptive mode uses PipelineIQ's Slow rule:
 * slow when the latest run is over 2x the table's own median and over 5 minutes.
 */

const TABLES = [
  { name: "dim_customer", runs: [4, 4, 5, 4, 3, 4, 4, 5, 4, 4, 4, 5, 4, 19], anomaly: true },
  { name: "fct_sales", runs: [52, 58, 55, 61, 54, 57, 53, 56, 60, 55, 54, 58, 57, 62], anomaly: false },
  { name: "stg_orders", runs: [12, 11, 13, 12, 12, 14, 11, 12, 13, 12, 12, 11, 12, 31], anomaly: true },
];

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const AdaptiveThresholdDemo = () => {
  const [mode, setMode] = useState<"fixed" | "adaptive">("fixed");
  const [fixed, setFixed] = useState(30);

  const rows = useMemo(
    () =>
      TABLES.map((t) => {
        const base = t.runs.slice(0, -1);
        const med = median(base);
        const threshold = mode === "fixed" ? fixed : Math.max(5, 2 * med);
        const falseAlarms = base.filter((r) => r > threshold).length + (!t.anomaly && t.runs[t.runs.length - 1] > threshold ? 1 : 0);
        const latest = t.runs[t.runs.length - 1];
        const caught = t.anomaly && latest > threshold;
        const missed = t.anomaly && latest <= threshold;
        return { ...t, med, threshold, falseAlarms, caught, missed };
      }),
    [mode, fixed],
  );

  const totalFalse = rows.reduce((n, r) => n + r.falseAlarms, 0);
  const totalMissed = rows.filter((r) => r.missed).length;

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1" role="tablist" aria-label="Threshold mode">
          {(
            [
              ["fixed", "One fixed threshold"],
              ["adaptive", "PipelineIQ: adaptive"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={mode === k}
              onClick={() => setMode(k)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                mode === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <DemoTag />
      </div>

      <div className={`mb-5 transition-opacity ${mode === "fixed" ? "opacity-100" : "opacity-40 pointer-events-none"}`}>
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-muted-foreground">Alert when any run takes longer than</span>
          <span className="font-mono font-semibold text-foreground">{fixed} min</span>
        </div>
        <Slider value={[fixed]} min={5} max={90} step={1} onValueChange={(v) => setFixed(v[0])} aria-label="Fixed threshold in minutes" />
        <p className="text-[11px] text-muted-foreground mt-2">Drag it. There's no single number that works for every table.</p>
      </div>
      {mode === "adaptive" && (
        <p className="text-xs text-muted-foreground -mt-3 mb-5">
          Each table is judged against itself: slow when the latest run is over <span className="text-foreground">2× its own 14-day median</span> and over 5 minutes.
        </p>
      )}

      <div className="space-y-3">
        {rows.map((r) => {
          const scale = Math.max(...r.runs, r.threshold) * 1.08;
          const linePct = (r.threshold / scale) * 100;
          const verdict = r.caught
            ? { t: "Slow run caught", c: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" }
            : r.missed
              ? { t: "Slow run missed", c: "bg-red-500/10 text-red-500 border-red-500/30" }
              : r.falseAlarms
                ? { t: `${r.falseAlarms} false alarms`, c: "bg-amber-500/10 text-amber-500 border-amber-500/30" }
                : { t: "Quiet, correctly", c: "bg-muted text-muted-foreground border-border" };
          return (
            <div key={r.name} className="rounded-xl border border-border bg-background/60 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <p className="font-mono text-xs text-foreground">
                  {r.name} <span className="text-muted-foreground">· usually {r.med} min</span>
                </p>
                <span className={`px-2 py-0.5 rounded border text-[10px] font-medium ${verdict.c}`}>{verdict.t}</span>
              </div>
              <div className="relative h-16 flex items-end gap-[3px]">
                {r.runs.map((v, i) => {
                  const over = v > r.threshold;
                  const isLast = i === r.runs.length - 1;
                  return (
                    <motion.div
                      key={i}
                      className={`flex-1 rounded-sm ${over ? (isLast && r.anomaly ? "bg-emerald-500" : "bg-amber-500") : isLast && r.anomaly ? "bg-red-500/70" : "bg-primary/30"}`}
                      animate={{ height: `${(v / scale) * 100}%` }}
                      transition={{ duration: 0.3 }}
                      title={`${v} min`}
                    />
                  );
                })}
                <motion.div className="absolute left-0 right-0 border-t border-dashed border-foreground/60" animate={{ bottom: `${linePct}%` }} transition={{ type: "spring", stiffness: 200, damping: 25 }}>
                  <span className="absolute right-0 -top-4 font-mono text-[9px] text-foreground/80">{Math.round(r.threshold)} min</span>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className={`rounded-xl border p-3 text-center ${totalFalse ? "border-amber-500/40 bg-amber-500/5" : "border-border"}`}>
          <p className="text-2xl font-bold tabular-nums text-foreground">{totalFalse}</p>
          <p className="text-[11px] text-muted-foreground">false alarms in 14 nights</p>
        </div>
        <div className={`rounded-xl border p-3 text-center ${totalMissed ? "border-red-500/40 bg-red-500/5" : "border-border"}`}>
          <p className="text-2xl font-bold tabular-nums text-foreground">{totalMissed}</p>
          <p className="text-[11px] text-muted-foreground">genuinely slow runs missed</p>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveThresholdDemo;
