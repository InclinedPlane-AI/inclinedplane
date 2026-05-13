import {
  LegalLayout,
  Section,
  H3,
  P,
  ArrowList,
  LI,
  HighlightBox,
  WarningBox,
  ContactBlock,
  A,
  type TocItem,
} from "@/components/legal/LegalLayout";

const toc: TocItem[] = [
  { id: "acceptance", num: "01", label: "Acceptance" },
  { id: "about-us", num: "02", label: "About Us" },
  { id: "services", num: "03", label: "Our Services" },
  { id: "use-of-site", num: "04", label: "Use of This Site" },
  { id: "ip", num: "05", label: "Intellectual Property" },
  { id: "disclaimers", num: "06", label: "Disclaimers" },
  { id: "liability", num: "07", label: "Limitation of Liability" },
  { id: "third-party", num: "08", label: "Third-Party Links" },
  { id: "indemnification", num: "09", label: "Indemnification" },
  { id: "privacy", num: "10", label: "Privacy" },
  { id: "governing-law", num: "11", label: "Governing Law" },
  { id: "changes", num: "12", label: "Changes" },
  { id: "contact", num: "13", label: "Contact" },
];

const Terms = () => (
  <LegalLayout
    seoTitle="Terms of Service"
    seoDescription="Terms governing the use of Inclined Plane's website and services."
    seoPath="/terms"
    title="Terms of Service"
    meta={["Effective: 7 May 2026", "Last Updated: 11 May 2026", "Governing Law: England & Wales"]}
    toc={toc}
  >
    <HighlightBox>
      These Terms of Service govern your use of the Inclined Plane website at <strong>www.inclinedplane.com</strong>. By accessing or using this website, you agree to be bound by these terms. If you do not agree, please do not use this site. Separate written agreements govern any engagement of our professional services. California residents should also review our <A href="/privacy#california">CCPA Privacy Notice</A>.
    </HighlightBox>

    <Section id="acceptance" num="01" title="Acceptance of Terms">
      <P>By accessing or browsing our website, you confirm that you are at least 16 years of age (or the applicable age of digital consent in your jurisdiction), that you have read and understood these Terms of Service, and that you agree to comply with them and all applicable laws and regulations.</P>
      <P>These terms apply to the website <strong>www.inclinedplane.com</strong> and any subdomains operated by Inclined Plane. They do not govern the terms of any professional services engagement — those are subject to separate written contracts agreed between Inclined Plane and the client.</P>
    </Section>

    <Section id="about-us" num="02" title="About Us">
      <P>This website is operated by <strong>Inclined Plane</strong>, an AI-native data engineering consultancy. Our contact and entity details are provided in Section 13.</P>
      <P>References to "Inclined Plane", "we", "us", or "our" throughout these Terms refer to our operating entities.</P>
    </Section>

    <Section id="services" num="03" title="Website vs. Professional Services">
      <P>This website is an informational and marketing platform. It allows potential clients, partners, and candidates to learn about Inclined Plane, contact us, and access our published content.</P>
      <P>If you engage Inclined Plane for professional data engineering or AI consultancy services, those services are governed by a separate, bespoke written agreement. Nothing on this website constitutes an offer to provide professional services, and browsing this site does not create a client relationship.</P>
      <P>Information on this website — including case studies, statistics, and service descriptions — is provided for general informational purposes and may not reflect the precise scope of services available to any particular client.</P>
    </Section>

    <Section id="use-of-site" num="04" title="Acceptable Use of This Website">
      <P>You may use this website for lawful purposes only. You agree not to:</P>
      <ArrowList>
        <LI>Use the site in any way that violates applicable local, national, or international laws or regulations</LI>
        <LI>Transmit unsolicited commercial communications (spam) or any material that is harmful, offensive, or objectionable</LI>
        <LI>Attempt to gain unauthorised access to any part of the website, its servers, or any connected systems</LI>
        <LI>Use automated tools (bots, scrapers, crawlers) to extract content from the website without our prior written consent</LI>
        <LI>Introduce viruses, trojans, or any other malicious or technologically harmful material</LI>
        <LI>Reproduce, distribute, or commercially exploit any content from this website without permission</LI>
        <LI>Misrepresent your identity or affiliation when contacting us through the website</LI>
        <LI>Disrupt the normal operation of the website for other users</LI>
      </ArrowList>
      <P>We reserve the right to restrict or terminate access to the website for any user who violates these terms.</P>
    </Section>

    <Section id="ip" num="05" title="Intellectual Property">
      <H3>Our content</H3>
      <P>All content on this website — including text, graphics, logos, icons, images, case studies, blog articles, code samples, and the overall design — is the property of Inclined Plane or its licensors and is protected by applicable intellectual property laws.</P>
      <P>You may access and view content on this website for personal, non-commercial purposes. You may share links to our content. You must not reproduce, modify, distribute, or create derivative works from our content without our express written permission.</P>
      <H3>Your submissions</H3>
      <P>If you submit any content to us via contact forms, email, or other channels (such as feedback, ideas, or enquiries), you grant Inclined Plane a non-exclusive, royalty-free licence to use that content for the purposes for which it was submitted. We will handle any personal data in accordance with our <A href="/privacy">Privacy Policy</A>.</P>
      <H3>Trademarks</H3>
      <P>The name "Inclined Plane", "InclinedPlane", and associated logos are trademarks of Inclined Plane. You may not use these marks without our prior written consent.</P>
    </Section>

    <Section id="disclaimers" num="06" title="Disclaimers">
      <P>This website is provided on an "as is" and "as available" basis without any warranties, express or implied. We make no representations regarding:</P>
      <ArrowList>
        <LI>The accuracy, completeness, or currency of any information on the site</LI>
        <LI>The fitness of the website for any particular purpose</LI>
        <LI>The uninterrupted or error-free availability of the website</LI>
        <LI>The absence of viruses or other harmful components</LI>
      </ArrowList>
      <H3>Artificial Intelligence (AI) Outputs</H3>
      <P>Given the nature of our business, our website may occasionally feature demonstrations, examples, or discussions of AI outputs. AI systems are probabilistic by nature and can produce inaccurate, incomplete, or biased information (often referred to as "hallucinations"). Any AI-generated content provided on this site is for illustrative purposes only. You agree not to rely on any AI-generated outputs without independent, expert human verification.</P>
      <WarningBox>
        // Nothing on this website constitutes professional legal, financial, technical, or commercial advice. Any information or opinions expressed are general in nature and should not be relied upon without independent verification or professional consultation.
      </WarningBox>
      <P>While we strive to keep content accurate, industry statistics and market data referenced on the site are sourced from third parties and may become outdated. You should verify any information before acting on it.</P>
    </Section>

    <Section id="liability" num="07" title="Limitation of Liability">
      <P>To the fullest extent permitted by applicable law, Inclined Plane shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from:</P>
      <ArrowList>
        <LI>Your use of, or inability to use, this website</LI>
        <LI>Reliance on any content or information provided on the site</LI>
        <LI>Unauthorised access to or alteration of your data or transmissions</LI>
        <LI>Any third-party content or websites linked from this site</LI>
      </ArrowList>
      <P>Nothing in these Terms excludes or limits our liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any other liability that cannot be excluded or limited under applicable law.</P>
      <P>If you are a consumer (not a business), your statutory consumer rights are not affected by these Terms.</P>
    </Section>

    <Section id="third-party" num="08" title="Third-Party Links and Content">
      <P>Our website may contain links to external websites, research papers, partner pages, or third-party platforms (such as LinkedIn or GitHub). These links are provided for convenience and informational value only.</P>
      <P>We do not endorse, control, or take responsibility for the content, privacy practices, or terms of any third-party websites. You access linked sites at your own risk and should review their own terms and privacy policies.</P>
    </Section>

    <Section id="indemnification" num="09" title="Indemnification & Severability">
      <H3>Indemnification</H3>
      <P>You agree to indemnify, defend, and hold harmless Inclined Plane and its directors, employees, and agents from any claims, liabilities, damages, judgments, awards, losses, costs, or expenses (including reasonable legal fees) arising out of or relating to your violation of these Terms of Service or your use of the website.</P>
      <H3>Severability</H3>
      <P>If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms will continue in full force and effect.</P>
    </Section>

    <Section id="privacy" num="10" title="Privacy">
      <P>Your use of this website is also governed by our <A href="/privacy">Privacy Policy</A> and <A href="/cookies">Cookie Policy</A>, which are incorporated into these Terms by reference. Please review them to understand how we collect and handle your data.</P>
    </Section>

    <Section id="governing-law" num="11" title="Governing Law and Jurisdiction">
      <H3>Website terms</H3>
      <P>These Terms of Service and any disputes arising out of or in connection with your use of this website are governed by and construed in accordance with the laws of <strong>England and Wales</strong>, without regard to its conflict of law provisions.</P>
      <P>Any disputes relating solely to your use of this website shall be subject to the non-exclusive jurisdiction of the courts of England and Wales. If you are a consumer, you retain the right to bring proceedings in the courts of your country of residence.</P>
      <H3>US visitors and prospective clients</H3>
      <P>We actively work with and market to businesses in the United States, including in California. If you are a California resident or business, the following applies:</P>
      <ArrowList>
        <LI>Your privacy rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA) are respected and addressed in our <A href="/privacy#california">Privacy Policy</A></LI>
        <LI>Nothing in these website Terms of Service waives or overrides any statutory rights you hold under applicable US federal or state law</LI>
        <LI>Any future professional services engagement between Inclined Plane and a US-based client will be governed by a separate written contract, which may specify US governing law, including California law, as mutually agreed</LI>
      </ArrowList>
      <H3>Dispute Resolution for US Users (Arbitration & Class Action Waiver)</H3>
      <P>For users residing in the United States, any dispute, claim, or controversy arising out of or relating to your use of this website will be resolved by binding arbitration on an individual basis, rather than in court. By agreeing to these Terms, you and Inclined Plane expressly waive the right to participate in a class action lawsuit or class-wide arbitration.</P>
      <WarningBox>
        // These website Terms apply to browsing and general use of www.inclinedplane.com only. They are not a services contract. Any data engineering or AI consultancy engagement will be subject to a separately negotiated written agreement with its own governing law clause.
      </WarningBox>
    </Section>

    <Section id="changes" num="12" title="Changes to These Terms">
      <P>We may update these Terms of Service from time to time. When we do, the "Last Updated" date at the top of this page will be revised. Continued use of our website following any update constitutes acceptance of the revised Terms.</P>
      <P>For material changes, we will make reasonable efforts to notify users — for example, by displaying a prominent notice on the website. We recommend checking this page periodically.</P>
    </Section>

    <Section id="contact" num="13" title="Contact Us" last>
      <P>If you have questions about these Terms, wish to request permissions, or need to report a concern, please contact us:</P>
      <ContactBlock>
        <p>// <strong>US Entity</strong>: Company Registration No. 10470774</p>
        <p>// US Registered Office: 838 Walker Rd., Suite 21-2, Dover, Delaware 19904</p>
        <p className="!mt-3">// <strong>India Entity</strong>: Registration No. U63111KA2026FTC219628</p>
        <p>// India Registered Office: WeWorkSalarpuriaSymbiosis, ArekereVillageBegurHobli, Bannerghatta Road, Bangalore South, Bangalore- 560076, Karnataka</p>
        <p className="!mt-3">// Email: <A href="mailto:legal@inclinedplane.com">legal@inclinedplane.com</A></p>
        <p>// Website: <A href="https://www.inclinedplane.com" external>www.inclinedplane.com</A></p>
      </ContactBlock>
    </Section>
  </LegalLayout>
);

export default Terms;