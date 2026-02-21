import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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

const DOT_GAP = 24; // matches gap-3 (12px gap) + dot size

const SlideProgress = ({ total, current, onDotClick }: SlideProgressProps) => {
  const [prev, setPrev] = useState(current);
  const [showTrail, setShowTrail] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (current !== prev) {
      setShowTrail(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setShowTrail(false);
        setPrev(current);
      }, 500);
    }
    return () => clearTimeout(timeoutRef.current);
  }, [current, prev]);

  const trailTop = Math.min(prev, current);
  const trailBottom = Math.max(prev, current);
  const goingDown = current > prev;

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
      {/* SVG trail line between dots */}
      <svg
        className="absolute pointer-events-none"
        style={{
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 12,
          height: total * DOT_GAP,
        }}
        viewBox={`0 0 12 ${total * DOT_GAP}`}
        fill="none"
      >
        {showTrail && (
          <motion.path
            d={(() => {
              const startY = trailTop * DOT_GAP + DOT_GAP / 2;
              const endY = trailBottom * DOT_GAP + DOT_GAP / 2;
              const midY = (startY + endY) / 2;
              return `M 6 ${startY} C 10 ${midY - (endY - startY) * 0.15}, 2 ${midY + (endY - startY) * 0.15}, 6 ${endY}`;
            })()}
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
            initial={{
              pathLength: 0,
              opacity: 0.8,
            }}
            animate={{
              pathLength: 1,
              opacity: [0.8, 0.6, 0],
            }}
            transition={{
              pathLength: { duration: 0.35, ease: "easeInOut" },
              opacity: { duration: 0.5, ease: "easeOut" },
            }}
            style={{
              pathOffset: goingDown ? 0 : 0,
            }}
          />
        )}
      </svg>

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
