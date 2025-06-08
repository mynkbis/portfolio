import React, { useState } from 'react';
import { ArrowBigDown, Menu, X } from 'lucide-react';
import { scrollToSection } from '../../utils/scollFuntion';
import surya from "../assets/SuryaBisht_Resume.pdf"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full bg-slate-900 relative z-50">
      <nav className="flex justify-between items-center py-6 px-8 bg-slate-900 border-b border-teal-400/10">
        {/* Logo */}
        <div className="flex items-center">
          <div className="h-10 flex bg-white items-center justify-center border-2 border-teal-400 !text-teal-400 font-bold text-2xl rounded-md  px-2 hover:!text-slate-900 hover:bg-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300" onClick={()=>{scrollToSection('banner')}}>
            SB
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            onClick={() => scrollToSection('about')} 
            className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
          >
            About
          </a>
          <a 
            onClick={() => scrollToSection('experience')} 
            className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
          >
            Experience
          </a>
          <a 
            onClick={() => scrollToSection('work')} 
            className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
          >
            Work
          </a>
          <a 
          onClick={() => scrollToSection('skills')} 
          className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
        >
          Skills
        </a>
          <a 
            onClick={() => scrollToSection('contact')} 
            className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
          >
            Contact
          </a>
          <a variant="outline" className="border border-teal-400 !text-white/90 bg-transparent hover:!text-teal-400 text-sm flex" 
            href={surya} download="SuryaBisht_Resume.pdf">Resume
            <ArrowBigDown fill='teal' className='text-white' size={22}/>
          </a>
        </div>

        {/* Hamburger Icon */}
        <div className="block md:hidden">
          <button onClick={toggleMenu} className="!text-white/90 focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Animated Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-800 border-t border-teal-400/10 px-8 py-6 gap-4 flex flex-col items-start transform transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <a 
          onClick={() => scrollToSection('about')} 
          className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
        >
          About
        </a>
        <a 
          onClick={() => scrollToSection('experience')} 
          className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
        >
          Experience
        </a>
        <a 
          onClick={() => scrollToSection('work')} 
          className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
        >
          Work
        </a>
        <a 
          onClick={() => scrollToSection('skills')} 
          className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
        >
          Skills
        </a>
        <a 
          onClick={() => scrollToSection('contact')} 
          className="!text-white/90 hover:!text-teal-400 transition-colors text-sm cursor-pointer"
        >
          Contact
        </a>
        <a
          variant="outline"
          className="border border-teal-400 !text-white/90 bg-transparent hover:!text-teal-400 text-sm flex"
          onClick={toggleMenu}
          href={surya} download="SuryaBisht_Resume.pdf"
        >
          Resume
          <ArrowBigDown fill='teal' className='text-white' size={18}/>
        </a>
      </div>
    </div>
  );
};

export default Navbar;