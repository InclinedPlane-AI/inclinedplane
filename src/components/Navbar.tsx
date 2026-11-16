import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Check, ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import { PRODUCTS } from "@/data/products";
import { PRODUCT_ICONS } from "./products/icons";
import { RequestDemoDialog } from "./products/RequestDemo";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Thesis", path: "/thesis" },
  { label: "Services", path: "/services" },
  { label: "Products", path: "/products" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "About", path: "/about" },
  { label: "Careers", path: "/careers" },
  { label: "Contact", path: "/contact" },
  { label: "Blog", path: "/blog" },
];

const WavyLine = ({ animate = false, className = "" }: { animate?: boolean; className?: string }) => (
  <svg
    className={`absolute w-full h-[6px] ${className}`}
    viewBox="0 0 100 6"
    preserveAspectRatio="none"
    fill="none"
    style={{ overflow: "hidden" }}
  >
    <path
      d="M0 3 Q12.5 1, 25 3 T50 3 T75 3 T100 3"
      stroke="url(#wave-grad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      className={animate ? "navbar-wavy-active" : ""}
      style={
        !animate
          ? { strokeDasharray: 200, strokeDashoffset: 200, animation: "wave-draw 0.3s ease-out forwards" }
          : undefined
      }
    />
    <defs>
      <linearGradient id="wave-grad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="hsl(25 100% 50%)" />
        <stop offset="50%" stopColor="hsl(31 100% 55%)" />
        <stop offset="100%" stopColor="hsl(35 100% 64%)" />
      </linearGradient>
    </defs>
  </svg>
);

const NavLinkItem = ({
  link,
  isActive,
  forceLight,
}: {
  link: (typeof navLinks)[0];
  isActive: boolean;
  forceLight?: boolean;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={link.path}
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative px-3 py-2 text-sm transition-colors duration-200 ${
        forceLight
          ? isActive
            ? "text-white"
            : "text-white/70 hover:text-white"
          : isActive
            ? "text-foreground"
            : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <span className="relative inline-block">
        {link.label}
        {isActive && (
          <motion.div layoutId="nav-underline" transition={{ type: "spring", stiffness: 500, damping: 30 }}>
            <WavyLine animate className="bottom-[-2px] left-0 right-0" />
          </motion.div>
        )}
        <AnimatePresence>
          {hovered && !isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <WavyLine className="bottom-[-2px] left-0 right-0" />
            </motion.div>
          )}
        </AnimatePresence>
      </span>
    </Link>
  );
};

/* ── Products hover menu: briefs both products, links to each page ── */
const ProductsMenu = ({
  link,
  isActive,
  forceLight,
}: {
  link: (typeof navLinks)[0];
  isActive: boolean;
  forceLight?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const closeTimer = useRef<number>();
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  const show = () => {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <>
    <div
      className="relative flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) hide();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
    >
      <NavLinkItem link={link} isActive={isActive} forceLight={forceLight} />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onFocus={show}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Show products"
        className={`-ml-2 p-1 rounded ${forceLight ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
      >
        <ChevronDown size={14} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-1/2 top-full -translate-x-1/2 pt-3 w-[min(620px,calc(100vw-2rem))]"
          >
            <div className="rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="grid sm:grid-cols-2 gap-2 p-2">
                {PRODUCTS.map((p) => {
                  const Icon = PRODUCT_ICONS[p.id];
                  return (
                    <Link
                      key={p.id}
                      to={p.path}
                      className="group rounded-xl p-4 hover:bg-primary/5 border border-transparent hover:border-primary/25 transition-colors"
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <span className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </span>
                        <span>
                          <span className="block text-sm font-bold text-foreground">{p.name}</span>
                          <span className="block font-mono text-[10px] uppercase tracking-wider text-primary">{p.kicker}</span>
                        </span>
                      </div>
                      <span className="inline-flex mb-2 px-2 py-0.5 rounded-full bg-muted text-[10px] font-medium text-foreground/80">{p.audience}</span>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{p.brief}</p>
                      <ul className="space-y-1 mb-3">
                        {p.bullets.map((b) => (
                          <li key={b} className="flex gap-1.5 text-[11px] text-foreground/80">
                            <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" /> {b}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                        Explore {p.name} <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </Link>
                  );
                })}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-border bg-muted/40">
                <p className="text-xs text-muted-foreground">
                  Not sure which fits?{" "}
                  <Link to="/products" className="text-foreground hover:text-primary underline-offset-2 hover:underline">
                    Compare both
                  </Link>
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setDemoOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 bg-gradient-orange text-primary-foreground px-3.5 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
                >
                  Request a demo <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    {/* Outside the hover wrapper: React bubbles portal events through the
        component tree, so a nested dialog would re-open the menu on hover. */}
    <RequestDemoDialog open={demoOpen} onOpenChange={setDemoOpen} />
    </>
  );
};

const Navbar = ({
  activeOverride,
  forceLight = false,
}: {
  activeOverride?: string;
  forceLight?: boolean;
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    const snapContainer = document.querySelector(".snap-container");
    const snapHandler = () => {
      if (snapContainer) setScrolled(snapContainer.scrollTop > 40);
    };
    window.addEventListener("scroll", handler);
    snapContainer?.addEventListener("scroll", snapHandler);
    return () => {
      window.removeEventListener("scroll", handler);
      snapContainer?.removeEventListener("scroll", snapHandler);
    };
  }, [location]);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const lightMode = forceLight && !scrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel-strong" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center group" data-cursor-hover>
          <Logo
            className="h-10 md:h-12 w-auto"
            forceVariant={lightMode ? "dark" : undefined}
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = activeOverride
              ? activeOverride === link.path
              : link.path === "/products"
                ? location.pathname.startsWith("/products")
                : location.pathname === link.path;
            return link.path === "/products" ? (
              <ProductsMenu key={link.path} link={link} isActive={active} forceLight={lightMode} />
            ) : (
              <NavLinkItem key={link.path} link={link} isActive={active} forceLight={lightMode} />
            );
          })}
        </div>

        {/* CTA + Theme + Mobile toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/contact"
            data-cursor-hover
            className="hidden md:inline-flex bg-gradient-orange text-primary-foreground px-5 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity glow-orange"
          >
            Build With Us
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden ${lightMode ? "text-white" : "text-foreground"}`}
            data-cursor-hover
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel-strong border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <div key={link.path}>
                  <Link
                    to={link.path}
                    className={`block py-2 text-sm ${
                      location.pathname === link.path ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.path === "/products" && (
                    <div className="ml-3 mb-1 pl-3 border-l border-border flex flex-col">
                      {PRODUCTS.map((p) => (
                        <Link
                          key={p.id}
                          to={p.path}
                          className={`py-1.5 text-sm ${location.pathname === p.path ? "text-foreground" : "text-muted-foreground"}`}
                        >
                          {p.name} <span className="text-xs opacity-70">· {p.kicker}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link
                to="/contact"
                className="mt-2 bg-gradient-orange text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium text-center"
              >
                Build With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
