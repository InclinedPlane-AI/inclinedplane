/**
 * Shared building blocks for the product pages' interactive pieces:
 *  - DemoShell: the frame every widget sits in (title bar + tag), matching
 *    the "same question, two answers" widget.
 *  - DemoVideo: a looping product clip that plays only while on screen, can
 *    be paused (WCAG 2.2.2) and never autoplays for reduced-motion users.
 *  - ChapterNav: sticky in-page chapter links with the current one marked.
 *  - useInView / usePrefersReducedMotion hooks.
 */
import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { cn } from "@/lib/utils";

export function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduce(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return reduce;
}

export function useInView<T extends Element>(ref: RefObject<T>, threshold = 0.35) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, threshold]);
  return inView;
}

export function DemoShell({
  title,
  tag = "Sample data",
  children,
  className,
  bodyClass,
  actions,
}: {
  title: string;
  tag?: string;
  children: ReactNode;
  className?: string;
  bodyClass?: string;
  actions?: ReactNode;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-ip-rule-strong bg-white", className)}>
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-ip-rule bg-ip-grey px-4 py-3 sm:px-5">
        <span className="ip-label-sm !text-black font-semibold">{title}</span>
        <span className="flex items-center gap-3">
          {actions}
          <span className="ip-label-sm">{tag}</span>
        </span>
      </div>
      <div className={bodyClass}>{children}</div>
    </div>
  );
}

/** Segmented toggle used by several demos. */
export function Segmented<T extends string>({
  value,
  onChange,
  options,
  label,
}: {
  value: T;
  onChange: (v: T) => void;
  options: [T, string][];
  label: string;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-lg border border-ip-rule-strong bg-white p-1">
      {options.map(([v, l]) => (
        <button
          key={v}
          type="button"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
          className={cn(
            "min-h-[36px] rounded-md px-3 text-[13.5px] font-medium transition-colors duration-150",
            value === v ? "bg-black text-white" : "text-ip-body hover:text-black",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function DemoVideo({
  src,
  poster,
  title,
  tag,
  label,
  aspect = "16/10",
  playbackRate = 1,
  className,
}: {
  src: string;
  poster: string;
  title: string;
  tag: string;
  /** Accessible description of what the clip shows. */
  label: string;
  aspect?: string;
  playbackRate?: number;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const inView = useInView(wrap, 0.25);
  const reduce = usePrefersReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.playbackRate = playbackRate;
    if (inView && !paused && !reduce) {
      v.play().catch(() => setPaused(true));
    } else {
      v.pause();
    }
  }, [inView, paused, reduce, playbackRate]);

  const stopped = paused || reduce;

  return (
    <div ref={wrap} className={cn("overflow-hidden rounded-[10px] border border-ip-rule-strong bg-white shadow-[0_22px_44px_-22px_rgba(0,0,0,0.35)]", className)}>
      <div className="flex items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-3.5 py-[9px] text-[12px] text-ip-body">
        <span className="flex items-center gap-2 font-semibold text-black">
          <span aria-hidden="true" className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-ip-rule-strong" />
            <span className="h-2 w-2 rounded-full bg-ip-rule-strong" />
            <span className="h-2 w-2 rounded-full bg-ip-rule-strong" />
          </span>
          {title}
        </span>
        <span>{tag}</span>
      </div>
      <div className="relative bg-ip-grey" style={{ aspectRatio: aspect }}>
        <video
          ref={ref}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          className="absolute inset-0 block h-full w-full object-cover"
          onPlay={() => ref.current && (ref.current.playbackRate = playbackRate)}
        />
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={stopped ? "Play the demo clip" : "Pause the demo clip"}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/75 text-white backdrop-blur transition-colors hover:bg-black"
        >
          {stopped ? (
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
              <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
            </svg>
          ) : (
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12">
              <rect x="2.5" y="1.5" width="2.5" height="9" fill="currentColor" />
              <rect x="7" y="1.5" width="2.5" height="9" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export function ChapterNav({ chapters, label = "On this page" }: { chapters: { id: string; label: string }[]; label?: string }) {
  const [active, setActive] = useState(chapters[0]?.id);
  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [chapters]);

  return (
    <nav aria-label={label} className="sticky top-16 z-30 border-b border-ip-rule bg-white/95 backdrop-blur lg:top-[76px]">
      <div className="ip-container">
        <ol className="m-0 flex list-none gap-1 overflow-x-auto p-0 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {chapters.map((c, i) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                aria-current={active === c.id ? "true" : undefined}
                className={cn(
                  "flex min-h-[36px] items-center gap-2 rounded-md px-3 text-[13.5px] no-underline transition-colors",
                  active === c.id ? "bg-black text-white" : "text-ip-body hover:bg-ip-grey hover:text-black",
                )}
              >
                <span className={cn("font-mono text-[11px]", active === c.id ? "text-ip-orange" : "text-ip-muted")}>{String(i + 1).padStart(2, "0")}</span>
                {c.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
