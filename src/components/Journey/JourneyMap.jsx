import React, { useRef, useEffect, useState } from "react";
import bannerMine from "../../assets/Banner.png";

import * as THREE from "three";

 

const ReactDeveloperJourney = () => {

  const isHoveredRef = useRef(false);

  const hoveredStepRef = useRef(null);

  const isDraggingRef = useRef(false);

  const canvasRef = useRef(null);

  const [stepIndex, setStepIndex] = useState(0);

  const lastX = useRef(0);

  const rotationTimeRef = useRef(0);

  

  // Tooltip state

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const [tooltipText, setTooltipText] = useState("");

  

  const journeyData = [

    { level: "Secondary (2008)", institution: "KV", percentage: 76, color: "#1E3A8A" },         // Navy Blue

    { level: "Sr. Secondary (2010)", institution: "KV", percentage: 66, color: "#1D4ED8" },  // Deeper Navy

    { level: "B.Tech (ECE-2014)", institution: "UTU", percentage: 70, color: "#16A34A" },     // Teal-700

    { company: "MPS (2015)", role: "QA", period: "1.5 years", color: "#34D399" },               // Teal-600

    { company: "SCUF (2020)", role: "Legal Executive", period: "1.6 years", color: "#FBBF24" }, // Teal-500

    { company: "SOAL (2021)", role: "Product Engineering", color: "#F97316" },                  // Teal-300
    
    { company: "DFS (2022)", role: "Manager", period: "1.5 years", color: "#F59E0B" },          // Teal-400

    { company: "Softprodigy (Present)", role: "Associate Software Engineer", period: " (~3 years)", color: "#DC2626" }, // Teal-200

  ];

  

  useEffect(() => {

    const scene = new THREE.Scene();

    

    // Create a background with an external image and blur effect

    const textureLoader = new THREE.TextureLoader();

    const bgTexture = textureLoader.load(

      "https://burst.shopifycdn.com/photos/developer-coding-in-php.jpg?width=1000&format=pjpg&exif=0&iptc=0",

      // Callback for when the texture is loaded - apply blur effect

      (texture) => {

        console.log("Background image loaded successfully");

        // Create a render target to apply post-processing

        createBlurredBackground(texture);

      },

      // Optional callback for loading progress

      undefined,

      // Optional callback for loading error

      (err) => {

        console.error("Error loading background image:", err);

        // Fallback to a color if image fails to load

        scene.background = new THREE.Color(0x000000);

      }

    );

    

    // Setup for the blur effect

    let blurredTexture = null;

    const createBlurredBackground = (originalTexture) => {

      // Size for the render target (lower = more blurry but better performance)

      const rtWidth = 8000;

      const rtHeight = 6000;

      

      // Create a render target for the blur pass

      const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {

        minFilter: THREE.LinearFilter,

        magFilter: THREE.LinearFilter,

        format: THREE.RGBAFormat,

        stencilBuffer: false

      });

      

      // Create a scene just for the blur effect

      const blurScene = new THREE.Scene();

      const blurCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

      

      // Gaussian blur shader for horizontal pass

      const hBlurMaterial = new THREE.ShaderMaterial({

        uniforms: {

          tDiffuse: { value: originalTexture },

          h: { value: 1.0 / rtWidth }

        },

        vertexShader: `

          varying vec2 vUv;

          void main() {

            vUv = uv;

            gl_Position = vec4(position, 1.0);

          }

        `,

        fragmentShader: `

          uniform sampler2D tDiffuse;

          uniform float h;

          varying vec2 vUv;

          

          void main() {

            vec4 sum = vec4(0.0);

            

            // 9-tap Gaussian blur (sigma ~= 3.0)

            sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.051;
   sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.01;
   sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.1;
   sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.051;
   sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.051;
   sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.051;
   sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.051;

            sum += texture2D(tDiffuse, vec2(vUv.x - 3.0*h, vUv.y)) * 0.0918;

            gl_FragColor = sum;

          }

        `

      });

      

      // Create render target for the vertical pass

      const renderTarget2 = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {

        minFilter: THREE.LinearFilter,

        magFilter: THREE.LinearFilter,

        format: THREE.RGBAFormat,

        stencilBuffer: false

      });

      

      // Gaussian blur shader for vertical pass

      const vBlurMaterial = new THREE.ShaderMaterial({

        uniforms: {

          tDiffuse: { value: null },

          v: { value: 1.0 / rtHeight }

        },

        vertexShader: `

          varying vec2 vUv;

          void main() {

            vUv = uv;

            gl_Position = vec4(position, 1.0);

          }

        `,

        fragmentShader: `

          uniform sampler2D tDiffuse;

          uniform float v;

          varying vec2 vUv;

          

          void main() {

            vec4 sum = vec4(0.0);

            

            // 9-tap Gaussian blur (sigma ~= 3.0)

          

         

            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 4.0*v)) * .9;

            

            gl_FragColor = sum;

          }

        `

      });

    

      // Plane geometry for shader passes

      const plane = new THREE.PlaneGeometry(2, 2);

      const quad = new THREE.Mesh(plane, hBlurMaterial);

      blurScene.add(quad);

      

      // First pass - horizontal blur

      renderer.setRenderTarget(renderTarget);

      renderer.render(blurScene, blurCamera);

      

      // Second pass - vertical blur

      vBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;

      quad.material = vBlurMaterial;

      renderer.setRenderTarget(renderTarget2);

      renderer.render(blurScene, blurCamera);

      

      // Reset render target

      renderer.setRenderTarget(null);

      

      // Update the background texture with the blurred one

      blurredTexture = renderTarget2.texture;

      

      // Apply blurred texture to background mesh

      bgMaterial.map = blurredTexture;

      bgMaterial.needsUpdate = true;

    };

    

    // Ensure the background image is set with proper parameters

    bgTexture.minFilter = THREE.LinearFilter;

    bgTexture.magFilter = THREE.LinearFilter;

    

    // Create a background plane that fills the view

    const bgCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const bgGeometry = new THREE.PlaneGeometry(2, 2);

    const bgMaterial = new THREE.MeshBasicMaterial({

      map: bgTexture,

      depthWrite: false

    });

    

    const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);

    const bgScene = new THREE.Scene();

    bgScene.add(bgMesh);

    

    const camera = new THREE.PerspectiveCamera(

      60,

      window.innerWidth / window.innerHeight,

      0.1,

      1000

    );

    camera.position.set(0, 10, 30);

    

    const renderer = new THREE.WebGLRenderer({

      canvas: canvasRef.current,

      antialias: true,

    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.setPixelRatio(window.devicePixelRatio);

    

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);

    directionalLight.position.set(10, 20, 10);

    scene.add(ambientLight);

    scene.add(directionalLight);

    

    const stepHeight = 1;

    const stepWidth = 5;

    const stepDepth = 2;

    const radius = 10;

    const angleStep = (Math.PI * 2) / journeyData.length;

    const stepsGroup = new THREE.Group();

    

    const stepMeshes = journeyData.map((item, index) => {

      const geometry = new THREE.BoxGeometry(stepWidth, stepHeight, stepDepth);

      const material = new THREE.MeshStandardMaterial({ color: item.color });

      const mesh = new THREE.Mesh(geometry, material);

      const angle = index * angleStep;

      mesh.position.set(

        radius * Math.cos(angle),

        index * (stepHeight + 0.2),

        radius * Math.sin(angle)

      );

      mesh.rotation.y = -angle;

      

      // Store the step index and data for tooltip use

      mesh.userData = {

        originalScale: new THREE.Vector3(1, 1, 1),

        stepIndex: index,

        isMainStep: true, // Add a flag to identify this as a main step object

        stepData: item

      };

      

      const canvas = document.createElement("canvas");

      canvas.width = 150;

      canvas.height = 40;

      const ctx = canvas.getContext("2d");

      ctx.font = "16px Arial";

      ctx.fillStyle = "#ffffff";

      ctx.textAlign = "center";

      

      // Set the text based on whether it's education or work experience

      let labelText = "";

      if (item.level) {

        labelText = `${item.level}`;

      } else {

        labelText = `${item.company}`;

      }

      

      ctx.fillText(

        labelText,

        canvas.width / 2,

        canvas.height / 2 + 5

      );

      

      const texture = new THREE.CanvasTexture(canvas);

      const labelMaterial = new THREE.MeshBasicMaterial({

        map: texture,

        transparent: true,

      });

      const labelGeometry = new THREE.PlaneGeometry(4, 1);

      const label = new THREE.Mesh(labelGeometry, labelMaterial);

      

      // Mark label as not a main step

      label.userData = {

        isMainStep: false,

      };

      label.position.set(0, stepHeight / 2 + 0.5, 0);

      mesh.add(label);

      stepsGroup.add(mesh);

      return mesh;

    });

    

    scene.add(stepsGroup);

    

    // Align Step 1 in front (+Z)

    const initialStepAngle = 90;

    const targetAngle = Math.PI / 2;

    const initialGroupRotation = targetAngle - initialStepAngle;

    stepsGroup.rotation.y = initialGroupRotation;

    

    // Initialize rotation time based on initial group rotation

    rotationTimeRef.current = stepsGroup.rotation.y / 0.4;

    camera.position.x = 30 * Math.sin(rotationTimeRef.current * 0.1);

    camera.position.z = 30 * Math.cos(rotationTimeRef.current * 0.1);

    camera.lookAt(new THREE.Vector3(0, journeyData.length / 2, 0));

    

    // Raycaster for detecting hovering over objects

    const raycaster = new THREE.Raycaster();

    const mouse = new THREE.Vector2();

    

    const handlePointerMove = (event) => {

      // Track mouse position

      const rect = renderer.domElement.getBoundingClientRect();

      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;

      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      

      // Update tooltip position

      setTooltipPosition({

        x: event.clientX,

        y: event.clientY - 50,

      });

      

      // Cast ray to detect objects

      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(scene.children, true);

      

      // Find the first intersection that is a main step (not a label)

      const mainStepIntersect = intersects.find(

        (intersect) =>

          intersect.object.userData &&

          intersect.object.userData.isMainStep === true

      );

      

      // Handle when not hovering over a main step

      if (!mainStepIntersect) {

        // If we were previously hovering over something, reset it

        if (hoveredStepRef.current) {

          hoveredStepRef.current.scale.set(1, 1, 1); // Reset scale

          hoveredStepRef.current = null;

        }

        isHoveredRef.current = false;

        setTooltipVisible(false);

        return;

      }

      

      // Handle hovering over a main step

      const hoveredObject = mainStepIntersect.object;

      isHoveredRef.current = true;

      

      // If it's a different object than before, reset old one and set up new one

      if (hoveredStepRef.current !== hoveredObject) {

        if (hoveredStepRef.current) {

          hoveredStepRef.current.scale.set(1, 1, 1); // Reset previous object

        }

        hoveredStepRef.current = hoveredObject;

        hoveredObject.scale.set(1.2, 1.2, 1.2); // Apply zoom effect

        

        // Update tooltip content based on the step data

        const stepData = hoveredObject.userData.stepData;

        let tooltipContent = "";

        

        if (stepData.level) {

          // Education format

          tooltipContent = `${stepData.level} at ${stepData.institution}${stepData.percentage ? ` (${stepData.percentage}%)` : ''}`;

        } else {

          // Work experience format

          tooltipContent = `${stepData.role} at ${stepData.company}${stepData.period ? ` (${stepData.period})` : ''}`;

        }

        

        setTooltipText(tooltipContent);

        setTooltipVisible(true);

      }

    };

    

    // Handle mouse leaving canvas

    const handlePointerLeave = () => {

      if (hoveredStepRef.current) {

        hoveredStepRef.current.scale.set(1, 1, 1);

        hoveredStepRef.current = null;

      }

      isHoveredRef.current = false;

      setTooltipVisible(false);

    };

    

    renderer.domElement.addEventListener("pointermove", handlePointerMove);

    renderer.domElement.addEventListener("pointerleave", handlePointerLeave);

    

    // Drag logic

    const handlePointerDown = (event) => {

      isDraggingRef.current = true;

      lastX.current = event.clientX;

    };

    

    const handlePointerMoveDrag = (event) => {

      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - lastX.current;

      lastX.current = event.clientX;

      const rotationDelta = deltaX * 0.005;

      stepsGroup.rotation.y += rotationDelta;

      

      // Update rotation time based on current group rotation

      // This ensures animation continues from current position

      rotationTimeRef.current = stepsGroup.rotation.y / 0.4;

      camera.position.x = 30 * Math.sin(rotationTimeRef.current * 0.1);

      camera.position.z = 30 * Math.cos(rotationTimeRef.current * 0.1);

      camera.lookAt(new THREE.Vector3(0, journeyData.length / 2, 0));

    };

    

    const handlePointerUp = () => {

      if (isDraggingRef.current) {

        // Capture the final rotation position to continue from there

        rotationTimeRef.current = stepsGroup.rotation.y / 0.4;

        isDraggingRef.current = false;

      }

    };

    

    renderer.domElement.addEventListener("pointerdown", handlePointerDown);

    renderer.domElement.addEventListener("pointermove", handlePointerMoveDrag);

    renderer.domElement.addEventListener("pointerup", handlePointerUp);

    document.addEventListener("pointerup", handlePointerUp); // Handle case when released outside canvas

    

    // Animation loop

    let animationId;

    let lastTime = Date.now();

    

    const animate = () => {

      animationId = requestAnimationFrame(animate);

      const now = Date.now();

      const delta = (now - lastTime) * 0.001;

      lastTime = now;

      

      // Only auto-rotate when not hovering and not dragging

      if (!isHoveredRef.current && !isDraggingRef.current) {

        // Increment rotation time and apply to group rotation

        rotationTimeRef.current += delta;

        stepsGroup.rotation.y = rotationTimeRef.current * 0.4;

        

        // Update camera position based on rotation time

        camera.position.x = 30 * Math.sin(rotationTimeRef.current * 0.1);

        camera.position.z = 30 * Math.cos(rotationTimeRef.current * 0.1);

        camera.lookAt(new THREE.Vector3(0, journeyData.length / 2, 0));

      }

      

      stepsGroup.children.forEach((stepMesh) => {

        const label = stepMesh.children[0];

        if (label) label.lookAt(camera.position);

      });

      

      // Render the background first

      renderer.autoClear = false;

      renderer.clear();

      renderer.render(bgScene, bgCamera);

      

      // Then render the main scene

      renderer.render(scene, camera);

    };

    

    animate();

    

    const handleResize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);

    };

    

    window.addEventListener("resize", handleResize);

    

    return () => {

      cancelAnimationFrame(animationId);

      renderer.dispose();

      window.removeEventListener("resize", handleResize);

      renderer.domElement.removeEventListener("pointermove", handlePointerMove);

      renderer.domElement.removeEventListener(

        "pointerleave",

        handlePointerLeave

      );

      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);

      renderer.domElement.removeEventListener(

        "pointermove",

        handlePointerMoveDrag

      );

      renderer.domElement.removeEventListener("pointerup", handlePointerUp);

      document.removeEventListener("pointerup", handlePointerUp);

    };

  }, []);

  

  return (

    <div className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">

      <div className="absolute top-0 left-0 w-full z-10">

      <p className="w-full p-2 !text-white !text-5xl text-center">My Journey so far!!</p>

      <div className="absolute left-[39%] !border-t-4 !border-teal-500 w-100 mb-16"></div>

      </div>

      

      <canvas

        ref={canvasRef}

        style={{ width: "100%", height: "100vh" }}

      />

      

      {tooltipVisible && (

        <div

          style={{

            position: "absolute",

            top: tooltipPosition.y,

            left: tooltipPosition.x,

            transform: "translate(-50%, -100%)",

            backgroundColor: "white",

            color: "black",

            padding: "8px 12px",

            borderRadius: "4px",

            fontSize: "14px",

            pointerEvents: "none",

            zIndex: 1000,

            whiteSpace: "nowrap",

            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",

            transition: "opacity 0.2s",

          }}

        >

          {tooltipText}

        </div>

      )}

    </div>

  );

};

 

export default ReactDeveloperJourney;

