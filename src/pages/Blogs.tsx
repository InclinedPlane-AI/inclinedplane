/**
 * /blog — the Blog (labeled "Insights" until 2026-11-22; Insights is now the
 * evidence page at /insights). URL unchanged to protect rankings.
 * Featured latest post, then a clean list filterable by tag. No thumbnail grid.
 */
import { useState } from "react";
import { Link } from "react-router-dom";
import { blogPosts, allTags, type BlogPost } from "@/data/blogPosts";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label } from "@/components/site/primitives";
import { FinalCta, PageHero } from "@/components/site/sections";
import { cn } from "@/lib/utils";

function Meta({ post }: { post: BlogPost }) {
  return (
    <p className="m-0 flex flex-wrap gap-x-5 gap-y-1 text-[14px] text-ip-muted">
      <span>{post.author.name}</span>
      <time dateTime={new Date(post.date).toISOString().slice(0, 10)}>{post.date}</time>
      <span>{post.readTime}</span>
    </p>
  );
}

const Blogs = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const sorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const [featured, ...rest] = sorted;
  const filtered = activeTag ? sorted.filter((p) => p.tags.includes(activeTag)) : rest;

  return (
    <SiteLayout
      seo={{
        title: "Blog: data engineering and AI readiness",
        description:
          "Articles from InclinedPlane engineers on data platforms, pipelines, data contracts, context and getting enterprise data ready for AI agents.",
        path: "/blog",
      }}
    >
      <PageHero
        crumbs={[{ label: "Blog" }]}
        label="Blog"
        title="Notes from the engineering floor."
        lead="What we learn building data platforms, pipelines and AI foundations for enterprises, written by the engineers who did the work."
      />

      {/* Featured */}
      {featured && !activeTag && (
        <section aria-label="Latest article" className="bg-white">
          <div className="ip-container pt-[clamp(48px,6vw,80px)]">
            <Link to={`/blog/${featured.slug}`} className="group grid gap-8 no-underline text-black md:grid-cols-[1.15fr_1fr] md:items-center">
              <div className="overflow-hidden rounded-lg border border-ip-rule bg-ip-grey">
                <img
                  src={featured.heroImage.src}
                  alt={featured.heroImage.alt}
                  className="block aspect-[16/10] w-full object-cover"
                  loading="eager"
                />
              </div>
              <div>
                <Label small className="mb-4">
                  Latest
                </Label>
                <h2 className="m-0 text-[clamp(26px,3vw,38px)] font-semibold leading-[1.12] tracking-[-0.02em] group-hover:underline underline-offset-[6px] decoration-1">
                  {featured.title}
                </h2>
                <p className="mt-4 mb-5 text-[17px] leading-[1.6] text-ip-body">{featured.subtitle}</p>
                <Meta post={featured} />
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* List */}
      <section aria-label="All articles" className="bg-white">
        <div className="ip-container ip-section">
          <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter by topic">
            <span className="ip-label-sm mr-2">Topics</span>
            {[null, ...allTags].map((tag) => {
              const active = activeTag === tag;
              return (
                <button
                  key={tag ?? "all"}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveTag(tag)}
                  className={cn(
                    "min-h-[40px] rounded-full border px-3.5 text-[13px] transition-colors duration-150",
                    active ? "border-black bg-black text-white" : "border-ip-rule-strong bg-white text-ip-body hover:border-black hover:text-black",
                  )}
                >
                  {tag ?? "All"}
                </button>
              );
            })}
          </div>

          <ul className="m-0 list-none border-t-2 border-black p-0">
            {filtered.map((post) => (
              <li key={post.slug} className="border-b border-ip-rule-strong">
                <Link to={`/blog/${post.slug}`} className="group grid gap-3 py-7 no-underline text-black md:grid-cols-[1fr_260px] md:gap-10">
                  <div>
                    <h2 className="m-0 text-[clamp(21px,2vw,26px)] font-semibold leading-[1.2] tracking-[-0.01em] group-hover:underline underline-offset-4 decoration-1">
                      {post.title}
                    </h2>
                    <p className="mt-2.5 mb-0 max-w-[720px] text-[16px] leading-[1.6] text-ip-body">{post.subtitle}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="ip-label-sm rounded border border-ip-rule-strong px-2 py-0.5 !tracking-[0.06em]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:pt-1 md:text-right">
                    <p className="m-0 text-[14px] leading-[1.7] text-ip-muted">
                      <span className="block font-medium text-black">{post.author.name}</span>
                      <time className="block" dateTime={new Date(post.date).toISOString().slice(0, 10)}>
                        {post.date}
                      </time>
                      <span className="block">{post.readTime}</span>
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {filtered.length === 0 && (
            <div className="py-16">
              <p className="m-0 text-[17px] text-ip-body">No articles on this topic yet.</p>
              <button type="button" onClick={() => setActiveTag(null)} className="ip-link mt-3 text-[15px]">
                Show all articles
              </button>
            </div>
          )}
        </div>
      </section>

      <FinalCta source="final-blog" />
    </SiteLayout>
  );
};

export default Blogs;
