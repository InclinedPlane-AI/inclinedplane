import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const over = () => {
      const hoverEls = document.querySelectorAll("a, button, [data-cursor-hover]");
      hoverEls.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };
    const leave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseout", leave);
    document.addEventListener("DOMContentLoaded", over);
    
    // Run immediately too
    over();
    const observer = new MutationObserver(over);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseout", leave);
      observer.disconnect();
    };
  }, []);

  // Hide on mobile/touch
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 500 }}
      >
        <div className="w-2 h-2 rounded-full bg-foreground" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: pos.x - (hovering ? 24 : 16),
          y: pos.y - (hovering ? 24 : 16),
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          opacity: visible ? 1 : 0,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        <div
          className={`w-full h-full rounded-full border transition-colors duration-300 ${
            hovering ? "border-primary glow-orange" : "border-muted-foreground/30"
          }`}
        />
      </motion.div>
    </>
  );
};

export default CustomCursor;
