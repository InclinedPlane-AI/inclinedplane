import PageLayout from "@/components/PageLayout";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import { motion } from "framer-motion";
import {
  Compass,
  Anchor,
  TrendingUp,
  Target,
  Users,
  Lightbulb,
  Heart,
  Shield,
  Sparkles,
  ArrowRight,
  Quote,
  Layers,
  Zap,
  Eye,
  Cpu,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

const stagger = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

/* ── Timeline dot ── */
const TimelineDot = ({ active = false }: { active?: boolean }) => (
  <div className="relative flex items-center justify-center">
    <div
      className={`w-4 h-4 rounded-full border-2 ${
        active
          ? "border-primary bg-primary/20"
          : "border-muted-foreground/30 bg-muted/50"
      }`}
    />
    {active && (
      <div className="absolute w-8 h-8 rounded-full bg-primary/10 animate-pulse" />
    )}
  </div>
);

const About = () => {
  return (
    <PageLayout>
      <PageHero
        label="Our Story"
        title={
          <>
            From Sail Analytics to{" "}
            <span className="text-gradient-orange">Inclined Plane.</span>
          </>
        }
        subtitle="A decade of data. A deliberate evolution. Built to move enterprises upward."
      />

      {/* ═══════════════ ORIGIN STORY ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <SectionGlow position="top-left" size={500} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-16">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              Where It Started
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Born as{" "}
              <span className="text-gradient-orange">Sail Analytics</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent hidden md:block" />

            <div className="space-y-12 md:pl-14">
              {/* Sail Analytics origin */}
              <motion.div {...fadeUp} className="relative">
                <div className="absolute -left-14 top-1 hidden md:block">
                  <TimelineDot />
                </div>
                <div className="glass-panel rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Anchor className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">
                        Sail Analytics LLP
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Bengaluru, India · Founded in the early days of the BI wave
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Sail Analytics was founded on a clear belief:{" "}
                    <span className="text-foreground font-medium">
                      data should cut through the haze of myths and biases.
                    </span>{" "}
                    We set out to help organizations across industries and geographies build
                    analytical capabilities that would drive better decisions, greater
                    innovation, and fairer workplaces.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    With a team of seasoned data scientists, statisticians, and business
                    analysts, Sail grew into a trusted partner for Fortune 500 companies.
                    We delivered robust analytics — from descriptive dashboards in Tableau
                    and Power BI to predictive modelling and prescriptive recommendations
                    — across retail, energy, manufacturing, healthcare, and financial
                    services.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Our proprietary platform{" "}
                    <span className="text-foreground font-medium">MeDaVi</span> became the
                    backbone of our BI practice, offering performance monitoring dashboards,
                    time-series forecasting, and advanced business analytics as managed
                    services. We were proud of what we built. But we also saw what was
                    coming.
                  </p>
                </div>
              </motion.div>

              {/* The inflection point */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <div className="absolute -left-14 top-1 hidden md:block">
                  <TimelineDot />
                </div>
                <div className="glass-panel rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">
                      The Inflection Point
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Across hundreds of engagements, a pattern emerged. Organizations were
                    drowning in dashboards but starving for{" "}
                    <span className="text-foreground font-medium">decisions</span>. The
                    bottleneck was never visualization — it was architecture, automation,
                    and the complete absence of data observability. Enterprises had
                    reporting layers built on fragile foundations.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    Meanwhile, the AI revolution was reshaping the landscape. LLMs, agentic
                    systems, and autonomous decision engines demanded something BI firms
                    weren't built to deliver: production-grade data infrastructure. We
                    realized that to truly serve the enterprises of tomorrow, we needed to
                    evolve — not incrementally, but fundamentally.
                  </p>
                </div>
              </motion.div>

              {/* The rebrand */}
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="absolute -left-14 top-1 hidden md:block">
                  <TimelineDot active />
                </div>
                <div
                  className="rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(25 100% 50% / 0.2)",
                    boxShadow:
                      "0 8px 40px -8px hsl(25 100% 50% / 0.15), inset 0 1px 0 hsl(25 100% 80% / 0.08)",
                  }}
                >
                  {/* Orange glow */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      background:
                        "radial-gradient(ellipse at 30% 20%, hsl(25 100% 50%), transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-orange flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          Becoming Inclined Plane
                        </h3>
                        <p className="text-xs text-primary font-mono">
                          Today · Restructured for the US enterprise market
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The name is intentional. An{" "}
                      <span className="text-foreground font-medium">inclined plane</span>{" "}
                      is one of the six classical simple machines — a surface that lets you
                      move upward with less force. It transforms effort into elevation.
                      That's exactly what we do with data.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We reduce the friction between raw information and strategic action.
                      We build the ramp that takes enterprises from data gravity — where
                      data accumulates but doesn't move — to data leverage, where every
                      byte compounds into competitive advantage.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      In physics, an inclined plane doesn't just move things up — it makes
                      the impossible, possible. Heavy loads that can't be lifted directly
                      can be moved upward along a gentle slope. That's the metaphor we live
                      by: enterprise data transformation doesn't have to be a brute-force
                      lift. With the right architecture, the right automation, and the right
                      intelligence — you ascend.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MISSION ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div
            {...fadeUp}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 glass-panel rounded-full px-4 py-1.5 mb-8">
              <Target className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">
                Our Mission
              </span>
            </div>
            <div
              className="rounded-2xl p-10 sm:p-14 relative overflow-hidden"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(25 100% 50% / 0.12)",
                boxShadow:
                  "0 12px 48px -12px hsl(25 100% 50% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
              }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-4">
                We help organizations make the{" "}
                <span className="text-gradient-orange">right decisions</span>{" "}
                through data.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Not more dashboards. Not more reports. The right decisions — powered
                by infrastructure that's observable, automated, and AI-ready from day
                one.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <SectionGlow position="top-right" size={450} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-14">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              What We Stand For
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Our <span className="text-gradient-orange">Values</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              These values underpin our code of conduct — the frame of reference for
              every decision we make, every system we build, and every engagement we
              take on.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Shield,
                title: "Zero Compromise Excellence",
                desc: "Our steadfast commitment to quality is our key asset. We are a group of highly skilled engineers who don't ship \"good enough.\" Every pipeline is production-grade, every model is validated, every architecture is built to scale.",
                accent: "from-primary/20 to-primary/5",
              },
              {
                icon: Heart,
                title: "Clients Come First",
                desc: "We exhibit a deeply customer-centric approach — effective communication, consistent results, and an understanding that your data is your business. We don't just deliver insights; we grow alongside you.",
                accent: "from-primary/15 to-primary/5",
              },
              {
                icon: Sparkles,
                title: "Value Delivered, Not Promised",
                desc: "Every member shares the need to create substantial impact. Our unwavering quest to add measurable value gives us the competitive edge. We measure success in business outcomes, not in slide decks.",
                accent: "from-primary/15 to-primary/5",
              },
            ].map(({ icon: Icon, title, desc, accent }, i) => (
              <motion.div
                key={title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel rounded-2xl p-7 relative overflow-hidden group"
              >
                <div
                  className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} rounded-t-2xl`}
                />
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ENGINEERING PHILOSOPHY ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <SectionGlow position="bottom-left" size={400} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-14">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              How We Build
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Engineering{" "}
              <span className="text-gradient-orange">Philosophy</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Every system we deliver is built with these non-negotiable principles.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              {
                icon: Eye,
                title: "Observability First",
                desc: "If you can't see it, you can't fix it. Every pipeline, every model, every workflow has monitoring, alerting, and lineage tracking from day one.",
              },
              {
                icon: Layers,
                title: "Production Mindset",
                desc: "Every pipeline is a production system. We test, version, monitor, and deploy with the same rigor as a SaaS product. No notebooks-in-production.",
              },
              {
                icon: Target,
                title: "Outcome-Driven",
                desc: "We measure success in business impact — revenue uplift, cost reduction, time-to-insight. Not pipeline count, not dashboard count, not vanity metrics.",
              },
              {
                icon: Cpu,
                title: "AI-Ready by Default",
                desc: "Every platform we build is designed to support ML workloads, feature stores, vector databases, and decision automation. Your data infra should never be the bottleneck to AI.",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-panel rounded-2xl p-7 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CULTURE ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-14">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              How We Work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Company <span className="text-gradient-orange">Culture</span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-2xl p-8 sm:p-10 relative overflow-hidden"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(25 100% 50% / 0.1)",
              boxShadow:
                "0 8px 32px -8px hsl(25 100% 50% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
            }}
          >
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                background:
                  "radial-gradient(ellipse at 70% 30%, hsl(25 100% 50%), transparent 60%)",
              }}
            />
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg">
                  Innovation Over Convention
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Our eyes are firmly set on adding enormous value to our clients. With
                such an end goal comes an environment that is appreciative of
                out-of-the-box thinking and relentless innovation. We don't just
                harbour creativity — we demand it.
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-4">
                {[
                  {
                    icon: Zap,
                    label: "Bias to Action",
                    text: "Ship fast, iterate faster. We value working systems over perfect proposals.",
                  },
                  {
                    icon: Users,
                    label: "Radical Transparency",
                    text: "Open communication, shared context, no information silos. Everyone sees the full picture.",
                  },
                  {
                    icon: ArrowRight,
                    label: "Grow With Clients",
                    text: "We're not vendors — we're partners. Your growth trajectory is ours.",
                  },
                ].map(({ icon: Icon, label, text }) => (
                  <div
                    key={label}
                    className="glass-panel rounded-xl p-5"
                  >
                    <Icon className="w-4 h-4 text-primary mb-2" />
                    <h4 className="font-semibold text-foreground text-sm mb-1">
                      {label}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ WHY NOW ═══════════════ */}
      <section className="relative py-20 pb-28 overflow-hidden">
        <SectionGlow position="center" size={500} />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-[2] text-center">
          <motion.div {...fadeUp}>
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">
              Why This Era
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              The Rebrand Isn't Cosmetic.{" "}
              <span className="text-gradient-orange">It's Structural.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
              The world doesn't need another BI consultancy. The AI era demands
              companies that can build the data infrastructure to power autonomous
              decision-making — observable, automated, and production-hardened.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              Sail Analytics gave us the foundation: deep domain expertise, Fortune 500
              trust, and an obsession with getting the answer right. Inclined Plane is
              what we're building on top: an engineering-first firm structured for the
              US enterprise market, designed to move organizations upward — from raw
              data to real intelligence — with less friction and more momentum.
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
