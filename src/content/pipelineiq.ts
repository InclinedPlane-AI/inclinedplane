/**
 * PipelineIQ product page content (/products/pipelineiq). Substance carried
 * over from the previous page (components/products/PipelineIQ.tsx). The
 * product is at MVP stage: no claims of scale (brief §7.5). The client it
 * runs on stays confidential.
 */
import type { FaqItem } from "./capabilities";
import type { Verifiable } from "./verify";

/**
 * The portal walkthrough clip (recorded 22 Nov 2026, trimmed to 27 s, encoded
 * at 1.25×). Shown on a sample client, "Acme Manufacturing" (owner's decision,
 * 22 Nov 2026: published unblurred, labeled demo data).
 */
export const piqVideo = {
  src: "/media/pipelineiq-demo.mp4",
  poster: "/media/pipelineiq-demo-poster.jpg",
  tag: "Demo data · sample client",
  label: "A walkthrough of the PipelineIQ portal on a sample client: overview, alerts, error history, process queue, sources and the roadmap",
  caption: "The PipelineIQ portal on a sample client, Acme Manufacturing: health, incidents, failures by stage, alerts and the roadmap.",
  aspect: "1440/798",
};

/**
 * The interactive sandbox: the whole portal on simulated data for a fictional
 * client (Aldermoor Thermal Group), as one self-contained file built in the
 * PipelineIQ repo (demo/build.py, which refuses to write anything that
 * identifies the real client). Copied to public/demos/ with a noindex tag;
 * loaded only when a visitor presses Launch.
 */
export const piqSandbox = {
  // Deployed with clean URLs (no ".html"); Vite's dev server needs the extension.
  src: import.meta.env.DEV ? "/demos/pipelineiq-demo.html#/" : "/demos/pipelineiq-demo#/",
  poster: "/media/pipelineiq-sandbox-poster.jpg",
  note: "The whole portal, running in your browser on simulated data for a fictional client. Every page, filter and chart works; nothing connects to a real system.",
  size: "about 800 KB",
};

/** Proposed positioning line (brief §3.4 copy bank). */
export const piqLine = "Know every morning whether your data is safe to use.";

export const piqStatus: Verifiable & { text: string } = {
  text: "MVP, running on an Azure Data Factory, Databricks and Synapse estate.",
  verified: false,
};

export const piqPillars = [
  {
    title: "Health",
    body: "Each environment’s state (healthy, degraded or failing), load success rate, the biggest incidents and the release that preceded them, and the nightly batch’s finish time against its target.",
  },
  {
    title: "Debugging",
    body: "A de-duplicated error history: every failure with the real stack trace, the root cause rather than its cascaded parents, and deep links into the source tools.",
  },
  {
    title: "Estate insight",
    body: "Every batch as a timeline, every table compared across environments, ingestion watermarks per source system, warehouse drift, and deployments classified even where the release log never closed.",
  },
];

export const piqPersonas = [
  { role: "Data engineer on support", asks: ["What broke last night?", "What’s the real error?", "Is it new or recurring?"], answers: "The overview, the error history (signature, failure, stack trace), alerts and batch timelines." },
  { role: "Platform lead", asks: ["Are we finishing on time?", "Which tables fail most?"], answers: "Finish time against the target, top failing tables with trends, failures by stage and the biggest incidents." },
  { role: "Release manager", asks: ["Did a release cause this?", "Did that deployment finish?"], answers: "Release markers on every chart, incidents with the release before them, and deployments classified even where the log never closed." },
  { role: "Ingestion owner", asks: ["Is each source system loading?", "Are watermarks final?"], answers: "Source systems with their tables and watermarks, each table’s ingestion history, and ingestion-stalled alerts." },
  { role: "Warehouse owner", asks: ["Was the warehouse rebuilt?", "Do our environments match?"], answers: "Rebuild times per object, the load that built each one, and drift between environments." },
];

export type Severity = "High" | "Medium" | "Low" | "Custom";
export const piqAlerts: { name: string; sev: Severity; when: string }[] = [
  { name: "Failed", sev: "High", when: "A root-cause failure with no success since" },
  { name: "Stuck", sev: "High", when: "Running beyond max(3h, 2× its own median)" },
  { name: "Collector", sev: "High", when: "Two collections in a row failed" },
  { name: "Stale", sev: "Medium", when: "Overdue against its own usual cadence" },
  { name: "Ingestion stalled", sev: "Medium", when: "A watermark not finalized for 12h" },
  { name: "No batch", sev: "Medium", when: "No top-level batch within N hours" },
  { name: "Check errored", sev: "Medium", when: "A custom check can’t run" },
  { name: "Custom check", sev: "Custom", when: "Your own read-only SQL check returns rows" },
  { name: "Slow", sev: "Low", when: "Latest run over 2× its 14-day median" },
  { name: "Orphans", sev: "Low", when: "Log says running, orchestrator says done" },
  { name: "Unregistered source", sev: "Low", when: "Data arriving from an unknown system" },
  { name: "Truncated names", sev: "Low", when: "Table names silently cut short" },
];

export const piqGuarantees = [
  { title: "Read, never write", body: "Every SQL statement passes a guard that refuses anything but SELECT or WITH. Sessions never hold locks that could slow the ETL." },
  { title: "Nothing deployed", body: "No agents, diagnostic settings, tables, firewall rules or role assignments in your estate. It uses the engineer’s own sign-in." },
  { title: "No cost to scan", body: "Warehouse table data is never scanned, only catalog views. Collection is off until someone presses Collect now or switches it on." },
  { title: "Data stays local", body: "Operational metadata only, never business data. Review copies are view-only and shared behind sign-in, never anonymously." },
];

export const piqSteps = [
  { title: "Discover", body: "Map services, environments, run logs, conventions, what breaks most and who needs to know." },
  { title: "Connect, read-only", body: "Agree read permissions only. Nothing is installed in your estate." },
  { title: "Build the client layer", body: "Write connectors and map your statuses and conventions onto the core." },
  { title: "Tailor dashboards", body: "Add the pages that matter for your estate on the core patterns." },
  { title: "Tune alerts", body: "With the people who run the platform, until alerts are signals rather than noise." },
  { title: "Operate and iterate", body: "Act on findings, keep the docs current, add roadmap features as needed." },
];

export const piqLayers = [
  { stack: "Azure Data Factory, Databricks, Synapse", status: "Live" },
  { stack: "Microsoft Fabric", status: "Next" },
  { stack: "Airflow, Snowflake, dbt", status: "Next" },
  { stack: "AWS Glue, Redshift", status: "Next" },
];

/** Found in its first deployment, by reading, without changing anything. */
export const piqFindings = [
  { title: "Two pipelines, one file", body: "A recurring read failure traced to two pipelines overwriting the same files at the same time." },
  { title: "A framework bug in plain sight", body: "Long table names silently truncated because a procedure parameter was half the width of its column." },
  { title: "Releases that never record failure", body: "A release log that only ever wrote “in progress” or “completed”, so failed deployments looked stuck forever." },
  { title: "Runs left open forever", body: "A pipeline that opened its audit row but never closed it, so every run looked like it was still going." },
  { title: "Environment drift", body: "Objects that differed between environments, mostly stray backup tables and permission views." },
  { title: "A conversion quietly 1.6% low", body: "A kilogram constant that converted to imperial tons, not metric tonnes, understating every “tonne” column." },
];

export const piqAlertNoise: Verifiable & { text: string } = {
  text: "In its first deployment, alert rules tuned with the platform team turned 368 raw alerts into a handful of signals.",
  verified: false,
};

export const piqRoadmap = [
  { q: "What failed?", state: "Live", body: "The error index, alerts, batch timelines and entity views in today’s portal." },
  {
    q: "Why?",
    state: "In development",
    body: "Plain-language root-cause analysis from the error, stack trace and run metadata, with names masked first. Switched on only with your consent. Plus incident reports with lessons learned, shown the next time the same signature appears.",
  },
  { q: "What does it break?", state: "Planned", body: "Lineage and impact: when a table fails, every downstream fact, warehouse view and report that is now stale." },
  {
    q: "How do we fix it?",
    state: "Planned",
    body: "Architecture-aware root cause and failure-to-code links: the exact notebook or procedure, the last commits that touched it, and whether a release happened since it last succeeded. Consent required.",
  },
];

export const piqFaq: FaqItem[] = [
  {
    q: "Does PipelineIQ change anything in our estate?",
    a: "No. It reads catalog views and run logs with the engineer’s own sign-in, refuses any statement that isn’t SELECT or WITH, and installs nothing.",
  },
  {
    q: "Is it a product we buy, or a service?",
    a: "Both, in a sense. A stable core, plus an engineer embedded with your team who builds the layer that understands your services, statuses and conventions.",
  },
  {
    q: "Which platforms does it support?",
    a: "Azure Data Factory, Databricks and Synapse today. Microsoft Fabric, Airflow with Snowflake and dbt, and AWS Glue with Redshift are next.",
  },
  {
    q: "Does it use AI on our data?",
    a: "Not by default. Anything that uses AI, or reads your code or architecture, ships only once you agree, and names are masked first.",
  },
];
