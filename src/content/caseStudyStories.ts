/**
 * Extra story content for the richest case studies: the featured panels on
 * home and /case-studies, and the "at a glance", data-flow and challenges
 * blocks on the detail page. Optional: a case study without an entry here
 * renders the standard template.
 *
 * Client names are withheld (brief §0.7). Figures come from the delivery
 * teams' case study documents (November 2026) and are dated where the source
 * dates them.
 */
export interface CaseStory {
  /** One line on who the client is, anonymized. */
  context: string;
  glance: [label: string, value: string][];
  /** Three or four numbers for the featured panel. */
  highlights: { value: string; label: string }[];
  flowTitle: string;
  /** The chain from source to outcome, drawn as connected stages. */
  flow: { title: string; detail: string; accent?: boolean }[];
  challenges?: [challenge: string, solved: string][];
  /** Another case study for the same client. */
  sameClient?: { id: string; label: string };
}

export const caseStories: Record<string, CaseStory> = {
  "erp-unification": {
    context: "FTSE-listed UK industrial group · revenue in the billions · 80 to 90 countries",
    glance: [
      ["Client", "FTSE-listed UK industrial group, revenue in the billions"],
      ["Scope", "EMEA division, 25 to 30 operating companies"],
      ["Sources", "Five-plus ERP and CRM systems: JD Edwards (two generations), Dynamics 365, Infor LN and regional systems"],
      ["Platform", "Microsoft Azure end to end"],
      ["Program", "About 12 months, pilot to full EMEA rollout"],
    ],
    highlights: [
      { value: "20 → 1", label: "Dashboards to one report" },
      { value: "15", label: "Operating companies onboarded" },
      { value: "80M+", label: "Rows per ETL cycle, 3× a day" },
      { value: "2–3 wks", label: "To onboard a known ERP" },
    ],
    flowTitle: "Any ERP in, one report out",
    flow: [
      { title: "5+ ERPs and CRMs", detail: "JD Edwards, Dynamics 365, Infor LN, regional systems" },
      { title: "Bronze", detail: "Data Factory landing, change data capture" },
      { title: "Silver", detail: "One Databricks framework maps every source to a canonical model", accent: true },
      { title: "Gold", detail: "Synapse snowflake schema: 4 facts, ~10 dimensions" },
      { title: "One Power BI report", detail: "Every operating company, row-level security" },
    ],
    challenges: [
      ["A platform hard-coded to one ERP generation", "Kept its medallion structure; removed every assumption about the source schema"],
      ["A separate codebase per ERP would never scale", "One parameterized transformation framework with canonical mappings per source"],
      ["Upstream schemas change without warning", "Schema drift detected and handled without failing the pipeline"],
      ["Enterprise risk of a big-bang rollout", "Pilot on one medium-complexity operating company, then sprint-based rollout"],
      ["Shipping fast without breaking production", "Nine environments with promotion gates via Azure DevOps"],
    ],
    sameClient: { id: "global-lead-time", label: "Also for this client: one lead time across four supply sites" },
  },
  "governed-finance-semantic-layer": {
    context: "Listed Indian engineering manufacturer · 6 business groups · 334 profit centers",
    glance: [
      ["Client", "Listed Indian engineering manufacturer"],
      ["Organization", "6 business groups, 21 business units, 334 profit centers"],
      ["Data", "52M+ SAP line items across 2,714 general ledger codes"],
      ["Pipeline", "SAP → AWS S3 → AWS Glue → Amazon Redshift → Power BI"],
      ["Accelerator", "IncLever: audit engine and governed question answering"],
    ],
    highlights: [
      { value: "20", label: "Finance metrics, each with its evidence" },
      { value: "4", label: "Unsafe metrics blocked, not guessed" },
      { value: "134", label: "Audit rules generated from the layer" },
      { value: "100%", label: "Formula match on 16,603 rows" },
    ],
    flowTitle: "From hidden logic to governed answers",
    flow: [
      { title: "Finance data", detail: "Logic in dashboard formulas and people's heads" },
      { title: "Semantic layer", detail: "Evidence-first: every claim tiered, unsafe metrics blocked", accent: true },
      { title: "IncLever audit", detail: "Checks the data and the layer; every verdict replayable", accent: true },
      { title: "Governed answers", detail: "Plain-English finance questions, answered or refused with a reason" },
    ],
    challenges: [
      ["YTD figures look additive but are cumulative", "A restriction blocks summing them; questions that would need it are refused"],
      ["The business documents contradicted themselves", "The metric was blocked and escalated to its owner, not guessed"],
      ["AI could rubber-stamp its own conclusions", "An isolated challenger agent seeded only with source documents, a human in the loop"],
      ["A wrong synonym gives a confident wrong answer", "Unreliable synonyms deleted, restrictions kept"],
    ],
  },
  "global-lead-time": {
    context: "Same FTSE-listed UK industrial group · four supply sites · 65 sales companies",
    glance: [
      ["Client", "FTSE-listed UK industrial group (same as the EMEA platform)"],
      ["Scope", "Four supply sites in Europe and South America, 65 sales companies"],
      ["Sources", "Infor LN, JD Edwards and a Power BI model, plus the product master"],
      ["Team", "One InclinedPlane engineer, end to end"],
      ["Timeline", "About 5 weeks of build, then UAT, handover and change-board approval"],
    ],
    highlights: [
      { value: "4 → 1", label: "Supply sites, one report" },
      { value: "~85%", label: "Faster model refresh" },
      { value: "107", label: "Automated checks, all passing" },
      { value: "0", label: "Failed test cases (73 run)" },
    ],
    flowTitle: "Four sites, one rulebook",
    flow: [
      { title: "4 supply sites", detail: "Three systems, working and calendar days, local item codes" },
      { title: "Common shape", detail: "One staging query per site, matched to the product master", accent: true },
      { title: "Rules as data", detail: "Conversions, minimums and thresholds in a settings table", accent: true },
      { title: "Three views", detail: "Sales, Supply and an Export page for ERP updates" },
    ],
    challenges: [
      ["The product master had no “live version” flag", "An evidence-based keep rule, confirmed by the client's data team"],
      ["One site's Delta tables were unreadable by Synapse Serverless SQL", "A Databricks Parquet snapshot with external tables; 158 columns type-checked, 0 issues"],
      ["Scope changed mid-build, twice", "Scope applied once at staging, so every page and count updated with no rework"],
      ["Free-text write-back let invalid values in", "Validated dropdown inputs, built in a copy to keep a rollback"],
    ],
    sameClient: { id: "erp-unification", label: "Also for this client: one sales platform for any ERP" },
  },
};
