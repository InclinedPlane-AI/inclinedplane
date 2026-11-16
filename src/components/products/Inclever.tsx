import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  MessageCircleWarning,
  ListFilter,
  FileBadge,
  UserCheck,
  MessagesSquare,
  RadioTower,
  MonitorPlay,
  Settings2,
  Zap,
  Eye,
  PenLine,
  UserRound,
  Quote,
} from "lucide-react";
import SectionGlow from "@/components/SectionGlow";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import QuestionFlowDemo from "./QuestionFlowDemo";
import CertificateDemo from "./CertificateDemo";
import TwoAssistantsDemo from "./TwoAssistantsDemo";
import CircuitBreakerDemo from "./CircuitBreakerDemo";
import { RequestDemoButton } from "./RequestDemo";
import { ProductSubnav, ComparisonTable, AudienceStrip, type Mark } from "./ProductChrome";
import { fadeUp, Eyebrow, SectionHeading } from "./shared";

/* ───────────────────────── data ───────────────────────── */

const SECTIONS = [
  { id: "compare", label: "Two assistants" },
  { id: "how-it-works", label: "Three gates" },
  { id: "arct", label: "Readiness audit" },
  { id: "blast-radius", label: "Circuit breaker" },
  { id: "assurance", label: "Assurance" },
  { id: "why", label: "Why Inclever" },
  { id: "faq", label: "FAQ" },
];

const QUOTES = [
  "We built a chatbot on our warehouse and it confidently gave a finance director the wrong number.",
  "Nobody can tell me whether our data is good enough for AI. Only that it's “mostly fine”.",
  "Audit won't sign off on letting an AI near finance data.",
];

const PILLARS = [
  { icon: MessageCircleWarning, title: "It refuses honestly", body: "A refusal always names the specific check that failed and the evidence behind it. “Data quality issue” is never an acceptable answer." },
  { icon: ListFilter, title: "It selects, it never invents", body: "The AI can only pick from the metrics, dimensions and time windows your organization has actually defined. If nothing matches, it says so." },
  { icon: FileBadge, title: "Readiness is evidenced", body: "Every data asset is audited against explicit rules, every verdict traces to a query and its result, and readiness is issued or withheld as a certificate." },
  { icon: UserCheck, title: "Every gap becomes work", body: "Anything Inclever can't answer becomes a tracked task, assigned to a named person, with a clock on it." },
];

const STAGES = [
  { n: "0", title: "Orientation", checks: "Are we auditing the right, live system? Is every expected table present and loaded?", flag: "Documented tables that don't exist; empty tables." },
  { n: "1", title: "Structure", checks: "Column catalogue, data types that match meaning, the grain of every table.", flag: "Money stored as text; duplicates where every row should be unique." },
  { n: "2", title: "Volume & loading", checks: "Load schedule, gaps, business-period coverage, backfill versus ongoing loads.", flag: "A “live” table with no recent loads; a missing month." },
  { n: "3", title: "Column quality", checks: "Nulls, placeholders posing as data (“N/A”, “TBD”), outliers, mixed currencies or units.", flag: "An amount column silently mixing currencies, so totals are meaningless." },
  { n: "4", title: "Relationships", checks: "Do joins actually match? Orphan records, duplicate reference tables, joins on free text.", flag: "Transactions referencing codes that don't exist in the master table." },
  { n: "5", title: "Business logic", checks: "Fiscal calendar, cumulative versus periodic measures, manual adjustments, classification rules.", flag: "A year-to-date column being summed as if it were monthly." },
  { n: "6", title: "AI readiness", checks: "Is every finding translated into a rule the AI respects, and tagged “fix at source” or “handle in the AI layer”?", flag: "A known issue recorded in a report but never enforced." },
];

const VERDICTS = [
  { name: "Passed", cls: "text-emerald-500 border-emerald-500/40 bg-emerald-500/10", body: "The rule's condition was met." },
  { name: "Failed", cls: "text-red-500 border-red-500/40 bg-red-500/10", body: "A genuine finding about the data. Never used for a technical problem." },
  { name: "Not evaluated", cls: "text-muted-foreground border-border bg-muted", body: "The rule couldn't be checked. Never counted as a failure, never counted as a pass." },
];

const LEVELS = [
  { icon: Zap, name: "Ask the agent now", body: "An immediate answer on audited data." },
  { icon: Eye, name: "Agent now, QC to follow", body: "An immediate answer marked provisional. Corrected in the same thread if a reviewer finds it wrong." },
  { icon: PenLine, name: "Agent, held for review", body: "Produced but not sent until a named person signs it." },
  { icon: UserRound, name: "Ask a person", body: "A named analyst owns the answer, with the AI's draft and every relevant verdict." },
];

const TASKS = [
  { task: "Review", when: "An answer needs a signature", owner: "Reviewer", clock: "4h" },
  { task: "Grant or refuse", when: "Someone was refused on permissions", owner: "Permission owner", clock: "8h" },
  { task: "Fix the data", when: "A blocking rule is failing under a live question", owner: "Data owner", clock: "24h" },
  { task: "Answer it", when: "The asker chose a person", owner: "Analyst", clock: "24h" },
  { task: "Declare it", when: "A metric, dimension or window isn't defined", owner: "Semantic layer author", clock: "72h" },
  { task: "Teach the word", when: "Wording nobody has defined a synonym for", owner: "Semantic layer author", clock: "72h" },
];

const MATRIX: { label: string; values: Mark[] }[] = [
  { label: "Answers plain-English questions", values: ["yes", "no", "yes"] },
  { label: "Only uses metrics you've defined", values: ["no", "yes", "yes"] },
  { label: "Knows whether the data is fit right now", values: ["no", "no", "yes"] },
  { label: "Refuses with the specific reason", values: ["no", "no", "yes"] },
  { label: "Checks permission before reading anything", values: ["partial", "yes", "yes"] },
  { label: "Every answer traceable to its evidence", values: ["no", "partial", "yes"] },
  { label: "Unanswered questions become owned work", values: ["no", "no", "yes"] },
];

const SURFACES = [
  { icon: MessagesSquare, name: "Inclever Ask", who: "Business users, in Teams", body: "Ask in plain English, get governed answers." },
  { icon: RadioTower, name: "AI Readiness Control Tower", who: "Data owners and governance", body: "Continuously audit data and definitions, certify readiness, manage remediation." },
  { icon: MonitorPlay, name: "Monitor", who: "Data team, governance, audit", body: "A read-only view of every conversation, every decision and the human work queue." },
  { icon: Settings2, name: "Configure", who: "Platform admins", body: "Register sources, assets, definitions, dashboards, channels, people and rules." },
];

const PERSONAS = [
  { role: "CFO & Finance", cares: "Numbers they can stand behind.", gets: "Answers that carry their evidence, or are refused with a reason." },
  { role: "CDO & Head of Data", cares: "Proving data is fit for AI, at scale.", gets: "A continuous, rule-based readiness audit with certificates." },
  { role: "Audit, Risk & Compliance", cares: "Traceability and control.", gets: "A full decision trail for every question, refusal and exception." },
  { role: "Analytics & BI leads", cares: "Fewer repetitive requests, no shadow numbers.", gets: "Self-serve answers on governed definitions, with gaps routed back as tracked work." },
  { role: "Business users", cares: "A quick, trustworthy answer where they already work.", gets: "Plain-English questions and answers inside Microsoft Teams." },
];

const FAQS = [
  { q: "Does Inclever replace our BI tool?", a: "No. It answers from your existing signed-off dashboards first, and only generates an answer when nothing already built covers the question. The cheapest path is also the strongest, because a person built and signed that tile." },
  { q: "Can the AI make up a metric or a number?", a: "It's designed not to. The AI can only select from metrics, dimensions and time windows you've defined, and every selection is validated. Numbers come from your data through those definitions, not from the model." },
  { q: "What happens when the data has a problem?", a: "The audit verdicts decide. A blocking issue stops Inclever answering on that data and names the failing check; lesser issues mean the answer is held for review or marked provisional. Each case raises a task for the data owner." },
  { q: "Will someone learn anything about data they're not allowed to see?", a: "No. Permission is checked first, before anything about the data's state is read, so a refusal reveals nothing about the number." },
  { q: "How do you know whether our data is ready for AI?", a: "The AI Readiness Control Tower runs explicit, versioned rules against each data asset and business definition, records an evidenced verdict for every rule, and issues or withholds a readiness certificate. You can open every verdict and see what it was based on, including the actual offending rows where that makes sense." },
  { q: "What if we need to accept a known issue?", a: "Approve a scoped exception with a justification and an expiry date. The rule keeps failing outside that scope, and any answer relying on the exception discloses it." },
  { q: "Is every conversation auditable?", a: "Yes. Every question, gate decision, refusal, task and exception is written to a permanent decision record you can replay in Monitor." },
];

/* ───────────────────────── component ───────────────────────── */

const Inclever = () => {
  const [stage, setStage] = useState(3);
  const [persona, setPersona] = useState(0);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <SectionGlow position="top-right" size={600} />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
          <nav className="flex items-center gap-1 text-xs text-muted-foreground mb-6" aria-label="Breadcrumb">
            <Link to="/products" className="hover:text-primary transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Inclever</span>
          </nav>
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp}>
              <Eyebrow>Governed AI analytics</Eyebrow>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
                In<span className="text-gradient-orange">clever</span>
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-foreground mb-5">AI answers you can audit.</p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                Most companies want to put an AI agent in front of their data. Almost none can say, with evidence, whether
                that data is fit for an AI to answer from. Inclever solves both halves: it continuously audits your data and
                the definitions on top of it, and lets people ask plain-English questions in Microsoft Teams, answering only
                when the data has earned it. It never guesses.
              </p>
              <AudienceStrip product="inclever" />
              <div className="flex flex-wrap gap-3">
                <RequestDemoButton products={["inclever"]} />
                <a
                  href="#compare"
                  className="inline-flex items-center justify-center gap-2 border border-border px-6 py-3 rounded-lg text-sm font-medium text-foreground hover:border-primary/50 transition-colors"
                >
                  See it in action
                </a>
              </div>
            </motion.div>
            <div className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">What we kept hearing</p>
              {QUOTES.map((q, i) => (
                <motion.blockquote
                  key={q}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.2 + i * 0.12 }}
                  className={`glass-panel rounded-2xl p-4 sm:p-5 flex gap-3 ${i === 1 ? "lg:ml-8" : i === 2 ? "lg:ml-4" : ""}`}
                >
                  <Quote className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">{q}</p>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductSubnav product="inclever" sections={SECTIONS} />

      {/* ── Two assistants ── */}
      <section id="compare" className="relative py-16 sm:py-20 overflow-hidden scroll-mt-32">
        <SectionGlow position="center" size={500} />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
          <SectionHeading
            eyebrow="The difference"
            title={<>A chatbot on your warehouse will answer anything. <span className="text-gradient-orange">That's the problem.</span></>}
            intro="It sums cumulative columns, adds currencies together, invents breakdowns and answers people who shouldn't see the number, all in the same confident tone. Pick a question and see what each one does."
          />
          <motion.div {...fadeUp}>
            <TwoAssistantsDemo />
          </motion.div>
        </div>
      </section>

      {/* ── Three gates ── */}
      <section id="how-it-works" className="relative py-16 sm:py-20 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How it works"
            title={<>Three gates <span className="text-gradient-orange">before every number</span></>}
            intro="Every confirmed question passes permission, definition and data quality checks, always in that order. Permission goes first on purpose, so a refusal never leaks anything about a number the person isn't allowed to see."
          />
          <motion.div {...fadeUp}>
            <QuestionFlowDemo />
          </motion.div>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map((p, i) => (
              <motion.div key={p.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.07 }} className="glass-panel rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="font-semibold text-foreground mb-2">{p.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARCT ── */}
      <section id="arct" className="relative py-16 sm:py-20 overflow-hidden scroll-mt-32">
        <SectionGlow position="bottom-left" size={600} />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
          <SectionHeading
            eyebrow="AI Readiness Control Tower (ARCT)"
            title={<>Know your data is AI-ready <span className="text-gradient-orange">before your AI does</span></>}
            intro="ARCT never answers business questions. Its job is narrower and more important: run explicit rules against every data asset and every business definition, record a verdict for each, and decide whether that asset is ready for an AI to answer from unsupervised."
          />
          <motion.div {...fadeUp} className="glass-panel rounded-2xl p-4 sm:p-6 mb-6">
            <p className="text-sm font-semibold text-foreground mb-4">The readiness methodology, in seven stages</p>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 mb-5" role="tablist" aria-label="Audit stages">
              {STAGES.map((s, i) => (
                <button
                  key={s.title}
                  role="tab"
                  aria-selected={stage === i}
                  onClick={() => setStage(i)}
                  className={`shrink-0 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    stage === i ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className={`font-mono ${stage === i ? "text-primary" : ""}`}>{s.n}</span>
                  {s.title}
                </button>
              ))}
            </div>
            <div className="relative h-1 rounded-full bg-muted mb-5 overflow-hidden">
              <motion.div className="absolute inset-y-0 left-0 bg-gradient-orange" animate={{ width: `${((stage + 1) / STAGES.length) * 100}%` }} transition={{ duration: 0.4 }} />
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <div className="rounded-xl border border-border bg-background/60 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-500 mb-1.5">What ARCT checks</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{STAGES[stage].checks}</p>
                </div>
                <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-red-500 mb-1.5">Example red flag</p>
                  <p className="text-sm text-foreground/90 leading-relaxed">{STAGES[stage].flag}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="space-y-6">
            <motion.div {...fadeUp} className="rounded-2xl border border-border bg-card/40 p-5 sm:p-6">
              <p className="text-sm font-semibold text-foreground mb-4">Verdicts with a strict vocabulary</p>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                {VERDICTS.map((v) => (
                  <div key={v.name} className="flex flex-col items-start gap-2">
                    <span className={`px-2 py-1 rounded border text-[11px] font-semibold ${v.cls}`}>{v.name}</span>
                    <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Alongside the pass rate, ARCT reports <span className="text-foreground font-medium">coverage</span>: how many
                rules were actually evaluated. That separates “is the data healthy?” from “is the audit itself healthy?”.
                Evidence that has aged past its shelf life counts as no evidence, never as a pass.
              </p>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              <CertificateDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Circuit breaker ── */}
      <section id="blast-radius" className="relative py-16 sm:py-20 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Live impact"
            title={<>Break the data, and Inclever <span className="text-gradient-orange">stops answering on it</span></>}
            intro="Inclever never re-checks data on its own: it reads the audit's latest verdicts. The moment a blocking rule fails, every question touching that asset, and every asset downstream of it, is held. Fix the data, re-run the audit, and answers come back automatically."
          />
          <motion.div {...fadeUp}>
            <CircuitBreakerDemo />
          </motion.div>
        </div>
      </section>

      {/* ── Assurance + human queue ── */}
      <section id="assurance" className="relative py-16 sm:py-20 scroll-mt-32">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <SectionHeading
                eyebrow="Inclever Ask"
                title={<>Four levels of <span className="text-gradient-orange">assurance</span></>}
                intro="Each answer's level is set by the audit verdicts on its data and the channel's default. Anyone who wants a signature can ask for one."
              />
              <div className="relative space-y-3">
                <span className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-primary via-primary/40 to-border" aria-hidden="true" />
                {LEVELS.map((l, i) => (
                  <motion.div key={l.name} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.08 }} className="relative flex gap-4 items-start">
                    <span className="relative z-[1] w-10 h-10 shrink-0 rounded-full bg-background border border-primary/40 flex items-center justify-center">
                      <l.icon className="w-4 h-4 text-primary" />
                    </span>
                    <div className="rounded-xl border border-border bg-card/40 p-4 flex-1">
                      <p className="text-sm font-semibold text-foreground">{l.name}</p>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{l.body}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Monitor & the human queue"
                title={<>Every gap has an <span className="text-gradient-orange">owner and a clock</span></>}
                intro="A queue full of specific, named gaps is the product working, not failing. Work is never “escalated to the team”."
              />
              <motion.div {...fadeUp} className="rounded-2xl border border-border overflow-hidden">
                <div className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-3 px-4 py-2.5 bg-muted/60 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <span>Task</span>
                  <span className="hidden sm:block">Owner</span>
                  <span>Default clock</span>
                </div>
                {TASKS.map((t) => (
                  <div key={t.task} className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_1fr_auto] gap-3 px-4 py-3 border-t border-border items-center">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{t.task}</p>
                      <p className="text-[11px] text-muted-foreground">{t.when}</p>
                      <p className="sm:hidden text-[11px] text-foreground/80 mt-0.5">{t.owner}</p>
                    </div>
                    <p className="hidden sm:block text-xs text-foreground/80">{t.owner}</p>
                    <span className="font-mono text-xs text-primary justify-self-end">{t.clock}</span>
                  </div>
                ))}
              </motion.div>
              <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Repeats of the same gap raise a counter on one task instead of flooding the queue. When an analyst answers by
                hand, their working becomes the definition the next person inherits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Inclever ── */}
      <section id="why" className="relative py-16 sm:py-20 overflow-hidden scroll-mt-32">
        <SectionGlow position="top-right" size={500} />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
          <SectionHeading
            eyebrow="Why Inclever"
            title={<>The flexibility of a chatbot. <span className="text-gradient-orange">The discipline of a signed-off report.</span></>}
            intro="Chatbots answer anything but can't tell you when they're wrong. Dashboards are trustworthy but only answer what someone built in advance. Inclever is built to give you both."
          />
          <div className="mb-14">
            <ComparisonTable columns={["Chatbot on your warehouse", "Dashboards", "Inclever"]} rows={MATRIX} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {SURFACES.map((s, i) => (
              <motion.div key={s.name} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.07 }} className="rounded-2xl border border-border bg-card/40 p-5">
                <s.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-sm font-semibold text-foreground">{s.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-1 mb-2">{s.who}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="glass-panel rounded-2xl p-4 sm:p-6">
            <p className="text-sm font-semibold text-foreground mb-1">Who it's for</p>
            <p className="text-xs text-muted-foreground mb-4">
              Inclever is for the people who use the data: business users and analysts ask, leaders rely on the answers, and your data and audit teams keep it governed.
            </p>
            <div className="flex flex-wrap gap-2 mb-5" role="tablist" aria-label="Personas">
              {PERSONAS.map((p, i) => (
                <button
                  key={p.role}
                  role="tab"
                  aria-selected={persona === i}
                  onClick={() => setPersona(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                    persona === i ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {p.role}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={persona}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-4"
              >
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1">What they care about</p>
                  <p className="text-base text-foreground">{PERSONAS[persona].cares}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-1">What Inclever gives them</p>
                  <p className="text-base text-foreground">{PERSONAS[persona].gets}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="relative py-16 sm:py-20 scroll-mt-32">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQ" title={<>Questions buyers <span className="text-gradient-orange">ask first</span></>} />
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-sm sm:text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default Inclever;
