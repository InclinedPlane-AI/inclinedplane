import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Brain,
  Sparkles,
  Globe,
  Heart,
  Zap,
  Shield,
  GraduationCap,
  Coffee,
  Laptop,
  TrendingUp,
  Users,
  MessageSquare,
  ClipboardCheck,
  Code2,
  Handshake,
  Mail,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const CAREERS_EMAIL = "careers@inclinedplane.com";

const values = [
  {
    icon: Brain,
    title: "Engineering Rigor",
    desc: "We treat data systems like production software, versioned, observed, and tested. No band-aid pipelines, no hero culture.",
  },
  {
    icon: Sparkles,
    title: "AI-Native by Default",
    desc: "Every architecture decision is made with AI in mind. We build for models, agents, and intelligence, not just dashboards.",
  },
  {
    icon: Heart,
    title: "Ownership & Craft",
    desc: "You own outcomes, not tickets. We expect senior judgment and reward people who care about how the work is done.",
  },
  {
    icon: Globe,
    title: "Remote-First, Async-Friendly",
    desc: "Distributed team across time zones. Documentation over meetings. Deep work over performative busy.",
  },
];

const perks = [
  { icon: Laptop, title: "Top-tier Hardware", desc: "MacBook Pro, monitor stipend, and the tools you need." },
  { icon: GraduationCap, title: "Learning Budget", desc: "Annual budget for courses, books, and conferences." },
  { icon: Coffee, title: "Flexible Hours", desc: "Work when you do your best work, async by default." },
  { icon: TrendingUp, title: "Meaningful Equity", desc: "Real ownership in what we're building together." },
  { icon: Heart, title: "Health & Wellness", desc: "Health stipend and four weeks of paid time off." },
  { icon: Users, title: "Annual Offsites", desc: "We meet in person twice a year to build and ship together." },
];

const process = [
  {
    icon: MessageSquare,
    title: "Intro Conversation",
    desc: "30-minute chat to understand your background, what you're looking for, and how we work.",
  },
  {
    icon: ClipboardCheck,
    title: "Technical Deep-Dive",
    desc: "Conversation about your past work, architecture decisions, trade-offs, and impact. No whiteboard puzzles.",
  },
  {
    icon: Code2,
    title: "Practical Exercise",
    desc: "A short, take-home (or live pairing session) on a problem close to what you'd do day-one.",
  },
  {
    icon: Handshake,
    title: "Team & Offer",
    desc: "Meet the team, ask anything, and we'll move quickly to an offer if it's a fit.",
  },
];

const openRoles = [
  {
    title: "HR & Accounts Executive",
    department: "Operations",
    location: "On-Site",
    type: "Full-time",
    about: "We are a growing startup looking for a resourceful HR & Accounts Executive who can seamlessly handle both people operations and financial management. This is a dual-function role built for someone who thrives in a lean team, loves ownership, and isn't afraid to build processes from scratch.",
    responsibilities: [
      "Manage end-to-end recruitment: job postings, screening, interviews, and offer letters",
      "Handle onboarding/offboarding and maintain HRIS data/employee records",
      "Administer attendance, leave management, and payroll inputs",
      "Ensure compliance with labour laws (PF, ESI, Gratuity)",
      "Handle day-to-day bookkeeping, vendor payments, and bank reconciliations",
      "Prepare monthly MIS reports, P&L statements, and cash flow summaries",
      "Ensure timely filing of GST, TDS, PF, ESI, and other statutory returns"
    ],
    requirements: [
      "B.Com / M.Com / MBA (HR or Finance); CA Inter is a plus",
      "2–5 years in a combined or dual HR + Accounts role (startup/SME preferred)",
      "Proficiency in Tally ERP, Zoho Books, or similar",
      "Familiarity with HRIS tools (Zoho People, Keka, etc.) and strong MS Excel skills"
    ],
    applyUrl: "https://www.linkedin.com/jobs/search-results/?currentJobId=4422911412&eBP=NON_CHARGEABLE_CHANNEL&refId=Lf1IYndWBdIQSECcxpdVyA%3D%3D&trackingId=OpuQ%2BSjsRRFq6nUzaXg74w%3D%3D&keywords=jobs&origin=COMPANY_PAGE_JOBS_CLUSTER_EXPANSION&originToLandingJobPostings=4422911412%2C4422354429&geoId=102713980&f_C=14651726",
  },
  {
    title: "Oracle Analytics Cloud (OAC) Developer",
    department: "Engineering",
    location: "On-Site",
    type: "Full-time",
    about: "We are looking for an experienced OAC developer to design, build, and maintain Oracle Analytics reports and dashboards for our Data Lake environment. You will leverage JDE as the primary source system and utilize OAC's chatbot capabilities.",
    responsibilities: [
      "Develop interactive reports and dashboards on Oracle Analytics Cloud",
      "Work closely with the senior data modeler to consume and extend data models",
      "Build and configure OAC chatbot features for business user self-service analytics",
      "Understand JDE business processes and reporting requirements",
      "Support business stakeholders in defining KPIs and translating them into analytics solutions"
    ],
    requirements: [
      "Hands-on experience developing reports and dashboards on Oracle Analytics Cloud (OAC)",
      "Working knowledge of RPD / semantic model structure in OAC",
      "Experience with OAC chatbot feature and conversational analytics",
      "Familiarity with JDE (JD Edwards) as a source system",
      "Strong analytical and problem-solving skills",
      "Nice to have: Experience with Data Lake architectures"
    ],
    applyUrl: "https://www.linkedin.com/jobs/search-results/?currentJobId=4422354429&eBP=NON_CHARGEABLE_CHANNEL&refId=Lf1IYndWBdIQSECcxpdVyA%3D%3D&trackingId=27UBt1AL2DWhtATKN1AIRA%3D%3D&keywords=jobs&origin=COMPANY_PAGE_JOBS_CLUSTER_EXPANSION&originToLandingJobPostings=4422911412%2C4422354429&geoId=102713980&f_C=14651726",
  }
];

const JobCard = ({ role, index }: { role: typeof openRoles[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="glass-panel rounded-2xl p-6 sm:p-8 flex flex-col"
    >
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gradient-orange transition-all">{role.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground/80">
            <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md">{role.department}</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md">{role.location}</span>
            <span className="bg-white/5 px-2.5 py-1 rounded-md">{role.type}</span>
          </div>
        </div>
        <button
          className="w-10 h-10 rounded-full surface-3 flex items-center justify-center text-primary transition-transform duration-300 group-hover:bg-primary/10 flex-shrink-0"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          <ChevronDown size={18} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 24 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border"
          >
            <div className="pt-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">About the Role</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{role.about}</p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Key Responsibilities</h4>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  {role.responsibilities.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">Requirements</h4>
                <ul className="list-disc list-outside ml-4 space-y-1.5 text-sm text-muted-foreground leading-relaxed">
                  {role.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <a
                  href={role.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity glow-orange"
                >
                  Apply on LinkedIn <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Careers = () => {
  return (
    <PageLayout>
      <div className="overflow-x-clip">
        <SEOHead
          title="Careers — Build the Future of Data & AI | InclinedPlane"
          description="Join InclinedPlane to build AI-native data systems for high-velocity enterprises. Remote-first, ownership-driven, engineering rigor."
          path="/careers"
        />

        <PageHero
          label="Careers"
          title={
            <>
              Build What <span className="text-gradient-orange">Comes Next.</span>
            </>
          }
          subtitle="We build the data and AI infrastructure that powers demanding enterprises. If you care about impact, craft, and outcomes, read on."
        />

        {/* Open Roles Section */}
        <section className="relative pt-4 pb-20 sm:pt-8 sm:pb-24">
          <SectionGlow position="bottom-right" size={650} />
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-10 text-center">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Open Roles</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Join the <span className="text-gradient-orange">team.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                We're looking for exceptional people who care about craft, impact, and engineering rigor. Help us build the next generation of data systems.
              </p>
            </motion.div>

            <div className="space-y-6 mb-16">
              {openRoles.map((role, i) => (
                <JobCard key={role.title} role={role} index={i} />
              ))}
            </div>

            <motion.div
              {...fadeUp}
              className="glass-panel rounded-2xl p-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-2">Don't see a fit?</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                  We're always interested in meeting exceptional engineers, architects, and AI builders.
                  Introduce yourself, share what you've built, and tell us what you'd want to work on.
                </p>
              </div>
              <a
                href={`mailto:${CAREERS_EMAIL}?subject=Introduction — Talent Network`}
                data-cursor-hover
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-foreground px-6 py-3 rounded-lg font-medium text-sm hover:bg-white/10 transition-colors flex-shrink-0"
              >
                <Mail size={16} /> Join our talent network
              </a>
            </motion.div>
          </div>
        </section>

        {/* Philosophy / Values */}
        <section className="relative py-20 sm:py-24">
          <SectionGlow position="top-left" size={600} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeUp} className="max-w-3xl mx-auto mb-14 text-center">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Why InclinedPlane</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">
                A team built for <span className="text-gradient-orange">leverage</span>, not headcount.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                We don't optimize for size. We optimize for the quality of the engineers in the room. Every person here
                is expected to set direction, ship production work, and raise the bar. In return, you get autonomy,
                ownership, and the chance to work on problems that matter to the businesses we partner with.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {values.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                  className="glass-panel rounded-xl p-6 group hover:glow-orange transition-shadow"
                  data-cursor-hover
                >
                  <div className="w-11 h-11 rounded-xl surface-3 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Perks — commented out for now
        <section className="relative py-20 sm:py-24">
          <SectionGlow position="top-right" size={600} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeUp} className="text-center mb-14">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Perks & Benefits</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Built to do your <span className="text-gradient-orange">best work.</span>
              </h2>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {perks.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                  className="glass-panel rounded-xl p-6 group hover:glow-orange transition-shadow"
                  data-cursor-hover
                >
                  <Icon size={20} className="text-primary mb-4" />
                  <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        */}

        {/* Hiring Process */}
        <section className="relative py-20 sm:py-24">
          <SectionGlow position="bottom-left" size={650} />
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div {...fadeUp} className="mb-14 text-center max-w-3xl mx-auto">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Hiring Process</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Fast, respectful, <span className="text-gradient-orange">no theatre.</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Four steps over two to three weeks. We respect your time and aim to give you a clear answer either way.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {process.map(({ icon: Icon, title, desc }, i) => (
                <motion.div
                  key={title}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
                  className="glass-panel rounded-xl p-6 relative group hover:glow-orange transition-shadow"
                  data-cursor-hover
                >
                  <span className="absolute top-4 right-4 font-mono text-[10px] text-primary/60 tracking-widest">
                    0{i + 1}
                  </span>
                  <div className="w-11 h-11 rounded-xl surface-3 flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-2">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full opacity-[0.08] blur-[120px] bg-gradient-orange top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <motion.div {...fadeUp}>
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-5">Get In Touch</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5">
                Think you'd be a <span className="text-gradient-orange">good fit?</span>
              </h2>
              <p className="text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
                Send us a note with your background, what you're looking for, and a link to something you've built that
                you're proud of. We read every email.
              </p>
              <a
                href={`mailto:${CAREERS_EMAIL}?subject=Joining InclinedPlane`}
                data-cursor-hover
                className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-8 py-4 rounded-lg font-medium text-base hover:opacity-90 transition-opacity glow-orange-strong"
              >
                <Mail size={18} /> {CAREERS_EMAIL}
              </a>
            </motion.div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Careers;
