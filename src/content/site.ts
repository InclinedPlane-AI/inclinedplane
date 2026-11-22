/**
 * Site-wide copy and configuration. Founder-confirmed lines (brief §3.1) are
 * marked; change them only with founder sign-off.
 */

export const site = {
  name: "InclinedPlane",
  formerName: "Sail Analytics",
  url: "https://inclinedplane.com",
  email: "support@inclinedplane.com",
  linkedin: "https://www.linkedin.com/company/inclinedplane",

  // Founder-confirmed (brief §3.1)
  tagline: "Data Engineered. Intelligence Deployed.",
  headline: "Modernizing Enterprise Data Foundations for the AI Era.",
  supportingLine:
    "We engineer and modernize enterprise data platforms on the stack you already have, then make them trusted, contextualized and ready for AI agents.",
  sequenceLine:
    "Most organizations are working on several of these at once. We meet you where you are and chart out the path that gets you to trusted AI fastest.",
  incleverLine:
    "Our team does this work on your existing stack and tools. Where it helps, IncLever, our own data readiness product, speeds it up.",
  incleverLine2:
    "With or without IncLever, the expertise is the same. It simply gets you there faster and keeps watch afterward.",

  // Proposed (brief §3.3, flag: agentNeutrality)
  agentNeutralityLine: "Copilot, Genie, Claude or ChatGPT: we make the agent you choose work on your data.",

  /** Plain "what we do" statement for people and AI assistants (brief §11.5). */
  whatWeDo:
    "InclinedPlane is a data engineering and AI readiness firm. We modernize enterprise data platforms on Microsoft Azure and Fabric, Databricks, AWS and Snowflake, then make the data trusted, contextualized and ready for AI agents. We work with CIOs, CDOs and heads of data at mid-to-large enterprises in the US, UK and Europe, from a delivery base in Bengaluru, India.",

  cta: {
    primary: "Book an AI Data Readiness Assessment",
    header: "Book an assessment",
    midTitle: "Not sure where your data stands?",
    midBody:
      "Book a free 45-minute AI Data Readiness Assessment on your own data. Not ready to talk yet? Get our one-page checklist instead.",
    midButton: "Start the assessment",
    /** Founder's reassurance line under the main CTAs. */
    reassure: "Free · 45 minutes · on your own data",
    checklistButton: "Get the readiness checklist",
    finalTitle: "Start with a 45-minute AI Data Readiness Assessment.",
    finalBody:
      "We look at your data estate through the lens of what AI agents need: quality, context, access and governance. You leave with a clear view of the gaps, the risks and the fastest path to production AI.",
    finalButton: "Book your assessment",
  },

  office: {
    line: "Offices in the United States and India.",
    verified: false,
  },

  founder: {
    name: "Keerthana Vayyasi",
    role: "Founder and CEO",
    linkedin: "https://www.linkedin.com/in/keerthanavayyasi/",
    credentials: {
      text: "Leads platform modernizations for Fortune 500 companies. Databricks and Microsoft Fabric certified.",
      verified: false,
    },
    /**
     * The founder's own DRAFT, verbatim from her homepage. It still uses banned
     * words ("unlock", "empower", "harness the full potential") and is being
     * rewritten by her (brief §4.1, open item). Never replace it with words
     * she didn't write; hidden in production until verified.
     */
    quote: {
      text: [
        "We’re excited about the possibilities the agentic enterprise will unlock.",
        "We’re committed to building the right data foundations that empower our clients to harness the full potential of this new era.",
      ],
      verified: false,
    },
  },
} as const;

/**
 * Booking (founder's flow, 22 Nov 2026): pick a time first (Calendly embed,
 * which collects name + work email), then three OPTIONAL questions sent to
 * Formspree with the booking's IDs, then a confirmation. Fallback for people
 * who can't find a slot: the same questions + name/email, no calendar.
 *
 * Calendly event: the founder's 45-minute "AI Data Readiness Assessment"
 * (connected 2026-11-22). Calendly's free plan is enough: the embed tells the
 * page when a booking is made (no webhooks needed). Each booking carries UTM
 * tags (utm_source=website, utm_medium=cta, utm_content=<button>) so the
 * Calendly booking shows which call to action it came from.
 */
export const booking = {
  formEndpoint: "https://formspree.io/f/xwvnakbz", // same Formspree form as /contact
  calendlyUrl: "https://calendly.com/keerthana-inclinedplane/ai-data-readiness-assessment",
  calendarConfigured: true,
  durationMinutes: 45,
  questions: {
    role: ["CIO or CTO", "CDO or Head of Data", "CISO or security leader", "Data or analytics leader", "Other"],
    platform: ["Azure or Microsoft Fabric", "Databricks", "Snowflake", "AWS", "Google Cloud", "Mixed or on-premises"],
    blocker: [
      "Data quality",
      "Inconsistent metric definitions",
      "Access and security",
      "Legacy platforms",
      "Not sure yet",
    ],
  },
} as const;

export interface NavItem {
  label: string;
  to: string;
}

export interface NavLinkItem extends NavItem {
  /** One line shown in dropdowns and on hub pages. */
  description: string;
}

export type MenuId = "capabilities" | "solutions" | "resources";

export interface MainNavItem extends NavItem {
  /** Opens a dropdown on hover/focus; the label itself still links to `to`. */
  menu?: MenuId;
}

/**
 * Primary navigation (restructured 2026-11-22 by Mohan's team, replacing the
 * founder's draft in brief §5.2: "Context Engineering", "AI Readiness" and
 * "Capabilities" all led to the same four pillar pages). Dropdown contents:
 * capabilities from src/content/capabilities.ts, solutions from
 * src/data/products.ts, resources from `resourcesNav` below.
 */
export const mainNav: MainNavItem[] = [
  { label: "Context Engineering", to: "/context-engineering" },
  { label: "Capabilities", to: "/capabilities", menu: "capabilities" },
  { label: "Solutions", to: "/products", menu: "solutions" },
  { label: "Resources", to: "/resources", menu: "resources" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

/** Everything under "Resources": the dropdown, the /resources hub and the footer. */
export const resourcesNav: NavLinkItem[] = [
  { label: "Case studies", to: "/case-studies", description: "Delivered projects, anonymized, with measured results." },
  { label: "Industries", to: "/industries", description: "Where enterprise data is hardest, and what we do there." },
  { label: "Learn", to: "/learn", description: "Interactive explainers on context, ontology and AI readiness." },
  { label: "Insights", to: "/insights", description: "The numbers and shifts behind AI-ready data, with sources." },
  { label: "Blog", to: "/blog", description: "Articles from our engineers on platforms, pipelines and context." },
  { label: "Our thesis", to: "/thesis", description: "Why data is infrastructure and intelligence is product." },
  { label: "Readiness checklist", to: "/readiness-checklist", description: "Sixteen checks to run before an agent touches your data." },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Capabilities",
    links: [
      { label: "Context engineering, explained", to: "/context-engineering" },
      { label: "Data Engineering and Governance", to: "/capabilities/data-engineering-governance" },
      { label: "Enterprise Context Engineering", to: "/capabilities/context-engineering" },
      { label: "AI and Agent Readiness", to: "/capabilities/ai-agent-readiness" },
      { label: "Agentic Analytics and BI", to: "/capabilities/agentic-analytics" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All solutions", to: "/products" },
      { label: "IncLever", to: "/products/inclever" },
      { label: "PipelineIQ", to: "/products/pipelineiq" },
      { label: "AI Data Readiness Assessment", to: "/assessment" },
    ],
  },
  {
    title: "Resources",
    links: resourcesNav.map(({ label, to }) => ({ label, to })),
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: "Privacy", to: "/privacy" },
  { label: "Terms", to: "/terms" },
  { label: "Cookies", to: "/cookies" },
];
