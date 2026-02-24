import { motion } from "framer-motion";
import { Cookie, Settings, BarChart3, Target, ShieldCheck, ToggleRight, Info, Mail } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const cookieTypes = [
  {
    icon: ShieldCheck,
    name: "Essential Cookies",
    required: true,
    description: "These cookies are strictly necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you such as setting your privacy preferences, logging in, or filling in forms.",
    examples: ["Session management", "Security tokens", "Load balancing", "Cookie consent preferences"],
    retention: "Session to 1 year",
  },
  {
    icon: BarChart3,
    name: "Analytics Cookies",
    required: false,
    description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us understand which pages are the most and least popular and see how visitors move around the site.",
    examples: ["Page view tracking", "Bounce rate analysis", "User journey mapping", "Performance monitoring"],
    retention: "Up to 2 years",
  },
  {
    icon: Settings,
    name: "Functional Cookies",
    required: false,
    description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.",
    examples: ["Language preferences", "Theme settings (dark/light mode)", "Region selection", "Chat widget preferences"],
    retention: "Up to 1 year",
  },
  {
    icon: Target,
    name: "Marketing Cookies",
    required: false,
    description: "These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant content on other sites. They do not directly store personal information but uniquely identify your browser and device.",
    examples: ["LinkedIn Insight Tag", "Google Analytics demographics", "Retargeting pixels", "Social media sharing"],
    retention: "Up to 2 years",
  },
];

const managementSteps = [
  {
    step: "01",
    title: "Browser Settings",
    text: "Most web browsers allow you to control cookies through their settings. You can set your browser to refuse cookies, delete existing cookies, or alert you when a cookie is being set.",
  },
  {
    step: "02",
    title: "Our Cookie Banner",
    text: "When you first visit our site, you'll see a cookie consent banner allowing you to accept or customize which categories of cookies you'd like to enable.",
  },
  {
    step: "03",
    title: "Opt-Out Links",
    text: "For third-party analytics, you can opt out using tools like the Google Analytics Opt-out Browser Add-on or the Network Advertising Initiative's opt-out page.",
  },
];

const CookiePolicy = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Cookie Policy"
        description="How Inclined Plane uses cookies and tracking technologies on our website. Manage your cookie preferences."
        path="/cookies"
        noIndex
      />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-24 left-1/3 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-32 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Hero */}
          <motion.div className="text-center mb-20" {...fadeUp}>
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6">
              <Cookie className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Transparency First</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Cookie </span>
              <span className="text-gradient-orange">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We use cookies to enhance your browsing experience. Here's everything you need to know about how and why we use them.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 22, 2026
            </p>
          </motion.div>

          {/* What are cookies */}
          <motion.div className="glass-panel rounded-2xl p-8 md:p-10 mb-8" {...fadeUp}>
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Info className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">What Are Cookies?</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website owners useful information about how their site is being used. Cookies can be "persistent" (remaining on your device until deleted) or "session" (deleted when you close your browser).
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cookie types */}
          <div className="space-y-6 mb-16">
            <motion.h2 className="text-2xl md:text-3xl font-bold text-foreground text-center mb-8" {...fadeUp}>
              Types of Cookies We Use
            </motion.h2>
            {cookieTypes.map((cookie, i) => (
              <motion.div
                key={cookie.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-panel rounded-2xl p-8 md:p-10"
              >
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <cookie.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{cookie.name}</h3>
                      <span className="text-xs text-muted-foreground">Retention: {cookie.retention}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium shrink-0 ${
                    cookie.required
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {cookie.required ? "Required" : "Optional"}
                  </span>
                </div>
                <div className="pl-0 md:pl-16">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{cookie.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {cookie.examples.map((ex) => (
                      <span key={ex} className="text-xs px-3 py-1.5 rounded-lg bg-muted/50 text-muted-foreground border border-border/50">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* How to manage */}
          <motion.div className="mb-16" {...fadeUp}>
            <div className="flex items-center gap-3 mb-8 justify-center">
              <ToggleRight className="w-6 h-6 text-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Managing Your Cookies</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {managementSteps.map((step, i) => (
                <motion.div
                  key={step.step}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="glass-panel rounded-2xl p-6 text-center"
                >
                  <span className="text-3xl font-black text-gradient-orange">{step.step}</span>
                  <h3 className="text-sm font-semibold text-foreground mt-3 mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact */}
          <motion.div className="text-center glass-panel rounded-2xl p-10" {...fadeUp}>
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-3">Cookie-Related Questions?</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
              If you have questions about our use of cookies or want to update your preferences, we're here to help.
            </p>
            <a href="mailto:contact@inclinedplane.com" className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity glow-orange">
              <Mail className="w-4 h-4" />
              contact@inclinedplane.com
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default CookiePolicy;
