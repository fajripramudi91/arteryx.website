import { Activity, Brain, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useInView } from "./useInView";

function PulseIcon({ children, delay }: { children: React.ReactNode; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function SolutionSection() {
  const features = [
    {
      icon: Activity,
      title: "Real-Time Monitoring",
      description: "Track machine health, vibration, temperature, and performance metrics 24/7 with live IoT data streams.",
      tag: "Monitoring",
      animation: "pulse" as const,
    },
    {
      icon: Brain,
      title: "AI Anomaly Detection",
      description: "Advanced machine learning algorithms identify potential failures days before they happen.",
      tag: "AI-Powered",
      animation: "glow" as const,
    },
    {
      icon: MessageSquare,
      title: "WhatsApp Alert System",
      description: "Get instant alerts via WhatsApp when anomalies are detected — no separate app required.",
      tag: "Alerts",
      animation: "pop" as const,
    },
  ];

  return (
    <section id="features" className="bg-white border-t border-gray-200">
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
            The Solution
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm text-gray-500 max-w-sm leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Prevent costly downtime with AI-powered predictions and instant multi-channel alerts for your entire operation.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-gray-200">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                whileHover={{ backgroundColor: "rgba(249,115,22,0.03)" }}
                className={`p-8 lg:p-12 ${i < 2 ? "md:border-r border-gray-200" : ""} group cursor-default transition-colors`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className="bg-orange-500 text-white text-[10px] uppercase tracking-widest px-3 py-1"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    {feature.tag}
                  </span>
                </div>

                <PulseIcon delay={i * 0.2 + 0.3}>
                  <motion.div
                    animate={
                      feature.animation === "pulse"
                        ? { scale: [1, 1.1, 1] }
                        : feature.animation === "glow"
                        ? { filter: ["drop-shadow(0 0 0px rgba(249,115,22,0))", "drop-shadow(0 0 8px rgba(249,115,22,0.5))", "drop-shadow(0 0 0px rgba(249,115,22,0))"] }
                        : {}
                    }
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Icon className="w-8 h-8 text-black group-hover:text-orange-500 transition-colors" strokeWidth={1.5} />
                  </motion.div>
                </PulseIcon>

                <h3
                  className="text-xl tracking-tight text-black mb-3 mt-6"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
                >
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Trusted by */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
            Trusted by leading manufacturers
          </p>
          <div className="flex flex-wrap items-center gap-12">
            {["ACME Corp", "TechIndustry", "GlobalMFG", "AutoPlant", "SteelWorks"].map((name) => (
              <span
                key={name}
                className="text-xl text-gray-300 tracking-tight hover:text-gray-500 transition-colors"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}