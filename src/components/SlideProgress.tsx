import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

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

const DOT_GAP = 24;

const SlideProgress = ({ total, current, onDotClick }: SlideProgressProps) => {
  const [prev, setPrev] = useState(current);
  const [showTrail, setShowTrail] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [clickedDot, setClickedDot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

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

  const getSlideFromY = useCallback((clientY: number) => {
    if (!containerRef.current) return current;
    const rect = containerRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const index = Math.round(relativeY / DOT_GAP);
    return Math.max(0, Math.min(total - 1, index));
  }, [total, current]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const index = getSlideFromY(e.clientY);
      if (index !== current) onDotClick(index);
    };

    const handleMouseUp = () => setDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, current, getSlideFromY, onDotClick]);

  const handleDotClick = (i: number) => {
    onDotClick(i);
    setClickedDot(i);
    clearTimeout(clickTimeoutRef.current);
    clickTimeoutRef.current = setTimeout(() => setClickedDot(null), 600);
  };

  useEffect(() => {
    return () => clearTimeout(clickTimeoutRef.current);
  }, []);

  const trackHeight = (total - 1) * DOT_GAP;

  return (
    <div
      ref={containerRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setDragging(false); }}
      onMouseDown={handleMouseDown}
      style={{ cursor: dragging ? "grabbing" : "default" }}
    >
      {/* Hover tube track */}
      <AnimatePresence>
        {(hovered || dragging) && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0.8 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0.8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute rounded-full border border-primary/25 pointer-events-none"
            style={{
              width: 20,
              height: trackHeight + DOT_GAP,
              top: -DOT_GAP / 2 + 6,
              left: "50%",
              marginLeft: -10,
              background: "linear-gradient(180deg, hsl(var(--orange-start) / 0.06), hsl(var(--orange-mid) / 0.03), hsl(var(--orange-end) / 0.06))",
            }}
          />
        )}
      </AnimatePresence>

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
            initial={{ pathLength: 0, opacity: 0.8 }}
            animate={{ pathLength: 1, opacity: [0.8, 0.6, 0] }}
            transition={{
              pathLength: { duration: 0.35, ease: "easeInOut" },
              opacity: { duration: 0.5, ease: "easeOut" },
            }}
          />
        )}
      </svg>

      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => handleDotClick(i)}
          data-cursor-hover
          className="relative w-3 h-3 flex items-center justify-center group"
        >
          {/* Concentric click ring */}
          <AnimatePresence>
            {clickedDot === i && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2.2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-3 h-3 rounded-full border border-primary/60"
              />
            )}
          </AnimatePresence>

          {/* Outer concentric ring for active dot */}
          {i === current && (
            <motion.div
              layoutId="progress-ring"
              className="absolute rounded-full border border-primary/30"
              style={{ width: 14, height: 14 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          )}

          {/* Dot */}
          <div
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-primary scale-150"
                : "bg-muted-foreground/30 group-hover:bg-primary/50"
            }`}
          />

          {/* Subtle active glow — static, no infinite animation */}
          {i === current && (
            <motion.div
              layoutId="progress-glow"
              className="absolute inset-0 rounded-full"
              style={{ boxShadow: "0 0 8px hsl(25 100% 50% / 0.2)", opacity: 0.7 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            />
          )}

          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-2.5 py-1 rounded-md text-[11px] font-medium whitespace-nowrap bg-card text-foreground border border-border/60 opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-right select-none">
            {SLIDE_LABELS[i] ?? `Section ${i + 1}`}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SlideProgress;
