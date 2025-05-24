
import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import SearchSection from '../components/SearchSection';
import StatsSection from '../components/StatsSection';
import CategoryProducts from '../components/CategoryProducts';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      <Hero />
      <SearchSection />
      <CategoryGrid />
      <CategoryProducts />
      <StatsSection />
    </div>
  );
};

export default Index;
