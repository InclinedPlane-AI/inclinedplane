import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Cookie notice (UK/EU visitors). Same storage key and behaviour as before;
 * restyled to the brand system for the revamp. Not shown to automated
 * browsers so prerender snapshots never capture it.
 */
const KEY = "cookie-consent";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.webdriver) return;
    let consent: string | null = null;
    try {
      consent = localStorage.getItem(KEY);
    } catch {
      /* storage blocked: show the notice */
    }
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const decide = (accepted: boolean) => {
    try {
      localStorage.setItem(KEY, accepted ? "accepted" : "rejected");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      data-print-hidden
      className="fixed bottom-4 left-4 right-4 z-[60] md:left-auto md:right-6 md:bottom-6 md:max-w-[420px] rounded-[10px] border border-ip-rule-strong bg-white p-5 font-sans text-black shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
    >
      <p className="m-0 text-[15px] font-semibold">Cookies</p>
      <p className="mt-1.5 mb-0 text-[14px] leading-[1.55] text-ip-body">
        We use cookies to understand how the site is used. See our{" "}
        <Link to="/cookies" className="ip-link text-[14px] font-medium">
          cookie policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => decide(false)}
          className="min-h-[40px] flex-1 rounded-[6px] border border-black bg-white px-4 text-[14px] font-medium hover:bg-ip-grey"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={() => decide(true)}
          className="min-h-[40px] flex-1 rounded-[6px] bg-ip-orange px-4 text-[14px] font-semibold text-black hover:bg-[#e36c15]"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
