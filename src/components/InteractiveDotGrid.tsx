import { useEffect, useRef, useCallback } from "react";

const DOT_SPACING = 18;
const DOT_BASE_RADIUS = 1;
const DOT_GLOW_RADIUS = 2.2;
const CURSOR_RADIUS = 120;
const FADE_SPEED = 0.012;
const BASE_ALPHA = 0.08;
const GLOW_ALPHA = 0.45;

interface Dot {
  x: number;
  y: number;
  brightness: number; // 0 = dim, 1 = full glow
}

const InteractiveDotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const initializedRef = useRef(false);

  const initDots = useCallback((width: number, height: number) => {
    const dots: Dot[] = [];
    const cols = Math.ceil(width / DOT_SPACING) + 1;
    const rows = Math.ceil(height / DOT_SPACING) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ x: c * DOT_SPACING, y: r * DOT_SPACING, brightness: 0 });
      }
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initDots(w, h);
      initializedRef.current = true;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Check theme
    const getColor = () => {
      const isLight = document.documentElement.classList.contains("light");
      return isLight ? "25, 95%, 48%" : "25, 100%, 50%";
    };

    const draw = () => {
      if (!initializedRef.current) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const dots = dotsRef.current;
      const color = getColor();
      const isLight = document.documentElement.classList.contains("light");
      const baseA = isLight ? 0.1 : BASE_ALPHA;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CURSOR_RADIUS) {
          const intensity = 1 - dist / CURSOR_RADIUS;
          const target = intensity * intensity; // easeIn curve
          if (target > dot.brightness) {
            dot.brightness = target;
          }
        }

        // Fade out smoothly
        if (dot.brightness > 0) {
          dot.brightness = Math.max(0, dot.brightness - FADE_SPEED);
        }

        const alpha = baseA + dot.brightness * (GLOW_ALPHA - baseA);
        const radius = DOT_BASE_RADIUS + dot.brightness * (DOT_GLOW_RADIUS - DOT_BASE_RADIUS);

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color}, ${alpha})`;
        ctx.fill();

        // No outer glow layer
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [initDots]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto z-0"
      style={{ opacity: 1 }}
    />
  );
};

export default InteractiveDotGrid;
