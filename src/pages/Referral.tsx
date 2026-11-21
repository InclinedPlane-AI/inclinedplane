/**
 * /referral — internal referral portal (noindex). Restyled for the revamp;
 * all logic (domain gate, EmailJS OTP, Google Sheets webhook, mailto draft)
 * is unchanged. The form keeps the "Referral Portal Design Contract" in
 * CLAUDE.md: two sections, `grid-cols-1 sm:grid-cols-2`, relationship select
 * spanning both columns, submit right-aligned, no resume box.
 */
import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, buttonClass } from "@/components/site/primitives";
import { cn } from "@/lib/utils";
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

// ── Sub-components ────────────────────────────────────────────────────────────
const FieldLabel = ({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor?: string }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-[15px] font-semibold text-black">
    {children}
    {required ? <span className="sr-only"> (required)</span> : <span className="font-normal text-ip-muted"> (optional)</span>}
  </label>
);

const inputCls =
  "w-full min-h-[44px] rounded-[6px] border border-ip-rule-dashed bg-white px-3 py-2 font-sans text-[15px] text-black placeholder:text-ip-muted focus:outline-2 focus:outline-ip-orange-ink focus:outline-offset-1 box-border";

const errCls = "border-[#b42318]";

const ErrorText = ({ children }: { children?: string }) =>
  children ? <p className="mt-1 mb-0 text-[13px] text-[#b42318]">{children}</p> : null;

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
      setDomainErr(`Only @${ALLOWED_DOMAINS.join(" and @")} addresses are allowed.`);
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
      setSendErr(`EmailJS not configured (dev mode). Your code is: ${code}`);
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
        EMAILJS_PUBLIC_KEY,
      );
      setOtpSent(true);
      setOtpInput("");
      setOtpErr("");
      setExpiresAt(Date.now() + OTP_EXPIRY_MS);
      setRemaining(OTP_EXPIRY_MS);
    } catch {
      setSendErr("Failed to send the verification code. Please try again or contact IT.");
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

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
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
    <div className="mx-auto max-w-[460px] rounded-[10px] border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-7 sm:p-8">
      <h2 className="m-0 text-[22px] font-semibold">Team members only</h2>
      <p className="mt-2 mb-5 text-[15px] leading-[1.55] text-ip-body">
        This portal is restricted to InclinedPlane and Sail Analytics team members. Verify your work email to continue.
      </p>
      <div className="mb-6 flex flex-wrap gap-2">
        {ALLOWED_DOMAINS.map((d) => (
          <span key={d} className="rounded-full border border-ip-rule-strong px-3 py-1 font-mono text-[12px] text-ip-body">
            @{d}
          </span>
        ))}
      </div>

      {!otpSent ? (
        <div className="space-y-3">
          <label htmlFor="referral-email" className="sr-only">
            Work email
          </label>
          <input
            id="referral-email"
            type="email"
            placeholder="yourname@inclinedplane.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setDomainErr("");
            }}
            onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
            className={cn(inputCls, domainErr && errCls)}
            aria-invalid={!!domainErr}
          />
          <ErrorText>{domainErr}</ErrorText>
          <button type="button" onClick={handleSendOTP} disabled={sending || openRoles.length === 0} className={buttonClass("primary", "md", "w-full")}>
            {openRoles.length === 0 ? "No open roles right now" : sending ? "Sending" : "Send verification code"}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <p className="m-0 text-[15px] text-ip-body">
              Code sent to <span className="font-semibold text-black">{email}</span>
            </p>
            <p className="mt-1 mb-0 font-mono text-[12px] text-ip-muted">Expires in {formatCountdown(remaining)}</p>
          </div>

          <div className="flex justify-between gap-2" role="group" aria-label="6-digit verification code">
            {Array.from({ length: 6 }).map((_, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                aria-label={`Digit ${i + 1}`}
                value={otpInput[i] ?? ""}
                onChange={(e) => handleOtpDigit(i, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                className="h-12 w-11 rounded-[6px] border border-ip-rule-dashed bg-white text-center text-[18px] font-semibold text-black focus:outline-2 focus:outline-ip-orange-ink"
              />
            ))}
          </div>

          <ErrorText>{otpErr}</ErrorText>

          <button type="button" onClick={handleVerify} className={buttonClass("primary", "md", "w-full")}>
            Verify and continue
          </button>

          <button
            type="button"
            onClick={() => {
              setOtpSent(false);
              setOtpInput("");
              setOtpErr("");
              setSendErr("");
              clearInterval(timerRef.current!);
            }}
            className="ip-link w-full justify-center text-[14px] font-medium"
          >
            Use a different email
          </button>

          {sendErr && <p className="m-0 rounded-[6px] border border-dashed border-ip-rule-dashed bg-ip-grey px-3 py-2 text-[13px] text-black">{sendErr}</p>}
        </div>
      )}
    </div>
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
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.candidateEmail)) errs.candidateEmail = "Enter a valid email";
    if (!form.position) errs.position = "Please select a position";
    if (!form.refereeName.trim()) errs.refereeName = "Required";
    if (!form.refereeTeam.trim()) errs.refereeTeam = "Required";
    if (!form.relationship) errs.relationship = "Please select a relationship";
    return errs;
  };

  const handleSubmit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    // Send data directly to Google Sheets via Apps Script
    try {
      const webhookUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      if (webhookUrl) {
        const formData = new FormData();
        formData.append("candidateName", form.candidateName);
        formData.append("candidateEmail", form.candidateEmail);
        formData.append("candidatePhone", form.candidatePhone);
        formData.append("position", form.position);
        formData.append("refereeName", form.refereeName);
        formData.append("refereeTeam", form.refereeTeam);
        formData.append("refereeEmail", refereeEmail);
        formData.append("relationship", form.relationship);

        fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          body: formData,
        });
      }
    } catch (error) {
      console.error("Failed to send referral data to Google Sheets:", error);
    }

    const subject = encodeURIComponent(`[Referral] ${form.position} — ${form.candidateName} (referred by ${form.refereeName})`);
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

Submitted via the InclinedPlane Referral Portal.`,
    );

    window.open(`mailto:${CAREERS_EMAIL}?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mx-auto max-w-[640px] rounded-[10px] border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-8" role="status">
        <h3 className="m-0 text-[21px] font-semibold">Referral draft opened</h3>
        <p className="mt-2 mb-6 text-[15px] leading-[1.6] text-ip-body">
          Your email client should have opened with the details filled in. Please <strong className="text-black">attach the candidate’s resume</strong> and send.
        </p>
        <button
          type="button"
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
          className={buttonClass("secondary", "md")}
        >
          Submit another referral
        </button>
      </div>
    );
  }

  const field = (key: keyof typeof form) => ({
    id: `ref-${key}`,
    value: form[key],
    "aria-invalid": !!errors[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((er) => ({ ...er, [key]: "" }));
    },
  });

  return (
    <div className="mx-auto max-w-[760px] space-y-10">
      {/* CANDIDATE DETAILS */}
      <fieldset className="m-0 border-0 p-0">
        <legend className="ip-label mb-5 w-full border-b-2 border-black pb-3">Candidate details</legend>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel required htmlFor="ref-candidateName">
              Full name
            </FieldLabel>
            <input type="text" placeholder="e.g. Ravi Shankar" className={cn(inputCls, errors.candidateName && errCls)} {...field("candidateName")} />
            <ErrorText>{errors.candidateName}</ErrorText>
          </div>
          <div>
            <FieldLabel required htmlFor="ref-candidateEmail">
              Email address
            </FieldLabel>
            <input type="email" placeholder="ravi@example.com" className={cn(inputCls, errors.candidateEmail && errCls)} {...field("candidateEmail")} />
            <ErrorText>{errors.candidateEmail}</ErrorText>
          </div>
          <div>
            <FieldLabel htmlFor="ref-candidatePhone">Phone number</FieldLabel>
            <input type="tel" placeholder="+91 9876543210" className={inputCls} {...field("candidatePhone")} />
          </div>
          <div>
            <FieldLabel required htmlFor="ref-position">
              Applying for
            </FieldLabel>
            <select className={cn(inputCls, errors.position && errCls)} {...field("position")}>
              <option value="" disabled>
                Select a position
              </option>
              {openRoles.map((p) => (
                <option key={`${p.title}-${p.department}`} value={p.title}>
                  {p.title} — {p.department}
                </option>
              ))}
            </select>
            <ErrorText>{errors.position}</ErrorText>
          </div>
        </div>
      </fieldset>

      {/* YOUR DETAILS (REFEREE) */}
      <fieldset className="m-0 border-0 p-0">
        <legend className="ip-label mb-5 w-full border-b-2 border-black pb-3">Your details (referee)</legend>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <FieldLabel required htmlFor="ref-refereeName">
              Your name
            </FieldLabel>
            <input type="text" placeholder="e.g. Ajay Kumar" className={cn(inputCls, errors.refereeName && errCls)} {...field("refereeName")} />
            <ErrorText>{errors.refereeName}</ErrorText>
          </div>
          <div>
            <FieldLabel required htmlFor="ref-refereeTeam">
              Your team / department
            </FieldLabel>
            <input type="text" placeholder="e.g. Data & Analytics" className={cn(inputCls, errors.refereeTeam && errCls)} {...field("refereeTeam")} />
            <ErrorText>{errors.refereeTeam}</ErrorText>
          </div>
          <div className="sm:col-span-2">
            <FieldLabel required htmlFor="ref-relationship">
              Relationship to candidate
            </FieldLabel>
            <select className={cn(inputCls, errors.relationship && errCls)} {...field("relationship")}>
              <option value="" disabled>
                Select
              </option>
              <option value="Former Colleague">Former Colleague</option>
              <option value="Friend">Friend</option>
              <option value="School/University Alum">School/University Alum</option>
              <option value="Other">Other</option>
            </select>
            <ErrorText>{errors.relationship}</ErrorText>
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end border-t border-ip-rule pt-5">
        <button type="button" onClick={handleSubmit} className={buttonClass("primary", "md")}>
          Submit referral
        </button>
      </div>
    </div>
  );
};

// ── How It Works Tab ──────────────────────────────────────────────────────────
const HowItWorksTab = () => {
  const steps = [
    {
      title: "Domain restriction: how it works",
      items: [
        "You enter your work email. The system checks the domain against the allowed list (@inclinedplane.com, @sail-analytics.com).",
        "A 6-digit one-time code is sent to that inbox. Only someone who receives mail at that address can complete verification.",
        "The verified email is stamped into every referral submission, creating an audit trail of who referred whom.",
      ],
    },
    {
      title: "Referral submission flow",
      items: [
        "After verification, fill in the candidate’s details and select the open position.",
        "Submitting opens your email client with everything filled in: candidate info, position and your verified email.",
        "Attach the candidate’s resume and send. All referrals land in the careers inbox in a consistent, searchable format.",
      ],
    },
  ];

  return (
    <div className="mx-auto max-w-[680px] space-y-8">
      {steps.map(({ title, items }) => (
        <div key={title} className="border-t-2 border-black pt-5">
          <h3 className="ip-h3 m-0">{title}</h3>
          <ol className="mt-4 mb-0 list-none space-y-3 p-0">
            {items.map((item, i) => (
              <li key={i} className="grid grid-cols-[28px_1fr] gap-2 text-[15px] leading-[1.55] text-ip-body">
                <span className="font-mono text-[12px] text-ip-muted">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      ))}

      {!EMAILJS_CONFIGURED && (
        <div className="rounded-[10px] border border-dashed border-ip-rule-dashed bg-ip-grey p-5">
          <p className="m-0 text-[15px] font-semibold">EmailJS not yet configured</p>
          <p className="mt-1 mb-3 text-[14px] leading-[1.55] text-ip-body">
            Verification codes are running in dev mode (they appear in the browser console). To send real emails:
          </p>
          <ol className="m-0 list-decimal space-y-1.5 pl-5 text-[14px] text-ip-body">
            <li>
              Create an account at{" "}
              <a href="https://emailjs.com" target="_blank" rel="noopener noreferrer" className="ip-link text-[14px] font-medium">
                emailjs.com
              </a>
            </li>
            <li>Connect a Gmail or Outlook account as your email service</li>
            <li>
              Create a template with the variables <code className="rounded bg-white px-1 font-mono">{"{{to_email}}"}</code> and{" "}
              <code className="rounded bg-white px-1 font-mono">{"{{otp_code}}"}</code>
            </li>
            <li>
              Copy the Service ID, Template ID and Public Key into <code className="rounded bg-white px-1 font-mono">.env</code>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
};

// ── Main Page ─────────────────────────────────────────────────────────────────
const TABS: { id: Tab; label: string }[] = [
  { id: "submit", label: "Submit referral" },
  { id: "howto", label: "How it works" },
];

const Referral = () => {
  const [activeTab, setActiveTab] = useState<Tab>("submit");
  const [refereeEmail, setRefereeEmail] = useState<string | null>(null);

  return (
    <SiteLayout
      seo={{
        title: "Referral portal",
        description: "Internal referral portal for InclinedPlane and Sail Analytics team members.",
        path: "/referral",
        noIndex: true,
      }}
    >
      <section className="bg-white">
        <div className="ip-container py-[clamp(48px,7vw,96px)]">
          <div className="mx-auto mb-10 max-w-[760px]">
            <Label className="mb-4">Internal tool</Label>
            <h1 className="ip-h1-page m-0">Referral portal</h1>
            <p className="ip-lead mt-4 mb-0">Submit candidate referrals for open positions. Only InclinedPlane and Sail Analytics team members can refer.</p>

            <div role="tablist" aria-label="Referral portal" className="mt-8 inline-flex rounded-[8px] border border-ip-rule-strong p-1 text-[14px]">
              {TABS.map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  aria-controls={`referral-panel-${id}`}
                  onClick={() => setActiveTab(id)}
                  className={cn(
                    "min-h-[40px] rounded-[6px] px-4 font-medium transition-colors duration-150",
                    activeTab === id ? "bg-black text-white" : "text-ip-body hover:bg-ip-grey",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div role="tabpanel" id={`referral-panel-${activeTab}`}>
            {activeTab === "submit" && (refereeEmail ? <SubmitReferralTab refereeEmail={refereeEmail} /> : <EmailGate onVerified={setRefereeEmail} />)}
            {activeTab === "howto" && <HowItWorksTab />}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Referral;
