/**
 * Compact case study row: industry, outcome-led title, step tags, one
 * headline result. Used by the /case-studies list and the Industries page.
 * The whole row is one link (stretched); tags inside stay plain text.
 */
import { Link } from "react-router-dom";
import { capabilityById, type StepId } from "@/content/capabilities";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { StepTag } from "../primitives";
import { cn } from "@/lib/utils";
import type { CaseEntry } from "./caseData";

export function CaseRow({
  entry,
  hidden = false,
  dense = false,
}: {
  entry: CaseEntry;
  hidden?: boolean;
  dense?: boolean;
}) {
  const { cs, meta } = entry;
  return (
    <li
      hidden={hidden}
      className={cn(
        "group relative grid grid-cols-1 gap-x-8 gap-y-3 border-b border-ip-rule-strong md:items-center",
        dense
          ? "py-5 md:grid-cols-[1fr_auto]"
          : "py-6 md:grid-cols-[200px_1fr_auto_150px]",
        hidden && "hidden",
      )}
    >
      {!dense && (
        <span className="ip-label-sm">
          {cs.industry}
          {meta.region ? `, ${meta.region}` : ""}
        </span>
      )}
      <div>
        {dense && (
          <span className="ip-label-sm mb-1.5 block">
            {cs.industry}
            {meta.region ? `, ${meta.region}` : ""}
          </span>
        )}
        <h3
          className={cn(
            "m-0 font-semibold leading-[1.3] tracking-[-0.005em]",
            dense ? "text-[17px]" : "text-[19px]",
          )}
        >
          <Link
            to={`/case-studies/${entry.id}`}
            className="no-underline after:absolute after:inset-0 after:content-[''] group-hover:underline underline-offset-4 decoration-1"
          >
            {meta.title}
          </Link>
        </h3>
      </div>
      <div className={cn("flex flex-wrap gap-1.5", !dense && "md:justify-end")}>
        {meta.steps.map((s) => (
          <StepTag key={s} step={s} />
        ))}
        {SHOW_UNVERIFIED &&
          meta.proposedSteps?.map((s) => <StepTag key={s} step={s} proposed />)}
      </div>
      <div
        className={cn(
          "flex items-baseline gap-2 md:flex-col md:items-end md:gap-0.5",
          dense && "md:col-start-2 md:row-start-1 md:row-span-2 md:self-center",
        )}
      >
        <span className="text-[22px] font-semibold leading-none tracking-[-0.01em] tabular-nums">
          {meta.headline.value}
        </span>
        <span className="text-[13px] leading-[1.35] text-ip-muted md:text-right">
          {meta.headline.label}
        </span>
      </div>
    </li>
  );
}

/** A step tag that links to its capability page. */
export function StepLink({
  step,
  proposed = false,
}: {
  step: StepId;
  proposed?: boolean;
}) {
  const cap = capabilityById[step];
  return (
    <Link
      to={cap.path}
      className="ip-hit relative z-10 rounded no-underline transition-opacity hover:opacity-80"
      title={`${cap.step}: ${cap.name}`}
    >
      <StepTag step={step} proposed={proposed} />
    </Link>
  );
}
