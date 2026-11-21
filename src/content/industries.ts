/**
 * Industries (brief §3.1, §7.8). Financial services removed. With the
 * `leadVertical` flag on, manufacturing and distribution leads.
 */
import type { StepId } from "./capabilities";

export interface Industry {
  id: string;
  name: string;
  short: string; // founder's one-liner
  problems: string[];
  steps: StepId[];
  caseStudyIds: string[];
}

export const industries: Industry[] = [
  {
    id: "manufacturing",
    name: "Manufacturing and distribution",
    short: "Many plants, many ERPs, one view of operations and margin.",
    problems: [
      "Acquisitions leave every operating company on its own ERP, with its own customer and product codes.",
      "Group reporting depends on regional teams reconciling spreadsheets before every review.",
      "SAP ECC end-of-maintenance forces platform decisions before the data is understood.",
      "Copilot and other agents arrive on master data nobody has reconciled.",
    ],
    steps: ["build", "contextualize", "enable"],
    caseStudyIds: ["erp-unification", "engine-demand-forecast", "capital-equipment"],
  },
  {
    id: "fmcg",
    name: "FMCG",
    short: "Supply, distribution and sales data joined up for faster decisions.",
    problems: [
      "Primary sales sit in the ERP, secondary sales in the distributor system and field activity in another app.",
      "Scheme and promotion rules are calculated by hand across distributor tiers.",
      "Sales leaders can't see fulfillment, route adherence and field productivity in one place.",
    ],
    steps: ["build", "activate"],
    caseStudyIds: ["fmcg-edible-oil", "retail-manufacturing-chain"],
  },
  {
    id: "energy",
    name: "Energy and utilities",
    short: "Asset, plant and operations data brought together for reliable planning.",
    problems: [
      "Decades of asset and maintenance records live in formats no current system reads.",
      "Equipment losses are found after the fact instead of predicted.",
      "Project, procurement and construction data never meet in one view.",
    ],
    steps: ["build", "activate"],
    caseStudyIds: ["energy-audit", "solar-bi"],
  },
  {
    id: "logistics",
    name: "Logistics and supply chain",
    short: "Inventory, routes and orders in one view, refreshed through the day.",
    problems: [
      "Inventory ageing and purchase orders are reviewed weeks after the decisions that caused them.",
      "Scheduling has to respect constraints a spreadsheet can't hold.",
      "Telemetry arrives in real time while reporting runs overnight.",
    ],
    steps: ["build", "activate"],
    caseStudyIds: ["ecom-inventory", "ev-fleet-scheduling", "ev-battery-predictive"],
  },
  {
    id: "retail",
    name: "Retail",
    short: "Sales, stock and store data unified for faster replenishment.",
    problems: [
      "Dealer and store performance is visible only in weekly reports.",
      "At-risk dealers are noticed after the revenue has moved.",
      "Product mix decisions are made without basket-level evidence.",
    ],
    steps: ["build", "activate"],
    caseStudyIds: ["retail-manufacturing-chain", "ecom-inventory"],
  },
];
