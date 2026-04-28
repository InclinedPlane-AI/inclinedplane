import { ChevronDown } from "lucide-react";

interface Props {
  title: string;
  imageSrc: string;
  onPrimaryCta?: () => void;
}

const CaseStudyImageHero = ({ title, imageSrc, onPrimaryCta }: Props) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0a0a0a]">
      <img
        src={imageSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 pointer-events-none z-10" />

      {/* Headline */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 min-h-screen flex flex-col items-center justify-center text-center pointer-events-none">
        <p className="text-sm sm:text-base text-[#FF7A18] font-normal mb-6 drop-shadow">
          Case Study
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.15] tracking-tight max-w-5xl mb-12 drop-shadow-lg">
          {title}
        </h1>
        <button
          aria-label="Scroll down"
          onClick={onPrimaryCta}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/90 hover:text-white transition-colors animate-bounce pointer-events-auto"
        >
          <ChevronDown className="w-8 h-8 stroke-[1.5]" />
        </button>
      </div>
    </section>
  );
};

export default CaseStudyImageHero;