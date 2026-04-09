import { Database, Zap, Bell } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function HowItWorks() {
  const steps = [
    { number: "01", icon: Database, title: "Collect Machine Data", description: "IoT sensors continuously gather temperature, vibration, pressure, and performance data from your machines." },
    { number: "02", icon: Zap, title: "Analyze with AI", description: "Machine learning models process data in real-time to identify patterns and predict potential failures." },
    { number: "03", icon: Bell, title: "Send Alert via WhatsApp", description: "Receive instant notifications on WhatsApp when anomalies are detected, with actionable insights." },
  ];

  return (
    <section id="how-it-works" className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 border-b border-gray-200">
          {/* Left */}
          <div className="relative border-r border-gray-200 overflow-hidden bg-gray-50 p-8 lg:p-16">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] text-gray-400 uppercase tracking-widest mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              System Architecture
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl tracking-tight text-black mb-2"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
            >
              How the Platform Works
            </motion.h3>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1601192711538-a86a212cae12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2Vuc29yJTIwSW9UJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzU3Mzk1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="IoT Sensor technology"
                className="w-full h-64 object-cover mt-6 grayscale"
              />
            </motion.div>

            <div className="mt-6 flex gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-orange-500 text-white px-4 py-3 cursor-default"
              >
                <p className="text-xs uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Monitoring</p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-black text-white px-4 py-3 cursor-default"
              >
                <p className="text-xs uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>AI Detection</p>
              </motion.div>
            </div>
          </div>

          {/* Right: Steps with staggered reveal */}
          <div className="p-8 lg:p-16">
            <motion.h2
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tighter text-black uppercase mb-12"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              Three Steps to
              <br />
              Zero Downtime
            </motion.h2>

            <div className="space-y-10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0">
                      <span
                        className="text-4xl text-gray-200 group-hover:text-orange-500 transition-colors"
                        style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                      >
                        {step.number}
                      </span>
                    </div>
                    <div className="border-l border-gray-200 pl-6 group-hover:border-orange-500 transition-colors">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 text-black group-hover:text-orange-500 transition-colors" strokeWidth={1.5} />
                        <h3
                          className="text-lg tracking-tight text-black"
                          style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
                        >
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
