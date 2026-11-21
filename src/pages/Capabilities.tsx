/**
 * /capabilities — the full incline at a larger scale (brief §7.2), with the
 * interactive version (select a step to see scope, deliverables and related
 * work), one paragraph per step, and the offer ladder (brief §10).
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
          <p className="m-0">Select a step to see what it covers, what you get and where we’ve done it.</p>
        </SectionIntro>
        <InclineInteractive />
      </div>
    </section>

    {/* One paragraph per step (crawlable summary) */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Each step" title="What each capability does for you." />
        <div className="border-t-2 border-black">
          {capabilities.map((c) => (
            <div key={c.id} className="grid gap-4 border-b border-ip-rule-strong py-8 md:grid-cols-[240px_1fr_auto] md:items-start md:gap-10">
              <div className="flex items-center gap-3">
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
              </div>
              <div>
                <h2 className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.15] tracking-[-0.015em]">{c.name}</h2>
                <p className="mt-3 mb-0 max-w-[680px] text-[17px] leading-[1.6] text-ip-body">
                  {c.promise} {c.whatWeDo[0]}
                </p>
              </div>
              <Link to={c.path} className="ip-link self-center text-[15px] md:justify-self-end">
                {c.step}: details
              </Link>
            </div>
          ))}
        </div>
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

    <FinalCta source="final-capabilities" />
  </SiteLayout>
);

export default Capabilities;
