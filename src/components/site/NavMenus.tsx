/**
 * Dropdown contents for the header (Capabilities, Solutions, Resources).
 * One source for the desktop panels and the mobile accordion, so the two
 * never drift. Data: capabilities.ts, data/products.ts, site.ts resourcesNav.
 */
import { Link } from "react-router-dom";
import { capabilities } from "@/content/capabilities";
import { resourcesNav, type MenuId, type NavLinkItem } from "@/content/site";
import { flags } from "@/content/flags";
import { PRODUCTS } from "@/data/products";
import { cn } from "@/lib/utils";

const products = PRODUCTS.filter((p) => p.id === "inclever" || flags.pipelineIQ).sort((a) => (a.id === "inclever" ? -1 : 1));

const stepSwatch: Record<string, string> = {
  grey: "bg-ip-grey-100 border-ip-rule-dashed",
  orange: "bg-ip-orange border-ip-orange",
  black: "bg-black border-black",
};

/** Flat link list per menu (mobile accordion, tests). */
export function menuLinks(id: MenuId): NavLinkItem[] {
  if (id === "capabilities")
    return [
      ...capabilities.map((c) => ({ label: `${c.step}: ${c.name}`, to: c.path, description: c.short })),
      { label: "Learn the concepts", to: "/learn", description: "Interactive explainers and a glossary." },
    ];
  if (id === "solutions") return products.map((p) => ({ label: p.name, to: p.path, description: p.tagline }));
  return resourcesNav;
}

export const menuIntro: Record<MenuId, { title: string; body: string; overview: { label: string; to: string } }> = {
  capabilities: {
    title: "Four capabilities, one path to production AI.",
    body: "A recommended order, not a strict sequence. Open a pillar to see what it covers, what you get and where we’ve done it.",
    overview: { label: "All four capabilities", to: "/capabilities" },
  },
  solutions: {
    title: flags.pipelineIQ ? "The trust layer, from pipeline to answer." : "IncLever, our data readiness product.",
    body: flags.pipelineIQ
      ? "Two products we built to make our work faster and keep watch afterward. One checks the data arrives; the other checks it is ready for any agent."
      : "A product we built to make our work faster and keep watch afterward.",
    overview: { label: flags.pipelineIQ ? "Compare both, with demos" : "See IncLever", to: "/products" },
  },
  resources: {
    title: "Proof, explainers and evidence.",
    body: "What we’ve delivered, how the concepts work, and what the industry numbers say.",
    overview: { label: "All resources", to: "/resources" },
  },
};

function IntroColumn({ id, onNavigate }: { id: MenuId; onNavigate: () => void }) {
  const intro = menuIntro[id];
  return (
    <div className="flex flex-col gap-3 border-r border-ip-rule pr-8">
      <p className="m-0 text-[19px] font-semibold leading-[1.25] tracking-[-0.01em] text-black">{intro.title}</p>
      <p className="m-0 text-[14px] leading-[1.55] text-ip-body">{intro.body}</p>
      <Link to={intro.overview.to} onClick={onNavigate} className="ip-link mt-auto pt-2 text-[14px] font-medium">
        {intro.overview.label}
      </Link>
    </div>
  );
}

function CapabilitiesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[260px_1fr] gap-8">
      <IntroColumn id="capabilities" onNavigate={onNavigate} />
      <div>
        <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-1 p-0">
          {capabilities.map((c) => (
            <li key={c.id}>
              <Link to={c.path} onClick={onNavigate} className="group flex gap-3 rounded-md p-3 no-underline hover:bg-ip-grey focus-visible:bg-ip-grey">
                <span aria-hidden="true" className={cn("mt-1.5 inline-block h-2.5 w-2.5 shrink-0 rounded-[2px] border", stepSwatch[c.tone])} />
                <span className="flex flex-col gap-0.5">
                  <span className="ip-label-sm">{c.step}</span>
                  <span className="text-[15px] font-semibold leading-[1.3] text-black group-hover:underline underline-offset-4 decoration-1">{c.name}</span>
                  <span className="text-[13.5px] leading-[1.45] text-ip-body">{c.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-ip-rule px-3 pt-4 text-[14px]">
          <span className="text-ip-muted">New to the terms?</span>
          <Link to="/context-engineering" onClick={onNavigate} className="ip-link text-[14px]">
            Context engineering, explained
          </Link>
          <Link to="/learn" onClick={onNavigate} className="ip-link text-[14px]">
            Learn the concepts
          </Link>
        </div>
      </div>
    </div>
  );
}

function SolutionsPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[260px_1fr] gap-8">
      <IntroColumn id="solutions" onNavigate={onNavigate} />
      <ul className={cn("m-0 grid list-none gap-6 p-0", products.length > 1 && "grid-cols-2")}>
        {products.map((p) => (
          <li key={p.id} className={cn("flex flex-col rounded-lg border p-5", p.id === "inclever" ? "border-ip-orange" : "border-ip-rule-strong")}>
            <span className="ip-label-sm">{p.kicker}</span>
            <Link to={p.path} onClick={onNavigate} className="mt-1.5 text-[20px] font-semibold leading-[1.2] tracking-[-0.01em] text-black no-underline hover:underline underline-offset-4 decoration-1">
              {p.name}
            </Link>
            <span className="mt-1 text-[15px] font-medium leading-[1.35] text-black">{p.tagline}</span>
            <span className="mt-2 text-[13.5px] leading-[1.5] text-ip-body">{p.brief}</span>
            <span className="mt-2 text-[13px] leading-[1.45] text-ip-muted">{p.audience}</span>
            <span className="mt-4 flex flex-wrap gap-x-5 gap-y-1 pt-1 text-[14px]">
              <Link to={p.path} onClick={onNavigate} className="ip-link text-[14px] font-medium">
                How it works
              </Link>
              <Link to={`${p.path}#demo`} onClick={onNavigate} className="ip-link text-[14px]">
                See the demo
              </Link>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ResourcesPanel({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-[260px_1fr] gap-8">
      <IntroColumn id="resources" onNavigate={onNavigate} />
      <ul className="m-0 grid list-none grid-cols-2 gap-x-6 gap-y-0.5 p-0 xl:grid-cols-3">
        {resourcesNav.map((r) => (
          <li key={r.to}>
            <Link to={r.to} onClick={onNavigate} className="group flex flex-col gap-0.5 rounded-md p-3 no-underline hover:bg-ip-grey focus-visible:bg-ip-grey">
              <span className="text-[15px] font-semibold leading-[1.3] text-black group-hover:underline underline-offset-4 decoration-1">{r.label}</span>
              <span className="text-[13.5px] leading-[1.45] text-ip-body">{r.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MenuPanel({ id, onNavigate }: { id: MenuId; onNavigate: () => void }) {
  if (id === "capabilities") return <CapabilitiesPanel onNavigate={onNavigate} />;
  if (id === "solutions") return <SolutionsPanel onNavigate={onNavigate} />;
  return <ResourcesPanel onNavigate={onNavigate} />;
}
