import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  contentReady: boolean;
  onComplete: () => void;
}

const SplashScreen = ({ contentReady, onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Animate progress: fast to 85%, then pause until contentReady
  useEffect(() => {
    const start = Date.now();
    const fakeDuration = 1200; // ms to reach ~85%

    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / fakeDuration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = eased * 85;
      setProgress(value);

      if (p < 1) {
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  }, []);

  // When content is ready, fill to 100% and dismiss
  useEffect(() => {
    if (contentReady && progress >= 50) {
      setProgress(100);
      const timer = setTimeout(() => setDismissed(true), 400);
      return () => clearTimeout(timer);
    }
  }, [contentReady, progress]);

  useEffect(() => {
    if (dismissed) onComplete();
  }, [dismissed, onComplete]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
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
            <div
              className="h-full bg-gradient-orange transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
