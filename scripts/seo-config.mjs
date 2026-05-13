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
      "AI-ready data platforms, observability-first pipelines, and decision systems for modern enterprises. Data engineering consultancy.",
    titleTemplate: "raw", // homepage uses title verbatim, no " | Inclined Plane" suffix
    noscriptSummary:
      "Inclined Plane is an AI-native data engineering consultancy. We build cloud data warehouses, observability-first pipelines, BI platforms, and decision systems for modern enterprises. Services span data engineering, AI automation, business intelligence, cloud warehousing, and DataOps. Production case studies across retail, pharma, energy, EV, FMCG, manufacturing, e-commerce, and public sector.",
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
    noscriptSummary:
      "Our thesis: data is infrastructure, intelligence is product. Modern enterprises need engineering-grade data systems with first-class observability, automated pipelines, governed warehouses, and decision systems built from source to intelligence. This page is a deep technical manifesto on how Inclined Plane builds them.",
  },
  {
    path: "/services",
    title: "Data Engineering Services",
    description:
      "Cloud data warehousing, BI modernization, DataOps, AI automation workflows, and observability-first pipeline engineering. Enterprise-grade data services.",
    noscriptSummary:
      "Services: cloud data warehousing (Snowflake, BigQuery, Databricks, Microsoft Fabric), BI modernization (Power BI, Tableau, Looker), DataOps (CI/CD for data, lineage, quality), AI automation workflows, and observability-first pipeline engineering. End-to-end data engineering for enterprises.",
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
    noscriptSummary:
      "Industries served: retail and e-commerce, finance, healthcare, manufacturing, energy and industrial, SaaS, BPO and customer operations, and education. Deep vertical expertise paired with engineering-grade data infrastructure.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Industries We Serve",
        url: `${SITE_URL}/industries`,
        description:
          "Vertical expertise areas served by Inclined Plane: retail, finance, healthcare, manufacturing, energy, SaaS, BPO, and education.",
        about: [
          "Retail",
          "Finance",
          "Healthcare",
          "Manufacturing",
          "Energy",
          "SaaS",
          "BPO",
          "Education",
        ].map((name) => ({ "@type": "Thing", name })),
      },
    ],
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "14 production case studies across retail, pharma, energy, EV, FMCG, manufacturing, and e-commerce — real outcomes from AI-native data engineering.",
    noscriptSummary:
      "14 production case studies: retail and manufacturing chain analytics, EV battery predictive maintenance, EV fleet scheduling, FMCG distribution, pharma sales BI, pharma MNC field force, e-commerce inventory and procurement, energy audit, VC-funded EdTech, demand forecasting, capital equipment ERP, solar BI, cultural heritage public sector, and ERP unification.",
  },
  {
    path: "/about",
    title: "About Inclined Plane",
    description:
      "From Sail Analytics to Inclined Plane — our evolution into an AI-native data engineering firm. Meet the team building decision systems for modern enterprises.",
    noscriptSummary:
      "Inclined Plane evolved from Sail Analytics into an AI-native data engineering firm. Headquartered with operations across India and the United States, partnering with cloud platforms (AWS, Azure, Microsoft Fabric) to deliver decision systems for high-velocity enterprises.",
  },
  {
    path: "/blog",
    title: "Blog — Insights on Data Engineering & AI",
    description:
      "Expert insights on data engineering, AI automation, DataOps, business intelligence, and building modern data platforms. By the Inclined Plane team.",
    noscriptSummary:
      "Long-form essays on data engineering strategy, AI automation, DataOps, business intelligence, observability, and the architecture of competitive advantage. Written by the Inclined Plane team.",
  },
  {
    path: "/careers",
    title: "Careers — Build the Future of Data & AI",
    description:
      "Join InclinedPlane to build AI-native data systems for high-velocity enterprises. Remote-first, ownership-driven, engineering rigor.",
    noscriptSummary:
      "Careers at Inclined Plane. Remote-first, ownership-driven, engineering-rigor culture. We hire data engineers, analytics engineers, ML engineers, BI engineers, and platform engineers who want to build production AI-native data systems.",
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with Inclined Plane for data engineering consulting, AI automation, and cloud warehouse architecture. Book a discovery call today.",
    noscriptSummary:
      "Contact Inclined Plane. Email support@inclinedplane.com for data engineering consulting, AI automation, cloud warehouse architecture, BI modernization, or DataOps engagements. Offices in India and Delaware, USA. Book a discovery call.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Inclined Plane",
        url: `${SITE_URL}/contact`,
      },
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: SITE_URL,
        email: "support@inclinedplane.com",
        priceRange: "$$$$",
        areaServed: "Worldwide",
        description:
          "Data engineering, AI automation, cloud warehouse architecture, BI modernization, and DataOps consultancy.",
      },
    ],
  },
  {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "How Inclined Plane collects, uses, and protects your personal information. Read our commitment to data privacy and transparency.",
    noscriptSummary:
      "Privacy policy describing the personal information Inclined Plane collects, how it is used, how it is protected, and your rights as a data subject.",
    noIndex: true,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms governing the use of Inclined Plane's data engineering and AI consulting services. Clear and fair business terms.",
    noscriptSummary:
      "Terms of service governing the use of Inclined Plane's data engineering and AI consulting services and this website.",
    noIndex: true,
  },
  {
    path: "/cookies",
    title: "Cookie Policy",
    description:
      "How Inclined Plane uses cookies and tracking technologies on our website. Manage your cookie preferences.",
    noscriptSummary:
      "Cookie policy describing the cookies and tracking technologies Inclined Plane uses on this website and how to manage your preferences.",
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
  // Capture each post object up to the closing brace before the next slug
  // or array end. Author block is parsed in a second pass per match because
  // its `linkedin` field is optional and adding it to the main regex makes
  // the whole pattern fragile.
  const re =
    /slug:\s*"([^"]+)",\s*\n\s*title:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*subtitle:\s*"((?:[^"\\]|\\.)*)",\s*\n\s*date:\s*"([^"]+)"([\s\S]*?)tags:\s*\[([\s\S]*?)\]/g;
  const authorRe =
    /author:\s*\{\s*name:\s*"((?:[^"\\]|\\.)*)"\s*,\s*role:\s*"((?:[^"\\]|\\.)*)"(?:\s*,\s*linkedin:\s*"([^"]+)")?/;
  const out = [];
  for (const m of src.matchAll(re)) {
    const [, slug, title, subtitle, date, between, tagsRaw] = m;
    if (slug === "string") continue; // skip the interface field declaration
    const tags = [...tagsRaw.matchAll(/"([^"]+)"/g)].map((t) => t[1]);
    const am = between.match(authorRe);
    const author = am
      ? {
          name: unescapeQuotes(am[1]),
          role: unescapeQuotes(am[2]),
          linkedin: am[3] || null,
        }
      : null;
    out.push({
      slug,
      title: unescapeQuotes(title),
      subtitle: unescapeQuotes(subtitle),
      date,
      tags,
      author,
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
      noscriptSummary: r.noscriptSummary ?? `${r.title}. ${r.description}`,
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
      noscriptSummary: `${post.title}. ${post.subtitle} Published ${post.date}. Tags: ${post.tags.join(", ")}.`,
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
          author: post.author
            ? {
                "@type": "Person",
                name: post.author.name,
                jobTitle: post.author.role,
                worksFor: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
                ...(post.author.linkedin
                  ? { sameAs: [post.author.linkedin] }
                  : {}),
              }
            : { "@type": "Organization", name: SITE_NAME },
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
    const fullTitle = `${cs.title} | ${SITE_NAME}`;
    routes.push({
      path,
      fullTitle,
      description: cs.summary,
      noscriptSummary: `${cs.title}. Industry: ${cs.industry}. ${cs.summary}`,
      ogImage,
      ogType: "article",
      noIndex: false,
      jsonLd: [
        orgSchema,
        webSiteSchema,
        breadcrumbSchema(path, cs.title),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          name: cs.title,
          headline: cs.title,
          about: cs.industry,
          description: cs.summary,
          url: `${SITE_URL}${path}`,
          publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          mainEntityOfPage: `${SITE_URL}${path}`,
        },
      ],
    });
  }

  return routes;
}
