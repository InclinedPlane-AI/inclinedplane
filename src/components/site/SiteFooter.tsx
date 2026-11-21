/**
 * Footer: logo, tagline, office line (verify), link groups, full-width brand
 * pattern strip (one of the two allowed uses of the strip), legal row.
 */
import { Link } from "react-router-dom";
import { footerNav, legalNav, site } from "@/content/site";
import { Verified } from "./primitives";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer data-site-footer className="bg-white border-t border-ip-rule">
      <div className="ip-container flex flex-wrap justify-between gap-x-12 gap-y-10 py-12 md:py-16">
        <div className="flex max-w-[340px] flex-col gap-3.5">
          <img src="/brand/logo-primary.png" alt={site.name} width={101} height={30} className="h-[30px] w-auto self-start" loading="lazy" />
          <p className="m-0 text-[17px] font-semibold text-black">{site.tagline}</p>
          <p className="m-0 text-[14px] leading-[1.6] text-ip-muted">
            Enterprise data foundations for the AI era.{" "}
            <Verified item={site.office}>
              <span>{site.office.line}</span>
            </Verified>
          </p>
          <p className="m-0 text-[14px] leading-[1.6] text-ip-muted">
            <a className="ip-link font-medium" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
        <nav aria-label="Footer" className="grid grow grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4 max-w-[820px]">
          {footerNav.map((group) => (
            <div key={group.title}>
              <p className="ip-label-sm m-0 mb-3">{group.title}</p>
              <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-[14px]">
                {group.links.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-ip-body no-underline hover:text-black hover:underline underline-offset-4">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <img src="/brand/pattern-strip.png" alt="" aria-hidden="true" width={1737} height={1421} loading="lazy" className="block h-[88px] w-full object-cover object-[30%_42%]" />
      <div className="ip-container flex flex-wrap items-center justify-between gap-4 py-6">
        <p className="ip-label-sm m-0 !text-ip-muted">
          © {year} {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-5 text-[13px]">
          {legalNav.map((l) => (
            <Link key={l.to} to={l.to} className="text-ip-muted no-underline hover:text-black">
              {l.label}
            </Link>
          ))}
          <a href={site.linkedin} target="_blank" rel="noopener" className="text-ip-muted no-underline hover:text-black">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
