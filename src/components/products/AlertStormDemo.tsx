import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { BellRing, CheckCircle2 } from "lucide-react";

/*
 * Phone mock-up: per-row alerting floods the lock screen; PipelineIQ sends one
 * alert per problem (rolled up per environment) and closes them itself.
 */

const TABLE_NAMES = [
  "stg_orders_eu", "dim_product", "fct_sales", "stg_invoice_lines", "dim_customer", "fct_margin", "stg_shipments",
  "dim_account_detail", "stg_crm_contacts", "fct_service_calls", "stg_quotes", "dim_region", "stg_parts", "fct_inventory",
];
const KINDS = ["is stale", "failed", "parent pipeline failed", "is running slow", "still in progress"];

const ROLLUP = [
  { sev: "High", cls: "text-red-500", title: "File overwritten mid-read", body: "1 signature across many tables · TEST" },
  { sev: "Medium", cls: "text-amber-500", title: "Stale: 27 tables overdue vs their usual cadence", body: "One roll-up alert · TEST" },
  { sev: "Resolved", cls: "text-emerald-500", title: "dim_customer recovered", body: "Closed automatically after a successful rerun" },
];

const AlertStormDemo = () => {
  const [mode, setMode] = useState<"storm" | "piq">("storm");
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (mode !== "storm" || !inView) return;
    if (reduce) {
      setCount(368);
      return;
    }
    if (count >= 368) return;
    const t = setTimeout(() => setCount((c) => Math.min(368, c + (c < 12 ? 1 : 9))), c0(count));
    return () => clearTimeout(t);
  }, [mode, inView, count, reduce]);

  const recent = Array.from({ length: Math.min(count, 7) }, (_, i) => {
    const n = count - i;
    return { id: n, text: `${TABLE_NAMES[n % TABLE_NAMES.length]} ${KINDS[n % KINDS.length]}` };
  });

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="flex gap-1 rounded-lg bg-muted/60 p-1 mb-4" role="tablist" aria-label="Alerting style">
        {(
          [
            ["storm", "One alert per row"],
            ["piq", "PipelineIQ"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            role="tab"
            aria-selected={mode === k}
            onClick={() => {
              setMode(k);
              if (k === "storm") setCount(0);
            }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              mode === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Phone */}
      <div className="relative w-[260px] h-[460px] rounded-[2.2rem] border-[6px] border-foreground/15 bg-gradient-to-b from-muted/80 to-background shadow-2xl overflow-hidden">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-foreground/15" />
        <div className="pt-10 px-3 text-center">
          <p className="text-3xl font-semibold text-foreground tabular-nums">02:14</p>
          <p className="text-[10px] text-muted-foreground mb-3">Tuesday</p>
          <div className="flex items-center justify-center gap-1.5 mb-3">
            <BellRing className={`w-3.5 h-3.5 ${mode === "storm" ? "text-red-500" : "text-primary"}`} />
            <motion.span key={mode === "storm" ? count : "piq"} initial={{ scale: 1.3 }} animate={{ scale: 1 }} className="font-mono text-xs font-bold text-foreground tabular-nums">
              {mode === "storm" ? count : 3}
            </motion.span>
            <span className="text-[10px] text-muted-foreground">notifications</span>
          </div>
        </div>
        <div className="px-2.5 space-y-1.5">
          <AnimatePresence initial={false} mode="popLayout">
            {mode === "storm"
              ? recent.map((n) => (
                  <motion.div
                    key={n.id}
                    layout
                    initial={{ opacity: 0, y: -16, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-xl bg-background/90 border border-border px-2.5 py-1.5 text-left"
                  >
                    <p className="text-[9px] text-muted-foreground">ETL monitor · now</p>
                    <p className="text-[11px] text-foreground truncate">{n.text}</p>
                  </motion.div>
                ))
              : ROLLUP.map((n, i) => (
                  <motion.div
                    key={n.title}
                    layout
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.25 }}
                    className="rounded-xl bg-background/90 border border-border px-2.5 py-2 text-left"
                  >
                    <p className="text-[9px] text-muted-foreground flex items-center gap-1">
                      PipelineIQ · <span className={`font-semibold ${n.cls}`}>{n.sev}</span>
                      {n.sev === "Resolved" && <CheckCircle2 className="w-2.5 h-2.5 text-emerald-500" />}
                    </p>
                    <p className="text-[11px] font-semibold text-foreground leading-snug">{n.title}</p>
                    <p className="text-[10px] text-muted-foreground">{n.body}</p>
                  </motion.div>
                ))}
          </AnimatePresence>
        </div>
      </div>
      <p className="text-[11px] text-muted-foreground mt-3 text-center max-w-[280px]">
        {mode === "storm" ? "The first raw alert run on a real estate: 368 alerts. Nobody reads 368 alerts." : "Same estate, after rules became adaptive and rolled up."}
      </p>
    </div>
  );
};

// accelerate after the first dozen so the counter climbs quickly
function c0(c: number) {
  return c < 12 ? 260 : 60;
}

export default AlertStormDemo;
