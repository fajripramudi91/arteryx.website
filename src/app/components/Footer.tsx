import { useState } from "react";
import { Mail, Phone, MapPin, Loader2, Send, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { api } from "./api";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.submitContact(form);
      setSent(true);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err: any) {
      console.log("Contact form error:", err);
      toast.error(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          required
          value={form.name}
          onChange={set("name")}
          placeholder="Your Name *"
          className="bg-gray-900 border border-gray-800 text-white px-3 py-2.5 text-xs placeholder:text-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
        <input
          type="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="Your Email *"
          className="bg-gray-900 border border-gray-800 text-white px-3 py-2.5 text-xs placeholder:text-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
          style={{ fontFamily: "Inter, sans-serif" }}
        />
      </div>
      <input
        type="text"
        value={form.subject}
        onChange={set("subject")}
        placeholder="Subject"
        className="w-full bg-gray-900 border border-gray-800 text-white px-3 py-2.5 text-xs placeholder:text-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
        style={{ fontFamily: "Inter, sans-serif" }}
      />
      <textarea
        required
        value={form.message}
        onChange={set("message")}
        placeholder="Your Message *"
        rows={3}
        className="w-full bg-gray-900 border border-gray-800 text-white px-3 py-2.5 text-xs placeholder:text-gray-600 focus:border-orange-500 focus:outline-none transition-colors resize-none"
        style={{ fontFamily: "Inter, sans-serif" }}
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.02 } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        className="w-full bg-orange-500 text-white py-2.5 text-xs uppercase tracking-widest flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {loading ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : sent ? (
          <>
            <CheckCircle2 className="w-3 h-3" /> Sent!
          </>
        ) : (
          <>
            <Send className="w-3 h-3" /> Send Message
          </>
        )}
      </motion.button>
    </form>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await api.subscribeNewsletter(email);
      toast.success(res.message || "Subscribed successfully!");
      setEmail("");
    } catch (err: any) {
      console.log("Newsletter error:", err);
      toast.error(err.message || "Failed to subscribe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-0">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 bg-gray-900 border border-gray-800 border-r-0 text-white px-3 py-2.5 text-xs placeholder:text-gray-600 focus:border-orange-500 focus:outline-none transition-colors min-w-0"
        style={{ fontFamily: "Inter, sans-serif" }}
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        className="bg-orange-500 text-white px-4 py-2.5 text-xs uppercase tracking-wider disabled:opacity-60 flex-shrink-0 cursor-pointer"
        style={{ fontFamily: "Inter, sans-serif" }}
      >
        {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Subscribe"}
      </motion.button>
    </form>
  );
}

export function Footer() {
  const navigate = useNavigate();

  return (
    <footer id="contact" className="bg-black text-gray-400 border-t border-gray-800">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-16 py-16">
        {/* Contact Form Section */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16 pb-16 border-b border-gray-800">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-[clamp(2rem,4vw,3rem)] leading-[0.95] tracking-tighter text-white uppercase mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              Get in Touch
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-md" style={{ fontFamily: "Inter, sans-serif" }}>
              Have questions about our platform? Want to schedule a personalized demo? Send us a message and our team will respond within 24 hours.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Email</p>
                  <a href="mailto:arteryx@gmail.com" className="text-sm text-white hover:text-orange-500 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                    arteryx@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Phone</p>
                  <a href="tel:+6285715365400" className="text-sm text-white hover:text-orange-500 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                    +62 857 1536 5400
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-900 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider" style={{ fontFamily: "Inter, sans-serif" }}>Office</p>
                  <span className="text-sm text-white" style={{ fontFamily: "Inter, sans-serif" }}>
                    Jakarta Selatan, Indonesia
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="text-xs text-white uppercase tracking-widest mb-6" style={{ fontFamily: "Inter, sans-serif" }}>
              Send us a message
            </h3>
            <ContactForm />
          </motion.div>
        </div>

        {/* Footer links */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="text-2xl tracking-tight text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              ARTERYX
            </span>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed" style={{ fontFamily: "Inter, sans-serif" }}>
              AI-powered predictive maintenance for industrial machines. Prevent downtime before it happens.
            </p>

            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-white uppercase tracking-widest mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                Newsletter
              </p>
              <p className="text-[10px] text-gray-600 mb-2" style={{ fontFamily: "Inter, sans-serif" }}>
                Get industry insights and product updates
              </p>
              <NewsletterForm />
            </div>
          </motion.div>

          {[
            { title: "Product", items: ["Features", "How It Works", "Pricing", "Case Studies", "Integrations"] },
            { title: "Company", items: ["About Us", "Careers", "Blog", "Press Kit", "Partners"] },
          ].map((col, ci) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (ci + 1) * 0.1 }}
            >
              <h4 className="text-xs text-white uppercase tracking-widest mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-gray-500 hover:text-orange-500 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-xs text-white uppercase tracking-widest mb-4" style={{ fontFamily: "Inter, sans-serif" }}>
              Legal
            </h4>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR Compliance", "Security"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-gray-500 hover:text-orange-500 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600" style={{ fontFamily: "Inter, sans-serif" }}>
            &copy; 2026 Arteryx. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((item) => (
              <a key={item} href="#" className="text-xs text-gray-600 hover:text-orange-500 transition-colors" style={{ fontFamily: "Inter, sans-serif" }}>
                {item}
              </a>
            ))}
            <button
              onClick={() => navigate("/admin")}
              className="text-xs text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Admin
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
