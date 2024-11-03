import React, { memo } from 'react';
import HeroSection from '@/views/components2/home/HeroSection';
import Welcome from '@/views/components2/home/Welcome';
import Navbar from '@/views/components2/Navbar/Navbar';

const Home = () => {
  return (
    <div>
      <Welcome />
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default memo(Home);
