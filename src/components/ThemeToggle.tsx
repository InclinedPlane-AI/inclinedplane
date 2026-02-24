import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { createPortal } from "react-dom";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return "dark";
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

    const nextTheme = theme === "dark" ? "light" : "dark";

    // Enable element transitions
    document.documentElement.classList.add("theme-sweeping");

    // Show curtain sweep overlay BEFORE theme change
    setSweep({ x: 0, y: 0, target: nextTheme });

    // Delay theme change slightly so curtain leads the transition
    setTimeout(() => {
      setTheme(nextTheme);
    }, 80);

    // Clean up
    setTimeout(() => {
      setSweep(null);
      document.documentElement.classList.remove("theme-sweeping");
      cooldownRef.current = false;
    }, 1100);
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

/* ── Curtain sweep — top-to-bottom "falling curtain" transition ── */
const SweepOverlay = ({
  target,
}: {
  x: number; y: number; target: "dark" | "light";
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const pageHeight = Math.max(
      document.documentElement.scrollHeight,
      window.innerHeight
    );

    // Phase 1: curtain falls from top to bottom
    const fallAnim = el.animate(
      [
        { transform: "translateY(-100%)" },
        { transform: "translateY(0%)" },
      ],
      {
        duration: 700,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        fill: "forwards",
      }
    );

    // Phase 2: fade out after curtain covers full page
    fallAnim.onfinish = () => {
      el.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 350, easing: "ease-out", fill: "forwards" }
      );
    };
  }, []);

  const bg = target === "light"
    ? "linear-gradient(180deg, hsla(30, 20%, 96%, 0.35) 0%, hsla(25, 90%, 55%, 0.08) 30%, hsla(30, 20%, 96%, 0.25) 60%, transparent 100%)"
    : "linear-gradient(180deg, hsla(240, 18%, 4.5%, 0.4) 0%, hsla(25, 100%, 50%, 0.08) 30%, hsla(240, 18%, 4.5%, 0.3) 60%, transparent 100%)";

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: bg,
        transform: "translateY(-100%)",
        pointerEvents: "none",
        backdropFilter: "blur(2px)",
        WebkitBackdropFilter: "blur(2px)",
      }}
    />
  );
};

export default ThemeToggle;
