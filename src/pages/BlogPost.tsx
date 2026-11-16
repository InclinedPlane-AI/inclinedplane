import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, Share2, ArrowUp, Linkedin, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import { blogPosts, BlogSection, BlogImage } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";

const ImageCredit = ({ image }: { image: BlogImage }) =>
  image.credit ? (
    <a
      href={image.creditUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:underline not-italic"
    >
      Photo by {image.credit}
    </a>
  ) : null;

const ImageBlock = ({ image }: { image: BlogImage }) => (
  <figure className="my-8 sm:my-12 -mx-4 sm:mx-0">
    <div className="overflow-hidden rounded-none sm:rounded-xl">
      <img
        src={image.src}
        alt={image.alt}
        className="w-full object-cover"
        loading="lazy"
      />
    </div>
    <figcaption className="mt-3 px-4 sm:px-0 text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
      {image.caption} <ImageCredit image={image} />
    </figcaption>
  </figure>
);

const TakeawaysBlock = ({ section }: { section: BlogSection }) => (
  <aside className="my-8 sm:my-10 rounded-xl border border-primary/30 bg-primary/[0.06] p-5 sm:p-7">
    <p className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-primary mb-4">
      <Lightbulb size={14} /> {section.title ?? "Key takeaways"}
    </p>
    <ul className="space-y-3">
      {section.items?.map((item, i) => (
        <li key={i} className="flex gap-3 font-blog-body text-[15px] sm:text-base text-foreground leading-relaxed">
          <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
            {i + 1}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </aside>
);

const ComparisonBlock = ({ section }: { section: BlogSection }) => {
  const columns = section.columns ?? [];
  return (
    <figure className="my-8 sm:my-10">
      {section.title && (
        <figcaption className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground mb-3">
          {section.title}
        </figcaption>
      )}
      {/* Desktop: table */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-border">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/60">
              <th className="w-[22%] p-4" />
              {columns.map((c, i) => (
                <th
                  key={c}
                  className={`p-4 font-blog-heading text-base font-bold ${i === columns.length - 1 ? "text-primary" : "text-foreground"}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows?.map((row) => (
              <tr key={row.label} className="border-t border-border align-top">
                <th className="p-4 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className="p-4 font-blog-body text-[15px] text-secondary-foreground leading-relaxed">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile: stacked cards */}
      <div className="sm:hidden space-y-3">
        {section.rows?.map((row) => (
          <div key={row.label} className="rounded-xl border border-border p-4">
            <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3">{row.label}</p>
            <dl className="space-y-2.5">
              {row.values.map((v, i) => (
                <div key={i}>
                  <dt className={`text-sm font-semibold ${i === columns.length - 1 ? "text-primary" : "text-foreground"}`}>
                    {columns[i]}
                  </dt>
                  <dd className="font-blog-body text-[15px] text-secondary-foreground leading-relaxed">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </figure>
  );
};

const StepsBlock = ({ section }: { section: BlogSection }) => (
  <ol className="my-8 sm:my-10 relative">
    {section.entries?.map((entry, i, arr) => (
      <li key={i} className="relative flex gap-4 sm:gap-5 pb-7 last:pb-0">
        {i < arr.length - 1 && (
          <span className="absolute left-[17px] top-10 bottom-0 w-px bg-border" aria-hidden />
        )}
        <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-background font-mono text-sm font-semibold text-primary">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="pt-1">
          <p className="font-blog-heading text-lg font-bold text-foreground mb-1.5">{entry.title}</p>
          <p className="font-blog-body text-base sm:text-[17px] text-secondary-foreground leading-[1.75]">{entry.content}</p>
        </div>
      </li>
    ))}
  </ol>
);

const CardsBlock = ({ section }: { section: BlogSection }) => (
  <div className="my-8 sm:my-10 grid gap-4 sm:grid-cols-2">
    {section.entries?.map((entry, i) => (
      <div
        key={i}
        className="group rounded-xl border border-border bg-muted/30 p-5 transition-colors hover:border-primary/40"
      >
        <span className="block h-[3px] w-8 rounded-full bg-gradient-orange mb-4 transition-all group-hover:w-14" />
        <p className="font-blog-heading text-lg font-bold text-foreground mb-2">{entry.title}</p>
        <p className="font-blog-body text-[15px] text-secondary-foreground leading-relaxed">{entry.content}</p>
      </div>
    ))}
  </div>
);

const CodeBlock = ({ section }: { section: BlogSection }) => (
  <figure className="my-8 sm:my-10 -mx-4 sm:mx-0 overflow-hidden sm:rounded-xl border-y sm:border border-border bg-muted/40">
    <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
      <span className="flex gap-1.5" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
      </span>
      <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
        {section.title ?? section.language}
      </span>
    </div>
    <pre className="overflow-x-auto p-4 sm:p-5 text-[13px] leading-relaxed font-mono text-foreground">
      <code>{section.content}</code>
    </pre>
  </figure>
);

const SectionBlock = ({ section }: { section: BlogSection }) => {
  switch (section.type) {
    case "heading":
      return section.level === 3 ? (
        <h3 className="font-blog-heading text-lg sm:text-xl font-bold text-foreground mt-8 mb-3">
          {section.content}
        </h3>
      ) : (
        <h2 className="font-blog-heading text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mt-12 mb-4 border-l-2 border-primary pl-4">
          {section.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="font-blog-body text-base sm:text-lg text-secondary-foreground leading-[1.85] mb-5">
          {section.content}
        </p>
      );
    case "quote":
      return (
        <blockquote className="my-8 sm:my-10 relative pl-5 sm:pl-6 border-l-2 border-primary">
          <p className="font-blog-heading text-lg sm:text-xl text-foreground italic leading-relaxed">
            {section.content}
          </p>
        </blockquote>
      );
    case "image":
      return section.image ? <ImageBlock image={section.image} /> : null;
    case "list":
      return (
        <ul className="my-6 space-y-3 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex gap-3 font-blog-body text-base sm:text-lg text-secondary-foreground leading-[1.85]">
              <span className="text-primary mt-1.5 text-xs shrink-0">●</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="my-8 sm:my-10 glass-panel rounded-xl p-5 sm:p-7 border-l-4 border-primary">
          <p className="font-blog-body text-base sm:text-lg text-foreground leading-[1.75] font-medium">
            {section.content}
          </p>
        </div>
      );
    case "takeaways":
      return <TakeawaysBlock section={section} />;
    case "comparison":
      return <ComparisonBlock section={section} />;
    case "steps":
      return <StepsBlock section={section} />;
    case "cards":
      return <CardsBlock section={section} />;
    case "code":
      return <CodeBlock section={section} />;
    default:
      return null;
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setShowTop(scrolled > 400);
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  if (!post) return <Navigate to="/blog" replace />;

  const creditedImages = [
    post.heroImage,
    ...post.sections.filter((s) => s.image).map((s) => s.image!),
  ].filter((img) => img.credit);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageLayout>
      <SEOHead
        title={post.title}
        description={post.subtitle}
        path={`/blog/${post.slug}`}
        ogType="article"
        article={{
          publishedTime: post.date,
          author: post.author.name,
          tags: post.tags,
        }}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.subtitle,
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: post.author.name,
            ...(post.author.linkedin ? { url: post.author.linkedin } : {}),
          },
          publisher: {
            "@type": "Organization",
            name: "InclinedPlane",
            url: "https://inclinedplane.com",
          },
          mainEntityOfPage: `https://inclinedplane.com/blog/${post.slug}`,
          keywords: post.tags.join(", "),
        }}
      />
      {/* Progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-[2px] bg-border/30">
        <motion.div
          className="h-full bg-gradient-orange"
          style={{ width: `${progress}%` }}
        />
      </div>

      <article className="pt-24 sm:pt-28 pb-20">
        {/* Header */}
        <header className="max-w-3xl mx-auto px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="flex flex-wrap gap-2 mb-5">
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-[10px] font-mono tracking-wider uppercase"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="font-blog-heading text-2xl sm:text-3xl lg:text-[2.75rem] font-bold text-foreground leading-[1.15] mb-4">
            {post.title}
          </h1>
          <p className="font-blog-body text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
            {post.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground pb-8 border-b border-border mb-8">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} /> {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} /> {post.readTime}
            </span>
            <span className="flex items-center gap-1.5">
              By <span className="text-foreground font-medium">{post.author.name}</span>
              {post.author.linkedin && (
                <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin size={14} />
                </a>
              )}
              {post.author.role && (
                <span className="text-muted-foreground"> · {post.author.role}</span>
              )}
            </span>
            <button
              onClick={handleShare}
              className="ml-auto flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Share2 size={14} /> Share
            </button>
          </div>
        </header>

        {/* Hero image */}
        {post.heroImage.layout === "artwork" ? (
          <div className="max-w-3xl mx-auto px-6 lg:px-8 mb-10">
            <figure>
              <div className="mx-auto max-w-xl overflow-hidden rounded-xl border border-border shadow-[0_20px_60px_-25px_hsl(var(--primary)/0.45)]">
                <img
                  src={post.heroImage.src}
                  alt={post.heroImage.alt}
                  className="w-full h-auto block"
                />
              </div>
              <figcaption className="mt-4 mx-auto max-w-xl text-center text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                {post.heroImage.caption} <ImageCredit image={post.heroImage} />
              </figcaption>
            </figure>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-0 sm:px-6 lg:px-8 mb-10">
            <figure>
              <div className="overflow-hidden sm:rounded-xl">
                <img
                  src={post.heroImage.src}
                  alt={post.heroImage.alt}
                  className="w-full object-cover aspect-[2/1] sm:aspect-[21/9]"
                />
              </div>
              <figcaption className="mt-3 px-6 sm:px-0 text-xs sm:text-sm text-muted-foreground italic leading-relaxed">
                {post.heroImage.caption} <ImageCredit image={post.heroImage} />
              </figcaption>
            </figure>
          </div>
        )}

        {/* Body content */}
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          {post.sections.map((section, i) => (
            <SectionBlock key={i} section={section} />
          ))}

          {/* End divider */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Written by</p>
                <p className="text-foreground font-medium flex items-center gap-2">
                  {post.author.name}
                  {post.author.linkedin && (
                    <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin size={15} />
                    </a>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
              <Link
                to="/contact"
                className="bg-gradient-orange text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Work with us
              </Link>
            </div>
          </div>

          {/* Image credits (only for credited third-party photos) */}
          {creditedImages.length > 0 && (
          <div className="mt-12 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">Image Credits</p>
            <ul className="space-y-1">
              {creditedImages.map((img, i) => (
                <li key={i} className="text-xs text-muted-foreground">
                  <a href={img.creditUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {img.credit}
                  </a>
                  {" "}, {img.alt} · via Unsplash
                </li>
              ))}
            </ul>
          </div>
          )}
        </div>
      </article>

      {/* Back to top */}
      {showTop && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 glass-panel-strong p-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </PageLayout>
  );
};

export default BlogPostPage;
