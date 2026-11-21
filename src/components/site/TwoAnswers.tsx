/**
 * "Same question, two answers" (brief §9.2) — the clearest explanation of
 * context engineering on the site. Toggle between an agent answering from raw
 * tables and the same agent answering through governed context, and see which
 * layer fixed which error. All names and figures are fictional SAMPLE DATA.
 * Both states are in the HTML; the toggle only switches visibility.
 */
import { useState } from "react";
import { cn } from "@/lib/utils";

type Layer = "Semantic layer" | "Ontology" | "Master data" | "Context and permissions";

const errors: { id: string; text: string; layer: Layer }[] = [
  { id: "a", text: "Counts Kestrel France SAS, your own subsidiary, as a customer.", layer: "Ontology" },
  { id: "b", text: "Lists one distributor twice, under its ERP A and ERP B customer IDs.", layer: "Master data" },
  { id: "c", text: "Adds GBP and EUR amounts together as if they were one currency.", layer: "Semantic layer" },
  { id: "d", text: "Uses the calendar quarter, not your 4-4-5 fiscal quarter.", layer: "Semantic layer" },
  { id: "e", text: "Reads the bill-to country, so French sites billed from Brussels are missing.", layer: "Context and permissions" },
];

const rawRows: { name: string; value: string; flag?: string }[] = [
  { name: "Kestrel France SAS", value: "€4.10M", flag: "a" },
  { name: "Groupe Dubois Distribution", value: "€2.62M" },
  { name: "Lumen Retail France", value: "€2.31M", flag: "d" },
  { name: "Dubois Distribution SARL", value: "€1.94M", flag: "b" },
  { name: "Atelier Morel", value: "1.21M", flag: "c" },
];

const governedRows: { name: string; value: string; note?: string }[] = [
  { name: "Groupe Dubois Distribution", value: "€4.31M", note: "2 ERP records, one customer" },
  { name: "Lumen Retail France", value: "€2.18M" },
  { name: "Brasserie Valmont", value: "€1.66M", note: "Ship-to France, billed from Brussels" },
  { name: "Atelier Morel", value: "€1.02M", note: "GBP converted at monthly average" },
  { name: "Normandie Agri Coop", value: "€0.97M" },
];

const receipts: [string, string][] = [
  ["Margin", "Gross margin = net revenue − standard cost, after rebates. Group Finance definition, owner: CFO office."],
  ["France", "Ship-to country = FR, across all operating companies. Intercompany customers excluded."],
  ["Last quarter", "Fiscal Q3, 29 Jun to 27 Sep 2026 (4-4-5 calendar)."],
  ["Currency", "EUR at monthly average rates."],
  ["Freshness", "Sales data as of 21 Nov 2026, 06:00 UTC. Within its 24-hour freshness rule."],
  ["Checks", "6 of 6 readiness checks passed on the tables used."],
];

const layerTone: Record<Layer, string> = {
  "Semantic layer": "bg-ip-orange text-black",
  Ontology: "bg-black text-white",
  "Master data": "bg-ip-grey-100 text-black border border-ip-rule-strong",
  "Context and permissions": "bg-white text-black border border-black",
};

export function TwoAnswers() {
  const [mode, setMode] = useState<"raw" | "governed">("raw");
  return (
    <div className="overflow-hidden rounded-xl border border-ip-rule-strong bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-4 py-3 sm:px-6">
        <span className="ip-label-sm !text-black font-semibold">Same question, two answers</span>
        <span className="ip-label-sm">Sample data</span>
      </div>

      <div className="px-4 py-6 sm:px-8 sm:py-8">
        <p className="ip-label-sm m-0 mb-2">The question</p>
        <p className="m-0 text-[clamp(20px,2.2vw,26px)] font-semibold leading-[1.25] tracking-[-0.01em]">
          “Who are our top 10 customers in France by margin last quarter?”
        </p>

        <div role="group" aria-label="Choose how the agent answers" className="mt-6 inline-flex rounded-[8px] border border-ip-rule-strong p-1 text-[14px]">
          {(
            [
              ["raw", "Agent on raw tables"],
              ["governed", "Agent with governed context"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              aria-pressed={mode === id}
              onClick={() => setMode(id)}
              className={cn(
                "min-h-[40px] rounded-[6px] px-4 font-medium transition-colors duration-150",
                mode === id ? "bg-black text-white" : "text-ip-body hover:bg-ip-grey",
              )}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_1.05fr]">
          {/* Answer table */}
          <div>
            <p className="ip-label-sm m-0 mb-3">{mode === "raw" ? "What the agent returns" : "What the agent returns now"} (top 5 of 10)</p>
            <table className="w-full border-collapse text-[15px]">
              <caption className="sr-only">{mode === "raw" ? "Answer from raw tables" : "Answer with governed context"}</caption>
              <thead>
                <tr className="border-b-2 border-black text-left">
                  <th scope="col" className="py-2 pr-3 font-semibold">Customer</th>
                  <th scope="col" className="py-2 text-right font-semibold">Margin</th>
                </tr>
              </thead>
              <tbody hidden={mode !== "raw"}>
                {rawRows.map((r) => (
                  <tr key={r.name} className="border-b border-ip-rule align-top">
                    <td className="py-2.5 pr-3">
                      {r.name}
                      {r.flag && (
                        <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fef3f2] px-1.5 font-mono text-[11px] font-semibold text-[#b42318]" aria-label={`Error ${r.flag.toUpperCase()}`}>
                          {r.flag.toUpperCase()}
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 text-right tabular-nums">{r.value}</td>
                  </tr>
                ))}
              </tbody>
              <tbody hidden={mode !== "governed"}>
                {governedRows.map((r) => (
                  <tr key={r.name} className="border-b border-ip-rule align-top">
                    <td className="py-2.5 pr-3">
                      {r.name}
                      {r.note && <span className="block text-[13px] text-ip-muted">{r.note}</span>}
                    </td>
                    <td className="py-2.5 text-right tabular-nums">{r.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-3 mb-0 text-[14px] leading-[1.5] text-ip-body">
              {mode === "raw"
                ? "Confident, formatted and wrong in five ways. Nothing in the answer tells you so."
                : "The same agent and the same tables. The difference is the context it reads first."}
            </p>
          </div>

          {/* Right column: errors or receipts */}
          <div>
            <div hidden={mode !== "raw"}>
              <p className="ip-label-sm m-0 mb-3">What went wrong, and which layer fixes it</p>
              <ul className="m-0 list-none space-y-3 p-0">
                {errors.map((e) => (
                  <li key={e.id} className="flex gap-3 border-b border-ip-rule pb-3 text-[15px] leading-[1.45]">
                    <span className="mt-0.5 inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#fef3f2] px-1.5 font-mono text-[11px] font-semibold text-[#b42318]">
                      {e.id.toUpperCase()}
                    </span>
                    <span className="grow">
                      {e.text}
                      <span className={cn("ml-2 inline-block whitespace-nowrap rounded px-2 py-0.5 align-middle font-mono text-[10px] uppercase tracking-[0.06em]", layerTone[e.layer])}>
                        {e.layer}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div hidden={mode !== "governed"}>
              <p className="ip-label-sm m-0 mb-3">The receipts that come with the answer</p>
              <dl className="m-0 border-t border-ip-rule">
                {receipts.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[104px_1fr] gap-3 border-b border-ip-rule py-2.5 text-[14px] leading-[1.45]">
                    <dt className="font-semibold text-black">{k}</dt>
                    <dd className="m-0 text-ip-body">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
