import React, { Suspense, lazy, useState, useEffect } from 'react';

const Banner = lazy(() => import('../../components/Banner/Banner'));
const About = lazy(() => import('../About/About'));
const WhatIDo = lazy(() => import('../WhatIDo/IDo'));
const ReactDeveloperJourney = lazy(() => import('../../components/Journey/JourneyMap'));
const Skills = lazy(() => import('../Skills/Skills'));
const Contact = lazy(() => import('../ContactMe/Contact'));

const Home = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  // Track the scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
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
        
        {/* Add id attributes to each section for scrolling */}
        <div id="about">
          <About />
        </div>
        
        <div id="experience">
          <ReactDeveloperJourney />
        </div>
        
        <div id="work">
          <WhatIDo />
        </div>
        <div id="skills">
          <Skills />
        </div>
        
        <div id="contact">
          <Contact />
        </div>
      </Suspense>
    </div>
  );
};

export default Home;