import { Link } from "react-router-dom";
import { Percent } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative footer-tint">
      {/* Giant wordmark sitting on top of footer border */}
      <div className="relative overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <div className="text-center leading-none pb-0 pt-8" style={{ fontSize: 'clamp(5rem, 14vw, 12rem)', marginBottom: '-0.15em' }}>
          <span className="font-black tracking-tighter text-foreground/[0.08]">Inclined</span>
          <span
            className="font-black tracking-tighter"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--orange-start) / 0.2), hsl(var(--orange-mid) / 0.15), hsl(var(--orange-end) / 0.1))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >Plane</span>
        </div>
      </div>

      {/* Footer content */}
      <div className="border-top-orange">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 flex items-center justify-center text-primary drop-shadow-[0_0_8px_hsl(25,100%,50%,0.6)]">
                  <Percent size={22} strokeWidth={2.5} />
                </div>
                <span className="font-semibold text-sm">
                  <span className="text-foreground">Inclined</span>
                  <span className="text-gradient-orange">Plane</span>
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

          {/* Bottom bar */}
          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} InclinedPlane. All rights reserved.
            </p>
            <div className="flex items-center gap-6 flex-wrap">
              <Link to="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link to="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Cookie Policy
              </Link>
              <div className="flex items-center gap-4 text-muted-foreground">
                <a href="https://linkedin.com/company/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-foreground transition-colors">LinkedIn</a>
                <a href="https://x.com/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-foreground transition-colors">X</a>
                <a href="https://github.com/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-foreground transition-colors">GitHub</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
