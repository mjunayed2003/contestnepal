import ContestCategories from "@/component/Home/ContestCategories";
import ContestNearby from "@/component/Home/ContestNearby";
import FAQ from "@/component/Home/Faq";
import HeroSection from "@/component/Home/HeroSection";
import HowItWorks from "@/component/Home/HowItWork";
import TrendingNow from "@/component/Home/TrendingNow";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ContestCategories />
      <TrendingNow />
      <ContestNearby />
      <HowItWorks />
      <FAQ />
    </div>
  );
}
