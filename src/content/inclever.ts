/**
 * IncLever product page content (/products/inclever). Substance carried over
 * from the previous product page (components/products/Inclever.tsx),
 * restructured to brief §7.4. Spelling: "IncLever" everywhere.
 */
import type { FaqItem } from "./capabilities";
import type { Verifiable } from "./verify";

export const incleverDemoUrl = "https://claude.ai/artifact/5jo3322UsS1tUX4jpz92g5";

export const incleverPains = [
  "We built a chatbot on our warehouse and it confidently gave a finance director the wrong number.",
  "Nobody can tell me whether our data is good enough for AI. Only that it’s “mostly fine”.",
  "Audit won’t sign off on letting an AI near finance data.",
];

/** Readiness audit stages. A real sequence, so numbering is allowed. */
export const auditStages = [
  { title: "Orientation", checks: "Are we auditing the right, live system? Is every expected table present and loaded?", flag: "Documented tables that don’t exist; empty tables." },
  { title: "Structure", checks: "Column catalogue, data types that match meaning, the grain of every table.", flag: "Money stored as text; duplicates where every row should be unique." },
  { title: "Volume and loading", checks: "Load schedule, gaps, business-period coverage, backfill versus ongoing loads.", flag: "A “live” table with no recent loads; a missing month." },
  { title: "Column quality", checks: "Nulls, placeholders posing as data (“N/A”, “TBD”), outliers, mixed currencies or units.", flag: "An amount column silently mixing currencies, so totals are meaningless." },
  { title: "Relationships", checks: "Do joins actually match? Orphan records, duplicate reference tables, joins on free text.", flag: "Transactions referencing codes that don’t exist in the master table." },
  { title: "Business logic", checks: "Fiscal calendar, cumulative versus periodic measures, manual adjustments, classification rules.", flag: "A year-to-date column being summed as if it were monthly." },
  { title: "AI readiness", checks: "Is every finding translated into a rule the AI respects, and tagged “fix at source” or “handle in the AI layer”?", flag: "A known issue recorded in a report but never enforced." },
];

export const verdicts = [
  { name: "Passed", body: "The rule’s condition was met." },
  { name: "Failed", body: "A genuine finding about the data. Never used for a technical problem." },
  { name: "Not evaluated", body: "The rule couldn’t be checked. Never counted as a failure, never counted as a pass." },
];

/** The three gates every confirmed question passes, always in this order. */
export const gates = [
  { name: "Entitlement", body: "Is this person allowed to see this number? Checked first, so a refusal reveals nothing about the data." },
  { name: "Answerability", body: "Does the question map to metrics, dimensions and time windows you have defined? If not, it says so." },
  { name: "Assurance", body: "Have the tables behind it passed their readiness checks? A blocking failure holds the answer and names the check." },
];

export const answerLevels = [
  { name: "Ask the agent now", body: "An immediate answer on audited data." },
  { name: "Agent now, review to follow", body: "An immediate answer marked provisional, corrected in the same thread if a reviewer finds it wrong." },
  { name: "Agent, held for review", body: "Produced but not sent until a named person signs it." },
  { name: "Ask a person", body: "A named analyst owns the answer, with the AI’s draft and every relevant verdict." },
];

/** Gaps become owned work. */
export const tasks = [
  { task: "Review", when: "An answer needs a signature", owner: "Reviewer", clock: "4h" },
  { task: "Grant or refuse", when: "Someone was refused on permissions", owner: "Permission owner", clock: "8h" },
  { task: "Fix the data", when: "A blocking rule is failing under a live question", owner: "Data owner", clock: "24h" },
  { task: "Answer it", when: "The asker chose a person", owner: "Analyst", clock: "24h" },
  { task: "Declare it", when: "A metric, dimension or window isn’t defined", owner: "Semantic layer author", clock: "72h" },
  { task: "Teach the word", when: "Wording nobody has defined a synonym for", owner: "Semantic layer author", clock: "72h" },
];

export const surfaces = [
  { name: "IncLever Ask", who: "Business users, in Microsoft Teams", body: "Ask in plain English, get governed answers." },
  { name: "AI Readiness Control Tower", who: "Data owners and governance", body: "Continuously audit data and definitions, certify readiness, manage remediation." },
  { name: "Monitor", who: "Data team, governance, audit", body: "A read-only view of every conversation, every decision and the human work queue." },
  { name: "Configure", who: "Platform admins", body: "Register sources, assets, definitions, dashboards, channels, people and rules." },
];

export const personas = [
  { role: "CFO and finance", cares: "Numbers they can stand behind.", gets: "Answers that carry their evidence, or are refused with a reason." },
  { role: "CDO and head of data", cares: "Proving data is fit for AI, at scale.", gets: "A continuous, rule-based readiness audit with certificates." },
  { role: "Audit, risk and compliance", cares: "Traceability and control.", gets: "A full decision trail for every question, refusal and exception." },
  { role: "Analytics and BI leads", cares: "Fewer repetitive requests, no shadow numbers.", gets: "Self-serve answers on governed definitions, with gaps routed back as tracked work." },
  { role: "Business users", cares: "A quick, trustworthy answer where they already work.", gets: "Plain-English questions and answers inside Microsoft Teams." },
];

export const comparison = {
  columns: ["Chatbot on your warehouse", "Dashboards", "IncLever"],
  rows: [
    { label: "Answers plain-English questions", values: ["yes", "no", "yes"] },
    { label: "Only uses metrics you’ve defined", values: ["no", "yes", "yes"] },
    { label: "Knows whether the data is fit right now", values: ["no", "no", "yes"] },
    { label: "Refuses with the specific reason", values: ["no", "no", "yes"] },
    { label: "Checks permission before reading anything", values: ["partial", "yes", "yes"] },
    { label: "Every answer traceable to its evidence", values: ["no", "partial", "yes"] },
    { label: "Unanswered questions become owned work", values: ["no", "no", "yes"] },
  ] as { label: string; values: ("yes" | "no" | "partial")[] }[],
};

/** How it runs. The team must confirm this wording before launch. */
export const howItRuns: (Verifiable & { title: string; body: string })[] = [
  { title: "Inside your tenant", body: "IncLever runs in your own cloud environment, next to the data it checks.", verified: false },
  { title: "Read-only for assessments", body: "An assessment needs read access to the datasets in scope, agreed with your security team. It changes nothing.", verified: false },
  { title: "Your data stays put", body: "Business data doesn’t leave your environment. Verdicts and evidence are stored where you can audit them.", verified: false },
  { title: "Every decision on record", body: "Every question, gate decision, refusal, task and exception is written to a permanent record you can replay in Monitor.", verified: true },
];

export const incleverFaq: FaqItem[] = [
  {
    q: "Does IncLever replace our BI tool?",
    a: "No. It answers from your existing signed-off dashboards first, and only generates an answer when nothing already built covers the question. The cheapest path is also the strongest, because a person built and signed that tile.",
  },
  {
    q: "Can the AI make up a metric or a number?",
    a: "It’s designed not to. The AI can only select from metrics, dimensions and time windows you’ve defined, and every selection is validated. Numbers come from your data through those definitions, not from the model.",
  },
  {
    q: "What happens when the data has a problem?",
    a: "The audit verdicts decide. A blocking issue stops IncLever answering on that data and names the failing check; lesser issues mean the answer is held for review or marked provisional. Each case raises a task for the data owner.",
  },
  {
    q: "Will someone learn anything about data they’re not allowed to see?",
    a: "No. Permission is checked first, before anything about the data’s state is read, so a refusal reveals nothing about the number.",
  },
  {
    q: "How do you know whether our data is ready for AI?",
    a: "The AI Readiness Control Tower runs explicit, versioned rules against each data asset and business definition, records an evidenced verdict for every rule, and issues or withholds a readiness certificate. You can open every verdict and see what it was based on.",
  },
  {
    q: "What if we need to accept a known issue?",
    a: "Approve a scoped exception with a justification and an expiry date. The rule keeps failing outside that scope, and any answer relying on the exception discloses it.",
  },
  {
    q: "Do we need IncLever to work with InclinedPlane?",
    a: "No. With or without IncLever, the expertise is the same. It simply gets you there faster and keeps watch afterward.",
  },
];
