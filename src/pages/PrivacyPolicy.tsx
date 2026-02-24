import { motion } from "framer-motion";
import { Shield, Eye, Database, Lock, UserCheck, Globe, Mail, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const sections = [
  {
    icon: Eye,
    title: "Information We Collect",
    content: [
      {
        subtitle: "Information You Provide",
        text: "When you contact us, request a consultation, or engage our services, we may collect your name, email address, phone number, company name, job title, and any other information you choose to provide in your communications with us.",
      },
      {
        subtitle: "Automatically Collected Information",
        text: "When you visit our website, we automatically collect certain information including your IP address, browser type, operating system, referring URLs, pages visited, time spent on pages, and other standard web analytics data.",
      },
      {
        subtitle: "Cookies & Tracking Technologies",
        text: "We use cookies, web beacons, and similar technologies to enhance your experience, analyze trends, and gather demographic information. See our Cookie Policy for detailed information.",
      },
    ],
  },
  {
    icon: Database,
    title: "How We Use Your Information",
    content: [
      {
        subtitle: "Service Delivery",
        text: "To provide, maintain, and improve our data engineering, AI automation, and consulting services. This includes communicating with you about projects, sending progress updates, and delivering final deliverables.",
      },
      {
        subtitle: "Analytics & Improvement",
        text: "To understand how our website and services are used, identify trends, and improve user experience. We use aggregated and anonymized data for internal analytics and reporting.",
      },
      {
        subtitle: "Communications",
        text: "To respond to your inquiries, send service-related notices, and with your consent, send marketing communications about new services, case studies, or industry insights.",
      },
    ],
  },
  {
    icon: Lock,
    title: "Data Security",
    content: [
      {
        subtitle: "Encryption & Protection",
        text: "We implement industry-standard security measures including TLS encryption for data in transit, AES-256 encryption for data at rest, and strict access controls. Our infrastructure is hosted on enterprise-grade cloud platforms with SOC 2 Type II compliance.",
      },
      {
        subtitle: "Access Controls",
        text: "Access to personal data is restricted to authorized personnel who need it to perform their job functions. All team members undergo security training and are bound by confidentiality agreements.",
      },
    ],
  },
  {
    icon: UserCheck,
    title: "Your Rights & Choices",
    content: [
      {
        subtitle: "Access & Portability",
        text: "You have the right to request a copy of the personal data we hold about you in a structured, commonly used, and machine-readable format.",
      },
      {
        subtitle: "Correction & Deletion",
        text: "You may request that we correct inaccurate data or delete your personal data. We will comply unless we have a legitimate legal basis to retain the information.",
      },
      {
        subtitle: "Opt-Out",
        text: "You may opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly. Note that you may still receive transactional or service-related communications.",
      },
    ],
  },
  {
    icon: Globe,
    title: "Data Transfers & Third Parties",
    content: [
      {
        subtitle: "Service Providers",
        text: "We may share data with trusted third-party service providers who assist us in operating our website, conducting business, or servicing you. These parties are contractually obligated to keep your information confidential.",
      },
      {
        subtitle: "International Transfers",
        text: "Your data may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place, including Standard Contractual Clauses approved by relevant data protection authorities.",
      },
    ],
  },
  {
    icon: Clock,
    title: "Data Retention",
    content: [
      {
        subtitle: "Retention Periods",
        text: "We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce agreements. Typically, client project data is retained for 3 years after project completion.",
      },
      {
        subtitle: "Deletion",
        text: "When data is no longer needed, it is securely deleted or anonymized. You may request earlier deletion subject to our legal and contractual obligations.",
      },
    ],
  },
];

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Privacy Policy"
        description="How Inclined Plane collects, uses, and protects your personal information. Read our commitment to data privacy and transparency."
        path="/privacy"
        noIndex
      />
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Hero */}
          <motion.div className="text-center mb-20" {...fadeUp}>
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Privacy </span>
              <span className="text-gradient-orange">Policy</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your information.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 22, 2026
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-8">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-panel rounded-2xl p-8 md:p-10"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-semibold text-foreground">{section.title}</h2>
                  </div>
                </div>
                <div className="space-y-6 pl-0 md:pl-16">
                  {section.content.map((item) => (
                    <div key={item.subtitle}>
                      <h3 className="text-sm font-semibold text-foreground mb-2">{item.subtitle}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div className="mt-16 text-center glass-panel rounded-2xl p-10" {...fadeUp}>
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-3">Questions About Your Privacy?</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
              If you have any questions about this Privacy Policy or our data practices, please don't hesitate to reach out.
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

export default PrivacyPolicy;
