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
 */

export type LearnBlock =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "h3"; text: string }
  | { type: "table"; caption: string; head: string[]; rows: string[][] }
  | { type: "quote"; text: string; source?: string };

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
    slug: "what-is-context-engineering",
    title: "What is context engineering?",
    definition:
      "Context engineering is making business meaning explicit and machine-readable: definitions, relationships, rules, permissions and freshness, delivered to people and AI agents when they ask a question.",
    description:
      "Context engineering makes business meaning explicit and machine-readable. A worked example of what goes wrong without each layer, and what good looks like.",
    datePublished: "2026-11-21",
    dateModified: "2026-11-21",
    capability: { label: "Enterprise Context Engineering", to: "/capabilities/context-engineering" },
    related: ["ontology-vs-semantic-layer-vs-knowledge-graph", "what-ai-readiness-means"],
    sections: [
      {
        id: "why-now",
        heading: "Why it matters now",
        blocks: [
          {
            type: "p",
            text: "For thirty years the consumer of enterprise data was a human analyst. Analysts carried the missing meaning in their heads: intercompany sales are excluded, a distributor counts as a customer, “last quarter” means the fiscal quarter. When a table was wrong, they noticed and fixed the query.",
          },
          {
            type: "p",
            text: "The new consumer is an AI agent. It knows none of this. It reads whichever table it finds first, applies the most literal interpretation of the question, and returns a confident, well-formatted answer. Meaning that lived in people’s heads now has to be written down, governed and readable by a machine.",
          },
          {
            type: "p",
            text: "The industry has reached the same conclusion. Across more than 50 agentic engagements, Cognizant found that context readiness, not model capability, keeps agents out of production. Gartner expects 60% of agentic analytics projects that rely only on MCP to fail by 2028 without a semantic layer.",
          },
        ],
      },
      {
        id: "worked-example",
        heading: "A worked example",
        blocks: [
          {
            type: "p",
            text: "Take one ordinary question: **“Who are our top 10 customers in France by margin last quarter?”** Here is what an agent does with each layer of context missing, and what it does when the layer is in place. The company and figures are fictional.",
          },
          {
            type: "table",
            caption: "What each layer of context changes in the answer",
            head: ["Layer", "Without it, the agent…", "With it, the agent…"],
            rows: [
              [
                "Definitions (semantic layer)",
                "Calculates margin as revenue minus list price, adds GBP to EUR, and uses the calendar quarter.",
                "Uses Group Finance’s gross margin definition, converts currency at monthly average rates, and uses the fiscal quarter.",
              ],
              [
                "Relationships (ontology)",
                "Counts the company’s own French subsidiary as its biggest customer.",
                "Knows an intercompany entity is not a customer, and that a distributor is.",
              ],
              [
                "Master data",
                "Lists one distributor twice, once under each ERP’s customer ID.",
                "Treats both records as one customer, so its margin is counted once and in full.",
              ],
              [
                "Permissions",
                "Shows a regional sales lead the margin on accounts outside their region.",
                "Returns only the rows that person, or that agent, is allowed to see.",
              ],
              [
                "Freshness",
                "Answers from a sales table that stopped loading on Tuesday, without saying so.",
                "States the data timestamp, and declines to answer if the table breaks its freshness rule.",
              ],
            ],
          },
          {
            type: "p",
            text: "Five errors, none of them caused by the model. Each one is fixed by context the agent can read before it answers. You can switch between both answers in the [interactive version on our context engineering page](/capabilities/context-engineering).",
          },
        ],
      },
      {
        id: "what-context-covers",
        heading: "The five things context covers",
        blocks: [
          {
            type: "ul",
            items: [
              "**Definitions.** What each business term means: margin, active customer, net revenue, last quarter. Defined once, with a formula, a grain, filters and an owner.",
              "**Relationships.** How business entities connect and the rules between them. A customer places orders; an order is booked by an operating company; intercompany is not a customer.",
              "**Master data.** Which records across systems are the same real-world customer, product or supplier.",
              "**Permissions.** Who, or which agent, may see which rows and columns, enforced in the data platform rather than in a prompt.",
              "**Freshness.** How current each source is, and the rule that says when it is too old to answer from.",
            ],
          },
        ],
      },
      {
        id: "related-terms",
        heading: "How it relates to other terms",
        blocks: [
          {
            type: "p",
            text: "A **semantic layer** is one part of context engineering: metrics and dimensions defined once and reused everywhere. An **ontology** describes the business entities, how they relate and the rules that apply, bound to the actual data. A **knowledge graph** connects actual records according to an ontology. The three are compared in [ontology vs semantic layer vs knowledge graph](/learn/ontology-vs-semantic-layer-vs-knowledge-graph).",
          },
          {
            type: "p",
            text: "**MCP** (Model Context Protocol) is a standard way for agents to call tools and data. It carries context to the agent; it does not create the meaning. **Grounding** is making an AI answer come from governed enterprise data, with sources, which is only possible once that context exists.",
          },
        ],
      },
      {
        id: "what-good-looks-like",
        heading: "What good looks like",
        blocks: [
          {
            type: "ul",
            items: [
              "Every metric a use case touches has one definition, one owner and a change process.",
              "The entities that cause wrong answers (customer, product, operating company) are modeled, with their rules written down and bound to tables.",
              "Each customer, product and supplier has one trusted record across ERPs.",
              "Agents have their own identities and inherit the same permissions as people.",
              "Every answer can state its definition, its source and how fresh the data is.",
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
            text: "We build and steward the semantic and context layers on the platform a client already runs, and we supply what platform features can’t: the business meaning across many ERPs and operating companies, and a routine that keeps it current. See [Enterprise Context Engineering](/capabilities/context-engineering).",
          },
        ],
      },
    ],
  },
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
    related: ["what-is-context-engineering", "what-ai-readiness-means"],
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
    related: ["what-is-context-engineering", "ontology-vs-semantic-layer-vs-knowledge-graph"],
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
];

export const learnBySlug = Object.fromEntries(learnArticles.map((a) => [a.slug, a])) as Record<string, LearnArticle>;

/** Glossary: the brief's terminology table (§4.3), used verbatim. */
export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  article?: string;
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
    article: "what-is-context-engineering",
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
