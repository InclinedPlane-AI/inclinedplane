/**
 * Product diagrams drawn in the brand system (no icon packs):
 *  - InclineFit: the four steps with Contextualize + Enable lit (where IncLever helps)
 *  - TrustChain: ERP sources → pipelines → platform → context layer → any agent,
 *    with PipelineIQ and IncLever bracketing the halves they watch
 *  - ComparisonTable: yes / partial / no matrix
 */
import { Link } from "react-router-dom";
import { capabilities } from "@/content/capabilities";
import { cn } from "@/lib/utils";

export function InclineFit({ lit = ["contextualize", "enable"] as string[], caption }: { lit?: string[]; caption?: string }) {
  return (
    <figure className="m-0">
      <div className="flex items-end gap-1.5 sm:gap-2" role="list" aria-label="Where IncLever fits on the incline">
        {capabilities.map((c, i) => {
          const on = lit.includes(c.id);
          return (
            <Link
              role="listitem"
              key={c.id}
              to={c.path}
              className={cn(
                "group flex min-w-0 flex-1 flex-col justify-end gap-1 overflow-hidden rounded-lg border p-2 no-underline transition-colors duration-150 sm:p-4",
                on ? "border-ip-orange bg-ip-orange text-black" : "border-ip-rule-strong bg-white text-ip-muted hover:border-black",
              )}
              style={{ minHeight: 88 + i * 34 }}
            >
              <span className={cn("truncate font-mono text-[8.5px] uppercase tracking-[0.02em] sm:text-[11px] sm:tracking-[0.06em]", on ? "text-black" : "text-ip-muted")}>{c.step}</span>
              <span className={cn("hidden text-[14px] font-semibold leading-[1.2] sm:block", on ? "text-black" : "text-ip-body")}>{c.name}</span>
            </Link>
          );
        })}
      </div>
      {caption && <figcaption className="mt-3 text-[14px] text-ip-muted">{caption}</figcaption>}
    </figure>
  );
}

const chain = ["ERP sources", "Pipelines", "Data platform", "Context layer", "Any agent"];

export function TrustChain() {
  return (
    <figure className="m-0">
      <figcaption className="sr-only">
        The trust layer. Data flows from ERP sources through pipelines into the data platform, then through the context layer to any agent. PipelineIQ covers sources, pipelines and platform: is the data arriving reliably? IncLever covers platform, context layer and agent: is it ready for any agent?
      </figcaption>
      {/* Desktop: horizontal */}
      <div className="hidden md:block" aria-hidden="true">
        <div className="grid grid-cols-5 gap-0">
          {/* top bracket: IncLever over cols 3-5 */}
          <div className="col-span-2" />
          <div className="col-span-3 pb-3">
            <Bracket label="IncLever" question="Is it ready for any agent?" tone="orange" />
          </div>
        </div>
        <div className="relative grid grid-cols-5">
          <span className="absolute left-[10%] right-[10%] top-1/2 h-px -translate-y-1/2 bg-black" />
          {chain.map((n, i) => (
            <div key={n} className="relative flex justify-center px-1.5">
              <span
                className={cn(
                  "relative z-10 w-full rounded-lg border px-3 py-4 text-center text-[16px] font-semibold",
                  i === 4 ? "border-black bg-black text-white" : i === 3 ? "border-ip-orange bg-ip-orange text-black" : "border-ip-rule-strong bg-white text-black",
                )}
              >
                {n}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-3 pt-3">
            <Bracket label="PipelineIQ" question="Is the data arriving reliably?" tone="black" flip />
          </div>
        </div>
      </div>
      {/* Mobile: vertical */}
      <ol className="m-0 flex list-none flex-col gap-0 p-0 md:hidden" aria-hidden="true">
        {chain.map((n, i) => (
          <li key={n} className="flex items-stretch gap-3">
            <div className="flex w-3 flex-col items-center">
              <span className={cn("mt-4 h-3 w-3 rounded-[2px] border", i === 4 ? "border-black bg-black" : i === 3 ? "border-ip-orange bg-ip-orange" : "border-black bg-white")} />
              {i < chain.length - 1 && <span className="w-px grow bg-black" />}
            </div>
            <div className="grow py-2.5">
              <p className="m-0 text-[17px] font-semibold">{n}</p>
              <p className="m-0 text-[13px] text-ip-muted">
                {i <= 2 && "PipelineIQ"}
                {i === 2 && " · "}
                {i >= 2 && <span className="text-ip-orange-ink">IncLever</span>}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function Bracket({ label, question, tone, flip = false }: { label: string; question: string; tone: "orange" | "black"; flip?: boolean }) {
  const line = tone === "orange" ? "border-ip-orange" : "border-black";
  return (
    <div className={cn("flex flex-col gap-2", flip && "flex-col-reverse")}>
      <div className="flex items-baseline gap-3 px-1.5">
        <span className={cn("rounded px-2 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.06em]", tone === "orange" ? "bg-ip-orange text-black" : "bg-black text-white")}>{label}</span>
        <span className="text-[15px] font-medium text-black">{question}</span>
      </div>
      <div className={cn("mx-1.5 h-3 border-x-2", line, flip ? "border-b-2" : "border-t-2")} />
    </div>
  );
}

const mark: Record<"yes" | "no" | "partial", { label: string; cls: string }> = {
  yes: { label: "Yes", cls: "bg-black text-white" },
  partial: { label: "Partly", cls: "bg-ip-grey-100 text-black border border-ip-rule-strong" },
  no: { label: "No", cls: "text-ip-muted" },
};

export function ComparisonTable({ columns, rows, highlight }: { columns: string[]; rows: { label: string; values: ("yes" | "no" | "partial")[] }[]; highlight?: number }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-[15px]">
        <thead>
          <tr className="border-b-2 border-black text-left align-bottom">
            <th scope="col" className="py-3 pr-4 font-semibold">
              <span className="sr-only">Capability</span>
            </th>
            {columns.map((c, i) => (
              <th key={c} scope="col" className={cn("px-3 py-3 font-semibold", i === highlight && "bg-ip-orange-tint")}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-ip-rule">
              <th scope="row" className="py-3 pr-4 text-left font-medium">
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td key={i} className={cn("px-3 py-3", i === highlight && "bg-ip-orange-tint")}>
                  <span className={cn("inline-flex rounded px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em]", mark[v].cls)}>{mark[v].label}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
