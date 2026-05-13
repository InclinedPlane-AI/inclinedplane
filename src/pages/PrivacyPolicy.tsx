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
  { id: "who-we-are", num: "01", label: "Who We Are" },
  { id: "data-we-collect", num: "02", label: "Data We Collect" },
  { id: "how-we-use", num: "03", label: "How We Use Data" },
  { id: "legal-basis", num: "04", label: "Legal Basis" },
  { id: "sharing", num: "05", label: "Data Sharing" },
  { id: "international", num: "06", label: "International Transfers" },
  { id: "retention", num: "07", label: "Retention" },
  { id: "your-rights", num: "08", label: "Your Rights" },
  { id: "california", num: "09", label: "California (CCPA)" },
  { id: "cookies", num: "10", label: "Cookies" },
  { id: "security", num: "11", label: "Security" },
  { id: "children", num: "12", label: "Children" },
  { id: "changes", num: "13", label: "Changes" },
  { id: "contact", num: "14", label: "Contact" },
];

const PrivacyPolicy = () => (
  <LegalLayout
    seoTitle="Privacy Policy"
    seoDescription="How Inclined Plane collects, uses, and protects personal information."
    seoPath="/privacy"
    title="Privacy Policy"
    meta={["Effective: 7 May 2026", "Last Updated: 11 May 2026", "Jurisdiction: US & India"]}
    toc={toc}
  >
    <HighlightBox>
      This Privacy Policy explains how Inclined Plane (<strong>"Inclined Plane"</strong>, <strong>"we"</strong>, <strong>"us"</strong>) collects, uses, and protects personal information when you visit our website or engage with our services. We take your privacy seriously.
    </HighlightBox>

    <Section id="who-we-are" num="01" title="Who We Are">
      <P>Inclined Plane is an AI-native data engineering consultancy. Our registered business addresses and contact details are listed in Section 14. We act as the data controller for personal data collected through this website.</P>
      <P>We operate across the United States and India. Where applicable, we comply with global data protection standards, including relevant US state privacy laws such as the California Consumer Privacy Act (CCPA) as amended by the CPRA, and the UK/EU General Data Protection Regulation (GDPR) for visitors from those regions.</P>
    </Section>

    <Section id="data-we-collect" num="02" title="Data We Collect">
      <H3>Information you provide directly</H3>
      <ArrowList>
        <LI>Name, email address, job title, and company name submitted via contact forms or discovery call bookings</LI>
        <LI>Content of enquiries, messages, or communications you send us</LI>
        <LI>Information provided during contract or engagement discussions</LI>
        <LI>CV or application information submitted via careers pages</LI>
      </ArrowList>
      <H3>Information collected automatically</H3>
      <ArrowList>
        <LI>IP address and approximate geographic location</LI>
        <LI>Browser type, operating system, and device information</LI>
        <LI>Pages visited, time on site, referral source, and clickstream data</LI>
        <LI>Cookie identifiers and session data (see Section 10)</LI>
      </ArrowList>
      <H3>Information from third parties</H3>
      <ArrowList>
        <LI>Professional details from LinkedIn if you connect via that platform</LI>
        <LI>Analytics data from services such as Google Analytics or similar</LI>
      </ArrowList>
    </Section>

    <Section id="how-we-use" num="03" title="How We Use Your Data">
      <P>We use personal data for the following purposes:</P>
      <ArrowList>
        <LI>Responding to enquiries and booking discovery calls</LI>
        <LI>Delivering and managing our data engineering and AI consultancy services</LI>
        <LI>Sending relevant service updates, blog content, or thought leadership (with your consent)</LI>
        <LI>Processing job applications and managing recruitment</LI>
        <LI>Improving our website experience and understanding user behaviour</LI>
        <LI>Complying with legal and regulatory obligations</LI>
        <LI>Protecting against fraud, misuse, or security threats</LI>
        <LI><strong>No AI Training:</strong> We explicitly do <strong>not</strong> use personal data collected through this website (such as contact form submissions or emails) to train, fine-tune, or develop any proprietary or third-party Large Language Models (LLMs) or artificial intelligence systems.</LI>
      </ArrowList>
    </Section>

    <Section id="legal-basis" num="04" title="Legal Basis for Processing (UK/EU)">
      <P>For visitors subject to UK/EU GDPR, we rely on the following lawful bases:</P>
      <ArrowList>
        <LI><strong>Contract:</strong> Processing necessary to take steps prior to or fulfil a contract with you</LI>
        <LI><strong>Legitimate interests:</strong> Running our business, improving our services, and maintaining website security — balanced against your rights</LI>
        <LI><strong>Consent:</strong> Marketing communications and non-essential cookies — where you have explicitly opted in</LI>
        <LI><strong>Legal obligation:</strong> Where we are required to process data to comply with law</LI>
      </ArrowList>
    </Section>

    <Section id="sharing" num="05" title="Data Sharing">
      <P>We do not sell your personal data. We may share data with:</P>
      <ArrowList>
        <LI><strong>Service providers:</strong> Hosting, CRM, analytics, email, and calendar platforms that process data on our behalf under data processing agreements</LI>
        <LI><strong>Professional advisers:</strong> Lawyers, accountants, or insurers where required</LI>
        <LI><strong>Authorities:</strong> Law enforcement or regulators where legally required</LI>
        <LI><strong>Business transfers:</strong> In the event of a merger, acquisition, or asset sale — subject to standard confidentiality obligations</LI>
      </ArrowList>
      <P>All third-party processors are contractually required to handle your data securely and only for the specified purpose.</P>
    </Section>

    <Section id="international" num="06" title="International Data Transfers">
      <P>Because we operate internationally, personal data we collect may be transferred to, and processed in, the United States, India, or other countries outside your home jurisdiction.</P>
      <P>When we transfer your data across borders, we ensure it receives an adequate degree of protection by implementing necessary legal safeguards, such as specific legally-approved contracts (like Standard Contractual Clauses) which give personal data the same protection it has in regions like the UK/EEA.</P>
    </Section>

    <Section id="retention" num="07" title="Data Retention">
      <P>We retain personal data only for as long as necessary for the purpose it was collected, or as required by law. Our general retention periods are:</P>
      <ArrowList>
        <LI>Enquiry and contact records: 3 years from last contact</LI>
        <LI>Client engagement records: 7 years post-engagement (legal/tax obligations)</LI>
        <LI>Job application data (unsuccessful): 6 months from decision</LI>
        <LI>Marketing consent records: Until consent is withdrawn</LI>
        <LI>Website analytics data: 14 months (Google Analytics default)</LI>
      </ArrowList>
    </Section>

    <Section id="your-rights" num="08" title="Your Rights">
      <P>Depending on your location, you may have the following rights over your personal data:</P>
      <ArrowList>
        <LI><strong>Access:</strong> Request a copy of the personal data we hold about you</LI>
        <LI><strong>Rectification:</strong> Ask us to correct inaccurate or incomplete data</LI>
        <LI><strong>Erasure:</strong> Request deletion of your data where we have no lawful reason to retain it</LI>
        <LI><strong>Restriction:</strong> Ask us to limit how we use your data in certain circumstances</LI>
        <LI><strong>Portability:</strong> Receive your data in a structured, machine-readable format</LI>
        <LI><strong>Objection:</strong> Object to processing based on legitimate interests or for direct marketing</LI>
        <LI><strong>Withdraw consent:</strong> At any time, where we rely on consent as the legal basis</LI>
      </ArrowList>
      <P>To exercise any of these rights, contact us at the details in Section 14. We will respond within 30 days. UK/EEA residents also have the right to lodge a complaint with their local supervisory authority.</P>
    </Section>

    <Section id="california" num="09" title="California Residents — CCPA / CPRA Rights">
      <P>If you are a resident of California, the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA) grants you specific rights regarding your personal information. This section supplements the rest of this Privacy Policy and applies solely to California residents.</P>
      <H3>Categories of personal information we collect</H3>
      <P>In the past 12 months, we have collected the following categories of personal information from California residents:</P>
      <ArrowList>
        <LI><strong>Identifiers:</strong> Name, email address, IP address, job title, company name</LI>
        <LI><strong>Professional or employment-related information:</strong> Role, employer, and career details submitted via contact or careers forms</LI>
        <LI><strong>Internet or network activity:</strong> Pages visited, referral source, browser type, device information, and session data collected via analytics cookies</LI>
        <LI><strong>Geolocation data:</strong> Approximate location inferred from IP address</LI>
      </ArrowList>
      <P>We collect this information for the business purposes described in Section 3. We do <strong>not</strong> sell or share your personal information with third parties for cross-context behavioural advertising.</P>
      <H3>Your CCPA rights</H3>
      <ArrowList>
        <LI><strong>Right to Know:</strong> You may request disclosure of the categories and specific pieces of personal information we have collected about you, the sources, our business or commercial purpose, and the categories of third parties with whom we share it</LI>
        <LI><strong>Right to Delete:</strong> You may request that we delete personal information we have collected from you, subject to certain exceptions (e.g., where we are required to retain it by law)</LI>
        <LI><strong>Right to Correct:</strong> You may request that we correct inaccurate personal information we maintain about you</LI>
        <LI><strong>Right to Opt-Out of Sale or Sharing:</strong> We do not sell or share personal information as defined under the CCPA/CPRA. No opt-out is therefore required, but you may contact us to confirm this at any time</LI>
        <LI><strong>Right to Limit Use of Sensitive Personal Information:</strong> We do not collect sensitive personal information as defined under the CPRA</LI>
        <LI><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights</LI>
      </ArrowList>
      <H3>How to submit a request</H3>
      <P>To submit a verifiable consumer request, contact us by email at <A href="mailto:privacy@inclinedplane.com">privacy@inclinedplane.com</A> with the subject line "CCPA Request". We will respond within 45 days of receipt. We may need to verify your identity before processing your request. You may designate an authorised agent to submit requests on your behalf.</P>
      <HighlightBox>
        <strong>Do Not Sell or Share My Personal Information:</strong> We do not sell or share your personal information with third parties for advertising or commercial purposes. We use Google Analytics with IP anonymisation enabled. You may also opt out of Google Analytics tracking via the <A href="https://tools.google.com/dlpage/gaoptout" external>Google Analytics Opt-out Add-on</A>.
      </HighlightBox>
    </Section>

    <Section id="cookies" num="10" title="Cookies">
      <P>We use cookies and similar tracking technologies on our website. For full details on what cookies we use, why, and how to manage your preferences, please see our <A href="/cookies">Cookie Policy</A>.</P>
    </Section>

    <Section id="security" num="11" title="Security">
      <P>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. These include encrypted data transmission (TLS), access controls, and regular security reviews. While we strive to protect your data, no internet transmission is completely secure — we cannot guarantee absolute security.</P>
    </Section>

    <Section id="children" num="12" title="Children's Privacy">
      <P>Our website and services are directed at business professionals and are not intended for individuals under the age of 16. We do not knowingly collect personal data from children. If you believe we have inadvertently collected such data, please contact us immediately and we will delete it.</P>
    </Section>

    <Section id="changes" num="13" title="Changes to This Policy">
      <P>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. The "Last Updated" date at the top of this page will be revised accordingly. Where changes are material, we will notify you via email (if we hold your contact details) or by prominent notice on our website.</P>
    </Section>

    <Section id="contact" num="14" title="Contact Us" last>
      <P>If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:</P>
      <ContactBlock>
        <p>// <strong>US Entity</strong>: Company Registration No. 10470774</p>
        <p>// US Registered Office: 838 Walker Rd., Suite 21-2, Dover, Delaware 19904</p>
        <p className="!mt-3">// <strong>India Entity</strong>: Registration No. U63111KA2026FTC219628</p>
        <p>// India Registered Office: WeWorkSalarpuriaSymbiosis, ArekereVillageBegurHobli, Bannerghatta Road, Bangalore South, Bangalore- 560076, Karnataka</p>
        <p className="!mt-3">// Email: <A href="mailto:privacy@inclinedplane.com">privacy@inclinedplane.com</A></p>
        <p>// Website: <A href="https://www.inclinedplane.com" external>www.inclinedplane.com</A></p>
      </ContactBlock>
    </Section>
  </LegalLayout>
);

export default PrivacyPolicy;