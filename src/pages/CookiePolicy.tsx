import {
  LegalLayout,
  Section,
  H3,
  P,
  ArrowList,
  LI,
  HighlightBox,
  ContactBlock,
  A,
  type TocItem,
} from "@/components/legal/LegalLayout";

const toc: TocItem[] = [
  { id: "what-are-cookies", num: "01", label: "What Are Cookies" },
  { id: "why-we-use", num: "02", label: "Why We Use Them" },
  { id: "types", num: "03", label: "Types of Cookies" },
  { id: "specific-cookies", num: "04", label: "Cookies We Use" },
  { id: "third-party", num: "05", label: "Third-Party Cookies" },
  { id: "managing", num: "06", label: "Managing Cookies" },
  { id: "changes", num: "07", label: "Changes" },
  { id: "contact", num: "08", label: "Contact" },
];

const cookieRows = [
  {
    name: "cookie_consent",
    provider: "InclinedPlane",
    purpose: "Stores your cookie consent preference (accept/reject)",
    duration: "1 year",
    type: "required" as const,
    typeLabel: "Required",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Distinguishes unique users for analytics reporting",
    duration: "2 years",
    type: "optional" as const,
    typeLabel: "Analytics",
  },
  {
    name: "_ga_*",
    provider: "Google Analytics",
    purpose: "Maintains session state for Google Analytics 4",
    duration: "2 years",
    type: "optional" as const,
    typeLabel: "Analytics",
  },
  {
    name: "_gid",
    provider: "Google Analytics",
    purpose: "Distinguishes users across sessions (24-hour window)",
    duration: "24 hours",
    type: "optional" as const,
    typeLabel: "Analytics",
  },
];

const CookiePolicy = () => (
  <LegalLayout
    seoTitle="Cookie Policy"
    seoDescription="What cookies InclinedPlane uses, why, and how to manage your preferences."
    seoPath="/cookies"
    title="Cookie Policy"
    meta={["Effective: 7 May 2026", "Last Updated: 7 May 2026"]}
    toc={toc}
  >
    <HighlightBox>
      This Cookie Policy explains what cookies are, how InclinedPlane uses them on <strong>www.inclinedplane.com</strong>, and your choices regarding their use. By using our website, you consent to cookies in accordance with this policy.
    </HighlightBox>

    <Section id="what-are-cookies" num="01" title="What Are Cookies?">
      <P>Cookies are small text files placed on your device (computer, tablet, or smartphone) when you visit a website. They allow the website to recognise your device and store certain information about your preferences or behaviour. Cookies are widely used to make websites work more efficiently, improve user experience, and provide analytical information to site owners.</P>
      <P>Similar technologies, including web beacons, pixels, local storage, and session storage, may also be used for similar purposes, and references to "cookies" in this policy cover these technologies too.</P>
    </Section>

    <Section id="why-we-use" num="02" title="Why We Use Cookies">
      <P>We use cookies to:</P>
      <ArrowList>
        <LI>Ensure the website functions correctly and securely</LI>
        <LI>Remember your preferences such as cookie consent</LI>
        <LI>Understand how visitors use our site (pages visited, time spent, traffic sources)</LI>
        <LI>Measure the effectiveness of our content and improve our website over time</LI>
        <LI>Provide a consistent experience across sessions</LI>
      </ArrowList>
      <P>We do <strong>not</strong> use cookies for intrusive advertising, to build profiles for ad targeting, or to track you across third-party websites for commercial gain.</P>
    </Section>

    <Section id="types" num="03" title="Types of Cookies">
      <H3>By duration</H3>
      <ArrowList>
        <LI><strong>Session cookies</strong>: exist only for the duration of your browser session and are deleted when you close your browser</LI>
        <LI><strong>Persistent cookies</strong>: remain on your device for a set period or until you delete them manually</LI>
      </ArrowList>
      <H3>By purpose</H3>
      <ArrowList>
        <LI><strong>Strictly necessary</strong>: required for the website to function. Cannot be disabled without breaking core functionality</LI>
        <LI><strong>Functional / preference</strong>: remember your settings and choices (e.g., cookie consent preferences)</LI>
        <LI><strong>Analytics / performance</strong>: help us understand site traffic and usage patterns anonymously</LI>
        <LI><strong>Marketing / targeting</strong>: we do not currently use cookies for marketing or advertising purposes</LI>
      </ArrowList>
    </Section>

    <Section id="specific-cookies" num="04" title="Cookies We Use">
      <div className="overflow-x-auto -mx-2 my-6">
        <table className="w-full border-collapse text-[13px] min-w-[640px]">
          <thead>
            <tr>
              {["Cookie Name", "Provider", "Purpose", "Duration", "Type"].map((h) => (
                <th
                  key={h}
                  className="font-mono text-[10px] tracking-[0.1em] uppercase text-primary text-left px-3 py-2.5 border-b border-border bg-muted/30"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cookieRows.map((row) => (
              <tr key={row.name}>
                <td className="px-3 py-3 border-b border-border align-top text-muted-foreground">
                  <code className="font-mono text-foreground">{row.name}</code>
                </td>
                <td className="px-3 py-3 border-b border-border align-top text-muted-foreground">{row.provider}</td>
                <td className="px-3 py-3 border-b border-border align-top text-muted-foreground leading-[1.6]">{row.purpose}</td>
                <td className="px-3 py-3 border-b border-border align-top text-muted-foreground">{row.duration}</td>
                <td className="px-3 py-3 border-b border-border align-top">
                  <span
                    className={`inline-block font-mono text-[10px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-sm ${
                      row.type === "required"
                        ? "bg-primary/15 text-primary"
                        : "bg-muted/40 text-muted-foreground"
                    }`}
                  >
                    {row.typeLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <P>This list is reviewed and updated when our cookie usage changes. If we introduce new cookies, we will update this policy and, where required, seek your consent.</P>
    </Section>

    <Section id="third-party" num="05" title="Third-Party Cookies">
      <P>Some cookies are placed by third-party services we use to operate our website:</P>
      <ArrowList>
        <LI><strong>Google Analytics</strong>: we use Google Analytics to understand how visitors interact with our site. Data collected is anonymised (IP addresses are truncated) and is subject to <A href="https://policies.google.com/privacy" external>Google's Privacy Policy</A>. You can opt out using the <A href="https://tools.google.com/dlpage/gaoptout" external>Google Analytics Opt-out Browser Add-on</A>.</LI>
      </ArrowList>
      <P>We do not permit third-party advertisers to place cookies on our website. If that changes, we will update this policy and seek consent where required.</P>
    </Section>

    <Section id="managing" num="06" title="Managing Your Cookie Preferences">
      <H3>Via our cookie banner</H3>
      <P>When you first visit our site, you will be presented with a cookie consent banner. You can accept all cookies, reject non-essential cookies, or adjust your preferences. <A href="#">Click here to update your cookie preferences at any time.</A> You may also change your choice at any time by clearing your browser cookies and revisiting the site.</P>
      <H3>Via your browser settings</H3>
      <P>Most browsers allow you to control cookies through their settings. You can typically find these under "Privacy", "Security", or "Site Settings". You can block or delete cookies from specific sites, or block all cookies entirely. Please note that blocking strictly necessary cookies may affect website functionality.</P>
      <P>Browser-specific guidance:</P>
      <ArrowList>
        <LI><A href="https://support.google.com/chrome/answer/95647" external>Google Chrome</A></LI>
        <LI><A href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" external>Mozilla Firefox</A></LI>
        <LI><A href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" external>Apple Safari</A></LI>
        <LI><A href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" external>Microsoft Edge</A></LI>
      </ArrowList>
      <H3>California residents</H3>
      <P>Under the CCPA/CPRA, California residents have the right to opt out of the "sale" or "sharing" of personal information. We do not sell personal information. The analytics cookies we use (Google Analytics) are configured with IP anonymisation and are used solely for internal analytics, not for cross-context behavioural advertising. If you wish to opt out of Google Analytics specifically, use the <A href="https://tools.google.com/dlpage/gaoptout" external>Google Analytics Opt-out Browser Add-on</A>. For broader CCPA rights, see our <A href="/privacy#california">Privacy Policy, California section</A>.</P>
      <H3>Do Not Track</H3>
      <P>Some browsers offer a "Do Not Track" (DNT) signal. Our website does not currently respond to DNT signals as there is no agreed industry standard for how they should be interpreted. We encourage you to use the cookie controls above to manage your preferences.</P>
    </Section>

    <Section id="changes" num="07" title="Changes to This Policy">
      <P>We may update this Cookie Policy as our technology and legal obligations change. When we do, the "Last Updated" date above will be revised. Continued use of our website after any update constitutes acceptance of the revised policy for non-essential cookies (where consent is not required by law). For changes that require renewed consent, we will display a new cookie banner.</P>
    </Section>

    <Section id="contact" num="08" title="Contact Us" last>
      <P>If you have any questions about our use of cookies or this policy, please contact us:</P>
      <ContactBlock>
        <p>// <strong>US Entity</strong>: Company Registration No. 10470774</p>
        <p>// US Registered Office: 838 Walker Rd., Suite 21-2, Dover, Delaware 19904</p>
        <p className="!mt-3">// <strong>India Entity</strong>: Registration No. U63111KA2026FTC219628</p>
        <p>// India Registered Office: WeWorkSalarpuriaSymbiosis, ArekereVillageBegurHobli, Bannerghatta Road, Bangalore South, Bangalore- 560076, Karnataka</p>
        <p className="!mt-3">// Email: <A href="mailto:privacy@inclinedplane.com">privacy@inclinedplane.com</A></p>
        <p>// Website: <A href="https://www.inclinedplane.com" external>www.inclinedplane.com</A></p>
      </ContactBlock>
      <P>For more information on how we handle your personal data more broadly, see our <A href="/privacy">Privacy Policy</A>.</P>
    </Section>
  </LegalLayout>
);

export default CookiePolicy;