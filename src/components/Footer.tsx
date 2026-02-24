import { Link } from "react-router-dom";


const Footer = () => {
  return (
    <footer className="relative footer-tint">
      {/* Giant wordmark sitting on top of footer border */}
      <div className="relative overflow-hidden select-none pointer-events-none" aria-hidden="true">
        <div className="text-center leading-none pb-0 pt-4 sm:pt-8 px-4" style={{ fontSize: 'clamp(2.5rem, 12vw, 12rem)', marginBottom: '-0.1em' }}>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="mb-4">
                <span className="font-extrabold text-lg tracking-tight">
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
                  { label: "Blogs", path: "/blogs" },
                  { label: "Case Studies", path: "/case-studies" },
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
                  "Data Architecture",
                  "Reliability & DataOps",
                  "Analytics & Intelligence",
                  "AI & ML Implementation",
                  "Automation Systems",
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

            {/* Industries */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Industries
              </h4>
              <ul className="space-y-2.5">
                {[
                  "Retail & E-commerce",
                  "Financial Services",
                  "B2B SaaS",
                  "Healthcare",
                  "Manufacturing",
                  "Energy & Utilities",
                  "BPO & Shared Services",
                  "Education",
                ].map((industry) => (
                  <li key={industry}>
                    <Link
                      to="/industries"
                      className="text-sm text-secondary-foreground hover:text-foreground transition-colors"
                    >
                      {industry}
                    </Link>
                  </li>
                ))}
              </ul>
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
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="https://linkedin.com/company/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-foreground transition-colors">LinkedIn</a>
              <a href="https://x.com/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-foreground transition-colors">X</a>
              <a href="https://github.com/inclinedplane" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
