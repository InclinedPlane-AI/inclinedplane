import PageLayout from "@/components/PageLayout";
import { motion } from "framer-motion";
import { useState } from "react";

const industries = [
  { name: "Retail & CPG", desc: "Demand forecasting, inventory optimization, and supply chain intelligence for modern retail.", useCases: ["Demand Forecasting", "Price Optimization", "Supply Chain Visibility", "Customer Segmentation"] },
  { name: "Financial Services", desc: "Real-time data platforms, risk modeling, and regulatory compliance at scale.", useCases: ["Risk Analytics", "Fraud Detection", "Regulatory Reporting", "Portfolio Optimization"] },
  { name: "B2B SaaS", desc: "Product analytics, customer health scoring, and revenue intelligence pipelines.", useCases: ["Product Analytics", "Churn Prediction", "Revenue Forecasting", "Usage Metering"] },
  { name: "Healthcare", desc: "Clinical data pipelines, patient outcome modeling, and operational efficiency systems.", useCases: ["Clinical Analytics", "Patient Flow Optimization", "Resource Planning", "Outcomes Modeling"] },
  { name: "Manufacturing", desc: "IoT data platforms, predictive maintenance, and production optimization systems.", useCases: ["Predictive Maintenance", "Quality Control", "Production Optimization", "Supply Chain Analytics"] },
];

const Industries = () => {
  const [active, setActive] = useState(0);

  return (
    <PageLayout>
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <p className="font-mono text-xs text-primary tracking-widest uppercase mb-4">Industries</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Built for <span className="text-gradient-orange">Your Domain.</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-[300px_1fr] gap-8">
            {/* Switcher */}
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {industries.map((ind, i) => (
                <button
                  key={ind.name}
                  onClick={() => setActive(i)}
                  data-cursor-hover
                  className={`text-left px-4 py-3 rounded-lg text-sm transition-all whitespace-nowrap ${
                    i === active
                      ? "glass-panel-strong text-foreground glow-orange"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {ind.name}
                </button>
              ))}
            </div>

            {/* Content */}
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="glass-panel rounded-xl p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-4">{industries[active].name}</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">{industries[active].desc}</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {industries[active].useCases.map((uc) => (
                  <div key={uc} className="surface-2 rounded-lg px-4 py-3 text-sm text-secondary-foreground">
                    {uc}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Industries;
