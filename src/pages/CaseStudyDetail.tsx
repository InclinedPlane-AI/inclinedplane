import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import CaseStudyHero from "@/components/case-study/CaseStudyHero";
import CaseStudyMedia from "@/components/case-study/CaseStudyMedia";
import SectionNav from "@/components/case-study/SectionNav";
import SectionGlow from "@/components/SectionGlow";
import { caseStudies } from "@/data/caseStudies";
import { caseStudyDetails } from "@/data/caseStudyDetails";

const SITE_URL = "https://inclinedplane.com";
const toAbsoluteUrl = (assetPath: string) =>
  assetPath.startsWith("http") ? assetPath : `${SITE_URL}${assetPath.startsWith("/") ? "" : "/"}${assetPath}`;

/*
 * Every case study uses the same structure: CaseStudyHero (image, title,
 * outcome metrics) → sticky section nav → Opportunity / Solution / Impact →
 * more case studies → CTA. Content comes from src/data/caseStudies.ts and
 * src/data/caseStudyDetails.ts; no per-slug layout branches.
 */
const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const detail = slug ? caseStudyDetails[slug] : undefined;
  const cs = detail ? caseStudies.find((c) => c.id === detail.caseStudyId) : undefined;

  useEffect(() => {
    if (!detail || !cs) navigate("/case-studies", { replace: true });
  }, [detail, cs, navigate]);

  if (!detail || !cs) return null;

  const navItems = detail.sections.map((s) => ({ id: s.id, label: s.label }));

  const scrollToFirstSection = () => {
    const el = document.getElementById(detail.sections[0].id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Next three studies that have their own page, wrapping around the list.
  const withPages = caseStudies.filter((c) => caseStudyDetails[c.id]);
  const at = withPages.findIndex((c) => c.id === cs.id);
  const more = [1, 2, 3].map((k) => withPages[(at + k) % withPages.length]).filter((c) => c.id !== cs.id);

  return (
    <PageLayout forceLightNavbar>
      <SEOHead
        title={`${cs.title} — Case Study`}
        description={cs.summary}
        path={`/case-studies/${detail.slug}`}
        ogImage={toAbsoluteUrl(cs.image)}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CaseStudy",
          name: cs.title,
          about: cs.industry,
          description: cs.summary,
          image: toAbsoluteUrl(cs.image),
          url: `${SITE_URL}/case-studies/${detail.slug}`,
          provider: {
            "@type": "Organization",
            name: "InclinedPlane",
            url: SITE_URL,
          },
          ...(cs.stack ? { keywords: cs.stack } : {}),
        }}
      />

      <CaseStudyHero cs={cs} title={detail.heroTitle} subtitle={detail.heroSubtitle} onPrimaryCta={scrollToFirstSection} />

      <SectionNav items={navItems} />

      <article className="relative overflow-x-clip pb-24">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-primary/[0.04] pointer-events-none" />

        {detail.sections.map((s, si) => (
          <section key={s.id} id={s.id} className={`relative scroll-mt-32 py-20 sm:py-24 ${si % 2 === 1 ? "bg-primary/[0.035]" : ""}`}>
            {si === 0 && <SectionGlow position="top-right" size={600} />}
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className="grid lg:grid-cols-12 gap-10 lg:gap-14"
              >
                <div className="lg:col-span-4">
                  <div className="lg:sticky lg:top-40">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 font-mono text-xs text-primary">
                        {s.number}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">{s.label}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">{s.heading}</h2>
                    <div className="mt-6 h-1 w-16 rounded-full bg-gradient-orange" />
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-base sm:text-lg text-foreground/85 leading-relaxed mb-8">{s.body}</p>
                  {s.bullets && (
                    <ul className="grid gap-3">
                      {s.bullets.map((b, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: 12 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.35, delay: idx * 0.05 }}
                          className="group flex gap-4 rounded-2xl border border-border bg-card/70 p-4 sm:p-5 hover:border-primary/40 transition-colors"
                        >
                          <span className="font-mono text-xs text-primary pt-0.5 shrink-0">{String(idx + 1).padStart(2, "0")}</span>
                          <span className="text-sm sm:text-base text-secondary-foreground leading-relaxed">{b}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        ))}

        {/* More case studies */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary mb-2">Keep reading</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">More case studies</h2>
            </div>
            <Link to="/case-studies" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={14} /> All case studies
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {more.map((m) => (
              <Link
                key={m.id}
                to={`/case-studies/${m.id}`}
                className="group rounded-2xl overflow-hidden border border-border bg-card/70 hover:border-primary/40 transition-colors"
              >
                <CaseStudyMedia src={m.image} alt={m.title} className="h-40" shade />
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-1.5">{m.industry}</p>
                  <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors">{m.title}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mt-20 overflow-hidden rounded-3xl bg-[#0b0908] text-white p-10 sm:p-14 text-center"
          >
            <div aria-hidden="true" className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full bg-[hsl(25_100%_50%/0.25)] blur-[100px]" />
            <div className="relative">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Ready to build your <span className="text-gradient-orange">success story?</span>
              </h2>
              <p className="text-white/65 mb-8 max-w-lg mx-auto">The next phase of your data story starts here.</p>
              <Link
                to="/contact"
                data-cursor-hover
                className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange"
              >
                Start a conversation <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </article>
    </PageLayout>
  );
};

export default CaseStudyDetail;
