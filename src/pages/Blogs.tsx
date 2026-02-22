import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import { blogPosts, allTags } from "@/data/blogPosts";
import { Badge } from "@/components/ui/badge";

const Blogs = () => {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? blogPosts.filter((p) => p.tags.includes(activeTag))
    : blogPosts;

  return (
    <PageLayout>
      <PageHero
        label="Blog"
        title={<>Thinking in <span className="text-gradient-orange">Systems</span></>}
        subtitle="Deep dives into data engineering, AI strategy, and the architecture of competitive advantage."
      />

      {/* Tag filter */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 -mt-4 mb-12">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
              !activeTag
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
            }`}
          >
            All Posts
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                activeTag === tag
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Blog cards */}
      <section className="max-w-5xl mx-auto px-6 lg:px-8 pb-24">
        <div className="flex flex-col gap-10">
          {filtered.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block glass-panel overflow-hidden rounded-xl hover:border-primary/30 transition-all duration-300"
              >
                {/* Hero image */}
                <div className="relative overflow-hidden aspect-[21/9]">
                  <img
                    src={post.heroImage.src}
                    alt={post.heroImage.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">{post.date}</span>
                    <span className="text-muted-foreground/40">·</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={12} /> {post.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 sm:p-7">
                  <div className="flex flex-wrap gap-2 mb-3">
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

                  <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors font-blog-heading">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {post.subtitle}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      By <span className="text-foreground font-medium">{post.author.name}</span>
                    </span>
                    <span className="text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
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
