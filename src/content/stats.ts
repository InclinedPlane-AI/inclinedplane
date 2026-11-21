import type { Verifiable } from "./verify";

/**
 * Proof strip (founder's homepage). Values render as plain text in the HTML,
 * never as animated counters from zero (brief §7.1).
 * Every figure here must be verified by the founder/delivery leads before launch.
 */
export interface Stat extends Verifiable {
  value: string;
  label: string;
  source: string; // internal note on what backs it
}

export const proofStats: Stat[] = [
  {
    value: "20+",
    label: "Conversational analytics agents deployed",
    source: "Delivery count across client engagements",
    verified: false,
  },
  { value: "550+ TB", label: "Data under management", source: "Sum across managed platforms", verified: false },
  { value: "600+", label: "Dashboards in production", source: "Client BI estates we built or run", verified: false },
  { value: "40+", label: "Countries served", source: "Countries covered by delivered platforms", verified: false },
  {
    value: "2 to 6 wks",
    label: "New ERP onboarded in",
    source: "EMEA multi-ERP platform case study",
    verified: false,
  },
];

export interface Partner extends Verifiable {
  name: string;
}

/** "Certified and partnered" strip. Show only verified partnerships/certifications. */
export const certifiedPlatforms: Partner[] = [
  { name: "Databricks", verified: false },
  { name: "Microsoft Fabric", verified: false },
  { name: "Azure", verified: false },
  { name: "AWS", verified: false },
  { name: "Snowflake Partner", verified: false },
  { name: "dbt", verified: false },
  { name: "ISO 27001 ready", verified: false },
];
