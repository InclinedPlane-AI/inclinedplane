import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="relative footer-tint">
      {/* Giant wordmark sitting on top of footer border */}
      <div className="relative overflow-hidden select-none pointer-events-none flex justify-center" aria-hidden="true">
        <div className="text-center flex justify-center items-center w-full max-w-[1600px] mx-auto pb-4 pt-8 sm:pt-12 px-4 sm:px-8">
          {/* Dark mode logo (visible by default, hidden in light mode) */}
          <img
            src="/incpl_logoHorizontal_inverseAW.png"
            alt="InclinedPlane Logo"
            className="block [.light_&]:hidden w-full h-auto object-contain translate-y-4"
          />
          {/* Light mode logo (hidden by default, visible in light mode) */}
          <img
            src="/incpl_logoHorizontal_fullcolourAW.png"
            alt="InclinedPlane Logo"
            className="hidden [.light_&]:block w-full h-auto object-contain translate-y-4"
          />
        </div>
      </div>

      {/* Footer content */}
      <div className="border-top-orange">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <Logo className="h-12 w-auto" eager={false} />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                AI-first data engineering. Turning complexity into actionable intelligence.
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
                  { label: "Blog", path: "/blog" },
                  { label: "Case Studies", path: "/case-studies" },
                  { label: "Careers", path: "/careers" },
                  { label: "Contact", path: "/contact" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-secondary-foreground hover:text-primary transition-colors"
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
              <div className="space-y-4">
                {[
                  {
                    group: "Advisory",
                    items: [
                      { label: "Clarity Layer", hash: "clarity-layer" },
                    ],
                  },
                  {
                    group: "Delivery",
                    items: [
                      { label: "AI-Readiness Foundation", hash: "data-architecture" },
                      { label: "Reliability Layer", hash: "reliability-ops" },
                      { label: "Analytics Layer", hash: "analytics-intelligence" },
                      { label: "Predictive Layer", hash: "ai-ml-implementations" },
                      { label: "Intelligence Layer", hash: "automation-systems" },
                    ],
                  },
                ].map((section) => (
                  <div key={section.group}>
                    <p className="text-sm text-secondary-foreground mb-2">
                      {section.group}
                    </p>
                    <ul className="space-y-2.5">
                      {section.items.map((service) => (
                        <li key={service.hash}>
                          <Link
                            to={`/services#${service.hash}`}
                            className="text-xs text-secondary-foreground hover:text-primary transition-colors"
                          >
                            – {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Privacy Policy", path: "/privacy" },
                  { label: "Terms of Service", path: "/terms" },
                  { label: "Cookie Policy", path: "/cookies" },
                ].map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-secondary-foreground hover:text-primary transition-colors"
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
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="https://linkedin.com/company/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://x.com/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-primary transition-colors">X</a>
              <a href="https://github.com/InclinedPlane-AI" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-primary transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
