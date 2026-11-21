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
export const SITE_NAME = "InclinedPlane";
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
  alternateName: "Sail Analytics",
  url: SITE_URL,
  logo: `${SITE_URL}/brand/logo-primary-large.png`,
  slogan: "Data Engineered. Intelligence Deployed.",
  description:
    "InclinedPlane is a data engineering and AI readiness firm. We modernize enterprise data platforms on the stack clients already have, then make the data trusted, contextualized and ready for AI agents.",
  founder: {
    "@type": "Person",
    name: "Keerthana Vayyasi",
    jobTitle: "Founder and CEO",
    sameAs: ["https://www.linkedin.com/in/keerthanavayyasi/"],
  },
  knowsAbout: [
    "Data engineering",
    "Data governance",
    "Enterprise context engineering",
    "Semantic layers",
    "AI readiness",
    "AI agent readiness",
    "Agentic analytics",
    "Microsoft Fabric",
    "Databricks",
    "Azure",
  ],
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

export function breadcrumbSchema(path, title, parent) {
  const items = [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
  ];
  if (parent) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: parent.name,
      item: `${SITE_URL}${parent.path}`,
    });
  }
  if (path !== "/") {
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
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

// ---------------------------------------------------------------------------
// Capability pages — parsed from src/content/capabilities.ts (same regex
// approach as the data files below) so titles, descriptions and the FAQPage
// JSON-LD always match what the pages render. FAQs tagged with a proposed
// flag are included only when that flag is on in src/content/flags.ts.
// ---------------------------------------------------------------------------

const STR = '"((?:[^"\\\\]|\\\\.)*)"';

function parseFlags() {
  const src = readData("src/content/flags.ts");
  const out = {};
  for (const m of src.matchAll(/^\s*(\w+):\s*(true|false),/gm)) out[m[1]] = m[2] === "true";
  return out;
}

function parseCapabilities() {
  const src = readData("src/content/capabilities.ts");
  const flags = parseFlags();
  const body = src.slice(src.indexOf("export const capabilities"));
  const blocks = body.split(/\n  \{\n    id: "/).slice(1);
  return blocks.map((b) => {
    const get = (key) => {
      const m = b.match(new RegExp(`\\n    ${key}:\\s*\\n?\\s*${STR}`));
      return m ? unescapeQuotes(m[1]) : "";
    };
    const seo = b.match(new RegExp(`seo:\\s*\\{\\s*title:\\s*${STR},\\s*description:\\s*\\n?\\s*${STR}`));
    const faq = [];
    for (const m of b.matchAll(new RegExp(`q:\\s*${STR},\\s*a:\\s*\\n?\\s*${STR},?(?:\\s*flag:\\s*"(\\w+)")?`, "g"))) {
      if (m[3] && !flags[m[3]]) continue;
      faq.push({ q: unescapeQuotes(m[1]), a: unescapeQuotes(m[2]) });
    }
    return {
      id: b.slice(0, b.indexOf('"')),
      step: get("step"),
      name: get("name"),
      path: get("path"),
      short: get("short"),
      promise: get("promise"),
      problem: get("problem"),
      outcome: get("outcome"),
      seoTitle: seo ? unescapeQuotes(seo[1]) : get("name"),
      seoDescription: seo ? unescapeQuotes(seo[2]) : get("promise"),
      faq,
    };
  });
}

const CAPABILITIES = parseCapabilities();

const CAPABILITY_OFFERS = CAPABILITIES.map((c) => ({
  "@type": "Offer",
  itemOffered: {
    "@type": "Service",
    name: c.name,
    serviceType: c.name,
    description: c.short,
    url: `${SITE_URL}${c.path}`,
    provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  },
}));

const CAPABILITY_ROUTES = CAPABILITIES.map((c) => ({
  path: c.path,
  title: c.seoTitle,
  description: c.seoDescription,
  breadcrumbParent: { name: "Capabilities", path: "/capabilities" },
  noscriptSummary: `${c.name} (${c.step}). ${c.promise} ${c.problem} Outcome: ${c.outcome}`,
  pageJsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: c.name,
      serviceType: c.name,
      description: c.seoDescription,
      url: `${SITE_URL}${c.path}`,
      areaServed: ["United States", "United Kingdom", "Europe"],
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    },
    ...(c.faq.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map(({ q, a }) => ({
              "@type": "Question",
              name: q,
              acceptedAnswer: { "@type": "Answer", text: a },
            })),
          },
        ]
      : []),
  ],
}));

const staticRoutes = [
  {
    // Mirrors src/pages/Index.tsx (founder's homepage) and src/content/site.ts.
    path: "/",
    title: "InclinedPlane: Enterprise Data Foundations for the AI Era",
    description:
      "We engineer and modernize enterprise data platforms on the stack you already have, then make them trusted, contextualized and ready for AI agents.",
    titleTemplate: "raw", // homepage uses title verbatim, no " | InclinedPlane" suffix
    noscriptSummary:
      "InclinedPlane is a data engineering and AI readiness firm. We modernize enterprise data platforms on Microsoft Azure and Fabric, Databricks, AWS and Snowflake, then make the data trusted, contextualized and ready for AI agents. Four capabilities on one path: Data Engineering and Governance (Build), Enterprise Context Engineering (Contextualize), AI and Agent Readiness (Enable, accelerated by IncLever) and Agentic Analytics and BI (Activate). We work with CIOs, CDOs and heads of data at mid-to-large enterprises in the US, UK and Europe. Start with a 45-minute AI Data Readiness Assessment.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: SITE_NAME,
        url: SITE_URL,
        slogan: "Data Engineered. Intelligence Deployed.",
        description:
          "Data engineering and AI readiness firm: modernizes enterprise data platforms on the client's existing stack and makes the data trusted, contextualized and ready for AI agents.",
        areaServed: ["United States", "United Kingdom", "Europe"],
        makesOffer: CAPABILITY_OFFERS,
      },
    ],
  },
  {
    path: "/thesis",
    title: "Our Thesis — The Architecture of Intelligence",
    description:
      "Why modern enterprises need observable, automated data platforms. Our thesis on building decision systems from source to intelligence.",
    noscriptSummary:
      "Our thesis: data is infrastructure, intelligence is product. Modern enterprises need engineering-grade data systems with first-class observability, automated pipelines, governed warehouses, and decision systems built from source to intelligence. This page is a deep technical manifesto on how InclinedPlane builds them.",
  },
  {
    // Mirrors src/pages/Capabilities.tsx. /services 301s here (vercel.json).
    path: "/capabilities",
    title: "Capabilities: from data foundation to AI agents",
    description:
      "Data engineering and governance, context engineering, AI and agent readiness, and agentic analytics: four capabilities on one path to production AI.",
    noscriptSummary:
      "Four capabilities on one path to production AI, in a recommended order rather than a strict sequence. Build: Data Engineering and Governance. Contextualize: Enterprise Context Engineering. Enable: AI and Agent Readiness, accelerated by IncLever. Activate: Agentic Analytics and BI. Engagements start with a free 45-minute AI data readiness conversation.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        name: "InclinedPlane capabilities",
        itemListElement: CAPABILITY_OFFERS,
      },
    ],
  },
  ...CAPABILITY_ROUTES,
  {
    // Mirrors src/pages/Products.tsx (hub) and the two product pages below.
    // Product facts come from the PipelineIQ project reference and the
    // Inclever product walkthrough (claims register honoured: no client
    // names, no unverified performance figures).
    path: "/products",
    title: "Products — PipelineIQ & Inclever",
    description:
      "PipelineIQ: read-only pipeline monitoring and ETL debugging. Inclever: governed AI analytics with an AI Readiness Control Tower that audits whether your data is fit for AI.",
    noscriptSummary:
      "InclinedPlane products. PipelineIQ is a read-only monitoring, alerting and ETL-debugging portal for data engineers and platform teams that turns hundreds of pipeline failures into a handful of root causes. Inclever is governed AI analytics for business users and analysts: people ask plain-English questions in Microsoft Teams and Inclever answers only when the data has earned it, backed by an AI Readiness Control Tower that audits and certifies data for AI.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "InclinedPlane products",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "PipelineIQ", url: `${SITE_URL}/products/pipelineiq` },
          { "@type": "ListItem", position: 2, name: "Inclever", url: `${SITE_URL}/products/inclever` },
        ],
      },
    ],
  },
  {
    path: "/products/pipelineiq",
    title: "PipelineIQ — Pipeline Monitoring & ETL Debugging",
    description:
      "PipelineIQ is a read-only monitoring, alerting and ETL-debugging portal that turns hundreds of pipeline failures into a handful of root causes, with adaptive alerts that close themselves.",
    noscriptSummary:
      "PipelineIQ is a read-only monitoring, alerting and ETL-debugging portal for enterprise data platforms, built for data engineers and platform teams: engineers on support, platform leads, release managers, ingestion and warehouse owners. It merges failures from the run log, orchestrator and compute engine into one error history, separates root causes from cascaded failures, and groups them into error signatures with the real stack trace and links to the exact run. Twelve kinds of alert, all adaptive (each table judged against its own history) or rolled up per environment, update while a problem lasts and close themselves when it clears. It installs nothing in the client estate, enforces read-only SQL in code, never scans warehouse table data, and keeps data local. It is delivered through a forward-deployed engineering model: a stable core plus a client layer built for each estate.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "PipelineIQ",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Data pipeline observability",
        operatingSystem: "Web",
        url: `${SITE_URL}/products/pipelineiq`,
        description:
          "Read-only monitoring, alerting and ETL-debugging portal for enterprise data platforms. Merges failures across tools into root-cause error signatures with adaptive, self-resolving alerts.",
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
    ],
  },
  {
    path: "/products/inclever",
    title: "Inclever — Governed AI Analytics & AI Readiness",
    description:
      "Inclever answers plain-English data questions in Microsoft Teams only when your data has earned it, backed by an AI Readiness Control Tower that audits and certifies data for AI.",
    noscriptSummary:
      "Inclever is governed AI analytics, built for business users and analysts (with finance leadership, heads of data and audit teams relying on and governing it). People ask plain-English questions in Microsoft Teams; every question is matched only against defined metrics, confirmed with the user, then passes three gates in order (entitlement, answerability, assurance) before a number is given. Answers carry their evidence; otherwise Inclever holds the answer for a named reviewer or refuses with the specific failing check and routes a task to a named owner with a clock. Its AI Readiness Control Tower (ARCT) continuously audits data assets and business definitions in seven stages, records Passed, Failed or Not evaluated verdicts with coverage, and issues or withholds readiness certificates that expire automatically. When a blocking rule fails, every question downstream is held automatically.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Inclever",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Governed AI analytics",
        operatingSystem: "Web",
        url: `${SITE_URL}/products/inclever`,
        description:
          "Governed AI analytics. Plain-English questions in Microsoft Teams, answered only after entitlement, answerability and assurance checks, backed by an AI Readiness Control Tower that audits and certifies data for AI use.",
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          ["Does Inclever replace our BI tool?", "No. It answers from your existing signed-off dashboards first, and only generates an answer when nothing already built covers the question."],
          ["Can the AI make up a metric or a number?", "It is designed not to. The AI can only select from metrics, dimensions and time windows you have defined, and every selection is validated. Numbers come from your data through those definitions, not from the model."],
          ["What happens when the data has a problem?", "The audit verdicts decide. A blocking issue stops Inclever answering on that data and names the failing check; lesser issues mean the answer is held for review or marked provisional. Each case raises a task for the data owner."],
          ["Will someone learn anything about data they are not allowed to see?", "No. Permission is checked first, before anything about the data's state is read, so a refusal reveals nothing about the number."],
          ["Is every conversation auditable?", "Yes. Every question, gate decision, refusal, task and exception is written to a permanent decision record you can replay in Monitor."],
        ].map(([q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
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
          "Vertical expertise areas served by InclinedPlane: retail, finance, healthcare, manufacturing, energy, SaaS, BPO, and education.",
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
    title: "About InclinedPlane",
    description:
      "From Sail Analytics to InclinedPlane — our evolution into an AI-native data engineering firm. Meet the team building decision systems for modern enterprises.",
    noscriptSummary:
      "InclinedPlane evolved from Sail Analytics into an AI-native data engineering firm. Headquartered with operations across India and the United States, partnering with cloud platforms (AWS, Azure, Microsoft Fabric) to deliver decision systems for high-velocity enterprises.",
  },
  {
    path: "/blog",
    title: "Blog — Insights on Data Engineering & AI",
    description:
      "Expert insights on data engineering, AI automation, DataOps, business intelligence, and building modern data platforms. By the InclinedPlane team.",
    noscriptSummary:
      "Long-form essays on data engineering strategy, AI automation, DataOps, business intelligence, observability, and the architecture of competitive advantage. Written by the InclinedPlane team.",
  },
  {
    path: "/careers",
    title: "Careers — Build the Future of Data & AI",
    description:
      "Join InclinedPlane to build AI-native data systems for high-velocity enterprises. Remote-first, ownership-driven, engineering rigor.",
    noscriptSummary:
      "Careers at InclinedPlane. Remote-first, ownership-driven, engineering-rigor culture. We hire data engineers, analytics engineers, ML engineers, BI engineers, and platform engineers who want to build production AI-native data systems.",
  },
  {
    path: "/contact",
    title: "Contact Us",
    description:
      "Get in touch with InclinedPlane for data engineering consulting, AI automation, and cloud warehouse architecture. Book a discovery call today.",
    noscriptSummary:
      "Contact InclinedPlane. Email support@inclinedplane.com for data engineering consulting, AI automation, cloud warehouse architecture, BI modernization, or DataOps engagements. Offices in India and Delaware, USA. Book a discovery call.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact InclinedPlane",
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
      "How InclinedPlane collects, uses, and protects your personal information. Read our commitment to data privacy and transparency.",
    noscriptSummary:
      "Privacy policy describing the personal information InclinedPlane collects, how it is used, how it is protected, and your rights as a data subject.",
    noIndex: true,
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms governing the use of InclinedPlane's data engineering and AI consulting services. Clear and fair business terms.",
    noscriptSummary:
      "Terms of service governing the use of InclinedPlane's data engineering and AI consulting services and this website.",
    noIndex: true,
  },
  {
    path: "/cookies",
    title: "Cookie Policy",
    description:
      "How InclinedPlane uses cookies and tracking technologies on our website. Manage your cookie preferences.",
    noscriptSummary:
      "Cookie policy describing the cookies and tracking technologies InclinedPlane uses on this website and how to manage your preferences.",
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
        breadcrumbSchema(r.path, r.title, r.breadcrumbParent),
        ...(r.pageJsonLd ?? []),
      ],
    });
  }

  // Blog posts — /blog/:slug
  const posts = parseBlogPosts();
  for (const post of posts) {
    const path = `/blog/${post.slug}`;
    // Blog post titles are long-form; appending " | InclinedPlane" pushes
    // the SERP title past Google's ~60-char cutoff. Use the title verbatim
    // — the brand still appears in the breadcrumb/site-name SERP feature.
    const fullTitle = post.title;
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
    // Same reasoning as blog posts — case study titles can be long.
    const fullTitle = cs.title;
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
