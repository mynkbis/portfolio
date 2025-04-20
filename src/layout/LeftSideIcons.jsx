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
<div className="hidden fixed left-10 top-[65%] transform -translate-y-1/2 sm:!flex flex-col items-center gap-3 text-gray-400 z-50">
       <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Github size={22} className="hover:text-black transition duration-200" />
        </Link>
         <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <Linkedin size={22} className="hover:text-blue-800 transition duration-200" />
        </Link>
       <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <Instagram size={22} className="hover:text-pink-500 transition duration-200" />
        </Link>
       <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <Twitter size={22} className="hover:text-blue-500 transition duration-200" />
        </Link>
      
       {/* <Link href="#" target="_blank" rel="noopener noreferrer">
          <Box size={22} className="hover:text-white transition duration-200" />
        </Link> */}
  
        {/* Vertical Line */}
        <div className="w-px h-20 bg-gray-400 mt-4" />
      </div>
    );
  };
  
  export default SocialIcons;
  