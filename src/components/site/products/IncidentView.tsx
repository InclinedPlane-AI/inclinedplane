/**
 * PipelineIQ incident view (brief §9.4): a flood of raw alerts vs one diagnosed
 * incident. Fictional SAMPLE DATA in our own visual language. Both states are
 * in the HTML; the toggle only switches which one is shown.
 */
import { useState } from "react";
import { cn } from "@/lib/utils";

const flood = [
  { time: "02:14", sev: "High", text: "Load failed: stg_sales_orders (ERP A)" },
  { time: "02:14", sev: "High", text: "Load failed: stg_order_lines (ERP A)" },
  { time: "02:31", sev: "High", text: "Timed out: rebuild fact_sales" },
  { time: "02:31", sev: "High", text: "Timed out: rebuild fact_margin" },
  { time: "03:05", sev: "Medium", text: "Stale: dim_customer, overdue against usual cadence" },
  { time: "03:05", sev: "Medium", text: "Stale: agg_sales_daily" },
  { time: "04:40", sev: "Medium", text: "No batch: nightly_finance within 4 hours" },
  { time: "05:12", sev: "Low", text: "Slow: semantic model refresh 2.4× its median" },
  { time: "06:02", sev: "Low", text: "Slow: sales agent answers taking 3× longer" },
  { time: "06:30", sev: "Medium", text: "Stale: margin dashboard, Europe" },
];

const sevCls: Record<string, string> = {
  High: "bg-[#fef3f2] text-[#b42318]",
  Medium: "bg-ip-orange-tint text-ip-orange-ink",
  Low: "bg-ip-grey-100 text-ip-body",
};

export function IncidentView() {
  const [mode, setMode] = useState<"flood" | "incident">("flood");
  return (
    <div className="overflow-hidden rounded-xl border border-ip-rule-strong bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-4 py-3 sm:px-6">
        <span className="ip-label-sm !text-black font-semibold">One night, two views</span>
        <span className="ip-label-sm">Sample data</span>
      </div>
      <div className="px-4 py-6 sm:px-8 sm:py-8">
        <div role="group" aria-label="Choose a view" className="inline-flex rounded-[8px] border border-ip-rule-strong p-1 text-[14px]">
          {(
            [
              ["flood", "Raw alerts"],
              ["incident", "Diagnosed incident"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => setMode(id)}
              className={cn("min-h-[40px] rounded-[6px] px-4 font-medium transition-colors duration-150", mode === id ? "bg-black text-white" : "text-ip-body hover:bg-ip-grey")}
            >
              {label}
            </button>
          ))}
        </div>

        <div hidden={mode !== "flood"} className="mt-6">
          <p className="ip-label-sm m-0 mb-3">10 alerts by 06:30, from four tools</p>
          <ul className="m-0 list-none border-t border-ip-rule p-0">
            {flood.map((a, i) => (
              <li key={i} className="flex items-center gap-3 border-b border-ip-rule py-2.5 text-[14px] sm:text-[15px]">
                <span className="w-11 shrink-0 font-mono text-[12px] text-ip-muted">{a.time}</span>
                <span className={cn("w-[68px] shrink-0 rounded px-1.5 py-0.5 text-center font-mono text-[10px] uppercase tracking-[0.06em]", sevCls[a.sev])}>{a.sev}</span>
                <span className="min-w-0">{a.text}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 mb-0 text-[14px] leading-[1.5] text-ip-body">Every alert is true. None of them says what to do first.</p>
        </div>

        <div hidden={mode !== "incident"} className="mt-6">
          <div className="rounded-lg border-2 border-black p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#fef3f2] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#b42318]">High</span>
              <span className="ip-label-sm">One incident · opened 02:14 · 10 alerts grouped</span>
            </div>
            <p className="mt-3 mb-0 text-[clamp(19px,2vw,22px)] font-semibold leading-[1.3]">ERP A extract failed after last night’s release; everything downstream is late, not broken.</p>
            <dl className="m-0 mt-5 grid gap-0 border-t border-ip-rule text-[14px] sm:text-[15px]">
              {[
                ["Likely cause", "Release 2026.11.20 renamed a column in the ERP A order extract. The load has failed since 02:14 with the same error signature."],
                ["Affected", "2 staging tables, 2 fact rebuilds, 3 downstream aggregates, the margin dashboard for Europe and the sales agent’s answers on orders after 20 Nov."],
                ["Not affected", "Finance ledger and inventory loads completed on time."],
                ["Suggested fix", "Map the renamed column in the extract, rerun from stg_sales_orders. Downstream rebuilds recover on their own."],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-1 gap-1 border-b border-ip-rule py-3 sm:grid-cols-[140px_1fr] sm:gap-4">
                  <dt className="font-semibold">{k}</dt>
                  <dd className="m-0 text-ip-body">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-4 mb-0 text-[14px] leading-[1.5] text-ip-body">One owner, one fix, before the first report is opened.</p>
        </div>
      </div>
    </div>
  );
}
