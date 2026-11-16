import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Users } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { PRODUCT_ICONS } from "@/components/products/icons";
import { RequestDemoButton } from "@/components/products/RequestDemo";

/*
 * Home page products slide: one card per product with its audience and a
 * tiny looping preview of the core idea. Previews are illustrative.
 */

const PIQ_STEPS = [
  { n: "565", label: "failures across three tools", w: 100 },
  { n: "394", label: "root causes, cascades hidden", w: 70 },
  { n: "29", label: "error signatures to fix", w: 12 },
];

const PipelinePreview = ({ run }: { run: boolean }) => {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!run || reduce) return;
    const t = setTimeout(() => setStep((s) => (s + 1) % PIQ_STEPS.length), step === 2 ? 2600 : 1600);
    return () => clearTimeout(t);
  }, [run, step, reduce]);
  const s = PIQ_STEPS[reduce ? 2 : step];
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="flex items-baseline gap-2 mb-3">
        <motion.span key={s.n} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-bold text-gradient-orange tabular-nums">
          {s.n}
        </motion.span>
        <span className="text-xs text-muted-foreground">{s.label}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div className="h-full rounded-full bg-gradient-orange" animate={{ width: `${s.w}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
      </div>
      <div className="mt-3 flex gap-1.5">
        {PIQ_STEPS.map((x, i) => (
          <span key={x.n} className={`h-1 flex-1 rounded-full ${i <= step ? "bg-primary" : "bg-muted"}`} />
        ))}
      </div>
    </div>
  );
};

const GATES = ["Entitlement", "Answerability", "Assurance"];

const IncleverPreview = ({ run }: { run: boolean }) => {
  const [t, setT] = useState(0); // 0 question, 1-3 gates, 4 answer
  const reduce = useReducedMotion();
  useEffect(() => {
    if (!run || reduce) return;
    const id = setTimeout(() => setT((v) => (v + 1) % 6), t === 4 ? 2600 : t === 5 ? 300 : 700);
    return () => clearTimeout(id);
  }, [run, t, reduce]);
  const v = reduce ? 4 : Math.min(t, 4);
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4 space-y-2.5">
      <p className="ml-auto w-fit max-w-[90%] rounded-xl rounded-br-sm bg-primary text-primary-foreground px-3 py-1.5 text-xs">How did we do on margin last month?</p>
      <div className="flex flex-wrap gap-1.5">
        {GATES.map((g, i) => (
          <span
            key={g}
            className={`inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-medium transition-colors duration-300 ${
              v > i ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-500" : "border-border text-muted-foreground"
            }`}
          >
            {v > i ? <Check className="w-3 h-3" /> : <span className="h-1.5 w-1.5 rounded-full bg-current opacity-50" />} {g}
          </span>
        ))}
      </div>
      <AnimatePresence>
        {v >= 4 && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="w-fit rounded-xl rounded-bl-sm border border-emerald-500/40 bg-emerald-500/5 px-3 py-1.5 text-xs text-foreground"
          >
            <span className="font-semibold">38.4%</span> gross margin · vouched for by the latest audit
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProductsShowcase = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <div ref={ref} className="grid md:grid-cols-2 gap-5 lg:gap-6">
      {PRODUCTS.map((p, i) => {
        const Icon = PRODUCT_ICONS[p.id];
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card/70 p-5 sm:p-7 flex flex-col hover:border-primary/40 transition-colors"
          >
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-orange opacity-[0.08] blur-3xl group-hover:opacity-20 transition-opacity" />
            <div className="relative flex items-center gap-3 mb-4">
              <span className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </span>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-primary">{p.kicker}</p>
                <h3 className="text-xl font-bold text-foreground">{p.name}</h3>
              </div>
              <span className="ml-auto hidden sm:inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-foreground/80">
                <Users className="w-3 h-3" /> {p.audience.replace(/^For /, "")}
              </span>
            </div>
            <p className="relative text-base font-semibold text-foreground mb-1.5">{p.tagline}</p>
            <p className="relative text-sm text-muted-foreground leading-relaxed mb-5">{p.brief}</p>
            <div className="relative mb-6">{p.id === "pipelineiq" ? <PipelinePreview run={inView} /> : <IncleverPreview run={inView} />}</div>
            <div className="relative mt-auto flex flex-wrap gap-3">
              <Link
                to={p.path}
                className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Explore {p.name} <ArrowRight className="w-4 h-4" />
              </Link>
              <RequestDemoButton products={[p.id]} variant="ghost" className="!px-5 !py-2.5">
                Request a demo
              </RequestDemoButton>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductsShowcase;
