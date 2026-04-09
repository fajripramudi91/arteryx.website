import { DashboardMockup } from "./DashboardMockup";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

export function FeaturesSection() {
  const products = [
    {
      id: "NO. A10-1688-1010",
      label: "Sensor Module A",
      img: "https://images.unsplash.com/photo-1624301809538-5d5c4562656e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW51ZmFjdHVyaW5nJTIwcGxhbnQlMjBtYWNoaW5lcnl8ZW58MXx8fHwxNzc1NzIzNDQ1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "NO. A10-1688-1211",
      label: "Controller Unit B",
      img: "https://images.unsplash.com/photo-1768462862601-27eaf7c0c109?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwY29udmV5b3IlMjBiZWx0JTIwZmFjdG9yeXxlbnwxfHx8fDE3NzU3Mzk1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "NO. A10-1688-1012",
      label: "Vibration Sensor C",
      img: "https://images.unsplash.com/photo-1601192711538-a86a212cae12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwc2Vuc29yJTIwSW9UJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzU3Mzk1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: "NO. A10-1688-1013",
      label: "Gateway Hub D",
      img: "https://images.unsplash.com/photo-1759159091728-e2c87b9d9315?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWN0b3J5JTIwbWFjaGluZSUyMGluZHVzdHJpYWwlMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzc1NzM5NTEzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ];

  return (
    <section className="bg-white border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[10px] text-gray-400 uppercase tracking-widest mb-4"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Platform Features
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(2rem,4vw,3.5rem)] leading-[0.95] tracking-tighter text-black uppercase mb-16"
          style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
        >
          Machine Monitoring Products
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="border border-gray-200 p-6"
          >
            <DashboardMockup />
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ borderColor: "#f97316", y: -4 }}
                className="border border-gray-200 p-4 group cursor-default"
                style={{ borderColor: "#e5e7eb" }}
              >
                <div className="overflow-hidden">
                  <ImageWithFallback
                    src={product.img}
                    alt={product.label}
                    className="w-full h-32 object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 mb-3"
                  />
                </div>
                <p className="text-[10px] text-gray-400 tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>
                  {product.id}
                </p>
                <p className="text-sm text-black mt-1" style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 500 }}>
                  {product.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}