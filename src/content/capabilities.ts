/**
 * The four capabilities on one path (brief §3.2, founder-confirmed names).
 * One name per pillar everywhere. Feeds: the incline, home sections,
 * /capabilities and the four capability pages.
 *
 * Items with `verified: false` are capabilities/tools a delivery lead must
 * confirm against a real project before launch (brief §4.4).
 */
import type { Verifiable } from "./verify";

export type StepId = "build" | "contextualize" | "enable" | "activate";
export type StepTone = "grey" | "orange" | "black";

export interface Item extends Verifiable {
  label: string;
}

export interface Deliverable {
  title: string;
  detail: string;
}

export interface FaqItem {
  q: string;
  a: string;
  /** Only show when this proposed flag is on. */
  flag?: "agentNeutrality" | "twoTierAssessment" | "runService";
}

export interface Capability {
  id: StepId;
  step: string; // Build, Contextualize, Enable, Activate
  name: string;
  slug: string;
  path: string;
  tone: StepTone;
  /** Position on the path, as the founder labels it. */
  position: string;
  short: string;
  promise: string;
  problem: string;
  problemBody: string;
  whatWeDo: string[];
  included: Item[];
  deliverables: Deliverable[];
  process: { title: string; detail: string }[];
  processTitle: string;
  outcome: string;
  proof: { text: string; verified: boolean; caseStudyIds: string[] };
  faq: FaqItem[];
  seo: { title: string; description: string };
}

const v = (label: string, verified = true): Item => ({ label, verified });

export const capabilities: Capability[] = [
  {
    id: "build",
    step: "Build",
    name: "Data Engineering and Governance",
    slug: "data-engineering-governance",
    path: "/capabilities/data-engineering-governance",
    tone: "grey",
    position: "Underneath",
    short: "Modern platforms and pipelines, with quality, lineage and controls built in.",
    promise:
      "Platforms and pipelines your business can run on, with quality, lineage and access controls built in from the first table.",
    problem: "Your data lives in a dozen systems, and every report starts with someone reconciling them by hand.",
    problemBody:
      "Acquisitions added ERPs. Each operating company kept its own codes. The warehouse grew one urgent request at a time, so nobody can say where a number came from or whether last night's load finished. Analysts spend the morning checking the data before they can use it. An AI agent won't do that checking for you.",
    whatWeDo: [
      "We design and build the platform underneath everything else: the lakehouse or warehouse, the pipelines into it, and the controls that keep it trustworthy.",
      "We build on the platform you already run. Where a piece is past its useful life, we modernize that piece in place rather than starting again.",
    ],
    included: [
      v("Lakehouse and warehouse platforms on Fabric, Databricks and Azure"),
      v("Pipelines, ETL and ELT, and orchestration"),
      v("ERP onboarding and multi-ERP harmonization"),
      v("Legacy platform modernization"),
      v("Data quality rules and data contracts"),
      v("Lineage and metadata management"),
      v("Access controls and governance frameworks"),
      v("Master data management", false),
      v("Performance and cost tuning"),
    ],
    deliverables: [
      {
        title: "A target platform design",
        detail:
          "Layers, environments, naming, security model and deployment pipeline, written down and agreed before anything is built.",
      },
      {
        title: "Pipelines that say when they fail",
        detail: "Orchestrated loads with retries, freshness checks and alerts that go to a named owner, not a shared inbox.",
      },
      {
        title: "A repeatable ERP onboarding pattern",
        detail: "A new source maps into the canonical model without rebuilding the reports and models downstream of it.",
      },
      {
        title: "Quality and lineage you can show an auditor",
        detail: "Rules on the tables that matter, and lineage from any report back to the source field it came from.",
      },
    ],
    processTitle: "From many sources to one trusted platform",
    process: [
      { title: "Sources", detail: "ERPs, CRM, field and distributor systems, files and APIs, as they are today." },
      { title: "Ingest", detail: "Incremental loads and change capture where the source supports it." },
      { title: "Standardize", detail: "Clean, conform codes across ERPs and apply quality rules." },
      { title: "Model", detail: "Canonical entities and analysis-ready tables, documented." },
      { title: "Serve", detail: "BI, semantic models and AI agents read from one governed layer." },
    ],
    outcome: "One platform, one set of pipelines, and numbers people stop double-checking.",
    proof: {
      text: "A schema-agnostic platform for 25 to 30 EMEA operating companies on five-plus ERPs, processing 80 million rows or more per ETL cycle, three times a day.",
      verified: true,
      caseStudyIds: ["erp-unification", "global-lead-time", "fmcg-edible-oil"],
    },
    faq: [
      {
        q: "Do we have to move to a new platform?",
        a: "No. We build on what you run today. If a component is past its useful life, such as an on-premises warehouse or an extract nobody maintains, we modernize that piece and leave the rest in place.",
      },
      {
        q: "How long does it take to onboard a new ERP?",
        a: "On the EMEA manufacturing platform, each new ERP took 2 to 6 weeks once the canonical model and onboarding pattern existed. The first source takes longer, because that is when the pattern is built.",
      },
      {
        q: "Where does governance fit?",
        a: "In the build. Quality rules, lineage, access controls and ownership go in as the tables are created, not as a separate programme afterward. Governance specific to AI, such as what an agent may read, sits in AI and Agent Readiness.",
      },
      {
        q: "Can you work alongside our internal data team?",
        a: "Yes, and most engagements do. We agree who owns what, build in your repositories and environments, and document as we go so your team can run it after we hand over.",
      },
    ],
    seo: {
      title: "Data Engineering and Governance",
      description:
        "Lakehouse and warehouse platforms, pipelines and ERP onboarding on Fabric, Databricks and Azure, with quality, lineage and access controls built in.",
    },
  },
  {
    id: "contextualize",
    step: "Contextualize",
    name: "Enterprise Context Engineering",
    slug: "context-engineering",
    path: "/capabilities/context-engineering",
    tone: "orange",
    position: "Expanded",
    short: "Business meaning AI can use.",
    promise:
      "Business meaning made explicit, governed and machine-readable, so people and AI agents get answers your teams agree with.",
    problem: "Your AI gives confident answers that don’t match how your business defines its numbers.",
    problemBody:
      "Margin means one thing in finance, another in sales and a third in the French operating company. Your ERPs disagree about who your customers are. For thirty years an analyst carried that meaning in their head and quietly fixed the query. An AI agent knows none of it, and it will believe whichever table it reads first.",
    whatWeDo: [
      "We build and steward the semantic and context layers that give enterprise data its business meaning, so people and AI agents get answers your teams agree with.",
      "Definitions, relationships, rules, permissions and freshness become explicit and governed, and are delivered to whoever asks the question, human or agent.",
    ],
    included: [
      v("Semantic layers"),
      v("Business metric definitions"),
      v("Enterprise context layers"),
      v("Metadata enrichment"),
      v("AI-ready data modeling"),
      v("Organization and hierarchy reconciliation across operating companies"),
      v("Master data and entity resolution", false),
      v("Business ontologies", false),
      v("Knowledge graphs", false),
    ],
    deliverables: [
      {
        title: "A metric catalogue people sign off",
        detail:
          "Each metric defined once: formula, grain, filters, owner and the exceptions that apply, agreed with finance and the business.",
      },
      {
        title: "A semantic model on your platform",
        detail:
          "Metrics and dimensions implemented in the semantic layer you already use, so BI tools and agents read the same definitions.",
      },
      {
        title: "A model of how your business fits together",
        detail:
          "Entities, how they relate and the rules that apply (a distributor is a customer; an intercompany sale is not), bound to the actual tables.",
      },
      {
        title: "One record for the entities that matter",
        detail: "One customer, one product, one supplier across ERPs, with the matching rules written down and owned.",
      },
    ],
    processTitle: "The layers between a question and a correct answer",
    process: [
      { title: "Definitions", detail: "What each term means: margin, customer, active, last quarter." },
      { title: "Relationships", detail: "How entities connect: a customer places orders, booked by an operating company." },
      { title: "Master data", detail: "Which records are the same real-world thing across systems." },
      { title: "Permissions", detail: "Who, or which agent, may see which rows and columns." },
      { title: "Freshness", detail: "How current the data is, stated with every answer." },
    ],
    outcome: "One shared definition of every metric, readable by your BI tools and your AI agents alike.",
    proof: {
      text: "A governed finance semantic layer for a listed engineering manufacturer: 20 metrics, each claim tied to its evidence, unsafe ones blocked, audited by IncLever.",
      verified: true,
      caseStudyIds: ["governed-finance-semantic-layer", "erp-unification"],
    },
    faq: [
      {
        q: "Is this the same as a semantic layer?",
        a: "A semantic layer is one part of it: metrics and dimensions defined once. Context engineering also covers how entities relate, which records are the same thing, who may see what and how fresh the data is. An agent needs all of these to answer correctly.",
      },
      {
        q: "Do we need a new tool for this?",
        a: "Usually not. Microsoft Fabric, Databricks and Snowflake all ship semantic and context features. We implement them, and supply what they can't: the business meaning across your ERPs and operating companies, and a routine that keeps it current.",
      },
      {
        q: "Who owns the definitions after you leave?",
        a: "Your business does. Every definition has a named owner and a change process. We set up the stewardship routine with your team as part of the work.",
      },
      {
        q: "Will this tie us to one AI agent?",
        a: "No. The definitions live in your platform, not inside an agent. Your business logic stays yours, whichever agent you choose next year.",
        flag: "agentNeutrality",
      },
    ],
    seo: {
      title: "Enterprise Context Engineering",
      description:
        "Semantic layers, metric definitions and business context made explicit and machine-readable, so BI tools and AI agents give answers your teams agree with.",
    },
  },
  {
    id: "enable",
    step: "Enable",
    name: "AI and Agent Readiness",
    slug: "ai-agent-readiness",
    path: "/capabilities/ai-agent-readiness",
    tone: "orange",
    position: "Expanded",
    short: "Data that agents can safely reach.",
    promise:
      "Evidence that your data is complete, fresh, defined and governed enough for an AI agent to act on, and the access and controls to let it.",
    problem: "Your AI pilots work in the demo, then stall on real enterprise data.",
    problemBody:
      "The pilot ran on a clean extract. Production means live tables with gaps, late loads, conflicting definitions and permissions nobody designed for a machine. Security asks what the agent can see. Audit asks how an answer was produced. Without evidence, the rollout waits.",
    whatWeDo: [
      "We assess and prepare your data environment so AI agents can find, read and act on enterprise data safely, with the access controls and context they need.",
      "Our team does this work on your existing stack and tools. Where it helps, IncLever, our own data readiness product, speeds it up.",
    ],
    included: [
      v("Data readiness assessments"),
      v("Agent-ready architecture"),
      v("AI data access frameworks"),
      v("Evaluation suites built from your own questions"),
      v("Intelligent data routing"),
      v("Agent orchestration foundations"),
      v("Monitoring after go-live"),
      v("MCP integrations", false),
      v("Retrieval systems and vector databases", false),
    ],
    deliverables: [
      {
        title: "A scored readiness assessment",
        detail:
          "Completeness, freshness, definitions, entitlements and lineage checked on the data your use case needs, with evidence for every finding and a fix-first list.",
      },
      {
        title: "Governed access for agents",
        detail:
          "Agent identities, row and column permissions enforced in the platform, and an audit trail of what each agent read and answered.",
      },
      {
        title: "Evaluations on your questions",
        detail:
          "Test sets built from questions your people actually ask, with known-correct answers, run before go-live and after every change.",
      },
      {
        title: "Monitoring after go-live",
        detail: "Checks that catch drift in data, definitions or answers, and route each problem to a named owner.",
      },
    ],
    processTitle: "From a promising pilot to an agent in production",
    process: [
      { title: "Assess", detail: "Check the data the use case needs against readiness rules, with evidence." },
      { title: "Fix", detail: "Close the gaps that block answers first, in priority order." },
      { title: "Connect", detail: "Give the agent governed, logged access to the context layer." },
      { title: "Evaluate", detail: "Test answers against known-correct results before anyone relies on them." },
      { title: "Monitor", detail: "Keep checking after go-live, so problems are found before users find them." },
    ],
    outcome: "AI that moves from pilot to production, on data you can trust and govern.",
    proof: {
      text: "20+ conversational analytics agents deployed on governed enterprise data.",
      verified: false,
      caseStudyIds: ["governed-finance-semantic-layer"],
    },
    faq: [
      {
        q: "What does an AI Data Readiness Assessment cover?",
        a: "Quality, context, access and governance, checked against what your chosen AI use case needs. You get findings with evidence, a readiness view for each data domain, and a prioritized roadmap.",
      },
      {
        q: "Do we need IncLever for this?",
        a: "No. With or without IncLever, the expertise is the same. It simply gets you there faster and keeps watch afterward.",
      },
      {
        q: "How do you stop an agent seeing data it shouldn't?",
        a: "Agents get their own identities and inherit the same permission model as people, enforced in the data platform rather than in the prompt. Every query is logged, so you can show who asked what and what came back.",
      },
      {
        q: "Which AI agents do you work with?",
        a: "We aren't tied to an agent vendor. We start from the use case, test the options on your own questions and data, and make the agent you choose work on governed context.",
        flag: "agentNeutrality",
      },
    ],
    seo: {
      title: "AI and Agent Readiness",
      description:
        "Data readiness assessments, governed agent access, evaluations and monitoring, so AI agents move from pilot to production on data you can trust.",
    },
  },
  {
    id: "activate",
    step: "Activate",
    name: "Agentic Analytics and BI",
    slug: "agentic-analytics",
    path: "/capabilities/agentic-analytics",
    tone: "black",
    position: "On top",
    short: "Conversational agents that investigate, analyze and explain enterprise data.",
    promise: "Agents from any vendor give correct, governed answers on your data.",
    problem: "Your teams have hundreds of dashboards and still wait days for answers to new questions.",
    problemBody:
      "Every new question becomes a ticket. Dashboards answer what someone anticipated last year. Leaders want to ask why margin fell in a region and get an answer with the working shown, not a chart to interpret.",
    whatWeDo: [
      "We build conversational analytics agents and agentic BI on governed semantic models, so every answer comes with its definition, source and freshness.",
      "Because the agent reads the context layer underneath, it can explain its working, and it declines to answer when the data hasn't passed its checks.",
    ],
    included: [
      v("Conversational analytics agents"),
      v("Agentic BI on governed semantic models"),
      v("Natural language querying"),
      v("Root-cause analysis"),
      v("Automated insights"),
      v("Predictive analytics and forecasting"),
      v("Decision intelligence"),
    ],
    deliverables: [
      {
        title: "Conversational analytics where people work",
        detail:
          "Ask in Teams, in the BI tool or in a portal. Answers carry the metric definition, the source and the timestamp.",
      },
      {
        title: "Root-cause investigations",
        detail: "An agent that drills from a variance to the drivers behind it, and shows each step it took.",
      },
      {
        title: "Dashboards rebuilt on the semantic model",
        detail: "Fewer dashboards and one definition per number, so the dashboard and the agent always agree.",
      },
      {
        title: "Forecasts served where decisions happen",
        detail: "Demand, maintenance and attrition models wired into planning and procurement, not left in a notebook.",
      },
    ],
    processTitle: "How a governed answer is produced",
    process: [
      { title: "Question", detail: "Someone asks in plain language, in the tool they already use." },
      { title: "Interpret", detail: "The question maps to governed metrics, dimensions and time windows." },
      { title: "Check", detail: "Permissions and readiness are checked before any number is returned." },
      { title: "Answer", detail: "The result comes with its definition, source and freshness." },
      { title: "Improve", detail: "Feedback and new questions feed the evaluation set." },
    ],
    outcome: "Correct, explainable answers your teams act on, in the tools they already use.",
    proof: {
      text: "An FMCG producer's sales head got one view of primary, secondary and field-force performance, refreshed four times a day.",
      verified: true,
      caseStudyIds: ["fmcg-edible-oil", "retail-manufacturing-chain", "engine-demand-forecast"],
    },
    faq: [
      {
        q: "Will an agent replace our BI tool?",
        a: "No. It sits alongside it and reads the same semantic model. Dashboards cover the questions you ask every week; the agent covers the new ones.",
      },
      {
        q: "What stops it making up a number?",
        a: "The agent selects from defined metrics and dimensions instead of writing free-form queries against raw tables, and every answer shows the definition and source it used. When the data hasn't passed its readiness checks, it says so instead of answering.",
      },
      {
        q: "Which BI tools do you work with?",
        a: "Power BI, Tableau, Qlik and Looker, plus the native agents in Microsoft Fabric and Databricks where you already use them.",
      },
    ],
    seo: {
      title: "Agentic Analytics and BI",
      description:
        "Conversational analytics agents and agentic BI on governed semantic models: answers that show their definition, source and freshness.",
    },
  },
];

export const capabilityById = Object.fromEntries(capabilities.map((c) => [c.id, c])) as Record<StepId, Capability>;
export const capabilityBySlug = Object.fromEntries(capabilities.map((c) => [c.slug, c])) as Record<string, Capability>;

/** Step name → tone, for tags. */
export const stepTone: Record<StepId, StepTone> = {
  build: "grey",
  contextualize: "orange",
  enable: "orange",
  activate: "black",
};
