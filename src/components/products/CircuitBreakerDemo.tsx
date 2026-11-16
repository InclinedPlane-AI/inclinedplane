import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Zap } from "lucide-react";
import { DemoTag } from "./shared";

/*
 * Blast-radius demo for ARCT → Inclever Ask. Clicking a source or data asset
 * fails a blocking audit rule on it; everything downstream is withdrawn
 * automatically ("by a circuit breaker, not by a person").
 */

type Col = 0 | 1 | 2 | 3;
interface Node {
  id: string;
  label: string;
  col: Col;
  y: number;
  deps: string[];
}

const NODES: Node[] = [
  { id: "erp", label: "ERP", col: 0, y: 95, deps: [] },
  { id: "crm", label: "CRM", col: 0, y: 245, deps: [] },
  { id: "gl", label: "GL transactions", col: 1, y: 60, deps: ["erp"] },
  { id: "orders", label: "Sales orders", col: 1, y: 170, deps: ["erp", "crm"] },
  { id: "cust", label: "Customers", col: 1, y: 280, deps: ["crm"] },
  { id: "margin", label: "Gross margin", col: 2, y: 45, deps: ["gl", "orders"] },
  { id: "rev", label: "Net revenue", col: 2, y: 128, deps: ["orders"] },
  { id: "active", label: "Active customers", col: 2, y: 211, deps: ["cust"] },
  { id: "rpc", label: "Revenue per customer", col: 2, y: 294, deps: ["orders", "cust"] },
  { id: "q1", label: "“Margin last month?”", col: 3, y: 45, deps: ["margin"] },
  { id: "q2", label: "“Revenue this quarter?”", col: 3, y: 128, deps: ["rev"] },
  { id: "q3", label: "“Active customers?”", col: 3, y: 211, deps: ["active"] },
  { id: "q4", label: "“Revenue per customer?”", col: 3, y: 294, deps: ["rpc"] },
];
const COL_X = [60, 260, 470, 690];
const COL_W = [90, 140, 160, 170];
const HEADERS = ["Sources", "Data assets", "Metrics", "Questions in Teams"];
const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));

const CircuitBreakerDemo = () => {
  const [broken, setBroken] = useState<Set<string>>(new Set());

  const affected = useMemo(() => {
    const out = new Set<string>(broken);
    let grew = true;
    while (grew) {
      grew = false;
      for (const n of NODES) if (!out.has(n.id) && n.deps.some((d) => out.has(d))) {
        out.add(n.id);
        grew = true;
      }
    }
    return out;
  }, [broken]);

  const toggle = (id: string) =>
    setBroken((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const metricsDown = NODES.filter((n) => n.col === 2 && affected.has(n.id)).length;
  const qsDown = NODES.filter((n) => n.col === 3 && affected.has(n.id)).length;

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <p className="text-sm font-semibold text-foreground">Break a source or data asset. Watch what Inclever stops saying.</p>
        <DemoTag />
      </div>
      <p className="text-xs text-muted-foreground mb-4">Click any node in the first two columns to fail its audit. Click again to fix it and re-run.</p>

      <div className="overflow-x-auto -mx-1 px-1">
        <svg viewBox="0 0 880 340" className="min-w-[680px] w-full h-auto" role="img" aria-label="Dependency graph from sources to questions">
          {HEADERS.map((h, i) => (
            <text key={h} x={COL_X[i]} y={16} className="fill-muted-foreground" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="1">
              {h.toUpperCase()}
            </text>
          ))}
          {/* edges */}
          {NODES.flatMap((n) =>
            n.deps.map((d) => {
              const from = byId[d];
              const x1 = COL_X[from.col] + COL_W[from.col];
              const x2 = COL_X[n.col];
              const hot = affected.has(d) && affected.has(n.id);
              return (
                <path
                  key={`${d}-${n.id}`}
                  d={`M${x1},${from.y} C${(x1 + x2) / 2},${from.y} ${(x1 + x2) / 2},${n.y} ${x2},${n.y}`}
                  fill="none"
                  strokeWidth={hot ? 2 : 1.2}
                  strokeDasharray={hot ? "5 4" : undefined}
                  style={{ stroke: hot ? "hsl(0 84% 60%)" : "hsl(var(--muted-foreground) / 0.35)", transition: "stroke 0.3s" }}
                />
              );
            }),
          )}
          {/* nodes */}
          {NODES.map((n) => {
            const isBroken = broken.has(n.id);
            const hit = affected.has(n.id);
            const clickable = n.col < 2;
            const w = COL_W[n.col];
            const fill = isBroken ? "hsl(0 84% 60% / 0.18)" : hit ? "hsl(38 92% 50% / 0.14)" : "hsl(var(--card))";
            const stroke = isBroken ? "hsl(0 84% 60%)" : hit ? "hsl(38 92% 50%)" : clickable ? "hsl(var(--primary) / 0.5)" : "hsl(var(--border))";
            const status = n.col === 3 ? (hit ? "Held: data failing" : "Answering") : n.col === 2 ? (hit ? "Withdrawn" : "Trusted") : isBroken ? "Blocking rule failed" : hit ? "Upstream failing" : "Passed";
            return (
              <g
                key={n.id}
                onClick={clickable ? () => toggle(n.id) : undefined}
                onKeyDown={clickable ? (e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), toggle(n.id)) : undefined}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                aria-pressed={clickable ? isBroken : undefined}
                aria-label={clickable ? `${n.label}: ${status}` : undefined}
                style={{ cursor: clickable ? "pointer" : "default", outline: "none" }}
              >
                <rect x={COL_X[n.col]} y={n.y - 22} width={w} height={44} rx={10} strokeWidth={1.5} style={{ fill, stroke, transition: "fill 0.25s, stroke 0.25s" }} />
                <text x={COL_X[n.col] + 10} y={n.y - 3} fontSize="12" fontWeight="600" className="fill-foreground">
                  {n.label}
                </text>
                <text
                  x={COL_X[n.col] + 10}
                  y={n.y + 13}
                  fontSize="10"
                  fill={isBroken ? "hsl(0 84% 60%)" : hit ? "hsl(38 92% 50%)" : "hsl(152 60% 45%)"}
                >
                  {status}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <AnimatePresence mode="wait">
          <motion.p key={`${metricsDown}-${qsDown}`} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-foreground flex items-center gap-2">
            <Zap className={`w-4 h-4 ${broken.size ? "text-red-500" : "text-emerald-500"}`} />
            {broken.size
              ? `${metricsDown} metric${metricsDown === 1 ? "" : "s"} withdrawn, ${qsDown} question${qsDown === 1 ? "" : "s"} held. By a circuit breaker, not by a person.`
              : "Every asset passing its audit. Inclever answers on all four questions."}
          </motion.p>
        </AnimatePresence>
        {broken.size > 0 && (
          <button onClick={() => setBroken(new Set())} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
            <RotateCcw className="w-3 h-3" /> Fix all and re-run the audit
          </button>
        )}
      </div>
    </div>
  );
};

export default CircuitBreakerDemo;
