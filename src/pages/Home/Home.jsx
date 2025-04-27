import React, { Suspense, lazy, useState, useEffect } from 'react';

const Banner = lazy(() => import('../../components/Banner/Banner'));
const About = lazy(() => import('../About/About'));
const WhatIDo = lazy(() => import('../WhatIDo/IDo'));
const ReactDeveloperJourney = lazy(() => import('../../components/Journey/JourneyMap'));
const Skills = lazy(() => import('../Skills/Skills'));
const Contact = lazy(() => import('../ContactMe/Contact'));

const Home = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track the scroll event to stop blinking
  useEffect(() => {
    console.log("useEffect running");  // Log to confirm if the effect is running
    const handleScroll = () => {
      console.log('scroll event detected', window.scrollY);  // Log scroll position
    };
  
    window.addEventListener('scroll', handleScroll);
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div className='overflow-x-hidden'>
      <Suspense fallback={<div>Loading...</div>}>
        <Banner hasScrolled={hasScrolled} />
        <About />
        <WhatIDo />
        <ReactDeveloperJourney />
        <Skills />
        <Contact />
      </Suspense>
    </div>
  );
};

export default Home;
