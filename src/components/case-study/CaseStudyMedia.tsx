import { useState } from "react";

/*
 * One image treatment for every case study: a warm, dark duotone (grayscale
 * photo, brand-orange multiply, soft highlight). It makes a mixed set of
 * source images read as one deliberate series and keeps every card and hero
 * on-brand. Swap the source image in src/data/caseStudies.ts; the look stays.
 */
interface Props {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
  /** Darken the bottom edge so overlaid text or chips stay legible. */
  shade?: boolean;
}

const CaseStudyMedia = ({ src, alt, className = "", eager = false, shade = false }: Props) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-[#0d0a08] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`absolute inset-0 h-full w-full object-cover [filter:grayscale(1)_contrast(1.2)_brightness(0.72)] transition-[opacity,transform] duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        } group-hover:scale-105`}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-multiply"
        style={{ background: "linear-gradient(160deg, hsl(25 100% 50% / 0.55), hsl(15 90% 20% / 0.6))" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 mix-blend-screen"
        style={{ background: "radial-gradient(circle at 80% 10%, hsl(35 100% 60% / 0.35), transparent 50%)" }}
      />
      {shade && <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />}
    </div>
  );
};

export default CaseStudyMedia;
