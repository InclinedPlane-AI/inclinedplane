/**
 * Loading screen. Shown only when a page is NOT prerendered (local dev, or a
 * route the prerender didn't bake); production pages skip it entirely (see
 * the splash-skip guardrail in src/App.tsx and CLAUDE.md).
 *
 * Contract: call onComplete() once, after contentReady. App.tsx sets
 * html[data-app-ready="true"] on completion, which the prerender snapshot
 * waits for, so keep this short: it runs once per route at build time.
 *
 * Design (revamp): the current stacked logo, once, centered on white, with a
 * thin orange progress line. No duplicate/clipped logo layers.
 */
import { useEffect, useRef, useState } from "react";

interface SplashScreenProps {
  contentReady: boolean;
  onComplete: () => void;
}

const MIN_VISIBLE_MS = 450;

const SplashScreen = ({ contentReady, onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const started = useRef(Date.now());
  const done = useRef(false);
  const reduced =
    typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  // Ease toward 85% while the app loads.
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const p = Math.min((Date.now() - started.current) / 700, 1);
      setProgress((prev) => Math.max(prev, (1 - Math.pow(1 - p, 3)) * 85));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Once content is ready (and after a short minimum), fill, fade, finish.
  useEffect(() => {
    if (!contentReady || done.current) return;
    const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - started.current));
    const t1 = setTimeout(() => {
      setProgress(100);
      setLeaving(true);
    }, wait);
    const t2 = setTimeout(() => {
      done.current = true;
      onComplete();
    }, wait + (reduced ? 0 : 260));
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [contentReady, onComplete, reduced]);

  return (
    <div
      role="status"
      aria-label="Loading InclinedPlane"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-[250ms] ease-out"
      style={{ opacity: leaving ? 0 : 1 }}
    >
      <img
        src="/brand/logo-primary.png"
        alt="InclinedPlane"
        width={163}
        height={48}
        className="block h-10 w-auto select-none md:h-12"
        draggable={false}
      />
      <div aria-hidden="true" className="mt-7 h-[3px] w-[120px] overflow-hidden rounded-full bg-[#E4E4E5]">
        <div
          className="h-full bg-[#F47920] transition-[width] duration-200 ease-out"
          style={{ width: `${reduced ? 100 : progress}%` }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
