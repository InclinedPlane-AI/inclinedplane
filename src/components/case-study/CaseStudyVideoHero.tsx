import GradientBlinds from "./GradientBlinds";

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
}: CaseStudyVideoHeroProps) => {
  return (
    <section className="relative w-full min-h-[88vh] overflow-hidden">
      {/* Animated GradientBlinds Background — fixed dark canvas, theme-independent */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <GradientBlinds
          gradientColors={["#FF7A18", "#FF3D7F", "#5227FF"]}
          angle={0}
          noise={0.3}
          blindCount={12}
          blindMinWidth={50}
          spotlightRadius={0.5}
          spotlightSoftness={1}
          spotlightOpacity={1}
          mouseDampening={0.15}
          distortAmount={0}
          shineDirection="left"
          mixBlendMode="lighten"
        />
        {/* Legibility gradients — fixed dark, not theme-dependent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32 flex flex-col items-start min-h-[88vh] justify-end pointer-events-none [&_*]:pointer-events-auto">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 mb-6 rounded-full pl-1 pr-4 py-1 border border-white/20 bg-white/10 backdrop-blur-md">
          <span className="bg-gradient-orange text-primary-foreground text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full">
            Case Study
          </span>
          <span className="text-xs text-white/90 font-medium">{eyebrow}</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight max-w-4xl mb-6 drop-shadow-lg">
          {title}
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mb-10 drop-shadow">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default CaseStudyVideoHero;