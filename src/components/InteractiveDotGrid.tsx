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
  brightness: number;
}

const isMobile = () =>
  typeof window !== "undefined" &&
  (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768);

const InteractiveDotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const initializedRef = useRef(false);

  const initDots = useCallback((width: number, height: number) => {
    const mobile = isMobile();
    const spacing = mobile ? 28 : DOT_SPACING;
    const dots: Dot[] = [];
    const cols = Math.ceil(width / spacing) + 1;
    const rows = Math.ceil(height / spacing) + 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({ x: c * spacing, y: r * spacing, brightness: 0 });
      }
    }
    dotsRef.current = dots;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const mobile = isMobile();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = mobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
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

    // On mobile: draw once statically, no animation loop
    if (mobile) {
      const drawStatic = () => {
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        const isLight = document.documentElement.classList.contains("light");
        const color = isLight ? "25, 95%, 48%" : "25, 100%, 50%";
        const baseA = isLight ? 0.1 : BASE_ALPHA;
        const dots = dotsRef.current;
        for (let i = 0; i < dots.length; i++) {
          ctx.beginPath();
          ctx.arc(dots[i].x, dots[i].y, DOT_BASE_RADIUS, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${color}, ${baseA})`;
          ctx.fill();
        }
      };
      drawStatic();
      const observer = new MutationObserver(() => { resize(); drawStatic(); });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
      return () => {
        window.removeEventListener("resize", resize);
        observer.disconnect();
      };
    }

    // Desktop: full interactive animation
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", handleMouseMove, { passive: true });
    canvas.addEventListener("mouseleave", handleMouseLeave);

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

      // Batch base dots in one path, glowing dots separately
      const basePath = new Path2D();
      const glowDots: { x: number; y: number; alpha: number; radius: number }[] = [];

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const distSq = dx * dx + dy * dy;
        if (distSq < CURSOR_RADIUS * CURSOR_RADIUS) {
          const dist = Math.sqrt(distSq);
          const intensity = 1 - dist / CURSOR_RADIUS;
          const target = intensity * intensity;
          if (target > dot.brightness) dot.brightness = target;
        }
        if (dot.brightness > 0) dot.brightness = Math.max(0, dot.brightness - FADE_SPEED);

        if (dot.brightness > 0.01) {
          const alpha = baseA + dot.brightness * (GLOW_ALPHA - baseA);
          const radius = DOT_BASE_RADIUS + dot.brightness * (DOT_GLOW_RADIUS - DOT_BASE_RADIUS);
          glowDots.push({ x: dot.x, y: dot.y, alpha, radius });
        } else {
          basePath.arc(dot.x, dot.y, DOT_BASE_RADIUS, 0, Math.PI * 2);
          basePath.closePath();
        }
      }

      // Single fill call for all base dots
      ctx.fillStyle = `hsla(${color}, ${baseA})`;
      ctx.fill(basePath);

      // Only individually draw glowing dots (usually <50)
      for (let i = 0; i < glowDots.length; i++) {
        const d = glowDots[i];
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${color}, ${d.alpha})`;
        ctx.fill();
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
