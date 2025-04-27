import { useEffect, useState } from "react";

export default function AnimatedPortalPopup({ onClose }) {
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 500);
  
      return () => clearTimeout(timer);
    }, []);
  
    const handleClose = () => {
      setIsOpen(false);
       onClose(); // notify parent after animation
       sessionStorage.setItem("closeModal", true)
    };


  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Background Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={handleClose}
        ></div>
  
        {/* Portal container */}
        <div className="relative w-[90vw] max-w-2xl aspect-[1.2/1] flex items-center justify-center portal-container">
          {/* Animated Rings */}
          <div className="ring ring1"></div>
          <div className="ring ring2"></div>
          <div className="ring ring3"></div>
          <div className="ring ring4"></div>
          <div className="ring ring5"></div>
  
          {/* Inside Content */}
          <div className="relative z-10 text-white text-center p-6">
            <h2 className="text-3xl font-bold mb-4">Welcome</h2>
            <p className="text-lg mb-4">Hope you will find it interesting.</p>
            <button
              onClick={handleClose}
              className="mt-4 !px-3 !py-1 bg-pink-500 hover:!bg-white rounded-md font-bold hover:!text-red-900 text-white transition-colors cursor-poiner"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  