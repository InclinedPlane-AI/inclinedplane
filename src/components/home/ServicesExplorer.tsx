import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SERVICE_LAYERS } from "@/data/services";
import { SERVICE_ICONS } from "@/components/serviceIcons";

/*
 * Home page services explorer: the six layers as a rising staircase you can
 * click or hover; the detail panel shows what that layer delivers and links
 * to its section on /services. Auto-advances until someone interacts.
 */
const ServicesExplorer = () => {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!auto || !inView || reduce) return;
    const t = setTimeout(() => setActive((a) => (a + 1) % SERVICE_LAYERS.length), 3200);
    return () => clearTimeout(t);
  }, [auto, inView, reduce, active]);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };
  const layer = SERVICE_LAYERS[active];
  const Icon = SERVICE_ICONS[layer.number];

  return (
    <div ref={ref} className="grid lg:grid-cols-[1fr_1fr] gap-5 lg:gap-8 items-stretch">
      {/* Staircase */}
      <div className="rounded-3xl border border-border bg-card/60 p-4 sm:p-6 flex flex-col">
        <div className="flex items-end gap-1.5 sm:gap-2.5 flex-1 min-h-[220px] sm:min-h-[260px]" role="tablist" aria-label="Service layers">
          {SERVICE_LAYERS.map((l, i) => {
            const StepIcon = SERVICE_ICONS[l.number];
            const on = active === i;
            return (
              <button
                key={l.hash}
                role="tab"
                aria-selected={on}
                onClick={() => pick(i)}
                onMouseEnter={() => pick(i)}
                style={{ "--layer": l.accent, height: `${32 + i * 13.5}%` } as React.CSSProperties}
                className={`relative flex-1 rounded-t-xl border border-b-0 text-left transition-all duration-300 overflow-hidden ${
                  on
                    ? "border-[hsl(var(--layer)/0.7)] bg-gradient-to-t from-[hsl(var(--layer)/0.15)] to-[hsl(var(--layer)/0.55)] shadow-[0_-12px_40px_-12px_hsl(var(--layer)/0.6)]"
                    : "border-[hsl(var(--layer)/0.3)] bg-gradient-to-t from-[hsl(var(--layer)/0.03)] to-[hsl(var(--layer)/0.18)] hover:to-[hsl(var(--layer)/0.3)]"
                }`}
              >
                <span className="absolute top-2 left-2 flex flex-col gap-1">
                  <StepIcon className={`w-4 h-4 ${on ? "text-foreground" : "text-[hsl(var(--layer))]"}`} />
                  <span className="font-mono text-[10px] text-foreground/80">{l.number}</span>
                </span>
              </button>
            );
          })}
        </div>
        <div className="h-px bg-border" />
        <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>Clarity</span>
          <span>Foundation → Intelligence</span>
        </div>
      </div>

      {/* Detail */}
      <div
        style={{ "--layer": layer.accent } as React.CSSProperties}
        className="relative overflow-hidden rounded-3xl border border-[hsl(var(--layer)/0.3)] bg-card/70 p-6 sm:p-8 transition-colors duration-500"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--layer)/0.14)] via-transparent to-transparent pointer-events-none transition-colors duration-500" />
        <span aria-hidden="true" className="absolute right-5 -top-3 font-mono font-bold text-[7rem] leading-none text-[hsl(var(--layer)/0.1)] select-none">
          {layer.number}
        </span>
        <AnimatePresence mode="wait">
          <motion.div
            key={layer.hash}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="w-11 h-11 rounded-2xl flex items-center justify-center bg-[hsl(var(--layer)/0.18)] border border-[hsl(var(--layer)/0.3)]">
                <Icon className="w-5 h-5 text-[hsl(var(--layer))]" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--layer))]">
                  {layer.group} · {layer.layer}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">{layer.name}</h3>
              </div>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-5">{layer.line}</p>
            <ul className="space-y-2 mb-5">
              {layer.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-sm text-foreground/90">
                  <Check className="w-4 h-4 text-[hsl(var(--layer))] shrink-0" /> {h}
                </li>
              ))}
            </ul>
            <p className="rounded-xl border border-[hsl(var(--layer)/0.25)] bg-[hsl(var(--layer)/0.08)] px-4 py-3 text-sm text-foreground mb-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[hsl(var(--layer))] block mb-0.5">Outcome</span>
              {layer.outcome}
            </p>
            <Link to={`/services#${layer.hash}`} className="inline-flex items-center gap-1.5 text-sm font-medium text-[hsl(var(--layer))] hover:underline underline-offset-4">
              Explore {layer.name} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </AnimatePresence>
        {/* progress dots */}
        <div className="relative mt-6 flex gap-1.5">
          {SERVICE_LAYERS.map((l, i) => (
            <button
              key={l.hash}
              onClick={() => pick(i)}
              aria-label={`Show ${l.name}`}
              style={{ background: i === active ? `hsl(${l.accent})` : undefined }}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6" : "w-1.5 bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesExplorer;
