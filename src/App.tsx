import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import Thesis from "./pages/Thesis";
import ServicesPage from "./pages/Services";
import Industries from "./pages/Industries";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Blogs from "./pages/Blogs";
import BlogPostPage from "./pages/BlogPost";
import Careers from "./pages/Careers";
import CookieConsent from "./components/CookieConsent";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

const queryClient = new QueryClient();

// GUARDRAIL — DO NOT REMOVE. When scripts/prerender.mjs bakes a route's
// body into static HTML, it stamps `data-prerendered="true"` on <body>;
// src/main.tsx propagates that to <html> before React mounts. We read it
// here via useState's lazy initializer to start with splashDone=true on
// prerendered pages, so SplashScreen never mounts. The splash exists to
// mask the JS-load gap on a fresh SPA — with prerendered HTML there's no
// gap to mask, and showing the splash makes bot screenshots (Google Rich
// Results, LinkedIn previews, Lighthouse) catch the splash mid-animation
// instead of real content. In dev mode the marker is absent and the
// splash renders normally. Last reviewed: 2026-05-03.
const wasPrerendered = (): boolean =>
  typeof document !== "undefined" &&
  document.documentElement.getAttribute("data-prerendered") === "true";

const App = () => {
  const [contentReady, setContentReady] = useState<boolean>(wasPrerendered);
  const [splashDone, setSplashDone] = useState<boolean>(wasPrerendered);

  useEffect(() => {
    const markReady = () => setContentReady(true);
    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady);
      return () => window.removeEventListener("load", markReady);
    }
  }, []);

  // GUARDRAIL — DO NOT REMOVE. Build-time signal consumed by
  // scripts/snapshot.mjs (Puppeteer waits on html[data-app-ready="true"]
  // before capturing body HTML). Behaviourally inert at runtime; removing it
  // breaks crawler-visibility prerender. Last reviewed 2026-05-03.
  useEffect(() => {
    if (splashDone) {
      document.documentElement.setAttribute("data-app-ready", "true");
    }
  }, [splashDone]);

  const handleSplashComplete = useCallback(() => setSplashDone(true), []);

  return (
    <>
      {!splashDone && (
        <SplashScreen
          contentReady={contentReady}
          onComplete={handleSplashComplete}
        />
      )}
      <div
        style={splashDone ? undefined : { visibility: "hidden", position: "fixed" }}
        aria-hidden={!splashDone}
      >
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <CookieConsent />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/thesis" element={<Thesis />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blogs />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
            <Analytics />
            <SpeedInsights />
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
