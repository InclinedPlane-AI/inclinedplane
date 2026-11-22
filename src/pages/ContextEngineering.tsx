/**
 * /context-engineering — the general explainer, top of the main nav.
 * What context engineering is, why it matters now, the layers, data modelling,
 * ontology (and when you need one), what good looks like, then where our
 * capabilities and products fit. Ends on Solutions (Mohan's team, 2026-11-22).
 *
 * The Contextualize pillar (/capabilities/context-engineering) covers how we
 * deliver it; this page explains the concept. Mirrored in seo-config.mjs.
 */
import { Link } from "react-router-dom";
import { capabilityById } from "@/content/capabilities";
import { ceDefinition, ceFaq, ceSeo, modellingLevels, vocabulary } from "@/content/contextEngineering";
import { flags } from "@/content/flags";
import { site } from "@/content/site";
import { visible } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { TwoAnswers } from "@/components/site/TwoAnswers";
import { ContextLayers } from "@/components/site/learn/ContextLayers";
import { OntologyExplorer } from "@/components/site/learn/OntologyExplorer";
import { NextSteps } from "@/components/site/NextSteps";
import { Label, SectionIntro, VerifyBadge, buttonClass } from "@/components/site/primitives";
import { Faq, FinalCta, PageHero } from "@/components/site/sections";
import { TrustChain } from "@/components/site/products/diagrams";
import { cn } from "@/lib/utils";

const ctx = capabilityById.contextualize;
const h3 = "m-0 text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.15] tracking-[-0.015em]";

const ContextEngineering = () => (
  <SiteLayout seo={{ title: ceSeo.title, description: ceSeo.description, path: "/context-engineering" }}>
    <PageHero
      crumbs={[{ label: "Context engineering" }]}
      label="Context engineering"
      dot
      title="Context engineering: business meaning an AI agent can read."
      lead="AI agents rarely fail because the model is weak. They fail because nobody told them what your business means by customer, margin or last quarter. Context engineering writes that meaning down, governs it and hands it to every agent that asks."
    >
      <a href="#two-answers" className={buttonClass("primary")}>
        See it change an answer
      </a>
      <Link to="/products" className={buttonClass("secondary")}>
        Our solutions
      </Link>
    </PageHero>

    {/* Definition + why now */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-16">
          <div>
            <Label className="mb-4">In one sentence</Label>
            <p className="m-0 border-l-[3px] border-ip-orange pl-5 text-[clamp(21px,2.1vw,26px)] font-medium leading-[1.4] text-black">{ceDefinition}</p>
          </div>
          <div>
            <Label className="mb-4">Why it matters now</Label>
            <div className="grid grid-cols-1 gap-0 border-t-2 border-black sm:grid-cols-2">
              <div className="border-b border-ip-rule-strong py-5 sm:pr-6">
                <p className="ip-label-sm m-0 mb-2">For 30 years: an analyst</p>
                <p className="m-0 text-[16px] leading-[1.6] text-ip-body">
                  Carried the missing meaning in their head. Intercompany sales are excluded, a distributor counts as a customer, “last quarter” means fiscal. When a table was wrong, they noticed.
                </p>
              </div>
              <div className="border-b border-ip-rule-strong py-5 sm:border-l sm:pl-6">
                <p className="ip-label-sm m-0 mb-2 !text-ip-orange-ink">Now: an AI agent</p>
                <p className="m-0 text-[16px] leading-[1.6] text-ip-body">
                  Knows none of it. It reads whichever table it finds first, takes the most literal reading of the question and returns a confident, well-formatted answer.
                </p>
              </div>
            </div>
            <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-black">
              Meaning that lived in people’s heads now has to be explicit, governed and machine-readable. The disciplines behind it (data modelling, semantic layers, master data) are not new. The consumer is.{" "}
              <Link to="/insights" className="ip-link text-[17px]">
                What the industry numbers say
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Same question, two answers */}
    <section id="two-answers" className="bg-ip-grey scroll-mt-24">
      <div className="ip-container ip-section">
        <SectionIntro label="A worked example" title="One question. Five wrong turns. None of them the model’s fault.">
          <p className="m-0">
            “Who are our top 10 customers in France by margin last quarter?” Ask it on raw tables, then through governed context, and see which layer fixed which error. The company and figures are fictional.
          </p>
        </SectionIntro>
        <TwoAnswers />
      </div>
    </section>

    {/* The layers */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="The layers" title="What sits between a question and a correct answer.">
          <p className="m-0">
            Five kinds of context, stacked on a reliable data platform. Each one removes a class of wrong answers. Select a layer to see what it answers and what breaks without it.
          </p>
        </SectionIntro>
        <ContextLayers />
        <ul className="mt-10 mb-0 grid list-none grid-cols-1 gap-0 border-t-2 border-black p-0 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Definitions", "What each term means, with a formula, a grain, filters and an owner."],
            ["Relationships", "How entities connect and the rules between them."],
            ["Master data", "Which records across systems are the same real thing."],
            ["Permissions", "Who, or which agent, may see which rows and columns."],
            ["Freshness", "How current each source is, and when it’s too old to use."],
          ].map(([t, d], i) => (
            <li key={t} className={cn("border-b border-ip-rule-strong py-5 pr-5", i > 0 && "lg:border-l lg:pl-5", i % 2 === 1 && "sm:border-l sm:pl-5 lg:pl-5")}>
              <p className="m-0 text-[17px] font-semibold">{t}</p>
              <p className="mt-1.5 mb-0 text-[15px] leading-[1.5] text-ip-body">{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Data modelling */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="Data modelling" title="The older discipline underneath it.">
          <p className="m-0">
            Context engineering is data modelling, finished for a new reader. A model describes the business at four levels. Agents need all four, written down and connected.
          </p>
        </SectionIntro>
        <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 md:grid-cols-2 lg:grid-cols-4">
          {modellingLevels.map((m, i) => (
            <li key={m.level} className="relative flex flex-col rounded-lg border border-ip-rule-strong bg-white p-5">
              <span className="ip-label-sm">Level {i + 1}</span>
              <p className="m-0 mt-1 text-[22px] font-semibold tracking-[-0.01em]">{m.level}</p>
              <p className="mt-2 mb-0 text-[15.5px] leading-[1.5] text-black">{m.question}</p>
              <p className="mt-3 mb-0 rounded bg-ip-grey px-3 py-2 font-mono text-[12.5px] leading-[1.5] text-ip-body">{m.example}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14">
          <h3 className={h3}>New words, familiar work.</h3>
          <p className="mt-3 mb-6 max-w-[680px] text-[17px] leading-[1.6] text-ip-body">
            Most of the market’s vocabulary renames something data teams have done for years. Knowing the older equivalent makes it easier to see what you already have.
          </p>
          <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[640px] border-collapse border-t-2 border-black text-left text-[15px] leading-[1.5]">
              <caption className="sr-only">Market terms, what they mean, and their older equivalents</caption>
              <thead>
                <tr className="border-b border-ip-rule-strong">
                  <th scope="col" className="ip-label-sm py-3 pr-6 font-normal">Market term</th>
                  <th scope="col" className="ip-label-sm py-3 pr-6 font-normal">What it means</th>
                  <th scope="col" className="ip-label-sm py-3 font-normal">Older equivalent</th>
                </tr>
              </thead>
              <tbody>
                {vocabulary.map(([t, m, o]) => (
                  <tr key={t} className="border-b border-ip-rule-strong align-top">
                    <th scope="row" className="py-3.5 pr-6 font-semibold text-black">{t}</th>
                    <td className="py-3.5 pr-6 text-ip-body">{m}</td>
                    <td className="py-3.5 text-ip-body">{o}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    {/* Ontology */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Ontology" title="A map of your business that an agent can follow.">
          <p className="m-0">
            An ontology names the business entities, how they relate and the rules that apply, and binds each one to the tables that hold it. It is how an agent learns that a distributor is a customer and your French subsidiary is not.
          </p>
        </SectionIntro>
        <OntologyExplorer />

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className={h3}>Why it matters</h3>
            <ul className="mt-4 mb-0 list-disc space-y-2.5 pl-[18px] text-[16px] leading-[1.6] text-ip-body">
              <li>
                <strong className="text-black">Rules travel with the data.</strong> “Intercompany is not a customer” is applied by every agent and report, not remembered by some analysts.
              </li>
              <li>
                <strong className="text-black">Questions cross systems safely.</strong> The agent knows that ERP A’s customer and ERP B’s customer are the same kind of thing, and how to join them.
              </li>
              <li>
                <strong className="text-black">Answers can explain themselves.</strong> Every number can state which entities, rules and tables produced it.
              </li>
            </ul>
          </div>
          <div>
            <h3 className={h3}>When you need one, and when you don’t</h3>
            <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">
              If your questions are about metrics on one well-modelled system, a semantic layer is often enough. An ontology earns its place when entities and rules cross systems: several ERPs, many operating companies, intercompany trade, customer types with different rules. A knowledge graph, which connects the actual records, comes later and only when the questions need it.
            </p>
            <p className="mt-4 mb-0 text-[15px]">
              <Link to="/learn/ontology-vs-semantic-layer-vs-knowledge-graph" className="ip-link text-[15px]">
                Ontology vs semantic layer vs knowledge graph
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* What good looks like */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="What good looks like" title="Five signs your data is ready to be asked.">
          <p className="m-0">Use these as a quick test. If you can show evidence for each, an agent can answer from your data and say why.</p>
        </SectionIntro>
        <ol className="m-0 grid list-none grid-cols-1 gap-0 border-t-2 border-black p-0 md:grid-cols-2">
          {[
            "Every metric a use case touches has one definition, one owner and a change process.",
            "The entities that cause wrong answers (customer, product, operating company) are modelled, with their rules written down and bound to tables.",
            "Each customer, product and supplier has one trusted record across ERPs.",
            "Agents have their own identities and inherit the same permissions as people.",
            "Every answer can state its definition, its source and how fresh the data is.",
          ].map((t, i) => (
            <li key={t} className={cn("flex gap-4 border-b border-ip-rule-strong py-5", i % 2 === 0 ? "md:pr-10" : "md:border-l md:pl-10")}>
              <span aria-hidden="true" className="mt-1 inline-block h-3 w-3 shrink-0 rounded-[2px] bg-ip-orange" />
              <span className="text-[16.5px] leading-[1.55] text-black">{t}</span>
            </li>
          ))}
          <li className="flex items-center border-b border-ip-rule-strong py-5 md:border-l md:pl-10">
            <Link to="/readiness-checklist" className="ip-link text-[16px] font-medium">
              The full 16-point readiness checklist
            </Link>
          </li>
        </ol>
      </div>
    </section>

    {/* What we do */}
    <section className="bg-white">
      <div className="ip-container ip-section grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <Label className="mb-4">What we do</Label>
          <p className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.25] tracking-[-0.015em]">{ctx.whatWeDo[0]}</p>
          <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-body">
            We work on the platform you already run. Platforms now ship the tooling; we supply what they can’t: the business meaning across your ERPs and operating companies, and a routine that keeps it current.
          </p>
          {flags.agentNeutrality && <p className="mt-4 mb-0 text-[17px] font-medium leading-[1.6]">{site.agentNeutralityLine}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to={ctx.path} className={buttonClass("secondary", "md")}>
              How we deliver it
            </Link>
            <Link to="/capabilities" className="ip-link self-center text-[15px]">
              All four capabilities
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-black pt-[18px]">
          <p className="ip-label-sm m-0 mb-3">What it can include</p>
          <ul className="m-0 grid list-disc grid-cols-1 gap-x-6 gap-y-2.5 pl-[18px] text-[16px] leading-[1.45] sm:grid-cols-2">
            {visible(ctx.included).map((it) => (
              <li key={it.label}>
                {it.label}
                {!it.verified && <VerifyBadge className="ml-1.5" />}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    {/* Where the products fit */}
    {flags.pipelineIQ && (
      <section className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="Our solutions" title="Two products that keep context trustworthy after we leave.">
            <p className="m-0">
              Context is only useful if the data under it arrives on time and stays fit to answer from. PipelineIQ watches the first; IncLever checks the second, for whichever agent you choose.
            </p>
          </SectionIntro>
          <TrustChain />
          <div className="mt-8">
            <Link to="/products" className={buttonClass("primary", "md")}>
              See both solutions and their demos
            </Link>
          </div>
        </div>
      </section>
    )}

    {/* FAQ */}
    <section className="bg-white">
      <div className="ip-container ip-section max-w-[1000px] !mx-auto">
        <Faq items={ceFaq} title="Questions people ask about context engineering" />
      </div>
    </section>

    <NextSteps
      tone="grey"
      steps={[
        { kicker: "Solutions", title: "IncLever and PipelineIQ, with demos", body: "The two products that check your data is reliable and ready for any agent.", to: "/products" },
        { kicker: "Contextualize", title: "How we deliver context engineering", body: "Scope, deliverables and the proof behind it.", to: ctx.path },
        { kicker: "Learn", title: "Explore the concepts", body: "Interactive explainers on ontology, semantic layers and readiness.", to: "/learn" },
      ]}
    />

    <FinalCta source="final-context-engineering" />
  </SiteLayout>
);

export default ContextEngineering;
