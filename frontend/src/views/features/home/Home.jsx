import React, { memo } from 'react';
import HeroSection from '@/views/components2/home/HeroSection';
import Navbar from '@/views/components2/Navbar/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default memo(Home);
