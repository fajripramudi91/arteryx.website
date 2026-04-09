import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { ProblemSection } from "./ProblemSection";
import { SolutionSection } from "./SolutionSection";
import { HowItWorks } from "./HowItWorks";
import { FeaturesSection } from "./FeaturesSection";
import { PricingSection } from "./PricingSection";
import { CTASection } from "./CTASection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white scroll-smooth" style={{ fontFamily: "Inter, sans-serif" }}>
      <Navbar />
      <Hero />
      <ProblemSection />
      <SolutionSection />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
