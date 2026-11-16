/**
 * Lightweight service-layer metadata for the navbar Services menu and the
 * per-layer colour accents on /services. Full copy for each layer lives in
 * src/pages/Services.tsx. `hash` must match the section ids that page
 * derives from each pillar's shortTitle (also used by the footer links).
 */

export interface ServiceLayer {
  number: string;
  name: string;
  layer: string;
  hash: string;
  line: string;
  group: "Advisory" | "Delivery";
  /** HSL triple ("H S% L%") used as hsl(var(--layer) / alpha). */
  accent: string;
}

export const SERVICE_LAYERS: ServiceLayer[] = [
  { number: "00", name: "Clarity Layer", layer: "Data & AI consultancy", hash: "clarity-layer", line: "Know before you build: maturity assessment, AI roadmap, business case.", group: "Advisory", accent: "38 92% 50%" },
  { number: "01", name: "Data Architecture", layer: "AI-Readiness Foundation", hash: "data-architecture", line: "Unify and stabilize your data estate: lakehouse, migration, governance.", group: "Delivery", accent: "199 89% 48%" },
  { number: "02", name: "Reliability & Ops", layer: "Reliability Layer", hash: "reliability-ops", line: "Observability, data quality and CI/CD, so the data can be trusted.", group: "Delivery", accent: "160 84% 39%" },
  { number: "03", name: "Analytics & Intelligence", layer: "Analytics Layer", hash: "analytics-intelligence", line: "Dashboards, semantic layers and self-serve BI that leaders use.", group: "Delivery", accent: "262 83% 58%" },
  { number: "04", name: "AI & ML Implementations", layer: "Predictive Layer", hash: "ai-ml-implementations", line: "Forecasting, ML and LLMs taken from experiment to production.", group: "Delivery", accent: "330 81% 58%" },
  { number: "05", name: "Automation Systems", layer: "Intelligence Layer", hash: "automation-systems", line: "AI agents and decision pipelines that act, not just inform.", group: "Delivery", accent: "25 100% 50%" },
];

export const accentFor = (number: string) => SERVICE_LAYERS.find((l) => l.number === number)?.accent ?? "25 100% 50%";
