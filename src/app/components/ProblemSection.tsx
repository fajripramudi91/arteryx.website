import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AnimatedCounter } from "./AnimatedCounter";
import { useInView } from "./useInView";
import { motion } from "motion/react";

function AnimatedBar({ value, color, delay }: { value: number; color: string; delay: number }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className="h-1 bg-gray-200 w-full mb-2 overflow-hidden">
      <motion.div
        className={`h-full ${color}`}
        initial={{ width: 0 }}
        animate={inView ? { width: `${value}%` } : { width: 0 }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  );
}

export function ProblemSection() {
  const stats = [
    { num: 500, suffix: "+", label: "Machines Monitored" },
    { num: 150, suffix: "", label: "Enterprise Clients" },
    { num: 99, suffix: ".8%", label: "Prediction Accuracy" },
    { num: 24, suffix: "/7", label: "Real-time Monitoring" },
  ];

  const analysis = [
    { value: 20, direction: "down" as const, label: "Unplanned downtime reduction", color: "bg-black", barPct: 80 },
    { value: 50, direction: "up" as const, label: "Maintenance cost savings", color: "bg-orange-500", barPct: 50 },
    { value: 40, direction: "up" as const, label: "Machine lifespan increase", color: "bg-gray-700", barPct: 60 },
    { value: 20, direction: "down" as const, label: "Emergency repair frequency", color: "bg-gray-400", barPct: 80 },
  ];

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid lg:grid-cols-2 border-b border-gray-200">
          {/* Left: About */}
          <div className="p-8 lg:p-16 border-r border-gray-200">
            <motion.h2
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.95] tracking-tighter text-black uppercase"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              About Us
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-gray-500 text-sm leading-relaxed max-w-md"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Arteryx is an AI-powered predictive maintenance platform designed for industrial operations.
              We help manufacturers move from reactive to proactive maintenance, reducing downtime costs
              and extending machine lifespan through intelligent monitoring.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-4 text-gray-400 text-xs leading-relaxed max-w-md"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Our platform integrates IoT sensors, machine learning algorithms, and real-time alerting
              to deliver actionable insights directly to your team via WhatsApp, email, or SMS.
            </motion.p>

            {/* Animated stat counters */}
            <div className="mt-10 grid grid-cols-2 lg:flex gap-6">
              {stats.map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ y: -4, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
                  className="text-right p-3 transition-colors cursor-default"
                >
                  <AnimatedCounter
                    target={s.num}
                    suffix={s.suffix}
                    className="text-3xl tracking-tight text-black"
                    style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                  />
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1" style={{ fontFamily: "Inter, sans-serif" }}>{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Analysis with animated bars */}
          <div className="p-8 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h3 className="text-2xl tracking-tight text-black" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}>
                Downtime Cost Analysis
              </h3>
              <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                Industrial maintenance data insights
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
              {analysis.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group"
                >
                  <div className="flex items-end gap-1 mb-2">
                    <AnimatedCounter
                      target={item.value}
                      suffix="%"
                      className="text-3xl tracking-tight text-black"
                      style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                    />
                    <span className="text-sm text-gray-500 mb-1">{item.direction === "up" ? "↑" : "↓"}</span>
                  </div>
                  <AnimatedBar value={item.barPct} color={item.color} delay={i * 0.15} />
                  <p className="text-[10px] text-gray-400 leading-relaxed group-hover:text-gray-600 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1759159091728-e2c87b9d9315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwbWFjaGluZSUyMGluZHVzdHJpYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc1NzM5NTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Factory equipment"
                className="w-full h-48 object-cover grayscale"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}