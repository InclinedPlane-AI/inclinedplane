/**
 * Home — the founder's homepage design, ported into the codebase and refined
 * (brief §7.1). Structure, in the founder's order:
 * hero → proof strip → the incline → Contextualize → Enable + IncLever →
 * mid CTA → Build/Activate → tools → case studies → industries → CEO note →
 * final CTA. The incline's rise-in is the page's one orchestrated motion.
 */
import { Link } from "react-router-dom";
import { site } from "@/content/site";
import { capabilityById } from "@/content/capabilities";
import { industries } from "@/content/industries";
import { flags } from "@/content/flags";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { InclineHome } from "@/components/site/Incline";
import { Label, SectionIntro, Verified, VerifyBadge, buttonClass } from "@/components/site/primitives";
import {
  BookCta,
  CapabilityFeature,
  CaseStudyCard,
  CaseStudyPlaceholder,
  CtaBand,
  FinalCta,
  IncleverCard,
  ProofStrip,
  ToolsTable,
  featuredCaseStudyIds,
} from "@/components/site/sections";

const Index = () => {
  const build = capabilityById.build;
  const activate = capabilityById.activate;

  return (
    <SiteLayout
      seo={{
        title: "InclinedPlane: Enterprise Data Foundations for the AI Era",
        description:
          "We engineer and modernize enterprise data platforms on the stack you already have, then make them trusted, contextualized and ready for AI agents.",
        path: "/",
      }}
    >
      {/* Hero */}
      <section id="top" className="bg-white">
        <div className="ip-container pt-[clamp(56px,8vw,104px)] pb-[clamp(48px,6vw,80px)]">
          <Label dot className="mb-7">
            {site.tagline}
          </Label>
          <h1 className="ip-h1 m-0 max-w-[1000px]">{site.headline}</h1>
          <div className="mt-9 flex flex-wrap items-end justify-between gap-x-12 gap-y-7">
            <p className="ip-lead m-0 max-w-[600px]">{site.supportingLine}</p>
            <div className="flex flex-wrap gap-3.5">
              <BookCta source="hero" />
              <Link to="/case-studies" className={buttonClass("secondary")}>
                See case studies
              </Link>
            </div>
          </div>
        </div>
        <img
          src="/brand/pattern-strip.png"
          alt=""
          aria-hidden="true"
          width={1737}
          height={1421}
          className="block h-[clamp(180px,20vw,280px)] w-full object-cover object-[60%_50%]"
        />
      </section>

      <ProofStrip />

      {/* How we build: the incline */}
      <section id="approach" className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="How we build" title="Four capabilities, one path to production AI.">
            <p className="m-0">
              AI is only as good as the data underneath it. We take enterprises up the incline, from fragmented data to trusted, contextualized foundations that AI agents can act on.
            </p>
            <p className="m-0 font-medium text-black">{site.sequenceLine}</p>
          </SectionIntro>
          <InclineHome />
          <p className="mt-6 mb-0 text-[14px] text-ip-muted">
            <Link to="/capabilities" className="ip-link text-[15px]">
              Explore the four capabilities
            </Link>
          </p>
        </div>
      </section>

      <CapabilityFeature cap={capabilityById.contextualize} ctaLabel="Explore Context Engineering" />

      <CapabilityFeature cap={capabilityById.enable} tone="grey" ctaLabel="Explore AI Readiness">
        {flags.agentNeutrality && (
          <div className="basis-full border-l-[3px] border-ip-orange pl-5">
            <p className="m-0 text-[18px] font-medium leading-[1.5]">{site.agentNeutralityLine}</p>
          </div>
        )}
        <IncleverCard />
      </CapabilityFeature>

      <CtaBand source="mid-home" />

      {/* Supporting capabilities */}
      <section id="capabilities" className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="Supporting capabilities" title="The foundation underneath, and the payoff on top." titleClass="text-[clamp(30px,3.6vw,44px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            <p className="m-0">
              Engineering and governance sit underneath every engagement. Agentic analytics sits on top, where your teams see the value of everything below it.
            </p>
          </SectionIntro>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="group relative flex flex-col gap-3 rounded-[10px] border border-ip-rule bg-white p-7 transition-colors duration-200 hover:border-black">
              <span className="ip-label">Underneath · Build</span>
              <h3 className="m-0 text-[22px] font-semibold">
                <Link to={build.path} className="no-underline after:absolute after:inset-0 after:content-[''] group-hover:underline underline-offset-4 decoration-1">
                  {build.name}
                </Link>
              </h3>
              <p className="m-0 text-[15px] leading-[1.55] text-ip-body">
                Cloud data platforms, lakehouse architecture, pipelines, ETL and ELT, data integration, legacy modernization, data quality, master data and metadata management, lineage, access controls and governance frameworks.
              </p>
            </div>
            <div className="group relative flex flex-col gap-3 rounded-[10px] border border-black bg-black p-7 text-white">
              <span className="ip-label !text-ip-on-dark">On top · Activate</span>
              <h3 className="m-0 text-[22px] font-semibold">
                <Link to={activate.path} className="no-underline after:absolute after:inset-0 after:content-[''] group-hover:underline underline-offset-4 decoration-1">
                  {activate.name}
                </Link>
              </h3>
              <p className="m-0 text-[16px] font-medium leading-[1.5]">
                {flags.agentNeutrality ? activate.promise : activate.short}
              </p>
              <p className="m-0 text-[15px] leading-[1.55] text-ip-on-dark">
                Conversational analytics agents, agentic BI, natural language querying, automated insights, root-cause analysis, predictive analytics and decision intelligence.
              </p>
            </div>
          </div>
          <Link to="/capabilities" className="ip-link mt-6 inline-flex min-h-[44px] items-center text-base">
            All capabilities
          </Link>
        </div>
      </section>

      {/* Tools and platforms */}
      <section id="tools" className="bg-white border-t border-ip-rule">
        <div className="ip-container ip-section">
          <SectionIntro label="Tools and platforms" title="We work with the stack you already have." titleClass="text-[clamp(30px,3.6vw,44px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            <p className="m-0">Organized the same way we build, from the cloud up to the agents your teams talk to.</p>
          </SectionIntro>
          <ToolsTable />
        </div>
      </section>

      {/* Case studies */}
      <section id="work" className="bg-white">
        <div className="ip-container ip-section !pt-0">
          <div className="border-t border-ip-rule pt-[var(--ip-section-y)]">
            <SectionIntro label="Case studies" title="Proven at enterprise scale." />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredCaseStudyIds().map((id) => (
                <CaseStudyCard key={id} id={id} size="feature" />
              ))}
              <CaseStudyPlaceholder />
            </div>
            <Link to="/case-studies" className="ip-link mt-7 inline-flex min-h-[44px] items-center text-base">
              All case studies
            </Link>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="Industries" title="Built for complex, multi-entity businesses." />
          <div className="grid grid-cols-1 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-5">
            {industries.map((ind) => (
              <Link
                key={ind.id}
                to={`/industries#${ind.id}`}
                className="group flex flex-col gap-2.5 border-b border-ip-rule-strong py-7 pr-6 no-underline text-black"
              >
                <span className="text-[22px] font-semibold leading-[1.2] group-hover:underline underline-offset-4 decoration-1">{ind.name}</span>
                <span className="text-[16px] leading-[1.55] text-ip-body">{ind.short}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CEO note */}
      <section id="about" className="bg-white">
        <div className="ip-container ip-section flex flex-wrap items-center gap-12">
          {SHOW_UNVERIFIED && (
            <div
              role="img"
              aria-label="Placeholder for Keerthana's headshot"
              className="flex aspect-square basis-[300px] shrink items-center justify-center rounded-xl border border-dashed border-ip-rule-dashed bg-ip-grey text-[15px] text-ip-muted"
            >
              Headshot (December shoot)
            </div>
          )}
          <div className="basis-[420px] grow">
            <Label className="mb-4">A note from our CEO</Label>
            <Verified item={site.founder.quote} badge={false}>
              <blockquote className="m-0 text-[clamp(22px,2.4vw,30px)] font-medium leading-[1.35]">
                {site.founder.quote.text.map((line, i) => (
                  <span key={i} className={i ? "mt-3.5 block" : "block"}>
                    {i === 0 ? "“" : ""}
                    {line}
                    {i === site.founder.quote.text.length - 1 ? "”" : ""}
                  </span>
                ))}
              </blockquote>
              {!site.founder.quote.verified && (
                <p className="mt-3 mb-0 flex flex-wrap items-center gap-2 text-[13px] text-ip-muted">
                  <VerifyBadge /> Draft. Keerthana is rewriting this in her own words.
                </p>
              )}
            </Verified>
            <p className="mt-6 mb-0 text-[16px] text-ip-body">
              <strong className="text-black">{site.founder.name}</strong>, {site.founder.role}
            </p>
            <Verified item={site.founder.credentials} badge={false}>
              <span className="mt-1.5 block text-[15px] leading-[1.5] text-ip-muted">
                {site.founder.credentials.text} {!site.founder.credentials.verified && <VerifyBadge className="ml-1" />}
              </span>
            </Verified>
            <a href={site.founder.linkedin} target="_blank" rel="noopener" className="ip-link mt-3 inline-flex min-h-[44px] items-center text-[15px]">
              Connect on LinkedIn
            </a>
            <p className="mt-8 mb-0 max-w-[640px] border-t border-ip-rule pt-6 text-[15px] leading-[1.6] text-ip-body">{site.whatWeDo}</p>
          </div>
        </div>
      </section>

      <FinalCta source="final-home" />
    </SiteLayout>
  );
};

export default Index;
