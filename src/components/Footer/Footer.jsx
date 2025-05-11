import React from "react";
import { Github, Instagram, Twitter, Linkedin } from "lucide-react";
import { scrollToSection } from "../../../utils/scollFuntion";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-10">
        {/* About Section */}
        <div className="hidden sm:!flex flex-col">
          <h3 className="text-xl font-semibold mb-4">About Me</h3>
          <p className="text-sm leading-relaxed">
            I’m a React.js developer passionate about building beautiful, performant UIs.  
            Always learning &amp; exploring new technologies.
          </p>
        </div>

        {/* Quick as */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Quick as</h3>
          <ul className="space-y-2 flex gap-3 mt-3 justify-center">
            <li>
              <a   onClick={() => scrollToSection('banner')}  className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a   onClick={() => scrollToSection('experience')}  className="hover:text-white transition">
                Projects
              </a>
            </li>
            <li>
              <a   onClick={() => scrollToSection('skills')}  className="hover:text-white transition">
                Skills
              </a>
            </li>
            <li>
              <a   onClick={() => scrollToSection('contact')}  className="hover:text-white transition">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">Get In Touch</h3>
          <div className="flex items-center justify-center gap-4 mt-2 sm:mt-4">
            <a
              href="https://github.com/mynkbis"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/surya-bisht-25805017"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
             <Linkedin size={20}/>
            </a>
            <a
              href="https://twitter.com/mayank0009"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com/tiltedcanon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Optional: if you still want the fixed side SocialIcons */}
      {/* <SocialIcons /> */}

      <div className="border-t border-gray-700 text-center text-sm mt-2">
        © {new Date().getFullYear()} Surya Bisht. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
