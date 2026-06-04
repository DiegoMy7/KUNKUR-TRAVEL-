import { AIPlannerSection } from "@/components/AIPlannerSection";
import { BentoFeatures } from "@/components/BentoFeatures";
import { Chatbot } from "@/components/Chatbot";
import { DestinationGrid } from "@/components/DestinationGrid";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { MotionRuntime } from "@/components/MotionRuntime";
import { Navbar } from "@/components/Navbar";
import { Packages } from "@/components/Packages";
import { ScrollJourneySequence } from "@/components/ScrollJourneySequence";
import { StorySection } from "@/components/StorySection";
import { Testimonials } from "@/components/Testimonials";

export default function Home() {
  return (
    <>
      <MotionRuntime />
      <Navbar />
      <main>
        <Hero />
        <ScrollJourneySequence />
        <DestinationGrid />
        <AIPlannerSection />
        <Packages />
        <BentoFeatures />
        <StorySection />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
