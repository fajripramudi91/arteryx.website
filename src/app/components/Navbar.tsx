import { useState } from "react";
import { Menu, X } from "lucide-react";
import { DemoModal } from "./DemoModal";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">
            <a
              href="/"
              className="text-2xl tracking-tight text-black no-underline"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700 }}
            >
              ARTERYX
            </a>

            <div className="hidden md:flex items-center gap-10">
              {["Features", "How It Works", "Pricing", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="text-gray-500 hover:text-black transition-colors text-sm tracking-wide uppercase"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => setDemoOpen(true)}
                className="bg-black text-white px-6 py-2.5 text-sm tracking-wide uppercase hover:bg-gray-900 transition-colors cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Request Demo
              </button>
            </div>

            <button className="md:hidden" onClick={() => setOpen(!open)}>
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {open && (
            <div className="md:hidden pb-6 space-y-4">
              {["Features", "How It Works", "Pricing", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, "-")}`}
                  className="block text-gray-600 hover:text-black text-sm uppercase tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {item}
                </a>
              ))}
              <button
                onClick={() => {
                  setOpen(false);
                  setDemoOpen(true);
                }}
                className="block bg-black text-white px-6 py-2.5 text-sm uppercase tracking-wide w-full text-center cursor-pointer"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Request Demo
              </button>
            </div>
          )}
        </div>
      </nav>

      <DemoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
