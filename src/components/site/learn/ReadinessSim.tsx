/**
 * Readiness check simulator: five checks on one sample table. Fix a failing
 * check and watch the score and the agent's verdict change. Fictional SAMPLE
 * DATA; it shows how a readiness gate reasons, not a real product run.
 */
import { useState } from "react";
import { cn } from "@/lib/utils";

interface Check {
  id: string;
  area: string;
  rule: string;
  fail: string;
  pass: string;
  fix: string;
}

const checks: Check[] = [
  {
    id: "complete",
    area: "Completeness",
    rule: "ship_to_country is populated on at least 99% of order lines.",
    fail: "Evidence: 6.8% of lines from ERP A have no ship-to country.",
    pass: "Evidence: 99.7% populated; the rest are flagged for the data owner.",
    fix: "Backfill from the ERP A delivery table",
  },
  {
    id: "fresh",
    area: "Freshness",
    rule: "sales_orders is under 24 hours old when a question is asked.",
    fail: "Evidence: last load Tuesday 06:00 UTC, 74 hours ago. The load job has been failing quietly.",
    pass: "Evidence: loaded today 06:00 UTC, 3 hours ago.",
    fix: "Repair the failing load and alert on misses",
  },
  {
    id: "defined",
    area: "Definitions",
    rule: "“Margin” has one approved definition in the semantic layer.",
    fail: "Evidence: three margin calculations in use (finance, sales, the French operating company).",
    pass: "Evidence: gross margin after rebates, approved by Group Finance.",
    fix: "Agree one definition and publish it",
  },
  {
    id: "access",
    area: "Entitlements",
    rule: "The agent runs under its own identity with row-level rules applied.",
    fail: "Evidence: the agent uses a shared service account that can read every region.",
    pass: "Evidence: agent identity inherits the asker’s region filter.",
    fix: "Give the agent its own governed identity",
  },
  {
    id: "lineage",
    area: "Lineage",
    rule: "Every column used in the answer traces back to a source system.",
    fail: "Evidence: discount_pct comes from an unmanaged spreadsheet upload.",
    pass: "Evidence: every column traces to ERP A or ERP B.",
    fix: "Move the discount feed into a governed pipeline",
  },
];

const initiallyFixed = new Set(["complete", "lineage"]);

export function ReadinessSim() {
  const [fixed, setFixed] = useState<Set<string>>(() => new Set(initiallyFixed));
  const passed = checks.filter((c) => fixed.has(c.id)).length;
  const score = Math.round((passed / checks.length) * 100);
  const ready = passed === checks.length;
  const firstFail = checks.find((c) => !fixed.has(c.id));

  const toggle = (id: string) =>
    setFixed((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="overflow-hidden rounded-xl border border-ip-rule-strong bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-4 py-3 sm:px-6">
        <span className="ip-label-sm !text-black font-semibold">Readiness check: sales_orders (ERP A + ERP B)</span>
        <span className="ip-label-sm">Sample data</span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <ul className="m-0 list-none border-b border-ip-rule p-0 lg:border-b-0 lg:border-r">
          {checks.map((c) => {
            const ok = fixed.has(c.id);
            return (
              <li key={c.id} className="flex flex-col gap-3 border-b border-ip-rule px-4 py-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:px-6">
                <div className="min-w-0">
                  <p className="m-0 flex items-center gap-2.5">
                    <span
                      className={cn(
                        "inline-flex min-w-[44px] justify-center rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.05em]",
                        ok ? "bg-black text-white" : "bg-[#fef3f2] text-[#b42318]",
                      )}
                    >
                      {ok ? "Pass" : "Fail"}
                    </span>
                    <span className="text-[16px] font-semibold">{c.area}</span>
                  </p>
                  <p className="mt-1.5 mb-0 text-[14.5px] leading-[1.5] text-black">{c.rule}</p>
                  <p className="mt-1 mb-0 text-[13.5px] leading-[1.5] text-ip-muted">{ok ? c.pass : c.fail}</p>
                </div>
                <button
                  type="button"
                  aria-pressed={ok}
                  onClick={() => toggle(c.id)}
                  className={cn(
                    "self-start rounded-[6px] border px-3 py-2 text-left text-[13.5px] font-medium leading-[1.3] min-h-[40px] transition-colors sm:max-w-[180px] sm:shrink-0",
                    ok ? "border-ip-rule-strong bg-white text-ip-body hover:border-black" : "border-black bg-white text-black hover:bg-ip-grey",
                  )}
                >
                  {ok ? "Break it again" : c.fix}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col gap-5 p-5 sm:p-6" aria-live="polite">
          <div>
            <p className="ip-label-sm m-0">Readiness score</p>
            <p className="m-0 mt-1 text-[56px] font-semibold leading-none tracking-[-0.03em]">
              {score}
              <span className="text-[24px] text-ip-muted">/100</span>
            </p>
            <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ip-grey-100" aria-hidden="true">
              <div className={cn("h-full transition-[width] duration-300", ready ? "bg-black" : "bg-ip-orange")} style={{ width: `${score}%` }} />
            </div>
            <p className="mt-2 mb-0 text-[13.5px] text-ip-muted">
              {passed} of {checks.length} checks passed
            </p>
          </div>
          <div className={cn("rounded-lg border p-4", ready ? "border-black" : "border-ip-orange bg-ip-orange-tint")}>
            <p className="ip-label-sm m-0 !text-black">Agent verdict</p>
            {ready ? (
              <p className="mt-1.5 mb-0 text-[15px] leading-[1.5]">
                <strong>Answer.</strong> Every check passed, so the agent may answer, and it shows the definition, source and freshness with the number.
              </p>
            ) : (
              <p className="mt-1.5 mb-0 text-[15px] leading-[1.5]">
                <strong>Decline and explain.</strong> “I can’t answer reliably yet: {firstFail?.area.toLowerCase()} check failed.” A refusal with a reason beats a confident wrong number.
              </p>
            )}
          </div>
          <p className="m-0 text-[13.5px] leading-[1.5] text-ip-muted">
            Fix the failing checks, or break passing ones, to see how a readiness gate decides whether an agent should answer.
          </p>
        </div>
      </div>
    </div>
  );
}
