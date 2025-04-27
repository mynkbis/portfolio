import React from 'react';
import whatdo from "../../assets/WhatIdo.png";

const WhatIDo = () => {
  return (
    <div className="bg-black text-white min-h-screen relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black/70 z-0">
        <img
          src={whatdo}
          alt="Desktop workspace"
          className="w-full h-full object-cover mix-blend-overlay opacity-70"
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <span className="text-6xl font-bold mb-8">What I Do</span>
        <div className="border-t-2 border-teal-500 w-32 mb-12"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Web Development Section */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="p-2 border border-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wider">Web Development</h2>
            </div>
            <p className="text-gray-300">
              I specialize in building pixel-perfect websites and applications using HTML, CSS, and JavaScript, enhanced by tools like Sass. I am committed to writing clean, modular, semantic, and DRY code that ensures both quality and maintainability.

            </p>
          </div>
          {/* Responsive UI Design Section */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="p-2 border border-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wider">Responsive UI Design</h2>
            </div>
            <p className="text-gray-300">
              <span className="italic">"A good user interface should feel obvious — not something you have to explain."</span>
              I believe the best designs are the ones that just make sense. I love building responsive, beautiful, and user-first interfaces that work effortlessly across any device, platform, or browser.

            </p>
          </div>

          {/* Experience Design Section */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="p-2 border border-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wider">Experience Design</h2>
            </div>
            <p className="text-gray-300">
              There have been so many times when I’m just trying to get something simple done online, and everything goes wrong, leaving me so frustrated I almost want to throw my laptop across the room. It’s moments like these that really show how important a smooth user experience is for a product to succeed.
            </p>
          </div>

          {/* Diversity in Tech Section */}
          <div className="mb-12">
            <div className="flex items-center mb-4">
              <div className="p-2 border border-white mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold uppercase tracking-wider">Diversity in Tech</h2>
            </div>
            <p className="text-gray-300">
              Beyond coding, I am passionate about building scalable, user-focused web applications and advocating for clean code and intuitive design.
              With 3 years of professional experience across industries like automation, licensing, social media, and e-commerce,
              I bring a strong commitment to collaborative development and continuous learning.
              I am also a strong advocate for diversity in tech and dedicated to creating inclusive environments that empower every team member to succeed.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;