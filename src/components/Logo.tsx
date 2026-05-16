import logoLight from "@/assets/logo-light.png";
import logoDark from "@/assets/logo-dark.png";

interface LogoProps {
  className?: string;
  /** Force a specific variant regardless of theme (e.g. for white-on-hero overlays). */
  forceVariant?: "light" | "dark";
  eager?: boolean;
}

/**
 * Theme-aware brand logo.
 * - `logo-light` (black wordmark) shows in light theme.
 * - `logo-dark`  (white wordmark) shows in dark theme (default).
 * Visibility is controlled by the `.light` class on <html> (see index.css).
 */
const Logo = ({ className = "h-7 w-auto", forceVariant, eager = true }: LogoProps) => {
  const commonProps = {
    alt: "Inclined Plane",
    className,
    loading: eager ? ("eager" as const) : ("lazy" as const),
    decoding: "async" as const,
    draggable: false,
  };

  if (forceVariant === "light") return <img src={logoLight} {...commonProps} />;
  if (forceVariant === "dark") return <img src={logoDark} {...commonProps} />;

  return (
    <>
      <img src={logoDark} {...commonProps} className={`${className} logo-dark`} />
      <img src={logoLight} {...commonProps} className={`${className} logo-light`} />
    </>
  );
};

export default Logo;