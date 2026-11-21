/**
 * Sticky header (founder design): stacked logo, primary nav, "Book an
 * assessment". Height stays constant on scroll (no layout shift); it gains a
 * hairline shadow instead. Below 1024px the nav collapses into a menu panel.
 */
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { mainNav, site } from "@/content/site";
import { useBooking } from "./booking/BookingProvider";
import { buttonClass } from "./primitives";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { open } = useBooking();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

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
      <div className="ip-container flex h-[76px] items-center justify-between gap-8">
        <Link to="/" className="flex items-center shrink-0" aria-label={`${site.name} home`}>
          <img src="/brand/logo-primary.png" alt={site.name} width={115} height={34} className="block h-[34px] w-auto" />
        </Link>

        <nav aria-label="Main" className="hidden lg:flex items-center gap-6 text-[15px]">
          {mainNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/capabilities"}
              className={({ isActive }) =>
                cn(
                  "no-underline transition-colors duration-150 hover:text-black underline-offset-[6px] decoration-ip-orange decoration-2",
                  isActive ? "text-black underline" : "text-ip-body",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <button type="button" onClick={() => open({ source: "header" })} className={buttonClass("primary", "md")} data-cta="header">
            {site.cta.header}
          </button>
        </nav>

        <div className="flex lg:hidden items-center gap-2">
          <button type="button" onClick={() => open({ source: "header-mobile" })} className={buttonClass("primary", "md", "px-4 text-[14px] hidden sm:inline-flex")}>
            {site.cta.header}
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
        <div id="site-menu" className="lg:hidden fixed inset-x-0 top-[77px] bottom-0 z-50 overflow-y-auto bg-white border-t border-ip-rule">
          <nav aria-label="Main" className="ip-container flex flex-col py-4">
            {mainNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn("border-b border-ip-rule py-4 text-[20px] font-medium no-underline", isActive ? "text-black" : "text-ip-body")
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink to="/industries" className="border-b border-ip-rule py-4 text-[20px] font-medium text-ip-body no-underline">
              Industries
            </NavLink>
            <NavLink to="/contact" className="border-b border-ip-rule py-4 text-[20px] font-medium text-ip-body no-underline">
              Contact
            </NavLink>
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
