import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Label, buttonClass } from "@/components/site/primitives";

const destinations = [
  { to: "/", label: "Home", note: "What we do, in one page." },
  { to: "/capabilities", label: "Capabilities", note: "The four steps from data foundation to AI agents." },
  { to: "/case-studies", label: "Case studies", note: "Platforms and analytics we’ve delivered." },
  { to: "/assessment", label: "AI Data Readiness Assessment", note: "Where most conversations start." },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <SiteLayout seo={{ title: "Page not found", description: "The page you’re looking for doesn’t exist. Return to InclinedPlane’s homepage.", path: location.pathname, noIndex: true }}>
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden="true" className="ip-pattern-fade-left absolute inset-y-0 right-0 hidden w-[40%] md:block" />
        <div className="ip-container relative py-[clamp(64px,10vw,128px)]">
          <Label dot className="mb-6">
            Error 404
          </Label>
          <h1 className="ip-h1-page m-0 max-w-[720px]">This page isn’t here.</h1>
          <p className="ip-lead mt-5 mb-0 max-w-[560px]">
            The link may be old, or the page may have moved during our redesign. These are good places to pick up from.
          </p>
          <ul className="m-0 mt-10 grid max-w-[880px] list-none grid-cols-1 border-t-2 border-black p-0 sm:grid-cols-2">
            {destinations.map((d, i) => (
              <li key={d.to} className={i % 2 === 1 ? "border-b border-ip-rule-strong sm:border-l sm:pl-6" : "border-b border-ip-rule-strong sm:pr-6"}>
                <Link to={d.to} className="group block py-5 no-underline">
                  <span className="block text-[19px] font-semibold text-black group-hover:underline underline-offset-4 decoration-1">{d.label}</span>
                  <span className="mt-1 block text-[15px] text-ip-body">{d.note}</span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/" className={buttonClass("primary", "lg", "mt-10")}>
            Back to the homepage
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
};

export default NotFound;
