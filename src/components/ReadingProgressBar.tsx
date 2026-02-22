import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const springProgress = useSpring(0, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const pct = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      setProgress(pct);
      springProgress.set(pct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [springProgress]);

  return (
    <div className="fixed top-16 left-0 right-0 z-50 h-0.5 bg-border/30 print:hidden">
      <motion.div
        className="h-full bg-gradient-orange"
        style={{ width: springProgress.get() + "%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      />
    </div>
  );
};

export default ReadingProgressBar;
