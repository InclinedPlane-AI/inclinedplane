/**
 * /careers — restyled for the revamp. Keeps the "Careers Page / Job Listing
 * Design Contract" in CLAUDE.md: the openRoles schema below, and a JobCard
 * whose collapsed state shows title, department, location and type, and whose
 * expanded state shows about, responsibilities, requirements and an
 * "Apply now" button, with a smooth accordion animation.
 */
import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, buttonClass } from "@/components/site/primitives";
import { PageHero } from "@/components/site/sections";
import { cn } from "@/lib/utils";

const CAREERS_EMAIL = "careers@inclinedplane.com";

const values = [
  {
    title: "Engineering rigor",
    desc: "We treat data systems like production software: versioned, observed and tested. No band-aid pipelines, no hero culture.",
  },
  {
    title: "AI in every decision",
    desc: "Every architecture decision is made with AI in mind. We build for models, agents and intelligence, not just dashboards.",
  },
  {
    title: "Ownership and craft",
    desc: "You own outcomes, not tickets. We expect senior judgment and reward people who care about how the work is done.",
  },
  {
    title: "Remote-first, async-friendly",
    desc: "A distributed team across time zones. Documentation over meetings. Deep work over looking busy.",
  },
];

const process = [
  { title: "Intro conversation", desc: "A 30-minute chat to understand your background, what you’re looking for and how we work." },
  { title: "Technical deep-dive", desc: "A conversation about your past work, architecture decisions, trade-offs and impact. No whiteboard puzzles." },
  { title: "Practical exercise", desc: "A short take-home or live pairing session on a problem close to what you’d do on day one." },
  { title: "Team and offer", desc: "Meet the team, ask anything, and we move quickly to an offer if it’s a fit." },
];

export const openRoles: Array<{
  title: string;
  department: string;
  location: string;
  type: string;
  about: string;
  responsibilities: string[];
  requirements: string[];
  applyUrl: string;
}> = [];

const JobCard = ({ role }: { role: (typeof openRoles)[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();

  return (
    <div className={cn("rounded-[10px] border bg-white transition-colors duration-200", isOpen ? "border-black" : "border-ip-rule-strong hover:border-black")}>
      <h3 className="m-0">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          onClick={() => setIsOpen((o) => !o)}
          className="flex w-full flex-col gap-4 p-6 text-left sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <span>
            <span className="block text-[21px] font-semibold leading-[1.25] tracking-[-0.01em]">{role.title}</span>
            <span className="mt-3 flex flex-wrap gap-2">
              <span className="ip-label-sm rounded bg-ip-orange-tint px-2.5 py-1 !text-black">{role.department}</span>
              <span className="ip-label-sm rounded border border-ip-rule-strong px-2.5 py-1">{role.location}</span>
              <span className="ip-label-sm rounded border border-ip-rule-strong px-2.5 py-1">{role.type}</span>
            </span>
          </span>
          <span aria-hidden="true" className="relative h-4 w-4 shrink-0 self-end sm:self-center">
            <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-black" />
            <span className={cn("absolute left-1/2 top-0 h-4 w-0.5 -translate-x-1/2 bg-black transition-transform duration-300", isOpen && "scale-y-0")} />
          </span>
        </button>
      </h3>

      {/* Smooth accordion: grid-rows 0fr → 1fr (no JS height measuring) */}
      <div
        id={`${id}-panel`}
        role="region"
        aria-label={role.title}
        className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
      >
        <div className="overflow-hidden" {...(isOpen ? {} : ({ inert: "" } as Record<string, string>))}>
          <div className="mx-6 space-y-6 border-t border-ip-rule pt-6 pb-7 sm:mx-7">
            <div>
              <p className="ip-label-sm m-0 mb-2">About the role</p>
              <p className="m-0 text-[16px] leading-[1.6] text-ip-body">{role.about}</p>
            </div>
            <div>
              <p className="ip-label-sm m-0 mb-2">Key responsibilities</p>
              <ul className="m-0 list-disc space-y-1.5 pl-5 text-[16px] leading-[1.55] text-ip-body">
                {role.responsibilities.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="ip-label-sm m-0 mb-2">Requirements</p>
              <ul className="m-0 list-disc space-y-1.5 pl-5 text-[16px] leading-[1.55] text-ip-body">
                {role.requirements.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
            <a href={role.applyUrl} target="_blank" rel="noopener noreferrer" className={buttonClass("primary", "md")}>
              Apply now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const Careers = () => (
  <SiteLayout
    seo={{
      title: "Careers: build data and AI foundations for enterprises",
      description:
        "Join InclinedPlane to build data platforms and AI foundations for enterprises. Ownership, engineering rigor and work that ships to production.",
      path: "/careers",
    }}
  >
    <PageHero
      crumbs={[{ label: "Careers" }]}
      label="Careers"
      title="Build what comes next."
      lead="We build the data and AI infrastructure that demanding enterprises run on. If you care about impact, craft and outcomes, read on."
    />

    {/* Open roles */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Open roles" title="Join the team.">
          <p className="m-0">We’re looking for people who care about craft, impact and engineering rigor.</p>
        </SectionIntro>

        {openRoles.length > 0 ? (
          <div className="flex flex-col gap-4">
            {openRoles.map((role) => (
              <JobCard key={role.title} role={role} />
            ))}
          </div>
        ) : (
          <div className="rounded-[10px] border border-dashed border-ip-rule-dashed bg-ip-grey px-7 py-10">
            <p className="m-0 text-[21px] font-semibold">No open roles right now</p>
            <p className="mt-2 mb-0 max-w-[560px] text-[16px] leading-[1.6] text-ip-body">
              We aren’t hiring for specific positions at the moment, but we’re always glad to meet exceptional engineers.
            </p>
          </div>
        )}

        <div className="mt-10 grid border-t-2 border-black md:grid-cols-2">
          <div className="border-b border-ip-rule-strong py-7 md:pr-8">
            <h3 className="ip-h3 m-0">Don’t see a fit?</h3>
            <p className="mt-2 mb-5 text-[16px] leading-[1.6] text-ip-body">
              We’re always interested in meeting engineers, architects and AI builders. Introduce yourself, share what you’ve built and tell us what you’d want to work on.
            </p>
            <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Introduction: talent network")}`} className={buttonClass("secondary", "md")}>
              Join our talent network
            </a>
          </div>
          <div className="border-b border-ip-rule-strong py-7 md:border-l md:pl-8">
            <h3 className="ip-h3 m-0">Are you an employee?</h3>
            <p className="mt-2 mb-5 text-[16px] leading-[1.6] text-ip-body">Refer a friend or former colleague for an open position.</p>
            {openRoles.length > 0 ? (
              <Link to="/referral" className={buttonClass("secondary", "md")}>
                Employee referral portal
              </Link>
            ) : (
              <button type="button" disabled className={buttonClass("secondary", "md")}>
                No open roles right now
              </button>
            )}
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="Why InclinedPlane" title="A team built for leverage, not headcount.">
          <p className="m-0">
            We don’t optimize for size. We optimize for the quality of the engineers in the room. Everyone here sets direction, ships production work and raises the bar. In return you get autonomy, ownership and problems that matter to the businesses we work with.
          </p>
        </SectionIntro>
        <div className="grid grid-cols-1 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div key={v.title} className={cn("border-b border-ip-rule-strong py-6 pr-6", i > 0 && "lg:border-l lg:pl-6", i % 2 === 1 && "sm:border-l sm:pl-6")}>
              <h3 className="m-0 text-[18px] font-semibold">{v.title}</h3>
              <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Process (a real sequence) */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Hiring process" title="Fast, respectful, no theater.">
          <p className="m-0">Four steps over two to three weeks. We respect your time and give you a clear answer either way.</p>
        </SectionIntro>
        <ol className="m-0 grid list-none grid-cols-1 border-t-2 border-black p-0 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((s, i) => (
            <li key={s.title} className={cn("border-b border-ip-rule-strong py-6 pr-6", i > 0 && "lg:border-l lg:pl-6", i % 2 === 1 && "sm:border-l sm:pl-6")}>
              <Label small className="mb-3">
                Step {i + 1}
              </Label>
              <h3 className="m-0 text-[18px] font-semibold">{s.title}</h3>
              <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    {/* Final */}
    <section className="relative overflow-hidden border-t border-ip-rule bg-ip-grey">
      <div aria-hidden="true" className="ip-pattern-fade-left absolute inset-y-0 right-0 hidden w-[42%] sm:block" />
      <div className="ip-container relative py-[clamp(64px,9vw,112px)]">
        <Label dot className="mb-5">
          Get in touch
        </Label>
        <h2 className="m-0 max-w-[760px] text-[clamp(32px,4.4vw,56px)] font-semibold leading-[1.04] tracking-[-0.025em]">Think you’d be a good fit?</h2>
        <p className="mt-5 mb-0 max-w-[580px] text-[18px] leading-[1.6] text-ip-body">
          Send a note with your background, what you’re looking for and a link to something you’ve built that you’re proud of. We read every email.
        </p>
        <a href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent("Joining InclinedPlane")}`} className={buttonClass("primary", "lg", "mt-8")}>
          {CAREERS_EMAIL}
        </a>
      </div>
    </section>
  </SiteLayout>
);

export default Careers;
