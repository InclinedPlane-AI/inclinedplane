import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Check, X, Minus, RotateCcw, MessageSquare, Brain, ListChecks, ShieldCheck, Send, UserRound } from "lucide-react";
import { DemoTag } from "./shared";

/*
 * Inclever question-flow simulator. Each scenario is a scripted list of events;
 * the chat (left) and the pipeline (right) are both derived from how many events
 * have played so far. All values are illustrative.
 */

type GateStatus = "pass" | "fail" | "skip";

interface ConfirmCard {
  kind: "confirm";
  rows: [string, string][];
}
interface AnswerCard {
  kind: "answer";
  value: string;
  detail: string;
  evidence: string[];
}
interface RefusalCard {
  kind: "refusal" | "hold";
  reason: string;
  task: string;
  owner: string;
  clock: string;
}
type Card = ConfirmCard | AnswerCard | RefusalCard;

interface Msg {
  from: "user" | "bot";
  text?: string;
  options?: string[];
  card?: Card;
}
interface Ev {
  step?: number;
  gate?: [number, GateStatus];
  msg?: Msg;
}

interface Scenario {
  label: string;
  outcome: string;
  events: Ev[];
}

const SCENARIOS: Scenario[] = [
  {
    label: "Margin last month",
    outcome: "Governed answer",
    events: [
      { step: 0, msg: { from: "user", text: "How did we do on margin last month?" } },
      { step: 1, msg: { from: "bot", text: "Two margin metrics are defined. Which did you mean?", options: ["Gross margin", "Contribution margin"] } },
      { step: 1, msg: { from: "user", text: "Gross margin" } },
      {
        step: 2,
        msg: {
          from: "bot",
          text: "Here's what I understood. Shall I run it?",
          card: { kind: "confirm", rows: [["Metric", "Gross margin %"], ["Level", "Company"], ["Window", "October 2026"], ["Filters", "None"]] },
        },
      },
      { step: 2, msg: { from: "user", text: "Yes" } },
      { step: 3, gate: [0, "pass"] },
      { gate: [1, "pass"] },
      { gate: [2, "pass"] },
      {
        step: 4,
        msg: {
          from: "bot",
          card: {
            kind: "answer",
            value: "38.4%",
            detail: "Gross margin, October 2026. Up 1.2 pts on September.",
            evidence: ["Vouched for by the latest audit runs on 3 data assets", "Readiness certificate: issued", "Caveats: none"],
          },
        },
      },
    ],
  },
  {
    label: "Margin by plant",
    outcome: "Honest refusal",
    events: [
      { step: 0, msg: { from: "user", text: "Show me gross margin by plant for last month" } },
      { step: 1 },
      {
        step: 2,
        msg: {
          from: "bot",
          text: "Here's what I understood. Shall I run it?",
          card: { kind: "confirm", rows: [["Metric", "Gross margin %"], ["Level", "Plant"], ["Window", "October 2026"], ["Filters", "None"]] },
        },
      },
      { step: 2, msg: { from: "user", text: "Yes" } },
      { step: 3, gate: [0, "pass"] },
      { gate: [1, "fail"] },
      { gate: [2, "skip"] },
      {
        step: 4,
        msg: {
          from: "bot",
          card: {
            kind: "refusal",
            reason: "Plant is not a declared dimension for this metric. That's a gap in the business definitions with a named owner, not a data problem and not a mistake in your question.",
            task: "Declare it",
            owner: "Semantic layer author",
            clock: "72h",
          },
        },
      },
    ],
  },
  {
    label: "EMEA revenue",
    outcome: "Held, data failing",
    events: [
      { step: 0, msg: { from: "user", text: "What was revenue in EMEA this quarter?" } },
      { step: 1 },
      {
        step: 2,
        msg: {
          from: "bot",
          text: "Here's what I understood. Shall I run it?",
          card: { kind: "confirm", rows: [["Metric", "Net revenue"], ["Level", "Region"], ["Window", "Q4 2026 to date"], ["Filters", "Region = EMEA"]] },
        },
      },
      { step: 2, msg: { from: "user", text: "Yes" } },
      { step: 3, gate: [0, "pass"] },
      { gate: [1, "pass"] },
      { gate: [2, "fail"] },
      {
        step: 4,
        msg: {
          from: "bot",
          card: {
            kind: "hold",
            reason: "A blocking check on the data underneath is failing: the amount column mixes currencies in two entities, so totals would be meaningless. No number goes out. I'll answer the moment the verdict turns.",
            task: "Fix the data",
            owner: "Data owner",
            clock: "24h",
          },
        },
      },
    ],
  },
  {
    label: "Payroll by department",
    outcome: "Refused on permission",
    events: [
      { step: 0, msg: { from: "user", text: "What's payroll cost by department?" } },
      { step: 1 },
      {
        step: 2,
        msg: {
          from: "bot",
          text: "Here's what I understood. Shall I run it?",
          card: { kind: "confirm", rows: [["Metric", "Payroll cost"], ["Level", "Department"], ["Window", "November 2026"], ["Filters", "None"]] },
        },
      },
      { step: 2, msg: { from: "user", text: "Yes" } },
      { step: 3, gate: [0, "fail"] },
      { gate: [1, "skip"] },
      { gate: [2, "skip"] },
      {
        step: 4,
        msg: {
          from: "bot",
          card: {
            kind: "refusal",
            reason: "You're not currently entitled to this metric. I haven't told you anything about the number. Your request has gone to the owner of that permission.",
            task: "Grant or refuse",
            owner: "Permission owner",
            clock: "8h",
          },
        },
      },
    ],
  },
];

const STEPS = [
  { icon: MessageSquare, label: "Ask", hint: "In Teams, in plain English" },
  { icon: Brain, label: "Understand", hint: "Matched to defined metrics only" },
  { icon: ListChecks, label: "Confirm", hint: "Nothing runs until you agree" },
  { icon: ShieldCheck, label: "Check", hint: "Three gates, always in order" },
  { icon: Send, label: "Answer", hint: "Answer, hold, or route" },
];
const GATES = [
  { name: "Entitlement", q: "Is this person allowed to ask?" },
  { name: "Answerability", q: "Is everything it needs defined?" },
  { name: "Assurance", q: "Is the data trustworthy right now?" },
];

const GateIcon = ({ s }: { s?: GateStatus }) => {
  if (s === "pass") return <Check className="w-3.5 h-3.5" />;
  if (s === "fail") return <X className="w-3.5 h-3.5" />;
  if (s === "skip") return <Minus className="w-3.5 h-3.5" />;
  return <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />;
};
const gateCls = (s?: GateStatus) =>
  s === "pass"
    ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/40"
    : s === "fail"
      ? "bg-red-500/15 text-red-500 border-red-500/40"
      : s === "skip"
        ? "bg-muted text-muted-foreground border-border"
        : "bg-background/60 text-muted-foreground border-border";

const CardView = ({ card }: { card: Card }) => {
  if (card.kind === "confirm") {
    return (
      <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 rounded-lg border border-border bg-background/70 p-2.5 text-[11px]">
        {card.rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-muted-foreground">{k}</dt>
            <dd className="text-foreground font-medium">{v}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (card.kind === "answer") {
    return (
      <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/5 p-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-500 mb-1">Governed answer</p>
        <p className="text-2xl font-bold text-foreground leading-none mb-1">{card.value}</p>
        <p className="text-xs text-foreground/90 mb-2">{card.detail}</p>
        <ul className="space-y-0.5">
          {card.evidence.map((e) => (
            <li key={e} className="flex gap-1.5 text-[11px] text-muted-foreground">
              <Check className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" /> {e}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  const hold = card.kind === "hold";
  return (
    <div className={`rounded-lg border p-3 ${hold ? "border-amber-500/40 bg-amber-500/5" : "border-red-500/40 bg-red-500/5"}`}>
      <p className={`font-mono text-[10px] uppercase tracking-wider mb-1 ${hold ? "text-amber-500" : "text-red-500"}`}>
        {hold ? "No number sent" : "Can't answer this, and here's why"}
      </p>
      <p className="text-xs text-foreground/90 leading-relaxed mb-2">{card.reason}</p>
      <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
        <span className="px-1.5 py-0.5 rounded bg-muted text-foreground font-medium">Task: {card.task}</span>
        <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Owner: {card.owner}</span>
        <span className="px-1.5 py-0.5 rounded bg-muted text-muted-foreground">Clock: {card.clock}</span>
      </div>
    </div>
  );
};

const QuestionFlowDemo = () => {
  const [sIdx, setSIdx] = useState(0);
  const [t, setT] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();

  const scenario = SCENARIOS[sIdx];
  const last = scenario.events.length - 1;

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  useEffect(() => {
    if (reduce && started) {
      setT(last);
      return;
    }
    if (!started || t >= last) return;
    const next = scenario.events[t + 1];
    const delay = next?.gate ? 650 : next?.msg?.from === "user" ? 900 : 1100;
    const id = setTimeout(() => setT((v) => v + 1), delay);
    return () => clearTimeout(id);
  }, [started, t, last, scenario, reduce]);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [t, sIdx, reduce]);

  const played = scenario.events.slice(0, t + 1);
  const step = Math.max(...played.map((e) => e.step ?? -1));
  const gates: (GateStatus | undefined)[] = [undefined, undefined, undefined];
  played.forEach((e) => {
    if (e.gate) gates[e.gate[0]] = e.gate[1];
  });
  const msgs = played.filter((e) => e.msg).map((e) => e.msg as Msg);
  const done = t >= last;

  const choose = (i: number) => {
    setSIdx(i);
    setT(0);
    setStarted(true);
  };

  return (
    <div ref={ref} className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm font-semibold text-foreground">Pick a question and watch it travel</p>
        <DemoTag />
      </div>
      <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Example questions">
        {SCENARIOS.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={sIdx === i}
            onClick={() => choose(i)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              sIdx === i ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-4">
        {/* Chat surface */}
        <div className="rounded-xl border border-border bg-background/70 overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-3 py-2 border-b border-border">
            <span className="text-[11px] font-medium text-foreground"># finance-questions</span>
            <span className="font-mono text-[10px] text-muted-foreground">Microsoft Teams</span>
          </div>
          <div ref={chatRef} className="h-[360px] overflow-y-auto p-3 space-y-3" aria-live="polite">
            <AnimatePresence initial={false}>
              {msgs.map((m, i) => (
                <motion.div
                  key={`${sIdx}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex gap-2 ${m.from === "user" ? "justify-end" : ""}`}
                >
                  {m.from === "bot" && (
                    <span className="mt-0.5 h-6 w-6 shrink-0 rounded-md bg-gradient-orange flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                      In
                    </span>
                  )}
                  <div className={`max-w-[85%] ${m.from === "user" ? "order-1" : ""}`}>
                    {m.text && (
                      <p
                        className={`rounded-xl px-3 py-2 text-xs leading-relaxed ${
                          m.from === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted text-foreground rounded-bl-sm"
                        }`}
                      >
                        {m.text}
                      </p>
                    )}
                    {m.options && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {m.options.map((o) => (
                          <span key={o} className="px-2 py-0.5 rounded-full border border-primary/40 text-[10px] text-foreground/90">
                            {o}
                          </span>
                        ))}
                      </div>
                    )}
                    {m.card && <CardView card={m.card} />}
                  </div>
                  {m.from === "user" && (
                    <span className="order-2 mt-0.5 h-6 w-6 shrink-0 rounded-md bg-muted flex items-center justify-center">
                      <UserRound className="w-3.5 h-3.5 text-muted-foreground" />
                    </span>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Pipeline */}
        <div className="rounded-xl border border-border bg-background/40 p-4">
          <ol className="space-y-1">
            {STEPS.map((s, i) => {
              const state = step > i || (i === 4 && done) ? "done" : step === i ? "active" : "todo";
              return (
                <li key={s.label}>
                  <div
                    className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-colors ${state === "active" ? "bg-primary/10" : ""}`}
                  >
                    <span
                      className={`h-7 w-7 shrink-0 rounded-full border flex items-center justify-center transition-colors ${
                        state === "todo" ? "border-border text-muted-foreground" : "border-primary/60 text-primary bg-primary/10"
                      }`}
                    >
                      <s.icon className="w-3.5 h-3.5" />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-xs font-semibold ${state === "todo" ? "text-muted-foreground" : "text-foreground"}`}>{s.label}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{s.hint}</p>
                    </div>
                  </div>
                  {i === 3 && (
                    <div className="ml-[22px] pl-5 border-l border-border space-y-1.5 py-1.5">
                      {GATES.map((g, gi) => (
                        <motion.div
                          key={g.name}
                          animate={gates[gi] === "fail" && !reduce ? { x: [0, -3, 3, -2, 0] } : { x: 0 }}
                          transition={{ duration: 0.35 }}
                          className={`flex items-center gap-2 rounded-md border px-2 py-1.5 ${gateCls(gates[gi])}`}
                        >
                          <span className="font-mono text-[10px] w-3">{gi + 1}</span>
                          <GateIcon s={gates[gi]} />
                          <div className="min-w-0">
                            <p className="text-[11px] font-semibold leading-tight">{g.name}</p>
                            <p className="text-[10px] opacity-80 leading-tight truncate">
                              {gates[gi] === "skip" ? "Never ran, shown as such" : g.q}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-3 flex items-center justify-between gap-2 border-t border-border pt-3">
            <span className="text-[11px] text-muted-foreground">
              Outcome: <span className="text-foreground font-medium">{done ? scenario.outcome : "…"}</span>
            </span>
            <button
              onClick={() => choose(sIdx)}
              className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary transition-colors"
            >
              <RotateCcw className="w-3 h-3" /> Replay
            </button>
          </div>
          <p className="mt-2 text-[10px] text-muted-foreground">Every step is written to a permanent decision record that can be replayed.</p>
        </div>
      </div>
    </div>
  );
};

export default QuestionFlowDemo;
