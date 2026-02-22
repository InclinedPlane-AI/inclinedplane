import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Linkedin } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import { blogPosts, allTags } from "@/data/blogPosts";

const Blogs = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts;

  return (
    <PageLayout>
      <SEOHead
        title="Blog — Insights on Data Engineering & AI"
        description="Expert insights on data engineering, AI automation, DataOps, business intelligence, and building modern data platforms. By the Inclined Plane team."
        path="/blog"
      />
      <PageHero
        label="Blog"
        title={<>Thinking in <span className="text-gradient-orange">Systems</span></>}
        subtitle="Deep dives into data engineering, AI strategy, and the architecture of competitive advantage."
      />

      {/* Tag filter */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3.5 py-1 rounded-md text-xs font-medium transition-all ${
              !activeTag
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3.5 py-1 rounded-md text-xs font-medium transition-all ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Blog cards — Medium-style horizontal layout */}
      <section className="max-w-4xl mx-auto px-6 lg:px-8 pb-24">
        <div className="flex flex-col divide-y divide-border">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="py-7 first:pt-0"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group flex gap-5 sm:gap-8 items-start"
              >
                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground/80 flex items-center gap-1.5">
                      {post.author.name}
                      {post.author.linkedin && (
                        <a href={post.author.linkedin} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="text-muted-foreground hover:text-primary transition-colors">
                          <Linkedin size={12} />
                        </a>
                      )}
                    </span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>

                  <h2 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2 hidden sm:block">
                    {post.subtitle}
                  </p>

                  <div className="flex items-center gap-3 flex-wrap">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground tracking-wide uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={11} /> {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Thumbnail */}
                <div className="shrink-0 w-24 h-24 sm:w-36 sm:h-28 rounded-lg overflow-hidden">
                  <img
                    src={post.heroImage.src}
                    alt={post.heroImage.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No posts found for this tag.</p>
            <button
              onClick={() => setActiveTag(null)}
              className="mt-3 text-primary text-sm hover:underline"
            >
              Clear filter
            </button>
          </div>
        )}
      </section>
    </PageLayout>
  );
};

export default Blogs;
