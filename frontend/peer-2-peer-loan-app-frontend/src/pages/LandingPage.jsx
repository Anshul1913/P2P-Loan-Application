import React from 'react';
import Header from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeatureSection';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import GetStartedSection from '../components/GetStartedSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />
      <HeroSection />
      <GetStartedSection />
      <FeaturesSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
