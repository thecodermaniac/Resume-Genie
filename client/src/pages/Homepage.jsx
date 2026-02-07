import React from 'react'
import Hero from "../components/features/landing/Hero";
import FeaturesSection from "../components/features/landing/FeaturesSection";
import PricingSection from "../components/features/landing/PricingSection";
import Cta from '../components/features/landing/Cta';

const Homepage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <FeaturesSection />
      <PricingSection />
      <Cta/>
    </div>
  )
}

export default Homepage
