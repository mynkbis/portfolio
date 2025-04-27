import {
    Github,
    Instagram,
    Twitter,
    Linkedin,
    Box,
  } from "lucide-react";
  
  const EmailLink = () => {
    return (
<div className="hidden fixed -right-6 top-[75%] transform -translate-y-1/2 sm:!flex flex-col items-center gap-6 text-white/90 z-50">
      <span className="rotate-90 text-white/90 group hover:!text-blue-800 hover:underline transition cursor-pointer">bisht.surya@ymail.com</span>
              <div className="w-px h-18 bg-gray-400 mt-14" />
      </div>
    );
  };
  
  export default EmailLink;
  