import { useEffect, useState } from "react";

export interface SectionNavItem {
  id: string;
  label: string;
}

interface SectionNavProps {
  items: SectionNavItem[];
}

const SectionNav = ({ items }: SectionNavProps) => {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-30 backdrop-blur-xl bg-background/75 border-y border-border/40">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
        {items.map((it, i) => {
          const isActive = active === it.id;
          return (
            <a
              key={it.id}
              href={`#${it.id}`}
              onClick={(e) => handleClick(e, it.id)}
              data-cursor-hover
              className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all border ${
                isActive
                  ? "bg-gradient-orange text-primary-foreground border-transparent glow-orange"
                  : "border-border/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
              }`}
            >
              <span className="font-mono text-[10px] opacity-70">
                {String(i + 1).padStart(2, "0")}
              </span>
              {it.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default SectionNav;