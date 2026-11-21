/**
 * Sample findings report preview for /assessment ("What you get").
 * Fictional SAMPLE DATA, rendered as HTML so every value is readable by
 * people and crawlers alike.
 */
import { sampleReport } from "@/content/assessment";
import { cn } from "@/lib/utils";

const sevCls: Record<string, string> = {
  Blocking: "bg-black text-white",
  High: "bg-[#fef3f2] text-[#b42318]",
  Medium: "bg-ip-orange-tint text-ip-orange-ink",
};

export function FindingsReport() {
  const r = sampleReport;
  return (
    <figure className="m-0 overflow-hidden rounded-xl border border-ip-rule-strong bg-white shadow-[0_22px_44px_-26px_rgba(0,0,0,0.35)]">
      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-4 py-3 sm:px-6">
        <span className="ip-label-sm !text-black font-semibold">Readiness findings report · preview</span>
        <span className="ip-label-sm">Sample data</span>
      </figcaption>

      <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Summary + scores */}
        <div className="border-b border-ip-rule p-5 sm:p-7 lg:border-b-0 lg:border-r">
          <p className="ip-label-sm m-0">{r.company}</p>
          <p className="mt-1 mb-0 text-[15px] text-ip-body">Use case: {r.useCase}</p>
          <p className="mt-4 mb-0 inline-flex rounded-md border-2 border-black px-3 py-1.5 text-[15px] font-semibold">{r.verdict}</p>

          <p className="ip-label-sm mt-7 mb-3">Readiness by data domain</p>
          <ul className="m-0 list-none space-y-3.5 p-0">
            {r.domains.map((d) => (
              <li key={d.name}>
                <div className="flex items-baseline justify-between text-[15px]">
                  <span>{d.name}</span>
                  <span className="font-semibold tabular-nums">{d.score} / 100</span>
                </div>
                <div className="mt-1.5 h-2 w-full rounded-full bg-ip-grey-100" aria-hidden="true">
                  <div className={cn("h-2 rounded-full", d.score >= 70 ? "bg-black" : "bg-ip-orange")} style={{ width: `${d.score}%` }} />
                </div>
              </li>
            ))}
          </ul>

          <p className="ip-label-sm mt-7 mb-3">Fix first</p>
          <ol className="m-0 space-y-2 pl-5 text-[15px] leading-[1.45]">
            {r.fixFirst.map((f) => (
              <li key={f} className="pl-1 marker:font-semibold marker:text-black">
                {f}
              </li>
            ))}
          </ol>
        </div>

        {/* Findings with evidence */}
        <div className="p-5 sm:p-7">
          <p className="ip-label-sm m-0 mb-3">Findings, with evidence</p>
          <ul className="m-0 list-none border-t border-ip-rule p-0">
            {r.findings.map((f) => (
              <li key={f.title} className="border-b border-ip-rule py-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={cn("rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]", sevCls[f.severity])}>{f.severity}</span>
                  <span className="ip-label-sm">{f.area}</span>
                </div>
                <p className="mt-2 mb-0 text-[16px] font-semibold leading-[1.35]">{f.title}</p>
                <p className="mt-1.5 mb-0 text-[14px] leading-[1.5] text-ip-body">
                  <span className="font-medium text-black">Evidence: </span>
                  {f.evidence}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </figure>
  );
}
