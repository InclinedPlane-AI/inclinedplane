/**
 * Legal page shell (privacy, terms, cookies). Restyled for the revamp; the
 * exported API (LegalLayout, Section, H3, P, ArrowList, LI, HighlightBox,
 * WarningBox, ContactBlock, A) is unchanged so the page files keep working.
 * Legal pages stay noindex. Section numbers are kept because the documents
 * cross-reference them ("see Section 14").
 */
import { ReactNode } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/sections";

export interface TocItem {
  id: string;
  num: string;
  label: string;
}

interface LegalLayoutProps {
  seoTitle: string;
  seoDescription: string;
  seoPath: string;
  title: ReactNode;
  meta: string[];
  toc: TocItem[];
  children: ReactNode;
}

export const LegalLayout = ({ seoTitle, seoDescription, seoPath, title, meta, toc, children }: LegalLayoutProps) => {
  return (
    <SiteLayout seo={{ title: seoTitle, description: seoDescription, path: seoPath, noIndex: true }}>
      <header className="border-b border-ip-rule bg-white">
        <div className="ip-container pt-[clamp(36px,5vw,64px)] pb-10">
          <Breadcrumbs items={[{ label: typeof title === "string" ? title : "Legal" }]} />
          <Label className="mb-5">Legal</Label>
          <h1 className="ip-h1-page m-0">{title}</h1>
          <dl className="mt-6 mb-0 flex flex-wrap gap-x-10 gap-y-3">
            {meta.map((m) => {
              const [k, ...rest] = m.split(":");
              const v = rest.join(":").trim();
              return (
                <div key={m}>
                  {v ? (
                    <>
                      <dt className="ip-label-sm">{k}</dt>
                      <dd className="m-0 mt-1 text-[15px] text-black">{v}</dd>
                    </>
                  ) : (
                    <dd className="m-0 text-[15px] text-black">{m}</dd>
                  )}
                </div>
              );
            })}
          </dl>
        </div>
      </header>

      <div className="ip-container py-[clamp(40px,6vw,80px)]">
        <div className="grid items-start gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block lg:sticky lg:top-[110px]">
            <p className="ip-label-sm m-0 mb-3">Contents</p>
            <nav aria-label="Contents">
              <ol className="m-0 list-none border-l border-ip-rule p-0">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px flex gap-2 border-l-2 border-transparent py-1.5 pl-4 text-[14px] leading-[1.4] text-ip-muted no-underline transition-colors hover:border-ip-orange hover:text-black"
                    >
                      <span className="font-mono text-[12px]">{item.num}</span>
                      <span>{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 max-w-[760px]">{children}</div>
        </div>
      </div>
    </SiteLayout>
  );
};

interface SectionProps {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
  last?: boolean;
}

export const Section = ({ id, num, title, children, last }: SectionProps) => (
  <section id={id} className={last ? "scroll-mt-28" : "mb-12 scroll-mt-28 border-b border-ip-rule pb-12"}>
    <h2 className="m-0 mb-5 flex items-baseline gap-3 text-[clamp(22px,2.2vw,26px)] font-semibold leading-[1.2] tracking-[-0.01em]">
      <span className="font-mono text-[13px] font-normal text-ip-muted">{num}</span>
      <span>{title}</span>
    </h2>
    <div className="space-y-4 text-[16px] leading-[1.7] text-ip-body">{children}</div>
  </section>
);

export const H3 = ({ children }: { children: ReactNode }) => <h3 className="mt-7 mb-2.5 text-[17px] font-semibold text-black">{children}</h3>;

export const P = ({ children }: { children: ReactNode }) => <p className="m-0 text-[16px] leading-[1.7] text-ip-body">{children}</p>;

export const ArrowList = ({ children }: { children: ReactNode }) => <ul className="m-0 list-none space-y-2 p-0">{children}</ul>;

export const LI = ({ children }: { children: ReactNode }) => (
  <li className="relative pl-5 text-[16px] leading-[1.65] text-ip-body before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:bg-ip-orange before:content-['']">
    {children}
  </li>
);

export const HighlightBox = ({ children }: { children: ReactNode }) => (
  <div className="mt-0 mb-10 border-l-[3px] border-ip-orange bg-ip-grey px-6 py-5">
    <p className="m-0 text-[16px] leading-[1.7] text-black">{children}</p>
  </div>
);

export const WarningBox = ({ children }: { children: ReactNode }) => (
  <div className="my-6 rounded-[8px] border border-ip-rule-strong px-6 py-5">
    <p className="m-0 text-[15px] leading-[1.7] text-ip-body">{children}</p>
  </div>
);

export const ContactBlock = ({ children }: { children: ReactNode }) => (
  <div className="mt-6 space-y-2 rounded-[8px] border border-ip-rule-strong bg-white px-6 py-6 [&_p]:text-[15px] [&_p]:text-ip-body [&_strong]:text-black">{children}</div>
);

export const A = ({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) => (
  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="ip-link font-medium">
    {children}
  </a>
);
