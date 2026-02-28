import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSolution from "@/components/ProblemSolution";
import HowItWorks from "@/components/HowItWorks";
import NumbersSection from "@/components/NumbersSection";
import SolutionsSection from "@/components/SolutionsSection";
import TrackingSection from "@/components/TrackingSection";
import VisionSection from "@/components/VisionSection";
import SocialProof from "@/components/SocialProof";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSolution />
      <HowItWorks />
      <NumbersSection />
      <SolutionsSection />
      <TrackingSection />
      <VisionSection />
      <SocialProof />
      <FinalCTA />
      <Footer />
    </main>
  );
};

export default Index;
