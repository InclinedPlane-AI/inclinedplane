import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import PageHero from "@/components/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { ArrowRight, Check, Mail, MapPin, User, AtSign, Globe, Building2, Phone, MessageSquare } from "lucide-react";
import { countryGroups, getCountryByCode } from "@/data/countries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputClass =
  "w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all";

const offices = [
  {
    flag: "🇮🇳",
    label: "Bengaluru, India",
    address: "InclinedPlane, Wework Salarpuria Symbiosis, Bannerghatta Road, Bengaluru, Karnataka 560076, India",
  },
  {
    flag: "🇺🇸",
    label: "Dover, Delaware",
    address: "838 Walker Rd, Suite 21-2, Dover, Delaware, 19904, US",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We review your message, understand your data landscape, and identify key opportunities.",
  },
  {
    num: "02",
    title: "Strategy Call",
    desc: "A focused 30-minute call to align on goals, timelines, and technical requirements.",
  },
  {
    num: "03",
    title: "Proposal & Roadmap",
    desc: "You receive a tailored proposal with a clear execution plan and deliverables.",
  },
];

/* ── Progress milestones ── */
const milestones = [
  { label: "Name", icon: User, key: "name" },
  { label: "Email", icon: AtSign, key: "email" },
  { label: "Country", icon: Globe, key: "country" },
  { label: "Company", icon: Building2, key: "company" },
  { label: "Message", icon: MessageSquare, key: "message" },
] as const;

/* ── Form Progress Bar ── */
const FormProgress = ({ progress, filled }: { progress: number; filled: Record<string, boolean> }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Data Maturity Progress</p>
        <motion.span
          key={progress}
          initial={{ scale: 1.3, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-xs font-mono font-semibold text-primary"
        >
          {progress}%
        </motion.span>
      </div>

      {/* Bar */}
      <div className="relative h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-orange"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          style={{
            boxShadow: progress > 0 ? "0 0 16px hsl(25 100% 50% / 0.4), 0 0 4px hsl(25 100% 50% / 0.6)" : "none",
          }}
        />
      </div>

      {/* Milestone dots */}
      <div className="flex justify-between mt-3">
        {milestones.map((m, i) => {
          const reached = filled[m.key];
          const Icon = m.icon;
          return (
            <div key={m.label} className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{
                  scale: reached ? 1 : 0.85,
                  backgroundColor: reached ? "hsl(25 100% 50%)" : "hsl(var(--secondary))",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-7 h-7 rounded-full flex items-center justify-center"
              >
                <Icon size={13} className={reached ? "text-primary-foreground" : "text-muted-foreground"} />
              </motion.div>
              <span className={`text-[10px] font-mono ${reached ? "text-primary" : "text-muted-foreground"}`}>
                {m.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ── Contact Page ── */
const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const dialCode = useMemo(() => {
    if (!selectedCountry) return "";
    const country = getCountryByCode(selectedCountry);
    return country?.dialCode ?? "";
  }, [selectedCountry]);

  const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

  const progress = useMemo(() => {
    let p = 0;
    if (name.trim().length >= 2) p += 20;
    if (isValidEmail(email)) p += 20;
    if (selectedCountry) p += 15;
    if (company.trim().length > 0) p += 15;
    if (message.trim().length > 0) p += 30;
    return p;
  }, [name, email, selectedCountry, company, message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <SEOHead
        title="Contact Us"
        description="Get in touch with Inclined Plane for data engineering consulting, AI automation, and cloud warehouse architecture. Book a discovery call today."
        path="/contact"
      />
      <PageHero
        label="Contact"
        title={
          <>
            Let's <span className="text-gradient-orange">Build</span> Together.
          </>
        }
        subtitle="Have a project in mind or want to explore how data can transform your business? We'd love to hear from you."
      />

      {/* ── Contact Form ── */}
      <div className="max-w-2xl mx-auto px-6 lg:px-8 mb-10 relative">
        {/* Orange elevation glow behind card */}
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none -z-10 blur-[80px] opacity-[0.15]"
          style={{
            background:
              "radial-gradient(ellipse at center, hsl(var(--orange-start)), hsl(var(--orange-mid) / 0.5), transparent 70%)",
          }}
        />
        <motion.div
          className="absolute -inset-4 rounded-3xl pointer-events-none -z-10"
          animate={{
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(ellipse at 50% 80%, hsl(var(--orange-start) / 0.3), transparent 60%)",
            filter: "blur(60px)",
          }}
        />

        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="glass-panel rounded-2xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="w-16 h-16 rounded-full bg-gradient-orange mx-auto mb-6 flex items-center justify-center glow-orange-strong"
              >
                <Check size={28} className="text-primary-foreground" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Message Sent</h2>
              <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-8 space-y-5"
            >
              <FormProgress
                progress={progress}
                filled={{
                  name: name.trim().length >= 2,
                  email: isValidEmail(email),
                  country: !!selectedCountry,
                  company: company.trim().length > 0,
                  message: message.trim().length > 0,
                }}
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                  <label className="block text-sm text-foreground mb-1.5">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    className={inputClass}
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}>
                  <label className="block text-sm text-foreground mb-1.5">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    className={inputClass}
                    placeholder="you@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </motion.div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <label className="block text-sm text-foreground mb-1.5">
                    Country <span className="text-primary">*</span>
                  </label>
                  <Select required value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="w-full bg-background border border-border rounded-lg px-4 py-3 h-auto text-sm text-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-72 bg-popover border border-border z-50">
                      {countryGroups.map((group) => (
                        <SelectGroup key={group.continent}>
                          <SelectLabel
                            className={`text-xs font-semibold uppercase tracking-wider px-3 py-2 ${
                              group.continent === "Featured" ? "text-primary" : "text-muted-foreground"
                            }`}
                          >
                            {group.continent}
                          </SelectLabel>
                          {group.countries.map((country) => (
                            <SelectItem key={country.code} value={country.code} className="text-sm">
                              <span className="mr-2">{country.flag}</span>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      ))}
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.45 }}>
                  <label className="block text-sm text-foreground mb-1.5">
                    Company <span className="text-primary">*</span>
                  </label>
                  <input
                    required
                    className={inputClass}
                    placeholder="Your company name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <label className="block text-sm text-foreground mb-1.5">
                  Contact Number <span className="text-muted-foreground text-xs">(optional)</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center bg-background border border-border rounded-lg px-3 py-3 text-sm text-muted-foreground min-w-[80px] justify-center shrink-0">
                    {dialCode || "—"}
                  </div>
                  <input
                    type="tel"
                    className={inputClass}
                    placeholder={selectedCountry ? "Your phone number" : "Select country first"}
                    disabled={!selectedCountry}
                  />
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                <label className="block text-sm text-foreground mb-1.5">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project, timeline, and goals..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </motion.div>

              <motion.button
                type="submit"
                data-cursor-hover
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-orange text-primary-foreground py-3.5 rounded-lg font-medium transition-opacity glow-orange flex items-center justify-center gap-2 text-sm"
              >
                Send Message <ArrowRight size={16} />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      {/* ── Or Email Us ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl mx-auto px-6 lg:px-8 mb-28"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <a
          href="mailto:contact@inclinedplane.com"
          data-cursor-hover
          className="glass-panel rounded-2xl p-7 flex items-center gap-5 group hover:border-primary/20 transition-colors"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">
            <Mail size={20} className="text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-foreground mb-1">Prefer email?</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Drop us a line and we'll get back to you within 24 hours.
            </p>
          </div>
          <p className="text-sm text-primary font-medium group-hover:underline underline-offset-4 transition-all hidden sm:block">
            contact@inclinedplane.com
          </p>
        </a>
      </motion.div>

      {/* ── What Happens Next ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">What Happens Next</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            From message to <span className="text-gradient-orange">momentum.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2 z-0" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.12 }}
              className="relative z-10"
            >
              <div className="glass-panel rounded-2xl p-7 h-full text-center group hover:border-primary/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-gradient-orange mx-auto mb-5 flex items-center justify-center glow-orange text-primary-foreground font-mono font-bold text-sm">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Office Locations ── */}
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-12"
        >
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">Our Offices</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Where you can <span className="text-gradient-orange">find us.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {offices.map((office, i) => (
            <motion.div
              key={office.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.1 }}
              className="glass-panel rounded-2xl p-8 group hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                  {office.flag}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{office.label}</h3>
                  <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Office</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-muted-foreground leading-relaxed">{office.address}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
