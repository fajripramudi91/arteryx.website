import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { DemoModal } from "./DemoModal";

const words = ["PREDICTIVE", "MAINTENANCE", "PLATFORM"];

function TypewriterLine({ word, delay }: { word: string; delay: number }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        setDisplayed(word.slice(0, i + 1));
        i++;
        if (i >= word.length) clearInterval(iv);
      }, 45);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(timeout);
  }, [word, delay]);
  return <>{displayed || "\u00A0"}</>;
}

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section className="pt-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Top bar */}
        <div className="px-8 lg:px-16 pt-8 pb-4 flex flex-col lg:flex-row justify-between items-start gap-4">
          <div className="flex-1" />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm text-gray-500 max-w-xs text-right leading-relaxed"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            We're reimagining industrial maintenance — from "fix when broken" to "prevent before it breaks"
          </motion.p>
        </div>

        {/* Main hero */}
        <div className="relative px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-0 items-end min-h-[70vh]">
            {/* Left: Typewriter headline */}
            <div className="relative z-10 pb-16 lg:pb-24">
              <h1
                className="text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tighter text-black uppercase"
                style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
              >
                {words.map((w, i) => (
                  <span key={w} className={i === 2 ? "text-gray-300" : ""}>
                    <TypewriterLine word={w} delay={i * 600} />
                    <br />
                  </span>
                ))}
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.6 }}
                className="mt-8 flex gap-8"
              >
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>Speciality</span>
                  <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Real-time</p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>AI-Powered</p>
                </div>
                <div>
                  <span className="text-xs text-gray-400 uppercase tracking-widest" style={{ fontFamily: "Inter, sans-serif" }}>Speciality</span>
                  <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>Monitoring</p>
                  <p className="text-sm text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>WhatsApp Alerts</p>
                </div>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.3, duration: 0.6 }}
                className="mt-8 text-gray-500 max-w-md text-sm leading-relaxed"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Industrial machines deserve smarter care. We're building the AI platform that predicts failures before they happen — saving you time, money, and headaches.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.6 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(249,115,22,0.4)" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 text-sm uppercase tracking-widest cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                  onClick={(e) => { e.preventDefault(); setDemoOpen(true); }}
                >
                  Get Early Access
                  <ArrowRight className="w-4 h-4" />
                </motion.a>
                <motion.a
                  href="#how-it-works"
                  whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 border border-black text-black px-8 py-3 text-sm uppercase tracking-widest cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#fff", borderColor: "#000", color: "#000" }}
                >
                  See How It Works
                </motion.a>
              </motion.div>
            </div>

            {/* Right: Hero image with slow zoom */}
            <motion.div
              className="relative h-full flex items-end justify-center overflow-hidden"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <motion.div
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="w-full"
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1774229637247-3cd45219826c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcm9ib3RpYyUyMGFybSUyMG1hbnVmYWN0dXJpbmd8ZW58MXx8fHwxNzc1NjU4Nzg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Industrial robotic arm"
                  className="w-full h-[500px] lg:h-[600px] object-cover object-center"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none" aria-hidden>
            <p
              className="text-[clamp(4rem,14vw,14rem)] leading-none tracking-tighter text-gray-100 uppercase whitespace-nowrap"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              ARTERYX
            </p>
          </div>
        </div>
      </div>
      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
