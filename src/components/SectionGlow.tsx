import { motion } from "framer-motion";

interface SectionGlowProps {
  /** Position preset */
  position?: "center" | "top-left" | "top-right" | "bottom-left" | "bottom-right";
  /** Size in px */
  size?: number;
  /** Extra className */
  className?: string;
}

const positionStyles: Record<string, React.CSSProperties> = {
  center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  "top-left": { top: "-10%", left: "-10%" },
  "top-right": { top: "-10%", right: "-10%" },
  "bottom-left": { bottom: "-10%", left: "-10%" },
  "bottom-right": { bottom: "-10%", right: "-10%" },
};

const SectionGlow = ({ position = "center", size = 600, className = "" }: SectionGlowProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.3 }}
    className={`absolute pointer-events-none will-change-transform ${className}`}
    style={{
      width: size,
      height: size,
      ...positionStyles[position],
    }}
  >
    <div
      className="w-full h-full rounded-full blur-[120px]"
      style={{
        background:
          "radial-gradient(circle, hsl(var(--orange-start) / 0.10), hsl(var(--orange-mid) / 0.05), transparent 70%)",
      }}
    />
  </motion.div>
);

export default SectionGlow;
