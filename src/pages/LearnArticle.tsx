/**
 * /learn/:slug — explainer template (brief §6.3, §7.12): definition first,
 * byline, date, reading time, table of contents, body (.ip-prose), "where
 * InclinedPlane fits", related articles, soft CTA.
 */
import { Link, useParams } from "react-router-dom";
import { learnBySlug, readingMinutes } from "@/content/learn";
import { site } from "@/content/site";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label } from "@/components/site/primitives";
import { BookCta, Breadcrumbs } from "@/components/site/sections";
import { Blocks } from "@/components/site/learn/RichText";
import NotFound from "./NotFound";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

const LearnArticle = () => {
  const { slug = "" } = useParams();
  const article = learnBySlug[slug];
  if (!article) return <NotFound />;

  const minutes = readingMinutes(article);
  const related = article.related.map((s) => learnBySlug[s]).filter(Boolean);

  return (
    <SiteLayout seo={{ title: article.title, description: article.description, path: `/learn/${article.slug}` }}>
      <article>
        <header className="border-b border-ip-rule bg-white">
          <div className="ip-container pt-[clamp(40px,6vw,80px)] pb-[clamp(40px,5vw,64px)]">
            <Breadcrumbs items={[{ label: "Learn", to: "/learn" }, { label: article.title }]} />
            <Label dot className="mb-6">
              Explainer
            </Label>
            <h1 className="ip-h1-page m-0 max-w-[900px]">{article.title}</h1>
            <p className="mt-7 mb-0 max-w-[820px] border-l-[3px] border-ip-orange pl-5 text-[clamp(20px,2vw,24px)] font-medium leading-[1.45] text-black">
              {article.definition}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[14px] text-ip-muted">
              <span>
                By <span className="text-black">{site.name}</span>
              </span>
              <span>
                Published <time dateTime={article.datePublished}>{formatDate(article.datePublished)}</time>
              </span>
              <span>{minutes} minute read</span>
            </div>
          </div>
        </header>

        <div className="bg-white">
          <div className="ip-container grid grid-cols-1 gap-12 py-[clamp(48px,6vw,88px)] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="lg:sticky lg:top-[110px] lg:self-start">
              <p className="ip-label-sm m-0 mb-3">On this page</p>
              <ol className="m-0 list-none space-y-2.5 border-l border-ip-rule-strong p-0 pl-4 text-[14px] leading-[1.4]">
                {article.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-ip-body no-underline hover:text-black hover:underline underline-offset-4">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="ip-prose min-w-0">
              {article.sections.map((s) => (
                <section key={s.id} aria-labelledby={s.id} className="[&>*+*]:mt-[1.1em] first:[&>h2]:mt-0">
                  <h2 id={s.id} className="scroll-mt-28">
                    {s.heading}
                  </h2>
                  <Blocks blocks={s.blocks} />
                </section>
              ))}
              <p className="!mt-12 border-t border-ip-rule pt-6 text-[14px] text-ip-muted">
                Last reviewed <time dateTime={article.dateModified}>{formatDate(article.dateModified)}</time>.
              </p>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-ip-grey">
          <div className="ip-container ip-section">
            <Label className="mb-6">Related</Label>
            <div className="grid grid-cols-1 gap-x-10 border-t-2 border-black md:grid-cols-2">
              {related.map((r) => (
                <Link key={r.slug} to={`/learn/${r.slug}`} className="group flex flex-col gap-2 border-b border-ip-rule-strong py-7 no-underline">
                  <span className="text-[21px] font-semibold leading-[1.25] text-black group-hover:underline decoration-1 underline-offset-4">{r.title}</span>
                  <span className="text-[16px] leading-[1.55] text-ip-body">{r.definition}</span>
                </Link>
              ))}
              <Link to={article.capability.to} className="group flex flex-col gap-2 border-b border-ip-rule-strong py-7 no-underline">
                <span className="ip-label-sm">Capability</span>
                <span className="text-[21px] font-semibold leading-[1.25] text-black group-hover:underline decoration-1 underline-offset-4">
                  {article.capability.label}
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="bg-white border-t border-ip-rule">
        <div className="ip-container flex flex-wrap items-center justify-between gap-x-10 gap-y-6 py-[clamp(48px,6vw,72px)]">
          <div className="max-w-[640px]">
            <p className="m-0 text-[clamp(24px,2.6vw,32px)] font-semibold leading-[1.2] tracking-[-0.015em]">{site.cta.midTitle}</p>
            <p className="mt-2.5 mb-0 text-[17px] leading-[1.55] text-ip-body">
              A 45-minute AI Data Readiness Assessment looks at your data through these same checks.
            </p>
          </div>
          <BookCta source={`learn-${article.slug}`} label={site.cta.midButton} variant="secondary" />
        </div>
      </section>
    </SiteLayout>
  );
};

export default LearnArticle;
