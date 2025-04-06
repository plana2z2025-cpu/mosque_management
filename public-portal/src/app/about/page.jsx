"use client";
import Header from "../components/headers/Header";
import HeroSection from "./HeroSection";
import PortalsSection from "./PortalsSection";
import FeaturesSection from "./FeaturesSection";
import DashboardSection from "./DashboardSection";
import TrustedUserSection from "./TrustedUserSection";
import SubscribeCardSection from "./SubscribeCardSection";
import Footer from "../components/headers/Footer";

export default function LandingPage() {
  return (
    <div className="app">
      <div className="flex min-h-screen flex-col w-full">
        <Header />

        <main className="flex-1">
          <HeroSection />

          <PortalsSection />

          <FeaturesSection />

          <DashboardSection />

          <TrustedUserSection />

          <SubscribeCardSection />
        </main>

        <Footer />
      </div>
    </div>
  );
}
