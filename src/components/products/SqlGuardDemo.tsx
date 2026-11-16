import { useMemo, useState } from "react";
import { ShieldCheck, ShieldX } from "lucide-react";
import { DemoTag } from "./shared";

/*
 * A faithful, client-side re-implementation of PipelineIQ's read-only guard:
 *  1. after any leading "--" comment lines, the statement must start with SELECT or WITH;
 *  2. with string literals blanked out, it must not contain any write or DDL keyword.
 */

const FORBIDDEN = ["INSERT", "UPDATE", "DELETE", "MERGE", "DROP", "ALTER", "CREATE", "TRUNCATE", "EXEC", "EXECUTE", "GRANT", "REVOKE", "INTO"];

function guard(sql: string): { ok: boolean; reason: string } {
  const body = sql
    .split("\n")
    .filter((line, i, all) => {
      // drop only the *leading* comment / blank lines
      const before = all.slice(0, i + 1);
      return !before.every((l) => l.trim() === "" || l.trim().startsWith("--"));
    })
    .join("\n")
    .trim();

  if (!body) return { ok: false, reason: "Empty statement" };
  const first = body.split(/\s+/)[0].toUpperCase();
  if (first !== "SELECT" && first !== "WITH") {
    return { ok: false, reason: `Statement starts with ${first}, not SELECT or WITH` };
  }
  const blanked = body.replace(/'(?:[^']|'')*'/g, "''").toUpperCase();
  const hit = FORBIDDEN.find((w) => new RegExp(`\\b${w}\\b`).test(blanked));
  if (hit) return { ok: false, reason: `Contains the keyword ${hit}` };
  return { ok: true, reason: "Read-only statement" };
}

const PRESETS = [
  {
    label: "Recent failures",
    sql: "SELECT entity, status, started_at\nFROM audit.pipeline_load\nWHERE status = 'Failed'",
  },
  {
    label: "Sneaky delete",
    sql: "DELETE FROM audit.pipeline_load\nWHERE status = 'Failed'",
  },
  {
    label: "Keyword in a string",
    sql: "SELECT 'INSERT' AS label, queue_status\nFROM control.process_queue",
  },
  {
    label: "Copy into a table",
    sql: "WITH late AS (\n  SELECT * FROM ingest.watermarks\n)\nSELECT * INTO tmp_late FROM late",
  },
  {
    label: "Comment + chained drop",
    sql: "-- nightly health check\nSELECT COUNT(*) FROM audit.pipeline_load;\nDROP TABLE audit.pipeline_load",
  },
];

const SqlGuardDemo = () => {
  const [sql, setSql] = useState(PRESETS[0].sql);
  const [active, setActive] = useState(0);
  const result = useMemo(() => guard(sql), [sql]);

  return (
    <div className="glass-panel rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm font-semibold text-foreground">Try to get a write past the guard</p>
        <DemoTag label="Interactive · runs in your browser" />
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => {
              setSql(p.sql);
              setActive(i);
            }}
            className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-colors ${
              active === i
                ? "border-primary/60 bg-primary/10 text-foreground"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-background/80 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          <span className="ml-2 font-mono text-[10px] text-muted-foreground">client_sql.query()</span>
        </div>
        <label htmlFor="sql-guard-input" className="sr-only">
          SQL statement to test against the read-only guard
        </label>
        <textarea
          id="sql-guard-input"
          value={sql}
          onChange={(e) => {
            setSql(e.target.value);
            setActive(-1);
          }}
          spellCheck={false}
          rows={5}
          className="w-full resize-none bg-transparent px-4 py-3 font-mono text-xs sm:text-[13px] leading-relaxed text-foreground outline-none"
        />
        <div
          className={`flex items-start gap-2 px-4 py-3 border-t border-border font-mono text-xs ${
            result.ok ? "text-emerald-500" : "text-red-500"
          }`}
          aria-live="polite"
        >
          {result.ok ? <ShieldCheck className="w-4 h-4 shrink-0" /> : <ShieldX className="w-4 h-4 shrink-0" />}
          <span>
            {result.ok ? "ALLOWED" : "REFUSED"} · {result.ok ? result.reason : `Refusing to run a non read-only statement (${result.reason})`}
          </span>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Every client query passes this check before it is sent, including custom checks people write themselves.
        There is no code path around it.
      </p>
    </div>
  );
};

export default SqlGuardDemo;
