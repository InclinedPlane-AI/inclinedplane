import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait for DOM to render, then scroll to the element
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 128;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
