/**
 * /products — the Solutions hub ("Solutions" in the nav since 2026-11-22; URL
 * kept to protect rankings). Briefs both products at the top, frames them as
 * the trust layer (from pipeline to answer), then shows each one's demo in
 * full: IncLever's demo clip and PipelineIQ's incident view. With
 * flags.pipelineIQ off, only IncLever shows. Product data: src/data/products.ts.
 */
import { Link } from "react-router-dom";
import { PRODUCTS, type Product } from "@/data/products";
import { flags } from "@/content/flags";
import { site } from "@/content/site";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, buttonClass } from "@/components/site/primitives";
import { IncleverDemoFrame, PageHero } from "@/components/site/sections";
import { TrustChain } from "@/components/site/products/diagrams";
import { DemoVideo } from "@/components/site/products/demoKit";
import { piqVideo } from "@/content/pipelineiq";
import { DemoRequest } from "@/components/site/products/DemoRequest";
import { NextSteps } from "@/components/site/NextSteps";
import { cn } from "@/lib/utils";

const order = flags.pipelineIQ ? ["inclever", "pipelineiq"] : ["inclever"];
const shown = order.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean) as Product[];

// No status/maturity claims here (claims policy): those live on each product page.
const glance: Record<string, { question: string; layer: string }> = {
  inclever: { question: "Is the data ready for any agent?", layer: "Between your data and your agents" },
  pipelineiq: { question: "Is the data arriving reliably?", layer: "Between your sources and your platform" },
};

function ProductSection({ p, tone }: { p: Product; tone: "white" | "grey" }) {
  const isInclever = p.id === "inclever";
  return (
    <section id={p.id} className={cn(tone === "grey" ? "bg-ip-grey" : "bg-white", "scroll-mt-24")}>
      <div className="ip-container ip-section grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
        <div>
          <Label small className="mb-3">
            {p.kicker}
          </Label>
          <h2 className="m-0 text-[clamp(34px,3.8vw,48px)] font-semibold leading-[1.05] tracking-[-0.025em]">{p.name}</h2>
          <p className="mt-2 mb-0 text-[21px] font-medium leading-[1.35]">{p.tagline}</p>
          <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-body">{p.brief}</p>
          <p className="ip-label-sm mt-6 mb-2">For</p>
          <p className="m-0 text-[15.5px] leading-[1.5] text-black">
            {p.audience.replace(/^For /, "")}. <span className="text-ip-body">{p.audienceNote}</span>
          </p>
          <ul className="mt-6 mb-0 list-disc space-y-1.5 border-t border-ip-rule pt-5 pl-[18px] text-[15.5px] leading-[1.5]">
            {p.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to={p.path} className={buttonClass(isInclever ? "primary" : "secondary", "md")}>
              How {p.name} works
            </Link>
            <a href="#demo-request" className="ip-link text-[15px]">
              Request a live demo
            </a>
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-3">
          <p className="ip-label-sm m-0">{isInclever ? "Demo · sample data" : "Demo · sample client"}</p>
          {isInclever ? (
            <IncleverDemoFrame />
          ) : (
            <>
              <DemoVideo src={piqVideo.src} poster={piqVideo.poster} title="PipelineIQ portal" tag="Demo data" label={piqVideo.label} aspect={piqVideo.aspect} />
              <p className="m-0 text-[14px] text-ip-body">
                {piqVideo.caption}{" "}
                <Link to="/products/pipelineiq#alerts" className="ip-link text-[14px]">
                  Try the interactive alert storm
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const Products = () => (
  <SiteLayout
    seo={{
      title: flags.pipelineIQ ? "Solutions: IncLever and PipelineIQ, the trust layer" : "Solutions: IncLever",
      description:
        "IncLever checks your data is ready for any AI agent. PipelineIQ checks it arrives reliably. Two products built by the engineers who deliver our work.",
      path: "/products",
    }}
  >
    <PageHero
      crumbs={[{ label: "Solutions" }]}
      label="Solutions"
      title={flags.pipelineIQ ? "The trust layer, from pipeline to answer." : "IncLever, our data readiness product."}
      lead={`Our team does the work on your existing stack. ${flags.pipelineIQ ? "Two products we built ourselves make" : "A product we built ourselves makes"} it faster and keeps watch afterward. With or without them, the expertise is the same.`}
    />

    {/* At a glance: both products briefed side by side */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="At a glance" title={flags.pipelineIQ ? "Two products, two questions." : "One product, one question."}>
          <p className="m-0">{site.incleverLine2}</p>
        </SectionIntro>
        <div className={cn("grid gap-5", shown.length > 1 && "md:grid-cols-2")}>
          {shown.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className={cn(
                "group flex flex-col rounded-xl border bg-white p-6 no-underline transition-colors hover:border-black sm:p-8",
                p.id === "inclever" ? "border-2 border-ip-orange" : "border-ip-rule-strong",
              )}
            >
              <span className="ip-label-sm">{p.kicker}</span>
              <span className="mt-2 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-black">{p.name}</span>
              <span className="mt-1.5 text-[19px] font-medium leading-[1.35] text-black">{glance[p.id].question}</span>
              <dl className="mt-5 mb-0 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-t border-ip-rule pt-4 text-[14.5px] leading-[1.45]">
                <dt className="text-ip-muted">For</dt>
                <dd className="m-0 text-black">{p.audience.replace(/^For /, "")}</dd>
                <dt className="text-ip-muted">Sits</dt>
                <dd className="m-0 text-black">{glance[p.id].layer}</dd>
              </dl>
              <span className="mt-5 text-[15px] font-semibold text-black">
                See the demo <span aria-hidden="true">↓</span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {flags.pipelineIQ && (
      <section className="bg-ip-grey">
        <div className="ip-container ip-section">
          <SectionIntro label="How they fit" title="Two questions between your ERPs and your agents.">
            <p className="m-0">
              Data has to arrive reliably before it can mean anything, and it has to mean the right thing before an agent can use it. Each product answers one of those questions, for whichever platform and agent you choose.
            </p>
          </SectionIntro>
          <TrustChain />
        </div>
      </section>
    )}

    {shown.map((p, i) => (
      <ProductSection key={p.id} p={p} tone={i % 2 === 0 ? "white" : "grey"} />
    ))}

    <DemoRequest initial={flags.pipelineIQ ? ["inclever", "pipelineiq"] : ["inclever"]} />

    <NextSteps
      steps={[
        { kicker: "Proof", title: "Case studies", body: "Delivered projects, filterable by capability and industry.", to: "/case-studies" },
        { kicker: "Concept", title: "Context engineering, explained", body: "Why agents need business meaning, and how it’s built.", to: "/context-engineering" },
        { kicker: "Start here", title: "The AI Data Readiness Assessment", body: "A free 45-minute look at your data, backed by IncLever.", to: "/assessment" },
      ]}
    />
  </SiteLayout>
);

export default Products;
