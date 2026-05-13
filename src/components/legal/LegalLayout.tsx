import { ReactNode } from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";

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

export const LegalLayout = ({
  seoTitle,
  seoDescription,
  seoPath,
  title,
  meta,
  toc,
  children,
}: LegalLayoutProps) => {
  return (
    <PageLayout>
      <SEOHead title={seoTitle} description={seoDescription} path={seoPath} noIndex />
      <article className="max-w-[960px] mx-auto px-6 lg:px-10 pt-32 pb-20">
        {/* Hero */}
        <header className="pb-12 mb-12 border-b border-border">
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-6 h-px bg-primary" />
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-primary">
              Legal
            </span>
          </div>
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-6 text-foreground">
            {title}
          </h1>
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs text-muted-foreground">
            {meta.map((m) => (
              <span key={m}>
                <span className="text-primary">// </span>
                {m}
              </span>
            ))}
          </div>
        </header>

        {/* Layout grid */}
        <div className="grid lg:grid-cols-[220px_1fr] gap-16 items-start">
          <aside className="hidden lg:block sticky top-24">
            <div className="font-mono text-[10px] tracking-[0.15em] uppercase text-muted-foreground/70 mb-4">
              Contents
            </div>
            <nav className="flex flex-col">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="font-mono text-[11px] text-muted-foreground hover:text-primary py-1.5 pl-3 border-l border-border hover:border-primary transition-colors tracking-wide"
                >
                  {item.num} — {item.label}
                </a>
              ))}
            </nav>
          </aside>

          <main className="legal-content min-w-0">{children}</main>
        </div>
      </article>
    </PageLayout>
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
  <section
    id={id}
    className={
      last
        ? "scroll-mt-32"
        : "scroll-mt-32 mb-14 pb-14 border-b border-border"
    }
  >
    <h2 className="flex items-baseline gap-3 font-bold text-2xl tracking-tight text-foreground mb-5">
      <span className="font-mono text-[11px] font-normal text-primary tracking-wider">
        {num}
      </span>
      <span>{title}</span>
    </h2>
    <div className="space-y-4 text-[15px] leading-[1.8] text-muted-foreground">
      {children}
    </div>
  </section>
);

export const H3 = ({ children }: { children: ReactNode }) => (
  <h3 className="font-semibold text-[15px] text-foreground mt-7 mb-2.5 tracking-tight">
    {children}
  </h3>
);

export const P = ({ children }: { children: ReactNode }) => (
  <p className="text-[15px] leading-[1.8] text-muted-foreground">{children}</p>
);

export const ArrowList = ({ children }: { children: ReactNode }) => (
  <ul className="space-y-1.5 list-none p-0">{children}</ul>
);

export const LI = ({ children }: { children: ReactNode }) => (
  <li className="relative pl-5 text-[15px] leading-[1.7] text-muted-foreground before:content-['→'] before:absolute before:left-0 before:top-0 before:text-primary before:text-xs before:leading-[1.7] before:mt-[3px]">
    {children}
  </li>
);

export const HighlightBox = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-primary/25 bg-primary/10 px-6 py-5 my-6">
    <p className="text-sm leading-[1.75] text-foreground">{children}</p>
  </div>
);

export const WarningBox = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-border border-l-[3px] border-l-primary bg-muted/30 px-6 py-5 my-6">
    <p className="font-mono text-[13px] leading-[1.7] text-muted-foreground">
      {children}
    </p>
  </div>
);

export const ContactBlock = ({ children }: { children: ReactNode }) => (
  <div className="rounded-lg border border-border bg-card px-6 py-6 mt-6 space-y-2 [&_p]:font-mono [&_p]:text-xs [&_p]:text-muted-foreground [&_strong]:text-foreground">
    {children}
  </div>
);

export const A = ({ href, children, external }: { href: string; children: ReactNode; external?: boolean }) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className="text-primary hover:underline"
  >
    {children}
  </a>
);