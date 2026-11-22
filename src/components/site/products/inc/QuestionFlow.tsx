/**
 * IncLever question-flow simulator. Pick a question; the chat (left) and the
 * pipeline with its three gates (right) play out step by step. Four outcomes:
 * a governed answer, an honest refusal, an answer held because the data is
 * failing, and a refusal on permission. Illustrative SAMPLE DATA.
 * Reduced motion: each scenario appears complete.
 */
import { useEffect, useRef, useState } from "react";
import { DemoShell, useInView, usePrefersReducedMotion } from "../demoKit";
import { cn } from "@/lib/utils";

type Gate = "pass" | "fail" | "skip";
type Card =
  | { kind: "confirm"; rows: [string, string][] }
  | { kind: "answer"; value: string; detail: string; evidence: string[] }
  | { kind: "refusal" | "hold"; reason: string; task: string; owner: string; clock: string };
interface Msg {
  from: "user" | "bot";
  text?: string;
  options?: string[];
  card?: Card;
}
interface Ev {
  step?: number;
  gate?: [number, Gate];
  msg?: Msg;
}

const confirm = (metric: string, level: string, window: string, filters = "None"): Msg => ({
  from: "bot",
  text: "Here’s what I understood. Shall I run it?",
  card: { kind: "confirm", rows: [["Metric", metric], ["Level", level], ["Window", window], ["Filters", filters]] },
});

const scenarios: { label: string; outcome: string; events: Ev[] }[] = [
  {
    label: "Margin last month",
    outcome: "Governed answer",
    events: [
      { step: 0, msg: { from: "user", text: "How did we do on margin last month?" } },
      { step: 1, msg: { from: "bot", text: "Two margin metrics are defined. Which did you mean?", options: ["Gross margin", "Contribution margin"] } },
      { step: 1, msg: { from: "user", text: "Gross margin" } },
      { step: 2, msg: confirm("Gross margin %", "Company", "October 2026") },
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
            evidence: ["Latest audit runs passed on 3 data assets", "Readiness certificate: issued", "Caveats: none"],
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
      { step: 2, msg: confirm("Gross margin %", "Plant", "October 2026") },
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
            reason: "Plant isn’t a declared dimension for this metric. That’s a gap in the business definitions with a named owner, not a mistake in your question.",
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
    outcome: "Held: data failing",
    events: [
      { step: 0, msg: { from: "user", text: "What was revenue in EMEA this quarter?" } },
      { step: 1 },
      { step: 2, msg: confirm("Net revenue", "Region", "Q4 2026 to date", "Region = EMEA") },
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
            reason: "A blocking check is failing underneath: the amount column mixes currencies in two entities, so totals would be meaningless. No number goes out. I’ll answer the moment the verdict turns.",
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
    outcome: "Refused: permission",
    events: [
      { step: 0, msg: { from: "user", text: "What’s payroll cost by department?" } },
      { step: 1 },
      { step: 2, msg: confirm("Payroll cost", "Department", "November 2026") },
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
            reason: "You’re not currently entitled to this metric. I haven’t told you anything about the number. Your request has gone to the owner of that permission.",
            task: "Grant or refuse",
            owner: "Permission owner",
            clock: "8h",
          },
        },
      },
    ],
  },
];

const steps = [
  { label: "Ask", hint: "In Teams, in plain English" },
  { label: "Understand", hint: "Matched to defined metrics only" },
  { label: "Confirm", hint: "Nothing runs until you agree" },
  { label: "Check", hint: "Three gates, always in order" },
  { label: "Respond", hint: "Answer, hold or route" },
];
const gateInfo = [
  { name: "Entitlement", q: "Is this person allowed to see it?" },
  { name: "Answerability", q: "Is everything it needs defined?" },
  { name: "Assurance", q: "Is the data trustworthy right now?" },
];

function GateMark({ s }: { s?: Gate }) {
  if (!s) return <span className="h-5 w-5 rounded-full border-2 border-dashed border-ip-rule-dashed" aria-label="Pending" />;
  if (s === "pass")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black text-white" aria-label="Passed">
        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M2.5 6.3l2.3 2.2 4.7-5" />
        </svg>
      </span>
    );
  if (s === "fail")
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#b42318] text-white" aria-label="Failed">
        <svg width="9" height="9" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M3 3l6 6M9 3l-6 6" />
        </svg>
      </span>
    );
  return <span className="h-5 w-5 rounded-full bg-ip-grey-100" aria-label="Skipped" />;
}

function CardView({ card }: { card: Card }) {
  if (card.kind === "confirm")
    return (
      <dl className="m-0 mt-2 grid grid-cols-[80px_1fr] gap-x-3 gap-y-1 rounded-md border border-ip-rule bg-white p-2.5 text-[12.5px]">
        {card.rows.map(([k, v]) => (
          <div key={k} className="contents">
            <dt className="text-ip-muted">{k}</dt>
            <dd className="m-0 font-medium text-black">{v}</dd>
          </div>
        ))}
      </dl>
    );
  if (card.kind === "answer")
    return (
      <div className="mt-1 rounded-md border border-black bg-white p-3">
        <p className="m-0 text-[28px] font-semibold leading-none tracking-[-0.02em]">{card.value}</p>
        <p className="mt-1.5 mb-0 text-[13px] text-black">{card.detail}</p>
        <ul className="mt-2.5 mb-0 list-none space-y-1 border-t border-ip-rule p-0 pt-2 text-[12px] text-ip-body">
          {card.evidence.map((e) => (
            <li key={e} className="flex gap-2">
              <span aria-hidden="true" className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-black" />
              {e}
            </li>
          ))}
        </ul>
      </div>
    );
  const hold = card.kind === "hold";
  return (
    <div className={cn("mt-1 rounded-md border p-3", hold ? "border-ip-orange bg-ip-orange-tint" : "border-[#b42318]/50 bg-[#fef3f2]")}>
      <p className={cn("m-0 font-mono text-[10.5px] uppercase tracking-[0.06em]", hold ? "text-ip-orange-ink" : "text-[#b42318]")}>{hold ? "Answer held" : "Refused, with the reason"}</p>
      <p className="mt-1.5 mb-0 text-[13px] leading-[1.5] text-black">{card.reason}</p>
      <p className="mt-2 mb-0 flex flex-wrap gap-x-3 gap-y-1 border-t border-black/10 pt-2 text-[12px] text-ip-body">
        <span>
          Task: <strong className="text-black">{card.task}</strong>
        </span>
        <span>Owner: {card.owner}</span>
        <span className="font-mono">Clock {card.clock}</span>
      </p>
    </div>
  );
}

export function QuestionFlow() {
  const [sc, setSc] = useState(0);
  const [played, setPlayed] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const chat = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, 0.35);
  const reduce = usePrefersReducedMotion();
  const events = scenarios[sc].events;

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setPlayed(events.length);
    if (played >= events.length) return;
    const next = events[played];
    const delay = played === 0 ? 400 : next.gate ? 650 : next.msg?.from === "bot" ? 1100 : 800;
    const t = window.setTimeout(() => setPlayed((p) => p + 1), delay);
    return () => window.clearTimeout(t);
  }, [inView, played, events, reduce]);

  useEffect(() => {
    const el = chat.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [played, reduce]);

  const shown = events.slice(0, played);
  const msgs = shown.filter((e) => e.msg).map((e) => e.msg!);
  const step = shown.reduce((s, e) => (e.step !== undefined ? e.step : s), -1);
  const gates: (Gate | undefined)[] = [undefined, undefined, undefined];
  shown.forEach((e) => e.gate && (gates[e.gate[0]] = e.gate[1]));
  const done = played >= events.length;

  return (
    <div ref={ref}>
      <DemoShell title="IncLever Ask" bodyClass="p-0">
        <div className="flex flex-wrap gap-2 border-b border-ip-rule px-4 py-3 sm:px-5" role="group" aria-label="Choose a question">
          {scenarios.map((s, i) => (
            <button
              key={s.label}
              type="button"
              aria-pressed={sc === i}
              onClick={() => {
                setSc(i);
                setPlayed(0);
              }}
              className={cn(
                "flex min-h-[40px] flex-col items-start rounded-md border px-3 py-1.5 text-left transition-colors",
                sc === i ? "border-black bg-black text-white" : "border-ip-rule-strong text-black hover:border-black",
              )}
            >
              <span className="text-[13.5px] font-medium leading-tight">{s.label}</span>
              <span className={cn("text-[11px] leading-tight", sc === i ? "text-white/70" : "text-ip-muted")}>{s.outcome}</span>
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          {/* Chat */}
          <div className="border-b border-ip-rule lg:border-b-0 lg:border-r">
            <div ref={chat} className="h-[380px] space-y-3 overflow-y-auto bg-ip-grey/60 p-4 sm:p-5" aria-live="polite">
              {msgs.map((m, i) => (
                <div key={`${sc}-${i}`} className={cn("flex", m.from === "user" ? "justify-end" : "justify-start")}>
                  <div
                    className={cn(
                      "max-w-[88%] animate-in fade-in slide-in-from-bottom-1 rounded-xl px-3.5 py-2.5 text-[13.5px] leading-[1.45] duration-300",
                      m.from === "user" ? "rounded-br-sm bg-black text-white" : "rounded-bl-sm border border-ip-rule bg-white text-black",
                    )}
                  >
                    {m.from === "bot" && <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.06em] text-ip-orange-ink">IncLever</span>}
                    {m.text}
                    {m.options && (
                      <span className="mt-2 flex flex-wrap gap-1.5">
                        {m.options.map((o) => (
                          <span key={o} className="rounded-full border border-ip-rule-strong px-2.5 py-0.5 text-[12px]">
                            {o}
                          </span>
                        ))}
                      </span>
                    )}
                    {m.card && <CardView card={m.card} />}
                  </div>
                </div>
              ))}
              {!done && played > 0 && (
                <div className="flex gap-1 px-1" aria-hidden="true">
                  {[0, 1, 2].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-pulse rounded-full bg-ip-muted" style={{ animationDelay: `${d * 150}ms` }} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Pipeline */}
          <div className="p-4 sm:p-5">
            <p className="ip-label-sm m-0 mb-3">What happens to the question</p>
            <ol className="m-0 list-none space-y-1.5 p-0">
              {steps.map((s, i) => (
                <li
                  key={s.label}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-md border px-3 py-2 transition-colors duration-300",
                    step === i ? "border-ip-orange bg-ip-orange-tint" : step > i ? "border-ip-rule bg-white" : "border-transparent bg-transparent",
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={cn("font-mono text-[11px]", step >= i ? "text-black" : "text-ip-muted")}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={cn("text-[14px] font-semibold", step >= i ? "text-black" : "text-ip-muted")}>{s.label}</span>
                  </span>
                  <span className="text-right text-[12px] text-ip-muted">{s.hint}</span>
                </li>
              ))}
            </ol>
            <p className="ip-label-sm mt-5 mb-2">The three gates</p>
            <ul className="m-0 list-none space-y-1.5 p-0">
              {gateInfo.map((g, i) => (
                <li key={g.name} className="flex items-center gap-3 rounded-md border border-ip-rule px-3 py-2">
                  <GateMark s={gates[i]} />
                  <span>
                    <span className="block text-[14px] font-semibold">{g.name}</span>
                    <span className="block text-[12px] text-ip-body">{g.q}</span>
                  </span>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setPlayed(0)}
              className="mt-4 min-h-[36px] rounded-md border border-ip-rule-strong px-3 text-[13px] font-medium hover:border-black"
            >
              Replay
            </button>
          </div>
        </div>
      </DemoShell>
    </div>
  );
}
