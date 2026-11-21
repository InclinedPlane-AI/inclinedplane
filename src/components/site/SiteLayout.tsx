import type { ReactNode } from "react";
import SEOHead from "@/components/SEOHead";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

/**
 * Page shell for the revamp. `seo` keeps the tab title in sync during SPA
 * navigation; crawler-facing metadata comes from scripts/seo-config.mjs
 * (mirror any change there).
 */
export function SiteLayout({
  children,
  seo,
}: {
  children: ReactNode;
  /** `title` without the " | InclinedPlane" suffix (SEOHead adds it, except on "/"). */
  seo: { title: string; description: string; path: string; noIndex?: boolean };
}) {
  return (
    <div className="min-h-screen bg-white font-sans text-black">
      <SEOHead
        title={seo.title}
        description={seo.description}
        path={seo.path}
        noIndex={seo.noIndex}
      />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
