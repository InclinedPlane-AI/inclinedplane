/**
 * /products/pipelineiq — pipeline reliability (brief §7.5). Proposed product,
 * MVP stage: substance kept from the previous page, no claims of scale, the
 * client it runs on stays confidential. Not in main nav. The incident view is
 * the page's one memorable moment.
 */
import { piqLine, piqStatus, piqPillars, piqPersonas, piqAlerts, piqGuarantees, piqSteps, piqLayers, piqFindings, piqAlertNoise, piqRoadmap, piqFaq, type Severity } from "@/content/pipelineiq";
import { PRODUCTS } from "@/data/products";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, SectionIntro, Verified, VerifyBadge, buttonClass } from "@/components/site/primitives";
import { Faq, PageHero } from "@/components/site/sections";
import { IncidentView } from "@/components/site/products/IncidentView";
import { DemoRequest } from "@/components/site/products/DemoRequest";
import { RowsTable } from "@/components/site/products/RowsTable";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const piq = PRODUCTS.find((p) => p.id === "pipelineiq")!;

const sevCls: Record<Severity, string> = {
  High: "bg-[#fef3f2] text-[#b42318]",
  Medium: "bg-ip-orange-tint text-ip-orange-ink",
  Low: "bg-ip-grey-100 text-ip-body",
  Custom: "bg-black text-white",
};

const stateCls: Record<string, string> = {
  Live: "bg-black text-white",
  "In development": "bg-ip-orange text-black",
  Planned: "border border-ip-rule-strong text-ip-body",
  Next: "border border-ip-rule-strong text-ip-body",
};

const ProductPipelineIQ = () => (
  <SiteLayout
    seo={{
      title: "PipelineIQ: pipeline monitoring and ETL debugging",
      description:
        "Read-only pipeline monitoring, alerting and ETL debugging that turns hundreds of failures into a few root causes. Know each morning if data is safe to use.",
      path: "/products/pipelineiq",
    }}
  >
    <PageHero
      crumbs={[{ label: "Solutions", to: "/products" }, { label: "PipelineIQ" }]}
      label="Pipeline reliability · MVP"
      title="PipelineIQ"
      lead={`${piqLine} ${piq.brief}`}
      aside={
        <div className="max-w-[320px] border-t-2 border-black pt-4">
          <p className="ip-label-sm m-0 mb-2">Status</p>
          <Verified item={piqStatus} badge={false}>
            <p className="m-0 text-[15px] leading-[1.5]">{piqStatus.text}</p>
            {!piqStatus.verified && <VerifyBadge className="mt-2" />}
          </Verified>
          <p className="mt-3 mb-0 text-[14px] leading-[1.5] text-ip-muted">For data engineers and platform teams: the people who get the call when a night fails.</p>
        </div>
      }
    >
      <a href="#demo-request" className={buttonClass("primary")}>
        Request a demo
      </a>
      <Link to="/products" className={buttonClass("secondary")}>
        How it pairs with IncLever
      </Link>
    </PageHero>

    {/* The problem + incident view (#demo: linked from the Solutions menu) */}
    <section id="demo" className="bg-ip-grey scroll-mt-24">
      <div className="ip-container ip-section">
        <SectionIntro label="The problem" title="When a night fails, the evidence is scattered." titleClass="text-[clamp(28px,3.2vw,40px)] leading-[1.12] font-semibold tracking-[-0.02em]">
          <p className="m-0">
            The run log knows that a load failed. The orchestrator knows why, buried several clicks deep and kept for about 45 days. The compute engine holds the stack trace, one run at a time. And nobody holds the patterns: which errors recur, which tables are late against their own rhythm, whether a release caused it.
          </p>
          <p className="m-0">Most data issues are found by the person reading the report. We’d rather find them at 3am, before anyone does.</p>
        </SectionIntro>
        <IncidentView />
      </div>
    </section>

    {/* What it gives you */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="What it gives you" title="Hundreds of failures. A handful of problems.">
          <p className="m-0">PipelineIQ merges failures from every tool into one history and separates the root cause from the parents that failed because of it.</p>
        </SectionIntro>
        <div className="grid grid-cols-1 border-t-2 border-black md:grid-cols-3">
          {piqPillars.map((p, i) => (
            <div key={p.title} className={cn("border-b border-ip-rule-strong py-7 md:pr-8", i > 0 && "md:border-l md:pl-8")}>
              <h3 className="ip-h3 m-0">{p.title}</h3>
              <p className="mt-2.5 mb-0 text-[15px] leading-[1.6] text-ip-body">{p.body}</p>
            </div>
          ))}
        </div>

        <p className="ip-label-sm mt-14 mb-3">Each role, its questions, its page</p>
        <RowsTable columns={["Role", "Asks", "PipelineIQ shows"]} rows={piqPersonas.map((x) => [x.role, x.asks.join(" "), x.answers])} minWidth={640} />
      </div>
    </section>

    {/* Alerts */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section grid gap-12 [&>*]:min-w-0 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <Label className="mb-4">Alerts</Label>
          <h2 className="ip-h2 m-0">One alert per problem.</h2>
          <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-body">
            Every rule either judges each table against its own history, or rolls up to one alert per environment. An alert fires once per problem, updates while the problem lasts and closes itself when the condition clears.
          </p>
          <Verified item={piqAlertNoise} badge={false}>
            <p className="mt-5 mb-0 border-l-[3px] border-ip-orange pl-4 text-[16px] font-medium leading-[1.5]">
              {piqAlertNoise.text} {!piqAlertNoise.verified && <VerifyBadge className="ml-1" />}
            </p>
          </Verified>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px] border-collapse bg-white text-[15px]">
            <thead>
              <tr className="border-b-2 border-black text-left">
                <th scope="col" className="px-3 py-2 font-semibold">Rule</th>
                <th scope="col" className="px-3 py-2 font-semibold">Severity</th>
                <th scope="col" className="px-3 py-2 font-semibold">Fires when</th>
              </tr>
            </thead>
            <tbody>
              {piqAlerts.map((a) => (
                <tr key={a.name} className="border-b border-ip-rule align-top">
                  <td className="px-3 py-2.5 font-medium">{a.name}</td>
                  <td className="px-3 py-2.5">
                    <span className={cn("rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]", sevCls[a.sev])}>{a.sev}</span>
                  </td>
                  <td className="px-3 py-2.5 text-ip-body">{a.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    {/* Safety */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Safety" title="It can’t break what it watches.">
          <p className="m-0">The safety principles are enforced in code, not left to good intentions.</p>
        </SectionIntro>
        <div className="grid grid-cols-1 border-t-2 border-black sm:grid-cols-2 lg:grid-cols-4">
          {piqGuarantees.map((g, i) => (
            <div key={g.title} className={cn("border-b border-ip-rule-strong py-6 pr-6", i > 0 && "lg:border-l lg:pl-6", i % 2 === 1 && "sm:border-l sm:pl-6")}>
              <p className="m-0 text-[18px] font-semibold">{g.title}</p>
              <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* How we deploy it */}
    <section className="bg-black text-white">
      <div className="ip-container ip-section">
        <div className="mb-10 grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-end">
          <div>
            <Label onDark className="mb-4">
              How we deploy it
            </Label>
            <h2 className="ip-h2 m-0">One core. One layer built for your estate.</h2>
          </div>
          <p className="m-0 text-[17px] leading-[1.6] text-ip-on-dark">
            PipelineIQ isn’t a box you install and bend your platform to fit. It’s a stable core plus an engineer embedded with your team, who builds the layer that understands your services, your statuses, your naming and the quirks nobody documented.
          </p>
        </div>
        <ol className="m-0 grid list-none grid-cols-1 border-t border-white/30 p-0 sm:grid-cols-2 lg:grid-cols-3">
          {piqSteps.map((s, i) => (
            <li key={s.title} className="border-b border-white/20 py-6 pr-6">
              <span className="font-mono text-[13px] text-ip-on-dark">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 mb-0 text-[18px] font-semibold">{s.title}</p>
              <p className="mt-1.5 mb-0 text-[15px] leading-[1.55] text-ip-on-dark">{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="ip-label-sm mt-10 mb-3 !text-ip-on-dark">Client layers</p>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
          {piqLayers.map((l) => (
            <li key={l.stack} className="inline-flex items-center gap-2 rounded-full border border-white/40 px-3.5 py-1.5 text-[14px]">
              {l.stack}
              <span className={cn("rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]", l.status === "Live" ? "bg-ip-orange text-black" : "bg-white/10 text-white")}>{l.status}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Findings */}
    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="From its first deployment" title="Findings a generic monitoring tool never gives back.">
          <p className="m-0">Because the engineer reads your estate as it really is, PipelineIQ surfaces problems in the platform itself. All of these were found by reading, without changing anything.</p>
        </SectionIntro>
        <ul className="m-0 grid list-none grid-cols-1 border-t-2 border-black p-0 sm:grid-cols-2 lg:grid-cols-3">
          {piqFindings.map((f, i) => (
            <li key={f.title} className={cn("border-b border-ip-rule-strong py-6 pr-8", i % 3 === 2 && "lg:pr-0")}>
              <p className="m-0 text-[17px] font-semibold">{f.title}</p>
              <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>

    {/* Roadmap */}
    <section className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="Roadmap" title="From what failed to why, and what it breaks.">
          <p className="m-0">Anything that uses AI, or reads your code or architecture, ships only once you agree.</p>
        </SectionIntro>
        <ol className="m-0 grid list-none grid-cols-1 border-t-2 border-black p-0 md:grid-cols-4">
          {piqRoadmap.map((r, i) => (
            <li key={r.q} className={cn("border-b border-ip-rule-strong py-6 md:pr-6", i > 0 && "md:border-l md:pl-6")}>
              <span className={cn("inline-flex rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]", stateCls[r.state])}>{r.state}</span>
              <p className="mt-3 mb-0 text-[19px] font-semibold">{r.q}</p>
              <p className="mt-2 mb-0 text-[15px] leading-[1.55] text-ip-body">{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="bg-white">
      <div className="ip-container ip-section max-w-[1000px] !mx-auto">
        <Faq items={piqFaq} />
      </div>
    </section>

    <DemoRequest initial={["pipelineiq"]} title="See PipelineIQ read a platform like yours." intro="We’ll walk you through the portal on a real estate, show how the client layer would map onto your stack, and spell out the read-only access it needs." />
  </SiteLayout>
);

export default ProductPipelineIQ;
