/**
 * Capability page template (brief §7.3), used by all four capabilities:
 * hero (with the mini incline, current step lit) → the problem → what we do →
 * deliverables → how it works → [signature block] → proof → tools →
 * accelerators → FAQ → related steps → CTA.
 */
import { Link, useParams } from "react-router-dom";
import { capabilities, capabilityBySlug, type Capability } from "@/content/capabilities";
import { flags } from "@/content/flags";
import { site } from "@/content/site";
import { visible } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { InclineMini } from "@/components/site/Incline";
import { Label, SectionIntro, Verified, VerifyBadge } from "@/components/site/primitives";
import { BookCta, CaseStudyCard, Faq, FinalCta, IncleverCard, PageHero, Reassure, ToolsTable } from "@/components/site/sections";
import { cn } from "@/lib/utils";
import NotFound from "./NotFound";

function ProcessFlow({ cap }: { cap: Capability }) {
  const accent = cap.tone === "orange" ? "bg-ip-orange" : cap.tone === "black" ? "bg-black" : "bg-ip-rule-dashed";
  return (
    <ol className="m-0 grid list-none grid-cols-1 gap-0 p-0 md:grid-cols-5">
      {cap.process.map((s, i) => (
        <li key={s.title} className="relative flex gap-4 pb-8 md:flex-col md:gap-0 md:pb-0 md:pr-6">
          {/* track */}
          <span aria-hidden="true" className="absolute left-[7px] top-4 bottom-0 w-px bg-ip-rule-strong md:left-4 md:right-0 md:top-[7px] md:h-px md:w-auto" />
          <span aria-hidden="true" className={cn("relative z-10 mt-0.5 h-[15px] w-[15px] shrink-0 rounded-[3px] md:mb-5", i === cap.process.length - 1 ? accent : "bg-white border-2 border-black")} />
          <div>
            <p className="m-0 text-[18px] font-semibold leading-[1.25]">{s.title}</p>
            <p className="mt-1.5 mb-0 text-[15px] leading-[1.5] text-ip-body">{s.detail}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function AgentFit() {
  if (!flags.agentNeutrality) return null;
  const steps = [
    ["Define the use case", "Who asks, what they ask, what a correct answer must include, and what the agent must never do."],
    ["Build the evaluation set", "Real questions from your people, with known-correct answers taken from governed data."],
    ["Test side by side", "Two to four agent options on the same context layer, scored on accuracy, refusal quality, cost per answer, latency and governance fit."],
    ["Recommend in writing", "A documented recommendation you can defend to security, finance and the board."],
  ];
  return (
    <section className="bg-white border-t border-ip-rule">
      <div className="ip-container ip-section">
        <SectionIntro label="Agent fit assessment" title="Use case first, vendor second.">
          <p className="m-0">{site.agentNeutralityLine} We test agents on your questions and your data, then show you the results.</p>
        </SectionIntro>
        <div className="grid grid-cols-1 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([t, d], i) => (
            <div key={t} className={cn("border-b border-ip-rule-strong py-6 pr-6", i > 0 && "lg:border-l lg:pl-6", i % 2 === 1 && "sm:border-l sm:pl-6 lg:pl-6")}>
              <p className="m-0 text-[18px] font-semibold">{t}</p>
              <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RunService() {
  if (!flags.runService) return null;
  return (
    <section className="bg-black text-white">
      <div className="ip-container ip-section grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <Label onDark className="mb-4">
            After go-live
          </Label>
          <h2 className="ip-h2 m-0">Keep it ready.</h2>
        </div>
        <div>
          <p className="m-0 text-[18px] leading-[1.6] text-ip-on-dark">
            Data drifts, definitions change and new sources arrive. We run the readiness operations for you after launch: continuous checks, drift monitoring, pipeline reliability and a monthly readiness report your leadership can read in five minutes.
          </p>
        </div>
      </div>
    </section>
  );
}

const CapabilityPage = () => {
  const { slug = "" } = useParams();
  const cap = capabilityBySlug[slug];
  if (!cap) return <NotFound />;

  const idx = capabilities.findIndex((c) => c.id === cap.id);
  const prev = capabilities[idx - 1];
  const next = capabilities[idx + 1];
  const promise = cap.id === "activate" && !flags.agentNeutrality ? cap.short : cap.promise;

  return (
    <SiteLayout seo={{ title: cap.seo.title, description: cap.seo.description, path: cap.path }}>
      <PageHero
        crumbs={[{ label: "Capabilities", to: "/capabilities" }, { label: cap.name }]}
        label={`${cap.step}${cap.id === "enable" ? " · Accelerated by IncLever" : ""}`}
        dot={cap.tone === "orange"}
        title={cap.name}
        lead={promise}
        aside={<InclineMini current={cap.id} />}
      >
        <BookCta source={`hero-${cap.id}`} />
        <Reassure className="basis-full" />
      </PageHero>

      {/* The problem */}
      <section className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="The problem" title={cap.problem} titleClass="text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.02em]">
            <p className="m-0">{cap.problemBody}</p>
          </SectionIntro>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-white">
        <div className="ip-container ip-section grid gap-12 md:grid-cols-2">
          <div>
            <Label className="mb-4">What we do</Label>
            {cap.whatWeDo.map((p, i) => (
              <p key={p} className={cn("m-0 leading-[1.55]", i === 0 ? "text-[clamp(20px,1.9vw,24px)] font-medium text-black" : "mt-4 text-[17px] text-ip-body")}>
                {p}
              </p>
            ))}
            {cap.id === "enable" && <p className="mt-4 mb-0 text-[17px] font-medium leading-[1.55]">{site.incleverLine2}</p>}
          </div>
          <div className="border-t-2 border-black pt-[18px]">
            <p className="ip-label-sm m-0 mb-3">What’s included</p>
            <ul className="m-0 grid grid-cols-1 gap-x-6 gap-y-2.5 pl-[18px] text-[16px] leading-[1.45] sm:grid-cols-2">
              {visible(cap.included).map((it) => (
                <li key={it.label}>
                  {it.label}
                  {!it.verified && <VerifyBadge className="ml-1.5" />}
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-ip-rule-strong pt-[18px]">
              <p className="ip-label-sm m-0 mb-2">Outcome</p>
              <p className="m-0 text-[18px] font-medium leading-[1.5]">{cap.outcome}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="bg-white border-t border-ip-rule">
        <div className="ip-container ip-section">
          <SectionIntro label="Deliverables" title="What you get, concretely." />
          <div className="grid grid-cols-1 border-t-2 border-black md:grid-cols-2">
            {cap.deliverables.map((d, i) => (
              <div key={d.title} className={cn("border-b border-ip-rule-strong py-7", i % 2 === 0 ? "md:pr-10" : "md:border-l md:pl-10")}>
                <h3 className="ip-h3 m-0">{d.title}</h3>
                <p className="mt-2.5 mb-0 max-w-[520px] text-[16px] leading-[1.6] text-ip-body">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="How it works" title={cap.processTitle} titleClass="text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.02em]" />
          <ProcessFlow cap={cap} />
        </div>
      </section>

      {/* Contextualize: the concept lives on /context-engineering; this page is how we deliver it */}
      {cap.id === "contextualize" && (
        <section className="bg-white">
          <div className="ip-container ip-section">
            <Link
              to="/context-engineering"
              className="group grid gap-6 rounded-xl border border-ip-orange p-6 no-underline transition-colors hover:border-black sm:p-9 md:grid-cols-[1fr_auto] md:items-center"
            >
              <span className="flex flex-col gap-2">
                <span className="ip-label">New to the concept?</span>
                <span className="text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.15] tracking-[-0.015em] text-black group-hover:underline decoration-1 underline-offset-4">
                  Context engineering, explained
                </span>
                <span className="max-w-[640px] text-[17px] leading-[1.55] text-ip-body">
                  The worked example (one question, two answers), the layers, data modelling and an interactive ontology explorer.
                </span>
              </span>
              <span className="text-[15px] font-semibold text-black">
                Read the explainer <span aria-hidden="true">→</span>
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Accelerator */}
      {(cap.id === "enable" || cap.id === "contextualize") && (
        <section className={cn(cap.id === "enable" ? "bg-white" : "bg-ip-grey")}>
          <div className="ip-container ip-section">
            <Label className="mb-2">Accelerator</Label>
            <p className="m-0 mb-2 max-w-[640px] text-[17px] leading-[1.55] text-ip-body">{site.incleverLine}</p>
            <IncleverCard connector={false} />
          </div>
        </section>
      )}

      {cap.id === "enable" && <AgentFit />}

      {/* Proof */}
      <section className="bg-white border-t border-ip-rule">
        <div className="ip-container ip-section">
          <SectionIntro label="Proof" title={cap.proof.caseStudyIds.length ? "Where we’ve done this." : "What we’ve delivered."} />
          <Verified item={cap.proof} badge={false}>
            <p className="m-0 mb-8 flex max-w-[760px] flex-wrap items-center gap-2 text-[19px] font-medium leading-[1.5]">
              {cap.proof.text} {!cap.proof.verified && <VerifyBadge />}
            </p>
          </Verified>
          {cap.proof.caseStudyIds.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cap.proof.caseStudyIds.map((id) => (
                <CaseStudyCard key={id} id={id} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Tools */}
      <section className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="Tools" title="On the stack you already have." />
          <ToolsTable steps={[cap.id]} />
        </div>
      </section>

      {cap.id === "enable" && <RunService />}

      {/* FAQ */}
      <section className="bg-white">
        <div className="ip-container ip-section max-w-[1000px] !mx-auto">
          <Faq items={cap.faq} />
        </div>
      </section>

      {/* Related steps */}
      <section className="bg-white border-t border-ip-rule">
        <div className="ip-container py-12">
          <Label className="mb-5">Neighbouring steps on the incline</Label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[prev, next].map((c, i) =>
              c ? (
                <Link
                  key={c.id}
                  to={c.path}
                  className={cn("group flex flex-col gap-1 rounded-lg border border-ip-rule-strong p-5 no-underline transition-colors hover:border-black", i === 1 && "sm:text-right sm:items-end")}
                >
                  <span className="ip-label-sm">{i === 0 ? "Before" : "Next"} · {c.step}</span>
                  <span className="text-[19px] font-semibold group-hover:underline underline-offset-4 decoration-1">{c.name}</span>
                </Link>
              ) : (
                <Link key={i} to="/capabilities" className={cn("group flex flex-col gap-1 rounded-lg border border-ip-rule-strong p-5 no-underline hover:border-black", i === 1 && "sm:text-right sm:items-end")}>
                  <span className="ip-label-sm">Overview</span>
                  <span className="text-[19px] font-semibold group-hover:underline underline-offset-4 decoration-1">All four capabilities</span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      <FinalCta source={`final-${cap.id}`} />
    </SiteLayout>
  );
};

export default CapabilityPage;

