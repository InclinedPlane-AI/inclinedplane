/**
 * The layers between a question and a correct answer, drawn as a stack from
 * source systems up to the agent. Select a layer to see what it answers, what
 * breaks without it and an example. Fictional SAMPLE examples. All details
 * are in the HTML; selection only changes which one is shown.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface Layer {
  id: string;
  name: string;
  question: string;
  without: string;
  example: string;
  pillar: { label: string; to: string };
  tone: "source" | "build" | "context" | "agent";
}

/** Top of the stack first (rendered top to bottom). */
const layers: Layer[] = [
  {
    id: "agent",
    name: "Any agent or BI tool",
    question: "Copilot, Genie, Claude, ChatGPT or a dashboard: whoever asks the question.",
    without: "Every consumer re-invents the meaning, so two tools give two answers to one question.",
    example: "“Who are our top 10 customers in France by margin last quarter?”",
    pillar: { label: "Activate: Agentic Analytics and BI", to: "/capabilities/agentic-analytics" },
    tone: "agent",
  },
  {
    id: "freshness",
    name: "Freshness and lineage",
    question: "How current is this, and where did each number come from?",
    without: "The agent answers from a table that stopped loading on Tuesday, and doesn’t say so.",
    example: "sales_orders loaded 06:00 UTC today; rule: must be under 24 hours old.",
    pillar: { label: "Enable: AI and Agent Readiness", to: "/capabilities/ai-agent-readiness" },
    tone: "context",
  },
  {
    id: "permissions",
    name: "Permissions",
    question: "Who, or which agent, may see which rows and columns?",
    without: "A regional sales lead sees margin on accounts outside their region.",
    example: "Row-level rule: region = user.region. Enforced in the platform, not the prompt.",
    pillar: { label: "Enable: AI and Agent Readiness", to: "/capabilities/ai-agent-readiness" },
    tone: "context",
  },
  {
    id: "master",
    name: "Master data",
    question: "Which records are the same real-world customer, product or supplier?",
    without: "One distributor is listed twice, once under each ERP’s ID, so its margin is split.",
    example: "ERP A #10442 and ERP B #DUB-0091 → one golden record, Groupe Dubois Distribution.",
    pillar: { label: "Contextualize: Enterprise Context Engineering", to: "/capabilities/context-engineering" },
    tone: "context",
  },
  {
    id: "ontology",
    name: "Ontology",
    question: "What are the business entities, how do they relate, and which rules apply?",
    without: "The company’s own French subsidiary shows up as its biggest customer.",
    example: "Distributor is a type of Customer. Intercompany is not a Customer.",
    pillar: { label: "Contextualize: Enterprise Context Engineering", to: "/capabilities/context-engineering" },
    tone: "context",
  },
  {
    id: "semantic",
    name: "Semantic layer",
    question: "What does each metric mean, exactly?",
    without: "Margin is computed three ways, GBP is added to EUR, and “last quarter” is the calendar quarter.",
    example: "Gross margin = net revenue − standard cost, after rebates. Owner: Group Finance.",
    pillar: { label: "Contextualize: Enterprise Context Engineering", to: "/capabilities/context-engineering" },
    tone: "context",
  },
  {
    id: "platform",
    name: "Data platform",
    question: "Is the data in one governed place, loaded reliably, with quality checks?",
    without: "Every layer above is built on sand: late loads, silent failures, copies that disagree.",
    example: "A lakehouse on Fabric or Databricks, with pipelines, tests and lineage.",
    pillar: { label: "Build: Data Engineering and Governance", to: "/capabilities/data-engineering-governance" },
    tone: "build",
  },
  {
    id: "sources",
    name: "Your ERPs and source systems",
    question: "Where the facts are recorded today: several ERPs, a CRM, spreadsheets.",
    without: "Each system has its own codes, currencies and idea of what a customer is.",
    example: "ERP A (legacy), ERP B (SAP), a CRM and a pricing spreadsheet.",
    pillar: { label: "Build: Data Engineering and Governance", to: "/capabilities/data-engineering-governance" },
    tone: "source",
  },
];

const toneCls: Record<Layer["tone"], { on: string; off: string }> = {
  agent: { on: "bg-black text-white border-black", off: "bg-white text-black border-black" },
  context: { on: "bg-ip-orange text-black border-ip-orange", off: "bg-ip-orange-tint text-black border-ip-orange-tint" },
  build: { on: "bg-ip-grey-100 text-black border-black", off: "bg-ip-grey text-black border-ip-rule-strong" },
  source: { on: "bg-white text-black border-black", off: "bg-white text-ip-body border-ip-rule-dashed border-dashed" },
};

export function ContextLayers() {
  const [selected, setSelected] = useState("ontology");
  return (
    <div className="overflow-hidden rounded-xl border border-ip-rule-strong bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-4 py-3 sm:px-6">
        <span className="ip-label-sm !text-black font-semibold">From source system to answer</span>
        <span className="ip-label-sm">Select a layer</span>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <ol className="m-0 flex list-none flex-col gap-1.5 border-b border-ip-rule p-4 sm:p-6 lg:border-b-0 lg:border-r">
          {layers.map((l, i) => {
            const on = l.id === selected;
            // The stack widens towards the bottom: the foundation carries everything above it.
            return (
              <li key={l.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(l.id)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-md border px-4 py-3 text-left text-[15px] font-semibold transition-colors duration-150",
                    on ? toneCls[l.tone].on : cn(toneCls[l.tone].off, "hover:border-black"),
                  )}
                  style={{ width: `${78 + (i / (layers.length - 1)) * 22}%`, marginInline: "auto" }}
                >
                  <span>{l.name}</span>
                  {l.tone === "context" && <span className={cn("ip-label-sm !text-[10.5px]", on ? "!text-black" : "")}>Context</span>}
                </button>
              </li>
            );
          })}
        </ol>
        <div className="p-5 sm:p-7" aria-live="polite">
          {layers.map((l) => (
            <div key={l.id} hidden={l.id !== selected}>
              <p className="ip-label-sm m-0">{l.tone === "context" ? "Context layer" : l.tone === "agent" ? "Consumer" : l.tone === "build" ? "Foundation" : "Sources"}</p>
              <p className="m-0 mt-1 text-[24px] font-semibold leading-[1.15] tracking-[-0.015em]">{l.name}</p>
              <p className="mt-3 mb-0 text-[16px] leading-[1.55] text-black">{l.question}</p>
              <p className="ip-label-sm mt-5 mb-1.5">Without it</p>
              <p className="m-0 text-[15px] leading-[1.55] text-ip-body">{l.without}</p>
              <p className="ip-label-sm mt-5 mb-1.5">Example (sample data)</p>
              <p className="m-0 rounded bg-ip-grey px-3 py-2 font-mono text-[13px] leading-[1.5] text-black">{l.example}</p>
              <p className="mt-5 mb-0 text-[14px]">
                <Link to={l.pillar.to} className="ip-link text-[14px]">
                  {l.pillar.label}
                </Link>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
