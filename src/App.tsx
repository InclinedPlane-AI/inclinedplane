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
              <Suspense fallback={null}>
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/thesis" element={<Thesis />} />
                    <Route path="/services" element={<ServicesPage />} />
                    <Route path="/industries" element={<Industries />} />
                    <Route path="/case-studies" element={<CaseStudies />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/blog" element={<Blogs />} />
                    <Route path="/blog/:slug" element={<BlogPostPage />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/privacy" element={<PrivacyPolicy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/cookies" element={<CookiePolicy />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </AnimatePresence>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
