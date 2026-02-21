import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Percent } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Thesis", path: "/thesis" },
  { label: "Services", path: "/services" },
  { label: "Industries", path: "/industries" },
  { label: "Case Studies", path: "/case-studies" },
  { label: "About", path: "/about" },
];

const WavyLine = ({ animate = false, className = "" }: { animate?: boolean; className?: string }) => (
  <svg
    className={`absolute w-full h-[6px] ${className}`}
    viewBox="0 0 100 6"
    preserveAspectRatio="none"
    fill="none"
    style={{ overflow: "hidden" }}
  >
    <motion.path
      d="M0 3 Q12.5 1, 25 3 T50 3 T75 3 T100 3"
      stroke="url(#wave-grad)"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
      initial={{ pathLength: animate ? 1 : 0 }}
      animate={
        animate
          ? { d: [
              "M0 3 Q12.5 0.5, 25 3 T50 3 T75 3 T100 3",
              "M0 3 Q12.5 5.5, 25 3 T50 3 T75 3 T100 3",
              "M0 3 Q12.5 0.5, 25 3 T50 3 T75 3 T100 3",
            ] }
          : { pathLength: 1 }
      }
      transition={
        animate
          ? { d: { duration: 1.2, repeat: Infinity, ease: "easeInOut" } }
          : { duration: 0.3, ease: "easeOut" }
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

const NavLinkItem = ({ link, isActive }: { link: typeof navLinks[0]; isActive: boolean }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={link.path}
      data-cursor-hover
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative px-3 py-2 text-sm transition-colors duration-200 ${
        isActive
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    const snapContainer = document.querySelector('.snap-container');
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-panel-strong" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" data-cursor-hover>
          <div className="w-8 h-8 flex items-center justify-center text-primary drop-shadow-[0_0_8px_hsl(25,100%,50%,0.6)]">
            <Percent size={22} strokeWidth={2.5} />
          </div>
          <span className="font-semibold text-sm tracking-tight">
            <span className="text-foreground">Inclined</span>
            <span className="text-gradient-orange">Plane</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLinkItem key={link.path} link={link} isActive={location.pathname === link.path} />
          ))}
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
            className="md:hidden text-foreground"
            data-cursor-hover
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
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 text-sm ${
                    location.pathname === link.path
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
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
