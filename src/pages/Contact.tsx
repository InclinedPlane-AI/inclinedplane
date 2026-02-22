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
    country: "India",
    flag: "🇮🇳",
    label: "Bengaluru, India",
    address: "InclinedPlane Office, Salarpuria Symbiosis, Ground Floor, Bannerghatta Road, Bengaluru, Karnataka 560076, India",
  },
  {
    country: "United States",
    flag: "🇺🇸",
    label: "Dover, Delaware",
    address: "838 Walker Rd, Suite 21-2, Dover, Delaware, 19904, US",
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
      <div className="pt-32 pb-24 min-h-screen">
        {/* Hero header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 max-w-3xl mx-auto px-6"
        >
          <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5">
            Let's <span className="text-gradient-orange">Build</span> Together.
          </h1>
          <p className="text-muted-foreground text-lg max-w-lg mx-auto">
            Whether you have a question, a project in mind, or just want to explore possibilities — we'd love to hear from you.
          </p>
        </motion.div>

        {/* Main content: form + info sidebar */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-5 gap-10 items-start">
          {/* Form — takes 3 cols */}
          <div className="lg:col-span-3">
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
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="glass-panel rounded-2xl p-8 space-y-5"
              >
                {/* Name & Email row */}
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

                {/* Country & Company row */}
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

                {/* Contact Number */}
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

                {/* Message */}
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

          {/* Sidebar — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Email card */}
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">Email Us</p>
                </div>
              </div>
              <a
                href="mailto:support@inclinedplane.ai"
                data-cursor-hover
                className="text-foreground hover:text-primary transition-colors font-medium text-sm"
              >
                support@inclinedplane.ai
              </a>
              <p className="text-xs text-muted-foreground mt-1.5">We typically respond within 24 hours.</p>
            </div>

            {/* Office cards */}
            {offices.map((office, i) => (
              <motion.div
                key={office.country}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.1 }}
                className="glass-panel rounded-2xl p-6 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Building2 size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                      {office.flag} {office.label}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{office.address}</p>
                </div>
              </motion.div>
            ))}

            {/* Quick info */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-foreground mb-3">What happens next?</h3>
              <div className="space-y-3">
                {[
                  { step: "01", text: "We review your message & requirements" },
                  { step: "02", text: "Schedule a discovery call at your convenience" },
                  { step: "03", text: "Deliver a tailored proposal & roadmap" },
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3">
                    <span className="font-mono text-xs text-primary font-semibold mt-0.5">{item.step}</span>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
