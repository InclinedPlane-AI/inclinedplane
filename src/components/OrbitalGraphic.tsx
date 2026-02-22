import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Cloud, Eye, BarChart3, Zap, Brain } from "lucide-react";

const NODES = [
  {
    label: "Ingest",
    icon: Database,
    desc: "Enterprise-grade data pipelines that unify disparate sources into a single, real-time stream.",
  },
  {
    label: "Model",
    icon: Cloud,
    desc: "Cloud-native warehousing on AWS, Azure, or Snowflake optimized for heavy-compute AI workloads.",
  },
  {
    label: "Observe",
    icon: Eye,
    desc: "Full-stack observability covering pipeline health, data quality, and model drift detection.",
  },
  {
    label: "Predict",
    icon: BarChart3,
    desc: "ML-powered forecasting for demand, risk, and growth — turning 'what if' into 'what's next.'",
  },
  {
    label: "Automate",
    icon: Zap,
    desc: "Agentic AI systems that execute multi-step workflows and interact with enterprise tools autonomously.",
  },
];

const RADIUS = 130;
const ROTATION_SPEED = 0.003;

const OrbitalGraphic = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centerHovered, setCenterHovered] = useState(false);
  const angleRef = useRef(0);
  const rafRef = useRef<number>(0);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const isPausedRef = useRef(false);

  // Keep isPausedRef in sync
  useEffect(() => {
    isPausedRef.current = hoveredIndex !== null;
  }, [hoveredIndex]);

  // Single rAF loop that writes directly to DOM — zero React re-renders
  useEffect(() => {
    const animate = () => {
      if (!isPausedRef.current) {
        angleRef.current += ROTATION_SPEED;
      }

      const positions: { x: number; y: number }[] = [];
      for (let i = 0; i < NODES.length; i++) {
        const baseAngle = (i / NODES.length) * Math.PI * 2;
        const angle = baseAngle + angleRef.current;
        const x = Math.cos(angle) * RADIUS;
        const y = Math.sin(angle) * RADIUS;
        positions.push({ x, y });

        // Direct DOM write for node position
        const el = nodeRefs.current[i];
        if (el) {
          el.style.left = `calc(50% + ${x}px)`;
          el.style.top = `calc(50% + ${y}px)`;
        }
      }

      // Direct DOM write for SVG lines
      for (let i = 0; i < NODES.length; i++) {
        const next = (i + 1) % NODES.length;
        const line = lineRefs.current[i];
        if (line) {
          line.setAttribute("x1", String(positions[i].x));
          line.setAttribute("y1", String(positions[i].y));
          line.setAttribute("x2", String(positions[next].x));
          line.setAttribute("y2", String(positions[next].y));
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div className="relative w-80 h-80 pointer-events-none">
      {/* Glow behind center */}
      <div className="absolute inset-[25%] rounded-full bg-gradient-orange opacity-[0.025] blur-3xl animate-pulse-glow will-change-[opacity]" />

      {/* Orbit rings */}
      <div className="absolute inset-[5%] rounded-full border border-muted/10" />
      <div className="absolute inset-[15%] rounded-full border border-muted/20" />

      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="-160 -160 320 320">
        {NODES.map((_, i) => (
          <line
            key={i}
            ref={(el) => { lineRefs.current[i] = el; }}
            x1="0" y1="0" x2="0" y2="0"
            stroke={centerHovered ? "hsl(var(--primary) / 0.45)" : "hsl(var(--primary) / 0.15)"}
            strokeWidth={centerHovered ? "1.5" : "1"}
            strokeDasharray="4 4"
            style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
          />
        ))}
      </svg>

      {/* Center node */}
      <motion.div
        className="absolute inset-[35%] rounded-full glass-panel-strong flex items-center justify-center z-10 cursor-default pointer-events-auto"
        animate={{
          boxShadow: centerHovered
            ? "0 0 12px hsl(25 100% 50% / 0.12), 0 0 24px hsl(25 100% 50% / 0.06)"
            : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setCenterHovered(true)}
        onMouseLeave={() => setCenterHovered(false)}
        data-cursor-hover
      >
        <Brain className="text-primary" size={28} />
      </motion.div>

      {/* Orbiting nodes — positioned via direct DOM writes, not React state */}
      {NODES.map(({ label, icon: Icon, desc }, i) => {
        const isHovered = hoveredIndex === i;

        return (
          <div
            key={label}
            ref={(el) => { nodeRefs.current[i] = el; }}
            className="absolute pointer-events-auto"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: isHovered ? 40 : 20,
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            data-cursor-hover
          >
            <motion.div
              className={`glass-panel rounded-xl px-3 py-2 flex items-center gap-2 text-xs cursor-default select-none transition-all duration-300 ${
                isHovered ? "border-primary/60" : ""
              } ${centerHovered && !isHovered ? "border-primary/40" : ""}`}
              animate={{
                scale: isHovered ? 1.12 : centerHovered ? 1.06 : 1,
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Icon size={14} className="shrink-0 text-primary" />
              <span className={`whitespace-nowrap transition-colors duration-300 ${centerHovered ? "text-foreground" : "text-secondary-foreground"}`}>{label}</span>
            </motion.div>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-52 glass-panel-strong rounded-lg p-3 text-xs text-muted-foreground leading-relaxed pointer-events-none"
                  style={{ zIndex: 50 }}
                >
                  <span className="text-foreground font-semibold block mb-1">{label}</span>
                  {desc}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default OrbitalGraphic;
