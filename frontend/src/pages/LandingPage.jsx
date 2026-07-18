import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Stats from "../components/landing/Stats";
import Features from "../components/landing/Features";
import Templates from "../components/landing/Templates";
import AISection from "../components/landing/AISection";
import HowItWorks from "../components/landing/HowItWorks";
import Testimonials from "../components/landing/Testimonials";
import FAQ from "../components/landing/FAQ";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-slate-950 overflow-x-hidden scroll-smooth">
      <Navbar />

      <main>
        <Hero />
        <Stats />
        <Features />
        <Templates />
        <AISection />
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}