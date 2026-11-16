import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Activity,
  Bug,
  Map as MapIcon,
  Lock,
  PackageX,
  Wallet,
  HardDrive,
  ScrollText,
  Workflow,
  Cpu,
  HelpCircle,
  Bell,
  RefreshCw,
  CheckCircle2,
  Layers,
  Search,
  Plug,
  Wrench,
  LayoutDashboard,
  SlidersHorizontal,
  Repeat,
  Files,
  Scissors,
  Rocket,
  Ghost,
  GitCompare,
  Scale,
} from "lucide-react";
import SectionGlow from "@/components/SectionGlow";
import SignatureCollapse from "./SignatureCollapse";
import SqlGuardDemo from "./SqlGuardDemo";
import { fadeUp, Eyebrow, SectionHeading } from "./shared";

/* ───────────────────────── data ───────────────────────── */

const CLUES = [
  {
    icon: ScrollText,
    where: "The run log",
    knows: "That a load failed, when, and under which parent.",
    lacks: "The error itself. Some rows are never closed and say “In progress” forever.",
  },
  {
    icon: Workflow,
    where: "The orchestrator",
    knows: "Why it failed, in the activity output.",
    lacks: "Buried several clicks deep per run, and kept for only about 45 days.",
  },
  {
    icon: Cpu,
    where: "The compute engine",
    knows: "The full stack trace and notebook output.",
    lacks: "One run at a time, in a separate workspace per environment.",
  },
  {
    icon: HelpCircle,
    where: "Nobody",
    knows: "The patterns.",
    lacks: "Which errors recur, which tables are late against their own rhythm, where environments drift, whether a release caused it.",
  },
];

const PILLARS = [
  {
    icon: Activity,
    title: "Health",
    body: "Each environment's state (Healthy, Degraded or Failing), load success rate, the biggest incidents and the release that preceded them, and the nightly batch's finish time against its target.",
  },
  {
    icon: Bug,
    title: "Debugging",
    body: "A de-duplicated error history. Hundreds of failures collapse into a few signatures, each with the real stack trace, the root cause rather than its cascaded parents, and deep links into the source tools.",
  },
  {
    icon: MapIcon,
    title: "Estate insight",
    body: "Every batch as a Gantt timeline, every table compared across environments, ingestion watermarks per source system, warehouse drift, and deployments classified even where the release log never closed.",
  },
];

type Sev = "High" | "Medium" | "Low" | "Custom";
const ALERTS: { name: string; sev: Sev; when: string }[] = [
  { name: "Failed", sev: "High", when: "A root-cause failure with no success since" },
  { name: "Stuck", sev: "High", when: "Running beyond max(3h, 2× its own median)" },
  { name: "Collector", sev: "High", when: "Two collections in a row failed" },
  { name: "Stale", sev: "Medium", when: "Overdue against its own usual cadence" },
  { name: "Ingestion stalled", sev: "Medium", when: "A watermark not finalised for 12h" },
  { name: "No batch", sev: "Medium", when: "No top-level batch within N hours" },
  { name: "Check errored", sev: "Medium", when: "A custom check can't run" },
  { name: "Custom check", sev: "Custom", when: "Your own read-only SQL check returns rows" },
  { name: "Slow", sev: "Low", when: "Latest run over 2× its 14-day median" },
  { name: "Orphans", sev: "Low", when: "Log says running, orchestrator says done" },
  { name: "Unregistered source", sev: "Low", when: "Data arriving from an unknown system" },
  { name: "Truncated names", sev: "Low", when: "Table names silently cut short" },
];
const SEV_STYLE: Record<Sev, string> = {
  High: "bg-red-500/10 text-red-500 border-red-500/30",
  Medium: "bg-amber-500/10 text-amber-500 border-amber-500/30",
  Low: "bg-slate-500/10 text-slate-400 border-slate-500/30",
  Custom: "bg-primary/10 text-primary border-primary/30",
};

const GUARANTEES = [
  { icon: Lock, title: "Read, never write", body: "Every SQL statement passes a guard that refuses anything but SELECT or WITH. Sessions never hold locks that could slow the ETL." },
  { icon: PackageX, title: "Nothing deployed", body: "No agents, diagnostic settings, tables, firewall rules or role assignments in your estate. It uses the engineer's own sign-in." },
  { icon: Wallet, title: "No cost to scan", body: "Warehouse table data is never scanned, only catalog views. Collection is off until someone presses Collect now or switches it on." },
  { icon: HardDrive, title: "Data stays local", body: "Operational metadata only, never business data. Review copies are view-only and shared behind sign-in, never anonymously." },
];

const CORE = ["Portal & design system", "Collector framework", "Error index", "Alert engine", "Local store", "Safety principles"];
const LAYERS = [
  { stack: "Azure Data Factory · Databricks · Synapse", status: "Live", live: true },
  { stack: "Microsoft Fabric", status: "Next", live: false },
  { stack: "Airflow · Snowflake · dbt", status: "Next", live: false },
  { stack: "AWS Glue · Redshift", status: "Next", live: false },
];

const STEPS = [
  { icon: Search, title: "Discover", body: "Map services, environments, run logs, conventions, what breaks most and who needs to know." },
  { icon: Plug, title: "Connect, read-only", body: "Agree read permissions only. Nothing is installed in your estate." },
  { icon: Wrench, title: "Build the client layer", body: "Write connectors and map your statuses and conventions onto the core." },
  { icon: LayoutDashboard, title: "Tailor dashboards", body: "Add the pages that matter for your estate on the core patterns." },
  { icon: SlidersHorizontal, title: "Tune alerts", body: "With the people who run the platform, until alerts are signals rather than noise." },
  { icon: Repeat, title: "Operate & iterate", body: "Act on findings, keep the docs current, add roadmap features as needed." },
];

const FINDINGS = [
  { icon: Files, title: "Two pipelines, one file", body: "A recurring read failure traced to two pipelines overwriting the same files at the same time." },
  { icon: Scissors, title: "A framework bug, hiding in plain sight", body: "Long table names silently truncated because a procedure parameter was half the width of its column." },
  { icon: Rocket, title: "Releases that never record failure", body: "A release log that only ever wrote “in progress” or “completed”, so failed deployments looked stuck forever." },
  { icon: Ghost, title: "Runs left open forever", body: "A pipeline that opened its audit row but never closed it, so every run looked like it was still going." },
  { icon: GitCompare, title: "Environment drift", body: "Objects that differed between environments, mostly stray backup tables and permission views." },
  { icon: Scale, title: "A conversion quietly 1.6% low", body: "A kilogram constant that converted to imperial tons, not metric tonnes, understating every “tonne” column." },
];

const QUESTIONS = [
  {
    q: "What failed?",
    state: "Live",
    body: "The error index, alerts, batch timelines and entity views in today's portal.",
  },
  {
    q: "Why?",
    state: "Developing",
    body: "Plain-language root-cause analysis from the error, stack trace and run metadata, with names masked first. Switched on only with your consent. Plus incident reports with lessons learnt, shown the next time the same signature appears.",
  },
  {
    q: "What does it break?",
    state: "Planned",
    body: "Lineage and impact: when a table fails, every downstream fact, warehouse view and report that is now stale.",
  },
  {
    q: "How do we fix it?",
    state: "Planned",
    body: "Architecture-aware root cause and failure-to-code links: the exact notebook or procedure, the last commits that touched it, and whether a release happened since it last succeeded. Consent required.",
  },
];
const STATE_STYLE: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  Developing: "bg-primary/10 text-primary border-primary/30",
  Planned: "bg-muted text-muted-foreground border-border",
};

/* ───────────────────────── component ───────────────────────── */

const PipelineIQ = () => {
  const [q, setQ] = useState(0);

  return (
    <div id="pipelineiq" className="scroll-mt-28">
      {/* ── Intro ── */}
      <section className="relative py-20 sm:py-24 overflow-hidden">
        <SectionGlow position="top-left" size={600} />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">
            <motion.div {...fadeUp}>
              <Eyebrow>Product 01 · Pipeline observability</Eyebrow>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
                Pipeline<span className="text-gradient-orange">IQ</span>
              </h2>
              <p className="text-xl sm:text-2xl font-semibold text-foreground mb-5">From what failed to why.</p>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6">
                A read-only monitoring, alerting and ETL-debugging portal for enterprise data platforms. It pulls
                together the clues your run logs, orchestrator and compute engine each hold separately, shows you the
                real root cause, and raises an alert only when something genuinely needs attention.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["Read-only by design", "Nothing installed", "Tailored to your estate", "Alerts that close themselves"].map((c) => (
                  <span key={c} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-foreground/90 border border-primary/20">
                    {c}
                  </span>
                ))}
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity glow-orange"
              >
                Book a PipelineIQ walkthrough <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stylised portal preview */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="glass-panel rounded-2xl p-4 sm:p-5" aria-hidden="true">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Overview · last 14 days</span>
                <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> live batch
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { env: "DEV", state: "Healthy", cls: "text-emerald-500" },
                  { env: "TEST", state: "Degraded", cls: "text-amber-500" },
                ].map((e) => (
                  <div key={e.env} className="rounded-lg border border-border bg-background/60 p-3">
                    <p className="font-mono text-[10px] text-muted-foreground">{e.env}</p>
                    <p className={`text-sm font-semibold ${e.cls}`}>{e.state}</p>
                  </div>
                ))}
              </div>
              <div className="rounded-lg border border-border bg-background/60 p-3 mb-4">
                <p className="font-mono text-[10px] text-muted-foreground mb-2">Root-cause failures</p>
                <div className="flex items-end gap-1 h-20">
                  {[3, 2, 4, 2, 1, 3, 2, 14, 18, 3, 2, 1, 2, 1].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${(h / 18) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.03 }}
                      className={`flex-1 rounded-sm ${h > 10 ? "bg-primary" : "bg-primary/35"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { t: "File overwritten mid-read", n: "1 signature · seen across many tables", sev: "High" as Sev },
                  { t: "6 tables overdue vs their cadence", n: "1 roll-up alert", sev: "Medium" as Sev },
                ].map((a) => (
                  <div key={a.t} className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/60 px-3 py-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{a.t}</p>
                      <p className="text-[10px] text-muted-foreground">{a.n}</p>
                    </div>
                    <span className={`shrink-0 px-2 py-0.5 rounded border text-[10px] font-medium ${SEV_STYLE[a.sev]}`}>{a.sev}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── The problem: scattered clues ── */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="The problem"
            title={<>When a night fails, the evidence is <span className="text-gradient-orange">scattered</span></>}
            intro="Diagnosing one failed batch means visiting four places, each holding one piece of the answer."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CLUES.map((c, i) => (
              <motion.div
                key={c.where}
                {...fadeUp}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-2xl border p-5 ${i === 3 ? "border-dashed border-primary/40 bg-primary/5" : "border-border bg-card/40"}`}
              >
                <c.icon className="w-5 h-5 text-primary mb-3" />
                <p className="text-sm font-semibold text-foreground mb-3">{c.where}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-500 mb-1">Knows</p>
                <p className="text-sm text-muted-foreground mb-3">{c.knows}</p>
                <p className="font-mono text-[10px] uppercase tracking-wider text-red-500 mb-1">Lacks</p>
                <p className="text-sm text-muted-foreground">{c.lacks}</p>
              </motion.div>
            ))}
          </div>
          <motion.div {...fadeUp} className="mt-8 grid md:grid-cols-3 gap-4">
            {PILLARS.map((p) => (
              <div key={p.title} className="glass-panel rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <p.icon className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-semibold text-foreground">{p.title}</p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Noise to signal ── */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <SectionGlow position="center" size={500} />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2] grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-center">
          <motion.div {...fadeUp}>
            <Eyebrow>The error index</Eyebrow>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground leading-tight tracking-tight mb-4">
              Hundreds of failures. <span className="text-gradient-orange">A handful of problems.</span>
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              PipelineIQ merges failures from every tool into one history, separates the root cause from the parents
              that failed only because a child did, and fingerprints each error so the same fault groups together
              across runs, tables and environments.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Each signature opens to the real stack trace, the table's last runs, the same error elsewhere, the last
              deployment before it, and one-click links to the exact run in the source tool.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
            <SignatureCollapse />
          </motion.div>
        </div>
      </section>

      {/* ── Alerts ── */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Alerting"
            title={<>Signals, <span className="text-gradient-orange">not noise</span></>}
            intro="The first alert run on a real estate produced 368 alerts. Nobody reads 368 alerts. So every rule became adaptive, judging each table against its own history, or rolled up to one alert per environment. Tuned with the people who run the platform, that became a handful of real signals."
          />
          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-start">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {ALERTS.map((a, i) => (
                <motion.div
                  key={a.name}
                  {...fadeUp}
                  transition={{ duration: 0.35, delay: (i % 6) * 0.04 }}
                  className="rounded-xl border border-border bg-card/40 p-4"
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-sm font-semibold text-foreground">{a.name}</p>
                    <span className={`px-2 py-0.5 rounded border text-[10px] font-medium ${SEV_STYLE[a.sev]}`}>{a.sev}</span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.when}</p>
                </motion.div>
              ))}
            </div>
            {/* Lifecycle */}
            <motion.div {...fadeUp} className="glass-panel rounded-2xl p-6 lg:w-64">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-4">Alert lifecycle</p>
              {[
                { icon: Bell, t: "Fires", d: "Once per problem, keyed by environment, rule and subject." },
                { icon: RefreshCw, t: "Updates", d: "While the problem lasts, instead of firing again every cycle." },
                { icon: CheckCircle2, t: "Closes itself", d: "When the condition clears: a successful rerun, a finished load, a working connection." },
              ].map((s, i, all) => (
                <div key={s.t} className="relative flex gap-3 pb-5 last:pb-0">
                  {i < all.length - 1 && <span className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />}
                  <div className="w-8 h-8 shrink-0 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <s.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{s.t}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.d}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Guarantees + SQL guard ── */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <SectionGlow position="bottom-right" size={500} />
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
          <SectionHeading
            eyebrow="Safety"
            title={<>It can't break what it watches. <span className="text-gradient-orange">By construction.</span></>}
            intro="The safety principles are enforced in code, not left to good intentions."
          />
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="grid sm:grid-cols-2 gap-4">
              {GUARANTEES.map((g, i) => (
                <motion.div key={g.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.06 }} className="rounded-2xl border border-border bg-card/40 p-5">
                  <g.icon className="w-5 h-5 text-primary mb-3" />
                  <p className="text-sm font-semibold text-foreground mb-1.5">{g.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{g.body}</p>
                </motion.div>
              ))}
            </div>
            <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
              <SqlGuardDemo />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Forward-deployed model ── */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="How it's delivered"
            title={<>One core. <span className="text-gradient-orange">One layer built for your estate.</span></>}
            intro="PipelineIQ isn't a box you install and bend your platform to fit. It's a stable core plus an engineer embedded with your team, who builds the layer that understands your services, your statuses, your naming conventions and the quirks nobody documented."
          />
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
            {/* Layer diagram */}
            <motion.div {...fadeUp} className="glass-panel rounded-2xl p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-3">Client layers · connectors, semantics, pages, alert tuning</p>
              <div className="grid grid-cols-2 gap-2 mb-3">
                {LAYERS.map((l) => (
                  <div
                    key={l.stack}
                    className={`rounded-xl p-3 text-xs ${
                      l.live ? "border border-primary/50 bg-primary/10" : "border border-dashed border-border bg-background/40"
                    }`}
                  >
                    <span className={`inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider mb-1 ${l.live ? "text-emerald-500" : "text-muted-foreground"}`}>
                      {l.live && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                      {l.status}
                    </span>
                    <p className="text-foreground/90 font-medium leading-snug">{l.stack}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center py-1" aria-hidden="true">
                <Layers className="w-4 h-4 text-primary" />
              </div>
              <div className="rounded-xl bg-gradient-orange p-[1px]">
                <div className="rounded-[11px] bg-background/95 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-primary mb-2">PipelineIQ core</p>
                  <div className="flex flex-wrap gap-1.5">
                    {CORE.map((c) => (
                      <span key={c} className="px-2 py-1 rounded-md bg-muted text-[11px] text-foreground/90">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Engagement steps */}
            <ol className="space-y-3">
              {STEPS.map((s, i) => (
                <motion.li key={s.title} {...fadeUp} transition={{ duration: 0.35, delay: i * 0.05 }} className="flex gap-4 rounded-xl border border-border bg-card/40 p-4">
                  <span className="font-mono text-xs text-primary pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <s.icon className="w-3.5 h-3.5 text-primary" /> {s.title}
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{s.body}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Findings ── */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What you get back"
            title={<>Findings a generic tool <span className="text-gradient-orange">never gives back</span></>}
            intro="Because the engineer reads your estate as it really is, PipelineIQ surfaces problems in the platform itself. These came out of its first deployment, all found by reading, without changing anything."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FINDINGS.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ duration: 0.4, delay: (i % 3) * 0.07 }} className="group rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/40 transition-colors">
                <f.icon className="w-5 h-5 text-primary mb-3 transition-transform group-hover:scale-110" />
                <p className="text-sm font-semibold text-foreground mb-1.5">{f.title}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap: the four questions ── */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Where it's heading"
            title={<>Four questions. <span className="text-gradient-orange">One answered today.</span></>}
            intro="Anything that uses AI, or reads your code or architecture, ships only once you agree."
          />
          <motion.div {...fadeUp} className="glass-panel rounded-2xl p-4 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-5" role="tablist" aria-label="Roadmap questions">
              {QUESTIONS.map((item, i) => (
                <button
                  key={item.q}
                  role="tab"
                  aria-selected={q === i}
                  onClick={() => setQ(i)}
                  className={`relative text-left rounded-xl border p-3 sm:p-4 transition-colors ${
                    q === i ? "border-primary/60 bg-primary/10" : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className={`inline-block mb-2 px-2 py-0.5 rounded border text-[10px] font-medium ${STATE_STYLE[item.state]}`}>{item.state}</span>
                  <p className="text-sm sm:text-base font-semibold text-foreground">{item.q}</p>
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={q}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="text-sm sm:text-base text-muted-foreground leading-relaxed min-h-[4.5rem]"
              >
                {QUESTIONS[q].body}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PipelineIQ;
