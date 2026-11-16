import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import SectionGlow from "@/components/SectionGlow";
import { PRODUCTS, ProductId } from "@/data/products";
import { PRODUCT_ICONS } from "./icons";
import { RequestDemoButton } from "./RequestDemo";

/** Sticky product bar under the main navbar: section anchors + demo button. */
export const ProductSubnav = ({ product, sections }: { product: ProductId; sections: { id: string; label: string }[] }) => {
  const [active, setActive] = useState<string | null>(null);
  const p = PRODUCTS.find((x) => x.id === product)!;
  const Icon = PRODUCT_ICONS[product];

  useEffect(() => {
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sections]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
  };

  return (
    <div className="sticky top-16 z-30 border-b border-border glass-panel-strong">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 h-12 flex items-center gap-4">
        <span className="flex items-center gap-2 shrink-0">
          <Icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-bold text-foreground">{p.name}</span>
        </span>
        <nav className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide" aria-label={`${p.name} sections`}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => go(s.id)}
              className={`relative px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                active === s.id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === s.id && <motion.span layoutId={`subnav-${product}`} className="absolute inset-0 rounded-md bg-primary/10" />}
              <span className="relative">{s.label}</span>
            </button>
          ))}
        </nav>
        <div className="ml-auto">
          <RequestDemoButton products={[product]} className="!px-3.5 !py-1.5 !text-xs">
            Request a demo
          </RequestDemoButton>
        </div>
      </div>
    </div>
  );
};

/** "Built for" strip used in each product hero. */
export const AudienceStrip = ({ product }: { product: ProductId }) => {
  const p = PRODUCTS.find((x) => x.id === product)!;
  return (
    <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 mb-8">
      <p className="flex items-center gap-2 text-sm font-semibold text-foreground mb-1">
        <Users className="w-4 h-4 text-primary" /> {p.audience.replace(/^For /, "Built for ")}
      </p>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">{p.audienceNote}</p>
      <div className="flex flex-wrap gap-1.5">
        {p.roles.map((r) => (
          <span key={r} className="px-2.5 py-1 rounded-full bg-background/70 border border-border text-[11px] text-foreground/90">
            {r}
          </span>
        ))}
      </div>
    </div>
  );
};

/** Closing call to action shared by both product pages. */
export const ProductCTA = ({ product, title, body }: { product: ProductId; title: React.ReactNode; body: string }) => {
  const other = PRODUCTS.find((x) => x.id !== product)!;
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <SectionGlow position="center" size={600} />
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-panel rounded-3xl p-8 sm:p-12 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">{title}</h2>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">{body}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <RequestDemoButton products={[product]} />
            <Link
              to={other.path}
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-lg text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
            >
              Also see {other.name} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/** Two-or-more column comparison with an emphasised final column. */
export type Mark = "yes" | "partial" | "no";
export const ComparisonTable = ({
  columns,
  rows,
}: {
  columns: string[];
  rows: { label: string; values: (Mark | string)[] }[];
}) => {
  const mark = (v: Mark | string, highlight: boolean) => {
    if (v === "yes") return <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${highlight ? "bg-primary text-primary-foreground" : "bg-emerald-500/15 text-emerald-500"}`}>✓</span>;
    if (v === "partial") return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">~</span>;
    if (v === "no") return <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-muted text-muted-foreground">✕</span>;
    return <span className={`text-xs sm:text-sm leading-relaxed ${highlight ? "text-foreground" : "text-muted-foreground"}`}>{v}</span>;
  };
  const last = columns.length - 1;
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[560px] text-left">
        <thead>
          <tr className="border-b border-border">
            <th className="p-4 w-[34%]" />
            {columns.map((c, i) => (
              <th key={c} className={`p-4 text-xs sm:text-sm font-semibold ${i === last ? "text-primary bg-primary/5" : "text-muted-foreground"}`}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, ri) => (
            <motion.tr
              key={r.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: ri * 0.06 }}
              className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
            >
              <td className="p-4 text-sm font-medium text-foreground">{r.label}</td>
              {r.values.map((v, i) => (
                <td key={i} className={`p-4 align-middle ${i === last ? "bg-primary/5" : ""}`}>
                  {mark(v, i === last)}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
