/**
 * THE INCLINE — the site's signature element (brief §9.1).
 * Four capabilities drawn as rising steps: Build (grey), Contextualize and
 * Enable (orange), Activate (black), "Accelerated by IncLever" pill on Enable.
 *
 * Variants:
 *  - "home":        founder's rising blocks; ONE entrance animation on first
 *                   view (steps rise in sequence, < 1s). Each block links to
 *                   its capability page.
 *  - "interactive": blocks are tabs; selecting one reveals scope, deliverables
 *                   and related case studies. All panels are in the HTML.
 *  - "mini":        compact bars for capability page heroes, current step lit.
 *
 * The static HTML (prerender, no-JS) is always the fully visible diagram: the
 * animation only arms itself in a real browser, below the fold, when motion
 * is allowed (never under Playwright, so snapshots never capture hidden steps).
 */
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { capabilities, type Capability, type StepId } from "@/content/capabilities";
import { caseStudyMeta } from "@/content/caseStudyMeta";
import { cn } from "@/lib/utils";
import { Label, Verified } from "./primitives";

const HEIGHTS = ["md:min-h-[200px]", "md:min-h-[260px]", "md:min-h-[320px]", "md:min-h-[380px]"];
const INDENT = ["ml-0", "ml-4", "ml-8", "ml-12"];

function toneClasses(c: Capability) {
  if (c.tone === "orange") return { box: "bg-ip-orange border-ip-orange text-black", label: "!text-black", body: "text-black" };
  if (c.tone === "black") return { box: "bg-black border-black text-white", label: "!text-ip-on-dark", body: "text-ip-on-dark" };
  return { box: "bg-white border-ip-rule-strong text-black", label: "", body: "text-ip-body" };
}

/** Arms a one-time rise-in animation when the element first scrolls into view. */
function useRiseIn<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"static" | "pending" | "done">("static");
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || navigator.webdriver || !("IntersectionObserver" in window)) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) return; // already visible: don't hide it
    setState("pending");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setState("done");
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, state };
}

function riseStyle(state: "static" | "pending" | "done", i: number): CSSProperties | undefined {
  if (state === "static") return undefined;
  return {
    opacity: state === "pending" ? 0 : 1,
    transform: state === "pending" ? "translateY(28px)" : "translateY(0)",
    transition: "opacity 560ms var(--ip-ease-out), transform 640ms var(--ip-ease-out)",
    transitionDelay: state === "done" ? `${i * 110}ms` : "0ms",
  };
}

function IncleverPill({ asLink = true }: { asLink?: boolean }) {
  const cls =
    "relative z-10 mt-auto self-start no-underline font-mono text-[11px] uppercase tracking-[0.08em] bg-black text-white px-2.5 py-1.5 rounded-full font-semibold";
  return asLink ? (
    <Link to="/products/inclever" className={cn(cls, "hover:bg-[#222]")}>
      Accelerated by IncLever
    </Link>
  ) : (
    <span className={cls}>Accelerated by IncLever</span>
  );
}

export function InclineHome() {
  const { ref, state } = useRiseIn<HTMLDivElement>();
  return (
    <div ref={ref} role="list" aria-label="The four capabilities" className="flex flex-col md:flex-row md:items-end gap-2">
      {capabilities.map((c, i) => {
        const t = toneClasses(c);
        return (
          <div
            role="listitem"
            key={c.id}
            style={riseStyle(state, i)}
            className={cn(
              "group relative flex flex-col gap-2 rounded-lg border p-5 box-border md:flex-1 md:ml-0",
              INDENT[i],
              HEIGHTS[i],
              t.box,
            )}
          >
            <span className={cn("ip-label", t.label)}>{c.step}</span>
            <Link
              to={c.path}
              className="text-[20px] font-semibold leading-[1.2] no-underline after:absolute after:inset-0 after:rounded-lg after:content-[''] group-hover:underline underline-offset-4 decoration-1"
            >
              {c.name}
            </Link>
            <span className={cn("text-[14px] leading-[1.5]", t.body)}>{c.short}</span>
            {c.id === "enable" && <IncleverPill />}
          </div>
        );
      })}
    </div>
  );
}

export function InclineInteractive({ initial = "contextualize" as StepId }: { initial?: StepId }) {
  const [selected, setSelected] = useState<StepId>(initial);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: React.KeyboardEvent, i: number) => {
    const n = capabilities.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      setSelected(capabilities[next].id);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <div>
      <div role="tablist" aria-label="The four capabilities" className="flex flex-col md:flex-row md:items-end gap-2">
        {capabilities.map((c, i) => {
          const t = toneClasses(c);
          const active = selected === c.id;
          return (
            <button
              key={c.id}
              ref={(el) => (tabRefs.current[i] = el)}
              role="tab"
              id={`incline-tab-${c.id}`}
              aria-selected={active}
              aria-controls={`incline-panel-${c.id}`}
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(c.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={cn(
                "relative flex flex-col items-start gap-2 rounded-lg border p-5 text-left box-border md:flex-1 md:ml-0 transition-[box-shadow,transform] duration-200 ease-out",
                INDENT[i],
                ["md:min-h-[150px]", "md:min-h-[200px]", "md:min-h-[250px]", "md:min-h-[300px]"][i],
                t.box,
                active ? "shadow-[0_0_0_3px_#fff,0_0_0_5px_#000] md:-translate-y-1" : "hover:md:-translate-y-0.5",
              )}
            >
              <span className={cn("ip-label", t.label)}>{c.step}</span>
              <span className="text-[19px] font-semibold leading-[1.2]">{c.name}</span>
              <span className={cn("text-[14px] leading-[1.5]", t.body)}>{c.short}</span>
              {c.id === "enable" && <IncleverPill asLink={false} />}
            </button>
          );
        })}
      </div>

      {capabilities.map((c) => (
        <div
          key={c.id}
          role="tabpanel"
          id={`incline-panel-${c.id}`}
          aria-labelledby={`incline-tab-${c.id}`}
          hidden={selected !== c.id}
          className="mt-8 border-t-2 border-black pt-8"
        >
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr]">
            <div>
              <Label dot={c.tone === "orange"}>{c.step}</Label>
              <h3 className="mt-3 mb-0 text-[clamp(26px,2.6vw,34px)] font-semibold leading-[1.1] tracking-[-0.02em]">{c.name}</h3>
              <p className="mt-4 mb-0 text-[18px] font-medium leading-[1.5]">{c.problem}</p>
              <p className="mt-3 mb-0 text-[16px] leading-[1.6] text-ip-body">{c.whatWeDo[0]}</p>
              <Link to={c.path} className="ip-link mt-5 inline-flex text-[16px]">
                {c.name}: scope, method and proof
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="ip-label-sm m-0 mb-3">Typical deliverables</p>
                <ul className="m-0 list-none space-y-3 p-0">
                  {c.deliverables.map((d) => (
                    <li key={d.title} className="text-[15px] leading-[1.45]">
                      <span className="font-semibold">{d.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="ip-label-sm m-0 mb-3">Related work</p>
                {c.proof.caseStudyIds.length ? (
                  <ul className="m-0 list-none space-y-3 p-0">
                    {c.proof.caseStudyIds.map((id) =>
                      caseStudyMeta[id] ? (
                        <li key={id} className="text-[15px] leading-[1.45]">
                          <Link to={`/case-studies/${id}`} className="ip-link font-medium">
                            {caseStudyMeta[id].title}
                          </Link>
                        </li>
                      ) : null,
                    )}
                  </ul>
                ) : (
                  <p className="m-0 text-[15px] leading-[1.5] text-ip-body">
                    <Verified item={c.proof}>
                      <span>{c.proof.text}</span>
                    </Verified>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function InclineMini({ current }: { current: StepId }) {
  return (
    <nav aria-label="Position on the incline" className="flex items-end gap-1.5">
      {capabilities.map((c, i) => {
        const lit = c.id === current;
        const fill = c.tone === "orange" ? "bg-ip-orange border-ip-orange" : c.tone === "black" ? "bg-black border-black" : "bg-ip-grey-100 border-ip-rule-strong";
        return (
          <Link
            key={c.id}
            to={c.path}
            aria-current={lit ? "page" : undefined}
            className="group flex w-[70px] sm:w-[104px] flex-col gap-1.5 no-underline"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block w-full rounded-[4px] border transition-opacity duration-150",
                lit ? fill : "bg-white border-ip-rule-strong group-hover:border-black",
              )}
              style={{ height: 14 + i * 12 }}
            />
            <span className={cn("font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.04em] sm:tracking-[0.06em]", lit ? "text-black font-semibold" : "text-ip-muted")}>{c.step}</span>
          </Link>
        );
      })}
    </nav>
  );
}
