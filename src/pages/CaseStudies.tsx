import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Link, useSearchParams } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { caseStudyDetails } from "@/data/caseStudyDetails";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

const SITE_URL = "https://inclinedplane.com";
const toAbsoluteUrl = (assetPath: string) =>
  assetPath.startsWith("http") ? assetPath : `${SITE_URL}${assetPath.startsWith("/") ? "" : "/"}${assetPath}`;

// Heuristic "content weight" so denser case studies rise to the top of the grid.
const weightOf = (c: CaseStudy) => {
  const sectionWeight = c.sections.reduce((acc, s) => {
    const bodyLen = s.body?.length ?? 0;
    const bulletsLen = (s.bullets ?? []).reduce((a, b) => a + b.length, 0);
    return acc + bodyLen + bulletsLen;
  }, 0);
  return sectionWeight + c.summary.length + (c.metrics?.length ?? 0) * 40;
};

// Image with skeleton placeholder while loading.
const ImageWithSkeleton = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      {!loaded && <Skeleton className="absolute inset-0 w-full h-full rounded-none" />}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`${className ?? ""} ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
      />
    </>
  );
};

const CaseStudies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeId = searchParams.get("study");

  const ordered = useMemo(
    () => [...caseStudies].sort((a, b) => weightOf(b) - weightOf(a)),
    []
  );

  const active = useMemo(
    () => (activeId ? ordered.find((c) => c.id === activeId) ?? null : null),
    [activeId, ordered]
  );

  const openStudy = (cs: CaseStudy) => {
    setSearchParams({ study: cs.id });
  };
  const closeStudy = () => {
    setSearchParams({}, { replace: false });
  };

  // Lock background scroll when modal is open
  useEffect(() => {
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [active]);

  return (
    <PageLayout>
      {active ? (
        <SEOHead
          key={active.id}
          title={`${active.title} — Case Study`}
          description={active.summary}
          path={`/case-studies?study=${active.id}`}
          ogImage={toAbsoluteUrl(active.image)}
          ogType="article"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "CaseStudy",
            name: active.title,
            about: active.industry,
            description: active.summary,
            image: toAbsoluteUrl(active.image),
            url: `${SITE_URL}/case-studies?study=${active.id}`,
            provider: { "@type": "Organization", name: "Inclined Plane", url: SITE_URL },
            ...(active.stack ? { keywords: active.stack } : {}),
          }}
        />
      ) : (
        <SEOHead
          title="Case Studies"
          description="13 production case studies across retail, pharma, energy, EV, FMCG, manufacturing, e-commerce, public sector and renewables — real outcomes from AI-native data engineering."
          path="/case-studies"
          jsonLd={{
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: ordered.map((cs, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/case-studies?study=${cs.id}`,
              name: cs.title,
              image: toAbsoluteUrl(cs.image),
            })),
          }}
        />
      )}
      <PageHero
        label="Case Studies"
        title={<>Proof in <span className="text-gradient-orange">Production.</span></>}
        subtitle="Real outcomes from production deployments. Not proofs of concept — production systems that move the needle."
      />
      <div className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Aggregate stats strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {[
              { value: "13", label: "Production Case Studies" },
              { value: "98%+", label: "Best-in-Class Model Accuracy" },
              { value: "30+ yrs", label: "Of Data Consolidated" },
              { value: "10+", label: "Industries Served" },
            ].map(({ value, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass-panel rounded-xl px-5 py-6 text-center">
                <p className="text-2xl font-bold text-gradient-orange text-glow-orange mb-1">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Case studies — 3 col grid, denser cards first */}
          <div className="mb-20">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ordered.map((cs, i) => {
                const Icon = cs.icon;
                const displayNumber = String(i + 1).padStart(2, "0");
                const hasDedicatedPage = !!caseStudyDetails[cs.id];
                const cardClassName =
                  "glass-panel rounded-2xl text-left group hover:glow-orange transition-all flex flex-col h-full focus:outline-none focus:ring-2 focus:ring-primary/40 overflow-hidden";
                const cardInner = (
                  <>
                    {/* Image banner */}
                    <div className="relative h-40 overflow-hidden">
                      <ImageWithSkeleton
                        src={cs.image}
                        alt={cs.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                      <div className="absolute top-3 left-3 w-9 h-9 rounded-lg surface-3 backdrop-blur-md flex items-center justify-center border border-primary/20">
                        <Icon size={16} className="text-primary" />
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                    {/* Top row: number + industry */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-primary/80 tracking-widest">{displayNumber}</span>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider truncate max-w-[60%] text-right">
                        {cs.industry}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base font-bold text-foreground leading-snug mb-3 group-hover:text-primary transition-colors">{cs.title}</h2>

                    {/* Summary */}
                    <p className="text-sm text-secondary-foreground leading-relaxed mb-4">
                      {cs.summary}
                    </p>

                    {/* Metrics */}
                    {cs.metrics && cs.metrics.length > 0 && (
                      <div className={`grid gap-2 mb-4 ${cs.metrics.length === 1 ? "grid-cols-1" : cs.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                        {cs.metrics.map((m) => (
                          <div key={m.label} className="surface-2 rounded-lg p-3 text-center">
                            <p className="text-base font-bold text-gradient-orange mb-0.5 leading-none">
                              {typeof m.value === "number" ? (
                                <AnimatedCounter end={m.value} suffix={m.suffix || ""} prefix={m.prefix || ""} />
                              ) : (
                                <>{m.prefix || ""}{m.value}{m.suffix || ""}</>
                              )}
                            </p>
                            <p className="text-[9px] text-muted-foreground mt-1 leading-tight">{m.label}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Footer: stack + read more */}
                    <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between gap-3">
                      <p className="font-mono text-[10px] text-muted-foreground/70 truncate">
                        {cs.stack || "—"}
                      </p>
                      <span className="text-xs text-primary flex items-center gap-1 shrink-0 group-hover:gap-2 transition-all">
                        Read more <ArrowRight size={12} />
                      </span>
                    </div>
                    </div>
                  </>
                );

                const motionProps = {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  transition: { delay: Math.min(i * 0.04, 0.4), duration: 0.5 },
                  viewport: { once: true },
                };

                return hasDedicatedPage ? (
                  <motion.div key={cs.id} {...motionProps}>
                    <Link
                      to={`/case-studies/${cs.id}`}
                      data-cursor-hover
                      className={`${cardClassName} block`}
                    >
                      {cardInner}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.button
                    key={cs.id}
                    type="button"
                    onClick={() => openStudy(cs)}
                    {...motionProps}
                    data-cursor-hover
                    className={cardClassName}
                  >
                    {cardInner}
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* CTA section */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-panel rounded-2xl p-10 text-center glow-orange">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to Build Your <span className="text-gradient-orange">Success Story?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Let's discuss how we can engineer the same level of impact for your data infrastructure.
            </p>
            <Link to="/contact" data-cursor-hover
              className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange">
              Start a Conversation <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Detail modal */}
      <Dialog open={!!active} onOpenChange={(o) => !o && closeStudy()}>
        <DialogContent className="max-w-3xl max-h-[88vh] overflow-y-auto glass-panel border-border/60 p-0 gap-0">
          {active && (
            <>
              {/* Hero image */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <ImageWithSkeleton
                  src={active.image}
                  alt={active.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
              </div>

              <DialogHeader className="p-7 pb-5 border-b border-border/40 sticky top-0 z-10 backdrop-blur-xl bg-background/70">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl surface-3 flex items-center justify-center shrink-0">
                    <active.icon size={22} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono text-[10px] text-primary tracking-widest">
                        {String(ordered.findIndex(c => c.id === active.id) + 1).padStart(2, "0")}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">{active.industry}</span>
                    </div>
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-foreground leading-tight">
                      {active.title}
                    </DialogTitle>
                    {active.stack && (
                      <DialogDescription className="font-mono text-[10px] text-muted-foreground/80 mt-2">
                        {active.stack}
                      </DialogDescription>
                    )}
                  </div>
                  <button
                    onClick={closeStudy}
                    aria-label="Close"
                    className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                    data-cursor-hover
                  >
                    <X size={18} />
                  </button>
                </div>
              </DialogHeader>

              <div className="p-7 pt-6 space-y-7">
                {/* Summary lead */}
                <p className="text-base text-secondary-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
                  {active.summary}
                </p>

                {/* Metrics */}
                {active.metrics && active.metrics.length > 0 && (
                  <div className={`grid gap-3 ${active.metrics.length === 1 ? "grid-cols-1" : active.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {active.metrics.map((m) => (
                      <div key={m.label} className="surface-2 rounded-xl p-4 text-center">
                        <p className="text-2xl font-bold text-gradient-orange text-glow-orange mb-1">
                          {typeof m.value === "number" ? (
                            <AnimatedCounter end={m.value} suffix={m.suffix || ""} prefix={m.prefix || ""} />
                          ) : (
                            <>{m.prefix || ""}{m.value}{m.suffix || ""}</>
                          )}
                        </p>
                        <p className="text-[10px] text-muted-foreground">{m.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Sections */}
                <div className="space-y-6">
                  {active.sections.map((s) => (
                    <div key={s.heading}>
                      <h3 className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
                        {s.heading}
                      </h3>
                      {s.body && (
                        <p className="text-sm text-secondary-foreground leading-relaxed mb-3">
                          {s.body}
                        </p>
                      )}
                      {s.bullets && (
                        <ul className="space-y-2">
                          {s.bullets.map((b, idx) => (
                            <li key={idx} className="text-sm text-secondary-foreground leading-relaxed flex gap-3">
                              <span className="text-primary shrink-0 mt-2 w-1 h-1 rounded-full bg-primary" />
                              <span className="flex-1">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default CaseStudies;
