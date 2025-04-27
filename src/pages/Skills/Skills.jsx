import React from 'react';
import { Settings, Palette, Lightbulb, Check } from 'lucide-react';
import skillsForMe from "../../assets/Skills.png";
import { Code, Package, GitBranch, Cpu, Layers, Server } from 'lucide-react'
import "../../App.css"

const Skills = () => {

    const techStack = [
        { name: 'JavaScript', icon: <Code size={30} /> },
        { name: 'HTML5', icon: <Package size={30} /> },  // Example, you can swap with HTML-related icon
        { name: 'CSS3', icon: <Layers size={30} /> }, // Example, you can swap with CSS-related icon
        { name: 'Jekyll', icon: <Package size={30} /> }, // Example icon, replace with one related to Jekyll
        { name: 'Python', icon: <Cpu size={30} /> }, // You can use a generic CPU icon for Python, or use an image
        { name: 'React', icon: <GitBranch size={30} /> }, // Example, you can replace with React-specific icon if available
        { name: 'Backbone', icon: <Server size={30} /> }, // Replace with a more relevant icon if available
        { name: 'Node.js', icon: <Cpu size={30} /> }, // Using a CPU icon as a placeholder for Node.js
        { name: 'Angular', icon: <Layers size={30} /> }, // Example icon, replace with Angular-specific if available
      ];

  return (
    <div className="relative min-h-screen">
      {/* Background Image Section */}
      <div className="absolute inset-0 z-0">
        <img 
          src={skillsForMe} 
          alt="Aboutme" 
          className="w-full h-full object-cover opacity-60" // Adjusted opacity here
        />
      </div>
      {/* Dark Overlay */}
      <div className="bg-black absolute inset-0 opacity-90"></div>

      <div className="max-w-6xl mx-auto p-8 text-white z-20 relative">
        <span className="text-6xl !text-white/80 font-bold mb-4">Skills</span>
        <div className="border-t-2 border-teal-500 w-32 mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Development Section */}
          <div>
            <div className="flex items-center mb-8">
              <Settings className="text-white/80 mr-4" size={24} />
              <h2 className="text-2xl font-bold uppercase tracking-wider">Development</h2>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
            {techStack.map((tech, index) => (
        <div key={index} className="flex items-center justify-center">
          <div className="border border-gray-700 group bg-white cursor-pointer rounded-full w-24 h-24 flex items-center justify-center hover:border-teal-500 transition-colors duration-300 hover:add-shadow">
            <div className="flex flex-col items-center justify-center ">
              <div className='text-gray-300 group-hover:text-teal-800' >{tech.icon}</div>
              <span className="text-sm text-gray-300 font-bold group-hover:text-teal-800">{tech.name}</span>
            </div>
          </div>
        </div>
      ))}
            </div>
          </div>
          
          {/* Design Section */}
          <div>
            <div className="flex items-center mb-8">
              <Palette className="text-white/80 mr-4" size={24} />
              <h2 className="text-2xl font-bold uppercase tracking-wider">Design</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {[{ name: 'Sketch', icon: '💎' }, { name: 'Photoshop', icon: 'Ps' }, { name: 'InDesign', icon: 'Id' }, { name: 'Illustrator', icon: 'Ai' }, { name: 'InVision', icon: 'in' }].map((tool, index) => (
                <div key={index} className="border border-gray-700 w-16 h-16 flex items-center justify-center hover:border-teal-500 transition-colors duration-300">
                  <span className="text-lg font-medium">{tool.icon}</span>
                </div>
              ))}
            </div>

          {/* Tools Section */}
          <div className='flex justify-between mt-10'>
          <div>
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold uppercase tracking-wider">Tools</h2>
            </div>
            
            <ul className="space-y-3">
              {['Git + Github', 'Command Line', 'Chrome DevTools', 'Grunt + Gulp', 'Postman'].map((tool, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-gray-400 mr-2" size={18} />
                  <span>{tool}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Knowledge Section */}
          <div>
            <div className="flex items-center mb-8">
              <Lightbulb className="text-white/80 mr-4" size={24} />
              <h2 className="text-2xl font-bold uppercase tracking-wider">Knowledge</h2>
            </div>
            
            <ul className="space-y-3">
              {['CSS Detangling', 'ECMAScript 6', 'Usability', 'SEO', 'TDD'].map((knowledge, index) => (
                <li key={index} className="flex items-center">
                  <Check className="text-gray-400 mr-2" size={18} />
                  <span>{knowledge}</span>
                </li>
              ))}
            </ul>
            </div>     </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
