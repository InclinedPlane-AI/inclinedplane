/**
 * /learn — explainers and glossary (brief §6.3, §7.12). Definition first,
 * quotable, every term anchored (#term-id) so other pages can link to it.
 */
import { Link } from "react-router-dom";
import { glossary, learnArticles, readingMinutes } from "@/content/learn";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SectionIntro } from "@/components/site/primitives";
import { site } from "@/content/site";
import { CtaBand, PageHero } from "@/components/site/sections";

const Learn = () => (
  <SiteLayout
    seo={{
      title: "Learn: context engineering and AI readiness",
      description:
        "Plain explanations of context engineering, semantic layers, ontologies and AI readiness, with worked examples and a glossary of the terms.",
      path: "/learn",
    }}
  >
    <PageHero
      crumbs={[{ label: "Learn" }]}
      label="Learn"
      title="The terms behind AI-ready data, explained plainly."
      lead="Short explainers with worked examples, written for CIOs, heads of data and the engineers who work for them. Each one starts with a definition you can quote."
    />

    <section className="bg-white">
      <div className="ip-container ip-section">
        <SectionIntro label="Explainers" title="Start here." />
        <ul className="m-0 list-none border-t-2 border-black p-0">
          {learnArticles.map((a) => (
            <li key={a.slug} className="border-b border-ip-rule-strong">
              <Link
                to={`/learn/${a.slug}`}
                className="group grid gap-3 py-8 no-underline md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] md:items-baseline md:gap-10"
              >
                <h2 className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold leading-[1.15] tracking-[-0.015em] text-black group-hover:underline decoration-1 underline-offset-4">
                  {a.title}
                </h2>
                <p className="m-0 text-[17px] leading-[1.6] text-ip-body">{a.definition}</p>
                <span className="ip-label-sm whitespace-nowrap">{readingMinutes(a)} minute read</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>

    <section id="glossary" className="bg-ip-grey">
      <div className="ip-container ip-section">
        <SectionIntro label="Glossary" title="The words we use, and what we mean by them.">
          <p className="m-0">We use each of these terms with one meaning, everywhere on this site.</p>
        </SectionIntro>
        <dl className="m-0 grid grid-cols-1 border-t-2 border-black md:grid-cols-2">
          {glossary.map((t, i) => (
            <div
              key={t.id}
              id={t.id}
              className={`scroll-mt-28 border-b border-ip-rule-strong py-6 ${i % 2 === 0 ? "md:pr-10" : "md:border-l md:pl-10"}`}
            >
              <dt className="text-[19px] font-semibold leading-[1.3] text-black">{t.term}</dt>
              <dd className="m-0 mt-2 text-[16px] leading-[1.6] text-ip-body">
                {t.definition}
                {t.article && (
                  <>
                    {" "}
                    <Link to={`/learn/${t.article}`} className="ip-link text-[15px]">
                      Read the explainer
                    </Link>
                  </>
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 mb-0 text-[15px] text-ip-muted">
          Missing a term?{" "}
          <a className="ip-link text-[15px] font-medium" href={`mailto:${site.email}`}>
            Tell us
          </a>{" "}
          and we’ll add it.
        </p>
      </div>
    </section>

    <CtaBand source="mid-learn" />
  </SiteLayout>
);

export default Learn;
