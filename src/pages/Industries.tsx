import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import IndustryDetail from "@/components/IndustryDetail";
import { motion } from "framer-motion";
import { useState } from "react";
import { industries } from "@/data/industries";
import {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
  ArrowRight, Layers
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
};

const Industries = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const activeIndustry = industries.find((i) => i.id === selected) ?? null;

  return (
    <PageLayout>
      <PageHero
        label="Industries"
        title={<>Built for <span className="text-gradient-orange">Your Domain.</span></>}
        subtitle="Deep vertical expertise meets world-class data engineering. We don't just understand your data — we understand your business."
      />

      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Industry Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => {
              const Icon = iconMap[ind.icon] || Layers;
              return (
                <motion.button
                  key={ind.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => setSelected(ind.id)}
                  data-cursor-hover
                  className="group relative glass-panel rounded-xl overflow-hidden text-left transition-all hover:scale-[1.02] hover:glow-orange"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={ind.image}
                      alt={ind.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div
                      className="absolute top-3 left-3 w-9 h-9 rounded-lg flex items-center justify-center glass-panel"
                      style={{ borderColor: `hsl(${ind.color} / 0.3)` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: `hsl(${ind.color})` }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-foreground text-base mb-2 group-hover:text-primary transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-4">
                      {ind.tagline}
                    </p>

                    {/* Quick stats preview */}
                    <div className="flex items-center gap-4 mb-3">
                      {ind.impactMetrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="text-center">
                          <p className="text-sm font-bold text-gradient-orange">{m.value}</p>
                          <p className="text-[10px] text-muted-foreground leading-tight">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Use case pills */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {ind.useCases.slice(0, 3).map((uc) => (
                        <span key={uc.title} className="px-2 py-0.5 rounded-full text-[10px] surface-2 text-secondary-foreground border border-border/30">
                          {uc.title}
                        </span>
                      ))}
                      {ind.useCases.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] text-muted-foreground">
                          +{ind.useCases.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <IndustryDetail
        industry={activeIndustry}
        open={!!selected}
        onOpenChange={(v) => !v && setSelected(null)}
      />
    </PageLayout>
  );
};

export default Industries;
