import { Check } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedCounter } from "./AnimatedCounter";
import { useState } from "react";
import { DemoModal } from "./DemoModal";
import { api } from "./api";
import { toast } from "sonner";

export function PricingSection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const plans = [
    {
      name: "Basic",
      price: 1499000,
      priceDisplay: "1,499,000",
      description: "Perfect for small operations",
      features: ["1-3 machines", "Real-time monitoring", "Email alerts", "Basic analytics", "Community support"],
      highlighted: false,
    },
    {
      name: "Standard",
      price: 1290000,
      priceDisplay: "3,499,000",
      description: "Most popular for growing businesses",
      features: ["4-10 machines", "Real-time monitoring", "WhatsApp + Email alerts", "Advanced AI analytics", "Predictive maintenance", "Priority support", "Custom integrations"],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: 0,
      priceDisplay: "Custom",
      description: "For large-scale operations",
      features: ["Unlimited machines", "Real-time monitoring", "Multi-channel alerts", "Advanced AI + Custom models", "Dedicated account manager", "24/7 phone support", "On-premise deployment", "SLA guarantees"],
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-20">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-16">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tighter text-black uppercase"
            style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
          >
            Choose Your Plan
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-500 max-w-sm leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Flexible pricing to match your operation size. All plans include a 30-day free trial.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-gray-200">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{
                y: -6,
                boxShadow: plan.highlighted
                  ? "0 20px 40px rgba(249,115,22,0.15)"
                  : "0 20px 40px rgba(0,0,0,0.08)",
              }}
              className={`p-8 lg:p-10 relative ${i < 2 ? "md:border-r border-gray-200" : ""} ${
                plan.highlighted ? "bg-black text-white" : "bg-white"
              } transition-colors`}
            >
              {plan.badge && (
                <span
                  className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] uppercase tracking-widest px-3 py-1"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {plan.badge}
                </span>
              )}

              <p
                className="text-xs uppercase tracking-widest mb-4 text-gray-400"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                {plan.description}
              </p>

              <h3
                className="text-2xl tracking-tight mb-2"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
              >
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-8">
                {plan.priceDisplay !== "Custom" ? (
                  <>
                    <span className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>Rp</span>
                    <AnimatedCounter
                      target={plan.price}
                      className="text-5xl tracking-tighter"
                      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                    />
                    <span className={`text-sm ${plan.highlighted ? "text-gray-400" : "text-gray-500"}`}>/mo</span>
                  </>
                ) : (
                  <span
                    className="text-5xl tracking-tighter"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                  >
                    Custom
                  </span>
                )}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-orange-500" : "text-black"}`} />
                    <span
                      className={`text-sm ${plan.highlighted ? "text-gray-300" : "text-gray-600"}`}
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: plan.highlighted ? "0 0 20px rgba(249,115,22,0.4)" : "0 0 20px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.97 }}
                className={`w-full py-3 text-sm uppercase tracking-widest transition-colors cursor-pointer ${
                  plan.highlighted
                    ? "bg-orange-500 text-white hover:bg-orange-600"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
                style={{ fontFamily: "Inter, sans-serif" }}
                onClick={() => {
                  api.trackPricingClick(plan.name).catch((err) => console.log("Pricing track error:", err));
                  if (plan.priceDisplay === "Custom") {
                    setDemoOpen(true);
                  } else {
                    toast.success(`Starting free trial for ${plan.name} plan!`, { description: "Redirecting to signup..." });
                    setDemoOpen(true);
                  }
                }}
              >
                {plan.priceDisplay === "Custom" ? "Contact Sales" : "Start Free Trial"}
              </motion.button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 flex items-center gap-4 justify-center"
        >
          <div className="w-10 h-10 bg-black flex items-center justify-center">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-black" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
              30-Day Money-Back Guarantee
            </p>
            <p className="text-xs text-gray-400" style={{ fontFamily: "Inter, sans-serif" }}>
              Try risk-free. Cancel anytime.
            </p>
          </div>
        </motion.div>
      </div>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
