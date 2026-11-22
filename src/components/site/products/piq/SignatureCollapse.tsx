/**
 * Noise to signal (the error index). Stage 1: every failure from three tools,
 * scattered. Stage 2: parents that failed only because a child did fade out.
 * Stage 3: root causes collapse into error signatures. Plays once when it
 * scrolls into view; each stage can also be chosen. Illustrative SAMPLE DATA:
 * 80 dots stand in for the counts in the stat line.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { DemoShell, useInView, usePrefersReducedMotion } from "../demoKit";
import { cn } from "@/lib/utils";

const signatures = [
  { label: "File overwritten mid-read", size: 14 },
  { label: "Integration runtime offline", size: 10 },
  { label: "Schema mismatch on load", size: 8 },
  { label: "Source connection timeout", size: 7 },
  { label: "Duplicate key in merge", size: 6 },
  { label: "Permission denied on lake path", size: 5 },
  { label: "+21 smaller signatures", size: 6 },
];
const CASCADED = 24;
const sources = [
  { name: "Orchestrator", cls: "bg-ip-orange" },
  { name: "Run log", cls: "bg-black" },
  { name: "Compute", cls: "bg-ip-rule-dashed" },
];
const stages = [
  { stat: "512", unit: "failures", caption: "Every failure from three tools, each holding one piece of the story." },
  { stat: "361", unit: "root causes", caption: "Parents that failed only because a child did are set aside. One broken notebook is one problem, not three." },
  { stat: "27", unit: "error signatures", caption: "IDs, paths and numbers are stripped from each error, so the same fault groups together across runs." },
];

function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

export function SignatureCollapse() {
  const [stage, setStage] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.45);
  const reduce = usePrefersReducedMotion();

  const dots = useMemo(() => {
    const r = rng(7);
    const out: { id: number; sig: number; k: number; src: number; sx: number; sy: number }[] = [];
    let id = 0;
    signatures.forEach((s, sig) => {
      for (let k = 0; k < s.size; k++) out.push({ id: id++, sig, k, src: Math.floor(r() * 3), sx: 3 + r() * 94, sy: 6 + r() * 86 });
    });
    for (let i = 0; i < CASCADED; i++) out.push({ id: id++, sig: -1, k: 0, src: Math.floor(r() * 3), sx: 3 + r() * 94, sy: 6 + r() * 86 });
    return out;
  }, []);

  useEffect(() => {
    if (!auto || !inView) return;
    if (reduce) return setStage(2);
    if (stage >= 2) return;
    const t = window.setTimeout(() => setStage((s) => s + 1), 2200);
    return () => window.clearTimeout(t);
  }, [auto, inView, stage, reduce]);

  const rowY = (sig: number) => 9 + sig * 13.5;

  return (
    <div ref={ref}>
      <DemoShell title="One night of failures" bodyClass="p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap gap-2" role="group" aria-label="Stage">
          {["Every failure", "Root causes", "Signatures"].map((l, i) => (
            <button
              key={l}
              type="button"
              aria-pressed={stage === i}
              onClick={() => {
                setAuto(false);
                setStage(i);
              }}
              className={cn(
                "min-h-[36px] rounded-md border px-3 text-[13.5px] font-medium transition-colors",
                stage === i ? "border-black bg-black text-white" : "border-ip-rule-strong text-ip-body hover:border-black",
              )}
            >
              <span className="mr-1.5 font-mono text-[11px] opacity-70">{i + 1}</span>
              {l}
            </button>
          ))}
        </div>

        <div className="relative h-[300px] overflow-hidden rounded-lg border border-ip-rule bg-ip-grey/60 sm:h-[320px]" aria-hidden="true">
          {stage === 2 &&
            signatures.map((s, i) => (
              <span
                key={s.label}
                className="absolute left-3 max-w-[46%] -translate-y-1/2 text-[11.5px] font-medium leading-tight text-black transition-opacity duration-500 sm:text-[13px]"
                style={{ top: `${rowY(i)}%` }}
              >
                {s.label}
              </span>
            ))}
          {dots.map((d) => {
            const hidden = d.sig === -1 && stage >= 1;
            const x = stage === 2 && d.sig >= 0 ? 52 + d.k * 3.1 : d.sx;
            const y = stage === 2 && d.sig >= 0 ? rowY(d.sig) : d.sy;
            return (
              <span
                key={d.id}
                className={cn("absolute h-2.5 w-2.5 rounded-full transition-all duration-700 ease-out", sources[d.src].cls, hidden && "scale-50 opacity-0")}
                style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)", transitionDelay: `${(d.id % 12) * 18}ms` }}
              />
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap items-end justify-between gap-4" aria-live="polite">
          <p className="m-0">
            <span className="text-[34px] font-semibold leading-none tracking-[-0.02em]">{stages[stage].stat}</span>
            <span className="ml-2 text-[15px] text-ip-body">{stages[stage].unit}</span>
          </p>
          <ul className="m-0 flex list-none gap-4 p-0 text-[12.5px] text-ip-body">
            {sources.map((s) => (
              <li key={s.name} className="flex items-center gap-1.5">
                <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-full", s.cls)} />
                {s.name}
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-2 mb-0 text-[14px] leading-[1.5] text-ip-body">{stages[stage].caption}</p>
      </DemoShell>
    </div>
  );
}
