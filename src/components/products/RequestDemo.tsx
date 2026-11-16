import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ArrowRight, Check, CheckCircle2, Loader2, CalendarClock } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { PRODUCTS, ProductId } from "@/data/products";

/*
 * Demo request dialog. Posts to the same Formspree form as /contact, with a
 * subject line naming the product(s) so the team can triage it.
 */

const FORM_ENDPOINT = "https://formspree.io/f/xwvnakbz";
const inputClass =
  "w-full bg-background border border-border rounded-lg px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: ProductId[];
}

export const RequestDemoDialog = ({ open, onOpenChange, initial = ["pipelineiq", "inclever"] }: DialogProps) => {
  const [selected, setSelected] = useState<ProductId[]>(initial);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  // Re-seed the product choice every time the dialog opens from a different place.
  useEffect(() => {
    if (open) {
      setSelected(initial);
      setDone(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const toggle = (id: ProductId) =>
    setSelected((prev) => (prev.includes(id) ? (prev.length > 1 ? prev.filter((p) => p !== id) : prev) : [...prev, id]));

  const chosen = PRODUCTS.filter((p) => selected.includes(p.id));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const names = chosen.map((p) => p.name).join(" + ");
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Demo request: ${names}`,
          type: "Product demo request",
          products: names,
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          role: role.trim(),
          message: notes.trim(),
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again or email support@inclinedplane.com.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] p-0 overflow-hidden rounded-2xl border-border max-h-[90vh] overflow-y-auto">
        <div className="grid md:grid-cols-[0.95fr_1.05fr]">
          {/* What the demo covers */}
          <div className="relative p-6 sm:p-7 bg-muted/40 border-b md:border-b-0 md:border-r border-border">
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gradient-orange opacity-10 blur-3xl pointer-events-none" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-2">Request a demo</p>
            <DialogTitle className="text-2xl font-bold text-foreground tracking-tight mb-2">See it on a real estate</DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground leading-relaxed mb-5">
              A focused session with the engineers who built it. No slideware: you'll see the product working.
            </DialogDescription>
            <AnimatePresence initial={false}>
              {chosen.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pb-4">
                    <p className="text-sm font-semibold text-foreground mb-2">
                      {p.name} <span className="font-normal text-muted-foreground">· {p.tagline}</span>
                    </p>
                    <ul className="space-y-1.5">
                      {p.demoAgenda.map((a) => (
                        <li key={a} className="flex gap-2 text-xs text-muted-foreground leading-relaxed">
                          <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <p className="flex items-center gap-2 text-xs text-muted-foreground border-t border-border pt-4">
              <CalendarClock className="w-4 h-4 text-primary" /> We reply within one business day to book a time.
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-7">
            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col items-center justify-center text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                  <p className="text-lg font-semibold text-foreground mb-1">Request received</p>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Thanks{name ? `, ${name.trim().split(" ")[0]}` : ""}. We'll be in touch at {email.trim()} to schedule your{" "}
                    {chosen.map((p) => p.name).join(" and ")} demo.
                  </p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={submit} className="space-y-4">
                  <div>
                    <p className="block text-sm text-foreground mb-2">Which product?</p>
                    <div className="grid grid-cols-2 gap-2">
                      {PRODUCTS.map((p) => {
                        const on = selected.includes(p.id);
                        return (
                          <button
                            type="button"
                            key={p.id}
                            onClick={() => toggle(p.id)}
                            aria-pressed={on}
                            className={`text-left rounded-xl border p-3 transition-colors ${on ? "border-primary/60 bg-primary/10" : "border-border hover:border-primary/30"}`}
                          >
                            <span className="flex items-center justify-between">
                              <span className="text-sm font-semibold text-foreground">{p.name}</span>
                              <span className={`h-4 w-4 rounded border flex items-center justify-center ${on ? "bg-primary border-primary" : "border-border"}`}>
                                {on && <Check className="w-3 h-3 text-primary-foreground" />}
                              </span>
                            </span>
                            <span className="block text-[11px] text-muted-foreground mt-0.5">{p.kicker}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="block text-sm text-foreground mb-1.5">Name <span className="text-primary">*</span></span>
                      <input required className={inputClass} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <label className="block">
                      <span className="block text-sm text-foreground mb-1.5">Work email <span className="text-primary">*</span></span>
                      <input required type="email" className={inputClass} placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </label>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <label className="block">
                      <span className="block text-sm text-foreground mb-1.5">Company <span className="text-primary">*</span></span>
                      <input required className={inputClass} placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} />
                    </label>
                    <label className="block">
                      <span className="block text-sm text-foreground mb-1.5">Role</span>
                      <input className={inputClass} placeholder="e.g. Head of Data" value={role} onChange={(e) => setRole(e.target.value)} />
                    </label>
                  </div>
                  <label className="block">
                    <span className="block text-sm text-foreground mb-1.5">What should we focus on?</span>
                    <textarea
                      rows={3}
                      className={`${inputClass} resize-none`}
                      placeholder="Your stack, the problem you're trying to solve, anything you'd like to see"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-5 py-3 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-60 glow-orange"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                    {submitting ? "Sending…" : "Request my demo"}
                    {!submitting && <ArrowRight className="w-4 h-4" />}
                  </button>
                  <p className="text-[11px] text-muted-foreground text-center">We only use these details to arrange your demo.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/** Self-contained button + dialog, for use anywhere on the site. */
export const RequestDemoButton = ({
  products,
  children = "Request a demo",
  variant = "primary",
  className = "",
}: {
  products?: ProductId[];
  children?: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const base =
    variant === "primary"
      ? "bg-gradient-orange text-primary-foreground hover:opacity-90 glow-orange"
      : "border border-border text-foreground hover:border-primary/50";
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${base} ${className}`}
      >
        {children}
        {variant === "primary" && <ArrowRight className="w-4 h-4" />}
      </button>
      <RequestDemoDialog open={open} onOpenChange={setOpen} initial={products} />
    </>
  );
};
