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
  const [wipe, setWipe] = useState<{ x: number; y: number; target: "dark" | "light" } | null>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  // Apply theme class (no transition class needed — the wipe handles it)
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
    if (!btn || wipe) return; // prevent double-click during animation

    const rect = btn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextTheme = theme === "dark" ? "light" : "dark";

    // Start wipe overlay
    setWipe({ x, y, target: nextTheme });

    // Halfway through the animation, swap the real theme
    setTimeout(() => {
      setTheme(nextTheme);
    }, 420);

    // Remove wipe overlay after animation completes
    setTimeout(() => {
      setWipe(null);
    }, 850);
  }, [theme, wipe]);

  const isDark = theme === "dark";

  // Calculate max radius needed to cover the entire viewport from the origin point
  const maxRadius = wipe
    ? Math.ceil(
        Math.sqrt(
          Math.max(wipe.x, window.innerWidth - wipe.x) ** 2 +
          Math.max(wipe.y, window.innerHeight - wipe.y) ** 2
        )
      ) + 50
    : 0;

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
            {/* Orange accent ring on hover */}
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

      {/* Wipe overlay — portal to body */}
      {wipe &&
        createPortal(
          <WipeOverlay x={wipe.x} y={wipe.y} maxRadius={maxRadius} target={wipe.target} />,
          document.body
        )}
    </>
  );
};

/* ── Wipe circle overlay ── */
const WipeOverlay = ({
  x, y, maxRadius, target,
}: {
  x: number; y: number; maxRadius: number; target: "dark" | "light";
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Force reflow before starting animation
    el.getBoundingClientRect();

    // Animate clip-path
    el.animate(
      [
        { clipPath: `circle(0px at ${x}px ${y}px)` },
        { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
      ],
      {
        duration: 750,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
      }
    );
  }, [x, y, maxRadius]);

  // The overlay shows the TARGET theme's background color
  const bg = target === "light"
    ? "hsl(30 20% 96%)"   // light --background
    : "hsl(240 18% 4.5%)"; // dark --background

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: bg,
        clipPath: `circle(0px at ${x}px ${y}px)`,
        pointerEvents: "none",
      }}
    />
  );
};

export default ThemeToggle;
