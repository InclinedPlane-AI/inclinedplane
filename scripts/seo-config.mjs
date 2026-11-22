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

/** FAQ items from `export const <name>: FaqItem[] = [...]` in a content file, flag-aware. */
function parseFaq(relPath, exportName) {
  const src = readData(relPath);
  const start = src.indexOf(`export const ${exportName}`);
  if (start < 0) return [];
  const end = src.indexOf("\n];", start);
  const body = src.slice(start, end);
  const flags = parseFlags();
  const out = [];
  for (const m of body.matchAll(new RegExp(`q:\\s*${STR},\\s*a:\\s*\\n?\\s*${STR},?(?:\\s*flag:\\s*"(\\w+)")?`, "g"))) {
    if (m[3] && !flags[m[3]]) continue;
    out.push({ q: unescapeQuotes(m[1]), a: unescapeQuotes(m[2]) });
  }
  return out;
}

function faqPage(items) {
  return items.length
    ? [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map(({ q, a }) => ({
            "@type": "Question",
            name: q,
            acceptedAnswer: { "@type": "Answer", text: a },
          })),
        },
      ]
    : [];
}

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

// ---------------------------------------------------------------------------
// Learn articles + glossary — parsed from src/content/learn.ts.
// ---------------------------------------------------------------------------

function parseLearn() {
  const src = readData("src/content/learn.ts");
  const arts = src.slice(src.indexOf("export const learnArticles"), src.indexOf("export const learnBySlug"));
  const articles = arts.split(/\n  \{\n    slug: "/).slice(1).map((b) => {
    const get = (key) => {
      const m = b.match(new RegExp(`\\n    ${key}:\\s*\\n?\\s*${STR}`));
      return m ? unescapeQuotes(m[1]) : "";
    };
    return {
      slug: b.slice(0, b.indexOf('"')),
      title: get("title"),
      definition: get("definition"),
      description: get("description"),
      datePublished: get("datePublished"),
      dateModified: get("dateModified"),
    };
  });
  const gsrc = src.slice(src.indexOf("export const glossary"));
  const glossary = [...gsrc.matchAll(new RegExp(`id:\\s*"([^"]+)",\\s*term:\\s*${STR},\\s*definition:\\s*\\n?\\s*${STR}`, "g"))].map(
    (m) => ({ id: m[1], term: unescapeQuotes(m[2]), definition: unescapeQuotes(m[3]) }),
  );
  return { articles, glossary };
}

const LEARN = parseLearn();

// Revamp titles for case studies (outcome-led, used as the page h1).
function parseCaseMetaTitles() {
  const src = readData("src/content/caseStudyMeta.ts");
  return new Map(
    [...src.matchAll(new RegExp(`"([a-z0-9-]+)":\\s*\\{\\s*id:\\s*"[^"]+",\\s*title:\\s*${STR}`, "g"))].map((m) => [
      m[1],
      unescapeQuotes(m[2]),
    ]),
  );
}
const CASE_META_TITLES = parseCaseMetaTitles();

const LEARN_ROUTES = LEARN.articles.map((a) => ({
  path: `/learn/${a.slug}`,
  title: a.title,
  description: a.description,
  breadcrumbParent: { name: "Learn", path: "/learn" },
  noscriptSummary: `${a.title} ${a.definition} ${a.description}`,
  ogType: "article",
  pageJsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: a.title,
      description: a.description,
      datePublished: a.datePublished,
      dateModified: a.dateModified || a.datePublished,
      author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/logo-primary-large.png` },
      },
      mainEntityOfPage: `${SITE_URL}/learn/${a.slug}`,
    },
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
    title: "Our thesis: data is infrastructure, intelligence is product",
    description:
      "Why enterprises need observable, automated data platforms before AI can work, and how InclinedPlane builds them from source to decision.",
    noscriptSummary:
      "Our thesis: data is infrastructure and intelligence is product. Enterprises need observable, automated, governed data platforms before analytics or AI agents can be trusted. This long-form page explains the architecture layers and principles InclinedPlane builds on.",
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
    path: "/assessment",
    title: "AI Data Readiness Assessment",
    description:
      "A 45-minute AI Data Readiness Assessment with a senior engineer: quality, context, access and governance, checked against what your AI agents need.",
    noscriptSummary:
      "The AI Data Readiness Assessment checks your data against what AI agents need: quality, context, access and governance. It starts with a free 45-minute conversation with a senior engineer. A fixed-scope assessment backed by IncLever produces a scored findings report with evidence and a roadmap. Book by picking a time, then answering three optional questions. Not ready to talk? A free one-page readiness checklist is available.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI Data Readiness Assessment",
        serviceType: "AI data readiness assessment",
        url: `${SITE_URL}/assessment`,
        areaServed: ["United States", "United Kingdom", "Europe"],
        provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      ...faqPage(parseFaq("src/content/assessment.ts", "assessmentFaq")),
    ],
  },
  {
    // Mirrors src/pages/Products.tsx (hub) and the two product pages below.
    path: "/products",
    title: "Products: the trust layer, from pipeline to answer",
    description:
      "PipelineIQ checks data arrives reliably. IncLever checks it is ready for any AI agent. Two accelerators built by the engineers who deliver our work.",
    noscriptSummary:
      "InclinedPlane builds two accelerators. PipelineIQ is read-only pipeline monitoring and ETL debugging that answers \"is the data arriving reliably?\". IncLever audits and certifies data readiness and answers \"is it ready for any agent?\". Together they cover the chain from ERP sources to any AI agent.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "InclinedPlane products",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "IncLever", url: `${SITE_URL}/products/inclever` },
          { "@type": "ListItem", position: 2, name: "PipelineIQ", url: `${SITE_URL}/products/pipelineiq` },
        ],
      },
    ],
  },
  {
    path: "/products/pipelineiq",
    title: "PipelineIQ: pipeline monitoring and ETL debugging",
    breadcrumbParent: { name: "Products", path: "/products" },
    description:
      "Read-only pipeline monitoring, alerting and ETL debugging that turns hundreds of failures into a few root causes. Know each morning if data is safe to use.",
    noscriptSummary:
      "PipelineIQ is read-only pipeline monitoring, alerting and ETL debugging, currently at MVP stage. It merges failures from every tool into one de-duplicated history, separates root causes from cascades, and raises one adaptive alert per problem that closes itself. It installs nothing, runs only SELECT statements and reads operational metadata, never business data. It is delivered as a stable core plus an engineer who builds the layer for your estate.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "PipelineIQ",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Pipeline monitoring and ETL debugging",
        operatingSystem: "Web",
        url: `${SITE_URL}/products/pipelineiq`,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      ...faqPage(parseFaq("src/content/pipelineiq.ts", "piqFaq")),
    ],
  },
  {
    path: "/products/inclever",
    title: "IncLever: AI data readiness and governed analytics",
    breadcrumbParent: { name: "Products", path: "/products" },
    description:
      "IncLever audits data and definitions against explicit rules, certifies readiness with evidence, and answers questions only on data that has passed.",
    noscriptSummary:
      "IncLever is InclinedPlane's accelerator for context engineering and AI readiness. Its AI Readiness Control Tower audits data assets and business definitions in seven stages, records an evidenced verdict for every rule, and issues or withholds readiness certificates. IncLever Ask answers plain-English questions in Microsoft Teams only after entitlement, answerability and assurance checks, and turns every gap into owned work. With or without IncLever, the expertise is the same.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "IncLever",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "AI data readiness and governed AI analytics",
        operatingSystem: "Web",
        url: `${SITE_URL}/products/inclever`,
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      },
      ...faqPage(parseFaq("src/content/inclever.ts", "incleverFaq")),
    ],
  },
  {
    path: "/industries",
    title: "Industries: manufacturing, FMCG, energy, logistics, retail",
    description:
      "Data engineering and AI readiness for multi-entity businesses in manufacturing and distribution, FMCG, energy, logistics and retail.",
    noscriptSummary:
      "InclinedPlane works with multi-entity businesses where enterprise data is hardest: many operating companies, many ERPs, years of acquisitions. Manufacturing and distribution comes first, followed by FMCG, energy and utilities, logistics and supply chain, and retail. For each industry the page lists the typical data problems, the capabilities that apply and related case studies.",
  },
  {
    path: "/case-studies",
    title: "Case studies: enterprise data platforms in production",
    description:
      "Data platforms, multi-ERP models, BI and forecasting for manufacturing, FMCG, energy, logistics and retail, filterable by capability and industry.",
    noscriptSummary:
      "InclinedPlane case studies: 14 anonymized engagements across manufacturing, FMCG, energy, logistics, retail and other sectors. Featured: a multi-ERP Azure platform unifying 25 to 30 EMEA operating companies (about 100 million rows a day, new ERPs onboarded in 2 to 6 weeks) and an FMCG edible oil producer's unified sales warehouse (27% faster order turnaround, 25% better route adherence). Each case study covers the opportunity, the solution and measured impact.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "InclinedPlane case studies",
        itemListElement: parseCaseStudies().map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/case-studies/${c.id}`,
          name: (CASE_META_TITLES.get(c.id) ?? c.title).replace(/\.$/, ""),
        })),
      },
    ],
  },
  {
    path: "/about",
    title: "About us",
    description:
      "InclinedPlane is a data engineering and AI readiness firm. Who we are, what the name means, how we work, and who leads the firm.",
    noscriptSummary:
      "InclinedPlane is a data engineering and AI readiness firm. We modernize enterprise data platforms on Microsoft Azure and Fabric, Databricks, AWS and Snowflake, then make the data trusted, contextualized and ready for AI agents. Formerly Sail Analytics, the firm began in Bengaluru as an analytics practice. Its principles: engineers, not consultants; methodology over heroics. Founder and CEO: Keerthana Vayyasi.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About InclinedPlane",
        url: `${SITE_URL}/about`,
        about: { "@type": "Organization", name: SITE_NAME, alternateName: "Sail Analytics", url: SITE_URL },
      },
    ],
  },
  {
    path: "/learn",
    title: "Learn: context engineering and AI readiness",
    description:
      "Plain explanations of context engineering, semantic layers, ontologies and AI readiness, with worked examples and a glossary of the terms.",
    noscriptSummary:
      "Explainers on context engineering, the difference between ontologies, semantic layers and knowledge graphs, and what AI readiness means. Includes a glossary where each term is defined in one sentence.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        name: "InclinedPlane glossary",
        url: `${SITE_URL}/learn`,
        hasDefinedTerm: LEARN.glossary.map((g) => ({
          "@type": "DefinedTerm",
          name: g.term,
          description: g.definition,
          url: `${SITE_URL}/learn#${g.id}`,
        })),
      },
    ],
  },
  ...LEARN_ROUTES,
  {
    path: "/blog",
    title: "Insights on data engineering and AI readiness",
    description:
      "Articles from InclinedPlane engineers on data platforms, pipelines, data contracts, context and getting enterprise data ready for AI agents.",
    noscriptSummary:
      "Insights from the InclinedPlane team: articles on data platforms, pipeline reliability, data contracts, data gravity, stewardship, explainability and getting enterprise data ready for AI agents.",
  },

  {
    path: "/careers",
    title: "Careers: build data and AI foundations for enterprises",
    description:
      "Join InclinedPlane to build data platforms and AI foundations for enterprises. Ownership, engineering rigor and work that ships to production.",
    noscriptSummary:
      "Careers at InclinedPlane. We hire data engineers, analytics engineers and platform engineers to build data platforms and AI foundations for enterprises, with ownership, engineering rigor and work that ships to production.",
  },

  {
    path: "/contact",
    title: "Contact us",
    description:
      "Talk to InclinedPlane about modernizing your data platform or getting it ready for AI agents. Send a message or book an AI Data Readiness Assessment.",
    noscriptSummary:
      "Contact InclinedPlane through the project enquiry form, or book a 45-minute AI Data Readiness Assessment instead. Email support@inclinedplane.com.",
    pageJsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact InclinedPlane",
        url: `${SITE_URL}/contact`,
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

/** Meta descriptions: clip to ~155 chars at a word boundary. */
function clip(text, max = 155) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:]$/, "")}…`;
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
      ogType: r.ogType ?? "website",
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
      description: clip(post.subtitle),
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
    // Same reasoning as blog posts — case study titles can be long. Use the
    // revamp's outcome-led title (the page h1) when there is one.
    const fullTitle = (CASE_META_TITLES.get(slug) ?? cs.title).replace(/\.$/, "");
    routes.push({
      path,
      fullTitle,
      description: clip(cs.summary),
      noscriptSummary: `${cs.title}. Industry: ${cs.industry}. ${cs.summary}`,
      ogImage,
      ogType: "article",
      noIndex: false,
      jsonLd: [
        orgSchema,
        webSiteSchema,
        breadcrumbSchema(path, fullTitle, { name: "Case studies", path: "/case-studies" }),
        {
          "@context": "https://schema.org",
          "@type": "Article",
          name: fullTitle,
          headline: fullTitle,
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
