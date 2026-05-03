/* ============================================================================
 *  ⚠️  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  IMPORTANT: This component NO LONGER produces the SEO output that crawlers
 *  read. As of 2026-05-03, all crawler-facing SEO (title, description,
 *  canonical, OG/Twitter tags, JSON-LD) is baked into per-route static HTML
 *  by scripts/prerender.mjs at build time.
 *
 *  This component now exists ONLY to keep the browser tab and document state
 *  in sync during in-app SPA navigation (e.g. clicking a Link from /services
 *  to /about should update the tab title for the user). It does not, and must
 *  not, be relied on for crawler visibility.
 *
 *  The page-level `jsonLd` and `article` props are accepted for API
 *  compatibility with existing pages but intentionally NOT applied at runtime
 *  — duplicating them client-side would produce two competing JSON-LD
 *  payloads when a crawler that does execute JS visits the page. The
 *  build-time copy is canonical.
 *
 *  If Lovable / Cursor / any AI assistant proposes re-adding runtime JSON-LD
 *  injection here: REJECT the change. The build-time output in
 *  scripts/seo-config.mjs is the source of truth.
 *
 *  Pair file: scripts/seo-config.mjs (build-time per-route metadata)
 *  Pair file: scripts/prerender.mjs (consumer)
 *  Pair file: index.html (template with <!--SEO_HEAD--> placeholder)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { useEffect } from "react";

const SITE_URL = "https://inclinedplane.com";
const SITE_NAME = "Inclined Plane";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
  // Accepted for backwards compatibility with existing page call sites; not
  // applied at runtime. See guardrail header.
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  article?: {
    publishedTime: string;
    author: string;
    tags: string[];
  };
}

const setMeta = (attr: string, key: string, content: string) => {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const setLink = (rel: string, href: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

const SEOHead = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noIndex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = fullTitle;

    setMeta("name", "description", description);
    setMeta("name", "author", SITE_NAME);

    setLink("canonical", canonicalUrl);

    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");

    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta(
        "name",
        "robots",
        "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      );
    }
  }, [title, description, path, ogImage, ogType, noIndex]);

  return null;
};

export default SEOHead;
