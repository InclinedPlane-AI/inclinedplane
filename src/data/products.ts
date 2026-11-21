/**
 * Product catalogue: the single source for the navbar Products menu, the
 * /products hub and the demo-request dialog. Copy follows the PipelineIQ
 * project reference (client kept confidential) and the IncLever product
 * walkthrough's claims register (no unverified performance figures).
 */

export type ProductId = "pipelineiq" | "inclever";

export interface Product {
  id: ProductId;
  name: string;
  path: string;
  kicker: string;
  tagline: string;
  /** Who it's for, in a few words (menu, cards, hero). */
  audience: string;
  /** One sentence expanding on the audience. */
  audienceNote: string;
  roles: string[];
  brief: string;
  bullets: string[];
  demoAgenda: string[];
}

export const PRODUCTS: Product[] = [
  {
    id: "pipelineiq",
    name: "PipelineIQ",
    path: "/products/pipelineiq",
    kicker: "Pipeline observability",
    tagline: "From what failed to why.",
    audience: "For data engineers and platform teams",
    audienceNote: "The people who build, run and support the pipelines, and get the call when a night fails.",
    roles: ["Data engineers on support", "Platform leads", "Release managers", "Ingestion owners", "Warehouse owners"],
    brief:
      "Read-only monitoring, alerting and ETL debugging that turns hundreds of pipeline failures into a handful of root causes.",
    bullets: ["Root causes, not cascades", "Alerts judged against each table's own history", "Installs nothing, writes nothing"],
    demoAgenda: [
      "A live walkthrough of the portal on a real data estate",
      "Error signatures, stack traces and incidents, end to end",
      "How the client layer would map onto your stack",
      "The read-only access it needs, and nothing more",
    ],
  },
  {
    id: "inclever",
    name: "IncLever",
    path: "/products/inclever",
    kicker: "Governed AI analytics",
    tagline: "AI answers you can audit.",
    audience: "For business users and analysts",
    audienceNote: "The people who use data to make decisions, while your data team keeps it governed behind the scenes.",
    roles: ["Business users", "Analysts and BI leads", "Finance leadership", "Heads of data", "Audit and risk"],
    brief:
      "Ask your data questions in Microsoft Teams. IncLever answers only when your data has earned it, and says exactly why when it hasn't.",
    bullets: ["Three gates before every number", "Readiness certificates for every data asset", "Every gap becomes owned, tracked work"],
    demoAgenda: [
      "Questions travelling through the three gates, live in Teams",
      "An honest refusal, a held answer and a governed answer",
      "A readiness certificate: issued, withheld and remediated",
      "What an AI Readiness Assessment on one of your assets involves",
    ],
  },
];

export const getProduct = (id: ProductId) => PRODUCTS.find((p) => p.id === id)!;
