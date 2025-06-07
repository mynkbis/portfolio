import {
  Github,
  Instagram,
  Twitter,
  Linkedin,
  Box,
} from "lucide-react";
import { Link } from "react-router-dom";

const SocialIcons = () => {
  return (
    <div className="hidden fixed left-10 top-[67%] transform -translate-y-1/2 lg:!flex flex-col items-center gap-3 text-white/90 z-50">
      <Link to="https://github.com/mynkbis" target="_blank" rel="noopener noreferrer">
        <Github size={22} className="hover:!text-black/80 hover:!shadow-xl transition duration-200" />
      </Link>

      <Link to="https://linkedin.com/in/surya-bisht-25805017" target="_blank" rel="noopener noreferrer">
        <Linkedin size={22} className="hover:text-blue-800 transition duration-200" />
      </Link>

      <Link to="https://twitter.com/mayank0009" target="_blank" rel="noopener noreferrer">
        <Twitter size={22} className="hover:text-blue-500 transition duration-200" />
      </Link>

      <Link to="https://instagram.com/tiltedcanon" target="_blank" rel="noopener noreferrer">
        <Instagram size={22} className="hover:text-pink-600 transition duration-200" />
      </Link>

      <div className="w-px h-20 bg-gray-400 mt-4" />
    </div>
  );
};

export default SocialIcons;