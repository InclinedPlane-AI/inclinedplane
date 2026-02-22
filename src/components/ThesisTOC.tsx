import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TOCSection {
  id: string;
  label: string;
  number: string;
}

const sections: TOCSection[] = [
  { id: "the-problem", label: "The Problem", number: "01" },
  { id: "data-maturity", label: "Data Maturity", number: "02" },
  { id: "the-architecture", label: "The Architecture", number: "03" },
  { id: "analytics-bi", label: "Analytics & BI", number: "04" },
  { id: "ai-revolution", label: "The AI Revolution", number: "05" },
  { id: "enterprise-principles", label: "Enterprise Principles", number: "06" },
  { id: "automation", label: "Automation", number: "07" },
  { id: "why-inclinedplane", label: "Why InclinedPlane", number: "08" },
];

const ThesisTOC = () => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry most visible in viewport
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5] }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="hidden xl:block fixed top-1/2 -translate-y-1/2 right-6 2xl:right-10 z-40 print:hidden">
      <div className="glass-panel rounded-xl p-3 space-y-1 min-w-[170px]">
        <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 px-2 pb-1.5 mb-1 border-b border-border/20">
          Contents
        </p>
        {sections.map((s) => {
          const isActive = activeId === s.id;
          return (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                "w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-left transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/30"
              )}
              data-cursor-hover
            >
              <span className={cn(
                "font-mono text-[9px] w-4 shrink-0 transition-colors",
                isActive ? "text-primary" : "text-muted-foreground/30"
              )}>
                {s.number}
              </span>
              <span className="text-[11px] font-medium truncate">{s.label}</span>
              {isActive && (
                <motion.div
                  layoutId="toc-indicator"
                  className="ml-auto w-1 h-1 rounded-full bg-primary shrink-0"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ThesisTOC;
