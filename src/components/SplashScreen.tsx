import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased * 100);

      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(onComplete, 300);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      >
        {/* Logo text */}
        <div className="relative select-none">
          {/* Dim base text */}
          <span className="text-3xl md:text-5xl font-bold tracking-tight">
            <span className="text-muted-foreground/30">Inclined</span>
            <span className="text-primary/20">Plane</span>
          </span>

          {/* Bright fill text clipped by progress */}
          <span
            className="absolute inset-0 text-3xl md:text-5xl font-bold tracking-tight overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
          >
            <span className="text-foreground">Inclined</span>
            <span className="text-gradient-orange">Plane</span>
          </span>
        </div>

        {/* Bottom progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-border/30">
          <motion.div
            className="h-full bg-gradient-orange"
            style={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashScreen;
