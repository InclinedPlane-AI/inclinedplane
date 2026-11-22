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
 * Logo wall. Logos are shown as uniform black marks (brand restraint, no
 * rainbow of client colors) in a ruled grid, like the founder's industries
 * list. `compact` drops the heading for use inside the proof strip.
 */
export function ClientLogos({ compact = false, className }: { compact?: boolean; className?: string }) {
  const shown = clients.filter((c) => canShow(c) && (c.logo || SHOW_UNVERIFIED));
  if (!shown.length) return null;
  const anyUnverified = shown.some((c) => !c.verified);

  return (
    <div className={className}>
      <div className={cn("flex flex-wrap items-center justify-between gap-x-6 gap-y-2", compact ? "mb-4" : "mb-6")}>
        <Label small={compact}>Trusted by</Label>
        {anyUnverified && (
          <span className="flex flex-wrap items-center gap-2 text-[13px] text-ip-muted">
            <VerifyBadge /> Confirm each client’s permission before launch
          </span>
        )}
      </div>
      <ul
        aria-label="Clients"
        className="m-0 grid list-none grid-cols-2 border-l border-t border-ip-rule p-0 min-[480px]:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      >
        {shown.map((c) => (
          <li
            key={c.name}
            className="group flex h-[92px] items-center justify-center border-b border-r border-ip-rule px-4 sm:h-[104px] sm:px-5"
          >
            {c.logo ? (
              <img
                src={c.logo}
                alt={c.name}
                loading="lazy"
                decoding="async"
                className="block h-[var(--h-sm)] w-auto max-w-full object-contain opacity-[0.72] brightness-0 transition-opacity duration-200 group-hover:opacity-100 sm:h-[var(--h)]"
                style={{ "--h": `${c.height}px`, "--h-sm": `${Math.round(c.height * 0.8)}px` } as React.CSSProperties}
              />
            ) : (
              <span className="flex flex-col items-center gap-1 text-center">
                <span className="text-[14px] font-semibold leading-[1.2] text-ip-body">{c.name}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-[#b42318]">Logo file needed</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Full-width section wrapper for pages other than the homepage proof strip. */
export function ClientsSection({ tone = "white" }: { tone?: "white" | "grey" }) {
  if (!clients.some((c) => canShow(c))) return null;
  return (
    <section aria-label="Clients" className={cn(tone === "grey" ? "bg-ip-grey" : "bg-white", "border-t border-ip-rule")}>
      <div className="ip-container py-[clamp(48px,6vw,80px)]">
        <ClientLogos />
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
