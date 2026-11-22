/**
 * Revamp metadata for the existing case studies (src/data/caseStudies.ts and
 * caseStudyDetails.ts stay the source of the stories themselves, and
 * scripts/seo-config.mjs parses them — don't change their shape).
 *
 * - steps: which of the four capabilities the work shows (editorial call;
 *   delivery leads should correct these). `stepsVerified: false` marks a tag the
 *   brief proposes but the founder hasn't approved.
 * - title: outcome-led, plain-language title used by the redesign.
 * - headline: the one result shown on cards.
 * - featured: shown large on home and at the top of /case-studies.
 * - region: shown only where known and safe to say.
 */
import type { StepId } from "./capabilities";

export interface CaseStudyMeta {
  id: string;
  title: string;
  steps: StepId[];
  /** Proposed extra step tags awaiting approval. */
  proposedSteps?: StepId[];
  headline: { value: string; label: string };
  secondary?: { value: string; label: string };
  region?: string;
  featured?: boolean;
  order: number;
}

export const caseStudyMeta: Record<string, CaseStudyMeta> = {
  "erp-unification": {
    id: "erp-unification",
    title: "One sales view for 25 to 30 operating companies running five-plus ERPs.",
    steps: ["build"],
    proposedSteps: ["contextualize"],
    headline: { value: "20 → 1", label: "Dashboards to one report" },
    secondary: { value: "2–3 wks", label: "To onboard an operating company" },
    region: "EMEA",
    featured: true,
    order: 1,
  },
  "governed-finance-semantic-layer": {
    id: "governed-finance-semantic-layer",
    title: "Hidden finance logic turned into a governed layer an AI assistant can use.",
    steps: ["contextualize", "enable"],
    headline: { value: "20", label: "Finance metrics, each with evidence" },
    secondary: { value: "134", label: "Audit rules from the layer" },
    region: "India",
    featured: true,
    order: 2,
  },
  "global-lead-time": {
    id: "global-lead-time",
    title: "One lead time, in calendar days, for every sales company across four supply sites.",
    steps: ["build"],
    proposedSteps: ["contextualize"],
    headline: { value: "4 → 1", label: "Supply sites, one report" },
    secondary: { value: "~85%", label: "Faster model refresh" },
    region: "EMEA and South America",
    order: 2.5,
  },
  "fmcg-edible-oil": {
    id: "fmcg-edible-oil",
    title: "An edible oil producer gets supply and delivery data working as one.",
    steps: ["build", "activate"],
    headline: { value: "27%", label: "Faster order turnaround" },
    secondary: { value: "+25%", label: "Route adherence" },
    region: "India",
    order: 2.7,
  },
  "retail-manufacturing-chain": {
    id: "retail-manufacturing-chain",
    title: "A national retail and manufacturing chain moves from weekly spreadsheets to daily decisions.",
    steps: ["build", "activate"],
    headline: { value: "30%", label: "Senior reporting time freed" },
    order: 3,
  },
  "engine-demand-forecast": {
    id: "engine-demand-forecast",
    title: "Engine demand forecasts that feed production planning directly.",
    steps: ["activate"],
    headline: { value: "17%", label: "Inventory cost cut" },
    order: 4,
  },
  "capital-equipment": {
    id: "capital-equipment",
    title: "A capital equipment manufacturer lays its data foundation ahead of growth.",
    steps: ["build"],
    headline: { value: "ERP", label: "Implementation and governance groundwork" },
    order: 5,
  },
  "ecom-inventory": {
    id: "ecom-inventory",
    title: "Inventory ageing and purchase orders across hundreds of thousands of SKUs.",
    steps: ["build", "activate"],
    headline: { value: "24%", label: "Fewer stock-outs" },
    secondary: { value: "17%", label: "Inventory value cut" },
    order: 6,
  },
  "pharma-sales-bi": {
    id: "pharma-sales-bi",
    title: "A pharmaceutical sales force replaces weekly Excel reporting with automated BI.",
    steps: ["build", "activate"],
    headline: { value: "100%", label: "Weekly reporting automated" },
    order: 7,
  },
  "pharma-mnc": {
    id: "pharma-mnc",
    title: "Sales ERP data turned into operational, tactical and strategic views for a pharmaceutical MNC.",
    steps: ["build", "activate"],
    headline: { value: "3", label: "Decision levels served from one layer" },
    order: 8,
  },
  "energy-audit": {
    id: "energy-audit",
    title: "Thirty years of energy and maintenance data, used to catch failures early.",
    steps: ["build", "activate"],
    headline: { value: "30+ yrs", label: "Data consolidated" },
    order: 9,
  },
  "solar-bi": {
    id: "solar-bi",
    title: "Project delays and supplier dependencies made visible for a solar infrastructure business.",
    steps: ["build", "activate"],
    headline: { value: "4", label: "Project functions in one view" },
    order: 10,
  },
  "ev-battery-predictive": {
    id: "ev-battery-predictive",
    title: "Predicting EV battery failures from fleet telemetry.",
    steps: ["activate"],
    headline: { value: "98%+", label: "Classifier accuracy" },
    order: 11,
  },
  "ev-fleet-scheduling": {
    id: "ev-fleet-scheduling",
    title: "Battery-aware scheduling for an electric cab fleet.",
    steps: ["activate"],
    headline: { value: "100%", label: "Battery-aware trip assignments" },
    order: 12,
  },
  "vc-edtech": {
    id: "vc-edtech",
    title: "A venture-funded education company gets its first reliable BI foundation.",
    steps: ["build", "activate"],
    headline: { value: "BI", label: "Foundation from scattered data" },
    order: 13,
  },
  "cultural-heritage": {
    id: "cultural-heritage",
    title: "Evidence-based planning for cultural sites in the Middle East.",
    steps: ["activate"],
    headline: { value: "Geo", label: "Population and landmark analysis" },
    region: "Middle East",
    order: 14,
  },
};
