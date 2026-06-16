import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import awsLogo from "@/assets/aws-logo.png";
import azureLogo from "@/assets/azure-logo.png";
import fabricLogo from "@/assets/fabric-logo.png";
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
  Award,
  Telescope,
  Flag,
  Linkedin,
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
      className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${active
          ? "border-primary bg-primary shadow-[0_0_18px_hsl(25_100%_50%/0.7)]"
          : "border-muted-foreground/40 bg-background"
        }`}
    />
    {active && <div className="absolute w-8 h-8 rounded-full bg-primary/20 animate-pulse pointer-events-none" />}
  </div>
);

/* ── Timeline item that activates its dot once scrolled into view ── */
const TimelineItem = ({
  children,
  delay = 0,
  forceActive = false,
}: {
  children: React.ReactNode;
  delay?: number;
  forceActive?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // Activate the dot precisely when the card's top crosses ~60% of viewport.
  const inView = useInView(ref, { margin: "-60% 0px -30% 0px", once: false });
  const active = forceActive || inView;
  return (
    <motion.div
      ref={ref}
      {...fadeUp}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="relative"
      style={{ willChange: "transform, opacity" }}
    >
      <div className="absolute -left-14 top-1 hidden md:block z-10">
        <TimelineDot active={active} />
      </div>
      {children}
    </motion.div>
  );
};

/* ── Scroll-progress vertical line ── */
const TimelineTrack = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // Start filling when the timeline's top reaches 80% of viewport,
    // finish when its bottom reaches 40% of viewport.
    offset: ["start 80%", "end 40%"],
  });
  // Smooth the raw scroll value with a spring to remove jank on low-end devices.
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
    restDelta: 0.001,
  });
  // Use scaleY (transform) instead of height (layout) — GPU-accelerated, no reflow.
  const scaleY = useTransform(smooth, [0, 1], [0, 1]);
  return (
    <div ref={ref} className="relative">
      {/* Base line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-muted-foreground/15 hidden md:block" />
      {/* Progress line — transform-only animation, origin-top so it grows downward. */}
      <motion.div
        style={{
          scaleY,
          transformOrigin: "top",
          willChange: "transform",
        }}
        className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/80 to-primary/30 hidden md:block shadow-[0_0_8px_hsl(25_100%_50%/0.6)]"
      />
      {children}
    </div>
  );
};

const About = () => {
  return (
    <PageLayout>
      <SEOHead
        title="About Inclined Plane"
        description="Built for the AI Era — an engineering-first firm delivering production-grade data infrastructure and autonomous decision systems."
        path="/about"
      />
      <PageHero
        label="Who We Are"
        title={
          <>
            Built for the <span className="text-gradient-orange">AI Era</span>
          </>
        }
        subtitle="A decade of data. A deliberate evolution. Built to move enterprises upward."
      />

      {/* ═══════════════ OUR PURPOSE (Vision + Mission highlight) ═══════════════ */}
      <section className="relative py-24 overflow-hidden">
        <SectionGlow position="top-right" size={600} />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 mb-3 justify-center">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="font-mono text-[11px] text-primary tracking-[0.25em] uppercase">Our Purpose</span>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              The vision we're building toward, and the mission that guides every engagement.
            </p>
          </motion.div>

          <div className="flex flex-col gap-12">
            {/* Vision */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative pl-6 sm:pl-8 border-l-2 border-primary/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <Telescope className="w-5 h-5 text-primary" />
                <span className="font-mono text-[11px] text-primary tracking-[0.25em] uppercase">Vision</span>
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[1.15] tracking-tight">
                Building the foundation for the <span className="text-gradient-orange">AI-native world</span> - one enterprise at a time.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className="relative pl-6 sm:pl-8 border-l-2 border-primary/40"
            >
              <div className="flex items-center gap-3 mb-4">
                <Flag className="w-5 h-5 text-primary" />
                <span className="font-mono text-[11px] text-primary tracking-[0.25em] uppercase">Mission</span>
              </div>
              <p className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug tracking-tight">
                To be the firm that defines what{" "}
                <span className="text-gradient-orange">production-grade data infrastructure</span> means for the AI era,
                and the partner enterprises trust to build it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ LEADERSHIP ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <SectionGlow position="center" size={500} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-14">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Leadership</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Our <span className="text-gradient-orange">People</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Enterprise procurement diligence asks for key personnel credentials. Here is who leads our engagements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Keerthana */}
            <motion.div
              {...fadeUp}
              className="glass-panel rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                      <span className="text-xl font-bold text-primary">KV</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Keerthana Vayyasi</h3>
                      <p className="text-sm text-primary font-mono mt-1">Founder & CEO</p>
                    </div>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/keerthanavayyasi/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors border border-border/50"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Leading platform modernizations for Fortune 500s with a decade of enterprise data delivery experience.
                </p>
              </div>

              {/* Keerthana's Certifications */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                {[
                  {
                    name: "Databricks Certified",
                    logo: "https://cdn.simpleicons.org/databricks/FF3621",
                    detail: "Data Engineer & ML Professional",
                    color: "from-[hsl(0_85%_55%/0.15)] to-[hsl(0_85%_55%/0.03)]",
                  },
                  {
                    name: "Fabric Certified",
                    logo: fabricLogo,
                    detail: "Analytics Engineer & Data Engineer",
                    color: "from-[hsl(25_90%_50%/0.15)] to-[hsl(25_90%_50%/0.03)]",
                  },
                ].map(({ name, logo, detail, color }, i) => (
                  <div
                    key={name}
                    className="block glass-panel rounded-xl p-4 text-center relative overflow-hidden group hover:glow-orange transition-all duration-300 border border-border/40 hover:border-primary/30"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${color} pointer-events-none`} />
                    <div className="relative z-10">
                      <img
                        src={logo}
                        alt={name}
                        className="w-8 h-8 object-contain mx-auto mb-2 opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                      <h4 className="font-bold text-foreground text-xs mb-1">{name}</h4>
                      <p className="text-[10px] text-muted-foreground leading-snug">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Mohan */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="glass-panel rounded-2xl p-8 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                      <span className="text-xl font-bold text-primary">MG</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">Mohan Gowda T</h3>
                      <p className="text-sm text-primary font-mono mt-1">Senior Data Engineer</p>
                    </div>
                  </div>
                  <a
                    href="https://www.linkedin.com/in/mohangowdat/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-background/50 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors border border-border/50"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Architecting high-throughput, fault-tolerant data pipelines with active AWS and Azure engineering certifications.
                </p>
              </div>

              {/* Mohan's Certifications */}
              <div className="grid grid-cols-2 gap-3 mt-auto">
                {[
                  {
                    name: "AWS Certified",
                    logo: awsLogo,
                    detail: "Solutions Architect & Data Analytics",
                    color: "from-[hsl(30_100%_50%/0.15)] to-[hsl(30_100%_50%/0.03)]",
                  },
                  {
                    name: "Azure Certified",
                    logo: azureLogo,
                    detail: "Data Engineer & AI Engineer Associate",
                    color: "from-[hsl(210_90%_55%/0.15)] to-[hsl(210_90%_55%/0.03)]",
                  },
                ].map(({ name, logo, detail, color }, i) => (
                  <div
                    key={name}
                    className="block glass-panel rounded-xl p-4 text-center relative overflow-hidden group hover:glow-orange transition-all duration-300 border border-border/40 hover:border-primary/30"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-b ${color} pointer-events-none`} />
                    <div className="relative z-10">
                      <img
                        src={logo}
                        alt={name}
                        className="w-8 h-8 object-contain mx-auto mb-2 opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                      <h4 className="font-bold text-foreground text-xs mb-1">{name}</h4>
                      <p className="text-[10px] text-muted-foreground leading-snug">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CULTURE ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-14">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">How We Work</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Company <span className="text-gradient-orange">Culture</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Process-driven. Engineering-first. Built for the long term.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Methodology over heroics",
                text: "We don't rely on individuals to carry engagements. Every project runs on a defined framework: architecture reviews, quality gates, CI/CD workflows, and documented handoffs. The system is the safeguard, not the person.",
              },
              {
                icon: Layers,
                title: "Rigour at every layer",
                text: "We apply the same engineering standards to a reporting pipeline as we do to a production ML system. Testing, versioning, observability, non-negotiable, regardless of project size or timeline pressure.",
              },
              {
                icon: Zap,
                title: "Transparent by default",
                text: "No black boxes. No hidden complexity. Every system we build is documented, observable, and transferable. You should always know what you have, how it works, and why decisions were made.",
              },
              {
                icon: Users,
                title: "Built to last, not to impress",
                text: "We optimise for systems that compound over time, not for delivery that looks good in a demo but degrades in production. The measure of our work is how it performs six months after we leave.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                {...fadeUp}
                className="rounded-2xl p-8 relative overflow-hidden"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(25 100% 50% / 0.1)",
                  boxShadow: "0 8px 32px -8px hsl(25 100% 50% / 0.08), inset 0 1px 0 hsl(0 0% 100% / 0.04)",
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none opacity-[0.04]"
                  style={{
                    background: "radial-gradient(ellipse at 70% 30%, hsl(25 100% 50%), transparent 60%)",
                  }}
                />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">{title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ ORIGIN STORY ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <SectionGlow position="top-left" size={500} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-16">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Where It Started</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              <span className="text-gradient-orange">The Evolution</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <TimelineTrack>
            <div className="space-y-12 md:pl-14">
              {/* Sail Analytics origin */}
              <TimelineItem>
                <div className="glass-panel rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Anchor className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground text-lg">
                        A decade of enterprise data delivery across four continents.
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Bengaluru, India · Founded in the early days of the BI wave
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We've worked inside the data estates of manufacturers, energy companies, logistics firms, and
                    retailers, from initial BI build-outs to complex platform modernisations. Over time, one thing
                    became clear: the bottleneck was never visualisation. It was always architecture, automation, and
                    the complete absence of observability.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    That realisation is what InclinedPlane is built on.
                  </p>
                </div>
              </TimelineItem>

              {/* The inflection point */}
              <TimelineItem delay={0.1}>
                <div className="glass-panel rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Compass className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">What We've Built</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    InclinedPlane is an AI-first data engineering and analytics firm, process-driven,
                    engineering-first, and deliberate about the engagements we take on.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We work with mid-to-large enterprises across manufacturing, energy, logistics, FMCG, and retail. Organisations where data infrastructure isn't a nice-to-have, it's
                    <span className="text-foreground font-medium"> operational-critical</span>. Our delivery framework
                    runs across five layers, from AI-Readiness Foundation through to automated Intelligence systems,
                    each one observable, testable, and independently scalable.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We are certified across the modern data stack. We are structured for the US and UK enterprise
                    market. And we measure our success in one way: how the systems we build perform six months after we
                    leave.
                  </p>
                </div>
              </TimelineItem>

              {/* The rebrand */}
              <TimelineItem delay={0.2} forceActive>
                <div
                  className="rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(25 100% 50% / 0.2)",
                    boxShadow: "0 8px 40px -8px hsl(25 100% 50% / 0.15), inset 0 1px 0 hsl(25 100% 80% / 0.08)",
                  }}
                >
                  {/* Orange glow */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-[0.06]"
                    style={{
                      background: "radial-gradient(ellipse at 30% 20%, hsl(25 100% 50%), transparent 60%)",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-orange flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-lg">Why the Name?</h3>
                        <p className="text-xs text-primary font-mono">
                          Today · Restructured for the US enterprise market
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      The name is intentional. An <span className="text-foreground font-medium">inclined plane</span> is
                      one of the six classical simple machines, a surface that lets you move upward with less force. It
                      transforms effort into elevation. That's exactly what we do with data.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      We reduce the friction between raw information and strategic action. We build the ramp that takes
                      enterprises from data gravity, where data accumulates but doesn't move, to data leverage, where
                      every byte compounds into competitive advantage.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      In physics, an inclined plane doesn't just move things up. It makes the impossible, possible.
                      Heavy loads that can't be lifted directly can be moved upward along a gentle slope. That's the
                      metaphor we live by: enterprise data transformation doesn't have to be a brute-force lift. With
                      the right architecture, the right automation, and the right intelligence. You ascend.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We are a process-driven, engineering-first firm. Our delivery framework runs across five layers,
                      from AI-Readiness Foundation through to automated Intelligence systems, each one observable,
                      testable, and independently scalable. We take on fewer clients than we could, because the work
                      demands it. Every system we build is one we'd stake our reputation on.
                    </p>
                  </div>
                </div>
              </TimelineItem>
            </div>
          </TimelineTrack>
        </div>
      </section>

      {/* ═══════════════ MISSION ═══════════════
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <div
              className="rounded-2xl p-10 sm:p-14 relative overflow-hidden"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(25 100% 50% / 0.12)",
                boxShadow: "0 12px 48px -12px hsl(25 100% 50% / 0.1), inset 0 1px 0 hsl(0 0% 100% / 0.05)",
              }}
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6 mx-auto" />
              <p className="text-2xl sm:text-3xl font-bold text-foreground leading-snug mb-4">
                We help organizations make the <span className="text-gradient-orange">right decisions</span> through
                data.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Not more dashboards. Not more reports. The right decisions — powered by infrastructure that's
                observable, automated, and AI-ready from day one.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      */}

      {/* ═══════════════ VALUES ═══════════════ */}
      <section className="relative py-20 overflow-hidden">
        <SectionGlow position="top-right" size={450} />
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-[2]">
          <motion.div {...fadeUp} className="mb-14">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">What We Stand For</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Our <span className="text-gradient-orange">Values</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              These aren't aspirational statements on a wall. They are the operating principles that govern every
              engagement, every system, and every decision we make.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5">
            {[
              {
                icon: Shield,
                title: "Zero Compromise Excellence",
                desc: "We don't ship good enough. Every pipeline is production-grade. Every model is validated. Every architecture is built to scale. We hold ourselves to the standard we'd want if we were the client, because eventually, we always are.",
                accent: "from-primary/20 to-primary/5",
              },
              {
                icon: Heart,
                title: "Your Data Is Your Business",
                desc: "We treat it that way. We don't parachute in, deliver, and disappear. We operate as an extension of your team, with the same stake in outcomes, the same intolerance for bad data, and the same urgency when something breaks at 3am.",
                accent: "from-primary/15 to-primary/5",
              },
              {
                icon: Target,
                title: "Outcomes Over Outputs",
                desc: "We measure success in business impact: revenue protected, decisions accelerated, costs reduced. Not pipelines built, dashboards delivered, or hours logged. If it doesn't move the needle, it doesn't count.",
                accent: "from-primary/15 to-primary/5",
              },
              {
                icon: Sparkles,
                title: "We Say What We Think",
                desc: "If your data estate has a problem, we'll tell you, even if it's uncomfortable. If a technology choice is wrong for your context, we'll say so. Honest counsel is more valuable than agreeable consulting.",
                accent: "from-primary/15 to-primary/5",
              },
            ].map(({ icon: Icon, title, desc, accent }, i) => (
              <motion.div
                key={title}
                {...stagger}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel rounded-2xl p-7 relative overflow-hidden group"
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} rounded-t-2xl`} />
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
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
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">How We Build</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Engineering <span className="text-gradient-orange">Philosophy</span>
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
                desc: "We measure success in business impact: revenue uplift, cost reduction, time-to-insight. Not pipeline count, not dashboard count, not vanity metrics.",
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
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY NOW ═══════════════ */}
      <section className="relative py-20 pb-28 overflow-hidden">
        <SectionGlow position="center" size={500} />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-[2] text-center">
          <motion.div {...fadeUp}>
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Why This Era</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              The Rebrand Isn't Cosmetic. <span className="text-gradient-orange">It's Structural.</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
              The world doesn't need another BI consultancy. It needs firms that can build the data infrastructure to
              power automated decision-making, observable, and production-hardened. That's what
              InclinedPlane is built to do.
            </p>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
