/**
 * The same question to a generic chatbot wired to a warehouse, and to
 * IncLever. Each failure is one the readiness checks exist to catch.
 * Illustrative SAMPLE DATA. Every case's text is in the HTML.
 */
import { useState } from "react";
import { DemoShell } from "../demoKit";
import { cn } from "@/lib/utils";

type Tone = "good" | "hold" | "refuse";
const cases: { label: string; q: string; generic: string; reveal: string; inclever: string; tone: Tone; verdict: string }[] = [
  {
    label: "Q3 revenue",
    q: "What was our total revenue in Q3?",
    generic: "Total Q3 revenue was £148.6M, a strong quarter across all regions.",
    reveal: "It summed a year-to-date column across July, August and September as if it were monthly. The real figure is less than a third of that.",
    inclever: "Net revenue for Q3 2026 was £41.2M. The year-to-date measure is declared cumulative, so it wasn’t summed. Backed by the latest audit on 2 data assets.",
    tone: "good",
    verdict: "Governed answer",
  },
  {
    label: "Sales, all regions",
    q: "Total sales last month across all regions?",
    generic: "Total sales last month were 12.4M across all regions.",
    reveal: "It added pounds, euros and dollars together. The amount column mixes currencies with no conversion rule, so the total is meaningless.",
    inclever: "No number sent. A blocking check is failing: the amount column mixes currencies in two entities. The fix is on the data owner’s list; I’ll answer the moment the verdict turns.",
    tone: "hold",
    verdict: "Held, with the reason",
  },
  {
    label: "Margin by plant",
    q: "Break down gross margin by plant.",
    generic: "Plant North: 41%. Plant South: 37%. Plant TBD: 52%.",
    reveal: "“Plant” isn’t a defined dimension. It joined on a free-text site field, and even treated the placeholder “TBD” as a real plant.",
    inclever: "Plant isn’t a declared dimension for this metric. That’s a gap in the business definitions with a named owner, not a mistake in your question. I’ve raised it with them.",
    tone: "refuse",
    verdict: "Honest refusal, routed",
  },
  {
    label: "Payroll",
    q: "What’s payroll cost by department?",
    generic: "Payroll by department: Engineering £2.1M, Sales £1.6M, Operations £1.2M…",
    reveal: "It answered someone with no right to see payroll. The chatbot’s database account could read the table, so it did.",
    inclever: "You’re not currently entitled to this metric. I haven’t told you anything about the number. Your request has gone to the owner of that permission.",
    tone: "refuse",
    verdict: "Refused before any data was read",
  },
];

const toneCls: Record<Tone, string> = {
  good: "border-black",
  hold: "border-ip-orange bg-ip-orange-tint",
  refuse: "border-[#b42318]/50 bg-[#fef3f2]",
};

export function TwoAssistants() {
  const [i, setI] = useState(0);
  const c = cases[i];
  return (
    <DemoShell title="Same question, two assistants" bodyClass="p-4 sm:p-6">
      <div className="mb-5 flex flex-wrap gap-2" role="group" aria-label="Choose a question">
        {cases.map((x, j) => (
          <button
            key={x.label}
            type="button"
            aria-pressed={i === j}
            onClick={() => setI(j)}
            className={cn(
              "min-h-[36px] rounded-md border px-3 text-[13.5px] font-medium transition-colors",
              i === j ? "border-black bg-black text-white" : "border-ip-rule-strong text-ip-body hover:border-black",
            )}
          >
            {x.label}
          </button>
        ))}
      </div>
      <p className="m-0 mb-4 flex justify-end">
        <span className="max-w-[80%] rounded-xl rounded-br-sm bg-black px-3.5 py-2.5 text-[14px] text-white">{c.q}</span>
      </p>
      <div className="grid gap-4 md:grid-cols-2" aria-live="polite">
        <div className="flex flex-col rounded-lg border border-ip-rule-strong">
          <p className="ip-label-sm m-0 border-b border-ip-rule px-4 py-2.5">Chatbot on the warehouse</p>
          <p className="m-0 px-4 pt-3 text-[15px] leading-[1.5] text-black">{c.generic}</p>
          <div className="mx-4 mt-3 mb-4 rounded-md border border-dashed border-[#b42318]/60 p-3">
            <p className="m-0 font-mono text-[10.5px] uppercase tracking-[0.06em] text-[#b42318]">What actually happened</p>
            <p className="mt-1 mb-0 text-[13.5px] leading-[1.5] text-ip-body">{c.reveal}</p>
          </div>
        </div>
        <div className={cn("flex flex-col rounded-lg border", toneCls[c.tone])}>
          <p className="ip-label-sm m-0 flex items-center justify-between gap-2 border-b border-black/10 px-4 py-2.5">
            <span className="!text-black">IncLever</span>
            <span className="text-ip-orange-ink">{c.verdict}</span>
          </p>
          <p className="m-0 px-4 py-3 text-[15px] leading-[1.5] text-black">{c.inclever}</p>
        </div>
      </div>
    </DemoShell>
  );
}
