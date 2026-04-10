import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { AnimatedCounter } from "./AnimatedCounter";
import { useState } from "react";
import { DemoModal } from "./DemoModal";

export function CTASection() {
  const [demoOpen, setDemoOpen] = useState(false);
  const stats = [
    { num: 3, suffix: "", label: "Pilot Partners" },
    { num: 45, suffix: "%", label: "Downtime Reduced" },
    { num: 10, suffix: "x", label: "Faster Detection" },
    { num: 30, suffix: "", label: "Days Free Trial" },
  ];

  return (
    <section className="relative bg-black text-white border-t border-gray-800 overflow-hidden">
      {/* Subtle animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 50%, rgba(249,115,22,0.3) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.3) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-[1440px] mx-auto px-8 lg:px-16 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-[clamp(2.5rem,5vw,5rem)] leading-[0.9] tracking-tighter uppercase"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              Start Preventing
              <br />
              Downtime
              <br />
              <span className="text-orange-500">Today</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-gray-400 max-w-md text-sm leading-relaxed"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We're building the future of industrial maintenance. Be among the first manufacturers to experience AI-powered predictive maintenance — join our early access program today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-4 mt-10"
            >
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(249,115,22,0.5)" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 text-sm uppercase tracking-widest cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
                onClick={(e) => { e.preventDefault(); setDemoOpen(true); }}
              >
                Request Demo
                <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05, borderColor: "#fff" }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 border border-gray-700 text-white px-8 py-3 text-sm uppercase tracking-widest cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif", borderColor: "#374151" }}
                onClick={(e) => { e.preventDefault(); setDemoOpen(true); }}
              >
                Talk to Sales
              </motion.a>
            </motion.div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ borderColor: "#f97316" }}
                className="border-l border-gray-800 pl-6 transition-colors"
                style={{ borderColor: "#1f2937" }}
              >
                <AnimatedCounter
                  target={s.num}
                  prefix={s.prefix || ""}
                  suffix={s.suffix}
                  className="text-4xl tracking-tighter"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                />
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-2" style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
