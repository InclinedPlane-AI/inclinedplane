/**
 * "The 2am trail": the same failed table diagnosed without and with
 * PipelineIQ. Without: the engineer hops between tools, one step at a time
 * (steps reveal as the demo scrolls into view). With: everything on one page.
 * Fictional SAMPLE DATA. All steps are in the HTML.
 */
import { useEffect, useRef, useState } from "react";
import { DemoShell, Segmented, useInView, usePrefersReducedMotion } from "../demoKit";
import { cn } from "@/lib/utils";

const trail = [
  { tool: "Run log", text: "The load says Failed at 02:10. The error column is empty." },
  { tool: "Orchestrator", text: "Find the run ID, then drill pipeline → child pipeline → activity → output to read the error." },
  { tool: "Compute workspace", text: "Copy the notebook run link, switch to the right environment’s workspace, find the stack trace." },
  { tool: "Team chat", text: "“Has anyone seen this before?” Scroll back through old threads." },
  { tool: "Release log", text: "Was there a deployment? It says “In progress”, and has done since last week." },
  { tool: "…and again", text: "Now repeat all of it for every other table that failed last night." },
];

export function DebugTrail() {
  const [mode, setMode] = useState<"without" | "with">("without");
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.4);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (mode !== "without" || !inView) return;
    if (reduce) return setShown(trail.length);
    if (shown >= trail.length) return;
    const t = window.setTimeout(() => setShown((s) => s + 1), shown === 0 ? 350 : 950);
    return () => window.clearTimeout(t);
  }, [mode, inView, shown, reduce]);

  const tabs = mode === "with" ? 1 : Math.min(shown, 5);

  return (
    <div ref={ref}>
      <DemoShell title="One failed table at 02:10" bodyClass="p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <Segmented<"without" | "with">
            label="Debugging journey"
            value={mode}
            onChange={(v) => {
              setMode(v);
              if (v === "without") setShown(0);
            }}
            options={[
              ["without", "Without PipelineIQ"],
              ["with", "With PipelineIQ"],
            ]}
          />
          <p className="m-0 flex items-baseline gap-2 text-[13.5px] text-ip-body" aria-live="polite">
            Tools open
            <span className={cn("font-mono text-[22px] font-semibold tabular-nums", mode === "with" ? "text-black" : "text-[#b42318]")}>{tabs}</span>
          </p>
        </div>

        <div className="min-h-[360px]">
          {mode === "without" ? (
            <ol className="m-0 list-none space-y-2 p-0">
              {trail.map((s, i) => (
                <li
                  key={s.tool}
                  className={cn(
                    "grid grid-cols-[28px_1fr] gap-3 rounded-lg border px-3.5 py-3 transition-all duration-500",
                    i < shown ? "translate-x-0 border-ip-rule-strong opacity-100" : "-translate-x-2 border-transparent opacity-0",
                    i === trail.length - 1 && "border-dashed",
                  )}
                >
                  <span className="pt-0.5 font-mono text-[12px] text-ip-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block text-[15px] font-semibold">{s.tool}</span>
                    <span className="mt-0.5 block text-[14px] leading-[1.5] text-ip-body">{s.text}</span>
                  </span>
                </li>
              ))}
              <li className={cn("pt-2 text-[13.5px] text-ip-muted transition-opacity duration-500", shown >= trail.length ? "opacity-100" : "opacity-0")}>
                And if the failure is older than the orchestrator’s retention window, the evidence is already gone.
              </li>
            </ol>
          ) : (
            <div className="rounded-lg border border-ip-orange">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ip-orange/40 bg-ip-orange-tint px-4 py-2.5">
                <span className="text-[14px] font-semibold">Error signature #A7</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ip-orange-ink">Recurring · 4th time in 30 days</span>
              </div>
              <dl className="m-0 divide-y divide-ip-rule text-[14px]">
                {[
                  ["Root cause", "fct_order_lines (Enriched), not its 3 parents that failed because of it"],
                  ["Real error", "File was modified after it was opened for reading"],
                  ["Last runs", "Failed 02:10 · Succeeded yesterday · Succeeded Mon"],
                  ["Same error elsewhere", "TEST, 2 days ago, same notebook"],
                  ["Last release before it", "Release 2026-11-09 into PROD, completed 00:32"],
                ].map(([k, v]) => (
                  <div key={k} className="grid gap-1 px-4 py-2.5 sm:grid-cols-[170px_1fr] sm:gap-4">
                    <dt className="ip-label-sm pt-0.5">{k}</dt>
                    <dd className="m-0 text-black">{v}</dd>
                  </div>
                ))}
              </dl>
              <pre className="m-0 overflow-x-auto border-t border-ip-rule bg-black px-4 py-3 font-mono text-[12px] leading-[1.6] text-ip-on-dark">
                {"IOException: concurrent write detected\n  Caused by: the file was modified after it was opened for reading\n  at notebooks/enriched/load_order_lines, cell 14"}
              </pre>
              <p className="m-0 px-4 py-3 text-[13.5px] text-ip-body">One page, with deep links to the exact run in each source tool.</p>
            </div>
          )}
        </div>
      </DemoShell>
    </div>
  );
}
