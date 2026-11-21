/**
 * Case study view-model for the revamp: joins src/data/caseStudies.ts (the
 * stories), src/data/caseStudyDetails.ts (Opportunity/Solution/Impact) and
 * src/content/caseStudyMeta.ts (outcome-led titles, step tags, featured).
 * Industry groups come from src/content/industries.ts so the case study
 * filter and the Industries page agree.
 */
import { caseStudies, type CaseStudy, type CaseStudyMetric } from "@/data/caseStudies";
import { caseStudyDetails, type CaseStudyDetail } from "@/data/caseStudyDetails";
import { caseStudyMeta, type CaseStudyMeta } from "@/content/caseStudyMeta";
import { industries } from "@/content/industries";
import type { StepId } from "@/content/capabilities";

export interface CaseEntry {
  id: string;
  cs: CaseStudy;
  meta: CaseStudyMeta;
  detail?: CaseStudyDetail;
  /** Industry group ids from content/industries.ts, or ["other"]. */
  groups: string[];
}

export const OTHER_GROUP = { id: "other", name: "Other sectors" };

export const industryGroups = [...industries.map((i) => ({ id: i.id, name: i.name })), OTHER_GROUP];

function groupsFor(id: string): string[] {
  const g = industries.filter((i) => i.caseStudyIds.includes(id)).map((i) => i.id);
  return g.length ? g : [OTHER_GROUP.id];
}

export const caseEntries: CaseEntry[] = caseStudies
  .filter((cs) => caseStudyMeta[cs.id])
  .map((cs) => ({
    id: cs.id,
    cs,
    meta: caseStudyMeta[cs.id],
    detail: caseStudyDetails[cs.id],
    groups: groupsFor(cs.id),
  }))
  .sort((a, b) => a.meta.order - b.meta.order);

export const caseById = Object.fromEntries(caseEntries.map((e) => [e.id, e])) as Record<string, CaseEntry>;

export function formatMetric(m: CaseStudyMetric): string {
  return `${m.prefix ?? ""}${m.value}${m.suffix ?? ""}`;
}

/** Case studies sharing a step with `entry`, best matches first. */
export function relatedCases(entry: CaseEntry, limit = 3): CaseEntry[] {
  return caseEntries
    .filter((e) => e.id !== entry.id)
    .map((e) => ({
      e,
      score:
        e.meta.steps.filter((s) => entry.meta.steps.includes(s)).length * 2 +
        e.groups.filter((g) => g !== OTHER_GROUP.id && entry.groups.includes(g)).length * 3,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.e.meta.order - b.e.meta.order)
    .slice(0, limit)
    .map((x) => x.e);
}

export const stepOrder: StepId[] = ["build", "contextualize", "enable", "activate"];
