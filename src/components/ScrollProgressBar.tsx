import { useState, useEffect, RefObject } from "react";

interface ScrollProgressBarProps {
  containerRef: RefObject<HTMLDivElement>;
}

const ScrollProgressBar = ({ containerRef }: ScrollProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = container;
        const maxScroll = scrollHeight - clientHeight;
        setProgress(maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0);
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef]);

  return (
    <div className="fixed top-16 left-0 right-0 z-50 h-0.5 bg-border/30 lg:hidden">
      <div
        className="h-full bg-gradient-orange transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ScrollProgressBar;
