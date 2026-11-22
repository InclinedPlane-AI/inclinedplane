/**
 * /capabilities — the full incline at a larger scale (brief §7.2), with the
 * interactive version (select a step to see scope, deliverables and related
 * work), a clickable card per pillar, a "learn the concepts" section linking
 * the interactive explainers, the offer ladder (brief §10) and next steps.
 * Replaces /services (301 in vercel.json).
 */
import { Link } from "react-router-dom";
import { capabilities } from "@/content/capabilities";
import { flags } from "@/content/flags";
import { site } from "@/content/site";
import { SiteLayout } from "@/components/site/SiteLayout";
import { InclineInteractive } from "@/components/site/Incline";
import { Label, SectionIntro } from "@/components/site/primitives";
import { BookCta, CtaBand, FinalCta, PageHero } from "@/components/site/sections";
import { NextSteps } from "@/components/site/NextSteps";
import { cn } from "@/lib/utils";

const ladder = [
  { stage: "Conversation", offer: "AI data readiness conversation", detail: "45 minutes, free. A senior engineer reviews where your data stands.", show: true },
  {
    stage: "Entry",
    offer: "AI Data Readiness Assessment",
    detail: "Fixed scope and backed by IncLever. Scored findings across quality, context, access and governance, with a roadmap.",
    show: flags.twoTierAssessment,
  },
  { stage: "Core", offer: "Context foundation build", detail: "Modernization, multi-ERP models, semantic layer, master data and agent-ready access.", show: true },
  { stage: "Activate", offer: "Agent enablement", detail: "The agent you choose, working reliably on governed data, with evaluations.", show: true },
  { stage: "Run", offer: "Keep it ready", detail: "Continuous checks, drift monitoring, pipeline reliability and a monthly readiness report.", show: flags.runService },
].filter((r) => r.show);

const Capabilities = () => (
  <SiteLayout
    seo={{
      title: "Capabilities: from data foundation to AI agents",
      description:
        "Data engineering and governance, context engineering, AI and agent readiness, and agentic analytics: four capabilities on one path to production AI.",
      path: "/capabilities",
    }}
  >
    <PageHero
      crumbs={[{ label: "Capabilities" }]}
      label="Capabilities"
      title="Four capabilities, one path to production AI."
      lead="AI is only as good as the data underneath it. We take enterprises up the incline, from fragmented data to trusted, contextualized foundations that AI agents can act on."
    >
      <BookCta source="hero-capabilities" />
    </PageHero>

    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="The incline" title="A recommended order, not a strict sequence.">
          <p className="m-0 font-medium text-black">{site.sequenceLine}</p>
          <p className="m-0">Select a step for a quick look, or open its pillar page below for the full detail.</p>
        </SectionIntro>
        <InclineInteractive />
      </div>
    </section>

    {/* Open a pillar: one card per capability, the whole card is the link */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Open a pillar" title="Pick a pillar to see it in detail.">
          <p className="m-0">Each page covers the problem it solves, what we do, what you get, how it works and where we’ve done it.</p>
        </SectionIntro>
        <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2">
          {capabilities.map((c) => (
            <li key={c.id}>
              <Link
                to={c.path}
                className={cn(
                  "group flex h-full flex-col rounded-xl border bg-white p-6 no-underline transition-colors duration-150 hover:border-black sm:p-8",
                  c.tone === "orange" ? "border-ip-orange" : c.tone === "black" ? "border-black" : "border-ip-rule-strong",
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "inline-block h-3 w-3 rounded-[2px] border",
                      c.tone === "orange" ? "bg-ip-orange border-ip-orange" : c.tone === "black" ? "bg-black border-black" : "bg-ip-grey-100 border-ip-rule-dashed",
                    )}
                  />
                  <span className="ip-label">
                    {c.step} · {c.position}
                  </span>
                </span>
                <h2 className="mt-4 mb-0 text-[clamp(24px,2.4vw,30px)] font-semibold leading-[1.15] tracking-[-0.015em] text-black">{c.name}</h2>
                <p className="mt-3 mb-0 text-[17px] leading-[1.6] text-ip-body">
                  {c.promise} {c.whatWeDo[0]}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 pt-1 text-[15px] font-semibold text-black sm:mt-auto sm:pt-6">
                  Explore {c.step}
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Learn the concepts */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="Learn the concepts" title="New to the terms? Learn them by clicking around.">
          <p className="m-0">Interactive explainers, simulations and a glossary, written for the people who sign off the work and the engineers who do it.</p>
        </SectionIntro>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            { kind: "Explainer", title: "Context engineering, explained", body: "Data modelling, ontology and the layers that fix wrong answers.", to: "/context-engineering" },
            { kind: "Explorer", title: "Ontology vs semantic layer vs knowledge graph", body: "Click through an entity graph and see the rules.", to: "/learn/ontology-vs-semantic-layer-vs-knowledge-graph" },
            { kind: "Simulation", title: "What AI readiness actually means", body: "Run five readiness checks and watch the verdict change.", to: "/learn/what-ai-readiness-means" },
            { kind: "Worked example", title: "Why AI agents give wrong answers", body: "Five causes, how to spot them and the layer that fixes each.", to: "/learn/why-ai-agents-give-wrong-answers" },
          ].map((t) => (
            <Link key={t.to} to={t.to} className="group flex flex-col gap-2 rounded-lg border border-ip-rule-strong bg-white p-6 no-underline transition-colors hover:border-black">
              <Label small>{t.kind}</Label>
              <span className="text-[19px] font-semibold leading-[1.25] text-black group-hover:underline decoration-1 underline-offset-4">{t.title}</span>
              <span className="text-[15px] leading-[1.55] text-ip-body">{t.body}</span>
            </Link>
          ))}
        </div>
        <p className="mt-6 mb-0">
          <Link to="/learn" className="ip-link text-[15px] font-medium">
            All explainers and the glossary
          </Link>
        </p>
      </div>
    </section>

    <CtaBand source="mid-capabilities" />

    {/* Offer ladder */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Ways to work with us" title="Start wherever you are.">
          <p className="m-0">Each stage stands on its own. Most clients begin with the conversation and decide from there.</p>
        </SectionIntro>
        <ol className="m-0 grid list-none grid-cols-1 border-t-2 border-black p-0 md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
          {ladder.map((r, i) => (
            <li key={r.stage} className={cn("border-b border-ip-rule-strong py-7 md:pr-6", i > 0 && "md:border-l md:pl-6")}>
              <Label small className="mb-3">
                {r.stage}
              </Label>
              <p className="m-0 text-[19px] font-semibold leading-[1.25]">{r.offer}</p>
              <p className="mt-2.5 mb-0 text-[15px] leading-[1.55] text-ip-body">{r.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <NextSteps
      steps={[
        { kicker: "Solutions", title: "IncLever and PipelineIQ, with demos", body: "The accelerators that make the work faster and keep watch afterward.", to: "/products" },
        { kicker: "Proof", title: "Case studies", body: "Delivered projects, filterable by capability and industry.", to: "/case-studies" },
        { kicker: "Start here", title: "The AI Data Readiness Assessment", body: "What the free 45-minute conversation and the full assessment cover.", to: "/assessment" },
      ]}
    />

    <FinalCta source="final-capabilities" />
  </SiteLayout>
);

export default Capabilities;
