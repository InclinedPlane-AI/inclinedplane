/**
 * /about (brief §7.10): what we do, the short story (formerly Sail Analytics,
 * said once), the meaning of the name, principles, leadership, the delivery
 * bench (placeholder until the December photo shoot), where we work.
 */
import { site } from "@/content/site";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, Verified, VerifyBadge } from "@/components/site/primitives";
import { BookCta, FinalCta, PageHero } from "@/components/site/sections";
import { NameDiagram } from "@/components/site/about/NameDiagram";
import { cn } from "@/lib/utils";

const principles = [
  {
    title: "Engineers, not consultants.",
    text: "The people who scope the work build it. We write code in your repositories and environments, not recommendations in a slide deck.",
  },
  {
    title: "Methodology over heroics.",
    text: "Engagements don’t depend on one person staying late. Every project runs on the same framework: architecture reviews, quality gates, deployment pipelines and documented handoffs.",
  },
  {
    title: "The same rigor at every layer.",
    text: "A reporting pipeline gets the same testing, versioning and monitoring as a production model. Project size and deadline pressure don’t change that.",
  },
  {
    title: "Transparent by default.",
    text: "Everything we build is documented, observable and transferable. You should always know what you have, how it works and why each decision was made.",
  },
  {
    title: "Built to last, not to demo.",
    text: "We judge our work by how it performs six months after we hand it over, not by how it looks on the day it ships.",
  },
  {
    title: "We say what we think.",
    text: "If your data estate has a problem, or a technology choice is wrong for your context, we tell you, including when it’s uncomfortable.",
  },
];

const About = () => (
  <SiteLayout
    seo={{
      title: "About us",
      description:
        "InclinedPlane is a data engineering and AI readiness firm. Who we are, what the name means, how we work, and who leads the firm.",
      path: "/about",
    }}
  >
    <PageHero crumbs={[{ label: "About" }]} label="About" title="We build the data foundations AI depends on." lead={site.whatWeDo}>
      <BookCta source="hero-about" />
    </PageHero>

    {/* Story */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Our story" title="From business intelligence to the foundations underneath it.">
          <p className="m-0">
            InclinedPlane, formerly Sail Analytics, began in Bengaluru as an analytics practice building reporting and BI for manufacturers, energy companies, logistics firms and retailers.
          </p>
          <p className="m-0">
            Engagement after engagement, the same lesson came back. The bottleneck was never the dashboard. It was the platform underneath it: fragmented ERPs, pipelines nobody monitored, and definitions that changed from one team to the next.
          </p>
          <p className="m-0">
            Now the consumer of enterprise data is changing from an analyst to an AI agent, and that foundation decides whether the agent gives the right answer. So that is the work we do: modernize the platform, make its meaning explicit, and get it ready for the agents a client chooses.
          </p>
        </SectionIntro>
      </div>
    </section>

    {/* The name */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section grid items-center gap-12 md:grid-cols-[1fr_1.05fr]">
        <div>
          <Label className="mb-4">The name</Label>
          <h2 className="ip-h2 m-0">Data has gravity. We provide the leverage.</h2>
          <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">
            An inclined plane is the simplest machine there is for moving a heavy load with less effort. You don’t lift the load straight up; you move it along a slope.
          </p>
          <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-body">
            Enterprise data behaves like a heavy load. It accumulates in systems and resists being moved. Our job is the slope: the four capabilities that take an organization from fragmented data to trusted foundations that AI agents can act on. That’s why we draw them as rising steps.
          </p>
        </div>
        <div className="rounded-xl border border-ip-rule-strong bg-white p-6 sm:p-10">
          <NameDiagram />
        </div>
      </div>
    </section>

    {/* Principles */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="How we work" title="Six principles every engagement runs on." />
        <div className="grid grid-cols-1 border-t-2 border-black md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className={cn(
                "border-b border-ip-rule-strong py-7",
                "md:pr-8",
                i % 2 === 1 && "md:border-l md:pl-8 lg:border-l-0 lg:pl-0",
                i % 3 !== 0 && "lg:border-l lg:pl-8",
              )}
            >
              <h3 className="m-0 text-[20px] font-semibold leading-[1.25]">{p.title}</h3>
              <p className="mt-2.5 mb-0 text-[16px] leading-[1.6] text-ip-body">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Leadership */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="Leadership" title="Who leads the firm." />
        <div className="flex flex-wrap items-start gap-12">
          {SHOW_UNVERIFIED && (
            <div
              role="img"
              aria-label="Placeholder for Keerthana's headshot"
              className="flex aspect-square basis-[280px] shrink items-center justify-center rounded-xl border border-dashed border-ip-rule-dashed bg-white text-[15px] text-ip-muted"
            >
              Headshot (December shoot)
            </div>
          )}
          <div className="max-w-[680px] basis-[420px] grow">
            <h3 className="m-0 text-[clamp(26px,2.6vw,32px)] font-semibold leading-[1.15] tracking-[-0.015em]">{site.founder.name}</h3>
            <p className="ip-label mt-2 mb-0">{site.founder.role}</p>
            <p className="mt-5 mb-0 text-[17px] leading-[1.6] text-ip-body">
              Keerthana founded InclinedPlane and sets its direction: the problems the firm takes on, how every engagement is run, and the standard a system has to meet before it ships. She works directly with client leadership to turn data and AI plans into funded, sequenced programs of work.
            </p>
            <Verified item={site.founder.credentials} badge={false}>
              <p className="mt-4 mb-0 text-[16px] leading-[1.55] text-black">
                {site.founder.credentials.text} {!site.founder.credentials.verified && <VerifyBadge className="ml-1" />}
              </p>
            </Verified>
            <a href={site.founder.linkedin} target="_blank" rel="noopener" className="ip-link mt-4 inline-flex min-h-[44px] items-center text-[15px]">
              Keerthana on LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* Delivery bench: placeholder until the December shoot */}
    {SHOW_UNVERIFIED && (
      <section className="bg-white">
        <div className="ip-container ip-section">
          <SectionIntro label="The delivery bench" title="The engineers who do the work.">
            <p className="m-0">Procurement teams read a two-person page as a very small firm. This section introduces the bench by name and role.</p>
          </SectionIntro>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-ip-rule-dashed bg-ip-grey px-6 py-8">
            <span className="flex items-center gap-3 text-[16px] text-ip-body">
              <VerifyBadge /> Team photos and names after the December shoot.
            </span>
            <span className="ip-label-sm">Hidden in production until filled</span>
          </div>
        </div>
      </section>
    )}

    {/* Where we work */}
    <section className="bg-white border-t border-ip-rule">
      <div className="ip-container ip-section grid gap-10 md:grid-cols-3">
        <div>
          <Label className="mb-3">Delivery base</Label>
          <p className="m-0 text-[20px] font-semibold leading-[1.3]">Bengaluru, India</p>
          <p className="mt-2 mb-0 text-[16px] leading-[1.55] text-ip-body">Where our engineering team is based.</p>
        </div>
        <div>
          <Label className="mb-3">Clients</Label>
          <p className="m-0 text-[20px] font-semibold leading-[1.3]">US, UK and Europe</p>
          <p className="mt-2 mb-0 text-[16px] leading-[1.55] text-ip-body">Mid-to-large enterprises, many with operating companies in several countries.</p>
        </div>
        <div>
          <Label className="mb-3">Offices</Label>
          <Verified item={site.office} badge={false}>
            <p className="m-0 text-[20px] font-semibold leading-[1.3]">United States and India</p>
            {!site.office.verified && <VerifyBadge className="mt-2" />}
          </Verified>
          <p className="mt-2 mb-0 text-[16px] leading-[1.55] text-ip-body">
            <a className="ip-link font-medium" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>

    <FinalCta source="final-about" />
  </SiteLayout>
);

export default About;
