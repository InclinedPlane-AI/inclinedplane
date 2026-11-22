/**
 * The read-only guard, re-implemented in the browser: after any leading
 * comment lines a statement must start with SELECT or WITH, and (string
 * literals blanked) contain no write or DDL keyword. Try to get a write past
 * it. Runs entirely client-side; nothing is executed anywhere.
 */
import { useMemo, useState } from "react";
import { DemoShell } from "../demoKit";
import { cn } from "@/lib/utils";

const FORBIDDEN = ["INSERT", "UPDATE", "DELETE", "MERGE", "DROP", "ALTER", "CREATE", "TRUNCATE", "EXEC", "EXECUTE", "GRANT", "REVOKE", "INTO"];

function guard(sql: string): { ok: boolean; reason: string } {
  const lines = sql.split("\n");
  let i = 0;
  while (i < lines.length && (lines[i].trim() === "" || lines[i].trim().startsWith("--"))) i++;
  const body = lines.slice(i).join("\n").trim();
  if (!body) return { ok: false, reason: "Empty statement" };
  const first = body.split(/\s+/)[0].toUpperCase();
  if (first !== "SELECT" && first !== "WITH") return { ok: false, reason: `Starts with ${first}, not SELECT or WITH` };
  const blanked = body.replace(/'(?:[^']|'')*'/g, "''").toUpperCase();
  const hit = FORBIDDEN.find((w) => new RegExp(`\\b${w}\\b`).test(blanked));
  if (hit) return { ok: false, reason: `Contains the keyword ${hit}` };
  return { ok: true, reason: "Read-only statement: allowed" };
}

const presets = [
  { label: "Recent failures", sql: "SELECT entity, status, started_at\nFROM audit.pipeline_load\nWHERE status = 'Failed'" },
  { label: "A sneaky delete", sql: "DELETE FROM audit.pipeline_load\nWHERE status = 'Failed'" },
  { label: "Keyword in a string", sql: "SELECT 'INSERT' AS label, queue_status\nFROM control.process_queue" },
  { label: "Copy into a table", sql: "WITH late AS (\n  SELECT * FROM ingest.watermarks\n)\nSELECT * INTO tmp_late FROM late" },
  { label: "Comment, then a drop", sql: "-- nightly health check\nSELECT COUNT(*) FROM audit.pipeline_load;\nDROP TABLE audit.pipeline_load" },
];

export function SqlGuard() {
  const [sql, setSql] = useState(presets[1].sql);
  const [active, setActive] = useState(1);
  const result = useMemo(() => guard(sql), [sql]);

  return (
    <DemoShell title="Try to get a write past the guard" tag="Runs in your browser" bodyClass="p-4 sm:p-6">
      <div className="mb-3 flex flex-wrap gap-2" role="group" aria-label="Example statements">
        {presets.map((p, i) => (
          <button
            key={p.label}
            type="button"
            aria-pressed={active === i}
            onClick={() => {
              setActive(i);
              setSql(p.sql);
            }}
            className={cn(
              "min-h-[34px] rounded-md border px-2.5 text-[13px] transition-colors",
              active === i ? "border-black bg-black text-white" : "border-ip-rule-strong text-ip-body hover:border-black",
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <label className="sr-only" htmlFor="piq-sql">
        SQL statement
      </label>
      <textarea
        id="piq-sql"
        value={sql}
        spellCheck={false}
        onChange={(e) => {
          setActive(-1);
          setSql(e.target.value);
        }}
        rows={5}
        className="block w-full resize-y rounded-lg border border-ip-rule-strong bg-black px-4 py-3 font-mono text-[13.5px] leading-[1.6] text-white focus:outline-2 focus:outline-ip-orange"
      />
      <div
        aria-live="polite"
        className={cn(
          "mt-3 flex items-center gap-3 rounded-lg border px-4 py-3 text-[14.5px] font-medium transition-colors",
          result.ok ? "border-black bg-white text-black" : "border-[#b42318] bg-[#fef3f2] text-[#b42318]",
        )}
      >
        <span className={cn("rounded px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.06em]", result.ok ? "bg-black text-white" : "bg-[#b42318] text-white")}>
          {result.ok ? "Allowed" : "Refused"}
        </span>
        {result.reason}
      </div>
      <p className="mt-3 mb-0 text-[13px] text-ip-muted">Edit the statement too. The same two rules guard every query PipelineIQ sends.</p>
    </DemoShell>
  );
}
