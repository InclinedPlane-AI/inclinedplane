/**
 * /contact — restyled for the revamp. The submission logic is unchanged from
 * the previous page: same Formspree endpoint (xwvnakbz), same JSON fields
 * (name, email, country, company, phone, message), same required fields and
 * native validation, same error toast. Only the markup and styling changed.
 */
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { countryGroups, getCountryByCode } from "@/data/countries";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { site } from "@/content/site";
import type { Verifiable } from "@/content/verify";
import { SiteLayout } from "@/components/site/SiteLayout";
import { useBooking } from "@/components/site/booking/BookingProvider";
import { ArrowIcon, Button, Label, Verified, VerifyBadge, buttonClass } from "@/components/site/primitives";
import { PageHero } from "@/components/site/sections";

const inputClass =
  "w-full font-sans text-[15px] min-h-[44px] px-3 py-2.5 border border-ip-rule-dashed rounded-[6px] bg-white text-black placeholder:text-ip-muted box-border focus:outline-2 focus:outline-ip-orange-ink focus:outline-offset-1 disabled:bg-ip-grey disabled:text-ip-muted";

const labelClass = "mb-1.5 block text-[15px] font-semibold text-black";

/** Office addresses: shown as on the previous site, pending confirmation (brief §4.4). */
const offices: ({ label: string; address: string } & Verifiable)[] = [
  {
    label: "Bengaluru, India",
    address: "InclinedPlane, Wework Salarpuria Symbiosis, Bannerghatta Road, Bengaluru, Karnataka 560076, India",
    verified: false,
  },
  { label: "Dover, Delaware, US", address: "838 Walker Rd, Suite 21-2, Dover, Delaware, 19904, US", verified: false },
];

const nextSteps = [
  { title: "We read your message", desc: "A senior engineer reviews it and the data landscape you describe." },
  { title: "A focused call", desc: "Thirty minutes to agree on goals, timelines and technical constraints." },
  { title: "A written proposal", desc: "Scope, approach, deliverables and a plan you can take to your stakeholders." },
];

const Contact = () => {
  const { open } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

  const dialCode = useMemo(() => {
    if (!selectedCountry) return "";
    const country = getCountryByCode(selectedCountry);
    return country?.dialCode ?? "";
  }, [selectedCountry]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitting(true);
      try {
        const countryInfo = getCountryByCode(selectedCountry);
        const res = await fetch("https://formspree.io/f/xwvnakbz", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            country: countryInfo?.name ?? selectedCountry,
            company: company.trim(),
            phone: phone ? `${dialCode} ${phone}` : "",
            message: message.trim(),
          }),
        });
        if (!res.ok) throw new Error("Submission failed");
        setSubmitted(true);
      } catch {
        toast.error("Something went wrong. Please try again or email us directly.");
      } finally {
        setSubmitting(false);
      }
    },
    [name, email, selectedCountry, company, phone, dialCode, message],
  );

  return (
    <SiteLayout
      seo={{
        title: "Contact us",
        description:
          "Talk to InclinedPlane about modernizing your data platform or getting it ready for AI agents. Send a message or book an AI Data Readiness Assessment.",
        path: "/contact",
      }}
    >
      <PageHero
        crumbs={[{ label: "Contact" }]}
        label="Contact"
        title="Tell us about your data."
        lead="Send a message about a platform, a migration or an AI use case. A senior engineer reads every one."
      />

      <section className="bg-white">
        <div className="ip-container ip-section grid gap-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          {/* Form */}
          <div>
            {submitted ? (
              <div role="status" className="rounded-xl border border-ip-rule-strong border-t-4 border-t-ip-orange bg-white p-8 sm:p-10">
                <Label small className="mb-3">
                  Message sent
                </Label>
                <h2 className="m-0 text-[clamp(26px,2.6vw,32px)] font-semibold leading-[1.15] tracking-[-0.015em]">Thanks, {name.trim().split(" ")[0] || "we have it"}.</h2>
                <p className="mt-4 mb-0 text-[17px] leading-[1.6] text-ip-body">
                  We’ll reply to {email.trim() || "your email"}. If it’s urgent, write to{" "}
                  <a className="ip-link font-medium" href={`mailto:${site.email}`}>
                    {site.email}
                  </a>
                  .
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className={labelClass}>
                      Name
                    </label>
                    <input id="contact-name" required autoComplete="name" className={inputClass} placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className={labelClass}>
                      Work email
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label id="contact-country-label" className={labelClass}>
                      Country
                    </label>
                    <Select required value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger
                        aria-labelledby="contact-country-label"
                        className="h-auto min-h-[44px] rounded-[6px] border-ip-rule-dashed bg-white px-3 text-[15px] focus:ring-0 focus:outline-2 focus:outline-ip-orange-ink"
                      >
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-72 bg-white font-sans">
                        {countryGroups.map((group) => (
                          <SelectGroup key={group.continent}>
                            <SelectLabel className="ip-label-sm px-3 py-2">{group.continent}</SelectLabel>
                            {group.countries.map((country) => (
                              <SelectItem key={country.code} value={country.code} className="text-[14px]">
                                <span className="mr-2">{country.flag}</span>
                                {country.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="contact-company" className={labelClass}>
                      Company
                    </label>
                    <input
                      id="contact-company"
                      required
                      autoComplete="organization"
                      className={inputClass}
                      placeholder="Your company name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-phone" className={labelClass}>
                    Phone <span className="font-normal text-ip-muted">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <div className="flex min-h-[44px] min-w-[72px] items-center justify-center rounded-[6px] border border-ip-rule-strong bg-ip-grey px-3 text-[15px] text-ip-body" aria-hidden="true">
                      {dialCode || "+"}
                    </div>
                    <input
                      id="contact-phone"
                      type="tel"
                      autoComplete="tel-national"
                      className={inputClass}
                      placeholder={selectedCountry ? "Your phone number" : "Select a country first"}
                      disabled={!selectedCountry}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelClass}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    className={`${inputClass} resize-y`}
                    placeholder="The platform you run, what you’re trying to change, and your timeline."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                  <Button type="submit" disabled={submitting}>
                    {submitting ? "Sending" : "Send message"}
                    {!submitting && <ArrowIcon size={16} />}
                  </Button>
                  <span className="text-[14px] text-ip-muted">
                    Or email{" "}
                    <a className="ip-link text-[14px] font-medium" href={`mailto:${site.email}`}>
                      {site.email}
                    </a>
                  </span>
                </div>
              </form>
            )}
          </div>

          {/* Aside */}
          <aside className="flex flex-col gap-10">
            <div className="rounded-xl bg-black p-7 text-white sm:p-8">
              <p className="m-0 text-[22px] font-semibold leading-[1.25]">Prefer to start with the assessment?</p>
              <p className="mt-3 mb-0 text-[16px] leading-[1.55] text-ip-on-dark">
                Answer five quick questions and pick a time for a 45-minute AI Data Readiness Assessment with a senior engineer.
              </p>
              <button type="button" onClick={() => open({ source: "contact" })} className={buttonClass("primary", "md", "mt-6")} data-cta="contact">
                {site.cta.midButton}
                <ArrowIcon size={16} />
              </button>
            </div>

            <div>
              <Label className="mb-4">What happens next</Label>
              <ol className="m-0 list-none border-t-2 border-black p-0">
                {nextSteps.map((s) => (
                  <li key={s.title} className="border-b border-ip-rule-strong py-4">
                    <p className="m-0 text-[17px] font-semibold">{s.title}</p>
                    <p className="mt-1 mb-0 text-[15px] leading-[1.5] text-ip-body">{s.desc}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <Label className="mb-4">Offices</Label>
              <div className="flex flex-col gap-5">
                {offices.map((o) => (
                  <Verified key={o.label} item={o} badge={false}>
                    <div>
                      <p className="m-0 flex flex-wrap items-center gap-2 text-[16px] font-semibold">
                        {o.label} {!o.verified && <VerifyBadge />}
                      </p>
                      <address className="mt-1 text-[15px] not-italic leading-[1.5] text-ip-body">{o.address}</address>
                    </div>
                  </Verified>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Contact;
