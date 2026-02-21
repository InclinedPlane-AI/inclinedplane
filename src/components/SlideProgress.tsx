import { motion } from "framer-motion";

interface SlideProgressProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
}

const SLIDE_LABELS = [
  "Hero",
  "AI Imperative",
  "The Problem",
  "Evolution",
  "Capabilities",
  "Impact",
  "Intelligence Stack",
  "Testimonials",
  "Case Studies",
  "Why Us",
  "Get Started",
];

const SlideProgress = ({ total, current, onDotClick }: SlideProgressProps) => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          data-cursor-hover
          className="relative w-3 h-3 flex items-center justify-center group"
        >
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-primary scale-150"
                : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
            }`}
          />
          {i === current && (
            <motion.div
              layoutId="progress-glow"
              className="absolute inset-0 rounded-full glow-orange"
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          )}
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap bg-card text-foreground border border-border/60 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-right">
            {SLIDE_LABELS[i] ?? `Section ${i + 1}`}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SlideProgress;
