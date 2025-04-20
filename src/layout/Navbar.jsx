import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="w-full bg-slate-900 relative z-50">
      <nav className="flex justify-between items-center py-6 px-8 bg-slate-900 border-b border-teal-400/10">
        {/* Logo */}
        <div className="flex items-center">
          <div className="w-10 h-10 flex items-center justify-center border-2 border-teal-400 text-white font-bold text-2xl rounded-md bg-teal-400 hover:!text-teal-400 hover:bg-white cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
            SB
          </div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="about" className="text-white hover:!text-teal-400 transition-colors text-sm">About</Link>
          <Link to="#experience" className="text-white hover:!text-teal-400 transition-colors text-sm">Experience</Link>
          <Link to="#work" className="text-white hover:!text-teal-400 transition-colors text-sm">Work</Link>
          <Link to="#contact" className="text-white hover:!text-teal-400 transition-colors text-sm">Contact</Link>
          <Button variant="outline" className="border border-teal-400 text-white bg-transparent hover:!text-teal-400 text-sm">Resume</Button>
        </div>

        {/* Hamburger Icon */}
        <div className="block md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Animated Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-800 border-t border-teal-400/10 px-8 py-6 gap-4 flex flex-col items-start transform transition-all duration-300 ease-in-out
        ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}`}
      >
        <Link to="#about" onClick={toggleMenu} className="text-white hover:!text-teal-400 transition-colors text-sm">About</Link>
        <Link to="#experience" onClick={toggleMenu} className="text-white hover:!text-teal-400 transition-colors text-sm">Experience</Link>
        <Link to="#work" onClick={toggleMenu} className="text-white hover:!text-teal-400 transition-colors text-sm">Work</Link>
        <Link to="#contact" onClick={toggleMenu} className="text-white hover:!text-teal-400 transition-colors text-sm">Contact</Link>
        <Button
          variant="outline"
          className="border border-teal-400 text-white bg-transparent hover:!text-teal-400 text-sm"
          onClick={toggleMenu}
        >
          Resume
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
