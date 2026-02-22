import { useEffect } from "react";

const SITE_URL = "https://inclinedplane.com";
const SITE_NAME = "Inclined Plane";
const DEFAULT_OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a9557b79-de54-422b-bacb-6c7b74c357e7/id-preview-a5e21ba1--1228f53a-e5fb-41e3-8d0c-b7df46f1d6b5.lovable.app-1771220993949.png";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
  noIndex?: boolean;
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
  jsonLd,
  article,
}: SEOHeadProps) => {
  useEffect(() => {
    const fullTitle = path === "/" ? title : `${title} | ${SITE_NAME}`;
    const canonicalUrl = `${SITE_URL}${path}`;

    document.title = fullTitle;

    // Standard meta
    setMeta("name", "description", description);
    setMeta("name", "author", SITE_NAME);

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("property", "og:title", fullTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", ogImage);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", "en_US");

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", fullTitle);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", ogImage);

    // Article meta
    if (article) {
      setMeta("property", "article:published_time", article.publishedTime);
      setMeta("property", "article:author", article.author);
      article.tags.forEach((tag, i) => {
        setMeta("property", `article:tag:${i}`, tag);
      });
    }

    // Robots
    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    }

    // JSON-LD
    const ldScriptId = "seo-json-ld";
    let ldEl = document.getElementById(ldScriptId) as HTMLScriptElement | null;
    const schemas = jsonLd
      ? Array.isArray(jsonLd) ? jsonLd : [jsonLd]
      : [];

    // Always include Organization + WebSite
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      description: "AI-native data engineering consultancy building decision systems, observability-first pipelines, and cloud warehouse platforms.",
      sameAs: [
        "https://www.linkedin.com/company/inclinedplane",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "hello@inclinedplane.com",
        contactType: "sales",
      },
    };

    const webSiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    };

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        ...(path !== "/"
          ? [{
              "@type": "ListItem",
              position: 2,
              name: title,
              item: canonicalUrl,
            }]
          : []),
      ],
    };

    const allSchemas = [orgSchema, webSiteSchema, breadcrumbSchema, ...schemas];

    if (!ldEl) {
      ldEl = document.createElement("script");
      ldEl.id = ldScriptId;
      ldEl.type = "application/ld+json";
      document.head.appendChild(ldEl);
    }
    ldEl.textContent = JSON.stringify(allSchemas);

    return () => {
      // Cleanup article tags on unmount
      if (article) {
        article.tags.forEach((_, i) => {
          const el = document.querySelector(`meta[property="article:tag:${i}"]`);
          el?.remove();
        });
      }
    };
  }, [title, description, path, ogImage, ogType, noIndex, jsonLd, article]);

  return null;
};

export default SEOHead;
