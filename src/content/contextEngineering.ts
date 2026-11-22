/**
 * /context-engineering: the general explainer (what it is, data modelling,
 * ontology, why it matters). Our delivery offer lives on the Contextualize
 * pillar page (/capabilities/context-engineering); this page links to it.
 * Replaces /learn/what-is-context-engineering (301).
 *
 * scripts/seo-config.mjs mirrors `ceSeo` and parses `ceFaq` for FAQPage
 * JSON-LD: keep the `q:` / `a:` string shape.
 */
import type { FaqItem } from "./capabilities";

export const ceSeo = {
  title: "What is context engineering? Data modelling and ontology for AI",
  description:
    "Context engineering makes business meaning explicit and machine-readable for AI agents. Data modelling, ontology and the layers that fix wrong answers.",
};

export const ceDefinition =
  "Context engineering is making business meaning explicit and machine-readable: definitions, relationships, rules, permissions and freshness, delivered to people and AI agents when they ask a question.";

/** Market term → the older discipline it renames (brief §2.1 thesis). */
export const vocabulary: [term: string, means: string, older: string][] = [
  ["Context layer, context engineering", "Business meaning, rules, permissions and freshness delivered to an AI at question time", "New as a package; a superset of the rest"],
  ["Ontology", "Business entities, relationships and rules, bound to data", "Conceptual data model plus business rules"],
  ["Semantic layer or model", "Metrics and dimensions defined once, reused everywhere", "Conformed dimensions, OLAP cube, Power BI dataset"],
  ["Knowledge graph", "Actual records connected according to the ontology", "Linked data, graph database"],
  ["Master data, entity resolution", "One trusted version of each customer, product, supplier", "MDM, deduplication"],
  ["Lineage, provenance", "Where a number came from", "Audit trail"],
  ["Evals", "Tests that check AI answers against known-correct results", "Regression testing, UAT"],
];

export const modellingLevels: { level: string; question: string; example: string }[] = [
  {
    level: "Conceptual",
    question: "What exists in the business, and how does it relate?",
    example: "Customer places Order. Order is booked by an Operating company. A Distributor is a type of Customer.",
  },
  {
    level: "Logical",
    question: "What attributes and keys does each thing have, independent of any tool?",
    example: "Customer: group customer ID, legal name, ship-to country, customer class.",
  },
  {
    level: "Physical",
    question: "Which tables and columns hold it on your platform?",
    example: "dim_customer in the lakehouse, fed from ERP A’s CUSTMAST and ERP B’s KNA1.",
  },
  {
    level: "Semantic",
    question: "How is it measured, so every tool and agent computes it the same way?",
    example: "Active customer = at least one invoiced order in the last 12 months, intercompany excluded.",
  },
];

export const ceFaq: FaqItem[] = [
  {
    q: "Is context engineering the same as prompt engineering?",
    a: "No. Prompt engineering shapes one request to a model. Context engineering builds the governed business meaning that every request can draw on: definitions, relationships, master data, permissions and freshness, maintained in your data platform rather than in a prompt.",
  },
  {
    q: "Do we need an ontology, or is a semantic layer enough?",
    a: "If your questions are about metrics on one well-modelled system, a semantic layer is often enough. You need an ontology when entities and rules cross systems: several ERPs, operating companies, intercompany trade, customer types with different rules. We decide on evidence, starting with the questions that go wrong.",
  },
  {
    q: "Doesn’t our data platform already do this?",
    a: "Platforms now ship the tooling: semantic models, ontology features, catalogs. They don’t know what margin means in your French operating company, or that two ERP records are one distributor. Someone has to define that meaning, bind it to your data and keep it current. That is the work.",
  },
  {
    q: "Which AI agents does this work with?",
    a: "Any of them. The context lives in your platform and open interfaces, not in one agent’s configuration, so Copilot, Genie, Claude, ChatGPT and your BI tools all read the same definitions, and switching agents later stays cheap.",
  },
  {
    q: "Where should we start?",
    a: "With the questions your people and agents actually ask. We pick the ones that go wrong, trace each error to the missing layer (a definition, a relationship, a duplicate record, a permission, a stale table) and fix those first.",
  },
];
