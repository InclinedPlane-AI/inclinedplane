/* ============================================================================
 *  ⚠️  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  This module is the single source of truth for build-time SEO output. It
 *  defines the per-route metadata and JSON-LD that scripts/prerender.mjs bakes
 *  into static HTML so search engines and AI crawlers (Googlebot, GPTBot,
 *  ClaudeBot, PerplexityBot, social previews) can read the site without
 *  executing JavaScript.
 *
 *  If Lovable / Cursor / any AI assistant proposes "cleaning up", "modernizing",
 *  or rewriting this file: REJECT the change unless it preserves
 *      - the getRoutes() contract (returns RouteSEO[])
 *      - dynamic-route discovery via parsing src/data/*.ts
 *      - the SITE_URL / SITE_NAME / DEFAULT_OG_IMAGE constants
 *      - per-route JSON-LD with Organization + WebSite + BreadcrumbList
 *
 *  Pair file: scripts/prerender.mjs (consumer of getRoutes())
 *  Pair file: index.html (must contain the <!--SEO_HEAD--> placeholder)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");

export const SITE_URL = "https://inclinedplane.com";
export const SITE_NAME = "Inclined Plane";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
export const FALLBACK_OG_IMAGE = `${SITE_URL}/favicon.png`;

// Resolves the OG image path against what actually ships in /public.
// If /public/og-image.png is missing, we fall back to /favicon.png so social
// previews still render an on-domain asset (never a Lovable preview URL).
export function resolveDefaultOgImage() {
  const ogPath = resolve(repoRoot, "public", "og-image.png");
  return existsSync(ogPath) ? DEFAULT_OG_IMAGE : FALLBACK_OG_IMAGE;
}

// ---------------------------------------------------------------------------
// Shared schemas — emitted on every page so crawlers always see Organization
// + WebSite + BreadcrumbList alongside the page-specific schema.
// ---------------------------------------------------------------------------

export const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.png`,
  description:
    "AI-native data engineering consultancy building decision systems, observability-first pipelines, and cloud warehouse platforms.",
  sameAs: ["https://www.linkedin.com/company/inclinedplane"],
  contactPoint: {
    "@type": "ContactPoint",
    email: "support@inclinedplane.com",
    contactType: "sales",
  },
};

export const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export function breadcrumbSchema(path, title) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ];
  if (path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: title,
      item: `${SITE_URL}${path}`,
    });
  }
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

// ---------------------------------------------------------------------------
// Static-route SEO config (every non-dynamic page).
// Mirrors what each page passes to <SEOHead /> — kept here so crawlers see it
// without running JS. If a page changes its title/description in source, the
// mirror here must be updated too.
// ---------------------------------------------------------------------------

const staticRoutes = [
  {
    path: "/",
    title: "Inclined Plane — AI-Native Data Engineering",
    description:
      "AI-ready data platforms, observability-first pipelines, and decision systems that turn complexity into operational intelligence. Data engineering consultancy for modern enterprises.",
    titleTemplate: "raw", // homepage uses title verbatim, no " | Inclined Plane" suffix
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE_NAME,
        description:
          "AI-native data engineering consultancy specializing in cloud data warehouses, BI modernization, DataOps, and AI automation workflows.",
        url: SITE_URL,
        priceRange: "$$$$",
        areaServed: "Worldwide",
        serviceType: [
          "Data Engineering",
          "AI Automation",
          "Business Intelligence",
          "Cloud Data Warehousing",
          "DataOps",
        ],
      },
    ],
  },
  {
    path: "/thesis",
    title: "Our Thesis — The Architecture of Intelligence",
    description:
      "Why modern enterprises need observable, automated data platforms. Our thesis on building decision systems from source to intelligence.",
  },
  {
    path: "/services",
    title: "Data Engineering Services",
    description:
      "Cloud data warehousing, BI modernization, DataOps, AI automation workflows, and observability-first pipeline engineering. Enterprise-grade data services.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        provider: { "@type": "Organization", name: SITE_NAME },
        serviceType: "Data Engineering Consulting",
        areaServed: "Worldwide",
        description:
          "End-to-end data engineering services including cloud warehouse architecture, BI modernization, DataOps, and AI automation.",
      },
    ],
  },
  {
    path: "/industries",
    title: "Industries We Serve",
    description:
      "AI-native data engineering for retail, finance, healthcare, manufacturing, energy, SaaS, BPO, and education. Industry-specific data solutions.",
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "14 production case studies across retail, pharma, energy, EV, FMCG, manufacturing, e-commerce, public sector and renewables — real outcomes from AI-native data engineering.",
  },
  {
    path: "/about",
    title: "About Inclined Plane",
    description:
      "From Sail Analytics to Inclined Plane — our evolution into an AI-native data engineering firm. Meet the team building decision systems for modern enterprises.",
  },
  {
    path: "/blog",
    title: "Blog — Insights on Data Engineering & AI",
    description:
      "Expert insights on data engineering, AI automation, DataOps, business intelligence, and building modern data platforms. By the Inclined Plane team.",
  },
  {
    path: "/careers",
    title: "Careers — Build the Future of Data & AI",
    description:
      "Join InclinedPlane to build AI-native data systems for high-velocity enterprises. Remote-first, ownership-driven, engineering rigor.",
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with Inclined Plane for data engineering consulting, AI automation, and cloud warehouse architecture. Book a discovery call today.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Inclined Plane",
        url: `${SITE_URL}/contact`,
      },
    ],
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How Inclined Plane collects, uses, and protects your personal information. Read our commitment to data privacy and transparency.",
    noIndex: true,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms governing the use of Inclined Plane's data engineering and AI consulting services. Clear and fair business terms.",
    noIndex: true,
  },
  {
    path: "/cookies",
    title: "Cookie Policy",
    description:
      "How Inclined Plane uses cookies and tracking technologies on our website. Manage your cookie preferences.",
    noIndex: true,
  },
];

// ---------------------------------------------------------------------------
// Dynamic routes — parsed from src/data/*.ts at build time so we don't have
// to keep two lists in sync. We use scoped regex (each top-level object's
// slug + title + summary/subtitle + date + tags) rather than evaluating the
// TypeScript files (which import binary assets via Vite's `@/` alias).
// ---------------------------------------------------------------------------

function readData(relPath) {
  return readFileSync(resolve(repoRoot, relPath), "utf8");
}

function parseBlogPosts() {
  const src = readData("src/data/blogPosts.ts");
  // Capture each post object up to the closing brace before the next slug or array end.
  const re =
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*subtitle:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*date:\s*"([^"]+)"[\s\S]*?tags:\s*\[([\s\S]*?)\]/g;
  const out = [];
  for (const m of src.matchAll(re)) {
    const [, slug, title, subtitle, date, tagsRaw] = m;
    if (slug === "string") continue; // skip the interface field declaration
    const tags = [...tagsRaw.matchAll(/"([^"]+)"/g)].map((t) => t[1]);
    out.push({
      slug,
      title: unescapeQuotes(title),
      subtitle: unescapeQuotes(subtitle),
      date,
      tags,
    });
  }
  return out;
}

function parseCaseStudies() {
  const src = readData("src/data/caseStudies.ts");
  const re =
    /id:\s*"([^"]+)",[\s\S]*?title:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*industry:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*summary:\s*\n?\s*"((?:[^"\\]|\\.)*)"/g;
  const out = [];
  for (const m of src.matchAll(re)) {
    const [, id, title, industry, summary] = m;
    if (id === "string") continue;
    out.push({
      id,
      title: unescapeQuotes(title),
      industry: unescapeQuotes(industry),
      summary: unescapeQuotes(summary),
    });
  }
  return out;
}

function parseCaseStudyDetailSlugs() {
  const src = readData("src/data/caseStudyDetails.ts");
  return [...src.matchAll(/slug:\s*"([^"]+)"/g)]
    .map((m) => m[1])
    .filter((s) => s !== "string");
}

function unescapeQuotes(s) {
  return s.replace(/\\"/g, '"').replace(/\\n/g, " ");
}

// ---------------------------------------------------------------------------
// Route assembly — produces the canonical RouteSEO[] consumed by prerender.
// ---------------------------------------------------------------------------

export function getRoutes() {
  const ogImage = resolveDefaultOgImage();
  const routes = [];

  for (const r of staticRoutes) {
    const fullTitle =
      r.titleTemplate === "raw" ? r.title : `${r.title} | ${SITE_NAME}`;
    routes.push({
      path: r.path,
      fullTitle,
      description: r.description,
      ogImage,
      ogType: "website",
      noIndex: !!r.noIndex,
      jsonLd: [
        orgSchema,
        webSiteSchema,
        breadcrumbSchema(r.path, r.title),
        ...(r.pageJsonLd ?? []),
      ],
    });
  }

  // Blog posts — /blog/:slug
  const posts = parseBlogPosts();
  for (const post of posts) {
    const path = `/blog/${post.slug}`;
    const fullTitle = `${post.title} | ${SITE_NAME}`;
    routes.push({
      path,
      fullTitle,
      description: post.subtitle,
      ogImage,
      ogType: "article",
      noIndex: false,
      article: {
        publishedTime: post.date,
        tags: post.tags,
      },
      jsonLd: [
        orgSchema,
        webSiteSchema,
        breadcrumbSchema(path, post.title),
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.subtitle,
          datePublished: post.date,
          keywords: post.tags.join(", "),
          author: { "@type": "Organization", name: SITE_NAME },
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            logo: { "@type": "ImageObject", url: `${SITE_URL}/favicon.png` },
          },
          mainEntityOfPage: `${SITE_URL}${path}`,
        },
      ],
    });
  }

  // Case study details — /case-studies/:slug
  const cases = parseCaseStudies();
  const detailSlugs = new Set(parseCaseStudyDetailSlugs());
  const csById = new Map(cases.map((c) => [c.id, c]));
  for (const slug of detailSlugs) {
    const cs = csById.get(slug);
    if (!cs) continue; // detail without matching summary → skip
    const path = `/case-studies/${slug}`;
    const fullTitle = `${cs.title} — Case Study | ${SITE_NAME}`;
    routes.push({
      path,
      fullTitle,
      description: cs.summary,
      ogImage,
      ogType: "article",
      noIndex: false,
      jsonLd: [
        orgSchema,
        webSiteSchema,
        breadcrumbSchema(path, cs.title),
        {
          "@context": "https://schema.org",
          "@type": "CaseStudy",
          name: cs.title,
          about: cs.industry,
          description: cs.summary,
          url: `${SITE_URL}${path}`,
          provider: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
        },
      ],
    });
  }

  return routes;
}
