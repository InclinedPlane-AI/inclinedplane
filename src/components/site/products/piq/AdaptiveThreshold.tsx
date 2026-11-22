/**
 * Why fixed thresholds fail. Three tables with very different normal run
 * times; the latest run of two of them is genuinely slow. Fixed mode applies
 * one threshold to all; adaptive mode applies PipelineIQ's Slow rule: slow
 * when the latest run is over 2× the table's own median (and over 5 minutes).
 * Illustrative SAMPLE DATA.
 */
import { useMemo, useState } from "react";
import { DemoShell, Segmented } from "../demoKit";
import { cn } from "@/lib/utils";

const tables = [
  { name: "dim_customer", runs: [4, 4, 5, 4, 3, 4, 4, 5, 4, 4, 4, 5, 4, 19], anomaly: true },
  { name: "fct_sales", runs: [52, 58, 55, 61, 54, 57, 53, 56, 60, 55, 54, 58, 57, 62], anomaly: false },
  { name: "stg_orders", runs: [12, 11, 13, 12, 12, 14, 11, 12, 13, 12, 12, 11, 12, 31], anomaly: true },
];

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

export function AdaptiveThreshold() {
  const [mode, setMode] = useState<"fixed" | "adaptive">("fixed");
  const [fixed, setFixed] = useState(30);

  const rows = useMemo(
    () =>
      tables.map((t) => {
        const base = t.runs.slice(0, -1);
        const latest = t.runs[t.runs.length - 1];
        const med = median(base);
        const threshold = mode === "fixed" ? fixed : Math.max(5, 2 * med);
        const falseAlarms = base.filter((r) => r > threshold).length + (!t.anomaly && latest > threshold ? 1 : 0);
        return { ...t, med, threshold, latest, falseAlarms, caught: t.anomaly && latest > threshold, missed: t.anomaly && latest <= threshold };
      }),
    [mode, fixed],
  );
  const totals = {
    caught: rows.filter((r) => r.caught).length,
    missed: rows.filter((r) => r.missed).length,
    noise: rows.reduce((n, r) => n + r.falseAlarms, 0),
  };

  return (
    <DemoShell title="Run time, last 14 nights (minutes)" bodyClass="p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Segmented<"fixed" | "adaptive">
          label="Threshold type"
          value={mode}
          onChange={setMode}
          options={[
            ["fixed", "One fixed threshold"],
            ["adaptive", "Each table’s own history"],
          ]}
        />
        {mode === "fixed" && (
          <label className="flex items-center gap-3 text-[13.5px] text-ip-body">
            Alert above
            <input type="range" min={6} max={70} value={fixed} onChange={(e) => setFixed(Number(e.target.value))} className="w-[120px] accent-[#F47920]" />
            <span className="w-[52px] font-mono text-black">{fixed} min</span>
          </label>
        )}
      </div>

      <div className="space-y-4">
        {rows.map((r) => {
          const max = Math.max(...r.runs, r.threshold) * 1.1;
          return (
            <div key={r.name}>
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-[13px] text-black">{r.name}</span>
                <span className="text-[12.5px] text-ip-muted">
                  median {r.med} · threshold {Math.round(r.threshold)}
                  {r.caught && <span className="ml-2 rounded bg-black px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-white">Caught</span>}
                  {r.missed && <span className="ml-2 rounded bg-[#fef3f2] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-[#b42318]">Missed</span>}
                  {r.falseAlarms > 0 && (
                    <span className="ml-2 rounded bg-ip-orange-tint px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em] text-ip-orange-ink">{r.falseAlarms} false alarms</span>
                  )}
                </span>
              </div>
              <div className="relative flex h-[56px] items-end gap-[3px] rounded border border-ip-rule bg-ip-grey/50 px-1.5 pt-1.5">
                {r.runs.map((v, i) => {
                  const last = i === r.runs.length - 1;
                  const over = v > r.threshold;
                  return (
                    <span
                      key={i}
                      title={`${v} min`}
                      className={cn("flex-1 rounded-t-[2px] transition-colors duration-300", over ? (last && r.anomaly ? "bg-black" : "bg-ip-orange") : last ? "bg-ip-rule-dashed" : "bg-ip-rule-strong")}
                      style={{ height: `${(v / max) * 100}%` }}
                    />
                  );
                })}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 border-t-2 border-dashed border-[#b42318] transition-all duration-300"
                  style={{ bottom: `${(r.threshold / max) * 100}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <dl className="mt-5 grid grid-cols-3 border-t border-ip-rule pt-4 text-center" aria-live="polite">
        {[
          ["Slow runs caught", `${totals.caught} of 2`],
          ["Missed", String(totals.missed)],
          ["False alarms", String(totals.noise)],
        ].map(([k, v], i) => (
          <div key={k} className={cn(i > 0 && "border-l border-ip-rule")}>
            <dd className="m-0 text-[24px] font-semibold leading-none">{v}</dd>
            <dt className="mt-1.5 text-[12.5px] text-ip-body">{k}</dt>
          </div>
        ))}
      </dl>
      <p className="mt-4 mb-0 text-[13.5px] leading-[1.5] text-ip-body">
        {mode === "fixed"
          ? "Drag the threshold: set it low and the hour-long fact table pages you every night; set it high and a 4-minute table can run five times slower unnoticed."
          : "Each table is compared with its own median, so the threshold moves with the table: both slow runs caught, no false alarms."}
      </p>
    </DemoShell>
  );
}
