import React from 'react';
import MarketTicker from './components/MarketTicker';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SolutionsSection from './components/SolutionsSection';
import SustainabilitySection from './components/SustainabilitySection';
import ContactAISection from './components/ContactAISection';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-amber-500/30">
      <MarketTicker />
      <Navbar />
      <main>
        <HeroSection />
        <SolutionsSection />
        <SustainabilitySection />
        <ContactAISection />
      </main>
      <Footer />
    </div>
  );
};

export default App;