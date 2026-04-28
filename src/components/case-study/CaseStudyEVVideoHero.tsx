import { useRef, useState, useEffect } from "react";
import { Play, Pause, ChevronDown } from "lucide-react";
import videoSrc from "@/assets/predicting-ev-battery.mp4";

interface Props {
  title: string;
  onPrimaryCta?: () => void;
}

const CaseStudyEVVideoHero = ({ title, onPrimaryCta }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) v.play();
    else v.pause();
  };

  return (
    <section className="relative w-full min-h-[88vh] overflow-hidden bg-[#0a0a0a]">
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      {/* Legibility gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none z-10" />

      {/* Headline */}
      <div className="relative z-20 max-w-6xl mx-auto px-6 lg:px-8 min-h-[88vh] flex flex-col items-center justify-center text-center pointer-events-none">
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

      {/* Play / Pause button — bottom right */}
      <button
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute bottom-6 right-6 z-30 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors"
      >
        {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
      </button>
    </section>
  );
};

export default CaseStudyEVVideoHero;
