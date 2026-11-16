import { ReactNode } from "react";
import { motion } from "framer-motion";

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
} as const;

export const Eyebrow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <p className={`font-mono text-[11px] text-primary tracking-[0.25em] uppercase mb-3 ${className}`}>{children}</p>
);

export const SectionHeading = ({
  eyebrow,
  title,
  intro,
  center = false,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  center?: boolean;
}) => (
  <motion.div {...fadeUp} className={`mb-10 sm:mb-12 ${center ? "text-center mx-auto" : ""} max-w-3xl`}>
    <Eyebrow>{eyebrow}</Eyebrow>
    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight mb-4">
      {title}
    </h3>
    {intro && <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">{intro}</p>}
  </motion.div>
);

/** Small "Illustrative" tag so demo widgets are never mistaken for live data. */
export const DemoTag = ({ label = "Interactive demo · illustrative data" }: { label?: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
    {label}
  </span>
);
