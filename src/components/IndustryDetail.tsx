import { motion } from "framer-motion";
import {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
  ChevronRight, X, Cpu, BarChart3, Target, Layers, ArrowUpRight
} from "lucide-react";
import { IndustryData } from "@/data/industries";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const iconMap: Record<string, React.ElementType> = {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
};

interface Props {
  industry: IndustryData | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const IndustryDetail = ({ industry, open, onOpenChange }: Props) => {
  if (!industry) return null;
  const Icon = iconMap[industry.icon] || Layers;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden border-border/50 bg-background">
        <DialogDescription className="sr-only">
          Detailed overview of {industry.name} industry capabilities
        </DialogDescription>

        {/* Hero banner */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <img
            src={industry.image}
            alt={industry.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `hsl(${industry.color} / 0.15)` }}
              >
                <Icon className="w-5 h-5" style={{ color: `hsl(${industry.color})` }} />
              </div>
              <DialogHeader className="p-0 space-y-0 text-left">
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                  {industry.name}
                </DialogTitle>
              </DialogHeader>
            </div>
          </div>
          <DialogClose className="absolute top-4 right-4 w-8 h-8 rounded-full glass-panel flex items-center justify-center">
            <X className="w-4 h-4" />
          </DialogClose>
        </div>

        <ScrollArea className="max-h-[calc(90vh-14rem)]">
          <div className="p-6 sm:p-8 space-y-10">

            {/* Overview */}
            <section>
              <p className="text-muted-foreground leading-relaxed text-[15px]">
                {industry.overview}
              </p>
            </section>

            {/* Impact Metrics */}
            <section>
              <SectionHeading icon={BarChart3} title="Impact Metrics" color={industry.color} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                {industry.impactMetrics.map((m) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel rounded-xl p-4 text-center"
                  >
                    <p className="text-xl sm:text-2xl font-bold text-gradient-orange">{m.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-tight">{m.label}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Use Cases */}
            <section>
              <SectionHeading icon={Target} title="Use Cases" color={industry.color} />
              <div className="grid sm:grid-cols-2 gap-3 mt-4">
                {industry.useCases.map((uc, i) => (
                  <motion.div
                    key={uc.title}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-panel rounded-xl p-5 group"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className="mt-1 w-2 h-2 rounded-full shrink-0"
                        style={{ background: `hsl(${industry.color})` }}
                      />
                      <div>
                        <h4 className="font-semibold text-foreground text-sm mb-1">{uc.title}</h4>
                        <p className="text-xs text-muted-foreground leading-relaxed">{uc.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* What We Do & How We Do It */}
            <div className="grid lg:grid-cols-2 gap-6">
              <section>
                <SectionHeading icon={Layers} title="What We Do" color={industry.color} />
                <ul className="mt-4 space-y-3">
                  {industry.whatWeDo.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <SectionHeading icon={Cpu} title="How We Do It" color={industry.color} />
                <ul className="mt-4 space-y-3">
                  {industry.howWeDoIt.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Tech Stack */}
            <section>
              <SectionHeading icon={Cpu} title="Technology Stack" color={industry.color} />
              <div className="flex flex-wrap gap-2 mt-4">
                {industry.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-full text-xs font-mono font-medium surface-2 text-secondary-foreground border border-border/50"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </section>

            {/* Market Insight */}
            <section>
              <SectionHeading icon={ArrowUpRight} title="Market Intelligence" color={industry.color} />
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                {industry.marketInsight.map((m) => (
                  <div key={m.label} className="surface-2 rounded-xl p-4 border border-border/30">
                    <p className="text-lg font-bold text-foreground">{m.stat}</p>
                    <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

const SectionHeading = ({ icon: Icon, title, color }: { icon: React.ElementType; title: string; color: string }) => (
  <div className="flex items-center gap-2">
    <div
      className="w-7 h-7 rounded-md flex items-center justify-center"
      style={{ background: `hsl(${color} / 0.1)` }}
    >
      <Icon className="w-3.5 h-3.5" style={{ color: `hsl(${color})` }} />
    </div>
    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider">{title}</h3>
  </div>
);

export default IndustryDetail;
