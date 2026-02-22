import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { ArrowRight, Check, Mail, MapPin, Building2 } from "lucide-react";
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
    address: "InclinedPlane Office, Salarpuria Symbiosis, Ground Floor, Bannerghatta Road, Bengaluru, Karnataka 560076, India",
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

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");

  const dialCode = useMemo(() => {
    if (!selectedCountry) return "";
    const country = getCountryByCode(selectedCountry);
    return country?.dialCode ?? "";
  }, [selectedCountry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <div className="pt-32 pb-24">
        {/* ── Hero ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 max-w-3xl mx-auto px-6"
        >
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5">
            Let's <span className="text-gradient-orange">Build</span> Together.
          </h1>
        </motion.div>

        {/* ── Reach Out Options ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="max-w-3xl mx-auto px-6 mb-16"
        >
          <div className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-5">
            {/* Option 1: Form */}
            <div className="glass-panel rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center">
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <ArrowRight size={18} className="text-primary -rotate-90" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">Drop us a message</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fill out the form below — we'll review it and get back to you within 24 hours.
              </p>
            </div>

            {/* Divider */}
            <div className="flex sm:flex-col items-center gap-3">
              <div className="flex-1 sm:w-px sm:h-12 h-px w-12 bg-border" />
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">or</span>
              <div className="flex-1 sm:w-px sm:h-12 h-px w-12 bg-border" />
            </div>

            {/* Option 2: Email */}
            <a
              href="mailto:support@inclinedplane.ai"
              data-cursor-hover
              className="glass-panel rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center group hover:border-primary/20 transition-colors"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/15 transition-colors">
                <Mail size={18} className="text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1.5">Email us directly</h3>
              <p className="text-xs text-primary font-medium group-hover:underline underline-offset-4 transition-all">
                support@inclinedplane.ai
              </p>
            </a>
          </div>
        </motion.div>

        {/* ── Contact Form ── */}
        <div className="max-w-2xl mx-auto px-6 lg:px-8 mb-28">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-2xl p-12 text-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-orange mx-auto mb-6 flex items-center justify-center glow-orange">
                <Check size={28} className="text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Message Sent</h2>
              <p className="text-muted-foreground">We'll be in touch within 24 hours.</p>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              onSubmit={handleSubmit}
              className="glass-panel rounded-2xl p-8 space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm text-foreground mb-1.5">
                    Name <span className="text-primary">*</span>
                  </label>
                  <input required className={inputClass} placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-1.5">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input required type="email" className={inputClass} placeholder="you@company.com" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
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
                </div>
                <div>
                  <label className="block text-sm text-foreground mb-1.5">
                    Company <span className="text-muted-foreground text-xs">(optional)</span>
                  </label>
                  <input className={inputClass} placeholder="Your company name" />
                </div>
              </div>

              <div>
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
              </div>

              <div>
                <label className="block text-sm text-foreground mb-1.5">
                  Message <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project, timeline, and goals..."
                />
              </div>

              <button
                type="submit"
                data-cursor-hover
                className="w-full bg-gradient-orange text-primary-foreground py-3.5 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange flex items-center justify-center gap-2 text-sm"
              >
                Send Message <ArrowRight size={16} />
              </button>
            </motion.form>
          )}
        </div>

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
            {/* Connecting line behind cards */}
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
                  {/* Number badge */}
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
      </div>
    </PageLayout>
  );
};

export default Contact;
