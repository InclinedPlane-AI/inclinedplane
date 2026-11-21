/**
 * /products — hub for IncLever and PipelineIQ. With flags.pipelineIQ on, the
 * two are framed together as "the trust layer: from pipeline to answer"
 * (brief §7.5). Product metadata comes from src/data/products.ts.
 */
import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/products";
import { flags } from "@/content/flags";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, buttonClass } from "@/components/site/primitives";
import { PageHero } from "@/components/site/sections";
import { TrustChain } from "@/components/site/products/diagrams";
import { DemoRequest } from "@/components/site/products/DemoRequest";
import { cn } from "@/lib/utils";

const order = flags.pipelineIQ ? ["pipelineiq", "inclever"] : ["inclever"];

const Products = () => {
  const shown = order.map((id) => PRODUCTS.find((p) => p.id === id)!).filter(Boolean);
  return (
    <SiteLayout
      seo={{
        title: flags.pipelineIQ ? "Products: the trust layer, from pipeline to answer" : "Products: IncLever",
        description:
          "PipelineIQ checks data arrives reliably. IncLever checks it is ready for any AI agent. Two accelerators built by the engineers who deliver our work.",
        path: "/products",
      }}
    >
      <PageHero
        crumbs={[{ label: "Products" }]}
        label="Products"
        title={flags.pipelineIQ ? "The trust layer, from pipeline to answer." : "IncLever, our data readiness product."}
        lead={`Our team does the work on your existing stack. ${flags.pipelineIQ ? "Two products we built ourselves make" : "A product we built ourselves makes"} it faster and keeps watch afterward. With or without them, the expertise is the same.`}
      />

      {flags.pipelineIQ && (
        <section className="bg-ip-grey">
          <div className="ip-container ip-section">
            <SectionIntro label="How they fit" title="Two questions between your ERPs and your agents.">
              <p className="m-0">Data has to arrive reliably before it can mean anything, and it has to mean the right thing before an agent can use it. Each product answers one of those questions.</p>
            </SectionIntro>
            <TrustChain />
          </div>
        </section>
      )}

      <section className="bg-white">
        <div className="ip-container ip-section">
          <div className={cn("grid gap-6", shown.length > 1 && "lg:grid-cols-2")}>
            {shown.map((p) => {
              const isInclever = p.id === "inclever";
              return (
                <article key={p.id} className={cn("flex flex-col rounded-xl border p-6 sm:p-9", isInclever ? "border-2 border-ip-orange" : "border-ip-rule-strong")}>
                  <Label small className="mb-3">
                    {p.kicker}
                    {p.id === "pipelineiq" ? " · MVP" : " · For Contextualize and Enable"}
                  </Label>
                  <h2 className="m-0 text-[clamp(32px,3.6vw,46px)] font-semibold leading-[1.05] tracking-[-0.025em]">{p.name}</h2>
                  <p className="mt-2 mb-0 text-[20px] font-medium leading-[1.35]">
                    {isInclever ? "Is it ready for any agent?" : "Is the data arriving reliably?"}
                  </p>
                  <p className="mt-4 mb-0 text-[16px] leading-[1.6] text-ip-body">{p.brief}</p>
                  <p className="ip-label-sm mt-6 mb-2">For</p>
                  <p className="m-0 text-[15px] leading-[1.5] text-black">
                    {p.audience.replace(/^For /, "")}. <span className="text-ip-body">{p.audienceNote}</span>
                  </p>
                  <ul className="mt-6 mb-0 space-y-1.5 border-t border-ip-rule pt-5 pl-[18px] text-[15px] leading-[1.5]">
                    {p.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 sm:mt-auto sm:pt-8">
                    <Link to={p.path} className={buttonClass(isInclever ? "primary" : "secondary", "md")}>
                      How {p.name} works
                    </Link>
                    <a href="#demo-request" className="ip-link text-[15px]">
                      Request a demo
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <DemoRequest initial={flags.pipelineIQ ? ["pipelineiq", "inclever"] : ["inclever"]} />
    </SiteLayout>
  );
};

export default Products;
