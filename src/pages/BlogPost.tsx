/**
 * /blog/:slug — article template (brief §7.12): byline, date, reading time,
 * table of contents for long pieces, related articles, soft CTA.
 * Section is labeled "Blog" in the UI; URLs unchanged.
 * Crawler metadata (BlogPosting JSON-LD) comes from scripts/seo-config.mjs.
 */
import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { blogPosts, type BlogImage } from "@/data/blogPosts";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label } from "@/components/site/primitives";
import { BookCta, Breadcrumbs } from "@/components/site/sections";
import { ArticleImage, ReadingProgress, SectionBlock, Toc, TocDisclosure, slugify, type TocItem } from "@/components/site/article/blocks";

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  const toc: TocItem[] = useMemo(
    () =>
      (post?.sections ?? [])
        .filter((s) => s.type === "heading" && s.level !== 3 && s.content)
        .map((s) => ({ id: slugify(s.content!), label: s.content! })),
    [post],
  );

  const related = useMemo(() => {
    if (!post) return [];
    return blogPosts
      .filter((p) => p.slug !== post.slug)
      .map((p) => ({ p, score: p.tags.filter((t) => post.tags.includes(t)).length }))
      .sort((a, b) => b.score - a.score || new Date(b.p.date).getTime() - new Date(a.p.date).getTime())
      .slice(0, 3)
      .map((x) => x.p);
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const credited: BlogImage[] = [post.heroImage, ...post.sections.filter((s) => s.image).map((s) => s.image!)].filter((img) => img.credit);
  const hasToc = toc.length >= 3;

  return (
    <SiteLayout seo={{ title: post.title, description: post.subtitle, path: `/blog/${post.slug}` }}>
      <ReadingProgress />
      <article>
        <header className="border-b border-ip-rule bg-white">
          <div className="ip-container pt-[clamp(36px,5vw,64px)] pb-10">
            <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.title }]} />
            <div className="max-w-[880px]">
              <div className="mb-6 flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span key={t} className="ip-label-sm rounded border border-ip-rule-strong px-2 py-1 !tracking-[0.06em]">
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="m-0 text-[clamp(34px,4.4vw,56px)] font-semibold leading-[1.06] tracking-[-0.025em]">{post.title}</h1>
              <p className="ip-lead mt-5 mb-0 max-w-[720px]">{post.subtitle}</p>
              <dl className="mt-8 grid max-w-[720px] grid-cols-2 gap-x-8 gap-y-4 border-t border-ip-rule pt-5 sm:grid-cols-[auto_auto_auto] sm:justify-start">
                <div className="col-span-2 sm:col-span-1">
                  <dt className="ip-label-sm">Written by</dt>
                  <dd className="m-0 mt-1 text-[15px]">
                    {post.author.linkedin ? (
                      <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="ip-link font-semibold">
                        {post.author.name}
                      </a>
                    ) : (
                      <span className="font-semibold">{post.author.name}</span>
                    )}
                    {post.author.role && <span className="text-ip-muted">, {post.author.role}</span>}
                  </dd>
                </div>
                <div>
                  <dt className="ip-label-sm">Published</dt>
                  <dd className="m-0 mt-1 text-[15px]">
                    <time dateTime={new Date(post.date).toISOString().slice(0, 10)}>{post.date}</time>
                  </dd>
                </div>
                <div>
                  <dt className="ip-label-sm">Reading time</dt>
                  <dd className="m-0 mt-1 text-[15px]">{post.readTime}</dd>
                </div>
              </dl>
            </div>
          </div>
        </header>

        <div className="ip-container pt-10 pb-[clamp(56px,7vw,96px)]">
          <div className="max-w-[1040px]">
            <ArticleImage image={post.heroImage} hero />
          </div>

          <div className={hasToc ? "mt-12 grid gap-12 lg:grid-cols-[minmax(0,720px)_220px] lg:justify-between" : "mt-12"}>
            <div className="min-w-0">
              <TocDisclosure items={toc} />
              <div className="ip-prose">
                {post.sections.map((section, i) => (
                  <SectionBlock key={i} section={section} />
                ))}
              </div>

              {/* Author + soft CTA */}
              <div className="mt-14 max-w-[720px] border-t-2 border-black pt-6">
                <Label small className="mb-2">
                  Written by
                </Label>
                <p className="m-0 text-[17px] font-semibold">
                  {post.author.name}
                  {post.author.role && <span className="font-normal text-ip-muted">, {post.author.role}</span>}
                </p>
                {post.author.linkedin && (
                  <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="ip-link mt-1 inline-flex min-h-[44px] items-center text-[15px]">
                    Follow on LinkedIn
                  </a>
                )}
              </div>

              <aside className="mt-10 max-w-[720px] rounded-lg bg-ip-grey p-6 sm:p-8" aria-label="Next step">
                <p className="m-0 text-[22px] font-semibold leading-[1.25] tracking-[-0.01em]">Not sure where your data stands?</p>
                <p className="mt-2 mb-5 text-[16px] leading-[1.6] text-ip-body">
                  A 45-minute AI Data Readiness Assessment looks at quality, context, access and governance on your own data.
                </p>
                <BookCta source={`blog-${post.slug}`} size="md" />
              </aside>

              {credited.length > 0 && (
                <div className="mt-10 max-w-[720px] border-t border-ip-rule pt-5">
                  <p className="ip-label-sm m-0 mb-2">Image credits</p>
                  <ul className="m-0 list-none space-y-2.5 p-0 text-[13px] text-ip-muted">
                    {credited.map((img, i) => (
                      <li key={i}>
                        <a href={img.creditUrl} target="_blank" rel="noopener noreferrer" className="ip-hit relative underline underline-offset-2 hover:text-black">
                          {img.credit}
                        </a>
                        , {img.alt}, via Unsplash
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {hasToc && (
              <aside className="hidden lg:block">
                <div className="sticky top-[110px]">
                  <Toc items={toc} />
                </div>
              </aside>
            )}
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-ip-rule bg-ip-grey">
          <div className="ip-container ip-section">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <h2 id="related-title" className="ip-h2 m-0">
                Related articles
              </h2>
              <Link to="/blog" className="ip-link text-[15px]">
                All articles
              </Link>
            </div>
            <ul className="m-0 grid list-none grid-cols-1 border-t-2 border-black p-0 md:grid-cols-3">
              {related.map((p, i) => (
                <li key={p.slug} className={i > 0 ? "border-b border-ip-rule-strong md:border-l md:pl-6" : "border-b border-ip-rule-strong md:pr-6"}>
                  <Link to={`/blog/${p.slug}`} className="group block py-6 pr-4 no-underline">
                    <span className="ip-label-sm">{p.date}</span>
                    <span className="mt-2 block text-[20px] font-semibold leading-[1.25] text-black group-hover:underline underline-offset-4 decoration-1">{p.title}</span>
                    <span className="mt-2 block text-[15px] leading-[1.55] text-ip-body">{p.subtitle}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </SiteLayout>
  );
};

export default BlogPostPage;
