import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import CaseStudyVideoHero from "@/components/case-study/CaseStudyVideoHero";
import CaseStudyAnomalousHero from "@/components/case-study/CaseStudyAnomalousHero";
import CaseStudyEVVideoHero from "@/components/case-study/CaseStudyEVVideoHero";
import CaseStudyImageHero from "@/components/case-study/CaseStudyImageHero";
import CaseStudyIntroStats from "@/components/case-study/CaseStudyIntroStats";
import solarHeroImage from "@/assets/project-intelligence-solar.jpg";
import fleetHeroImage from "@/assets/ai-driven-fleet.png";
import fmcgVideoSrc from "@/assets/fmcg-sap-dms.mp4";
import pharmaHeroImage from "@/assets/pharma-sales-process.jpeg";
import engineHeroImage from "@/assets/02_Manufacturing_Demand_Forecasting.jpg";
import energyHeroImage from "@/assets/08_Energy_&_Industrial_Energy.jpg";
import edtechHeroImage from "@/assets/09_EdTech_VC-Funded_Educational_Products.jpg";
import pharmaMncHeroImage from "@/assets/10_Pharmaceuticals_Pharmaceutical_MNC.jpg";
import capitalHeroImage from "@/assets/11_Manufacturing_Leading_Capital_Equipment.jpg";
import publicSectorHeroImage from "@/assets/13_Public_Sector_Cultural_Heritage.jpg";
import erpHeroImage from "@/assets/14_case_study.jpg";
import CaseStudySectionBackdrop from "@/components/case-study/CaseStudySectionBackdrop";
import SectionNav from "@/components/case-study/SectionNav";
import AnimatedCounter from "@/components/AnimatedCounter";
import { caseStudies } from "@/data/caseStudies";
import { caseStudyDetails } from "@/data/caseStudyDetails";

const SITE_URL = "https://inclinedplane.com";
const toAbsoluteUrl = (assetPath: string) =>
  assetPath.startsWith("http") ? assetPath : `${SITE_URL}${assetPath.startsWith("/") ? "" : "/"}${assetPath}`;

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const detail = slug ? caseStudyDetails[slug] : undefined;
  const cs = detail ? caseStudies.find((c) => c.id === detail.caseStudyId) : undefined;

  useEffect(() => {
    if (!detail || !cs) navigate("/case-studies", { replace: true });
  }, [detail, cs, navigate]);

  if (!detail || !cs) return null;

  const useAnomalousStyle =
    detail.slug === "ev-battery-predictive" ||
    detail.slug === "ecom-inventory" ||
    detail.slug === "solar-bi" ||
    detail.slug === "ev-fleet-scheduling" ||
    detail.slug === "fmcg-edible-oil" ||
    detail.slug === "pharma-sales-bi" ||
    detail.slug === "engine-demand-forecast" ||
    detail.slug === "energy-audit" ||
    detail.slug === "vc-edtech" ||
    detail.slug === "pharma-mnc" ||
    detail.slug === "capital-equipment" ||
    detail.slug === "cultural-heritage" ||
    detail.slug === "erp-unification";

  const navItems = detail.sections.map((s) => ({ id: s.id, label: s.label }));

  const scrollToFirstSection = () => {
    const el = document.getElementById(detail.sections[0].id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <PageLayout>
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
            name: "Inclined Plane",
            url: SITE_URL,
          },
          ...(cs.stack ? { keywords: cs.stack } : {}),
        }}
      />

      {detail.slug === "ev-battery-predictive" ? (
        <CaseStudyEVVideoHero title={detail.heroTitle} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "fmcg-edible-oil" ? (
        <CaseStudyEVVideoHero title={detail.heroTitle} videoSrc={fmcgVideoSrc} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "solar-bi" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={solarHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "ev-fleet-scheduling" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={fleetHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "pharma-sales-bi" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={pharmaHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "engine-demand-forecast" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={engineHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "energy-audit" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={energyHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "vc-edtech" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={edtechHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "pharma-mnc" ? (
        <CaseStudyImageHero
          title={detail.heroTitle}
          imageSrc={pharmaMncHeroImage}
          onPrimaryCta={scrollToFirstSection}
        />
      ) : detail.slug === "capital-equipment" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={capitalHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : detail.slug === "cultural-heritage" ? (
        <CaseStudyImageHero
          title={detail.heroTitle}
          imageSrc={publicSectorHeroImage}
          onPrimaryCta={scrollToFirstSection}
        />
      ) : detail.slug === "erp-unification" ? (
        <CaseStudyImageHero title={detail.heroTitle} imageSrc={erpHeroImage} onPrimaryCta={scrollToFirstSection} />
      ) : useAnomalousStyle ? (
        <CaseStudyAnomalousHero
          eyebrow={detail.heroEyebrow}
          title={detail.heroTitle}
          subtitle={detail.heroSubtitle}
          onPrimaryCta={scrollToFirstSection}
        />
      ) : (
        <CaseStudyVideoHero
          videoUrl={detail.videoUrl}
          poster={cs.image}
          eyebrow={detail.heroEyebrow}
          title={detail.heroTitle}
          subtitle={detail.heroSubtitle}
          onPrimaryCta={scrollToFirstSection}
        />
      )}

      {useAnomalousStyle && cs.metrics && cs.metrics.length > 0 && (
        <CaseStudyIntroStats
          intro={detail.heroSubtitle}
          stats={cs.metrics.map((m) => ({
            value: m.value as number | string,
            suffix: m.suffix,
            prefix: m.prefix,
            label: m.label,
          }))}
        />
      )}

      <SectionNav items={navItems} />

      <article className={`mx-auto ${useAnomalousStyle ? "pt-0" : "max-w-7xl px-6 lg:px-8 pt-20"} pb-24`}>
        {/* Metrics strip */}
        {cs.metrics && cs.metrics.length > 0 && !useAnomalousStyle && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`grid gap-4 mb-20 ${
              cs.metrics.length === 1
                ? "grid-cols-1 max-w-sm mx-auto"
                : cs.metrics.length === 2
                  ? "grid-cols-2 max-w-2xl mx-auto"
                  : "grid-cols-2 sm:grid-cols-3 max-w-4xl mx-auto"
            }`}
          >
            {cs.metrics.map((m) => (
              <div key={m.label} className="glass-panel rounded-2xl p-6 text-center">
                <p className="text-3xl sm:text-4xl font-bold text-gradient-orange text-glow-orange mb-2">
                  {typeof m.value === "number" ? (
                    <AnimatedCounter end={m.value} suffix={m.suffix || ""} prefix={m.prefix || ""} />
                  ) : (
                    <>
                      {m.prefix || ""}
                      {m.value}
                      {m.suffix || ""}
                    </>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </motion.div>
        )}

        {/* Sections */}
        <div className={useAnomalousStyle ? "" : "space-y-28"}>
          {detail.sections.map((s) => {
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.55 }}
                className="grid lg:grid-cols-12 gap-10"
              >
                <div className="lg:col-span-4">
                  <span className="font-mono text-[11px] text-primary tracking-widest uppercase">
                    {s.number} — {s.label}
                  </span>
                  <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground leading-tight tracking-tight">
                    <span className="text-gradient-orange">{s.label}</span>
                  </h2>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-4">
                    {s.heading}
                  </h3>
                  <p className="text-sm sm:text-base text-secondary-foreground leading-relaxed mb-6 max-w-3xl">
                    {s.body}
                  </p>
                  {s.bullets && (
                    <ul className="space-y-4">
                      {s.bullets.map((b, idx) => (
                        <li
                          key={idx}
                          className="flex gap-4 text-base text-secondary-foreground leading-relaxed border-l-2 border-primary/40 pl-5"
                        >
                          <span className="font-mono text-[11px] text-primary/70 mt-1 shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            );

            if (useAnomalousStyle) {
              return (
                <section key={s.id} id={s.id} className="scroll-mt-28">
                  <CaseStudySectionBackdrop eyebrow={`${s.number} — ${s.label}`} title={s.heading} />
                  <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">{inner}</div>
                </section>
              );
            }

            return (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                {inner}
              </section>
            );
          })}
        </div>

        <div className={useAnomalousStyle ? "max-w-7xl mx-auto px-6 lg:px-8" : ""}>
          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-10 text-center glow-orange mt-28"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Ready to build your <span className="text-gradient-orange">success story?</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Let's discuss how we can engineer the same level of impact for your data infrastructure.
            </p>
            <Link
              to="/contact"
              data-cursor-hover
              className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange"
            >
              Start a conversation <ArrowRight size={16} />
            </Link>
          </motion.div>

          <div className="mt-12 text-center">
            <Link
              to="/case-studies"
              data-cursor-hover
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={14} /> Back to all case studies
            </Link>
          </div>
        </div>
      </article>
    </PageLayout>
  );
};

export default CaseStudyDetail;
