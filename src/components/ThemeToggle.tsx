import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { createPortal } from "react-dom";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return "light";
  });
  const [sweep, setSweep] = useState<{ x: number; y: number; target: "dark" | "light" } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const cooldownRef = useRef(false);

  // Apply theme class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => {
    const btn = btnRef.current;
    if (!btn || cooldownRef.current) return;
    cooldownRef.current = true;

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextTheme = theme === "dark" ? "light" : "dark";

    // Set CSS custom properties for transition-delay calculation
    document.documentElement.style.setProperty("--sweep-x", `${x}px`);
    document.documentElement.style.setProperty("--sweep-y", `${y}px`);

    // Enable element transitions
    document.documentElement.classList.add("theme-sweeping");

    // Apply theme change IMMEDIATELY so elements start transitioning
    setTheme(nextTheme);

    // Show translucent sweep overlay for directional feel
    setSweep({ x, y, target: nextTheme });

    // Clean up
    setTimeout(() => {
      setSweep(null);
      document.documentElement.classList.remove("theme-sweeping");
      cooldownRef.current = false;
    }, 900);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.button
            ref={btnRef}
            onClick={toggle}
            data-cursor-hover
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="relative w-9 h-9 rounded-full glass-panel flex items-center justify-center
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
              hover:border-primary/40 group"
            whileTap={{ scale: 0.88 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
          >
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/0 group-hover:border-primary/30"
              style={{ transition: "border-color 200ms ease" }}
            />

            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.svg
                  key="moon"
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-foreground"
                  initial={{ opacity: 0, rotate: -60, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 60, scale: 0.6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="sun"
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="text-foreground"
                  initial={{ opacity: 0, rotate: 60, scale: 0.6 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -60, scale: 0.6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" /><path d="M12 20v2" />
                  <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
                  <path d="M2 12h2" /><path d="M20 12h2" />
                  <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
                </motion.svg>
              )}
            </AnimatePresence>
          </motion.button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs">
          {isDark ? "Light" : "Dark"}
        </TooltipContent>
      </Tooltip>

      {/* Translucent sweep overlay */}
      {sweep &&
        createPortal(
          <SweepOverlay x={sweep.x} y={sweep.y} target={sweep.target} />,
          document.body
        )}
    </>
  );
};

/* ── Translucent sweep — adds directional "flow" while real elements transition underneath ── */
const SweepOverlay = ({
  x, y, target,
}: {
  x: number; y: number; target: "dark" | "light";
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const maxRadius = Math.ceil(
      Math.sqrt(
        Math.max(x, window.innerWidth - x) ** 2 +
        Math.max(y, window.innerHeight - y) ** 2
      )
    ) + 100;

    // Phase 1: expand the translucent sweep
    const expandAnim = el.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 1 },
        { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`, opacity: 1 },
      ],
      {
        duration: 650,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );

    // Phase 2: fade out once expanded
    expandAnim.onfinish = () => {
      el.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 250, easing: "ease-out", fill: "forwards" }
      );
    };
  }, [x, y]);

  // Semi-transparent tinted overlay — NOT opaque
  const bg = target === "light"
    ? "radial-gradient(circle at 50% 50%, hsla(25, 90%, 55%, 0.12) 0%, hsla(30, 20%, 96%, 0.18) 40%, transparent 80%)"
    : "radial-gradient(circle at 50% 50%, hsla(25, 100%, 50%, 0.12) 0%, hsla(240, 18%, 4.5%, 0.18) 40%, transparent 80%)";

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: bg,
        clipPath: `circle(0px at ${x}px ${y}px)`,
        pointerEvents: "none",
        backdropFilter: "blur(1px)",
        WebkitBackdropFilter: "blur(1px)",
      }}
    />
  );
};

export default ThemeToggle;
