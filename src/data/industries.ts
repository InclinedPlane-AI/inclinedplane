import retailImg from "@/assets/industry-retail.jpg";
import financeImg from "@/assets/industry-finance.jpg";
import saasImg from "@/assets/industry-saas.jpg";
import healthcareImg from "@/assets/industry-healthcare.jpg";
import manufacturingImg from "@/assets/industry-manufacturing.jpg";
import energyImg from "@/assets/industry-energy.jpg";
import bpoImg from "@/assets/industry-bpo.jpg";
import educationImg from "@/assets/industry-education.jpg";

export interface IndustryData {
  id: string;
  name: string;
  tagline: string;
  image: string;
  icon: string;
  color: string;
  overview: string;
  whatWeDo: string[];
  howWeDoIt: string[];
  useCases: { title: string; description: string }[];
  techStack: string[];
  marketInsight: { stat: string; label: string }[];
  impactMetrics: { value: string; label: string }[];
  references: { title: string; source: string; url: string; insight: string }[];
  nextSteps: { title: string; description: string; icon: string }[];
}

export const industries: IndustryData[] = [
  {
    id: "retail",
    name: "Retail & E-commerce",
    tagline: "Turning shopping data into competitive advantage with real-time demand intelligence.",
    image: retailImg,
    icon: "ShoppingCart",
    color: "25 100% 50%",
    overview:
      "Modern retail generates petabytes of transactional, behavioral, and supply chain data daily. We architect end-to-end data platforms that unify POS, e-commerce, logistics, and customer interaction data into a single source of truth — enabling real-time demand sensing, dynamic pricing, and hyper-personalized customer journeys at scale.",
    whatWeDo: [
      "Build unified customer data platforms (CDPs) merging online and offline touchpoints",
      "Deploy real-time demand forecasting models using gradient-boosted trees and LSTMs",
      "Architect inventory optimization pipelines reducing overstock by 20–35%",
      "Implement dynamic pricing engines powered by reinforcement learning",
      "Create recommendation systems driving 15–25% uplift in average order value",
    ],
    howWeDoIt: [
      "Event-driven architectures on Kafka/Kinesis for real-time POS and clickstream ingestion",
      "Feature stores on Databricks/Snowflake for ML model training and serving",
      "dbt-driven transformation layers ensuring data quality and lineage",
      "MLflow/Kubeflow pipelines for continuous model retraining",
      "Power BI / Tableau dashboards for merchandising and supply chain visibility",
    ],
    useCases: [
      { title: "Demand Forecasting", description: "Predict SKU-level demand across channels with 92%+ accuracy using ensemble ML models and external signals like weather, events, and trends." },
      { title: "Price Optimization", description: "Dynamic pricing algorithms that maximize margin while maintaining competitive positioning, adjusting in real-time to market conditions." },
      { title: "Supply Chain Visibility", description: "End-to-end supply chain digital twin providing real-time tracking, bottleneck prediction, and automated reorder triggers." },
      { title: "Customer 360", description: "Unified customer profiles stitching anonymous browsing, purchase history, loyalty, and support interactions for hyper-personalized marketing." },
    ],
    techStack: ["Snowflake", "Databricks", "Kafka", "dbt", "Airflow", "Power BI", "Python", "Spark"],
    marketInsight: [
      { stat: "$40.2B", label: "Global retail analytics market by 2028" },
      { stat: "73%", label: "Of retailers investing in AI-driven personalization" },
      { stat: "2.5x", label: "ROI from predictive inventory management" },
    ],
    impactMetrics: [
      { value: "35%", label: "Reduction in stockouts" },
      { value: "22%", label: "Increase in conversion rate" },
      { value: "18%", label: "Improvement in gross margin" },
    ],
    references: [
      { title: "The State of AI in Retail", source: "McKinsey & Company", url: "https://www.mckinsey.com/industries/retail/our-insights", insight: "Retailers using AI-driven demand forecasting see 15–30% reductions in lost sales from stockouts while cutting excess inventory costs by up to 20%." },
      { title: "Personalisation at Scale", source: "Harvard Business Review", url: "https://hbr.org/topic/retail", insight: "Companies that excel at personalization generate 40% more revenue from those activities than average players — data infrastructure is the bottleneck, not the algorithms." },
      { title: "Global Retail Analytics Market Report", source: "Grand View Research, 2024", url: "https://www.grandviewresearch.com/industry-analysis/retail-analytics-market", insight: "The retail analytics market is projected to grow at a CAGR of 23.1% through 2028, driven by real-time pricing, omnichannel integration, and AI-powered supply chain optimization." },
    ],
    nextSteps: [
      { title: "Data Maturity Assessment", description: "We audit your current data landscape — sources, quality, gaps — and deliver a prioritized roadmap for analytics readiness.", icon: "BarChart3" },
      { title: "Proof of Concept", description: "Pick one high-impact use case (e.g., demand forecasting). We build a working prototype in 4–6 weeks to demonstrate measurable ROI.", icon: "Target" },
      { title: "Book a Strategy Session", description: "30-minute call with our retail data leads to discuss your specific challenges and how we can accelerate your data journey.", icon: "ArrowUpRight" },
    ],
  },
  {
    id: "financial-services",
    name: "Financial Services",
    tagline: "Real-time data platforms powering risk intelligence, compliance, and alpha generation.",
    image: financeImg,
    icon: "TrendingUp",
    color: "210 80% 50%",
    overview:
      "Financial institutions operate in a world of millisecond decisions, evolving regulations, and massive data volumes. We build battle-tested data infrastructure that enables real-time risk modeling, automated compliance reporting, fraud detection at transaction speed, and portfolio analytics — all while meeting the stringent security and auditability requirements of regulated environments.",
    whatWeDo: [
      "Design real-time risk analytics platforms processing millions of events per second",
      "Build automated regulatory reporting pipelines (Basel III, MiFID II, SOX)",
      "Deploy ML-powered fraud detection reducing false positives by 40–60%",
      "Architect alternative data integration for quantitative investment strategies",
      "Create customer lifetime value models for wealth management optimization",
    ],
    howWeDoIt: [
      "Low-latency streaming architectures on Kafka/Flink for tick-level market data",
      "Data vault modeling for regulatory-compliant historical data management",
      "Graph databases (Neo4j) for entity resolution and AML network analysis",
      "Federated learning for cross-institutional model training without data sharing",
      "SOC 2 compliant cloud infrastructure with encryption at rest and in transit",
    ],
    useCases: [
      { title: "Risk Analytics", description: "Real-time VaR calculations, stress testing, and scenario analysis across multi-asset portfolios using Monte Carlo simulations and GPU-accelerated compute." },
      { title: "Fraud Detection", description: "Sub-100ms transaction scoring combining rule engines, anomaly detection, and graph neural networks to catch fraud while minimizing customer friction." },
      { title: "Regulatory Reporting", description: "Automated extraction, transformation, and submission of regulatory reports with full audit trails and data lineage tracking." },
      { title: "Credit Scoring", description: "Explainable AI models using SHAP values to provide transparent credit decisions, improving approval rates while maintaining risk thresholds." },
    ],
    techStack: ["Snowflake", "Databricks", "Kafka", "Flink", "Neo4j", "Python", "Tableau", "Airflow"],
    marketInsight: [
      { stat: "$164B", label: "Global fintech analytics market by 2027" },
      { stat: "85%", label: "Of banks accelerating AI/ML adoption" },
      { stat: "$5.8B", label: "Annual losses prevented by AI fraud detection" },
    ],
    impactMetrics: [
      { value: "60%", label: "Reduction in false positives" },
      { value: "90%", label: "Automation in regulatory reporting" },
      { value: "sub-100ms", label: "Transaction scoring latency" },
    ],
    references: [
      { title: "AI in Financial Services", source: "Deloitte Insights", url: "https://www2.deloitte.com/insights/us/en/industry/financial-services.html", insight: "Banks deploying AI-driven fraud detection see up to 50% reductions in false positives and $5.8B in annual loss prevention globally." },
      { title: "The Future of Risk Management", source: "World Economic Forum", url: "https://www.weforum.org/reports", insight: "Real-time risk analytics can reduce regulatory reporting effort by 80%, freeing compliance teams to focus on strategic risk mitigation rather than data wrangling." },
      { title: "Machine Learning in Credit Risk", source: "Bank for International Settlements, 2023", url: "https://www.bis.org/publ", insight: "Explainable ML models outperform traditional scorecards by 15–25% in default prediction accuracy while maintaining regulatory transparency requirements." },
    ],
    nextSteps: [
      { title: "Compliance & Data Audit", description: "We assess your current data architecture against regulatory requirements and identify automation opportunities in your reporting workflows.", icon: "BarChart3" },
      { title: "Fraud Detection PoC", description: "Deploy a pilot fraud detection model on a representative dataset — demonstrating false-positive reduction and catch-rate improvement in 6 weeks.", icon: "Target" },
      { title: "Book a Strategy Session", description: "Connect with our financial services data architects to explore how we can strengthen your data infrastructure.", icon: "ArrowUpRight" },
    ],
  },
  {
    id: "b2b-saas",
    name: "B2B SaaS",
    tagline: "Product-led analytics and revenue intelligence for high-growth software companies.",
    image: saasImg,
    icon: "Cloud",
    color: "270 70% 55%",
    overview:
      "SaaS companies are data companies — every click, feature adoption pattern, and support interaction is a signal. We build the analytics infrastructure that transforms raw product telemetry into actionable insights: predicting churn before it happens, identifying expansion opportunities, and creating the usage-based billing systems that modern PLG companies demand.",
    whatWeDo: [
      "Architect product analytics platforms tracking billions of events daily",
      "Build predictive churn models identifying at-risk accounts 60–90 days early",
      "Deploy revenue intelligence pipelines connecting product usage to ARR outcomes",
      "Create usage metering and billing infrastructure for consumption-based pricing",
      "Design customer health scoring systems combining product, support, and financial signals",
    ],
    howWeDoIt: [
      "Event-driven architectures with ClickHouse/Snowflake for sub-second analytics queries",
      "Real-time feature flag integration for experimentation and progressive rollouts",
      "Reverse ETL pipelines pushing insights into CRM, CS, and marketing platforms",
      "dbt semantic layer for self-serve analytics across product and go-to-market teams",
      "LLM-powered support ticket analysis for automated categorization and routing",
    ],
    useCases: [
      { title: "Product Analytics", description: "Funnel analysis, cohort retention, and feature adoption tracking at scale — helping product teams understand what drives activation and engagement." },
      { title: "Churn Prediction", description: "ML models combining product usage decay, support sentiment, and billing patterns to flag at-risk accounts with actionable intervention playbooks." },
      { title: "Revenue Forecasting", description: "Bottom-up revenue models incorporating pipeline velocity, expansion signals, and seasonal patterns for accurate ARR projections." },
      { title: "PLG Analytics", description: "Self-serve onboarding funnels, activation milestones, and viral loop tracking to optimize product-led growth motions." },
    ],
    techStack: ["ClickHouse", "Snowflake", "dbt", "Fivetran", "Airflow", "Python", "Looker", "Segment"],
    marketInsight: [
      { stat: "$320B", label: "Global SaaS market by 2026" },
      { stat: "68%", label: "Of SaaS companies adopting PLG motions" },
      { stat: "5–7x", label: "Cost of acquiring vs. retaining a customer" },
    ],
    impactMetrics: [
      { value: "45%", label: "Reduction in churn rate" },
      { value: "30%", label: "Increase in expansion revenue" },
      { value: "10x", label: "Faster query performance" },
    ],
    references: [
      { title: "Product-Led Growth Benchmarks", source: "OpenView Partners", url: "https://openviewpartners.com/product-benchmarks", insight: "PLG companies with mature data infrastructure grow 2.4x faster than sales-led peers — product analytics is the foundation of this advantage." },
      { title: "The Net Revenue Retention Playbook", source: "Bessemer Venture Partners", url: "https://www.bvp.com/atlas/state-of-the-cloud", insight: "Top-quartile SaaS companies achieve 130%+ NRR by identifying expansion signals in product usage data — something impossible without proper analytics infrastructure." },
      { title: "Churn Prediction in SaaS", source: "Journal of Machine Learning Research", url: "https://jmlr.org", insight: "Ensemble ML models that combine behavioral, transactional, and sentiment features can predict churn 60–90 days in advance with 85%+ accuracy." },
    ],
    nextSteps: [
      { title: "Analytics Maturity Audit", description: "We evaluate your event tracking, data warehouse, and analytics tooling to identify gaps between where you are and where PLG leaders operate.", icon: "BarChart3" },
      { title: "Churn Model Prototype", description: "Using your existing data, we build a churn prediction model in 4 weeks — complete with intervention triggers and playbook integration.", icon: "Target" },
      { title: "Book a Strategy Session", description: "Talk to our SaaS analytics experts about building a data-driven product and revenue engine.", icon: "ArrowUpRight" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    tagline: "HIPAA-compliant data platforms transforming patient outcomes and operational efficiency.",
    image: healthcareImg,
    icon: "Heart",
    color: "160 70% 45%",
    overview:
      "Healthcare generates some of the most complex and sensitive data in any industry — EHRs, genomics, medical imaging, claims, and IoT vitals. We build HIPAA-compliant data infrastructure that breaks down clinical silos, enabling predictive care models, operational optimization, and the data foundations for precision medicine — all while maintaining the highest standards of patient privacy and regulatory compliance.",
    whatWeDo: [
      "Architect HIPAA-compliant cloud data platforms on AWS/Azure",
      "Build clinical data lakes unifying EHR, lab, imaging, and claims data via FHIR/HL7",
      "Deploy patient outcome prediction models for readmission and deterioration risk",
      "Create operational dashboards for bed management, staffing, and resource allocation",
      "Implement NLP pipelines extracting structured insights from clinical notes",
    ],
    howWeDoIt: [
      "FHIR-native data ingestion with real-time HL7 message parsing",
      "De-identification pipelines ensuring PHI protection across analytics layers",
      "Federated learning enabling multi-site model training without centralizing patient data",
      "Clinical NLP (Med-PaLM, BioBERT) for unstructured medical text extraction",
      "HITRUST/SOC 2 certified infrastructure with role-based access and audit logging",
    ],
    useCases: [
      { title: "Clinical Analytics", description: "Population health dashboards providing real-time visibility into disease prevalence, treatment efficacy, and care gaps across patient populations." },
      { title: "Patient Flow Optimization", description: "Predictive models for ED wait times, discharge planning, and bed turnover — reducing average length of stay by 15–20%." },
      { title: "Readmission Prevention", description: "Risk stratification models identifying high-risk patients at discharge, triggering automated care coordination and follow-up protocols." },
      { title: "Revenue Cycle Optimization", description: "ML-driven claims analysis reducing denials, optimizing coding accuracy, and accelerating reimbursement cycles." },
    ],
    techStack: ["Azure", "Databricks", "FHIR", "Snowflake", "dbt", "Power BI", "Python", "Airflow"],
    marketInsight: [
      { stat: "$75B", label: "Global healthcare analytics market by 2028" },
      { stat: "97%", label: "Of hospitals investing in data interoperability" },
      { stat: "$300B", label: "Annual waste reducible through analytics in US healthcare" },
    ],
    impactMetrics: [
      { value: "20%", label: "Reduction in readmission rates" },
      { value: "35%", label: "Improvement in bed utilization" },
      { value: "50%", label: "Faster clinical reporting" },
    ],
    references: [
      { title: "AI and the Future of Health", source: "World Health Organization, 2024", url: "https://www.who.int/publications", insight: "AI-assisted diagnostics can match or exceed specialist performance in radiology and pathology — but require robust data infrastructure and governance to deploy safely at scale." },
      { title: "The $300 Billion Opportunity", source: "McKinsey Center for US Health System Reform", url: "https://www.mckinsey.com/industries/healthcare", insight: "Up to $300 billion in annual US healthcare spending is recoverable through better data integration, predictive analytics, and operational optimization." },
      { title: "Predictive Analytics in Hospital Readmissions", source: "JAMA Network, 2023", url: "https://jamanetwork.com", insight: "ML-based readmission models using EHR data outperform traditional LACE scores by 28%, enabling more targeted and cost-effective intervention programs." },
    ],
    nextSteps: [
      { title: "HIPAA Readiness Assessment", description: "We evaluate your data architecture against HIPAA, HITRUST, and interoperability requirements — identifying compliance gaps and quick wins.", icon: "BarChart3" },
      { title: "Clinical Analytics PoC", description: "Build a readmission risk model or patient flow dashboard on your data in 6 weeks — with full compliance documentation.", icon: "Target" },
      { title: "Book a Strategy Session", description: "Discuss your healthcare data challenges with our team experienced in FHIR, clinical ML, and regulatory compliance.", icon: "ArrowUpRight" },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "IoT-scale data platforms driving predictive maintenance and production intelligence.",
    image: manufacturingImg,
    icon: "Factory",
    color: "45 80% 50%",
    overview:
      "Industry 4.0 is fundamentally a data revolution — sensors, PLCs, MES, and ERP systems generate massive volumes of time-series data every second. We build industrial data platforms that transform this raw telemetry into predictive maintenance capabilities, quality control automation, and production optimization — creating the digital backbone for smart manufacturing.",
    whatWeDo: [
      "Architect IoT data platforms ingesting millions of sensor readings per second",
      "Build predictive maintenance models reducing unplanned downtime by 30–50%",
      "Deploy computer vision systems for automated quality inspection",
      "Create digital twin platforms for production simulation and optimization",
      "Design OEE (Overall Equipment Effectiveness) analytics dashboards",
    ],
    howWeDoIt: [
      "Edge computing with Azure IoT Hub / AWS IoT Greengrass for near-sensor processing",
      "Time-series databases (InfluxDB, TimescaleDB) for high-frequency sensor data",
      "Anomaly detection using autoencoders and isolation forests on vibration, temperature, and pressure data",
      "Computer vision pipelines (YOLO, EfficientNet) for defect detection at production speed",
      "Apache Spark Structured Streaming for real-time production KPI computation",
    ],
    useCases: [
      { title: "Predictive Maintenance", description: "ML models analyzing vibration, temperature, and acoustic signatures to predict equipment failures 2–4 weeks before occurrence." },
      { title: "Quality Control", description: "Computer vision systems inspecting 100% of production output at line speed — detecting defects invisible to the human eye." },
      { title: "Production Optimization", description: "Digital twins simulating production scenarios to identify optimal machine parameters, batch sequences, and changeover schedules." },
      { title: "Energy Management", description: "Real-time energy monitoring and optimization across production lines — reducing consumption by 15–25% through load balancing and peak shaving." },
    ],
    techStack: ["Azure IoT", "Databricks", "InfluxDB", "Spark", "Python", "Power BI", "TensorFlow", "Airflow"],
    marketInsight: [
      { stat: "$15.4B", label: "Global predictive maintenance market by 2027" },
      { stat: "91%", label: "Of manufacturers investing in Industry 4.0" },
      { stat: "$1.5T", label: "Value unlock from industrial IoT by 2030" },
    ],
    impactMetrics: [
      { value: "45%", label: "Reduction in unplanned downtime" },
      { value: "30%", label: "Improvement in OEE" },
      { value: "99.2%", label: "Defect detection accuracy" },
    ],
    references: [
      { title: "The Rise of the Digital Twin", source: "Gartner, 2024", url: "https://www.gartner.com/en/articles/digital-twin-technology", insight: "By 2027, over 70% of manufacturers will use digital twins for process optimization — companies with mature implementations report 20–30% improvements in production efficiency." },
      { title: "Predictive Maintenance: From Promise to Practice", source: "McKinsey Global Institute", url: "https://www.mckinsey.com/capabilities/operations/our-insights", insight: "Predictive maintenance reduces machine downtime by 30–50% and extends equipment life by 20–40% — representing billions in savings across global manufacturing." },
      { title: "Industry 4.0 and the Smart Factory", source: "Deloitte University Press", url: "https://www2.deloitte.com/insights/us/en/focus/industry-4-0.html", insight: "Smart factories could add $1.5–2.2 trillion in value to the global economy by 2030 — but require integrated data platforms as a foundation." },
    ],
    nextSteps: [
      { title: "IoT Data Assessment", description: "We map your sensor landscape, data flows, and existing infrastructure to design a scalable industrial data platform architecture.", icon: "BarChart3" },
      { title: "Predictive Maintenance Pilot", description: "Select one critical asset class. We deploy a predictive model in 6–8 weeks and measure downtime reduction.", icon: "Target" },
      { title: "Book a Strategy Session", description: "Discuss Industry 4.0 data strategy with our manufacturing analytics team.", icon: "ArrowUpRight" },
    ],
  },
  {
    id: "energy",
    name: "Energy & Utilities",
    tagline: "Grid intelligence and sustainability analytics for the clean energy transition.",
    image: energyImg,
    icon: "Zap",
    color: "140 60% 45%",
    overview:
      "The energy sector is undergoing a historic transformation — from centralized fossil fuel generation to distributed renewable sources, smart grids, and electrified transportation. We build the data platforms that make this transition possible: real-time grid analytics, renewable generation forecasting, carbon accounting, and the predictive models that keep critical infrastructure running reliably.",
    whatWeDo: [
      "Architect smart grid data platforms processing millions of smart meter readings",
      "Build renewable generation forecasting models (solar, wind) with 95%+ accuracy",
      "Deploy predictive maintenance for transmission and distribution assets",
      "Create carbon accounting and ESG reporting data pipelines",
      "Design energy trading and procurement optimization systems",
    ],
    howWeDoIt: [
      "Time-series databases optimized for high-frequency SCADA and AMI data",
      "Weather-coupled ML models (XGBoost, Transformers) for solar/wind forecasting",
      "Geospatial analytics for grid topology optimization and outage management",
      "Digital twin platforms for substation and wind farm simulation",
      "Automated ESG data collection and TCFD/CSRD compliant reporting",
    ],
    useCases: [
      { title: "Grid Analytics", description: "Real-time monitoring and anomaly detection across transmission and distribution networks — predicting outages before they cascade." },
      { title: "Renewable Forecasting", description: "Hyper-local solar and wind generation predictions combining satellite imagery, numerical weather prediction, and on-site sensor data." },
      { title: "Carbon Accounting", description: "Automated Scope 1, 2, and 3 emissions tracking with audit-ready reporting aligned to GHG Protocol, TCFD, and CSRD frameworks." },
      { title: "Demand Response", description: "ML-driven load forecasting and dynamic pricing enabling demand-side management and peak load reduction." },
    ],
    techStack: ["AWS", "Snowflake", "TimescaleDB", "Spark", "dbt", "Python", "Tableau", "Airflow"],
    marketInsight: [
      { stat: "$65B", label: "Global smart grid analytics market by 2028" },
      { stat: "80%", label: "Of utilities accelerating digital transformation" },
      { stat: "30%", label: "Of global electricity from renewables by 2026" },
    ],
    impactMetrics: [
      { value: "25%", label: "Reduction in grid outages" },
      { value: "95%", label: "Renewable forecast accuracy" },
      { value: "40%", label: "Faster ESG reporting cycles" },
    ],
    references: [
      { title: "World Energy Outlook 2024", source: "International Energy Agency (IEA)", url: "https://www.iea.org/reports/world-energy-outlook-2024", insight: "The global energy transition will require $4.5 trillion in annual clean energy investment by 2030 — data-driven grid management is critical to integrating intermittent renewables at scale." },
      { title: "Digitalization & Energy", source: "IEA Digital Demand-Driven Electricity Networks", url: "https://www.iea.org/reports/digitalisation-and-energy", insight: "Digitalization could reduce global CO₂ emissions by 1.4 gigatonnes per year through smarter grid management, predictive maintenance, and demand response optimization." },
      { title: "The Role of AI in Decarbonization", source: "Boston Consulting Group, 2024", url: "https://www.bcg.com/publications/2024/ai-and-climate-change", insight: "AI-powered energy management systems reduce energy consumption by 10–20% in commercial and industrial settings — representing massive emissions reduction potential." },
    ],
    nextSteps: [
      { title: "Grid Data Assessment", description: "We audit your SCADA, AMI, and weather data infrastructure and design a roadmap for real-time grid intelligence.", icon: "BarChart3" },
      { title: "Forecasting Model Pilot", description: "Deploy a solar or wind forecasting model on your generation assets — demonstrating accuracy improvement over current methods in 6 weeks.", icon: "Target" },
      { title: "Book a Strategy Session", description: "Connect with our energy analytics team to discuss grid modernization and sustainability data strategy.", icon: "ArrowUpRight" },
    ],
  },
  {
    id: "bpo",
    name: "BPO",
    tagline: "Intelligent automation and workforce analytics for next-gen business process outsourcing.",
    image: bpoImg,
    icon: "Headphones",
    color: "280 60% 55%",
    overview:
      "The BPO industry is being reshaped by AI-driven automation, intelligent document processing, and workforce analytics. We help BPO companies transition from labor-arbitrage models to technology-led service delivery — building the data infrastructure for process mining, agent performance optimization, and the AI co-pilots that augment human agents rather than replace them.",
    whatWeDo: [
      "Build intelligent document processing (IDP) pipelines handling millions of documents daily",
      "Deploy conversational AI and agent co-pilot systems reducing handle times by 25–40%",
      "Architect process mining platforms identifying automation opportunities across workflows",
      "Create workforce management analytics for optimal scheduling and capacity planning",
      "Design client reporting dashboards with real-time SLA monitoring and predictive alerts",
    ],
    howWeDoIt: [
      "OCR + LLM pipelines (GPT-4, Claude) for intelligent document extraction and classification",
      "RAG-based knowledge systems for real-time agent assistance during live interactions",
      "Process mining on event logs using Celonis/custom algorithms to discover process variants",
      "Workforce optimization models using constraint programming and time-series forecasting",
      "Real-time streaming dashboards for SLA adherence, queue management, and escalation triggers",
    ],
    useCases: [
      { title: "Intelligent Document Processing", description: "AI pipelines extracting data from invoices, contracts, and forms with 98%+ accuracy — reducing manual data entry by 80%." },
      { title: "Agent Co-Pilots", description: "LLM-powered assistants providing real-time response suggestions, knowledge retrieval, and compliance guidance during customer interactions." },
      { title: "Process Mining", description: "Automated discovery and analysis of actual process flows — identifying bottlenecks, deviations, and automation candidates worth millions in savings." },
      { title: "Quality Assurance", description: "Automated call and chat scoring using NLP sentiment analysis and compliance checking — scaling QA from 2% to 100% coverage." },
    ],
    techStack: ["Azure", "OpenAI", "Claude", "Databricks", "Power BI", "Python", "Airflow", "Elasticsearch"],
    marketInsight: [
      { stat: "$280B", label: "Global BPO market by 2027" },
      { stat: "65%", label: "Of BPO firms investing in AI augmentation" },
      { stat: "40%", label: "Process cost reduction achievable via intelligent automation" },
    ],
    impactMetrics: [
      { value: "35%", label: "Reduction in average handle time" },
      { value: "80%", label: "Automation of document processing" },
      { value: "100%", label: "QA coverage (vs. 2% manual)" },
    ],
    references: [
      { title: "The Future of Business Process Outsourcing", source: "Everest Group, 2024", url: "https://www.everestgrp.com/bpo", insight: "BPO firms investing in AI augmentation see 40% higher margins than traditional labor-arbitrage players — the shift from cost center to value creator is driven by analytics." },
      { title: "Intelligent Automation in Services", source: "Gartner Predicts 2024", url: "https://www.gartner.com/en/topics/intelligent-automation", insight: "By 2027, 50% of all customer service interactions will be handled or augmented by AI — but human agents supported by AI co-pilots outperform fully automated systems on complex issues." },
      { title: "The LLM Revolution in Document Processing", source: "Forrester Research", url: "https://www.forrester.com/report/the-state-of-intelligent-document-processing", insight: "LLM-powered IDP reduces document processing costs by 60–80% while improving accuracy to 98%+ — transforming high-volume, low-margin operations into competitive advantages." },
    ],
    nextSteps: [
      { title: "Process Automation Audit", description: "We analyze your workflows, document volumes, and agent interactions to identify the highest-ROI automation opportunities.", icon: "BarChart3" },
      { title: "AI Co-Pilot Prototype", description: "Deploy an LLM-powered agent assistant on one process line in 4 weeks — measuring handle time reduction and quality improvement.", icon: "Target" },
      { title: "Book a Strategy Session", description: "Discuss intelligent automation strategy with our BPO transformation specialists.", icon: "ArrowUpRight" },
    ],
  },
  {
    id: "education",
    name: "Education",
    tagline: "Learning analytics and institutional intelligence for the future of education.",
    image: educationImg,
    icon: "GraduationCap",
    color: "200 70% 50%",
    overview:
      "Education institutions are sitting on goldmines of underutilized data — from LMS engagement patterns and assessment results to enrollment funnels and alumni outcomes. We build the analytics infrastructure that transforms this data into actionable intelligence: predicting student success, personalizing learning pathways, optimizing institutional operations, and demonstrating educational ROI to stakeholders.",
    whatWeDo: [
      "Architect learning analytics platforms integrating LMS, SIS, and assessment data",
      "Build early warning systems identifying at-risk students 4–6 weeks before failure",
      "Deploy adaptive learning recommendation engines personalizing content delivery",
      "Create enrollment forecasting and yield optimization models for admissions",
      "Design institutional effectiveness dashboards for accreditation and board reporting",
    ],
    howWeDoIt: [
      "LTI-compliant data integration with Canvas, Blackboard, Moodle, and custom LMS platforms",
      "Learning graph models mapping prerequisite relationships and optimal learning sequences",
      "NLP analysis of discussion forums, essays, and feedback for engagement and sentiment signals",
      "Predictive models combining academic, behavioral, and demographic features for retention risk",
      "Self-serve analytics portals for faculty, advisors, and institutional researchers",
    ],
    useCases: [
      { title: "Student Success Analytics", description: "Early warning systems combining LMS engagement, grade trajectories, and behavioral signals to flag at-risk students for proactive intervention." },
      { title: "Adaptive Learning", description: "AI-driven content recommendations adjusting difficulty, modality, and pacing based on individual learning patterns and mastery levels." },
      { title: "Enrollment Intelligence", description: "Predictive models for yield optimization — identifying which admitted students are most likely to enroll and which need additional engagement." },
      { title: "Curriculum Analytics", description: "Course-level and program-level analytics identifying which pedagogical approaches, content formats, and assessment strategies drive the best outcomes." },
    ],
    techStack: ["Snowflake", "dbt", "Python", "Power BI", "Airflow", "LTI", "Canvas API", "Tableau"],
    marketInsight: [
      { stat: "$38B", label: "Global EdTech analytics market by 2028" },
      { stat: "78%", label: "Of institutions investing in learning analytics" },
      { stat: "25%", label: "Improvement in retention achievable via early warning systems" },
    ],
    impactMetrics: [
      { value: "30%", label: "Reduction in dropout rates" },
      { value: "15%", label: "Improvement in course completion" },
      { value: "20%", label: "Increase in enrollment yield" },
    ],
    references: [
      { title: "Learning Analytics and the Future of Higher Education", source: "EDUCAUSE Review, 2024", url: "https://er.educause.edu/articles/learning-analytics", insight: "Institutions with mature learning analytics see 15–25% improvement in student retention — the key is integrating data across LMS, SIS, and student support systems." },
      { title: "The State of AI in Education", source: "UNESCO, 2024", url: "https://www.unesco.org/en/digital-education", insight: "Adaptive learning systems powered by AI can improve learning outcomes by 20–30% — but require robust data infrastructure and ethical governance frameworks." },
      { title: "Enrollment Management in Crisis", source: "National Student Clearinghouse Research Center", url: "https://nscresearchcenter.org", insight: "With undergraduate enrollment declining by 15% since 2010, data-driven enrollment optimization is no longer optional — predictive yield models can improve enrollment hit rates by 20–35%." },
    ],
    nextSteps: [
      { title: "Data Landscape Assessment", description: "We map your LMS, SIS, and assessment data sources to identify integration opportunities and build a learning analytics roadmap.", icon: "BarChart3" },
      { title: "Early Warning System Pilot", description: "Deploy a student success prediction model for one program in 6 weeks — demonstrating intervention impact on retention.", icon: "Target" },
      { title: "Book a Strategy Session", description: "Connect with our education analytics team to discuss institutional intelligence and student success initiatives.", icon: "ArrowUpRight" },
    ],
  },
];
