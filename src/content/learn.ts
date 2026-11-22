/**
 * Learn: explainers and glossary (brief §6.3, §7.12).
 *
 * Written to be quotable by people and AI assistants: definition first, short
 * paragraphs, accurate terms (brief §4.3). Content is structured data so
 * scripts/seo-config.mjs can mirror titles, descriptions and dates.
 *
 * Inline markup supported in text: [link text](/path) and **bold**.
 * Industry figures are attributed to their source and used only here, never on
 * the homepage (brief §2.1). Verify source links before launch.
 *
 * "What is context engineering?" moved to its own page, /context-engineering
 * (2026-11-22); /learn/what-is-context-engineering 301s there.
 */

export type LearnBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "quote"; text: string; source?: string }
  /** An interactive widget, rendered by components/site/learn/RichText.tsx. */
  | { type: "widget"; name: "ontology-explorer" | "readiness-sim" | "two-answers" | "context-layers"; caption: string };

export interface LearnSection {
  id: string;
  heading: string;
  blocks: LearnBlock[];
}

export interface LearnArticle {
  slug: string;
  title: string;
  /** One-sentence, quotable definition shown first. */
  definition: string;
  /** Meta description (≤155 chars). */
  description: string;
  datePublished: string; // ISO date
  dateModified: string; // ISO date
  capability: { label: string; to: string };
  sections: LearnSection[];
  related: string[];
}

export const learnArticles: LearnArticle[] = [
  {
    slug: "ontology-vs-semantic-layer-vs-knowledge-graph",
    title: "Ontology vs semantic layer vs knowledge graph",
    definition:
      "A semantic layer defines metrics once, an ontology describes business entities and the rules between them, and a knowledge graph connects actual records according to that ontology.",
    description:
      "The difference between a semantic layer, an ontology and a knowledge graph, with one example and a comparison table. Which ones AI agents need, and when.",
    datePublished: "2026-11-21",
    dateModified: "2026-11-21",
    capability: { label: "Enterprise Context Engineering", to: "/capabilities/context-engineering" },
    related: ["why-ai-agents-give-wrong-answers", "what-ai-readiness-means"],
    sections: [
      {
        id: "one-example",
        heading: "Three terms, one example",
        blocks: [
          {
            type: "p",
            text: "The three terms are often used as if they were the same thing. They aren’t, and the difference matters when you decide what to build first. One small example runs through this page: **a customer places orders, and each order is booked by an operating company.**",
          },
        ],
      },
      {
        id: "semantic-layer",
        heading: "Semantic layer: how much",
        blocks: [
          {
            type: "p",
            text: "A semantic layer holds metrics and dimensions defined once and reused everywhere, for example in a Fabric semantic model. “Gross margin = net revenue minus standard cost, after rebates” is written once, so every dashboard and every agent calculates it the same way.",
          },
          {
            type: "p",
            text: "It answers questions about quantities: how much margin, how many orders, by which region and period. It doesn’t say what a customer is, or which records belong together.",
          },
        ],
      },
      {
        id: "ontology",
        heading: "Ontology: what is what",
        blocks: [
          {
            type: "p",
            text: "An ontology describes the business entities, how they relate and the rules that apply, bound to the actual data. In the example: Customer places Order; Order is booked by Operating company; a Distributor is a type of Customer; an Intercompany entity is not a Customer.",
          },
          {
            type: "p",
            text: "These rules are exactly what an analyst used to apply from memory. Written down, an agent can apply them too, which is why an ontology prevents errors a semantic layer alone can’t, such as counting your own subsidiary as a customer.",
          },
          {
            type: "widget",
            name: "ontology-explorer",
            caption: "Select an entity to see its definition, its rules and where it lives in two fictional ERPs.",
          },
        ],
      },
      {
        id: "knowledge-graph",
        heading: "Knowledge graph: which records, connected how",
        blocks: [
          {
            type: "p",
            text: "A knowledge graph is actual records connected according to an ontology. “Dubois Distribution” in one ERP and “Dubois Distribution SARL” in another become one customer node, linked to its orders, to the operating companies that booked them and to its sites.",
          },
          {
            type: "p",
            text: "It is most useful when the relationships themselves are the question: supplier networks, ownership structures, which plants depend on which part.",
          },
        ],
      },
      {
        id: "comparison",
        heading: "Side by side",
        blocks: [
          {
            type: "table",
            caption: "Semantic layer, ontology and knowledge graph compared",
            head: ["", "Semantic layer", "Ontology", "Knowledge graph"],
            rows: [
              ["What it holds", "Metrics and dimensions", "Entities, relationships and rules", "Actual records, connected"],
              ["Question it answers", "How much, by what", "What is what, and what counts", "Which records, connected how"],
              ["Example", "Gross margin defined once", "Intercompany is not a customer", "Two ERP records linked as one customer"],
              ["Where it usually lives", "BI or platform semantic model", "Documented model bound to tables, often in the catalog", "A graph store or graph tables on the platform"],
              ["Do agents need it?", "Yes, for any number they return", "Yes, wherever entities cause wrong answers", "When relationships are the question"],
            ],
          },
        ],
      },
      {
        id: "do-you-need-all-three",
        heading: "Do you need all three?",
        blocks: [
          {
            type: "p",
            text: "Usually not at once. Most enterprises get the largest gain from a semantic layer for the metrics a use case touches, plus an ontology for the few entities that cause wrong answers, typically customer, product and operating company. Master data then makes sure each of those entities has one trusted record.",
          },
          {
            type: "p",
            text: "A knowledge graph earns its place when the questions are about networks and dependencies. Starting by buying a graph database, before the definitions and rules exist, tends to produce a well-connected copy of the same confusion.",
          },
        ],
      },
      {
        id: "where-we-fit",
        heading: "Where InclinedPlane fits",
        blocks: [
          {
            type: "p",
            text: "We implement semantic layers and business models on the platform a client already runs, and decide with them, on evidence, whether a knowledge graph is worth adding. See [Enterprise Context Engineering](/capabilities/context-engineering).",
          },
        ],
      },
    ],
  },
  {
    slug: "what-ai-readiness-means",
    title: "What AI readiness actually means",
    definition:
      "AI readiness is evidence that data is complete, fresh, defined, governed and safe for an AI agent to use.",
    description:
      "AI readiness is evidence, not a feeling. The five checks (completeness, freshness, definitions, entitlements, lineage) and what “ready” looks like.",
    datePublished: "2026-11-21",
    dateModified: "2026-11-21",
    capability: { label: "AI and Agent Readiness", to: "/capabilities/ai-agent-readiness" },
    related: ["why-ai-agents-give-wrong-answers", "ontology-vs-semantic-layer-vs-knowledge-graph"],
    sections: [
      {
        id: "evidence-not-a-feeling",
        heading: "Evidence, not a feeling",
        blocks: [
          {
            type: "p",
            text: "“Our data is in the lakehouse” is not readiness. Readiness is the ability to show, for the data a specific AI use case needs, that it passes a defined set of checks, and to show the evidence when security, audit or the board asks.",
          },
          {
            type: "p",
            text: "Few organizations can do that today. In a Cloudera and Harvard Business Review Analytic Services survey published in March 2026, only 7% of enterprises said their data was fully ready for AI.",
          },
        ],
      },
      {
        id: "the-five-checks",
        heading: "The five checks",
        blocks: [
          { type: "h3", text: "Completeness" },
          {
            type: "p",
            text: "**What it checks:** the records and fields the use case needs are present. **Ready looks like:** every order has a customer, a product, a date and a currency, and every operating company in scope is loading. **A typical failure:** one country’s ERP stopped loading after a migration, so the agent reports that sales there fell by a third.",
          },
          { type: "h3", text: "Freshness" },
          {
            type: "p",
            text: "**What it checks:** each source arrives within its agreed window. **Ready looks like:** every table the use case reads has a freshness rule, passes it, and answers state their data timestamp. **A typical failure:** Tuesday’s load failed silently and the agent answers from Monday’s data on Friday.",
          },
          { type: "h3", text: "Definitions" },
          {
            type: "p",
            text: "**What it checks:** every metric and term the use case touches is defined once, with an owner. **Ready looks like:** the agent selects metrics from a semantic layer instead of writing its own calculations. **A typical failure:** finance, sales and one operating company each calculate margin differently, and the agent picks one at random.",
          },
          { type: "h3", text: "Entitlements" },
          {
            type: "p",
            text: "**What it checks:** agents can only reach data the person asking is allowed to see. **Ready looks like:** agents have their own identities, row and column security is enforced in the platform, and it has been tested with those identities. **A typical failure:** an aggregate question reveals figures from a team the user has no access to.",
          },
          { type: "h3", text: "Lineage" },
          {
            type: "p",
            text: "**What it checks:** any number can be traced back to its source. **Ready looks like:** lineage runs from the semantic model to the source field, step by step. **A typical failure:** audit asks where a figure in a board answer came from, and nobody can say.",
          },
        ],
      },
      {
        id: "try-it",
        heading: "Try it: run the checks",
        blocks: [
          {
            type: "p",
            text: "Here are the five checks run against one fictional sales table. Fix a failing check, or break a passing one, and watch the score and the agent’s verdict change.",
          },
          {
            type: "widget",
            name: "readiness-sim",
            caption: "A readiness gate decides whether an agent may answer. Sample data.",
          },
        ],
      },
      {
        id: "agent-readiness",
        heading: "What agent readiness adds",
        blocks: [
          {
            type: "p",
            text: "Agent readiness is AI readiness plus what agents specifically need:",
          },
          {
            type: "ul",
            items: [
              "**Governed access.** A defined, logged route for agents to reach data and tools, for example through MCP.",
              "**Entitlements for agents.** The same permission model as people, applied to agent identities.",
              "**An audit trail.** A record of who asked what, what the agent read and what it answered.",
              "**Evaluation.** Test suites that check AI answers against known-correct results, run before go-live and after every change.",
            ],
          },
        ],
      },
      {
        id: "how-its-assessed",
        heading: "How readiness is assessed",
        blocks: [
          {
            type: "ol",
            items: [
              "Start from one use case and the questions people will actually ask.",
              "List the data those questions need, down to tables and metrics.",
              "Run the five checks on that data and record the evidence for each finding.",
              "Score readiness for each data domain, so progress can be measured.",
              "Produce a fix-first list: the problems that block answers, in order.",
            ],
          },
          {
            type: "p",
            text: "That is the shape of our [AI Data Readiness Assessment](/assessment).",
          },
        ],
      },
      {
        id: "where-we-fit",
        heading: "Where InclinedPlane fits",
        blocks: [
          {
            type: "p",
            text: "We assess and prepare data environments so AI agents can find, read and act on enterprise data safely, on the stack the client already has. Where it helps, IncLever, our own data readiness product, runs the checks and keeps watch afterward. See [AI and Agent Readiness](/capabilities/ai-agent-readiness).",
          },
        ],
      },
    ],
  },
  {
    slug: "why-ai-agents-give-wrong-answers",
    title: "Why AI agents give wrong answers on enterprise data",
    definition:
      "AI agents give wrong answers on enterprise data mostly because the business meaning isn’t written down where they can read it: definitions, relationships, duplicate records, permissions and freshness.",
    description:
      "Most wrong answers from AI agents on enterprise data aren’t model errors. The five causes, how to spot each one, and the layer that fixes it.",
    datePublished: "2026-11-22",
    dateModified: "2026-11-22",
    capability: { label: "Enterprise Context Engineering", to: "/capabilities/context-engineering" },
    related: ["ontology-vs-semantic-layer-vs-knowledge-graph", "what-ai-readiness-means"],
    sections: [
      {
        id: "not-the-model",
        heading: "It’s rarely the model",
        blocks: [
          {
            type: "p",
            text: "When an agent gets a business question wrong, the first instinct is to blame the model and try a bigger one. On enterprise data that seldom helps. The model did what it was asked: it read the tables it could reach and took the most literal meaning of the question. What it lacked was the meaning your analysts carry in their heads.",
          },
          {
            type: "p",
            text: "That is why the fix is in the data, not the prompt. Each class of wrong answer maps to one missing layer of context, and each layer can be built, tested and owned. The full picture is on [context engineering, explained](/context-engineering).",
          },
        ],
      },
      {
        id: "five-causes",
        heading: "The five causes",
        blocks: [
          {
            type: "table",
            caption: "Five causes of wrong answers and the layer that fixes each",
            head: ["Cause", "What you see", "The layer that fixes it"],
            rows: [
              ["Undefined metrics", "Margin differs between the agent, finance and the dashboard.", "Semantic layer: one definition, one owner."],
              ["Missing business rules", "Your own subsidiary appears as a top customer.", "Ontology: intercompany is not a customer."],
              ["Duplicate records", "One distributor is listed twice, under two ERP IDs.", "Master data: one golden record across systems."],
              ["Loose permissions", "A regional lead sees accounts outside their region.", "Governed access: the agent inherits the asker’s permissions."],
              ["Stale data", "The answer is confident, and three days out of date.", "Freshness rules: the agent states the timestamp, or declines."],
            ],
          },
        ],
      },
      {
        id: "see-it",
        heading: "See all five in one answer",
        blocks: [
          {
            type: "p",
            text: "One ordinary question, “Who are our top 10 customers in France by margin last quarter?”, can hit all five at once. Switch between the raw answer and the governed one.",
          },
          {
            type: "widget",
            name: "two-answers",
            caption: "The same question on raw tables and through governed context. Fictional company and figures.",
          },
        ],
      },
      {
        id: "how-to-spot",
        heading: "How to find them in your own data",
        blocks: [
          {
            type: "ol",
            items: [
              "Collect 20 to 30 real questions your people ask, with answers finance or the business would sign off.",
              "Ask them through the agent and record every wrong or unexplained answer.",
              "Trace each error to its cause: a definition, a rule, a duplicate, a permission or a stale table.",
              "Fix the layer, not the question. A fixed definition corrects every future question that uses it.",
              "Keep the questions as an evaluation set and rerun it whenever data, definitions or the agent change.",
            ],
          },
        ],
      },
      {
        id: "where-we-fit",
        heading: "Where InclinedPlane fits",
        blocks: [
          {
            type: "p",
            text: "We do this tracing on a client’s own questions and data, then build the missing layers on the platform they already run. See [Enterprise Context Engineering](/capabilities/context-engineering) and [AI and Agent Readiness](/capabilities/ai-agent-readiness).",
          },
        ],
      },
    ],
  },
];

export const learnBySlug = Object.fromEntries(learnArticles.map((a) => [a.slug, a])) as Record<string, LearnArticle>;

/** Glossary: the brief's terminology table (§4.3), used verbatim. */
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  /** Learn article slug (/learn/<slug>)… */
  article?: string;
  /** …or any page that explains the term. */
  href?: string;
}

export const glossary: GlossaryTerm[] = [
  {
    id: "data-foundation",
    term: "Data foundation",
    definition: "The platforms, pipelines, models and controls that every analytics and AI use depends on.",
  },
  {
    id: "context-engineering",
    term: "Context engineering",
    definition:
      "Making business meaning explicit and machine-readable: definitions, relationships, rules, permissions and freshness, delivered to people and AI agents when they ask a question.",
    href: "/context-engineering",
  },
  {
    id: "semantic-layer",
    term: "Semantic layer",
    definition: "Metrics and dimensions defined once and reused everywhere (for example a Fabric semantic model).",
    article: "ontology-vs-semantic-layer-vs-knowledge-graph",
  },
  {
    id: "ontology",
    term: "Ontology",
    definition:
      "The business entities, how they relate, and the rules that apply, bound to the actual data (Customer places Order; Order booked by Operating company).",
    article: "ontology-vs-semantic-layer-vs-knowledge-graph",
  },
  {
    id: "knowledge-graph",
    term: "Knowledge graph",
    definition: "Actual records connected according to an ontology.",
    article: "ontology-vs-semantic-layer-vs-knowledge-graph",
  },
  { id: "master-data", term: "Master data, golden record", definition: "One trusted version of each customer, product, supplier." },
  { id: "entity-resolution", term: "Entity resolution", definition: "Working out that two records are the same real-world thing." },
  { id: "lineage", term: "Lineage", definition: "Where a number came from, step by step." },
  { id: "data-contract", term: "Data contract", definition: "A producer’s promise on schema, freshness and quality." },
  {
    id: "ai-readiness",
    term: "AI readiness",
    definition: "Evidence that data is complete, fresh, defined, governed and safe for an agent to use.",
    article: "what-ai-readiness-means",
  },
  {
    id: "agent-readiness",
    term: "Agent readiness",
    definition: "AI readiness plus agent-specific needs: governed access, entitlements, audit trail, evaluation.",
    article: "what-ai-readiness-means",
  },
  { id: "evals", term: "Evals", definition: "Test suites that check AI answers against known-correct results." },
  { id: "mcp", term: "MCP (Model Context Protocol)", definition: "A standard way for agents to call tools and data." },
  { id: "grounding", term: "Grounding", definition: "Making an AI answer come from governed enterprise data, with sources." },
  { id: "forward-deployed", term: "Forward-deployed", definition: "Engineers embedded with the client, building on the client’s real systems." },
];

/** Plain-text word count of an article, for reading time. */
export function readingMinutes(a: LearnArticle): number {
  const strip = (s: string) => s.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, "");
  let words = a.definition.split(/\s+/).length;
  for (const s of a.sections) {
    words += s.heading.split(/\s+/).length;
    for (const b of s.blocks) {
      if (b.type === "widget") continue;
      const text =
        b.type === "p" || b.type === "h3" || b.type === "quote"
          ? b.text
          : b.type === "ul" || b.type === "ol"
            ? b.items.join(" ")
            : [...b.head, ...b.rows.flat()].join(" ");
      words += strip(text).split(/\s+/).filter(Boolean).length;
    }
  }
  return Math.max(1, Math.round(words / 220));
}
