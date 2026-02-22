import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, CalendarDays, Share2, ArrowUp, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import PageLayout from "@/components/PageLayout";
import { blogPosts, BlogSection, BlogImage } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";

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
      {image.caption}{" "}
      <a
        href={image.creditUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline not-italic"
      >
        Photo by {image.credit}
      </a>
    </figcaption>
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

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: post.title, url: window.location.href });
    } else {
      await navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <PageLayout>
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
              {post.heroImage.caption}{" "}
              <a
                href={post.heroImage.creditUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline not-italic"
              >
                Photo by {post.heroImage.credit}
              </a>
            </figcaption>
          </figure>
        </div>

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

          {/* Image credits */}
          <div className="mt-12 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-2 font-mono uppercase tracking-wider">Image Credits</p>
            <ul className="space-y-1">
              {[post.heroImage, ...post.sections.filter(s => s.image).map(s => s.image!)].map((img, i) => (
                <li key={i} className="text-xs text-muted-foreground">
                  <a href={img.creditUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    {img.credit}
                  </a>
                  {" "}— {img.alt} · via Unsplash
                </li>
              ))}
            </ul>
          </div>
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
