import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window === "undefined") return "dark";
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("light");
    } else {
      root.classList.remove("light");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  const isDark = theme === "dark";

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
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
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
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
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground"
                initial={{ opacity: 0, rotate: 60, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -60, scale: 0.6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {isDark ? "Light" : "Dark"}
      </TooltipContent>
    </Tooltip>
  );
};

export default ThemeToggle;
