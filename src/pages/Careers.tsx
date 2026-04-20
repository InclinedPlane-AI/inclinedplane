import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import { motion } from "framer-motion";
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
    desc: "We treat data systems like production software — versioned, observed, and tested. No band-aid pipelines, no hero culture.",
  },
  {
    icon: Sparkles,
    title: "AI-Native by Default",
    desc: "Every architecture decision is made with AI in mind. We build for models, agents, and intelligence — not just dashboards.",
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
  { icon: Coffee, title: "Flexible Hours", desc: "Work when you do your best work — async by default." },
  { icon: TrendingUp, title: "Meaningful Equity", desc: "Real ownership in what we're building together." },
  { icon: Heart, title: "Health & Wellness", desc: "Health stipend and four weeks of paid time off." },
  { icon: Users, title: "Annual Offsites", desc: "We meet in person twice a year to build and ship together." },
];

const process = [
  { icon: MessageSquare, title: "Intro Conversation", desc: "30-minute chat to understand your background, what you're looking for, and how we work." },
  { icon: ClipboardCheck, title: "Technical Deep-Dive", desc: "Conversation about your past work — architecture decisions, trade-offs, and impact. No whiteboard puzzles." },
  { icon: Code2, title: "Practical Exercise", desc: "A short, paid take-home (or live pairing session) on a problem close to what you'd do day-one." },
  { icon: Handshake, title: "Team & Offer", desc: "Meet the team, ask anything, and we'll move quickly to an offer if it's a fit." },
];

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
        subtitle="We're a small, senior team building the data and AI infrastructure that powers high-velocity enterprises. If you care about leverage, craft, and outcomes — read on."
      />

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
              We don't optimize for size — we optimize for the quality of the engineers in the room. Every person here
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

      {/* Talent Network — Not Currently Hiring */}
      <section className="relative py-20 sm:py-24">
        <SectionGlow position="bottom-right" size={650} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} className="mb-10 text-center">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Open Roles</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              No open positions <span className="text-gradient-orange">right now.</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We're not actively hiring at the moment — but we're always interested in meeting exceptional engineers,
              architects, and AI builders. When the right person reaches out, we make room.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="glass-panel rounded-2xl p-8 sm:p-10"
          >
            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {[
                { icon: Brain, title: "Data & AI Engineering", desc: "Snowflake, Databricks, dbt, LLMs, agents." },
                { icon: Shield, title: "Architecture & Strategy", desc: "Cloud-native platforms and AI roadmaps." },
                { icon: Zap, title: "Founding-Team Roles", desc: "Senior generalists who own outcomes." },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col">
                  <div className="w-10 h-10 rounded-xl surface-3 flex items-center justify-center mb-3">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-1.5">{title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Introduce yourself, share what you've built, and tell us what you'd want to work on.
              </p>
              <a
                href={`mailto:${CAREERS_EMAIL}?subject=Introduction — Talent Network`}
                data-cursor-hover
                className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-5 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity flex-shrink-0"
              >
                <Mail size={15} /> Join our talent network
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Perks */}
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
