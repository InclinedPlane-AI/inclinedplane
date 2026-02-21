import { Link } from "react-router-dom";
import { Percent } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-top-orange bg-background relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 flex items-center justify-center text-primary drop-shadow-[0_0_8px_hsl(25,100%,50%,0.6)]">
                <Percent size={22} strokeWidth={2.5} />
              </div>
              <span className="font-semibold text-foreground text-sm">
                Inclined Plane
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              AI-native data engineering. Turning complexity into operational intelligence.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "About", path: "/about" },
                { label: "Thesis", path: "/thesis" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {[
                "Data Platform Engineering",
                "Cloud Warehouse Architecture",
                "BI Modernization",
                "DataOps & Observability",
                "Forecasting Systems",
                "AI Automation Workflows",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-sm text-secondary-foreground hover:text-foreground transition-colors"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work */}
          <div>
            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Work
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Case Studies", path: "/case-studies" },
                { label: "Industries", path: "/industries" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Separator + Bottom bar */}
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Inclined Plane. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              Terms
            </span>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="text-xs hover:text-foreground transition-colors cursor-pointer">LinkedIn</span>
              <span className="text-xs hover:text-foreground transition-colors cursor-pointer">X</span>
              <span className="text-xs hover:text-foreground transition-colors cursor-pointer">GitHub</span>
            </div>
          </div>
        </div>

        {/* Giant fading wordmark */}
        <div className="relative mt-12 overflow-hidden select-none pointer-events-none" aria-hidden="true">
          <div className="text-center leading-none" style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}>
            <span className="font-black tracking-tighter text-foreground/[0.06]">
              Inclined
            </span>
            {' '}
            <span
              className="font-black tracking-tighter"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--orange-start) / 0.12), hsl(var(--orange-mid) / 0.08))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Plane
            </span>
          </div>
          {/* Bottom fade mask */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" style={{ height: '40%', bottom: 0, top: 'auto' }} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
