import { useState, useEffect, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Thesis from "./pages/Thesis";
import ServicesPage from "./pages/Services";
import Industries from "./pages/Industries";
import CaseStudies from "./pages/CaseStudies";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import CookiePolicy from "./pages/CookiePolicy";
import Blogs from "./pages/Blogs";
import BlogPostPage from "./pages/BlogPost";
import CookieConsent from "./components/CookieConsent";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

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
            </BrowserRouter>
            <Analytics />
          </TooltipProvider>
        </QueryClientProvider>
      </div>
    </>
  );
};

export default App;
