/**
 * The PipelineIQ story spine: four questions an engineer asks when a night
 * fails, and where the product is on each. `compact` is the static track in
 * the hero; the full version is the interactive roadmap at the end.
 * States come from src/content/pipelineiq.ts (piqRoadmap).
 */
import { useState } from "react";
import { piqRoadmap } from "@/content/pipelineiq";
import { cn } from "@/lib/utils";

const node = (state: string, on: boolean) =>
  state === "Live"
    ? "bg-black border-black"
    : state === "In development"
      ? cn("border-ip-orange", on ? "bg-ip-orange" : "bg-ip-orange-tint")
      : cn("border-ip-rule-dashed border-dashed", on ? "bg-ip-grey-100" : "bg-white");

export function FourQuestions({ compact = false }: { compact?: boolean }) {
  const [sel, setSel] = useState(0);
  const items = piqRoadmap;

  if (compact) {
    return (
      <ol aria-label="Where PipelineIQ is heading" className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-4 p-0 sm:grid-cols-4">
        {items.map((r, i) => (
          <li key={r.q} className="relative pt-5">
            <span aria-hidden="true" className={cn("absolute left-0 right-0 top-[7px] h-px", i === 0 ? "bg-black" : "bg-ip-rule-strong")} />
            <span aria-hidden="true" className={cn("absolute left-0 top-0 h-[15px] w-[15px] rounded-full border-2", node(r.state, true))} />
            <span className="block text-[16px] font-semibold leading-[1.25]">{r.q}</span>
            <span className={cn("mt-1 block font-mono text-[11px] uppercase tracking-[0.06em]", r.state === "Live" ? "text-black" : r.state === "In development" ? "text-ip-orange-ink" : "text-ip-muted")}>
              {r.state === "Live" ? "Live today" : r.state}
            </span>
          </li>
        ))}
      </ol>
    );
  }

  const cur = items[sel];
  return (
    <div className="rounded-xl border border-ip-rule-strong bg-white p-4 sm:p-6">
      <div role="tablist" aria-label="Roadmap questions" className="relative grid grid-cols-2 gap-2 sm:grid-cols-4">
        <span aria-hidden="true" className="absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-px bg-ip-rule-strong sm:block" />
        {items.map((r, i) => (
          <button
            key={r.q}
            role="tab"
            type="button"
            aria-selected={sel === i}
            aria-controls="piq-roadmap-panel"
            onClick={() => setSel(i)}
            className={cn(
              "relative flex flex-col items-start gap-2 rounded-lg border p-3 text-left transition-colors sm:items-center sm:text-center",
              sel === i ? "border-black bg-ip-grey" : "border-transparent hover:bg-ip-grey/70",
            )}
          >
            <span aria-hidden="true" className={cn("relative z-10 h-[18px] w-[18px] rounded-full border-2", node(r.state, sel === i))} />
            <span className="text-[16px] font-semibold leading-[1.25]">{r.q}</span>
            <span className={cn("font-mono text-[10.5px] uppercase tracking-[0.06em]", r.state === "Live" ? "text-black" : r.state === "In development" ? "text-ip-orange-ink" : "text-ip-muted")}>
              {r.state === "Live" ? "Live today" : r.state}
            </span>
          </button>
        ))}
      </div>
      <div id="piq-roadmap-panel" role="tabpanel" className="mt-5 grid gap-4 border-t border-ip-rule pt-5 md:grid-cols-[1fr_auto] md:items-start">
        <p className="m-0 max-w-[760px] text-[17px] leading-[1.6] text-black">{cur.body}</p>
        <span className="ip-label-sm whitespace-nowrap">
          {sel + 1} of 4 · {cur.state === "Live" ? "in the portal today" : cur.state === "In development" ? "being built now" : "on the roadmap"}
        </span>
      </div>
    </div>
  );
}
