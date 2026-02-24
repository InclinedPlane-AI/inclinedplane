import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import CookieConsent from "./components/CookieConsent";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

// Route-level code splitting
const Index = lazy(() => import("./pages/Index"));
const Thesis = lazy(() => import("./pages/Thesis"));
const ServicesPage = lazy(() => import("./pages/Services"));
const Industries = lazy(() => import("./pages/Industries"));
const CaseStudies = lazy(() => import("./pages/CaseStudies"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPostPage = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

const App = () => {
  const [contentReady, setContentReady] = useState(false);
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const markReady = () => setContentReady(true);
    if (document.readyState === "complete") {
      markReady();
    } else {
      window.addEventListener("load", markReady);
      return () => window.removeEventListener("load", markReady);
    }
  }, []);

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
                  <Route path="/" element={<Suspense fallback={null}><Index /></Suspense>} />
                  <Route path="/thesis" element={<Suspense fallback={null}><Thesis /></Suspense>} />
                  <Route path="/services" element={<Suspense fallback={null}><ServicesPage /></Suspense>} />
                  <Route path="/industries" element={<Suspense fallback={null}><Industries /></Suspense>} />
                  <Route path="/case-studies" element={<Suspense fallback={null}><CaseStudies /></Suspense>} />
                  <Route path="/about" element={<Suspense fallback={null}><About /></Suspense>} />
                  <Route path="/blog" element={<Suspense fallback={null}><Blogs /></Suspense>} />
                  <Route path="/blog/:slug" element={<Suspense fallback={null}><BlogPostPage /></Suspense>} />
                  <Route path="/contact" element={<Suspense fallback={null}><Contact /></Suspense>} />
                  <Route path="/privacy" element={<Suspense fallback={null}><PrivacyPolicy /></Suspense>} />
                  <Route path="/terms" element={<Suspense fallback={null}><Terms /></Suspense>} />
                  <Route path="/cookies" element={<Suspense fallback={null}><CookiePolicy /></Suspense>} />
                  <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
