/**
 * "We work with the stack you already have." Grouped by the four steps,
 * as on the founder's homepage. `certified` marks a certified or partner
 * platform (orange dot). Every entry needs `verified: true` before launch:
 * a delivery lead must confirm we have used it on a real project.
 */
import type { StepId } from "./capabilities";
import type { Verifiable } from "./verify";

export interface Tool extends Verifiable {
  name: string;
  certified?: boolean;
}

export interface ToolGroup {
  step: StepId;
  title: string;
  tools: Tool[];
}

const t = (name: string, opts: { certified?: boolean; verified?: boolean } = {}): Tool => ({
  name,
  certified: opts.certified ?? false,
  verified: opts.verified ?? false,
});

export const toolGroups: ToolGroup[] = [
  { step: "build", title: "Cloud", tools: [t("Azure", { certified: true }), t("AWS", { certified: true }), t("GCP")] },
  {
    step: "build",
    title: "Data platforms",
    tools: [
      t("Databricks", { certified: true }),
      t("Microsoft Fabric", { certified: true }),
      t("Snowflake", { certified: true }),
      t("Redshift"),
      t("BigQuery"),
    ],
  },
  {
    step: "build",
    title: "Pipelines and orchestration",
    tools: [t("dbt", { certified: true }), t("Spark"), t("Azure Data Factory"), t("Airflow")],
  },
  {
    step: "build",
    title: "Governance and quality",
    tools: [t("Unity Catalog"), t("Microsoft Purview"), t("Great Expectations"), t("Monte Carlo")],
  },
  {
    step: "contextualize",
    title: "Semantic and context layers",
    tools: [t("Fabric semantic models"), t("dbt Semantic Layer"), t("Cube")],
  },
  {
    step: "enable",
    title: "AI and agent infrastructure",
    tools: [t("MCP"), t("LangChain"), t("OpenAI"), t("Claude"), t("Vector databases"), t("MLflow")],
  },
  {
    step: "activate",
    title: "BI and agentic analytics",
    tools: [
      t("Power BI"),
      t("Tableau"),
      t("Qlik"),
      t("Looker"),
      t("Databricks Genie"),
      t("Copilot in Fabric"),
    ],
  },
];
