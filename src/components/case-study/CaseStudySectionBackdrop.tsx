import { ReactNode } from "react";
import DottedSurface from "@/components/ui/dotted-surface";

interface CaseStudySectionBackdropProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  /** Override accent color for the dotted wave (defaults to molten orange). */
  dotColor?: string;
  /** Override the solid base background color. */
  bgColor?: string;
}

/**
 * Full-bleed McKinsey-style banner with an animated dotted-wave WebGL
 * background, a small uppercase eyebrow and a large light-weight headline.
 */
const CaseStudySectionBackdrop = ({
  eyebrow,
  title,
  children,
  dotColor = "#ffffff",
  bgColor = "#FF7A18",
}: CaseStudySectionBackdropProps) => {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Animated dotted surface */}
      <div className="absolute inset-0 pointer-events-none">
        <DottedSurface
          dotColor={dotColor}
          opacity={0.55}
          pointSize={6}
          waveAmplitude={45}
        />
        {/* Soft vignettes for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 py-28 sm:py-36 text-center">
        <p className="text-xs sm:text-sm font-medium tracking-[0.25em] uppercase text-white/85 mb-8">
          {eyebrow}
        </p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.1] tracking-tight max-w-5xl mx-auto">
          {title}
        </h2>
        {children && (
          <div className="mt-12 text-white/90 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed font-light">
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudySectionBackdrop;