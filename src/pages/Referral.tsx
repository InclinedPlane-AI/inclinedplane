import { useState, useEffect, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import SEOHead from "@/components/SEOHead";
import SectionGlow from "@/components/SectionGlow";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Lock,
  Send,
  Trash2,
  Plus,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Shield,
  Mail,
  UserCheck,
  Briefcase,
  ListChecks,
  Info,
  ChevronRight,
  Loader2,
  BookOpen,
} from "lucide-react";
import { openRoles } from "./Careers";

// ── EmailJS config ────────────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_CONFIGURED =
  EMAILJS_SERVICE_ID &&
  !EMAILJS_SERVICE_ID.includes("xxx") &&
  EMAILJS_TEMPLATE_ID &&
  !EMAILJS_TEMPLATE_ID.includes("xxx") &&
  EMAILJS_PUBLIC_KEY &&
  !EMAILJS_PUBLIC_KEY.includes("xxx");

// ── Constants ─────────────────────────────────────────────────────────────────
const ALLOWED_DOMAINS = ["inclinedplane.com", "sail-analytics.com"];
const OTP_EXPIRY_MS = 10 * 60 * 1000;
const CAREERS_EMAIL = "careers@inclinedplane.com";

type Tab = "submit" | "howto";

// ── Helpers ───────────────────────────────────────────────────────────────────
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getDomain(email: string): string {
  return email.split("@")[1]?.toLowerCase() ?? "";
}

function isAllowedDomain(email: string): boolean {
  return ALLOWED_DOMAINS.includes(getDomain(email));
}

function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

// ── Motion variants ───────────────────────────────────────────────────────────
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

// ── Sub-components ────────────────────────────────────────────────────────────
const TabButton = ({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${active
      ? "bg-primary text-primary-foreground shadow-sm"
      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
      }`}
  >
    {children}
  </button>
);

const DomainPill = ({ domain }: { domain: string }) => (
  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono">
    <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />@{domain}
  </span>
);

const FieldLabel = ({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) => (
  <label className="block text-xs font-semibold text-foreground/80 mb-1.5 uppercase tracking-wide">
    {children}
    {required && <span className="text-primary ml-1">*</span>}
  </label>
);

const inputCls =
  "w-full bg-white/5 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all [&_option]:bg-background [&_option]:text-foreground";

// ── Email Gate ────────────────────────────────────────────────────────────────
interface EmailGateProps {
  onVerified: (email: string) => void;
}

const EmailGate = ({ onVerified }: EmailGateProps) => {
  const [email, setEmail] = useState("");
  const [domainErr, setDomainErr] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(""); // actual code
  const [otpInput, setOtpInput] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [sending, setSending] = useState(false);
  const [sendErr, setSendErr] = useState("");
  const [expiresAt, setExpiresAt] = useState<number | null>(null);
  const [remaining, setRemaining] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (!expiresAt) return;
    timerRef.current = setInterval(() => {
      const rem = expiresAt - Date.now();
      setRemaining(rem);
      if (rem <= 0) {
        clearInterval(timerRef.current!);
        setOtpSent(false);
        setOtp("");
        setOtpInput("");
        setOtpErr("Code expired. Please request a new one.");
      }
    }, 500);
    return () => clearInterval(timerRef.current!);
  }, [expiresAt]);

  const handleSendOTP = async () => {
    setDomainErr("");
    setSendErr("");
    if (!email.trim()) {
      setDomainErr("Please enter your work email.");
      return;
    }
    if (!isAllowedDomain(email.trim())) {
      setDomainErr(
        `Only @${ALLOWED_DOMAINS.join(" and @")} addresses are allowed.`
      );
      return;
    }

    const code = generateOTP();
    setOtp(code);
    setSending(true);

    // If EmailJS not configured, show the code in a dev banner
    if (!EMAILJS_CONFIGURED) {
      console.info(`[Referral DEV] OTP for ${email}: ${code}`);
      setSending(false);
      setOtpSent(true);
      setOtpInput("");
      setOtpErr("");
      setExpiresAt(Date.now() + OTP_EXPIRY_MS);
      setRemaining(OTP_EXPIRY_MS);
      setSendErr(
        `⚠️ EmailJS not configured — dev mode. Your code is: ${code}`
      );
      return;
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          to_email: email.trim(),
          otp_code: code,
          expiry_minutes: "10",
        },
        EMAILJS_PUBLIC_KEY
      );
      setOtpSent(true);
      setOtpInput("");
      setOtpErr("");
      setExpiresAt(Date.now() + OTP_EXPIRY_MS);
      setRemaining(OTP_EXPIRY_MS);
    } catch {
      setSendErr(
        "Failed to send the verification code. Please try again or contact IT."
      );
    } finally {
      setSending(false);
    }
  };

  // OTP digit input handling
  const handleOtpDigit = (idx: number, val: string) => {
    const digits = val.replace(/\D/g, "").slice(-1);
    const chars = otpInput.split("").slice(0, 6);
    chars[idx] = digits;
    const next = chars.join("").padEnd(idx + 1, "").slice(0, 6);
    setOtpInput(next);
    setOtpErr("");
    if (digits && idx < 5) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    idx: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otpInput[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otpInput.length < 6) {
      setOtpErr("Please enter the full 6-digit code.");
      return;
    }
    if (otpInput !== otp) {
      setOtpErr("Incorrect code. Please try again.");
      setOtpInput("");
      inputRefs.current[0]?.focus();
      return;
    }
    onVerified(email.trim());
  };

  return (
    <motion.div {...fadeUp} className="max-w-md mx-auto">
      <div className="glass-panel rounded-2xl p-8 text-center">
        {/* Lock icon */}
        <div className="w-16 h-16 rounded-2xl surface-3 flex items-center justify-center mx-auto mb-5">
          <Lock size={28} className="text-primary" />
        </div>

        <h2 className="text-xl font-bold text-foreground mb-1">
          Team members only
        </h2>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          This portal is restricted to InclinedPlane and Sail
          Analytics team members. Verify your work email to continue.
        </p>

        {/* Domain pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-7">
          {ALLOWED_DOMAINS.map((d) => (
            <DomainPill key={d} domain={d} />
          ))}
        </div>

        {!otpSent ? (
          /* Email input */
          <div className="space-y-4">
            <input
              type="email"
              placeholder="yourname@inclinedplane.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDomainErr("");
              }}
              onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
              className={inputCls}
            />
            {domainErr && (
              <p className="flex items-center gap-1.5 text-xs text-red-400">
                <AlertCircle size={13} />
                {domainErr}
              </p>
            )}
            <button
              onClick={handleSendOTP}
              disabled={sending}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity glow-orange disabled:opacity-60"
            >
              {sending ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              {sending ? "Sending…" : "Send verification code"}
            </button>
          </div>
        ) : (
          /* OTP input */
          <AnimatePresence mode="wait">
            <motion.div {...fadeUp} className="space-y-5">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Code sent to{" "}
                  <span className="text-foreground font-medium">{email}</span>
                </p>
                <p className="text-xs text-primary font-mono">
                  Expires in {formatCountdown(remaining)}
                </p>
              </div>

              {/* 6-digit input */}
              <div className="flex gap-2 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otpInput[i] ?? ""}
                    onChange={(e) => handleOtpDigit(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(i, e)}
                    className="w-11 h-12 text-center text-lg font-bold bg-white/5 border border-border rounded-lg focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all text-foreground"
                  />
                ))}
              </div>

              {otpErr && (
                <p className="flex items-center justify-center gap-1.5 text-xs text-red-400">
                  <AlertCircle size={13} />
                  {otpErr}
                </p>
              )}

              <button
                onClick={handleVerify}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-orange text-primary-foreground px-6 py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity glow-orange"
              >
                <CheckCircle2 size={16} />
                Verify &amp; continue
              </button>

              <button
                onClick={() => {
                  setOtpSent(false);
                  setOtpInput("");
                  setOtpErr("");
                  setSendErr("");
                  clearInterval(timerRef.current!);
                }}
                className="w-full flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <RefreshCw size={12} />
                Use a different email
              </button>

              {sendErr && (
                <p className="text-xs text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-2">
                  {sendErr}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
};

// ── Submit Referral Tab ───────────────────────────────────────────────────────
const SubmitReferralTab = ({ refereeEmail }: { refereeEmail: string }) => {
  const [form, setForm] = useState({
    candidateName: "",
    candidateEmail: "",
    candidatePhone: "",
    position: "",
    refereeName: "",
    refereeTeam: "",
    relationship: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.candidateName.trim()) errs.candidateName = "Required";
    if (!form.candidateEmail.trim()) errs.candidateEmail = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.candidateEmail))
      errs.candidateEmail = "Enter a valid email";
    if (!form.position) errs.position = "Please select a position";
    if (!form.refereeName.trim()) errs.refereeName = "Required";
    if (!form.refereeTeam.trim()) errs.refereeTeam = "Required";
    if (!form.relationship) errs.relationship = "Please select a relationship";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const subject = encodeURIComponent(
      `[Referral] ${form.position} — ${form.candidateName} (referred by ${form.refereeName})`
    );
    const body = encodeURIComponent(
      `Hi,

I'd like to refer the following candidate for the ${form.position} role.

── REFEREE ──────────────────────
Name: ${form.refereeName}
Team/Dept: ${form.refereeTeam}
Email: ${refereeEmail}
Relationship to candidate: ${form.relationship}

── CANDIDATE ────────────────────
Name: ${form.candidateName}
Email: ${form.candidateEmail}
Phone: ${form.candidatePhone || "Not provided"}
Position: ${form.position}

──────────────────────────────────
Please find the candidate's resume attached to this email.

Submitted via the InclinedPlane Referral Portal.`
    );

    window.open(`mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center py-8">
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 size={32} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          Referral draft opened!
        </h3>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
          Your email client should have opened with all the details pre-filled.
          Please{" "}
          <span className="text-foreground font-medium">
            attach the candidate's resume
          </span>{" "}
          and send.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({
              candidateName: "",
              candidateEmail: "",
              candidatePhone: "",
              position: "",
              refereeName: "",
              refereeTeam: "",
              relationship: "",
            });
          }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-foreground px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
        >
          <RefreshCw size={14} />
          Submit another referral
        </button>
      </motion.div>
    );
  }

  const field = (key: keyof typeof form) => ({
    value: form[key],
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: "" }));
    },
  });

  return (
    <motion.div {...fadeUp} className="max-w-3xl mx-auto space-y-10">

      {/* CANDIDATE DETAILS */}
      <div className="space-y-6">
        <h3 className="font-mono text-xs text-muted-foreground font-semibold tracking-widest uppercase mb-4 pb-2 border-b border-white/10">
          Candidate Details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <FieldLabel required>Full name</FieldLabel>
            <input
              type="text"
              placeholder="e.g. Ravi Shankar"
              className={`${inputCls} ${errors.candidateName ? "border-red-500/60" : ""}`}
              {...field("candidateName")}
            />
            {errors.candidateName && (
              <p className="text-xs text-red-400 mt-1">{errors.candidateName}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <FieldLabel required>Email address</FieldLabel>
            <input
              type="email"
              placeholder="ravi@example.com"
              className={`${inputCls} ${errors.candidateEmail ? "border-red-500/60" : ""}`}
              {...field("candidateEmail")}
            />
            {errors.candidateEmail && (
              <p className="text-xs text-red-400 mt-1">{errors.candidateEmail}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <FieldLabel>Phone number</FieldLabel>
            <input
              type="tel"
              placeholder="+91 9876543210"
              className={inputCls}
              {...field("candidatePhone")}
            />
          </div>

          {/* Position */}
          <div>
            <FieldLabel required>Applying for</FieldLabel>
            <select
              className={`${inputCls} ${errors.position ? "border-red-500/60" : ""}`}
              {...field("position")}
            >
              <option value="" disabled>
                — select a position —
              </option>
              {openRoles.map((p) => (
                <option key={`${p.title}-${p.department}`} value={p.title}>
                  {p.title} — {p.department}
                </option>
              ))}
            </select>
            {errors.position && (
              <p className="text-xs text-red-400 mt-1">{errors.position}</p>
            )}
          </div>
        </div>
      </div>

      {/* YOUR DETAILS (REFEREE) */}
      <div className="space-y-6">
        <h3 className="font-mono text-xs text-muted-foreground font-semibold tracking-widest uppercase mb-4 pb-2 border-b border-white/10">
          Your Details (Referee)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Your Name */}
          <div>
            <FieldLabel required>Your name</FieldLabel>
            <input
              type="text"
              placeholder="e.g. Anjani Kumar"
              className={`${inputCls} ${errors.refereeName ? "border-red-500/60" : ""}`}
              {...field("refereeName")}
            />
            {errors.refereeName && (
              <p className="text-xs text-red-400 mt-1">{errors.refereeName}</p>
            )}
          </div>

          {/* Your Team / Dept */}
          <div>
            <FieldLabel required>Your team / department</FieldLabel>
            <input
              type="text"
              placeholder="e.g. Data & Analytics"
              className={`${inputCls} ${errors.refereeTeam ? "border-red-500/60" : ""}`}
              {...field("refereeTeam")}
            />
            {errors.refereeTeam && (
              <p className="text-xs text-red-400 mt-1">{errors.refereeTeam}</p>
            )}
          </div>

          {/* Relationship */}
          <div className="sm:col-span-2">
            <FieldLabel required>Relationship to candidate</FieldLabel>
            <select
              className={`${inputCls} ${errors.relationship ? "border-red-500/60" : ""}`}
              {...field("relationship")}
            >
              <option value="" disabled>
                — select —
              </option>
              <option value="Former Colleague">Former Colleague</option>
              <option value="Friend">Friend</option>
              <option value="School/University Alum">School/University Alum</option>
              <option value="Other">Other</option>
            </select>
            {errors.relationship && (
              <p className="text-xs text-red-400 mt-1">{errors.relationship}</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-white/10">
        <button
          onClick={handleSubmit}
          className="inline-flex items-center justify-center gap-2 bg-foreground text-background px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Submit referral
        </button>
      </div>
    </motion.div>
  );
};

// ── How It Works Tab ──────────────────────────────────────────────────────────
const HowItWorksTab = () => {
  const steps = [
    {
      icon: Shield,
      title: "Domain restriction — how it works",
      items: [
        "You enter your work email. The system checks the domain against the allowed list (@inclinedplane.com, @sail-analytics.com).",
        "A 6-digit one-time code is sent to that inbox. Only someone who actually receives mail at that address can complete verification.",
        "The verified email is stamped into every referral submission, creating a full audit trail of who referred whom.",
      ],
    },
    {
      icon: Mail,
      title: "Referral submission flow",
      items: [
        "After verification, fill in the candidate's details and select the open position.",
        "Clicking Submit opens your email client with everything pre-filled — candidate info, position, your notes, and your verified email in the subject line.",
        "Attach the candidate's resume and send. All referrals land in the careers inbox with a consistent, searchable format.",
      ],
    },
  ];

  return (
    <motion.div {...fadeUp} className="max-w-2xl mx-auto space-y-6">
      {steps.map(({ icon: Icon, title, items }) => (
        <div key={title} className="glass-panel rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl surface-3 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-primary" />
            </div>
            <h3 className="text-sm font-bold text-foreground">{title}</h3>
          </div>
          <ol className="space-y-3">
            {items.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">
                  {i + 1}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      ))}

      {/* EmailJS setup note */}
      {!EMAILJS_CONFIGURED && (
        <div className="glass-panel rounded-2xl p-5 border border-amber-400/20">
          <div className="flex items-start gap-3">
            <Info size={16} className="text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground mb-1">
                EmailJS not yet configured
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                OTP emails are currently running in dev mode (codes appear in
                the browser console). To enable real email delivery:
              </p>
              <ol className="text-xs text-muted-foreground space-y-1.5 list-decimal ml-4">
                <li>
                  Create a free account at{" "}
                  <a
                    href="https://emailjs.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    emailjs.com
                  </a>
                </li>
                <li>
                  Connect a Gmail or Outlook account as your email service
                </li>
                <li>
                  Create a template with variables:{" "}
                  <code className="font-mono bg-white/5 px-1 rounded">
                    {"{{to_email}}"}
                  </code>
                  ,{" "}
                  <code className="font-mono bg-white/5 px-1 rounded">
                    {"{{otp_code}}"}
                  </code>
                </li>
                <li>
                  Copy the Service ID, Template ID, and Public Key into{" "}
                  <code className="font-mono bg-white/5 px-1 rounded">.env</code>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "submit", label: "Submit referral", icon: Send },
  { id: "howto", label: "How it works", icon: BookOpen },
];

const Referral = () => {
  const [activeTab, setActiveTab] = useState<Tab>("submit");
  const [refereeEmail, setRefereeEmail] = useState<string | null>(null);

  return (
    <PageLayout>
      <div className="overflow-x-clip">
        <SEOHead
          title="Referral Portal — InclinedPlane"
          description="Internal referral portal for InclinedPlane and Sail Analytics team members."
          path="/referral"
          noIndex
        />

        <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
          <SectionGlow position="top-right" size={600} />

          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            {/* Header */}
            <motion.div {...fadeUp} className="mb-10 text-center">
              <p className="font-mono text-xs text-primary tracking-widest uppercase mb-3">
                Internal Tool
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
                Referral <span className="text-gradient-orange">portal</span>
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                Submit candidate referrals for open positions. Only
                InclinedPlane &amp; Sail Analytics team members can refer.
              </p>
            </motion.div>

            {/* Tab bar */}
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.05 }}
              className="flex flex-wrap justify-center gap-2 p-1.5 glass-panel rounded-xl mb-8 w-fit mx-auto"
            >
              {TABS.map(({ id, label }) => (
                <TabButton
                  key={id}
                  active={activeTab === id}
                  onClick={() => setActiveTab(id)}
                >
                  {label}
                </TabButton>
              ))}
            </motion.div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} {...fadeUp}>
                {activeTab === "submit" &&
                  (refereeEmail ? (
                    <SubmitReferralTab refereeEmail={refereeEmail} />
                  ) : (
                    <EmailGate onVerified={setRefereeEmail} />
                  ))}
                {activeTab === "howto" && <HowItWorksTab />}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Referral;
