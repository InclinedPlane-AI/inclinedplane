/**
 * Readiness certificate (AI Readiness Control Tower). Two blocking findings
 * withhold the certificate; each can be resolved in one of three legitimate
 * ways, and the answer level follows. Illustrative SAMPLE DATA.
 */
import { useState } from "react";
import { DemoShell } from "../demoKit";
import { cn } from "@/lib/utils";

type Fix = "data" | "exception" | "off";
const findings = [
  { id: "R-112", title: "Amount column mixes currencies with no conversion rule", dim: "Validity", exception: "Scoped to UK entities, already single-currency · expires 31 Dec 2026" },
  { id: "R-207", title: "Transactions reference cost centers missing from the master table", dim: "Consistency", exception: "Scoped to legacy cost centers closed before 2025 · expires 31 Jan 2027" },
];
const fixLabel: Record<Fix, string> = { data: "Fix the data", exception: "Scoped exception", off: "Switch off the rule" };

export function Certificate() {
  const [fixes, setFixes] = useState<(Fix | null)[]>([null, null]);
  const total = 219 - fixes.filter((f) => f === "off").length;
  const failed = fixes.filter((f) => f === null || f === "exception").length;
  const notEvaluated = 3;
  const passed = total - failed - notEvaluated;
  const issued = fixes.every((f) => f !== null);
  const clean = fixes.every((f) => f === "data");
  const level = !issued ? "Ask a person" : clean ? "Ask the agent now" : "Agent now, review to follow";

  return (
    <DemoShell title="Readiness certificate · sales_ledger" bodyClass="p-4 sm:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="space-y-3">
          <p className="ip-label-sm m-0">Blocking findings</p>
          {findings.map((f, i) => (
            <div key={f.id} className={cn("rounded-lg border p-3.5 transition-colors", fixes[i] ? "border-ip-rule-strong" : "border-[#b42318]/60 bg-[#fef3f2]")}>
              <p className="m-0 flex flex-wrap items-center gap-2 text-[12px]">
                <span className="font-mono text-ip-muted">{f.id}</span>
                <span className="rounded bg-ip-grey-100 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em]">{f.dim}</span>
                <span className={cn("ml-auto rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.05em]", fixes[i] ? "bg-black text-white" : "bg-[#b42318] text-white")}>
                  {fixes[i] ? fixLabel[fixes[i]!] : "Failing"}
                </span>
              </p>
              <p className="mt-1.5 mb-0 text-[14.5px] font-medium leading-[1.4]">{f.title}</p>
              {fixes[i] === "exception" && <p className="mt-1 mb-0 text-[12.5px] text-ip-body">{f.exception}</p>}
              <div className="mt-2.5 flex flex-wrap gap-1.5" role="group" aria-label={`Resolve ${f.id}`}>
                {(["data", "exception", "off"] as Fix[]).map((x) => (
                  <button
                    key={x}
                    type="button"
                    aria-pressed={fixes[i] === x}
                    onClick={() => setFixes((p) => p.map((v, j) => (j === i ? (v === x ? null : x) : v)))}
                    className={cn(
                      "min-h-[32px] rounded-md border px-2.5 text-[12.5px] transition-colors",
                      fixes[i] === x ? "border-black bg-black text-white" : "border-ip-rule-strong bg-white hover:border-black",
                    )}
                  >
                    {fixLabel[x]}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div aria-live="polite" className={cn("flex flex-col rounded-xl border-2 p-5 transition-colors duration-300", issued ? "border-black bg-white" : "border-dashed border-ip-rule-dashed bg-ip-grey")}>
          <p className="ip-label-sm m-0">Certificate</p>
          <p className={cn("m-0 mt-1 text-[28px] font-semibold leading-tight tracking-[-0.02em]", issued ? "text-black" : "text-ip-muted")}>{issued ? "Issued" : "Withheld"}</p>
          <dl className="m-0 mt-4 grid grid-cols-3 gap-2 border-t border-ip-rule pt-3 text-center">
            {[
              ["Passed", passed],
              ["Failed", failed],
              ["Not evaluated", notEvaluated],
            ].map(([k, v]) => (
              <div key={k as string}>
                <dd className="m-0 text-[20px] font-semibold leading-none">{v}</dd>
                <dt className="mt-1 text-[11.5px] text-ip-body">{k}</dt>
              </div>
            ))}
          </dl>
          <p className="ip-label-sm mt-4 mb-1">Answer level</p>
          <p className="m-0 text-[16px] font-semibold">{level}</p>
          <p className="mt-auto pt-4 text-[12.5px] leading-[1.5] text-ip-muted">
            {fixes.includes("off")
              ? "Switching a rule off shrinks what’s checked. It’s on record, and the coverage drops."
              : fixes.includes("exception")
                ? "An exception is scoped and expires. Any answer relying on it says so."
                : "Not evaluated never counts as a pass or a failure."}
          </p>
        </div>
      </div>
    </DemoShell>
  );
}
