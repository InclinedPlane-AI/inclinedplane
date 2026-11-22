/**
 * The free one-page AI data readiness checklist (founder's second CTA, for
 * people not ready to talk). Work email → Formspree (lead) → the PDF downloads
 * instantly. Source content: src/content/checklist.json; PDF built by
 * scripts/build-checklist-pdf.mjs. No email automation needed.
 */
import { useId, useState, type FormEvent } from "react";
import checklist from "@/content/checklist.json";
import { readPrefill, postToFormspree, EMAIL_RE } from "./AssessmentForm";
import { ArrowIcon, Button, VerifyBadge } from "../primitives";
import { SHOW_UNVERIFIED } from "@/content/verify";
import { cn } from "@/lib/utils";

const fieldClass =
  "w-full font-sans text-[15px] font-normal min-h-[44px] px-3 py-2 border border-ip-rule-dashed rounded-[6px] bg-white text-black box-border focus:outline-2 focus:outline-ip-orange-ink focus:outline-offset-1";

export const CHECKLIST_FILE = checklist.file;
const DOWNLOAD_NAME = "InclinedPlane AI data readiness checklist.pdf";

function triggerDownload() {
  const a = document.createElement("a");
  a.href = CHECKLIST_FILE;
  a.download = DOWNLOAD_NAME;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function ChecklistForm({ source, onDone }: { source: string; onDone: (email: string) => void }) {
  const uid = useId();
  const [email, setEmail] = useState(() => readPrefill().email ?? "");
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) return setError("Enter a work email like name@company.com.");
    setError(undefined);
    const honeypot = (e.currentTarget.elements.namedItem("_gotcha") as HTMLInputElement | null)?.value;
    setSending(true);
    // The download never waits on the form service: start it, then record the lead.
    triggerDownload();
    if (!honeypot) {
      try {
        await postToFormspree({ _subject: "Readiness checklist download", formType: "checklist", source, email });
      } catch {
        /* lead not recorded; the visitor still has the PDF */
      }
    }
    setSending(false);
    onDone(email);
  }

  return (
    <form onSubmit={submit} noValidate className="mt-5 flex flex-col gap-3.5 text-[15px]">
      <label htmlFor={`${uid}-email`} className="flex flex-col gap-1.5 font-semibold">
        Work email
        <input
          id={`${uid}-email`}
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          className={cn(fieldClass, error && "border-[#b42318]")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!error}
          aria-describedby={error ? `${uid}-err` : undefined}
          required
        />
        {error && (
          <span id={`${uid}-err`} className="text-[13px] font-normal text-[#b42318]">
            {error}
          </span>
        )}
      </label>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button type="submit" size="md" disabled={sending}>
          Download the checklist (PDF)
          <ArrowIcon size={16} />
        </Button>
        <span className="text-[13px] text-ip-muted">One page. The download starts straight away.</span>
      </div>
      {SHOW_UNVERIFIED && checklist.status === "draft" && (
        <p className="m-0 flex flex-wrap items-center gap-2 text-[13px] text-ip-muted">
          <VerifyBadge /> Draft {checklist.version}, awaiting founder review.
        </p>
      )}
    </form>
  );
}

/** Shown after the download starts. */
export function ChecklistDone({ onBook }: { onBook: () => void }) {
  return (
    <div className="mt-4 flex flex-col items-start gap-4">
      <p className="m-0 text-[15px] leading-[1.55] text-ip-body">
        Your download has started. When you want to go further, the 45-minute assessment applies the same checklist to your own data.
      </p>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
        <Button size="md" onClick={onBook}>
          Book the assessment
          <ArrowIcon size={16} />
        </Button>
        <a href={CHECKLIST_FILE} download={DOWNLOAD_NAME} className="ip-link text-[15px]">
          Download again
        </a>
      </div>
    </div>
  );
}
