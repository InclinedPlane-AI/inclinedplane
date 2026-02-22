import { motion } from "framer-motion";
import { Scale, FileText, AlertTriangle, Handshake, Ban, RefreshCw, Gavel, MapPin, Mail } from "lucide-react";
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
    icon: FileText,
    title: "1. Acceptance of Terms",
    text: "By accessing or using InclinedPlane's website and services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any part of these terms, you may not use our services. These terms apply to all visitors, users, and clients of InclinedPlane.",
  },
  {
    icon: Handshake,
    title: "2. Services & Engagements",
    text: "InclinedPlane provides AI-native data engineering, cloud warehouse architecture, BI modernization, DataOps, forecasting systems, and AI automation workflow services. Each client engagement is governed by a separate Statement of Work (SOW) that outlines specific deliverables, timelines, fees, and terms. In the event of a conflict between these Terms and a SOW, the SOW shall prevail for that engagement.",
  },
  {
    icon: Scale,
    title: "3. Intellectual Property",
    items: [
      {
        subtitle: "Our IP",
        text: "All content on our website — including text, graphics, logos, icons, images, code, and software — is the property of InclinedPlane and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.",
      },
      {
        subtitle: "Client IP",
        text: "Unless otherwise specified in the SOW, upon full payment, clients receive ownership of custom deliverables created specifically for their engagement. InclinedPlane retains ownership of pre-existing tools, frameworks, methodologies, and general know-how used in delivering services.",
      },
      {
        subtitle: "Feedback",
        text: "Any feedback, suggestions, or ideas you provide regarding our services may be used by InclinedPlane without obligation to you.",
      },
    ],
  },
  {
    icon: Ban,
    title: "4. Prohibited Uses",
    text: "You agree not to: use our services for any unlawful purpose; attempt to gain unauthorized access to our systems; interfere with or disrupt our services; transmit viruses or malicious code; impersonate any person or entity; use our content for competitive analysis without consent; or violate any applicable local, state, national, or international law.",
  },
  {
    icon: AlertTriangle,
    title: "5. Limitation of Liability",
    items: [
      {
        subtitle: "Disclaimer",
        text: "Our services are provided 'as is' and 'as available' without warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.",
      },
      {
        subtitle: "Liability Cap",
        text: "In no event shall InclinedPlane's total liability exceed the amount paid by you for the services giving rise to the claim in the twelve (12) months preceding the event. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages.",
      },
    ],
  },
  {
    icon: RefreshCw,
    title: "6. Modifications & Termination",
    text: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Your continued use of our services after changes constitutes acceptance. Either party may terminate a service engagement as specified in the applicable SOW. Sections regarding IP, liability, and indemnification survive termination.",
  },
  {
    icon: Gavel,
    title: "7. Dispute Resolution",
    text: "Any disputes arising from these terms or our services shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration in accordance with the rules of the applicable arbitration association. The arbitration shall be conducted in English, and the arbitrator's decision shall be final and binding.",
  },
  {
    icon: MapPin,
    title: "8. Governing Law",
    text: "These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. You consent to the exclusive jurisdiction of the courts in the applicable jurisdiction for any disputes not subject to arbitration.",
  },
];

const Terms = () => {
  return (
    <PageLayout>
      <SEOHead
        title="Terms of Service"
        description="Terms governing the use of Inclined Plane's data engineering and AI consulting services. Clear and fair business terms."
        path="/terms"
        noIndex
      />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-primary/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          {/* Hero */}
          <motion.div className="text-center mb-20" {...fadeUp}>
            <div className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full mb-6">
              <Scale className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Legal Agreement</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Terms of </span>
              <span className="text-gradient-orange">Service</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Clear, fair terms that govern your use of our services. We believe in transparency and mutual respect in all our business relationships.
            </p>
            <p className="text-sm text-muted-foreground mt-4">
              Last updated: February 22, 2026
            </p>
          </motion.div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="glass-panel rounded-2xl p-8 md:p-10"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <section.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground pt-2">{section.title}</h2>
                </div>
                <div className="pl-0 md:pl-16">
                  {section.text && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.text}</p>
                  )}
                  {section.items && (
                    <div className="space-y-5">
                      {section.items.map((item) => (
                        <div key={item.subtitle}>
                          <h3 className="text-sm font-semibold text-foreground mb-2">{item.subtitle}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact */}
          <motion.div className="mt-16 text-center glass-panel rounded-2xl p-10" {...fadeUp}>
            <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-3">Questions About These Terms?</h2>
            <p className="text-sm text-muted-foreground mb-4 max-w-lg mx-auto">
              We're happy to clarify any aspect of our terms. Reach out and we'll get back to you promptly.
            </p>
            <a href="mailto:legal@inclinedplane.com" className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity glow-orange">
              <Mail className="w-4 h-4" />
              legal@inclinedplane.com
            </a>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Terms;
