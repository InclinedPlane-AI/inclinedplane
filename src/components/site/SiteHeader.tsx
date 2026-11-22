/**
 * Sticky header (founder design): stacked logo, primary nav, "Book an
 * assessment". Height stays constant on scroll (no layout shift); it gains a
 * hairline shadow instead. Below 1024px the nav collapses into a menu panel.
 *
 * Capabilities, Solutions and Resources open a full-width panel on hover or
 * focus (contents in NavMenus.tsx); the label itself still links to the hub
 * page. The chevron button opens the panel for keyboard and touch users;
 * Escape closes it. In the mobile menu each one is an accordion.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { mainNav, site, type MainNavItem, type MenuId } from "@/content/site";
import { MenuPanel, menuLinks } from "./NavMenus";
import { useBooking } from "./booking/BookingProvider";
import { buttonClass } from "./primitives";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { open } = useBooking();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<MenuId | null>(null);
  const [mobileOpen, setMobileOpen] = useState<MenuId | null>(null);
  const closeTimer = useRef<number>();
  const navRef = useRef<HTMLDivElement>(null);

  const openPanel = useCallback((id: MenuId) => {
    window.clearTimeout(closeTimer.current);
    setPanel(id);
  }, []);
  const closePanelSoon = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setPanel(null), 140);
  }, []);
  const closePanel = useCallback(() => {
    window.clearTimeout(closeTimer.current);
    setPanel(null);
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      const trigger = navRef.current?.querySelector<HTMLButtonElement>(`[data-menu-trigger="${panel}"]`);
      closePanel();
      trigger?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel, closePanel]);

  const isActive = (item: MainNavItem) => {
    const p = location.pathname;
    if (p === item.to || p.startsWith(`${item.to}/`)) return true;
    return item.menu ? menuLinks(item.menu).some((l) => p === l.to || p.startsWith(`${l.to}/`)) : false;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setPanel(null);
    setMobileOpen(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      data-site-header
      className={cn(
        "sticky top-0 z-50 bg-white border-b border-ip-rule transition-shadow duration-200",
        scrolled && "shadow-[0_1px_0_rgba(0,0,0,0.04),0_8px_24px_-16px_rgba(0,0,0,0.25)]",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <div className="ip-container flex h-16 items-center justify-between gap-4 lg:h-[76px] lg:gap-8">
        <Link to="/" className="flex min-h-[44px] shrink-0 items-center" aria-label={`${site.name} home`}>
          <img src="/brand/logo-primary.png" alt={site.name} width={115} height={34} className="block h-[30px] w-auto lg:h-[34px]" />
        </Link>

        <div
          ref={navRef}
          className="hidden lg:flex items-center gap-[clamp(14px,1.6vw,26px)]"
          onMouseLeave={closePanelSoon}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) closePanel();
          }}
        >
          <nav aria-label="Main" className="flex items-center gap-[clamp(14px,1.6vw,26px)] text-[15px]">
            {mainNav.map((item) => {
              const active = isActive(item);
              const linkCls = cn(
                "no-underline whitespace-nowrap transition-colors duration-150 hover:text-black underline-offset-[6px] decoration-ip-orange decoration-2",
                active ? "text-black underline" : "text-ip-body",
              );
              if (!item.menu) {
                return (
                  <NavLink key={item.to} to={item.to} className={linkCls} onMouseEnter={closePanelSoon}>
                    {item.label}
                  </NavLink>
                );
              }
              const id = item.menu;
              const expanded = panel === id;
              return (
                <div key={item.to} className="flex items-center" onMouseEnter={() => openPanel(id)}>
                  <Link to={item.to} className={cn(linkCls, expanded && "text-black")}>
                    {item.label}
                  </Link>
                  <button
                    type="button"
                    data-menu-trigger={id}
                    aria-expanded={expanded}
                    aria-controls={`menu-${id}`}
                    onClick={() => (expanded ? closePanel() : openPanel(id))}
                    className="-mr-1 ml-0.5 flex h-8 w-6 items-center justify-center rounded text-ip-muted hover:text-black"
                  >
                    <span className="sr-only">{expanded ? `Close ${item.label} menu` : `Open ${item.label} menu`}</span>
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn("transition-transform duration-200", expanded && "rotate-180")}>
                      <path d="M2.5 4.5L6 8l3.5-3.5" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </nav>
          <button type="button" onClick={() => open({ source: "header" })} className={buttonClass("primary", "md", "px-4 xl:px-5")} data-cta="header">
            {site.cta.header}
          </button>

          {panel && (
            <div
              id={`menu-${panel}`}
              onMouseEnter={() => openPanel(panel)}
              className="absolute inset-x-0 top-full border-b border-ip-rule bg-white shadow-[0_24px_40px_-28px_rgba(0,0,0,0.35)]"
            >
              <div className="ip-container py-8">
                <MenuPanel id={panel} onNavigate={closePanel} />
              </div>
            </div>
          )}
        </div>

        <div className="flex lg:hidden items-center gap-2">
          <button type="button" onClick={() => open({ source: "header-mobile" })} className={buttonClass("primary", "md", "min-h-[40px] px-3.5 py-2 text-[14px]")} data-cta="header-mobile">
            <span className="hidden min-[400px]:inline">{site.cta.header}</span>
            <span className="min-[400px]:hidden">Book</span>
          </button>
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-11 w-11 items-center justify-center rounded-md hover:bg-ip-grey"
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <>
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div id="site-menu" className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 z-50 overflow-y-auto overscroll-contain bg-white border-t border-ip-rule">
          <nav aria-label="Main" className="ip-container flex flex-col py-4">
            {mainNav.map((item) => {
              const rowCls = cn("py-4 text-[20px] font-medium no-underline", isActive(item) ? "text-black" : "text-ip-body");
              if (!item.menu) {
                return (
                  <NavLink key={item.to} to={item.to} className={cn("border-b border-ip-rule", rowCls)}>
                    {item.label}
                  </NavLink>
                );
              }
              const id = item.menu;
              const expanded = mobileOpen === id;
              return (
                <div key={item.to} className="border-b border-ip-rule">
                  <div className="flex items-center justify-between">
                    <Link to={item.to} className={cn(rowCls, "grow")}>
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-controls={`m-menu-${id}`}
                      onClick={() => setMobileOpen(expanded ? null : id)}
                      className="flex h-11 w-11 items-center justify-center rounded-md text-ip-body hover:bg-ip-grey"
                    >
                      <span className="sr-only">{expanded ? `Hide ${item.label} links` : `Show ${item.label} links`}</span>
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className={cn("transition-transform duration-200", expanded && "rotate-180")}>
                        <path d="M2.5 4.5L6 8l3.5-3.5" />
                      </svg>
                    </button>
                  </div>
                  {expanded && (
                    <ul id={`m-menu-${id}`} className="m-0 mb-3 list-none border-l-2 border-ip-orange p-0 pl-4">
                      {menuLinks(id).map((l) => (
                        <li key={l.to}>
                          <Link to={l.to} className="flex flex-col gap-0.5 py-2.5 no-underline">
                            <span className="text-[16px] font-medium text-black">{l.label}</span>
                            <span className="text-[14px] leading-[1.4] text-ip-muted">{l.description}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                open({ source: "menu" });
              }}
              className={buttonClass("primary", "lg", "mt-6 w-full")}
            >
              {site.cta.primary}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
