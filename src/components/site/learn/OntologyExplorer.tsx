/**
 * Ontology explorer (brief §9.6): a small entity graph. Select an entity to
 * see its definition, the rules that apply and where it lives in the source
 * systems. All names are fictional SAMPLE DATA. Every entity's details are in
 * the HTML (crawlable); selection only changes which one is shown.
 */
import { useState } from "react";
import { cn } from "@/lib/utils";

type EntityId = "customer" | "distributor" | "intercompany" | "order" | "opco" | "country" | "product";

interface Entity {
  id: EntityId;
  label: string;
  x: number;
  y: number;
  definition: string;
  rules: string[];
  bindings: string[];
  kind?: "type" | "excluded";
}

const entities: Entity[] = [
  {
    id: "customer",
    label: "Customer",
    x: 330,
    y: 140,
    definition: "A legal entity outside the group that buys from any operating company.",
    rules: ["One golden record per real-world customer, across every ERP.", "Intercompany entities are never customers."],
    bindings: ["ERP A: CUSTMAST (customer master)", "ERP B: KNA1 (customer general data)", "CRM: Account (type = Customer)"],
  },
  {
    id: "distributor",
    label: "Distributor",
    x: 110,
    y: 50,
    kind: "type",
    definition: "A customer that resells to end customers. A distributor is a type of customer.",
    rules: ["Counts as a customer in every sales and margin metric.", "Rebates reduce net revenue for distributors only."],
    bindings: ["ERP A: CUSTMAST.CLASS = 'DST'", "ERP B: KNVV.KDGRP = '02'"],
  },
  {
    id: "intercompany",
    label: "Intercompany",
    x: 110,
    y: 230,
    kind: "excluded",
    definition: "Another company inside the group. It looks like a customer in the ERP, but it is not one.",
    rules: ["Excluded from customer counts, revenue and margin.", "Eliminated in group consolidation."],
    bindings: ["ERP A: CUSTMAST.ICFLAG = 'Y'", "Group: legal entity register"],
  },
  {
    id: "order",
    label: "Order",
    x: 560,
    y: 140,
    definition: "A confirmed request from a customer for products, booked by one operating company.",
    rules: ["Every order has exactly one customer and one booking operating company.", "Cancelled orders are excluded from revenue."],
    bindings: ["ERP A: SOHEAD / SOLINE", "ERP B: VBAK / VBAP"],
  },
  {
    id: "product",
    label: "Product",
    x: 680,
    y: 45,
    definition: "Something the group sells, identified by one group product code across ERPs.",
    rules: ["Local item codes map to one group product code.", "Standard cost comes from the booking operating company."],
    bindings: ["ERP A: ITEMMAST", "ERP B: MARA", "Mapping: product_xref"],
  },
  {
    id: "opco",
    label: "Operating company",
    x: 600,
    y: 240,
    definition: "A legal entity in the group that books orders and reports results.",
    rules: ["Each operating company reports in its own currency; group reporting is in EUR.", "Belongs to one region for sales reporting."],
    bindings: ["Group: legal entity register", "ERP A: COMPANY", "ERP B: T001"],
  },
  {
    id: "country",
    label: "Country",
    x: 330,
    y: 250,
    definition: "Where the customer receives the goods (ship-to), not where the invoice is sent.",
    rules: ["“Sales in France” means ship-to country = FR.", "Bill-to country is kept, but never used for regional sales."],
    bindings: ["ERP A: SHIPTO.COUNTRY", "ERP B: VBPA (partner function WE)"],
  },
];

const edges: { from: EntityId; to: EntityId; label: string; dashed?: boolean }[] = [
  { from: "distributor", to: "customer", label: "is a type of" },
  { from: "intercompany", to: "customer", label: "is not a", dashed: true },
  { from: "customer", to: "order", label: "places" },
  { from: "order", to: "product", label: "contains" },
  { from: "order", to: "opco", label: "booked by" },
  { from: "customer", to: "country", label: "ships to" },
];

const byId = Object.fromEntries(entities.map((e) => [e.id, e])) as Record<EntityId, Entity>;

const nodeW = (n: Entity) => Math.max(96, n.label.length * 9 + 28);
const NODE_H = 38;

/** Point where the segment from `from` towards `n`'s centre meets n's box (plus a gap). */
function edgePoint(n: Entity, from: Entity, gap = 4) {
  const dx = from.x - n.x;
  const dy = from.y - n.y;
  const hw = nodeW(n) / 2 + gap;
  const hh = NODE_H / 2 + gap;
  const t = Math.min(hw / Math.abs(dx || 1e-6), hh / Math.abs(dy || 1e-6));
  return { x: n.x + dx * t, y: n.y + dy * t };
}

export function OntologyExplorer() {
  const [selected, setSelected] = useState<EntityId>("customer");
  const sel = byId[selected];
  const related = new Set(edges.flatMap((e) => (e.from === selected ? [e.to] : e.to === selected ? [e.from] : [])));

  return (
    <div className="overflow-hidden rounded-xl border border-ip-rule-strong bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-4 py-3 sm:px-6">
        <span className="ip-label-sm !text-black font-semibold">Ontology explorer</span>
        <span className="ip-label-sm">Sample data · select an entity</span>
      </div>
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="border-b border-ip-rule p-3 sm:p-5 lg:border-b-0 lg:border-r">
          <svg viewBox="0 0 760 290" role="img" aria-labelledby="onto-title" className="block h-auto w-full">
            <title id="onto-title">Entity graph: Customer, Distributor, Intercompany, Order, Product, Operating company and Country, with the relationships between them</title>
            <defs>
              <marker id="onto-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" fill="#555" />
              </marker>
            </defs>
            {edges.map((e) => {
              const a = byId[e.from];
              const b = byId[e.to];
              const on = e.from === selected || e.to === selected;
              const p1 = edgePoint(a, b, 2);
              const p2 = edgePoint(b, a, 3);
              const mx = (p1.x + p2.x) / 2;
              const my = (p1.y + p2.y) / 2;
              return (
                <g key={`${e.from}-${e.to}`}>
                  <line
                    x1={p1.x}
                    y1={p1.y}
                    x2={p2.x}
                    y2={p2.y}
                    stroke={on ? "#000" : "#A7A9AC"}
                    strokeWidth={on ? 2 : 1.25}
                    strokeDasharray={e.dashed ? "5 4" : undefined}
                    markerEnd="url(#onto-arrow)"
                  />
                  <rect x={mx - e.label.length * 3.4 - 6} y={my - 10} width={e.label.length * 6.8 + 12} height={20} rx={4} fill="#fff" />
                  <text x={mx} y={my + 4} textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill={on ? "#000" : "#555"}>
                    {e.label}
                  </text>
                </g>
              );
            })}
            {entities.map((n) => {
              const isSel = n.id === selected;
              const isRel = related.has(n.id);
              const w = nodeW(n);
              return (
                <g
                  key={n.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isSel}
                  aria-label={`${n.label}: show definition`}
                  onClick={() => setSelected(n.id)}
                  onKeyDown={(ev) => {
                    if (ev.key === "Enter" || ev.key === " ") {
                      ev.preventDefault();
                      setSelected(n.id);
                    }
                  }}
                  className="cursor-pointer outline-none [&:focus-visible>rect]:stroke-ip-orange-ink [&:focus-visible>rect]:[stroke-width:3]"
                >
                  <rect
                    x={n.x - w / 2}
                    y={n.y - NODE_H / 2}
                    width={w}
                    height={NODE_H}
                    rx={6}
                    fill={isSel ? "#F47920" : n.kind === "excluded" ? "#fff" : isRel ? "#FDEBDD" : "#F5F5F5"}
                    stroke={isSel ? "#F47920" : n.kind === "excluded" ? "#A7A9AC" : "#D1D2D4"}
                    strokeDasharray={n.kind === "excluded" ? "5 4" : undefined}
                    strokeWidth={1.5}
                  />
                  <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize="15" fontWeight={600} fill="#000" fontFamily="inherit">
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>
          {/* Phones: the graph is small, so entities are also plain buttons */}
          <div className="mt-3 flex flex-wrap gap-2 sm:hidden" role="group" aria-label="Choose an entity">
            {entities.map((e) => (
              <button
                key={e.id}
                type="button"
                aria-pressed={e.id === selected}
                onClick={() => setSelected(e.id)}
                className={cn(
                  "min-h-[40px] rounded-md border px-3 text-[14px] font-medium",
                  e.id === selected ? "border-ip-orange bg-ip-orange text-black" : "border-ip-rule-strong bg-white text-black",
                )}
              >
                {e.label}
              </button>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 px-1 text-[12.5px] text-ip-muted">
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="inline-block h-2.5 w-4 rounded-sm bg-ip-orange" /> selected
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="inline-block h-2.5 w-4 rounded-sm bg-ip-orange-tint" /> directly related
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden="true" className="inline-block h-2.5 w-4 rounded-sm border border-dashed border-ip-rule-dashed" /> looks like one, isn’t
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6" aria-live="polite">
          {entities.map((e) => (
            <div key={e.id} hidden={e.id !== selected}>
              <p className="ip-label-sm m-0">{e.kind === "type" ? "Entity type" : e.kind === "excluded" ? "Not a customer" : "Entity"}</p>
              <p className="m-0 mt-1 text-[24px] font-semibold leading-[1.15] tracking-[-0.015em]">{e.label}</p>
              <p className="mt-3 mb-0 text-[15.5px] leading-[1.55] text-black">{e.definition}</p>
              <p className="ip-label-sm mt-5 mb-2">Rules</p>
              <ul className="m-0 list-disc space-y-1.5 pl-[18px] text-[14.5px] leading-[1.5] text-ip-body">
                {e.rules.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <p className="ip-label-sm mt-5 mb-2">Bound to the data</p>
              <ul className="m-0 list-none space-y-1 p-0">
                {e.bindings.map((b) => (
                  <li key={b} className="rounded bg-ip-grey px-2.5 py-1.5 font-mono text-[12.5px] leading-[1.4] text-black">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className={cn("mt-5 mb-0 border-t border-ip-rule pt-4 text-[13.5px] leading-[1.5] text-ip-muted")}>
            An agent reading this knows that “{sel.label.toLowerCase()}” has one meaning, which tables hold it, and which rules to apply before it answers.
          </p>
        </div>
      </div>
    </div>
  );
}
