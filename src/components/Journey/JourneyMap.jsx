// import { useState, useRef, useEffect } from "react"

// const ReactDeveloperJourney = () => {
//   const [rotation, setRotation] = useState(0)
//   const [isDragging, setIsDragging] = useState(false)
//   const [startX, setStartX] = useState(0)
//   const containerRef = useRef(null)

//   const steps = [
//     {
//       id: 1,
//       color: "bg-orange-500",
//       title: "Fundamentals",
//       description: "Learning HTML, CSS, and JavaScript basics",
//     },
//     {
//       id: 2,
//       color: "bg-yellow-400",
//       title: "React Basics",
//       description: "Components, props, and state management",
//     },
//     {
//       id: 3,
//       color: "bg-lime-500",
//       title: "Advanced Concepts",
//       description: "Hooks, context API, and performance optimization",
//     },
//     {
//       id: 4,
//       color: "bg-teal-500",
//       title: "Ecosystem",
//       description: "Routing, state management libraries, and testing",
//     },
//     {
//       id: 5,
//       color: "bg-blue-500",
//       title: "Full Stack",
//       description: "API integration, authentication, and deployment",
//     },
//   ]

//   const handleMouseDown = (e) => {
//     setIsDragging(true)
//     setStartX(e.clientX)
//   }

//   const handleMouseMove = (e) => {
//     if (!isDragging) return
//     const deltaX = e.clientX - startX
//     setRotation((prev) => (prev + deltaX * 0.5) % 360)
//     setStartX(e.clientX)
//   }

//   const handleMouseUp = () => setIsDragging(false)

//   const handleTouchStart = (e) => {
//     setIsDragging(true)
//     setStartX(e.touches[0].clientX)
//   }

//   const handleTouchMove = (e) => {
//     if (!isDragging) return
//     const deltaX = e.touches[0].clientX - startX
//     setRotation((prev) => (prev + deltaX * 0.5) % 360)
//     setStartX(e.touches[0].clientX)
//   }

//   const handleTouchEnd = () => setIsDragging(false)

//   useEffect(() => {
//     const handleMouseUpGlobal = () => setIsDragging(false)
//     document.addEventListener("mouseup", handleMouseUpGlobal)
//     document.addEventListener("touchend", handleMouseUpGlobal)
//     return () => {
//       document.removeEventListener("mouseup", handleMouseUpGlobal)
//       document.removeEventListener("touchend", handleMouseUpGlobal)
//     }
//   }, [])

//   const calculateStepPosition = (index) => {
//     const totalSteps = steps.length
//     const angleStep = (2 * Math.PI) / totalSteps
//     const radius = 120
//     const heightStep = 40

//     const angle = angleStep * index + (rotation * Math.PI) / 180
//     const x = radius * Math.cos(angle)
//     const z = radius * Math.sin(angle)
//     const y = index * heightStep

//     return { x, y, z, angle }
//   }

//   const getFrontStepIndex = () => {
//     let closest = null
//     let minDiff = Infinity
//     steps.forEach((_, index) => {
//       const totalSteps = steps.length
//       const angleStep = (2 * Math.PI) / totalSteps
//       const angle = angleStep * index + (rotation * Math.PI) / 180
//       const angleDeg = ((angle * 180) / Math.PI + 360) % 360
//       const diff = Math.abs(angleDeg > 180 ? 360 - angleDeg : angleDeg)
//       if (diff < minDiff) {
//         minDiff = diff
//         closest = index
//       }
//     })
//     return closest
//   }

//   const frontStepIndex = getFrontStepIndex()

//   return (
//     <div className="w-full max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
//       <div className="text-center mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">5 STEPS</h1>
//         <p className="text-xl text-gray-600">INFOGRAPHICS</p>
//         <div className="flex justify-center gap-1 mt-2">
//           <div className="w-6 h-1 bg-blue-500"></div>
//           <div className="w-6 h-1 bg-teal-500"></div>
//           <div className="w-6 h-1 bg-lime-500"></div>
//           <div className="w-6 h-1 bg-yellow-400"></div>
//           <div className="w-6 h-1 bg-orange-500"></div>
//         </div>
//       </div>

//       <div className="text-center mb-4">
//         <p className="text-sm text-gray-500">Click and drag to rotate the stairs</p>
//       </div>

//       {/* Spiral Container */}
//       <div
//         ref={containerRef}
//         className="relative h-[400px] w-full perspective-1000 cursor-grab active:cursor-grabbing"
//         onMouseDown={handleMouseDown}
//         onMouseMove={handleMouseMove}
//         onMouseUp={handleMouseUp}
//         onMouseLeave={handleMouseUp}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <div
//           className="absolute w-full h-full transform-style-3d transition-transform duration-300"
//           style={{
//             transformStyle: "preserve-3d",
//             transform: `translateZ(-200px) rotateX(20deg)`,
//           }}
//         >
//           {/* Center Pole */}
//           <div
//             className="absolute left-1/2 top-1/2 w-4 h-[400px] bg-gray-300 opacity-30"
//             style={{
//               transform: "translateX(-50%) translateY(-50%) rotateX(90deg)",
//             }}
//           ></div>

//           {/* Steps */}
//           {steps.map((step, index) => {
//             const { x, y, z, angle } = calculateStepPosition(index)
//             const isActive = index === frontStepIndex

//             return (
//               <div
//                 key={step.id}
//                 className="absolute left-1/2 top-1/2 transition-all duration-300"
//                 style={{
//                   transform: `translateX(${x}px) translateY(${-y}px) translateZ(${z}px) rotateY(${-angle}rad)`,
//                   transformStyle: "preserve-3d",
//                   zIndex: isActive ? 10 : 5,
//                 }}
//               >
//                 {/* Platform */}
//                 <div
//                   className={`${step.color} w-[120px] h-[40px] rounded-md shadow-md flex items-center justify-center transition-all duration-300 hover:brightness-110 cursor-pointer ${
//                     isActive ? "ring-2 ring-white" : ""
//                   }`}
//                 >
//                   <span className="text-white font-bold text-sm">Step {step.id}</span>
//                 </div>

//                 {/* Support Pillar */}
               
//                 {/* Character */}
//                 {isActive && (
//                   <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 transition-all duration-500">
//                     <div className="animate-bounce">
//                       <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
//                         <circle cx="12" cy="6" r="3" fill="black" />
//                         <line x1="12" y1="9" x2="12" y2="15" stroke="black" strokeWidth="2" />
//                         <line x1="12" y1="12" x2="8" y2="14" stroke="black" strokeWidth="2" />
//                         <line x1="12" y1="12" x2="16" y2="10" stroke="black" strokeWidth="2" />
//                         <line x1="12" y1="15" x2="9" y2="19" stroke="black" strokeWidth="2" />
//                         <line x1="12" y1="15" x2="15" y2="19" stroke="black" strokeWidth="2" />
//                         <rect x="6" y="13" width="3" height="2" fill="black" />
//                       </svg>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )
//           })}
//         </div>
//       </div>

//       {/* Rotation Buttons */}
//       <div className="flex justify-center gap-4 mt-6">
//         <button
//           className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//           onClick={() => setRotation((prev) => (prev - 30) % 360)}
//         >
//           Rotate Left
//         </button>
//         <button
//           className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
//           onClick={() => setRotation((prev) => (prev + 30) % 360)}
//         >
//           Rotate Right
//         </button>
//       </div>

//       {/* Step Description */}
//       <div className="mt-8 bg-white p-4 rounded-lg shadow-md transition-all duration-300">
//         <h2 className={`text-xl font-bold ${steps[frontStepIndex].color.replace("bg-", "text-")}`}>
//           {steps[frontStepIndex].title}
//         </h2>
//         <p className="text-gray-700 mt-2">{steps[frontStepIndex].description}</p>
//       </div>
//     </div>
//   )
// }

// export default ReactDeveloperJourney
// ReactDeveloperJourney.jsx
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ReactDeveloperJourney = () => {
  const canvasRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { color: "#1E3A8A" }, // Dark Blue
    { color: "#1D4ED8" }, // Blue
    { color: "#16A34A" }, // Green
    { color: "#34D399" }, // Light Green
    { color: "#FBBF24" }, // Yellow
    { color: "#F59E0B" }, // Orange
    { color: "#F97316" }, // Orange Red
    { color: "#DC2626" }, // Red
    { color: "#B91C1C" }, // Dark Red
  ];

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(ambientLight);
    scene.add(directionalLight);

    // Spiral staircase setup
    const stepHeight = 1;
    const stepWidth = 5;
    const stepDepth = 2;
    const radius = 10;
    const angleStep = (Math.PI * 2) / steps.length;

    const stepsGroup = new THREE.Group();

    steps.forEach((step, index) => {
      const geometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);
      const material = new THREE.MeshStandardMaterial({ color: step.color });
      const mesh = new THREE.Mesh(geometry, material);

      const angle = index * angleStep;
      mesh.position.set(
        radius * Math.cos(angle),
        index * (stepHeight + 0.2),
        radius * Math.sin(angle)
      );
      mesh.rotation.y = -angle;
      stepsGroup.add(mesh);
    });

    scene.add(stepsGroup);

    // Character (Sphere)
    const characterGeometry = new THREE.SphereGeometry(0.6, 32, 32);
    const characterMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
    const character = new THREE.Mesh(characterGeometry, characterMaterial);
    scene.add(character);

    // Timer to update stepIndex
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate camera around Y-axis only
      const time = Date.now() * 0.001;
      camera.position.x = 30 * Math.sin(time * 0.3);
      camera.position.z = 30 * Math.cos(time * 0.3);
      camera.lookAt(new THREE.Vector3(0, steps.length / 2, 0));

      // Update character to stay on the front-facing step
      const angle = stepIndex * angleStep;
      character.position.set(
        radius * Math.cos(angle),
        stepIndex * (stepHeight + 0.2) + stepHeight / 2 + 0.6,
        radius * Math.sin(angle)
      );
      character.rotation.y = -angle;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      clearInterval(interval);
      renderer.dispose();
    };
  }, [stepIndex]);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100vh", display: "block" }} />;
};

export default ReactDeveloperJourney;
