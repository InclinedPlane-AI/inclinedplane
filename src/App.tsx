import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Index from "./pages/Index";
import Thesis from "./pages/Thesis";
import Products from "./pages/Products";
import ProductPipelineIQ from "./pages/ProductPipelineIQ";
import ProductInclever from "./pages/ProductInclever";
import Industries from "./pages/Industries";
import Assessment from "./pages/Assessment";
import ThankYou from "./pages/ThankYou";
import Learn from "./pages/Learn";
import LearnArticle from "./pages/LearnArticle";
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
import Referral from "./pages/Referral";
import CookieConsent from "./components/CookieConsent";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";
import { BookingProvider } from "./components/site/booking/BookingProvider";
import Capabilities from "./pages/Capabilities";
import CapabilityPage from "./pages/CapabilityPage";
import ContextEngineering from "./pages/ContextEngineering";
import Insights from "./pages/Insights";
import Resources from "./pages/Resources";
import ReadinessChecklist from "./pages/ReadinessChecklist";

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
  typeof document !== "undefined" && document.documentElement.getAttribute("data-prerendered") === "true";

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
      {!splashDone && <SplashScreen contentReady={contentReady} onComplete={handleSplashComplete} />}
      <div style={splashDone ? undefined : { visibility: "hidden", position: "fixed" }} aria-hidden={!splashDone}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <BookingProvider>
              <CookieConsent />
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/thesis" element={<Thesis />} />
                  <Route path="/services" element={<Navigate to="/capabilities" replace />} />
                  <Route path="/inclever" element={<Navigate to="/products/inclever" replace />} />
                  <Route path="/assessment" element={<Assessment />} />
                  <Route path="/assessment/thank-you" element={<ThankYou />} />
                  <Route path="/context-engineering" element={<ContextEngineering />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/readiness-checklist" element={<ReadinessChecklist />} />
                  <Route path="/learn/what-is-context-engineering" element={<Navigate to="/context-engineering" replace />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/learn/:slug" element={<LearnArticle />} />
                  <Route path="/capabilities" element={<Capabilities />} />
                  <Route path="/capabilities/:slug" element={<CapabilityPage />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/pipelineiq" element={<ProductPipelineIQ />} />
                  <Route path="/products/inclever" element={<ProductInclever />} />
                  <Route path="/industries" element={<Industries />} />
                  <Route path="/case-studies" element={<CaseStudies />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blog" element={<Blogs />} />
                  <Route path="/blog/:slug" element={<BlogPostPage />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/referral" element={<Referral />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
              </BookingProvider>
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
