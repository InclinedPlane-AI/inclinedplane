/**
 * Reusable page sections for the revamp, all derived from the founder's
 * homepage language. Pages compose these; avoid one-off restyling.
 */
import { Fragment, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { proofStats, certifiedPlatforms } from "@/content/stats";
import { toolGroups } from "@/content/tools";
import { caseStudyMeta, type CaseStudyMeta } from "@/content/caseStudyMeta";
import { caseStudies } from "@/data/caseStudies";
import { capabilityById, type Capability, type FaqItem, type StepId } from "@/content/capabilities";
import { flags } from "@/content/flags";
import { visible, SHOW_UNVERIFIED } from "@/content/verify";
import { useBooking } from "./booking/BookingProvider";
import { ArrowIcon, Button, Label, SectionIntro, StepTag, Verified, VerifyBadge, buttonClass } from "./primitives";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------ Page hero */

export function PageHero({
  label,
  title,
  lead,
  children,
  aside,
  crumbs,
  dot = false,
}: {
  label?: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
  crumbs?: { label: string; to?: string }[];
  dot?: boolean;
}) {
  return (
    <section className="bg-white border-b border-ip-rule">
      <div className="ip-container pt-[clamp(40px,6vw,80px)] pb-[clamp(44px,6vw,80px)]">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-10">
          <div className="max-w-[860px] basis-[560px] grow">
            {label && (
              <Label dot={dot} className="mb-6">
                {label}
              </Label>
            )}
            <h1 className="ip-h1-page m-0">{title}</h1>
            {lead && <p className="ip-lead mt-6 mb-0 max-w-[660px]">{lead}</p>}
            {children && <div className="mt-8 flex flex-wrap items-center gap-3.5">{children}</div>}
          </div>
          {aside && <div className="w-full min-w-0 sm:w-auto sm:shrink-0">{aside}</div>}
        </div>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-[13px] text-ip-muted">
        <li>
          <Link to="/" className="no-underline hover:text-black hover:underline">
            Home
          </Link>
        </li>
        {items.map((it) => (
          <Fragment key={it.label}>
            <li aria-hidden="true">/</li>
            <li>
              {it.to ? (
                <Link to={it.to} className="no-underline hover:text-black hover:underline">
                  {it.label}
                </Link>
              ) : (
                <span aria-current="page" className="text-black">
                  {it.label}
                </span>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}

/* ------------------------------------------------------------ CTAs */

export function BookCta({
  source,
  label = site.cta.primary,
  variant = "primary",
  size = "lg",
  arrow = true,
  className,
}: {
  source: string;
  label?: string;
  variant?: "primary" | "secondary" | "onDark";
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
}) {
  const { open } = useBooking();
  return (
    <Button variant={variant} size={size} onClick={() => open({ source })} data-cta={source} className={className}>
      {label}
      {arrow && <ArrowIcon />}
    </Button>
  );
}

/** Founder's reassurance line under the main CTAs: "Free · 45 minutes · on your own data". */
export function Reassure({ className, onDark = false }: { className?: string; onDark?: boolean }) {
  return <p className={cn("m-0 text-[14px] leading-[1.5]", onDark ? "text-ip-on-dark" : "text-ip-body", className)}>{site.cta.reassure}</p>;
}

/** Opens the checklist download dialog. */
export function ChecklistCta({ source, variant = "secondary", className }: { source: string; variant?: "secondary" | "onDark" | "text"; className?: string }) {
  const { openChecklist } = useBooking();
  return (
    <Button variant={variant} size="lg" onClick={() => openChecklist({ source })} data-cta={source} className={className}>
      {site.cta.checklistButton}
    </Button>
  );
}

/** Black mid-page band: "Not sure where your data stands?" + the checklist for people not ready to talk. */
export function CtaBand({ source }: { source: string }) {
  return (
    <section aria-label="Assessment" className="bg-black text-white">
      <div className="ip-container flex flex-wrap items-center justify-between gap-x-10 gap-y-5 py-[clamp(40px,5vw,56px)]">
        <div className="basis-[520px] grow">
          <p className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.2] tracking-[-0.015em]">{site.cta.midTitle}</p>
          <p className="mt-2.5 mb-0 max-w-[640px] text-[17px] leading-[1.55] text-ip-on-dark">{site.cta.midBody}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <BookCta source={source} label={site.cta.midButton} />
          <ChecklistCta source={`${source}-checklist`} variant="onDark" />
        </div>
      </div>
    </section>
  );
}

/** Final CTA with the light brand pattern fading in from the right. */
export function FinalCta({ source, title = site.cta.finalTitle, body = site.cta.finalBody }: { source: string; title?: string; body?: string }) {
  return (
    <section id="assessment" className="relative overflow-hidden bg-ip-grey border-t border-ip-rule">
      <div aria-hidden="true" className="ip-pattern-fade-left absolute inset-y-0 right-0 w-[42%] hidden sm:block" />
      <div className="ip-container relative py-[clamp(72px,10vw,128px)]">
        <Label dot className="mb-6">
          Start here
        </Label>
        <h2 className="m-0 max-w-[800px] text-[clamp(36px,5vw,64px)] font-semibold leading-[1.02] tracking-[-0.03em]">{title}</h2>
        <p className="mt-5 mb-0 max-w-[600px] text-[18px] leading-[1.6] text-ip-body">{body}</p>
        <div className="mt-9 flex flex-wrap items-center gap-3.5">
          <BookCta source={source} label={site.cta.finalButton} />
          <Link to="/assessment" className={buttonClass("secondary")}>
            What the assessment covers
          </Link>
        </div>
        <Reassure className="mt-3" />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Proof strip */

export function ProofStrip() {
  const stats = visible(proofStats);
  const partners = visible(certifiedPlatforms);
  if (!stats.length && !partners.length) return null;
  return (
    <section aria-label="At a glance" className="bg-white border-b border-ip-rule">
      {stats.length > 0 && (
        <div className="ip-container grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "py-7 md:py-9 pr-4 md:pr-6",
                i > 0 && "md:border-l md:border-ip-rule md:pl-6",
                i % 2 === 1 && "border-l border-ip-rule pl-4",
                i >= 2 && "border-t border-ip-rule md:border-t-0",
              )}
            >
              <div aria-hidden="true" className="mb-[18px] h-1 w-8 bg-ip-orange" />
              <div className="ip-label-sm min-h-[30px]">{s.label}</div>
              <div className="mt-3 text-[clamp(34px,3.6vw,48px)] font-semibold leading-none tracking-[-0.02em]">{s.value}</div>
              {!s.verified && <VerifyBadge className="mt-3" />}
            </div>
          ))}
        </div>
      )}
      {partners.length > 0 && (
        <div className="ip-container flex flex-wrap items-center gap-x-3 gap-y-2.5 pt-1 pb-10">
          <span className="ip-label-sm mr-2">Certified and partnered</span>
          {partners.map((p) => (
            <span key={p.name} className="rounded-full border border-ip-rule-strong px-3.5 py-[7px] text-[13px] text-ip-body">
              {p.name}
            </span>
          ))}
          {partners.some((p) => !p.verified) && <VerifyBadge />}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------ Expanded capability (home) */

export function CapabilityFeature({ cap, tone = "white", children, ctaLabel }: { cap: Capability; tone?: "white" | "grey"; children?: ReactNode; ctaLabel: string }) {
  const proofLinked = cap.proof.caseStudyIds[0];
  return (
    <section id={cap.id === "contextualize" ? "context" : "readiness"} className={cn(tone === "grey" ? "bg-ip-grey" : "bg-white border-b border-ip-rule")}>
      <div className="ip-container ip-section flex flex-wrap gap-12">
        <div className="basis-[440px] grow">
          <Label dot className="mb-4">
            {cap.step}
          </Label>
          <h2 className="ip-h2-xl m-0">{cap.name}</h2>
          <p className="mt-[22px] mb-0 text-[20px] font-medium leading-[1.5]">{cap.problem}</p>
          {cap.whatWeDo.map((p) => (
            <p key={p} className="mt-3.5 mb-0 text-[17px] leading-[1.6] text-ip-body">
              {p}
            </p>
          ))}
          <Link to={cap.path} className={buttonClass("secondary", "lg", "mt-7")}>
            {ctaLabel}
            <ArrowIcon size={16} />
          </Link>
        </div>
        <div className="flex basis-[420px] grow flex-col gap-5">
          <div className="border-t-2 border-black pt-[18px]">
            <p className="ip-label-sm m-0 mb-3">What’s included</p>
            <ul className="m-0 grid grid-cols-1 gap-x-6 gap-y-2 pl-[18px] text-[16px] leading-[1.45] sm:grid-cols-2">
              {visible(cap.included).map((it) => (
                <li key={it.label}>
                  {it.label}
                  {!it.verified && <VerifyBadge className="ml-1.5" />}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t border-ip-rule-strong pt-[18px]">
            <p className="ip-label-sm m-0 mb-2">Outcome</p>
            <p className="m-0 text-[17px] leading-[1.5]">{cap.outcome}</p>
          </div>
          <Verified item={cap.proof} badge={false}>
            <div className="rounded-lg border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-[18px]">
              <p className="ip-label-sm m-0 mb-2 flex items-center gap-2">
                Proof {!cap.proof.verified && <VerifyBadge />}
              </p>
              <p className="m-0 text-[16px] leading-[1.5]">
                {cap.proof.text}{" "}
                {proofLinked && (
                  <Link to={`/case-studies/${proofLinked}`} className="ip-link text-[15px]">
                    Read the case study
                  </Link>
                )}
              </p>
            </div>
          </Verified>
        </div>
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ IncLever card */

export function IncleverCard({ connector = true }: { connector?: boolean }) {
  return (
    <div id="inclever" className="flex basis-full flex-col items-start">
      {connector && <div aria-hidden="true" className="ml-8 h-8 w-0.5 bg-ip-orange" />}
      <div className="relative flex flex-wrap items-center gap-x-12 gap-y-8 self-stretch overflow-hidden rounded-[14px] border-2 border-ip-orange bg-white p-[clamp(24px,3.5vw,44px)]">
        <div aria-hidden="true" className="ip-pattern-fade-left absolute inset-y-0 right-0 w-[40%]" />
        <div className="relative basis-[420px] grow">
          <p className="ip-label m-0 mb-3.5 flex flex-wrap items-center gap-2">
            <span className="rounded bg-ip-orange px-2 py-1 font-semibold !text-black">Our accelerator</span>
            For Contextualize and Enable
          </p>
          <h3 className="m-0 text-[clamp(34px,4vw,52px)] font-semibold leading-[1.05] tracking-[-0.025em]">IncLever</h3>
          <p className="mt-2.5 mb-0 text-[20px] font-medium leading-[1.4]">The control plane for trusted, AI-ready data.</p>
          <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">
            IncLever audits, remediates and continuously monitors datasets, semantic layers and metrics, so AI agents and BI tools can rely on the data they work with. Its Intelligent Routing layer cuts the cost of LLM usage by avoiding redundant queries, while making answers to analytical questions more reliable, whether people or AI agents ask them.
          </p>
          <p className="mt-3.5 mb-0 text-[16px] font-medium leading-[1.6]">{site.incleverLine2}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Audit", "Remediate", "Monitor", "Intelligent Routing"].map((t) => (
              <span key={t} className="ip-label !text-black rounded border border-black px-2.5 py-1.5 !tracking-[0.06em]">
                {t}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/products/inclever#demo" className={buttonClass("primary", "md", "px-[22px] py-3.5 text-base")}>
              Try the interactive demo
            </Link>
            <Link to="/products/inclever" className="ip-link text-base">
              How IncLever works
            </Link>
          </div>
        </div>
        <div className="relative flex max-w-[580px] basis-[420px] grow flex-col gap-3">
          <IncleverDemoFrame />
        </div>
      </div>
    </div>
  );
}

export function IncleverDemoFrame() {
  return (
    <>
      <div className="overflow-hidden rounded-[10px] border border-ip-rule-strong bg-white shadow-[0_22px_44px_-22px_rgba(0,0,0,0.35)]">
        <div className="flex items-center justify-between gap-3 border-b border-ip-rule bg-ip-grey px-3.5 py-[9px] text-[12px] text-ip-body">
          <span className="font-semibold text-black">IncLever demo</span>
          <span>Sample data</span>
        </div>
        <video
          src="/media/inclever-demo.mp4"
          poster="/media/inclever-demo-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label="Short clip of the IncLever demo: an audit run, the problems it found, and AI questions being checked"
          className="block aspect-[16/10] h-auto w-full bg-ip-grey object-cover"
        />
      </div>
      <p className="m-0 text-[14px] text-ip-body">Interactive demo, about 5 minutes, sample data, nothing to install.</p>
    </>
  );
}

/* ------------------------------------------------------------ Tools */

export function ToolsTable({ steps }: { steps?: StepId[] }) {
  const groups = toolGroups.filter((g) => !steps || steps.includes(g.step));
  const anyUnverified = groups.some((g) => g.tools.some((t) => !t.verified));
  return (
    <div>
      <p className="m-0 mb-5 flex items-center gap-2 text-[14px] text-ip-body">
        <span aria-hidden="true" className="inline-block h-[7px] w-[7px] bg-ip-orange" />
        Certified or partner platform
        {anyUnverified && <VerifyBadge className="ml-2" />}
      </p>
      <div role="list" aria-label="Tools by capability" className="border-t-2 border-black">
        {groups.map((g) => {
          const tools = visible(g.tools);
          if (!tools.length) return null;
          const cap = capabilityById[g.step];
          return (
            <div role="listitem" key={g.title} className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-ip-rule-strong py-5">
              <div className="flex basis-[300px] shrink flex-col gap-1">
                <span className="ip-label-sm flex items-center gap-2">
                  {cap.tone === "orange" && <span aria-hidden="true" className="inline-block h-2 w-2 bg-ip-orange" />}
                  {cap.step}
                </span>
                <span className="text-[19px] font-semibold">{g.title}</span>
              </div>
              <div className="flex basis-[420px] grow flex-wrap gap-2">
                {tools.map((t) => (
                  <span
                    key={t.name}
                    className={cn(
                      "inline-flex items-center gap-[7px] rounded-full bg-white px-[13px] py-[7px] text-[14px]",
                      t.certified ? "border border-black font-semibold" : "border border-ip-rule-strong font-medium",
                    )}
                  >
                    {t.certified && <span aria-hidden="true" className="inline-block h-[7px] w-[7px] bg-ip-orange" />}
                    {t.name}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Case studies */

export function getCaseStudy(id: string) {
  const cs = caseStudies.find((c) => c.id === id);
  const meta = caseStudyMeta[id];
  return cs && meta ? { cs, meta } : null;
}

export function CaseStudyCard({ id, size = "default" }: { id: string; size?: "default" | "feature" }) {
  const found = getCaseStudy(id);
  if (!found) return null;
  const { cs, meta } = found;
  return (
    <article
      className={cn(
        "group relative flex flex-col gap-[18px] rounded-xl border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white transition-[border-color] duration-200 hover:border-black hover:border-t-ip-orange",
        size === "feature" ? "p-[clamp(24px,3vw,40px)]" : "p-[clamp(22px,2.6vw,32px)]",
      )}
    >
      <div className="ip-label-sm">
        {cs.industry}
        {meta.region ? `, ${meta.region}` : ""}
      </div>
      <h3 className={cn("m-0 font-semibold leading-[1.2] tracking-[-0.01em]", size === "feature" ? "text-[clamp(22px,2.2vw,28px)]" : "text-[21px]")}>
        <Link to={`/case-studies/${id}`} className="no-underline after:absolute after:inset-0 after:rounded-xl after:content-[''] group-hover:underline underline-offset-4 decoration-1">
          {meta.title}
        </Link>
      </h3>
      <div className={cn("grid border-t border-ip-rule", meta.secondary ? "grid-cols-2" : "grid-cols-1")}>
        <div className="pt-4 pr-3">
          <div className="ip-label-sm">{meta.headline.label}</div>
          <div className="mt-2 whitespace-nowrap text-[clamp(24px,2.4vw,32px)] font-semibold tracking-[-0.02em]">{meta.headline.value}</div>
        </div>
        {meta.secondary && (
          <div className="border-l border-ip-rule pt-4 pl-3">
            <div className="ip-label-sm">{meta.secondary.label}</div>
            <div className="mt-2 whitespace-nowrap text-[clamp(24px,2.4vw,32px)] font-semibold tracking-[-0.02em]">{meta.secondary.value}</div>
          </div>
        )}
      </div>
      <div className="relative z-10 flex flex-wrap gap-2">
        {meta.steps.map((s) => (
          <StepTag key={s} step={s} />
        ))}
        {SHOW_UNVERIFIED && meta.proposedSteps?.map((s) => <StepTag key={s} step={s} proposed />)}
      </div>
      <span className="mt-auto text-[15px] font-semibold text-black">Read the case study</span>
    </article>
  );
}

export function CaseStudyPlaceholder() {
  if (!SHOW_UNVERIFIED) return null;
  return (
    <article className="flex flex-col gap-[18px] rounded-xl border border-dashed border-ip-rule-dashed bg-ip-grey p-[clamp(22px,2.6vw,32px)]">
      <div className="ip-label-sm">Needed before launch</div>
      <h3 className="m-0 text-[21px] font-semibold leading-[1.2]">A context engineering or AI readiness story</h3>
      <p className="m-0 text-[15px] leading-[1.55] text-ip-body">Industry, what was built (a semantic layer, an agent rollout), and one or two numbers that changed.</p>
      <div className="flex flex-wrap gap-2">
        <StepTag step="contextualize" />
        <StepTag step="enable" />
      </div>
    </article>
  );
}

export function featuredCaseStudyIds(): string[] {
  return Object.values(caseStudyMeta)
    .filter((m: CaseStudyMeta) => m.featured)
    .sort((a, b) => a.order - b.order)
    .map((m) => m.id);
}

/* ------------------------------------------------------------ FAQ */

/** Native <details> so answers are in the HTML and work without JS. */
export function Faq({ items, title = "Questions buyers ask" }: { items: FaqItem[]; title?: string }) {
  const shown = items.filter((f) => !f.flag || flags[f.flag]);
  if (!shown.length) return null;
  return (
    <div>
      <h2 className="ip-h2 m-0 mb-8">{title}</h2>
      <div className="border-t-2 border-black">
        {shown.map((f) => (
          <details key={f.q} className="group border-b border-ip-rule-strong">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[19px] font-semibold leading-[1.35] [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-black" />
                <span className="absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-black transition-transform duration-200 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="m-0 max-w-[760px] pb-6 text-[17px] leading-[1.6] text-ip-body">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ Misc */

export { SectionIntro };
