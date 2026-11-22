/**
 * A full product sandbox, loaded only on request. Until someone presses
 * Launch, the page carries a screenshot and a button: the demo file (about
 * 800 KB, self-contained, no outside requests) isn't fetched at all, so it
 * costs the host page nothing. Hovering or focusing the button prefetches it.
 * Once launched it runs in a sandboxed iframe, with "open in a new tab" for a
 * full-screen look (better on phones, where the portal is cramped).
 */
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function SandboxDemo({
  src,
  poster,
  title,
  note,
  size,
}: {
  /** Path to the demo page; deep links go in the hash (e.g. "#/alerts"). */
  src: string;
  poster: string;
  title: string;
  note: string;
  /** Shown on the launch button, e.g. "about 800 KB". */
  size: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const prefetched = useRef(false);

  const prefetch = () => {
    if (prefetched.current) return;
    prefetched.current = true;
    const l = document.createElement("link");
    l.rel = "prefetch";
    l.href = src.split("#")[0];
    document.head.appendChild(l);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-ip-rule-strong bg-white shadow-[0_22px_44px_-26px_rgba(0,0,0,0.35)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-4 py-2.5">
        <span className="flex items-center gap-2 text-[13px] font-semibold text-black">
          <span aria-hidden="true" className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-ip-rule-strong" />
            <span className="h-2 w-2 rounded-full bg-ip-rule-strong" />
            <span className="h-2 w-2 rounded-full bg-ip-rule-strong" />
          </span>
          {title}
        </span>
        <span className="flex items-center gap-4 text-[13px]">
          <a href={src} target="_blank" rel="noopener" className="ip-link text-[13px]" onMouseEnter={prefetch} onFocus={prefetch}>
            Open in a new tab
          </a>
          {open && (
            <button type="button" onClick={() => setOpen(false)} className="ip-link text-[13px]">
              Close
            </button>
          )}
        </span>
      </div>

      <div className="relative h-[clamp(520px,78vh,860px)] bg-ip-grey">
        {open ? (
          <>
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                <span className="flex items-center gap-3 text-[14px] text-ip-body">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-ip-rule-strong border-t-ip-orange" />
                  Loading the demo…
                </span>
              </div>
            )}
            <iframe
              src={src}
              title={title}
              onLoad={() => setLoaded(true)}
              sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              className={cn("absolute inset-0 h-full w-full border-0 bg-white transition-opacity duration-300", loaded ? "opacity-100" : "opacity-0")}
            />
          </>
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            onMouseEnter={prefetch}
            onFocus={prefetch}
            className="group absolute inset-0 block w-full cursor-pointer text-left"
            aria-label={`Launch the ${title}`}
          >
            <img src={poster} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.01]" />
            <span className="absolute inset-x-0 bottom-0 flex flex-col gap-4 border-t border-ip-rule-strong bg-white/95 p-5 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <span className="flex flex-col gap-1.5">
                <span className="max-w-[620px] text-[15px] leading-[1.5] text-black">{note}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ip-muted">Loads only when you start it · {size}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-3 self-start rounded-[6px] bg-ip-orange px-6 py-4 text-[16px] font-semibold text-black transition-colors duration-200 group-hover:bg-[#e36c15] sm:self-auto">
                <svg aria-hidden="true" width="14" height="14" viewBox="0 0 12 12">
                  <path d="M3 1.5v9l7.5-4.5z" fill="currentColor" />
                </svg>
                Launch the interactive demo
              </span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
