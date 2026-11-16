import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Bot, ShieldCheck, AlertTriangle, CheckCircle2, PauseCircle, Ban, UserRound } from "lucide-react";
import { DemoTag } from "./shared";

/*
 * The same question to a generic chatbot wired to a warehouse, and to Inclever.
 * Each failure mode is one the Inclever readiness checklist exists to catch.
 * All figures are illustrative.
 */

type Tone = "good" | "hold" | "refuse";
interface Case {
  label: string;
  q: string;
  generic: string;
  reveal: string;
  inclever: string;
  tone: Tone;
  verdict: string;
}

const CASES: Case[] = [
  {
    label: "Q3 revenue",
    q: "What was our total revenue in Q3?",
    generic: "Total Q3 revenue was £148.6M, a strong quarter across all regions.",
    reveal: "It summed a year-to-date column across July, August and September, as if it were monthly. The real figure is less than a third of that.",
    inclever: "Net revenue for Q3 2026 was £41.2M. The year-to-date measure is declared cumulative, so it wasn't summed. Vouched for by the latest audit on 2 data assets.",
    tone: "good",
    verdict: "Governed answer",
  },
  {
    label: "Sales, all regions",
    q: "Total sales last month across all regions?",
    generic: "Total sales last month were 12.4M across all regions.",
    reveal: "It added pounds, euros and dollars together. The amount column mixes currencies with no conversion rule, so the total is meaningless.",
    inclever: "No number sent. A blocking check is failing: the amount column mixes currencies in two entities. The fix is on the data owner's list, and I'll answer the moment the verdict turns.",
    tone: "hold",
    verdict: "Held, with the reason",
  },
  {
    label: "Margin by plant",
    q: "Break down gross margin by plant.",
    generic: "Plant North: 41%. Plant South: 37%. Plant TBD: 52%.",
    reveal: "“Plant” isn't a defined dimension. It joined on a free-text site field, and even treated the placeholder “TBD” as a real plant.",
    inclever: "Plant isn't a declared dimension for this metric. That's a gap in the business definitions with a named owner, not a mistake in your question. I've raised it with them.",
    tone: "refuse",
    verdict: "Honest refusal, routed",
  },
  {
    label: "Payroll",
    q: "What's payroll cost by department?",
    generic: "Payroll by department: Engineering £2.1M, Sales £1.6M, Operations £1.2M…",
    reveal: "It answered someone with no right to see payroll. The chatbot's database account could read the table, so it did.",
    inclever: "You're not currently entitled to this metric. I haven't told you anything about the number. Your request has gone to the owner of that permission.",
    tone: "refuse",
    verdict: "Refused before any data was read",
  },
];

const toneStyle: Record<Tone, { box: string; label: string; Icon: typeof CheckCircle2 }> = {
  good: { box: "border-emerald-500/40 bg-emerald-500/5", label: "text-emerald-500", Icon: CheckCircle2 },
  hold: { box: "border-amber-500/40 bg-amber-500/5", label: "text-amber-500", Icon: PauseCircle },
  refuse: { box: "border-primary/40 bg-primary/5", label: "text-primary", Icon: Ban },
};

const Typing = () => (
  <span className="inline-flex gap-1 px-3 py-2.5 rounded-xl bg-muted">
    {[0, 1, 2].map((i) => (
      <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-muted-foreground" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }} />
    ))}
  </span>
);

const TwoAssistantsDemo = () => {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState(0); // 0 asked, 1 answers, 2 reveal
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();
  const c = CASES[idx];

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setPhase(2);
      return;
    }
    if (phase >= 2) return;
    const t = setTimeout(() => setPhase((p) => p + 1), phase === 0 ? 1100 : 1600);
    return () => clearTimeout(t);
  }, [inView, phase, idx, reduce]);

  const pick = (i: number) => {
    setIdx(i);
    setPhase(0);
  };
  const tone = toneStyle[c.tone];

  const Question = () => (
    <div className="flex justify-end gap-2">
      <p className="max-w-[85%] rounded-xl rounded-br-sm bg-primary text-primary-foreground px-3 py-2 text-xs">{c.q}</p>
      <span className="h-6 w-6 shrink-0 rounded-md bg-muted flex items-center justify-center">
        <UserRound className="w-3.5 h-3.5 text-muted-foreground" />
      </span>
    </div>
  );

  return (
    <div ref={ref} className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm font-semibold text-foreground">Same question. Two assistants.</p>
        <DemoTag />
      </div>
      <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Example questions">
        {CASES.map((x, i) => (
          <button
            key={x.label}
            role="tab"
            aria-selected={idx === i}
            onClick={() => pick(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              idx === i ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {x.label}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Generic */}
        <div className="rounded-xl border border-border bg-background/60 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border">
            <Bot className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">A chatbot on your warehouse</span>
          </div>
          <div className="p-3 space-y-3 min-h-[260px]">
            <Question />
            <div className="flex gap-2">
              <span className="h-6 w-6 shrink-0 rounded-md bg-muted flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-muted-foreground" />
              </span>
              <AnimatePresence mode="wait">
                {phase === 0 ? (
                  <motion.div key="t" exit={{ opacity: 0 }}>
                    <Typing />
                  </motion.div>
                ) : (
                  <motion.p key={`a-${idx}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="max-w-[85%] rounded-xl rounded-bl-sm bg-muted text-foreground px-3 py-2 text-xs leading-relaxed">
                    {c.generic}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div key={`r-${idx}`} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg border border-red-500/40 bg-red-500/5 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-red-500 mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" /> Confidently wrong
                  </p>
                  <p className="text-xs text-foreground/90 leading-relaxed">{c.reveal}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Inclever */}
        <div className="rounded-xl border border-primary/30 bg-background/60 overflow-hidden flex flex-col">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-primary/5">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span className="text-xs font-medium text-foreground">Inclever</span>
          </div>
          <div className="p-3 space-y-3 min-h-[260px]">
            <Question />
            <div className="flex gap-2">
              <span className="h-6 w-6 shrink-0 rounded-md bg-gradient-orange flex items-center justify-center text-[10px] font-bold text-primary-foreground">In</span>
              <AnimatePresence mode="wait">
                {phase === 0 ? (
                  <motion.div key="t" exit={{ opacity: 0 }}>
                    <Typing />
                  </motion.div>
                ) : (
                  <motion.div key={`a-${idx}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[90%] rounded-xl border p-3 ${tone.box}`}>
                    <p className={`font-mono text-[10px] uppercase tracking-wider mb-1 flex items-center gap-1 ${tone.label}`}>
                      <tone.Icon className="w-3 h-3" /> {c.verdict}
                    </p>
                    <p className="text-xs text-foreground/90 leading-relaxed">{c.inclever}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoAssistantsDemo;
