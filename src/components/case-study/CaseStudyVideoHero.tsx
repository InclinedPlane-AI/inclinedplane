import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseStudyVideoHeroProps {
  videoUrl: string;
  poster?: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCtaLabel?: string;
  onPrimaryCta?: () => void;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

const CaseStudyVideoHero = ({
  videoUrl,
  poster,
  eyebrow,
  title,
  subtitle,
  primaryCtaLabel = "Read the full story",
  onPrimaryCta,
  secondaryCtaLabel = "Talk to us",
  secondaryCtaHref = "/contact",
}: CaseStudyVideoHeroProps) => {
  return (
    <section className="relative w-full min-h-[88vh] overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          src={videoUrl}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
        {/* Dark gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32 flex flex-col items-start min-h-[88vh] justify-end">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 mb-6 glass-panel rounded-full pl-1 pr-4 py-1 border border-primary/30">
          <span className="bg-gradient-orange text-primary-foreground text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
            Case Study
          </span>
          <span className="text-xs text-foreground/90 font-medium">{eyebrow}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight max-w-4xl mb-6">
          {title}
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-secondary-foreground leading-relaxed max-w-2xl mb-10">
          {subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPrimaryCta}
            data-cursor-hover
            className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange"
          >
            {primaryCtaLabel} <ArrowRight size={16} />
          </button>
          <Link
            to={secondaryCtaHref}
            data-cursor-hover
            className="inline-flex items-center gap-2 glass-panel border border-border/60 text-foreground px-6 py-3 rounded-lg font-medium hover:bg-foreground/5 transition-colors"
          >
            {secondaryCtaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyVideoHero;