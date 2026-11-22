/**
 * Social proof: the client logo wall ("Trusted by") and testimonials.
 * Both are gated by verification markers (src/content/verify.ts):
 * staging shows everything with badges; production shows only verified items
 * and renders nothing at all when none are verified.
 */
import { clients } from "@/content/clients";
import { testimonials } from "@/content/testimonials";
import { SHOW_UNVERIFIED, canShow } from "@/content/verify";
import { Label, SectionIntro, VerifyBadge } from "./primitives";
import { cn } from "@/lib/utils";

/**
 * Logo wall. Logos render as uniform marks (no rainbow of client colors) in a
 * ruled grid. On the black "Trusted by" band they are white.
 */
export function ClientLogos({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const shown = clients.filter((c) => canShow(c) && (c.logo || SHOW_UNVERIFIED));
  if (!shown.length) return null;
  return (
    <ul
      aria-label="Clients"
      className={cn(
        "m-0 grid list-none grid-cols-2 border-l border-t p-0 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
        onDark ? "border-white/15" : "border-ip-rule",
        className,
      )}
    >
      {shown.map((c) => (
        <li
          key={c.name}
          className={cn(
            "group flex h-[96px] items-center justify-center border-b border-r px-4 sm:h-[112px] sm:px-5",
            onDark ? "border-white/15" : "border-ip-rule",
          )}
        >
          {c.logo ? (
            <img
              src={c.logo}
              alt={c.name}
              loading="lazy"
              decoding="async"
              className={cn(
                "block h-[var(--h-sm)] w-auto max-w-full object-contain transition-opacity duration-200 group-hover:opacity-100 sm:h-[var(--h)]",
                onDark ? "opacity-80 brightness-0 invert" : "opacity-[0.72] brightness-0",
              )}
              style={{ "--h": `${c.height}px`, "--h-sm": `${Math.round(c.height * 0.8)}px` } as React.CSSProperties}
            />
          ) : (
            <span className="flex flex-col items-center gap-1 text-center">
              <span className={cn("text-[14px] font-semibold leading-[1.2]", onDark ? "text-white/85" : "text-ip-body")}>{c.name}</span>
              <span className={cn("font-mono text-[10px] uppercase tracking-[0.06em]", onDark ? "text-ip-orange" : "text-[#b42318]")}>
                Logo file needed
              </span>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * The "Trusted by" band: its own black section (a deliberate dark moment),
 * placed right after the homepage proof strip and on /case-studies.
 * Renders nothing in production until at least one logo is verified.
 */
export function TrustedBy() {
  const shown = clients.filter((c) => canShow(c) && (c.logo || SHOW_UNVERIFIED));
  if (!shown.length) return null;
  const anyUnverified = shown.some((c) => !c.verified);
  return (
    <section aria-label="Trusted by" className="bg-black text-white">
      <div className="ip-container py-[clamp(56px,7vw,96px)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <div className="max-w-[720px]">
            <Label dot onDark className="mb-4">
              Trusted by
            </Label>
            <h2 className="m-0 text-[clamp(28px,3.4vw,42px)] font-semibold leading-[1.1] tracking-[-0.02em]">
              Companies we’ve engineered data foundations for.
            </h2>
          </div>
          <div className="flex max-w-[360px] flex-col gap-3">
            <p className="m-0 text-[16px] leading-[1.55] text-ip-on-dark">
              Across manufacturing, consumer goods, retail, hospitality and education.
            </p>
            {anyUnverified && (
              <span className="flex flex-wrap items-center gap-2 text-[13px] text-ip-on-dark">
                <VerifyBadge /> Confirm each client’s permission before launch
              </span>
            )}
          </div>
        </div>
        <ClientLogos onDark />
      </div>
    </section>
  );
}

/**
 * Testimonials: one large quote and two smaller ones, separated by rules
 * (no cards, no photos, no quote-mark flourishes).
 */
export function Testimonials({ tone = "white" }: { tone?: "white" | "grey" }) {
  const shown = testimonials.filter(canShow);
  if (!shown.length) return null;
  const [lead, ...rest] = shown;

  const Attribution = ({ t }: { t: (typeof shown)[number] }) => (
    <figcaption className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] leading-[1.45]">
      <span>
        <span className="font-semibold text-black">{t.role}</span>
        <span className="text-ip-muted">, {t.company}</span>
      </span>
      {t.placeholder && SHOW_UNVERIFIED && (
        <span className="inline-flex items-center rounded-full border border-dashed border-[#b42318] bg-[#fef3f2] px-2 py-0.5 font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-[#b42318]">
          Placeholder: replace before launch
        </span>
      )}
    </figcaption>
  );

  return (
    <section aria-label="Testimonials" className={cn(tone === "grey" ? "bg-ip-grey" : "bg-white")}>
      <div className="ip-container ip-section">
        <SectionIntro label="In their words" title="What working with us is like." />
        <div className={cn("grid gap-x-12 gap-y-10 border-t-2 border-black pt-10", rest.length && "lg:grid-cols-[1.35fr_1fr]")}>
          <figure className="m-0 border-l-[3px] border-ip-orange pl-6">
            <blockquote className="m-0 text-[clamp(22px,2.5vw,32px)] font-medium leading-[1.3] tracking-[-0.01em] text-black">
              “{lead.quote}”
            </blockquote>
            <Attribution t={lead} />
          </figure>
          {rest.length > 0 && (
            <div className="flex flex-col">
              {rest.map((t, i) => (
                <figure key={t.quote} className={cn("m-0", i > 0 && "mt-8 border-t border-ip-rule-strong pt-8")}>
                  <blockquote className="m-0 text-[18px] leading-[1.5] text-black">“{t.quote}”</blockquote>
                  <Attribution t={t} />
                </figure>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
