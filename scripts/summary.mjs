/* GUARDRAIL — DO NOT REMOVE.
 * Summary printer for the prerender + snapshot pipeline. Output is the
 * primary signal that crawler-visibility is healthy after a build. Last
 * reviewed: 2026-05-03. */

const STATUS_GLYPH = { ok: "✓", warn: "⚠", failed: "✗" };

export function printSummary(results, { log = console.log } = {}) {
  // Compute column widths.
  const pathW = Math.max(5, ...results.map((r) => r.path.length));
  const cnt = (s) => results.filter((r) => r.status === s).length;

  log("");
  log("═".repeat(pathW + 30));
  log(`PRERENDER + SNAPSHOT SUMMARY  (${results.length} routes)`);
  log("═".repeat(pathW + 30));
  log(
    `${"Route".padEnd(pathW)}  Status  Words  Tries`
  );
  log("─".repeat(pathW + 30));
  for (const r of results) {
    const glyph = STATUS_GLYPH[r.status] || "?";
    log(
      `${r.path.padEnd(pathW)}  ${glyph}       ${String(r.wordCount).padStart(5)}  ${r.attempts}`
    );
  }
  log("─".repeat(pathW + 30));
  log(
    `Totals: ${cnt("ok")} ok, ${cnt("warn")} warn (<50 words), ${cnt("failed")} failed`
  );
  log("═".repeat(pathW + 30));

  // Detail any non-ok routes.
  const problems = results.filter((r) => r.status !== "ok");
  if (problems.length > 0) {
    log("");
    log("Problems:");
    for (const r of problems) {
      log(`  ${r.path}  →  ${r.status}, ${r.wordCount} words, ${r.attempts} attempts`);
      for (const e of r.pageErrors.slice(0, 3))
        log(`     pageError: ${e}`);
      for (const e of r.consoleErrors.slice(0, 3))
        log(`     console:   ${e}`);
    }
  }
  log("");
}
