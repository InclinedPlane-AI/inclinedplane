import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <div className="pt-32 pb-24 min-h-screen flex items-center">
        <div className="max-w-xl mx-auto px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Contact</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Let's <span className="text-gradient-orange">Build.</span>
            </h1>
            <p className="text-muted-foreground">Tell us about your data challenges.</p>
          </motion.div>

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
              <div>
                <label className="block text-sm text-foreground mb-1.5">Name</label>
                <input
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1.5">Email</label>
                <input
                  required
                  type="email"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-sm text-foreground mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>
              <button
                type="submit"
                data-cursor-hover
                className="w-full bg-gradient-orange text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity glow-orange flex items-center justify-center gap-2"
              >
                Send Message <ArrowRight size={16} />
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;
