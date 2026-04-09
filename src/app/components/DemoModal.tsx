import { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { api } from "./api";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function DemoModal({ open, onClose }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    machines: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.submitDemoRequest(form);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setForm({ name: "", email: "", company: "", phone: "", machines: "", message: "" });
        onClose();
      }, 2500);
    } catch (err: any) {
      console.log("Demo request error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto z-10"
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2
                  className="text-2xl tracking-tight text-black"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
                >
                  Request a Demo
                </h2>
                <p className="text-xs text-gray-400 mt-1" style={{ fontFamily: "Inter, sans-serif" }}>
                  Fill in your details and we'll get back within 24 hours
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Success state */}
            {success ? (
              <div className="p-12 flex flex-col items-center justify-center text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 15, stiffness: 200 }}
                >
                  <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                </motion.div>
                <h3
                  className="text-xl text-black mb-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 600 }}
                >
                  Demo Request Sent!
                </h3>
                <p className="text-sm text-gray-500" style={{ fontFamily: "Inter, sans-serif" }}>
                  Our team will contact you within 24 hours to schedule your personalized demo.
                </p>
              </div>
            ) : (
              /* Form */
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={set("name")}
                      placeholder="John Doe"
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={set("email")}
                      placeholder="john@company.com"
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      Company *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.company}
                      onChange={set("company")}
                      placeholder="Acme Corp"
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={set("phone")}
                      placeholder="+1 234 567 890"
                      className="w-full border border-gray-200 px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-orange-500 focus:outline-none transition-colors"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    Number of Machines
                  </label>
                  <select
                    value={form.machines}
                    onChange={set("machines")}
                    className="w-full border border-gray-200 px-4 py-2.5 text-sm text-black focus:border-orange-500 focus:outline-none transition-colors bg-white"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    <option value="">Select range</option>
                    <option value="1-10">1 - 10 machines</option>
                    <option value="11-50">11 - 50 machines</option>
                    <option value="51-200">51 - 200 machines</option>
                    <option value="200+">200+ machines</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5" style={{ fontFamily: "Inter, sans-serif" }}>
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell us about your maintenance challenges..."
                    rows={3}
                    className="w-full border border-gray-200 px-4 py-2.5 text-sm text-black placeholder:text-gray-300 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  />
                </div>

                {error && (
                  <p className="text-xs text-red-500 bg-red-50 p-3" style={{ fontFamily: "Inter, sans-serif" }}>
                    {error}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={!loading ? { scale: 1.02, boxShadow: "0 0 20px rgba(249,115,22,0.4)" } : {}}
                  whileTap={!loading ? { scale: 0.98 } : {}}
                  className="w-full bg-orange-500 text-white py-3 text-sm uppercase tracking-widest disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Schedule My Demo"
                  )}
                </motion.button>

                <p className="text-[10px] text-gray-400 text-center" style={{ fontFamily: "Inter, sans-serif" }}>
                  By submitting, you agree to our Privacy Policy. We'll never share your data.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
