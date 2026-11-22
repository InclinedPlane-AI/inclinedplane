/**
 * Global booking dialog (founder's homepage, 22 Nov 2026). Two modes:
 *
 *   assess     pick a time (Calendly) → /assessment/thank-you, where the three
 *              optional questions are asked (see BookingFlow; "Can't find a
 *              time?" fallback included)
 *   checklist  work email → instant PDF download → offer the assessment
 *
 * Every "Book an assessment" CTA calls useBooking().open({ source }); the
 * checklist CTAs call openChecklist({ source }).
 * Deep links: `?book=1` opens the assessment, `?checklist=1` the checklist.
 */
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useLocation, useNavigate } from "react-router-dom";
import { track } from "@vercel/analytics";
import { BookingFlow, stepLabel, stepTitles, type BookingStep } from "./BookingFlow";
import { ChecklistDone, ChecklistForm } from "./ChecklistOffer";
import { Label } from "../primitives";

type Mode = "assess" | "checklist";
interface OpenOptions {
  source?: string;
}

interface Ctx {
  open: (opts?: OpenOptions) => void;
  openChecklist: (opts?: OpenOptions) => void;
}

const BookingContext = createContext<Ctx>({ open: () => {}, openChecklist: () => {} });

export const useBooking = () => useContext(BookingContext);

export function BookingProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [mode, setMode] = useState<Mode>("assess");
  const [source, setSource] = useState("unknown");
  const [step, setStep] = useState<BookingStep>("time");
  const [checklistDone, setChecklistDone] = useState(false);
  const [session, setSession] = useState(0); // remounts the flow on each open

  const show = useCallback((m: Mode, opts: OpenOptions = {}) => {
    // Brief §11.6: CTA clicks by location. (Vercel custom events are recorded
    // on paid plans only; harmless no-op otherwise.)
    track(m === "assess" ? "assessment_open" : "checklist_open", { source: opts.source ?? "unknown" });
    setMode(m);
    setSource(opts.source ?? "unknown");
    setStep("time");
    setChecklistDone(false);
    setSession((s) => s + 1);
    setOpen(true);
  }, []);

  const open = useCallback((opts?: OpenOptions) => show("assess", opts), [show]);
  const openChecklist = useCallback((opts?: OpenOptions) => show("checklist", opts), [show]);

  // Close the dialog whenever the page changes (e.g. after a booking, the flow
  // navigates to the thank-you page).
  const lastPath = useRef(location.pathname);
  useEffect(() => {
    if (location.pathname !== lastPath.current) {
      lastPath.current = location.pathname;
      setOpen(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    if (p.get("book")) open({ source: "link" });
    else if (p.get("checklist")) openChecklist({ source: "link" });
  }, [location.search, open, openChecklist]);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) {
      const params = new URLSearchParams(location.search);
      if (params.has("book") || params.has("checklist")) {
        params.delete("book");
        params.delete("checklist");
        const q = params.toString();
        navigate({ pathname: location.pathname, search: q ? `?${q}` : "", hash: location.hash }, { replace: true });
      }
    }
  };

  const label = mode === "assess" ? stepLabel(step) : "Free download";
  const title =
    mode === "assess" ? stepTitles[step] : checklistDone ? "Your checklist is downloading" : "AI data readiness checklist";

  return (
    <BookingContext.Provider value={{ open, openChecklist }}>
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

            <Label small className="mb-2 pr-10">
              {label}
            </Label>
            <Dialog.Title className="m-0 pr-10 text-[26px] font-semibold leading-[1.15] tracking-[-0.015em]">{title}</Dialog.Title>

            {mode === "assess" ? (
              <BookingFlow key={session} source={source} calendarHeight={560} onStepChange={setStep} onClose={() => onOpenChange(false)} />
            ) : checklistDone ? (
              <ChecklistDone onBook={() => open({ source: "checklist-done" })} />
            ) : (
              <>
                <p className="mt-4 mb-0 text-[15px] leading-[1.55] text-ip-body">
                  One page to check whether your data is ready for AI agents: quality, context, access and governance. Free, no call needed.
                </p>
                <ChecklistForm source={source} onDone={() => setChecklistDone(true)} />
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </BookingContext.Provider>
  );
}
