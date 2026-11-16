import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeCheck, ShieldAlert, RotateCcw, Wrench, FileCheck2, PowerOff } from "lucide-react";
import { DemoTag } from "./shared";

/*
 * Readiness certificate demo for ARCT. Two blocking findings withhold the
 * certificate; each can be remediated in one of the three legitimate ways.
 * All values are illustrative.
 */

type Fix = "data" | "exception" | "off";

const FINDINGS = [
  {
    id: "R-112",
    title: "Amount column mixes currencies with no conversion rule",
    dim: "Validity",
    exception: { id: "EX-014", scope: "UK entities only, already single-currency", until: "31 Dec 2026" },
  },
  {
    id: "R-207",
    title: "Transactions reference cost centres missing from the master table",
    dim: "Consistency",
    exception: { id: "EX-015", scope: "Legacy cost centres closed before 2025", until: "31 Jan 2027" },
  },
];

const FIX_LABEL: Record<Fix, { label: string; icon: typeof Wrench }> = {
  data: { label: "Fix the data", icon: Wrench },
  exception: { label: "Scoped exception", icon: FileCheck2 },
  off: { label: "Switch off rule", icon: PowerOff },
};

const CertificateDemo = () => {
  const [fixes, setFixes] = useState<(Fix | null)[]>([null, null]);

  const total = 219 - fixes.filter((f) => f === "off").length;
  const failed = fixes.filter((f) => f === null || f === "exception").length;
  const notEvaluated = 3;
  const passed = total - failed - notEvaluated;
  const coverage = (((passed + failed) / total) * 100).toFixed(1);
  const issued = fixes.every((f) => f !== null);
  const clean = fixes.every((f) => f === "data");

  const autonomy = !issued ? "Ask a person" : clean ? "Ask the agent now" : "Agent now, QC to follow";

  const apply = (i: number, f: Fix) => setFixes((prev) => prev.map((p, j) => (j === i ? f : p)));

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm font-semibold text-foreground">Remediate the findings, watch the certificate change</p>
        <DemoTag />
      </div>

      <div className="grid md:grid-cols-[1fr_1fr] gap-4">
        {/* Certificate */}
        <motion.div
          layout
          className={`relative rounded-xl border-2 p-5 overflow-hidden transition-colors ${
            issued ? "border-emerald-500/50 bg-emerald-500/5" : "border-red-500/40 bg-red-500/5"
          }`}
        >
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-orange opacity-10 blur-2xl" />
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Readiness certificate</p>
          <p className="text-sm font-semibold text-foreground mb-3">General ledger transactions · audit run #48</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={issued ? "issued" : "withheld"}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 mb-4 ${
                issued ? "bg-emerald-500/15 text-emerald-500" : "bg-red-500/15 text-red-500"
              }`}
            >
              {issued ? <BadgeCheck className="w-5 h-5" /> : <ShieldAlert className="w-5 h-5" />}
              <span className="text-lg font-bold tracking-tight">{issued ? "ISSUED" : "WITHHELD"}</span>
            </motion.div>
          </AnimatePresence>

          <dl className="grid grid-cols-3 gap-2 mb-4 text-center">
            {[
              ["Passed", passed, "text-emerald-500"],
              ["Failed", failed, "text-red-500"],
              ["Not evaluated", notEvaluated, "text-muted-foreground"],
            ].map(([k, v, c]) => (
              <div key={k as string} className="rounded-lg bg-background/60 border border-border py-2">
                <dd className={`text-lg font-bold tabular-nums ${c}`}>{v}</dd>
                <dt className="text-[10px] text-muted-foreground">{k}</dt>
              </div>
            ))}
          </dl>
          <div className="space-y-1.5 text-[11px]">
            <p className="flex justify-between gap-2">
              <span className="text-muted-foreground">Coverage</span>
              <span className="text-foreground font-medium tabular-nums">{coverage}% of rules evaluated</span>
            </p>
            <p className="flex justify-between gap-2">
              <span className="text-muted-foreground">AI autonomy supported</span>
              <span className="text-foreground font-medium">{autonomy}</span>
            </p>
          </div>

          <div className="mt-4 border-t border-border pt-3 space-y-1.5">
            {!issued && <p className="text-[11px] text-red-500">Withheld because of {fixes.filter((f) => f === null).length} blocking finding(s), named below.</p>}
            {fixes.map((f, i) =>
              f === "exception" ? (
                <p key={i} className="text-[11px] text-muted-foreground">
                  Relies on <span className="text-foreground font-medium">{FINDINGS[i].exception.id}</span>: {FINDINGS[i].exception.scope}. Approved by the data owner, expires {FINDINGS[i].exception.until}.
                </p>
              ) : f === "off" ? (
                <p key={i} className="text-[11px] text-muted-foreground">
                  Rule <span className="text-foreground font-medium">{FINDINGS[i].id}</span> switched off with a written justification. Switches itself back on in 14 days.
                </p>
              ) : null,
            )}
            {issued && <p className="text-[11px] text-muted-foreground">Expires automatically when a newer audit run lands, an exception lapses, or its validity window ends.</p>}
          </div>
        </motion.div>

        {/* Findings + remediation */}
        <div className="space-y-3">
          {FINDINGS.map((f, i) => (
            <div key={f.id} className="rounded-xl border border-border bg-background/60 p-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-1.5 py-0.5 rounded bg-red-500/10 text-red-500 border border-red-500/30 text-[10px] font-medium">Blocker</span>
                <span className="font-mono text-[10px] text-muted-foreground">
                  {f.id} · {f.dim}
                </span>
              </div>
              <p className={`text-sm font-medium mb-3 ${fixes[i] === "data" ? "text-muted-foreground line-through" : "text-foreground"}`}>{f.title}</p>
              <div className="flex flex-wrap gap-1.5">
                {(Object.keys(FIX_LABEL) as Fix[]).map((k) => {
                  const Icon = FIX_LABEL[k].icon;
                  const on = fixes[i] === k;
                  return (
                    <button
                      key={k}
                      onClick={() => apply(i, k)}
                      aria-pressed={on}
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-medium transition-colors ${
                        on ? "border-primary/60 bg-primary/15 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      {FIX_LABEL[k].label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
          <button
            onClick={() => setFixes([null, null])}
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Every remediation is recorded with who authorised it, why, and until when. Any answer that relies on an
            exception names it.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateDemo;
