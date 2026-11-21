/**
 * Long-form article building blocks (blog posts, thesis). Light brand system:
 * thin rules, mono labels, orange only as a fill/accent (never small text).
 * Renders every BlogSection type in src/data/blogPosts.ts.
 */
import { useEffect, useState } from "react";
import type { BlogImage, BlogSection } from "@/data/blogPosts";
import { cn } from "@/lib/utils";

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[’'"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}

/* ------------------------------------------------------------ Images */

function Credit({ image }: { image: BlogImage }) {
  if (!image.credit) return null;
  return (
    <>
      {" "}
      <a href={image.creditUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-black">
        Photo by {image.credit}
      </a>
    </>
  );
}

export function ArticleImage({ image, hero = false }: { image: BlogImage; hero?: boolean }) {
  const artwork = image.layout === "artwork";
  return (
    <figure className={cn("m-0", hero ? "" : "my-10")}>
      <div className={cn("overflow-hidden rounded-lg border border-ip-rule bg-ip-grey", artwork && "mx-auto max-w-[560px]")}>
        <img
          src={image.src}
          alt={image.alt}
          loading={hero ? "eager" : "lazy"}
          className={cn("block w-full", artwork ? "h-auto" : hero ? "aspect-[21/9] object-cover" : "h-auto object-cover")}
        />
      </div>
      <figcaption className={cn("mt-3 text-[14px] leading-[1.5] text-ip-muted", artwork && "mx-auto max-w-[560px]")}>
        {image.caption}
        <Credit image={image} />
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------ Blocks */

function Takeaways({ section }: { section: BlogSection }) {
  return (
    <aside className="my-10 rounded-lg border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-6 sm:p-7">
      <p className="ip-label-sm m-0 mb-4">{section.title ?? "Key takeaways"}</p>
      <ul className="m-0 !list-none space-y-3 !p-0">
        {section.items?.map((item, i) => (
          <li key={i} className="flex gap-3 text-[17px] leading-[1.6] text-black">
            <span aria-hidden="true" className="mt-[11px] inline-block h-2 w-2 shrink-0 bg-ip-orange" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Comparison({ section }: { section: BlogSection }) {
  const columns = section.columns ?? [];
  return (
    <figure className="my-10">
      {section.title && <figcaption className="ip-label-sm mb-3">{section.title}</figcaption>}
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse text-left text-[15px]">
          <thead>
            <tr className="border-b-2 border-black">
              <th scope="col" className="w-[22%] py-3 pr-4" />
              {columns.map((c) => (
                <th key={c} scope="col" className="py-3 pr-4 text-[16px] font-semibold text-black">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {section.rows?.map((row) => (
              <tr key={row.label} className="border-b border-ip-rule align-top">
                <th scope="row" className="ip-label-sm py-4 pr-4 !font-normal !text-ip-body">
                  {row.label}
                </th>
                {row.values.map((v, i) => (
                  <td key={i} className="py-4 pr-4 leading-[1.55] text-ip-body">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="space-y-3 sm:hidden">
        {section.rows?.map((row) => (
          <div key={row.label} className="border-t border-ip-rule-strong pt-4">
            <p className="ip-label-sm m-0 mb-3">{row.label}</p>
            <dl className="m-0 space-y-2.5">
              {row.values.map((v, i) => (
                <div key={i}>
                  <dt className="text-[15px] font-semibold text-black">{columns[i]}</dt>
                  <dd className="m-0 text-[15px] leading-[1.55] text-ip-body">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </figure>
  );
}

function Steps({ section }: { section: BlogSection }) {
  // A genuine sequence, so numbering is allowed here.
  return (
    <ol className="my-10 !list-none border-t-2 border-black !p-0">
      {section.entries?.map((entry, i) => (
        <li key={i} className="grid grid-cols-[40px_1fr] gap-3 border-b border-ip-rule py-5">
          <span className="font-mono text-[13px] font-semibold text-ip-muted">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="m-0 text-[18px] font-semibold text-black">{entry.title}</p>
            <p className="mt-1.5 mb-0 text-[17px] leading-[1.65] text-ip-body">{entry.content}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Cards({ section }: { section: BlogSection }) {
  return (
    <div className="my-10 grid grid-cols-1 border-t-2 border-black sm:grid-cols-2">
      {section.entries?.map((entry, i) => (
        <div key={i} className={cn("border-b border-ip-rule-strong py-5", i % 2 === 0 ? "sm:pr-6" : "sm:border-l sm:pl-6")}>
          <p className="m-0 text-[18px] font-semibold text-black">{entry.title}</p>
          <p className="mt-2 mb-0 text-[16px] leading-[1.6] text-ip-body">{entry.content}</p>
        </div>
      ))}
    </div>
  );
}

function Code({ section }: { section: BlogSection }) {
  return (
    <figure className="my-10 overflow-hidden rounded-lg border border-ip-rule-strong bg-ip-grey">
      <figcaption className="ip-label-sm border-b border-ip-rule px-4 py-2.5">{section.title ?? section.language}</figcaption>
      <pre className="m-0 overflow-x-auto p-4 font-mono text-[13px] leading-[1.6] text-black sm:p-5">
        <code className="!bg-transparent !p-0">{section.content}</code>
      </pre>
    </figure>
  );
}

export function SectionBlock({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      return section.level === 3 ? (
        <h3 id={section.content ? slugify(section.content) : undefined}>{section.content}</h3>
      ) : (
        <h2 id={section.content ? slugify(section.content) : undefined} className="scroll-mt-28">
          {section.content}
        </h2>
      );
    case "paragraph":
      return <p>{section.content}</p>;
    case "quote":
      return (
        <blockquote className="!my-10 text-[clamp(20px,2vw,24px)] leading-[1.45]">
          <p className="m-0">{section.content}</p>
        </blockquote>
      );
    case "image":
      return section.image ? <ArticleImage image={section.image} /> : null;
    case "list":
      return (
        <ul>
          {section.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div className="!my-10 border-l-[3px] border-ip-orange bg-ip-grey px-6 py-5">
          <p className="m-0 text-[18px] font-medium leading-[1.6] text-black">{section.content}</p>
        </div>
      );
    case "takeaways":
      return <Takeaways section={section} />;
    case "comparison":
      return <Comparison section={section} />;
    case "steps":
      return <Steps section={section} />;
    case "cards":
      return <Cards section={section} />;
    case "code":
      return <Code section={section} />;
    default:
      return null;
  }
}

/* ------------------------------------------------------------ TOC + progress */

export interface TocItem {
  id: string;
  label: string;
}

/** Highlights the section currently in view. */
export function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function Toc({ items, title = "On this page" }: { items: TocItem[]; title?: string }) {
  const active = useActiveHeading(items.map((i) => i.id));
  if (items.length < 3) return null;
  return (
    <nav aria-label="Table of contents">
      <p className="ip-label-sm m-0 mb-3">{title}</p>
      <ol className="m-0 list-none border-l border-ip-rule p-0">
        {items.map((it) => (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={active === it.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-[14px] leading-[1.4] no-underline transition-colors duration-150",
                active === it.id ? "border-ip-orange font-medium text-black" : "border-transparent text-ip-muted hover:text-black",
              )}
            >
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Mobile/tablet TOC: a native disclosure, so it works without JS. */
export function TocDisclosure({ items }: { items: TocItem[] }) {
  if (items.length < 3) return null;
  return (
    <details className="group mb-8 border-y border-ip-rule-strong lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[15px] font-semibold [&::-webkit-details-marker]:hidden">
        On this page
        <span aria-hidden="true" className="relative h-3.5 w-3.5">
          <span className="absolute left-0 top-1/2 h-0.5 w-3.5 -translate-y-1/2 bg-black" />
          <span className="absolute left-1/2 top-0 h-3.5 w-0.5 -translate-x-1/2 bg-black transition-transform duration-200 group-open:scale-y-0" />
        </span>
      </summary>
      <ol className="m-0 list-none space-y-2 p-0 pb-4">
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="text-[15px] text-ip-body no-underline hover:text-black hover:underline">
              {it.label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

/** Thin orange reading-progress bar under the sticky header. transform-only, no layout shift. */
export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setP(total > 0 ? Math.min(1, window.scrollY / total) : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  return (
    <div aria-hidden="true" data-print-hidden className="pointer-events-none fixed inset-x-0 top-[76px] z-40 h-[2px]">
      <div className="h-full origin-left bg-ip-orange" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}
