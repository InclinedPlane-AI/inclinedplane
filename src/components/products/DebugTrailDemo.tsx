import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ScrollText, Workflow, Cpu, MessagesSquare, Rocket, Repeat, ExternalLink, Bug, GitCommit, Layers, AppWindow } from "lucide-react";
import { DemoTag } from "./shared";

/*
 * "The 2am trail": the same failure diagnosed without and with PipelineIQ.
 * Steps are drawn from the problem statement in the PipelineIQ reference.
 */

const TRAIL = [
  { icon: ScrollText, tool: "Run log", tabs: 1, text: "The load says Failed at 02:10. The error column is empty." },
  { icon: Workflow, tool: "Orchestrator", tabs: 2, text: "Find the run id, then drill pipeline → child pipeline → activity → output to read the error." },
  { icon: Cpu, tool: "Compute workspace", tabs: 3, text: "Copy the notebook run link, switch to the right environment's workspace, find the stack trace." },
  { icon: MessagesSquare, tool: "Team chat", tabs: 4, text: "“Has anyone seen this before?” Scroll back through old threads." },
  { icon: Rocket, tool: "Release log", tabs: 5, text: "Was there a deployment? It says “In progress”, and has done since last week." },
  { icon: Repeat, tool: "…again", tabs: 5, text: "Now repeat all of it for every other table that failed last night." },
];

const DebugTrailDemo = () => {
  const [mode, setMode] = useState<"without" | "with">("without");
  const [shown, setShown] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (mode !== "without" || !inView) return;
    if (reduce) {
      setShown(TRAIL.length);
      return;
    }
    if (shown >= TRAIL.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), shown === 0 ? 300 : 900);
    return () => clearTimeout(t);
  }, [mode, inView, shown, reduce]);

  const tabs = shown ? TRAIL[Math.min(shown, TRAIL.length) - 1].tabs : 0;

  return (
    <div ref={ref} className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex gap-1 rounded-lg bg-muted/60 p-1" role="tablist" aria-label="Debugging journey">
          {(
            [
              ["without", "Without PipelineIQ"],
              ["with", "With PipelineIQ"],
            ] as const
          ).map(([k, label]) => (
            <button
              key={k}
              role="tab"
              aria-selected={mode === k}
              onClick={() => {
                setMode(k);
                if (k === "without") setShown(0);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                mode === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <DemoTag label="Interactive · one failed table at 02:10" />
      </div>

      <div className="flex items-center gap-2 mb-4 text-xs text-muted-foreground">
        <AppWindow className="w-4 h-4 text-primary" />
        Browser tabs open:
        <motion.span key={`${mode}-${tabs}`} initial={{ scale: 1.4 }} animate={{ scale: 1 }} className="font-mono text-sm font-bold text-foreground tabular-nums">
          {mode === "with" ? 1 : tabs}
        </motion.span>
        <span className="ml-auto">{mode === "with" ? "1 page" : `${Math.min(shown, 5)} tools visited`}</span>
      </div>

      <div className="min-h-[380px]">
        <AnimatePresence mode="wait">
          {mode === "without" ? (
            <motion.ol key="without" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
              {TRAIL.slice(0, shown).map((s, i) => (
                <motion.li
                  key={s.tool}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-3 rounded-xl border p-3 ${i === TRAIL.length - 1 ? "border-red-500/40 bg-red-500/5" : "border-border bg-background/60"}`}
                >
                  <span className="w-8 h-8 shrink-0 rounded-lg bg-muted flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-muted-foreground" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{s.tool}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </motion.li>
              ))}
              {shown >= TRAIL.length && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground pt-1">
                  And if the failure is older than the orchestrator's retention window, the evidence is already gone.
                </motion.p>
              )}
            </motion.ol>
          ) : (
            <motion.div key="with" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-xl border border-primary/40 bg-background/70 overflow-hidden">
              <div className="flex items-center justify-between gap-2 px-4 py-2.5 border-b border-border bg-primary/5">
                <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                  <Bug className="w-3.5 h-3.5 text-primary" /> Failure · fct_order_lines · TEST
                </span>
                <span className="px-2 py-0.5 rounded border text-[10px] font-medium bg-red-500/10 text-red-500 border-red-500/30">High</span>
              </div>
              <div className="p-4 grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 rounded-lg border border-border p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-500 mb-1">Root cause</p>
                  <p className="text-sm text-foreground">The notebook couldn't read a file because it was modified mid-read. This is the root cause; the two parent pipelines that failed because of it are hidden.</p>
                </div>
                <div className="sm:col-span-2 rounded-lg border border-border bg-muted/40 p-3 font-mono text-[10px] sm:text-[11px] text-muted-foreground leading-relaxed overflow-x-auto">
                  <span className="text-red-500">FAILED_READ_FILE</span> Error while reading file …/curated/order_lines/part-0007.parquet
                  <br />
                  &nbsp;&nbsp;Caused by: the file was modified after it was opened for reading
                  <br />
                  &nbsp;&nbsp;at notebooks/enriched/load_order_lines, cell 14
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                    <Layers className="w-3 h-3" /> Same error elsewhere
                  </p>
                  <p className="text-sm text-foreground">One signature, recurring across many tables</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                    <GitCommit className="w-3 h-3" /> Last release before it
                  </p>
                  <p className="text-sm text-foreground">2 days earlier · didn't complete</p>
                </div>
                <div className="sm:col-span-2 flex flex-wrap gap-2">
                  {["Open run in orchestrator", "Open notebook run", "Table's last 40 runs"].map((l) => (
                    <span key={l} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-border text-[11px] text-foreground/90">
                      {l} <ExternalLink className="w-3 h-3 text-primary" />
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DebugTrailDemo;
