/**
 * Design-system primitives for the revamp. Every new page builds from these
 * (plus the section components in this folder). Styling follows the founder's
 * homepage: orange buttons with black text, 6px radius, thin rules, mono labels.
 */
import { forwardRef, type ReactNode, type ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import type { StepId } from "@/content/capabilities";
import { SHOW_UNVERIFIED, type Verifiable } from "@/content/verify";

/* ---------------------------------------------------------------- Buttons */

type Variant = "primary" | "secondary" | "onDark" | "text";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 font-sans rounded-[6px] min-h-[44px] box-border text-center sm:whitespace-nowrap transition-[background-color,color,border-color,box-shadow] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-[3px] disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-ip-orange text-black font-semibold hover:bg-[#e36c15] active:bg-[#d4630f]",
  secondary: "bg-white text-black font-medium border border-black hover:bg-ip-grey",
  onDark: "bg-transparent text-white font-medium border border-white/70 hover:bg-white/10",
  text: "ip-link min-h-[44px] px-0 py-0 rounded-none",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[15px]",
  lg: "px-[26px] py-4 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "lg", className?: string) {
  return cn(base, variants[variant], variant === "text" ? "" : sizes[size], className);
}

interface ButtonLinkProps {
  to: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  external?: boolean;
  onClick?: () => void;
}

export function ButtonLink({ to, variant = "primary", size = "lg", className, children, external, onClick }: ButtonLinkProps) {
  const cls = buttonClass(variant, size, className);
  if (external || /^https?:|^mailto:/.test(to)) {
    return (
      <a href={to} className={cls} target={external ? "_blank" : undefined} rel={external ? "noopener" : undefined}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} className={cls} onClick={onClick}>
      {children}
    </Link>
  );
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "lg", className, type = "button", ...rest },
  ref,
) {
  return <button ref={ref} type={type} className={buttonClass(variant, size, className)} {...rest} />;
});

/** The founder's arrow, used only on primary CTAs (not on every link). */
export function ArrowIcon({ size = 18 }: { size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

/* ---------------------------------------------------------------- Labels */

/** Small monospace section label. `dot` adds the founder's orange square. */
export function Label({
  children,
  dot = false,
  small = false,
  as: Tag = "p",
  className,
  onDark = false,
}: {
  children: ReactNode;
  dot?: boolean;
  small?: boolean;
  as?: "p" | "span" | "div" | "h2" | "h3";
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Tag className={cn(small ? "ip-label-sm" : "ip-label", "flex items-center gap-2.5 m-0", onDark && "!text-ip-on-dark", className)}>
      {dot && <span aria-hidden="true" className="inline-block w-2 h-2 bg-ip-orange shrink-0" />}
      {children}
    </Tag>
  );
}

/**
 * Founder layout for section intros: label in a narrow left column, heading +
 * intro in the wide right column.
 */
export function SectionIntro({
  label,
  title,
  children,
  className,
  titleClass = "ip-h2",
  id,
}: {
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
  titleClass?: string;
  id?: string;
}) {
  return (
    <div className={cn("flex flex-wrap gap-x-12 gap-y-4 mb-10 md:mb-12", className)}>
      <Label className="basis-[220px] grow shrink">{label}</Label>
      <div className="basis-[520px] grow-[3] shrink">
        <h2 id={id} className={cn(titleClass, "m-0")}>
          {title}
        </h2>
        {children && <div className="mt-[18px] max-w-[640px] text-[17px] leading-[1.55] text-ip-body space-y-3">{children}</div>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- Step tags */

const stepNames: Record<StepId, string> = {
  build: "Build",
  contextualize: "Contextualize",
  enable: "Enable",
  activate: "Activate",
};

export function StepTag({ step, proposed = false }: { step: StepId; proposed?: boolean }) {
  const tone =
    step === "activate"
      ? "bg-black !text-white"
      : step === "build"
        ? "bg-ip-grey-100 !text-black"
        : "bg-ip-orange !text-black";
  return (
    <span
      className={cn(
        "ip-label-sm !tracking-[0.06em] inline-flex items-center rounded px-[9px] py-[5px]",
        tone,
        proposed && "outline outline-1 outline-dashed outline-ip-rule-dashed outline-offset-1",
      )}
      title={proposed ? "Proposed tag, awaiting approval" : undefined}
    >
      {stepNames[step]}
    </span>
  );
}

/* ---------------------------------------------------------------- Verification */

/** Visible only in development/staging. Marks content that needs sign-off. */
export function VerifyBadge({ className }: { className?: string }) {
  if (!SHOW_UNVERIFIED) return null;
  return (
    <span
      data-verify-badge
      className={cn(
        "inline-flex items-center gap-1 align-middle rounded-full border border-dashed border-[#b42318] bg-[#fef3f2] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em] text-[#b42318] whitespace-nowrap",
        className,
      )}
    >
      Verify before launch
    </span>
  );
}

/** Renders children (plus a badge when unverified) only if allowed in this build. */
export function Verified({ item, children, badge = true }: { item: Verifiable; children: ReactNode; badge?: boolean }) {
  if (!item.verified && !SHOW_UNVERIFIED) return null;
  return (
    <>
      {children}
      {!item.verified && badge && <VerifyBadge className="ml-2" />}
    </>
  );
}

/* ---------------------------------------------------------------- Layout bits */

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("ip-container", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  tone = "white",
  id,
  label,
  bordered = false,
}: {
  children: ReactNode;
  className?: string;
  tone?: "white" | "grey" | "black";
  id?: string;
  label?: string;
  bordered?: boolean;
}) {
  const bg = tone === "grey" ? "bg-ip-grey" : tone === "black" ? "bg-black text-white" : "bg-white";
  return (
    <section id={id} aria-label={label} className={cn(bg, bordered && "border-t border-ip-rule", className)}>
      <div className="ip-container ip-section">{children}</div>
    </section>
  );
}
