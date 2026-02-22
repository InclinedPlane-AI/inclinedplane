import { useCallback, useEffect, useRef } from "react";

/**
 * Dense AI / data-engineering illustration board hidden in the hero.
 * A radial "torch" follows the pointer and reveals nearby icons
 * by computing distance per-icon and setting opacity accordingly.
 * No CSS mask — pure per-element opacity for reliable cross-browser behaviour.
 */

// ── Detailed SVG paths (viewBox 24) ──────────────────────────────
const ICONS: { paths: string[]; fill?: boolean }[] = [
  // Neural network brain
  { paths: ["M9.5 2a6.5 6.5 0 0 0-5.19 10.39A5 5 0 0 0 2 17v1a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-1a5 5 0 0 0-2.31-4.61A6.5 6.5 0 0 0 14.5 2h-5z", "M8 12h8M10 8l-2 4 2 4M14 8l2 4-2 4"] },
  // Data pipeline / flow
  { paths: ["M2 6h6l3 4h10M2 12h4l3 4h12M2 18h8l3-4h8", "M20 4v4M20 10v4M20 16v4"] },
  // Gear with center dot
  { paths: ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 2l1.3 3.1 3.1-.5-1 3 2.6 2-2.6 2 1 3-3.1-.5L12 22l-1.3-3.1-3.1.5 1-3-2.6-2 2.6-2-1-3 3.1.5L12 2z"] },
  // Bar chart with trend
  { paths: ["M4 20V12M8 20V8M12 20V4M16 20V10M20 20V6", "M2 20h20"] },
  // Database with layers
  { paths: ["M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"] },
  // Lightning bolt
  { paths: ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"] },
  // Cloud computing
  { paths: ["M6.34 9.8a5.5 5.5 0 0 1 10.6-.78A4.5 4.5 0 0 1 18.5 18H6a4 4 0 0 1-.66-7.95z", "M8 14h2v3M14 14h-2v3"] },
  // CPU / chip
  { paths: ["M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3", "M9 9h6v6H9z"] },
  // Stacked layers
  { paths: ["M12 2L2 7l10 5 10-5-10-5z", "M2 12l10 5 10-5", "M2 17l10 5 10-5"] },
  // Eye / analytics insight
  { paths: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"] },
  // Trending up arrow
  { paths: ["M2 18l6-6 4 4 10-10", "M16 6h6v6"] },
  // AI sparkle / star burst
  { paths: ["M12 1l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.2L2 12l7.5-2.8z", "M5 3l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3", "M18 1l.7 2.3 2.3.7-2.3.7L18 7l-.7-2.3L15 4l2.3-.7L18 1"] },
  // Alert / bell
  { paths: ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0", "M12 2v1"] },
  // Shield / security
  { paths: ["M12 2l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z", "M9 12l2 2 4-4"] },
  // Network / graph
  { paths: ["M5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M19 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M5 5l7 5M19 5l-7 5M12 14v4"] },
  // Funnel / data pipeline
  { paths: ["M3 3h18l-6 8v6l-6 4V11L3 3z"] },
  // Workflow / automation
  { paths: ["M3 6h4v4H3zM17 6h4v4h-4zM10 14h4v4h-4z", "M7 8h10M12 14V10", "M5 10v2a2 2 0 0 0 2 2h3M19 10v2a2 2 0 0 1-2 2h-3"] },
  // Growth chart
  { paths: ["M3 21V8l5 4 4-8 5 6 4-4v15H3z", "M3 21h18"] },
  // Signal / broadcast
  { paths: ["M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", "M8.5 8.5a5 5 0 0 1 7 0", "M6 6a9 9 0 0 1 12 0", "M15.5 15.5a5 5 0 0 1-7 0", "M18 18a9 9 0 0 1-12 0"] },
  // Infinity / loop
  { paths: ["M8 12a4 4 0 1 1 0-.01M16 12a4 4 0 1 1 0-.01"] },
  // Binary code
  { paths: ["M4 4v5h3V4M11 4v5M15 4v5h3V4M4 13v5h3v-5M11 13v5M15 13v5h3v-5", "M8 6h2M20 6h2M8 16h2M20 16h2"] },
  // Rocket / launch
  { paths: ["M12 2c-2 4-4 6-4 10a4 4 0 0 0 8 0c0-4-2-6-4-10z", "M8 16l-2 4M16 16l2 4", "M10 20h4"] },
  // Magnifying glass / search
  { paths: ["M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "M15 15l6 6"] },
  // Globe / worldwide
  { paths: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"] },
];

// Deterministic pseudo-random
function makePositions(count: number) {
  let s = 37;
  const r = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  return Array.from({ length: count }, () => ({
    x: r() * 100,
    y: r() * 100,
    icon: Math.floor(r() * ICONS.length),
    rot: Math.floor(r() * 360),
    size: 16 + r() * 18,
  }));
}

const ITEMS = makePositions(80);
const TORCH_RADIUS = 140;

const HeroIllustrations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<(SVGSVGElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  // Direct DOM manipulation for smooth per-icon opacity
  const updateIcons = useCallback(() => {
    const m = mouseRef.current;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();

    for (let i = 0; i < ITEMS.length; i++) {
      const el = iconsRef.current[i];
      if (!el) continue;

      if (!m) {
        el.style.opacity = "0";
        continue;
      }

      // Icon center in px
      const ix = (ITEMS[i].x / 100) * rect.width;
      const iy = (ITEMS[i].y / 100) * rect.height;

      const dx = m.x - ix;
      const dy = m.y - iy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > TORCH_RADIUS) {
        el.style.opacity = "0";
      } else {
        // Ease out: full opacity at center, 0 at edge
        const t = 1 - dist / TORCH_RADIUS;
        const eased = t * t; // quadratic ease
        el.style.opacity = String(Math.min(eased * 0.45, 0.45));
      }
    }
  }, []);

  const handleMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateIcons);
  }, [updateIcons]);

  const handleLeave = useCallback(() => {
    mouseRef.current = null;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(updateIcons);
  }, [updateIcons]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove, { passive: true });
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMove, handleLeave]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[1] overflow-hidden pointer-events-auto">
      {ITEMS.map((item, i) => {
        const icon = ICONS[item.icon];
        return (
          <svg
            key={i}
            ref={(el) => { iconsRef.current[i] = el; }}
            className="absolute text-primary"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              width: item.size,
              height: item.size,
              transform: `rotate(${item.rot}deg) translate(-50%, -50%)`,
              opacity: 0,
              transition: "opacity 0.15s ease-out",
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {icon.paths.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </svg>
        );
      })}
    </div>
  );
};

export default HeroIllustrations;
