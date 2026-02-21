import { useCallback, useRef, useState } from "react";

/**
 * Dense AI / data-engineering illustrations that sit almost invisible
 * in the hero background. A radial "torch" follows the cursor and
 * reveals the drawings within a soft circle.
 */

// Simple SVG icon paths — kept inline so we avoid extra imports.
// Each entry: [viewBox-size, d-path, optional-second-path]
const ICONS: [number, string, string?][] = [
  // Brain / neural
  [24, "M12 2a7 7 0 0 0-4.6 12.3A4 4 0 0 0 4 18v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1a4 4 0 0 0-3.4-3.7A7 7 0 0 0 12 2z"],
  // Database cylinder
  [24, "M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2z", "M2 6.5C2 8.98 6.48 11 12 11s10-2.02 10-4.5"],
  // Chart bars
  [24, "M3 22V10h4v12H3zM10 22V6h4v16h-4zM17 22V2h4v20h-4z"],
  // Gear / automation
  [24, "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1.08-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1.08 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1.08 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.26.604.852.997 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1.08z"],
  // Lightning / Zap
  [24, "M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  // Network nodes
  [24, "M5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 5v6l7 9M19 5v6l-7 9"],
  // Cloud
  [24, "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"],
  // CPU / chip
  [24, "M6 4h12v16H6zM9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"],
  // Layers
  [24, "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"],
  // Eye / insight
  [24, "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  // Flow / pipeline
  [24, "M5 3v18M19 3v18M5 12h14M5 6h14M5 18h14"],
  // Target
  [24, "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", "M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  // Binary
  [24, "M4 4v6h4V4H4zM16 4v6h4V4h-4zM4 14v6h4v-6H4zM16 14v6h4v-6h-4zM10 4h2v6h-2zM10 14h2v6h-2z"],
  // Trending up
  [24, "M23 6l-9.5 9.5-5-5L1 18"],
  // Sparkle / AI
  [24, "M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z"],
];

// Pre-generate random positions for ~60 icons spread across the hero area
const SEED_COUNT = 55;
function seededPositions() {
  const positions: { x: number; y: number; iconIdx: number; rotation: number; size: number }[] = [];
  // Simple deterministic pseudo-random
  let s = 42;
  const rand = () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < SEED_COUNT; i++) {
    positions.push({
      x: rand() * 100,
      y: rand() * 100,
      iconIdx: Math.floor(rand() * ICONS.length),
      rotation: rand() * 360,
      size: 18 + rand() * 16, // 18-34px
    });
  }
  return positions;
}
const POSITIONS = seededPositions();

const HeroIllustrations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const handleMove = useCallback((e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleLeave = useCallback(() => setMouse(null), []);

  // Torch radius in px
  const RADIUS = 120;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] overflow-hidden"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          // Use CSS mask for the torch spotlight
          WebkitMaskImage: mouse
            ? `radial-gradient(circle ${RADIUS}px at ${mouse.x}px ${mouse.y}px, black 0%, black 40%, transparent 100%)`
            : "none",
          maskImage: mouse
            ? `radial-gradient(circle ${RADIUS}px at ${mouse.x}px ${mouse.y}px, black 0%, black 40%, transparent 100%)`
            : "none",
          opacity: mouse ? 1 : 0,
        }}
      >
        {POSITIONS.map((p, i) => {
          const icon = ICONS[p.iconIdx];
          return (
            <svg
              key={i}
              className="absolute text-primary/20"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                transform: `rotate(${p.rotation}deg)`,
              }}
              viewBox={`0 0 ${icon[0]} ${icon[0]}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d={icon[1]} />
              {icon[2] && <path d={icon[2]} />}
            </svg>
          );
        })}
      </div>
    </div>
  );
};

export default HeroIllustrations;
