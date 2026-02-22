import { motion } from "framer-motion";
import {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
  ChevronRight, X, Cpu, BarChart3, Target, Layers, ArrowUpRight, BookOpen, Rocket, ExternalLink
} from "lucide-react";
import { IndustryData } from "@/data/industries";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  ShoppingCart, TrendingUp, Cloud, Heart, Factory, Zap, Headphones, GraduationCap,
  BarChart3, Target, ArrowUpRight, Rocket,
};

interface Props {
  industry: IndustryData | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const IndustryDetail = ({ industry, open, onOpenChange }: Props) => {
  const navigate = useNavigate();
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
              <div className="grid grid-cols-3 gap-3 mt-4">
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

            {/* Research & References */}
            <section>
              <SectionHeading icon={BookOpen} title="Why Data & AI Matter Here" color={industry.color} />
              <div className="mt-4 space-y-4">
                {industry.references.map((ref, i) => (
                  <motion.div
                    key={ref.title}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-panel rounded-xl p-5 border-l-2"
                    style={{ borderLeftColor: `hsl(${industry.color})` }}
                  >
                    <p className="text-sm text-foreground leading-relaxed italic mb-3">
                      "{ref.insight}"
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-foreground">{ref.title}</p>
                        <p className="text-[11px] text-muted-foreground">{ref.source}</p>
                      </div>
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-primary hover:underline shrink-0"
                      >
                        Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Next Steps */}
            <section>
              <SectionHeading icon={Rocket} title="Your Next Steps" color={industry.color} />
              <div className="grid sm:grid-cols-3 gap-3 mt-4">
                {industry.nextSteps.map((step, i) => {
                  const StepIcon = iconMap[step.icon] || ArrowUpRight;
                  const isLast = i === industry.nextSteps.length - 1;
                  return (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={isLast ? () => { onOpenChange(false); navigate("/contact"); } : undefined}
                      className={`rounded-xl p-5 border transition-all ${
                        isLast
                          ? "cursor-pointer border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60"
                          : "glass-panel border-border/30"
                      }`}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                        style={{ background: `hsl(${industry.color} / 0.1)` }}
                      >
                        <StepIcon className="w-4 h-4" style={{ color: `hsl(${industry.color})` }} />
                      </div>
                      <h4 className="font-semibold text-foreground text-sm mb-1">{step.title}</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                      {isLast && (
                        <p className="text-xs font-medium text-primary mt-3 flex items-center gap-1">
                          Get in touch <ArrowUpRight className="w-3 h-3" />
                        </p>
                      )}
                    </motion.div>
                  );
                })}
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
