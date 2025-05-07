import { useState, useEffect, useRef } from "react";
import surya from "../../assets/Surya.jpg";
import AnimatedPortalPopup from "../Modals/AnimatedModal";
import { ArrowDown } from "lucide-react";
import bannerMine from "../../assets/Banner.png";
export default function Banner({hasScrolled}) {
  const [typedText, setTypedText] = useState("");
  const [typedJobTitle, setTypedJobTitle] = useState("");
  const [showImage, setShowImage] = useState(false);
  const [startTyping, setStartTyping] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [nameTypingDone, setNameTypingDone] = useState(false);
  const [jobTypingDone, setJobTypingDone] = useState(false);

  const typingTimeoutRef = useRef();
  const jobTitleTimeoutRef = useRef();
  const currentIndexRef = useRef(0);
  const jobTitleIndexRef = useRef(0);

  const fullName = "Surya Bisht";
  const jobTitle = "Front End Software Engineer";

  const typingSpeed = 120;
  const pauseBeforeJobTitle = 500;
  const pauseBeforeImage = 500;

  const typingCompleted = nameTypingDone && jobTypingDone;

  // Start typing after popup closes
  useEffect(() => {
    if (!showPopup) {
      setTimeout(() => {
        setStartTyping(true);
        return () => clearTimeout(typingTimeoutRef.current);   
      }, 1000);
    }
  }, [showPopup]);


  useEffect(()=>{
      const modalState= sessionStorage.getItem("closeModal")
      if(modalState){
        setShowPopup(false)
      }
      },[sessionStorage, showPopup])

  // Handle typing
  useEffect(() => {
    if (!startTyping) return;

    const typeFullName = () => {
      const currentIndex = currentIndexRef.current;
      if (currentIndex < fullName.length) {
        setTypedText((prev) => prev + fullName[currentIndex]);
        currentIndexRef.current++;
        typingTimeoutRef.current = setTimeout(typeFullName, typingSpeed);
      } else {
        setNameTypingDone(true);
        setTimeout(() => {
          typeJobTitle();
        }, pauseBeforeJobTitle);
      }
    };

    const typeJobTitle = () => {
      const currentJobTitleIndex = jobTitleIndexRef.current;
      if (currentJobTitleIndex < jobTitle.length) {
        setTypedJobTitle((prev) => prev + jobTitle[currentJobTitleIndex]);
        jobTitleIndexRef.current++;
        jobTitleTimeoutRef.current = setTimeout(typeJobTitle, typingSpeed);
      } else {
        setJobTypingDone(true);
        setTimeout(() => {
          // Optional: Show image after everything
          // setShowImage(true);
        }, pauseBeforeImage);
      }
    };

    typingTimeoutRef.current = setTimeout(typeFullName, 500);

    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      if (jobTitleTimeoutRef.current) clearTimeout(jobTitleTimeoutRef.current);
    };
  }, [startTyping]);

  // Stop blinking when user scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getNameContent = () => {
    if (!showImage) {
      return (
        <>
          <span>{typedText}</span>
          {!nameTypingDone && <span className="blinking-cursor">|</span>}
        </>
      );
    }
  };

  return (
    <>
      <div className="flex flex-col items-center relative justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 p-4 relative overflow-hidden">
        {/* Line animation */}
        <div className="absolute inset-0 z-0">
        <img 
          src={bannerMine} 
          alt="Aboutme" 
          className="w-full h-full object-cover opacity-40"
        />
      </div>
          <div className="bg-black absolute opacity-50  w-full h-full"></div>
        {!startTyping && (
          <div
            className="w-0 h-[2px] bg-white animate-grow-line-horizontal shadow-lg transition-all duration-1000 ease-out"
            style={{
              boxShadow: "0 4px 8px rgb(238, 230, 230)",
              opacity: 1,
            }}
          ></div>
        )}

        {startTyping && (
          <div className="flex flex-col items-center">
            {/* Name typing */}
            <h1 className="font-bold text-white text-center tracking-wider animate-slide-up-fade pb-4">
              <span className="text-6xl md:text-[8rem] glow-text">{getNameContent()}</span>
            </h1>

            {/* Job title typing */}
            {typedJobTitle && (
              <h2 className="font-bold text-white text-center tracking-wider animate-slide-up-fade">
                <span className="text-3xl md:text-[2.8rem] shadow-md ">
                  {typedJobTitle}
                  {!jobTypingDone && <span className="blinking-cursor">|</span>}
                </span>
              </h2>
            )}
          </div>
        )}

        {/* Arrow */}
        {jobTypingDone && (
  <div className="absolute bottom-[15%]">
    <div
      className={`rounded-full p-3 bg-teal-400 transition-all duration-300 ${
        typingCompleted && !hasScrolled ? "animate-bounce-blink" : ""
      }`}
    >
      <ArrowDown className="text-white" />
    </div>
  </div>
)}

      </div>

      {/* Popup */}
      {showPopup && <AnimatedPortalPopup onClose={() => setShowPopup(false)} />}
    </>
  );
}
