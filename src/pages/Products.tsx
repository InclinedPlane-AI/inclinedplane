import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, Sparkles, Users, Wrench, LineChart } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import { PRODUCTS, ProductId } from "@/data/products";
import { PRODUCT_ICONS } from "@/components/products/icons";
import { RequestDemoButton } from "@/components/products/RequestDemo";
import { fadeUp, SectionHeading } from "@/components/products/shared";

const PROBLEMS: { text: string; fit: ProductId[]; why: string }[] = [
  {
    text: "Our pipelines fail overnight and it takes all morning to find out why.",
    fit: ["pipelineiq"],
    why: "PipelineIQ merges the run log, orchestrator and compute engine into one error history, with the root cause and the stack trace on one page.",
  },
  {
    text: "We get so many alerts that nobody reads them any more.",
    fit: ["pipelineiq"],
    why: "PipelineIQ judges every table against its own history and rolls alerts up per environment: one alert per problem, closed automatically when it clears.",
  },
  {
    text: "Leadership wants AI answers from our data, but we can't prove the data is fit.",
    fit: ["inclever"],
    why: "Inclever's AI Readiness Control Tower audits every data asset against explicit rules and issues, or withholds, a readiness certificate.",
  },
  {
    text: "Our analysts spend their week answering the same ten questions.",
    fit: ["inclever"],
    why: "Inclever answers governed questions in Teams, and anything it can't answer becomes a tracked task with an owner, so the next person gets an answer.",
  },
  {
    text: "Both. We need reliable pipelines and trustworthy AI on top of them.",
    fit: ["pipelineiq", "inclever"],
    why: "They tackle different layers of the same problem: PipelineIQ keeps the loads that feed your platform healthy and explained; Inclever decides whether what landed is fit for an AI to answer from.",
  },
];

const Products = () => {
  const [pick, setPick] = useState<number | null>(null);
  const chosen = pick === null ? null : PROBLEMS[pick];

  return (
    <PageLayout>
      <SEOHead
        title="Products — PipelineIQ & Inclever"
        description="PipelineIQ: read-only pipeline monitoring and ETL debugging. Inclever: governed AI analytics with an AI Readiness Control Tower that audits whether your data is fit for AI."
        path="/products"
      />
      <PageHero
        label="Products"
        title={
          <>
            Built in the field. <span className="text-gradient-orange">Proven on real estates.</span>
          </>
        }
        subtitle="Two platforms that grew out of our delivery work: one watches your data pipelines and tells you why they broke; the other lets people ask your data questions and only answers when the data has earned it."
      />

      {/* ── Product cards ── */}
      <section className="relative pb-16 sm:pb-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
          {PRODUCTS.map((p, i) => {
            const Icon = PRODUCT_ICONS[p.id];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
                className="group relative glass-panel rounded-3xl p-6 sm:p-8 flex flex-col overflow-hidden hover:border-primary/40 transition-colors"
              >
                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-orange opacity-[0.07] blur-3xl group-hover:opacity-15 transition-opacity" />
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-primary">{p.kicker}</p>
                    <h2 className="text-2xl font-bold text-foreground">{p.name}</h2>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-medium text-foreground">
                  <Users className="w-3.5 h-3.5 text-primary" /> {p.audience}
                </span>
                <p className="text-lg font-semibold text-foreground mb-2">{p.tagline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.brief}</p>
                <ul className="space-y-2 mb-8">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm text-foreground/90">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link
                    to={p.path}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity glow-orange"
                  >
                    Explore {p.name} <ArrowRight className="w-4 h-4" />
                  </Link>
                  <RequestDemoButton products={[p.id]} variant="ghost" className="!px-5 !py-2.5">
                    Request a demo
                  </RequestDemoButton>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Two audiences ── */}
      <section className="relative py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Who each one is for"
            title={<>Two audiences. <span className="text-gradient-orange">One data estate.</span></>}
            intro="PipelineIQ is for the technical teams who keep the data flowing. Inclever is for the people who use that data to make decisions. Same estate, different jobs."
            center
          />
          <div className="relative grid md:grid-cols-2 gap-6">
            {PRODUCTS.map((p, i) => {
              const RoleIcon = p.id === "pipelineiq" ? Wrench : LineChart;
              return (
                <motion.div
                  key={p.id}
                  {...fadeUp}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="rounded-3xl border border-border bg-card/40 p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <RoleIcon className="w-5 h-5 text-primary" />
                    </span>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-primary">{p.name}</p>
                      <p className="text-lg font-bold text-foreground">{p.id === "pipelineiq" ? "The engine room" : "The decision makers"}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{p.audienceNote}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {p.roles.map((r) => (
                      <span key={r} className="px-3 py-1 rounded-full bg-muted text-xs text-foreground/90">
                        {r}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground border-t border-border pt-4">
                    {p.id === "pipelineiq"
                      ? "Typical question: “What broke last night, and is it the same thing as last week?”"
                      : "Typical question: “How did we do on margin last month?”"}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Chooser ── */}
      <section className="relative py-16 sm:py-20 overflow-hidden">
        <SectionGlow position="center" size={500} />
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-[2]">
          <SectionHeading eyebrow="Which one do you need?" title={<>Start with the problem <span className="text-gradient-orange">you have today</span></>} center />
          <motion.div {...fadeUp} className="glass-panel rounded-2xl p-4 sm:p-6">
            <div className="grid gap-2 mb-5">
              {PROBLEMS.map((pr, i) => (
                <button
                  key={pr.text}
                  onClick={() => setPick(i)}
                  aria-pressed={pick === i}
                  className={`text-left rounded-xl border px-4 py-3 text-sm transition-colors ${
                    pick === i ? "border-primary/60 bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  “{pr.text}”
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {chosen ? (
                <motion.div key={pick} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="rounded-xl border border-primary/30 bg-background/60 p-4 sm:p-5">
                  <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-primary mb-2">
                    <Sparkles className="w-3.5 h-3.5" /> Start with {chosen.fit.map((id) => PRODUCTS.find((p) => p.id === id)!.name).join(" + ")}
                  </p>
                  <p className="text-sm text-foreground/90 leading-relaxed mb-4">{chosen.why}</p>
                  <div className="flex flex-wrap gap-3">
                    {chosen.fit.map((id) => {
                      const p = PRODUCTS.find((x) => x.id === id)!;
                      return (
                        <Link key={id} to={p.path} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline underline-offset-4">
                          See {p.name} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-xs text-muted-foreground text-center">
                  Pick the one that sounds most like you.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="glass-panel rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              See both in <span className="text-gradient-orange">one session</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-8">
              A focused walkthrough with the engineers who built them. Tell us about your stack and we'll show you the parts that matter to you.
            </p>
            <RequestDemoButton products={["pipelineiq", "inclever"]}>Request a demo of both</RequestDemoButton>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Products;
