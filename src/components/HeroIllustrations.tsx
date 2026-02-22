import { useCallback, useEffect, useRef } from "react";

// ── SVG icon paths (viewBox 24) ──────────────────────────────────
const ICONS: string[][] = [
  // Brain / neural
  ["M9.5 2a6.5 6.5 0 0 0-5.19 10.39A5 5 0 0 0 2 17v1a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-1a5 5 0 0 0-2.31-4.61A6.5 6.5 0 0 0 14.5 2h-5z", "M8 12h8M10 8l-2 4 2 4M14 8l2 4-2 4"],
  // Pipeline
  ["M2 6h6l3 4h10M2 12h4l3 4h12M2 18h8l3-4h8", "M20 4v4M20 10v4M20 16v4"],
  // Gear
  ["M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z", "M12 2l1.3 3.1 3.1-.5-1 3 2.6 2-2.6 2 1 3-3.1-.5L12 22l-1.3-3.1-3.1.5 1-3-2.6-2 2.6-2-1-3 3.1.5L12 2z"],
  // Bar chart
  ["M4 20V12M8 20V8M12 20V4M16 20V10M20 20V6", "M2 20h20"],
  // Database
  ["M4 6c0-1.66 3.58-3 8-3s8 1.34 8 3M4 6v4c0 1.66 3.58 3 8 3s8-1.34 8-3V6M4 10v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4M4 14v4c0 1.66 3.58 3 8 3s8-1.34 8-3v-4"],
  // Lightning
  ["M13 2L3 14h9l-1 8 10-12h-9l1-8z"],
  // Cloud
  ["M6.34 9.8a5.5 5.5 0 0 1 10.6-.78A4.5 4.5 0 0 1 18.5 18H6a4 4 0 0 1-.66-7.95z"],
  // CPU
  ["M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3", "M9 9h6v6H9z"],
  // Layers
  ["M12 2L2 7l10 5 10-5-10-5z", "M2 12l10 5 10-5", "M2 17l10 5 10-5"],
  // Eye
  ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"],
  // Trending up
  ["M2 18l6-6 4 4 10-10", "M16 6h6v6"],
  // Sparkle
  ["M12 1l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.2L2 12l7.5-2.8z"],
  // Bell
  ["M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9", "M13.73 21a2 2 0 0 1-3.46 0"],
  // Shield
  ["M12 2l8 4v5c0 5.25-3.5 9.74-8 11-4.5-1.26-8-5.75-8-11V6l8-4z", "M9 12l2 2 4-4"],
  // Network
  ["M5 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M19 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M12 22a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z", "M5 5l7 5M19 5l-7 5M12 14v4"],
  // Funnel
  ["M3 3h18l-6 8v6l-6 4V11L3 3z"],
  // Workflow
  ["M3 6h4v4H3zM17 6h4v4h-4zM10 14h4v4h-4z", "M7 8h10M12 14V10"],
  // Growth
  ["M3 21V8l5 4 4-8 5 6 4-4v15H3z", "M3 21h18"],
  // Signal
  ["M12 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2z", "M8.5 8.5a5 5 0 0 1 7 0", "M6 6a9 9 0 0 1 12 0"],
  // Rocket
  ["M12 2c-2 4-4 6-4 10a4 4 0 0 0 8 0c0-4-2-6-4-10z", "M8 16l-2 4M16 16l2 4", "M10 20h4"],
  // Search
  ["M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14z", "M15 15l6 6"],
  // Globe
  ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10"],
  // Lock
  ["M5 11h14v10H5z", "M8 11V7a4 4 0 0 1 8 0v4"],
  // Code
  ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
  // Terminal
  ["M4 17l6-5-6-5", "M12 19h8"],
  // Activity pulse
  ["M22 12h-4l-3 9L9 3l-3 9H2"],
  // Pie chart
  ["M12 2a10 10 0 1 0 10 10h-10V2z", "M20.66 7A10 10 0 0 0 14 2.05V10h8.46"],
  // Table/grid
  ["M3 3h18v18H3z", "M3 9h18M3 15h18M9 3v18M15 3v18"],
];

// Tool logo labels
const TOOL_LABELS = [
  "AWS", "Azure", "dbt", "Snowflake", "Databricks", "Kafka",
  "Airflow", "Spark", "Python", "SQL", "Terraform", "Docker",
  "GPT", "LLM", "ETL", "API", "ML", "CI/CD", "K8s", "Redis",
  "PostgreSQL", "Tableau", "PowerBI", "n8n", "GraphQL", "REST",
];

// Deterministic pseudo-random
function prng(seed: number) {
  let s = seed;
  return () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
}

type Item = { x: number; y: number; rot: number; size: number } & (
  | { type: "icon"; icon: number }
  | { type: "label"; label: string }
);

function makeItems(): Item[] {
  const r = prng(42);
  const items: Item[] = [];

  // ~110 icons
  for (let i = 0; i < 110; i++) {
    items.push({
      type: "icon",
      x: r() * 100,
      y: r() * 100,
      icon: Math.floor(r() * ICONS.length),
      rot: Math.floor(r() * 360),
      size: 14 + r() * 18,
    });
  }

  // ~35 tool labels
  for (let i = 0; i < 35; i++) {
    items.push({
      type: "label",
      x: r() * 100,
      y: r() * 100,
      label: TOOL_LABELS[Math.floor(r() * TOOL_LABELS.length)],
      rot: Math.floor(r() * 40 - 20), // slight tilt only
      size: 10 + r() * 4,
    });
  }

  return items;
}

const ITEMS = makeItems();
const TORCH_RADIUS = 160;

const HeroIllustrations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elsRef = useRef<(HTMLElement | SVGSVGElement | null)[]>([]);
  const rafRef = useRef(0);
  const mx = useRef<number | null>(null);
  const my = useRef<number | null>(null);

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const hasMouse = mx.current !== null && my.current !== null;

    for (let i = 0; i < ITEMS.length; i++) {
      const el = elsRef.current[i];
      if (!el) continue;

      if (!hasMouse) {
        el.style.opacity = "0";
        continue;
      }

      const ix = (ITEMS[i].x / 100) * rect.width;
      const iy = (ITEMS[i].y / 100) * rect.height;
      const dx = mx.current! - ix;
      const dy = my.current! - iy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > TORCH_RADIUS) {
        el.style.opacity = "0";
      } else {
        const t = 1 - dist / TORCH_RADIUS;
        el.style.opacity = String((t * t * 0.5).toFixed(3));
      }
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.current = e.clientX - rect.left;
      my.current = e.clientY - rect.top;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    const onLeave = () => {
      mx.current = null;
      my.current = null;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[1] overflow-hidden"
    >
      {ITEMS.map((item, i) => {
        const base: React.CSSProperties = {
          position: "absolute",
          left: `${item.x}%`,
          top: `${item.y}%`,
          transform: `rotate(${item.rot}deg) translate(-50%, -50%)`,
          opacity: 0,
          transition: "opacity 0.18s ease-out",
          pointerEvents: "none",
        };

        if (item.type === "label") {
          return (
            <span
              key={i}
              ref={(el) => { elsRef.current[i] = el; }}
              className="font-mono-brand text-primary font-semibold select-none whitespace-nowrap"
              style={{ ...base, fontSize: item.size }}
            >
              {item.label}
            </span>
          );
        }

        const paths = ICONS[item.icon];
        return (
          <svg
            key={i}
            ref={(el) => { elsRef.current[i] = el; }}
            className="text-primary"
            style={{ ...base, width: item.size, height: item.size }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {paths.map((d, j) => <path key={j} d={d} />)}
          </svg>
        );
      })}
    </div>
  );
};

export default HeroIllustrations;
