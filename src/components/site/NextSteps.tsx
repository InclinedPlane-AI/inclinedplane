/**
 * "Where to next": the onward links that end every page, so no page is a dead
 * end (scripts/check-flow.mjs checks this at build time). Two or three steps,
 * the first is the natural next page on the journey:
 * Home → Context Engineering → Capabilities → a pillar → Solutions → Case studies → Book.
 */
import { Link } from "react-router-dom";
import { Label } from "./primitives";
import { cn } from "@/lib/utils";

export interface NextStep {
  kicker: string;
  title: string;
  body?: string;
  to: string;
}

export function NextSteps({ steps, title = "Where to next", tone = "white" }: { steps: NextStep[]; title?: string; tone?: "white" | "grey" }) {
  return (
    <section aria-label={title} data-next-steps className={cn(tone === "grey" ? "bg-ip-grey" : "bg-white", "border-t border-ip-rule")}>
      <div className="ip-container py-[clamp(44px,5vw,64px)]">
        <Label className="mb-5">{title}</Label>
        <div className={cn("grid grid-cols-1 gap-4", steps.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3")}>
          {steps.map((s, i) => (
            <Link
              key={s.to}
              to={s.to}
              className={cn(
                "group flex flex-col gap-1.5 rounded-lg border p-5 no-underline transition-colors duration-150 hover:border-black sm:p-6",
                i === 0 ? "border-ip-orange bg-white" : "border-ip-rule-strong bg-white",
              )}
            >
              <span className="ip-label-sm">{s.kicker}</span>
              <span className="text-[19px] font-semibold leading-[1.25] text-black group-hover:underline underline-offset-4 decoration-1">{s.title}</span>
              {s.body && <span className="text-[15px] leading-[1.5] text-ip-body">{s.body}</span>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
