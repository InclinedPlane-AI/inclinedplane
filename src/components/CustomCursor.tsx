import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX, y: e.clientY });
    if (!visible) setVisible(true);
  }, [visible]);

  useEffect(() => {
    // Use event delegation instead of attaching to every element
    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setHovering(true);
      }
    };
    const handleOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [data-cursor-hover]")) {
        setHovering(false);
      }
    };
    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseout", handleLeave);
    document.addEventListener("mouseover", handleOver, { passive: true });
    document.addEventListener("mouseout", handleOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseout", handleLeave);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
    };
  }, [handleMove]);

  // Hide on mobile/touch
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference will-change-transform"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500, mass: 0.5 }}
      >
        <div className="w-2 h-2 rounded-full bg-foreground" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] will-change-transform"
        animate={{
          x: pos.x - (hovering ? 24 : 16),
          y: pos.y - (hovering ? 24 : 16),
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
      >
        <div
          className={`w-full h-full rounded-full border transition-colors duration-200 ${
            hovering ? "border-primary glow-orange" : "border-muted-foreground/30"
          }`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
