import { ReactNode, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ── Sparse orange dot grid drawn on canvas ── */
const HeroDotGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
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

      const isLight = document.documentElement.classList.contains("light");
      const color = isLight ? "25, 85%, 52%" : "25, 100%, 55%";
      const alpha = isLight ? 0.18 : 0.12;
      const spacing = 32;
      const radius = 1.6;

      ctx.clearRect(0, 0, w, h);

      for (let y = spacing / 2; y < h; y += spacing) {
        for (let x = spacing / 2; x < w; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${color}, ${alpha})`;
          ctx.fill();
        }
      }
    };

    draw();
    window.addEventListener("resize", draw);
    // Redraw on theme change
    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("resize", draw);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

/* ── PageHero wrapper ── */
interface PageHeroProps {
  label: string;
  title: ReactNode;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}

const PageHero = ({ label, title, subtitle, className = "", children }: PageHeroProps) => (
  <section className={`relative overflow-hidden pt-32 pb-16 lg:pb-20 ${className}`}>
    <HeroDotGrid />
    {/* Soft radial glow behind text */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-30"
      style={{
        background: "radial-gradient(circle, hsl(var(--orange-start) / 0.35), transparent 70%)",
      }}
    />
    <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">{label}</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-5">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
      {children}
    </div>
    {/* Bottom fade into page background */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
  </section>
);

export default PageHero;
