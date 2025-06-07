import React, { useEffect, useState, useRef } from "react";
import {
  Settings,
  Palette,
  Lightbulb,
  Check,
  Settings2,
  SettingsIcon,
  Wrench,
} from "lucide-react";
import skillsForMe from "../../assets/Skills.png";
import { Code, Package, GitBranch, Cpu, Layers, Server } from "lucide-react";
import "../../App.css";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiRedux,
  SiMongodb,
  SiTypescript,
  SiExpress,
  SiPython,
  SiJekyll,
  SiOpenai,
  SiAmazon,
  SiNestjs,
  SiWordpress,
  SiGithub,
} from "react-icons/si";
import {
  SiTailwindcss,
  SiChakraui,
  SiMui,
  SiBootstrap,
  SiSass,
  SiAntdesign,
} from "react-icons/si";
import { FaReact } from "react-icons/fa"; // fallback for Radix UI (no official icon)
import { TbBrandRadixUi } from "react-icons/tb"; // if you have tabler icons installed for Radix UI
import { SiShadcnui } from "react-icons/si"; // Shadcn UI doesn't have an official icon; fallback to React icon or custom

const Skills = () => {
  const [animatedTech, setAnimatedTech] = useState(new Set());
  const [animatedDesign, setAnimatedDesign] = useState(new Set());
  const [animatedTools, setAnimatedTools] = useState(new Set());
  const [animatedKnowledge, setAnimatedKnowledge] = useState(new Set());
  
  const techRef = useRef(null);
  const designRef = useRef(null);
  const toolsRef = useRef(null);
  const knowledgeRef = useRef(null);

  const techStack = [
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "React.js", icon: SiReact, color: "#61DAFB" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Redux", icon: SiRedux, color: "#764ABC" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
    { name: "Express.js", icon: SiExpress, color: "#000000" },
    { name: "Github", icon: SiGithub, color: "#000000" },
    { name: "Python", icon: SiPython, color: "#3776AB" },
    { name: "Jekyll", icon: SiJekyll, color: "#CC0000" },
    { name: "Nest.js", icon: SiNestjs, color: "#E0234E" },
    { name: "WordPress", icon: SiWordpress, color: "#21759B" },
    { name: "OpenAI", icon: SiOpenai, color: "#412991" },
    { name: "AWS EC2", icon: SiAmazon, color: "#FF9900" },
    { name: "AWS S3", icon: SiAmazon, color: "#FF9900" },
    { name: "AWS IAM", icon: SiAmazon, color: "#FF9900" },
  ]

  const toolsList = [
    "Git + Github",
    "Command Line",
    "Chrome DevTools",
    "Postman",
    "VS Code",
    "Docker",
    "Jira",
    "Slack",
    "Vercel",
    "Netlify",
    "ESLint",
    "MongoDB Compass/Atlas",
  ];

  const knowledgeList = [
    "Responsive Design",
    "Cross-Browser Compatibility",
    "Accessibility (a11y)",
    "State Management",
    "Authentication & Authorization",
    "API Integration (REST, GraphQL)",
    "Microservices Architecture",
    "Unit Testing & Integration Testing",
    "Version Control (Git)",
    "Continuous Integration/Deployment (CI/CD)",
    "Progressive Web Apps (PWA)",
    "Headless CMS",
    "Cloud Basics (AWS)",
    "Lazy Loading",
    "Internationalization (i18n)",
    "Component-Driven Development",
  ];
   
  const designFrameworks=[{ name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Chakra UI", icon: SiChakraui, color: "#319795" },
    { name: "Material UI", icon: SiMui, color: "#007FFF" },
    { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
    { name: "SCSS", icon: SiSass, color: "#CC6699" },
    { name: "Ant Design", icon: SiAntdesign, color: "#0170FE" },
    { name: "Radix UI", icon: TbBrandRadixUi, color: "#FF4785" },
    { name: "Shadcn UI", icon: FaReact, color: "#08A0F7" },
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3, // Trigger when 30% of the section is visible
      rootMargin: '0px 0px -100px 0px' // Trigger slightly before the section is fully visible
    };

    const animateTechStack = () => {
      techStack.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedTech(prev => new Set([...prev, index]));
        }, index * 150);
      });
    };

    const animateDesignFrameworks = () => {
      designFrameworks.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedDesign(prev => new Set([...prev, index]));
        }, index * 150);
      });
    };

    const animateToolsList = () => {
      toolsList.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedTools(prev => new Set([...prev, index]));
        }, index * 100);
      });
    };

    const animateKnowledgeList = () => {
      knowledgeList.forEach((_, index) => {
        setTimeout(() => {
          setAnimatedKnowledge(prev => new Set([...prev, index]));
        }, index * 80);
      });
    };

    const techObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateTechStack();
          techObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const designObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateDesignFrameworks();
          designObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const toolsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateToolsList();
          toolsObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const knowledgeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateKnowledgeList();
          knowledgeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (techRef.current) techObserver.observe(techRef.current);
    if (designRef.current) designObserver.observe(designRef.current);
    if (toolsRef.current) toolsObserver.observe(toolsRef.current);
    if (knowledgeRef.current) knowledgeObserver.observe(knowledgeRef.current);

    return () => {
      techObserver.disconnect();
      designObserver.disconnect();
      toolsObserver.disconnect();
      knowledgeObserver.disconnect();
    };
  }, []);

  const getAnimationClasses = (index, animatedSet) => {
    const isAnimated = animatedSet.has(index);
    return `transform transition-all duration-700 ease-out ${
      isAnimated 
        ? 'translate-x-0 opacity-100 animate-pulse' 
        : '-translate-x-20 opacity-0'
    }`;
  };

  const getTextAnimationClasses = (index, animatedSet) => {
    const isAnimated = animatedSet.has(index);
    return `transform transition-all duration-500 ease-out ${
      isAnimated 
        ? 'translate-x-0 opacity-100' 
        : '-translate-x-10 opacity-0'
    }`;
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Image Section */}
      <div className="absolute inset-0 z-0">
        <img
          src={
            "https://shethink.in/wp-content/uploads/2021/07/react.js-img.png"
          }
          alt="Aboutme"
          className="w-full h-full object-cover !blur-[2px] opacity-80"
        />
      </div>
      {/* Dark Overlay */}
      <div className="bg-black absolute inset-0 opacity-90"></div>
      <div className="max-w-6xl mx-auto p-8 text-white z-20 relative">
        <span className="text-6xl text-center !text-white/80 font-bold mb-4">
          Skills
        </span>
        <div className="border-t-2 border-teal-500 w-32 mb-16"></div>
        <div className="flex flex-col gap-10">
          {/* Development Section */}
          <div ref={techRef}>
            <div className="flex items-center mb-8">
              <Settings className="text-white/80 mr-4" size={24} />
              <h2 className="text-2xl font-bold uppercase tracking-wider">
                Development
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className={`flip-card w-24 h-24 cursor-pointer group ${getAnimationClasses(index, animatedTech)}`}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front rounded-full bg-white border border-gray-700 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <div className="transition duration-300 text-gray-400">
                            <tech.icon
                              size={30}
                              className="group-hover:text-[unset]"
                            />
                          </div>
                          <span className="text-sm font-bold text-gray-500 group-hover:text-black">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                      <div className="flip-card-back rounded-full bg-white text-white flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <tech.icon size={30} style={{ color: tech.color }} />
                          <span className="text-sm text-blue-900 font-bold">
                            {tech.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Design Section */}
          <div ref={designRef}>
            <div className="flex items-center mb-8">
              <Palette className="text-white/80 mr-4" size={24} />
              <h2 className="text-2xl font-bold uppercase tracking-wider">
                Design FrameWorks & Libraries
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {designFrameworks.map((framework, index) => (
                <div key={index} className="flex items-center justify-center">
                  <div className={`flip-card w-24 h-24 cursor-pointer group ${getAnimationClasses(index, animatedDesign)}`}>
                    <div className="flip-card-inner">
                      <div className="flip-card-front rounded-full bg-white border border-gray-700 flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <framework.icon
                            size={30}
                            className="transition duration-300 grayscale group-hover:grayscale-0 text-gray-500"
                          />
                          <span className="text-sm mt-.5 font-bold text-gray-400 group-hover:text-blue-900 transition duration-300">
                            {framework.name}
                          </span>
                        </div>
                      </div>
                      <div className="flip-card-back rounded-full bg-white text-white flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center">
                          <framework.icon
                            size={30}
                            style={{ color: framework.color }}
                          />
                          <span className="text-sm mt-.5 text-blue-900 font-bold">
                            {framework.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Tools Section */}
            <div className="flex flex-col justify-between mt-10">
              <div className="mb-8" ref={toolsRef}>
                <div className="flex items-center mb-8">
                  <Wrench className="text-white/80 mr-4" size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wider">
                    Tools
                  </h2>
                </div>
                <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {toolsList.map((tool, index) => (
                    <li key={index} className={`flex items-center ${getTextAnimationClasses(index, animatedTools)}`}>
                      <Check className="text-gray-400 mr-2" size={18} />
                      <span className="text-lg font-medium whitespace-nowrap">
                        {tool}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Knowledge Section */}
              <div ref={knowledgeRef}>
                <div className="flex items-center border mb-8">
                  <Lightbulb className="text-white/80 mr-4" size={24} />
                  <h2 className="text-2xl font-bold uppercase tracking-wider">
                    Knowledge
                  </h2>
                </div>

                <ul className="space-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                  {knowledgeList.map((knowledge, index) => (
                    <li key={index} className={`flex items-center ${getTextAnimationClasses(index, animatedKnowledge)}`}>
                      <Check className="text-gray-400 mr-2" size={18} />
                      <span className="text-lg font-medium">{knowledge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default Skills;