export interface CaseStudyDetailSection {
  id: "opportunity" | "solution" | "impact";
  label: string;
  number: string;
  heading: string;
  body: string;
  bullets?: string[];
}

export interface CaseStudyDetail {
  slug: string;
  caseStudyId: string;
  videoUrl: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: CaseStudyDetailSection[];
}

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "retail-manufacturing-chain": {
    slug: "retail-manufacturing-chain",
    caseStudyId: "retail-manufacturing-chain",
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4",
    heroEyebrow: "01 · Retail & Manufacturing",
    heroTitle:
      "How a national retail & manufacturing chain turned scattered data into real-time decisions",
    heroSubtitle:
      "We modernized data operations end-to-end — from real-time executive reporting to dealer intelligence, scheme automation, market basket analysis, and dealer attrition prediction.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "The prize is enormous.",
        body:
          "Manual reporting was draining senior talent and slowing decisions. Across Sales & Marketing, Inventory and Production, leaders were waiting on weekly Excel cycles assembled by hand. Roughly 30% of senior personnel's time was lost to reporting tasks, dealer conversations were happening without context, scheme rollouts were error-prone, and at-risk dealers were only recognized after revenue had already moved away.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified, real-time intelligence layer for the entire chain.",
        body:
          "We rebuilt the data foundation and layered focused intelligence products on top — designed around the moments where decisions actually happen, from the boardroom to the dealer counter.",
        bullets: [
          "Real-time reporting across Sales & Marketing, Inventory and Production — freeing 30% of key personnel's time previously lost to manual reporting.",
          "Front-line sales teams equipped with rich, actionable dealer intelligence at the point of engagement — sharper conversations, faster closures, stronger relationships.",
          "Automated end-to-end implementation of scheme benefit policies across the dealer and distributor network — eliminating manual errors and accelerating rollout.",
          "Market Basket Analysis guiding dealers toward the optimal product mix and smarter in-store placement — improving sell-through and customer satisfaction.",
          "A dealer attrition prediction model identifying at-risk partners in advance — enabling targeted retention before revenue is impacted.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "Faster cycles, sharper conversations, retention before revenue moves.",
        body:
          "The combination of real-time visibility and predictive intelligence shifted the organization from reactive reporting to proactive decisioning — at every level of the operation.",
        bullets: [
          "30% of senior personnel's reporting time freed and redirected to strategic work.",
          "Sharper, evidence-led dealer conversations driving faster closures.",
          "Scheme rollout accelerated and de-risked through end-to-end automation.",
          "Improved sell-through and customer satisfaction via Market Basket-led product placement.",
          "Proactive retention of at-risk dealers — protecting revenue before it moves.",
        ],
      },
    ],
  },
  "ev-battery-predictive": {
    slug: "ev-battery-predictive",
    caseStudyId: "ev-battery-predictive",
    videoUrl: "",
    heroEyebrow: "08 · Mobility / IoT",
    heroTitle:
      "Predicting EV battery failures before they happen — with 98%+ accuracy",
    heroSubtitle:
      "Built a multi-class classifier on IoT vitals from a Battery-as-a-Service fleet — predicting failures before they occur with 98%+ accuracy and balanced precision/recall.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "The prize is enormous.",
        body:
          "A leading Battery-as-a-Service operator partnered with us to predict battery failures before they occur — anchored on real-time IoT vitals and pre-determined safe-operation thresholds.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A multi-class classifier trained on engineered IoT features.",
        body:
          "We engineered predictive features from raw IoT data — recharge cycles, threshold breach frequency, intervals between breaches, and breach durations. Every data point was labeled Healthy, Warning, or Breached, creating a supervised dataset capturing the full spectrum of battery behavior. A multi-class classifier was trained to identify at-risk batteries in real time.",
        bullets: [
          "Visualizing breach patterns confirmed the core hypothesis — Warning carries a statistically significant relationship with Breached.",
          "Severe class imbalance was addressed using SMOTE — synthetically enriching the minority class without compromising integrity.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From reactive to preemptive battery maintenance.",
        body:
          "The model delivered conclusive proof that failures are predictable — enabling the operator to shift from reactive servicing to preemptive intervention before batteries fail in the field.",
        bullets: [
          "98%+ overall accuracy — best-in-class for imbalanced datasets.",
          "Precision, Recall, F1 in the 0.78–0.82 range — real-world reliability without false-alarm overload.",
          "Conclusive proof: failures are predictable, enabling a shift from reactive to preemptive maintenance.",
        ],
      },
    ],
  },
};