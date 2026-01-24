import { SplashNav } from "../../components/splash/SplashNav";
import { HeroSection } from "../../components/splash/HeroSection";
import { FeatureShowcase } from "../../components/splash/FeatureShowcase";
import { HowItWorks } from "../../components/splash/HowItWorks";
import { CTASection } from "../../components/splash/CTASection";
import { Footer } from "../../components/splash/Footer";

export const Splash: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-leetgo-darkest overflow-x-hidden grain-overlay">
      <SplashNav />
      <main>
        <HeroSection />
        <FeatureShowcase />
        <HowItWorks />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};
