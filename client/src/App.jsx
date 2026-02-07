import Navbar from "./components/layout/Navbar";
import Hero from "./components/features/landing/Hero";
import FeaturesSection from "./components/features/landing/FeaturesSection";
import PricingSection from "./components/features/landing/PricingSection";
import Footer from "./components/layout/Footer";


function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <Footer />
    </div>
  );
}

export default App;
