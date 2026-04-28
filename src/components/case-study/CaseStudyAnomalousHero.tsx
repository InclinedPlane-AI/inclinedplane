import { Suspense } from "react";
import { ChevronDown } from "lucide-react";
import { GenerativeArtScene } from "@/components/ui/anomalous-matter-hero";

interface CaseStudyAnomalousHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  onPrimaryCta?: () => void;
}

const CaseStudyAnomalousHero = ({ title }: CaseStudyAnomalousHeroProps) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Anomalous Matter WebGL background — fixed dark canvas, theme-independent */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <Suspense fallback={<div className="w-full h-full bg-[#0a0a0a]" />}>
          <GenerativeArtScene />
        </Suspense>
        {/* Legibility gradients — fixed dark, not theme-dependent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content — centered McKinsey-style layout */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center pointer-events-none">
        {/* Eyebrow */}
        <p className="text-sm sm:text-base text-[#FF7A18] font-normal mb-6 drop-shadow">
          Case Study
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.15] tracking-tight max-w-5xl mb-12 drop-shadow-lg">
          {title}
        </h1>

        {/* Scroll-down arrow */}
        <button
          aria-label="Scroll down"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight * 0.88, behavior: "smooth" })
          }
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/90 hover:text-white transition-colors animate-bounce pointer-events-auto"
        >
          <ChevronDown className="w-8 h-8 stroke-[1.5]" />
        </button>
      </div>
    </section>
  );
};

export default CaseStudyAnomalousHero;
