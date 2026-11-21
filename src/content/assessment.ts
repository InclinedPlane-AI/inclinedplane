/**
 * /assessment content (brief §7.6). The free conversation is founder-confirmed;
 * the paid fixed-scope tier is a proposed block (flags.twoTierAssessment).
 * The findings report preview is fictional SAMPLE DATA.
 */
import type { FaqItem } from "./capabilities";

export const coverage = [
  {
    area: "Quality",
    question: "Is the data complete, fresh and consistent enough to answer from?",
    checks: ["Completeness and gaps", "Freshness against each table’s schedule", "Duplicates and orphan records", "Mixed currencies and units"],
  },
  {
    area: "Context",
    question: "Does the data mean the same thing to every system and every agent?",
    checks: ["Metric definitions and conflicts", "Customer, product and supplier records across ERPs", "Hierarchies and operating companies", "Fiscal calendars and time logic"],
  },
  {
    area: "Access",
    question: "Can an agent reach the right data, and only the right data?",
    checks: ["Entitlements for people and agents", "Row and column permissions", "How agents would connect", "Audit trail of what was read"],
  },
  {
    area: "Governance",
    question: "Can you show where an answer came from and who owns it?",
    checks: ["Lineage from report to source", "Ownership of data and definitions", "Change control", "Policies for AI use"],
  },
];

export const tiers = {
  conversation: {
    name: "Readiness conversation",
    price: "Free",
    format: "45 minutes, with a senior engineer",
    body: "We review where your data stands against what your AI plans need, using your answers to the five questions as the starting point.",
    leaveWith: ["An outside view of your biggest readiness gaps", "The two or three things to fix first", "An honest view of whether a full assessment is worth it"],
  },
  assessment: {
    name: "AI Data Readiness Assessment",
    price: "Fixed scope, agreed up front",
    format: "Backed by IncLever",
    body: "We run readiness checks on the data your chosen AI use case depends on, with read-only access, and interview the people who own it.",
    leaveWith: ["A scored findings report across quality, context, access and governance", "Evidence for every finding", "A fix-first list and a roadmap to production"],
  },
};

export const steps = [
  { title: "Answer five questions", body: "Role, company size, main platform, where AI is today and your biggest blocker. About a minute." },
  { title: "Talk to a senior engineer", body: "45 minutes on your data, not on background, because we’ve read your answers first." },
  { title: "Run the assessment", body: "If it’s worth doing: agreed scope, read-only access to the datasets in scope, readiness checks and owner interviews.", tier: "assessment" as const },
  { title: "Walk through the findings", body: "A scored report, the evidence behind it, and a roadmap you can act on with or without us." },
];

/** Fictional sample report for "What you get". */
export const sampleReport = {
  company: "Kestrel Motorworks (fictional)",
  useCase: "Sales analytics agent pilot",
  verdict: "Not ready yet: 2 blocking findings",
  domains: [
    { name: "Sales orders", score: 82 },
    { name: "Finance general ledger", score: 71 },
    { name: "Inventory", score: 63 },
    { name: "Customer master", score: 48 },
  ],
  findings: [
    {
      severity: "Blocking",
      area: "Context",
      title: "1,284 customers exist twice, under ERP A and ERP B IDs",
      evidence: "Matched on tax ID and postcode across both customer tables; 9% of revenue sits on duplicated records.",
    },
    {
      severity: "Blocking",
      area: "Context",
      title: "Two definitions of gross margin are in use",
      evidence: "Finance deducts rebates; the sales semantic model doesn’t. Top-customer rankings differ in 4 of 10 positions.",
    },
    {
      severity: "High",
      area: "Quality",
      title: "Amount column mixes EUR and GBP in 3 entities",
      evidence: "Currency code missing on 31,402 ledger lines since the April migration.",
    },
    {
      severity: "Medium",
      area: "Access",
      title: "The pilot agent would inherit an admin service account",
      evidence: "No row-level security on the sales schema; every region is readable by default.",
    },
  ],
  fixFirst: [
    "Resolve duplicate customers into one record per real customer",
    "Agree one margin definition with finance and implement it in the semantic model",
    "Backfill currency codes and add a currency rule to the ledger checks",
    "Give the agent its own identity with regional row-level security",
  ],
};

export const assessmentFaq: FaqItem[] = [
  {
    q: "Is the conversation a sales call?",
    a: "It’s a working session on your data with a senior engineer. If a full assessment isn’t worth it for you, we’ll say so.",
  },
  {
    q: "Do you need access to our systems?",
    a: "Not for the conversation. For the full assessment, read-only access to the datasets in scope, agreed with your security team before anything starts.",
    flag: "twoTierAssessment",
  },
  {
    q: "What does the full assessment cost?",
    a: "It’s fixed scope and fixed price, agreed after the conversation once we know which data and which use case it covers.",
    flag: "twoTierAssessment",
  },
  {
    q: "Do we have to use IncLever afterward?",
    a: "No. The findings and roadmap are yours. With or without IncLever, the expertise is the same; it simply gets you there faster and keeps watch afterward.",
  },
  {
    q: "We haven’t picked an AI agent yet. Is it too early?",
    a: "No, it’s a good time. The data work is the same whichever agent you choose, and the assessment shows what any of them would struggle with.",
  },
];
