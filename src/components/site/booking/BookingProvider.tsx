/**
 * Global booking dialog. Every "Book an assessment" button calls
 * `useBooking().open({ source })`. Two paths in one dialog:
 *   1. "Answer five questions" → Formspree → then pick a time
 *   2. "Pick a time now"       → calendar straight away
 * Deep links: add `?book=1` (form) or `?book=calendar` to any URL.
 */
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { AssessmentForm, type AssessmentAnswers } from "./AssessmentForm";
import { CalendarPanel } from "./CalendarPanel";
import { Label } from "../primitives";
import { booking } from "@/content/site";
import { cn } from "@/lib/utils";

type Tab = "form" | "calendar";
interface OpenOptions {
  source?: string;
  tab?: Tab;
}

const BookingContext = createContext<{ open: (opts?: OpenOptions) => void }>({ open: () => {} });

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("form");
  const [source, setSource] = useState("unknown");
  const [submitted, setSubmitted] = useState<AssessmentAnswers | null>(null);

  const open = useCallback((opts: OpenOptions = {}) => {
    setTab(opts.tab ?? "form");
    setSource(opts.source ?? "unknown");
    setSubmitted(null);
    setOpen(true);
  }, []);

  useEffect(() => {
    const b = new URLSearchParams(location.search).get("book");
    if (b) open({ source: "link", tab: b === "calendar" ? "calendar" : "form" });
  }, [location.search, open]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      const params = new URLSearchParams(location.search);
      if (params.has("book")) {
        params.delete("book");
        const q = params.toString();
        navigate({ pathname: location.pathname, search: q ? `?${q}` : "", hash: location.hash }, { replace: true });
      }
    }
  };

  return (
    <BookingContext.Provider value={{ open }}>
      {children}
      <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/55 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-32px)] max-w-[620px] max-h-[calc(100dvh-32px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border-t-4 border-ip-orange bg-white p-6 sm:p-9 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)] font-sans text-black focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-[0.98]"
          >
            <Dialog.Close
              aria-label="Close"
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-md text-black hover:bg-ip-grey"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12" />
                <path d="M18 6L6 18" />
              </svg>
            </Dialog.Close>

            <Label small className="mb-2">
              AI Data Readiness Assessment · {booking.durationMinutes} minutes
            </Label>
            <Dialog.Title className="m-0 pr-10 text-[26px] font-semibold leading-[1.15] tracking-[-0.015em]">
              {submitted ? "Thanks. Now pick a time." : tab === "form" ? "Five quick questions" : "Pick a time that suits you"}
            </Dialog.Title>

            {!submitted && (
              <div role="tablist" aria-label="How would you like to book?" className="mt-5 inline-flex rounded-[8px] border border-ip-rule-strong p-1 text-[14px]">
                {(
                  [
                    ["form", "Answer five questions"],
                    ["calendar", "Pick a time now"],
                  ] as const
                ).map(([id, label]) => (
                  <button
                    key={id}
                    role="tab"
                    type="button"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={cn(
                      "min-h-[40px] rounded-[6px] px-4 font-medium transition-colors duration-150",
                      tab === id ? "bg-black text-white" : "text-ip-body hover:bg-ip-grey",
                    )}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {submitted ? (
              <div className="mt-4 flex flex-col gap-4">
                <p className="m-0 text-[15px] leading-[1.55] text-ip-body">
                  We’ll review your answers before the call, so the {booking.durationMinutes} minutes go on your data, not on background.
                </p>
                <CalendarPanel email={submitted.email} />
              </div>
            ) : tab === "form" ? (
              <>
                <p className="mt-4 mb-0 text-[15px] leading-[1.55] text-ip-body">
                  So the call starts with your data, not with background. Only your role and work email are required.
                </p>
                <AssessmentForm source={source} onSubmitted={setSubmitted} />
              </>
            ) : (
              <div className="mt-4 flex flex-col gap-4">
                <p className="m-0 text-[15px] leading-[1.55] text-ip-body">
                  A senior engineer joins the call. Prefer to share some context first?{" "}
                  <button type="button" className="ip-link text-[15px] min-h-0" onClick={() => setTab("form")}>
                    Answer five questions
                  </button>
                  .
                </p>
                <CalendarPanel />
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </BookingContext.Provider>
  );
}

/** A button that opens the booking dialog. */
export function BookButton({
  source,
  children,
  className,
  tab,
}: {
  source: string;
  children: ReactNode;
  className?: string;
  tab?: Tab;
}) {
  const { open } = useBooking();
  return (
    <button type="button" className={className} onClick={() => open({ source, tab })} data-cta={source}>
      {children}
    </button>
  );
}
