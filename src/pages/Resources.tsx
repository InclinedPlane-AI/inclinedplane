/**
 * /resources — hub for everything in the Resources menu, so clicking the menu
 * label never lands on nothing. Groups: proof, understand, evidence and
 * opinion, tools. Links come from resourcesNav in src/content/site.ts.
 */
import { Link } from "react-router-dom";
import { resourcesNav } from "@/content/site";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label } from "@/components/site/primitives";
import { CtaBand, PageHero } from "@/components/site/sections";
import { NextSteps } from "@/components/site/NextSteps";

const byPath = Object.fromEntries(resourcesNav.map((r) => [r.to, r]));

const groups: { title: string; intro: string; paths: string[] }[] = [
  { title: "See the proof", intro: "What we’ve delivered, and where.", paths: ["/case-studies", "/industries"] },
  { title: "Understand the concepts", intro: "Explainers you can click through.", paths: ["/learn"] },
  { title: "Evidence and opinion", intro: "The numbers behind the shift, and what we think about them.", paths: ["/insights", "/blog", "/thesis"] },
  { title: "Check your own data", intro: "A tool to use with your team today.", paths: ["/readiness-checklist"] },
];

const Resources = () => (
  <SiteLayout
    seo={{
      title: "Resources: case studies, explainers, insights and tools",
      description:
        "Case studies, industries, interactive explainers, industry insights with sources, our blog and thesis, and a free AI data readiness checklist.",
      path: "/resources",
    }}
  >
    <PageHero
      crumbs={[{ label: "Resources" }]}
      label="Resources"
      title="Proof, explainers and evidence."
      lead="Everything we publish, in one place: what we’ve delivered, how the concepts work, what the industry numbers say, and a checklist to use on your own data."
    >
      <Link to="/context-engineering" className="ip-link text-[16px] font-medium">
        New here? Start with context engineering, explained
      </Link>
    </PageHero>

    <section className="bg-white">
      <div className="ip-container ip-section flex flex-col gap-14">
        {groups.map((g) => (
          <div key={g.title} className="grid gap-6 md:grid-cols-[260px_1fr] md:gap-12">
            <div>
              <Label className="mb-2">{g.title}</Label>
              <p className="m-0 text-[15px] leading-[1.5] text-ip-body">{g.intro}</p>
            </div>
            <ul className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {g.paths.map((p) => {
                const r = byPath[p];
                return (
                  <li key={p}>
                    <Link to={r.to} className="group flex h-full flex-col gap-2 rounded-lg border border-ip-rule-strong p-6 no-underline transition-colors hover:border-black">
                      <span className="text-[21px] font-semibold leading-[1.2] text-black group-hover:underline decoration-1 underline-offset-4">{r.label}</span>
                      <span className="text-[15.5px] leading-[1.55] text-ip-body">{r.description}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <NextSteps
      tone="grey"
      steps={[
        { kicker: "Concept", title: "Context engineering, explained", body: "The idea everything here builds on.", to: "/context-engineering" },
        { kicker: "Capabilities", title: "The four pillars", body: "From data foundation to agents, in a recommended order.", to: "/capabilities" },
        { kicker: "Solutions", title: "IncLever and PipelineIQ", body: "The products, with demos.", to: "/products" },
      ]}
    />

    <CtaBand source="mid-resources" />
  </SiteLayout>
);

export default Resources;
