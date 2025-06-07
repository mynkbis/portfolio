import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const ReactDeveloperJourney = () => {
  const isHoveredRef = useRef(false);
  const hoveredStepRef = useRef(null);
  const isDraggingRef = useRef(false);
  const canvasRef = useRef(null);
  const [stepIndex, setStepIndex] = useState(0);
  const lastX = useRef(0);
  const rotationTimeRef = useRef(0);
  
  // Responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1920,
    height: typeof window !== 'undefined' ? window.innerHeight : 1080
  });
  
  // Tooltip state
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [tooltipText, setTooltipText] = useState("");

  const journeyData = [
    { level: "Secondary(2008)", institution: "KV", percentage: 76, color: "#1E3A8A" },
    { level: "Sr.Secondary(2010)", institution: "KV", percentage: 66, color: "#1D4ED8" },
    { level: "B.Tech(ECE-2014)", institution: "UTU", percentage: 70, color: "#16A34A" },
    { company: "MPS (2015-2017)", role: "QA", period: "1.5 years", color: "#34D399" },
    { company: "SCUF (2020-2022)", role: "Legal Executive", period: "1.6 years", color: "#FBBF24" },
    { company: "SOAL (2021-2022)", role: "Product Engineering", color: "#F97316" },
    { company: "DFS (2022-2023)", role: "Manager", period: "1.5 years", color: "#F59E0B" },
    { company: "Softprodigy (2023-Present)", role: "Associate Software Engineer", period: " (3+ years)", color: "#DC2626" },
  ];

  // Check if device is mobile and update dimensions
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const mobile = width < 768;
      const tablet = width >= 768 && width < 1024;
      const desktop = width >= 1024;
      
      setIsMobile(mobile);
      setIsTablet(tablet);
      setIsDesktop(desktop);
      
      setDimensions({
        width: width,
        height: height
      });
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    
    // Enhanced responsive camera settings
    const getResponsiveSettings = () => {
      const aspectRatio = dimensions.width / dimensions.height;
      const isPortrait = aspectRatio < 1;
      
     if (isMobile) {
  return {
    // fov: isPortrait ? 75 : 65,
    cameraDistance: isPortrait ? 45 : 38,
    radius: isPortrait ? 7 : 9,
    stepWidth: isPortrait ? 2.5 : 3.5,
    stepHeight: 0.7,
    stepDepth: isPortrait ? 1.2 : 1.6,
    labelSize: 14,
    labelHeight:.8,
    fontSize: 10,
    // Updated canvas dimensions
    canvasWidth: isPortrait ? 240 : 220,  // Increased width
    canvasHeight: isPortrait ? 16 : 20    // Decreased height
  }
      } else if (isTablet) {
        return {
          fov: isPortrait ? 65 : 60,
          cameraDistance: isPortrait ? 38 : 32,
          radius: isPortrait ? 9 : 11,
          stepWidth: isPortrait ? 3.5 : 4.5,
          stepHeight: 0.9,
          stepDepth: isPortrait ? 1.6 : 2,
          labelSize: isPortrait ? 3 : 3.5,
          labelHeight: 0.7,
          fontSize: 15,
          canvasWidth: isPortrait ? 190 : 210,
          canvasHeight: isPortrait ? 32 : 36
        };
      } else { // Desktop
        return {
          fov: 60,
          cameraDistance: 30,
          radius: 12,
          stepWidth: 5,
          stepHeight: 1,
          stepDepth: 2,
          labelSize: 4,
          labelHeight: 1,
          fontSize: 16,
          canvasWidth: 220,
          canvasHeight: 40
        };
      }
    };

    const settings = getResponsiveSettings();

    // Create a background with fallback color
    const textureLoader = new THREE.TextureLoader();
    const bgTexture = textureLoader.load(
      "",
      (texture) => {
        console.log("Background image loaded successfully");
        createBlurredBackground(texture);
      },
      undefined,
      (err) => {
        console.error("Error loading background image:", err);
        scene.background = new THREE.Color(0x000000);
      }
    );

    let blurredTexture = null;
    const createBlurredBackground = (originalTexture) => {
      const rtWidth = isMobile ? 2048 : isTablet ? 4096 : 8192;
      const rtHeight = isMobile ? 1536 : isTablet ? 3072 : 6144;
      
      const renderTarget = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      });

      const blurScene = new THREE.Scene();
      const blurCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

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
            sum += texture2D(tDiffuse, vec2(vUv.x - 4.0*h, vUv.y)) * 0.051;
            sum += texture2D(tDiffuse, vec2(vUv.x - 3.0*h, vUv.y)) * 0.09;
            sum += texture2D(tDiffuse, vec2(vUv.x - 2.0*h, vUv.y)) * 0.12;
            sum += texture2D(tDiffuse, vec2(vUv.x - 1.0*h, vUv.y)) * 0.15;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y)) * 0.16;
            sum += texture2D(tDiffuse, vec2(vUv.x + 1.0*h, vUv.y)) * 0.15;
            sum += texture2D(tDiffuse, vec2(vUv.x + 2.0*h, vUv.y)) * 0.12;
            sum += texture2D(tDiffuse, vec2(vUv.x + 3.0*h, vUv.y)) * 0.09;
            sum += texture2D(tDiffuse, vec2(vUv.x + 4.0*h, vUv.y)) * 0.051;
            gl_FragColor = sum;
          }
        `
      });

      const renderTarget2 = new THREE.WebGLRenderTarget(rtWidth, rtHeight, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      });

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
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 4.0*v)) * 0.051;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 3.0*v)) * 0.09;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 2.0*v)) * 0.12;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y - 1.0*v)) * 0.15;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y)) * 0.16;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 1.0*v)) * 0.15;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 2.0*v)) * 0.12;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 3.0*v)) * 0.09;
            sum += texture2D(tDiffuse, vec2(vUv.x, vUv.y + 4.0*v)) * 0.051;
            gl_FragColor = sum;
          }
        `
      });

      const plane = new THREE.PlaneGeometry(2, 2);
      const quad = new THREE.Mesh(plane, hBlurMaterial);
      blurScene.add(quad);

      renderer.setRenderTarget(renderTarget);
      renderer.render(blurScene, blurCamera);

      vBlurMaterial.uniforms.tDiffuse.value = renderTarget.texture;
      quad.material = vBlurMaterial;
      renderer.setRenderTarget(renderTarget2);
      renderer.render(blurScene, blurCamera);

      renderer.setRenderTarget(null);
      blurredTexture = renderTarget2.texture;
      bgMaterial.map = blurredTexture;
      bgMaterial.needsUpdate = true;
    };

    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;

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
      settings.fov,
      dimensions.width / dimensions.height,
      0.1,
      1000
    );
    camera.position.set(0, 10, settings.cameraDistance);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: !isMobile, // Disable antialiasing on mobile for better performance
      powerPreference: isMobile ? "low-power" : "high-performance"
    });
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 2 : isTablet ? 2.5 : 3));

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(ambientLight);
    scene.add(directionalLight);

    const angleStep = (Math.PI * 2) / journeyData.length;
    const stepsGroup = new THREE.Group();
    
    const stepMeshes = journeyData.map((item, index) => {
      const geometry = new THREE.BoxGeometry(settings.stepWidth, settings.stepHeight, settings.stepDepth);
      const material = new THREE.MeshStandardMaterial({ color: item.color });
      const mesh = new THREE.Mesh(geometry, material);
      
      const angle = index * angleStep;
      mesh.position.set(
        settings.radius * Math.cos(angle),
        index * (settings.stepHeight + 0.2),
        settings.radius * Math.sin(angle)
      );
      mesh.rotation.y = -angle;

      mesh.userData = {
        originalScale: new THREE.Vector3(1, 1, 1),
        stepIndex: index,
        isMainStep: true,
        stepData: item
      };

      // Responsive canvas text
      const canvas = document.createElement("canvas");
      canvas.width = settings.canvasWidth;
      canvas.height = settings.canvasHeight;
      const ctx = canvas.getContext("2d");
      ctx.font = `${settings.fontSize}px Arial`;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";

      let labelText = "";
      if (item.level) {
        // Responsive text handling
        if (isMobile && dimensions.width < 480) {
          // Very small screens - just show level type
          labelText = item.level.split(' ')[0];
        } else if (isMobile) {
          // Mobile - remove year
          labelText = item.level.replace(/\s*\(\d{4}\)/, '');
        } else {
          labelText = item.level;
        }
      } else {
        if (isMobile && dimensions.width < 480) {
          // Very small screens - just show company
          labelText = item.company;
        } else {
          labelText = item.company;
        }
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
      const labelGeometry = new THREE.PlaneGeometry(settings.labelSize, settings.labelHeight);
      const label = new THREE.Mesh(labelGeometry, labelMaterial);

      label.userData = {
        isMainStep: false,
      };
      label.position.set(0, settings.stepHeight / 2 + 0.5, 0);
      mesh.add(label);
      stepsGroup.add(mesh);
      return mesh;
    });

    scene.add(stepsGroup);

    const initialStepAngle = 90;
    const targetAngle = Math.PI / 2;
    const initialGroupRotation = targetAngle - initialStepAngle;
    stepsGroup.rotation.y = initialGroupRotation;

    rotationTimeRef.current = stepsGroup.rotation.y / 0.25;
    camera.position.x = settings.cameraDistance * Math.sin(rotationTimeRef.current * 0.1);
    camera.position.z = settings.cameraDistance * Math.cos(rotationTimeRef.current * 0.1);
    camera.lookAt(new THREE.Vector3(0, journeyData.length / 1, 0));

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Responsive tooltip positioning
      const tooltipOffset = isMobile ? 70 : isTablet ? 60 : 50;
      setTooltipPosition({
        x: event.clientX,
        y: event.clientY - tooltipOffset,
      });

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      const mainStepIntersect = intersects.find(
        (intersect) =>
          intersect.object.userData &&
          intersect.object.userData.isMainStep === true
      );

      if (!mainStepIntersect) {
        if (hoveredStepRef.current) {
          hoveredStepRef.current.scale.set(1, 1, 1);
          hoveredStepRef.current = null;
        }
        isHoveredRef.current = false;
        setTooltipVisible(false);
        return;
      }

      const hoveredObject = mainStepIntersect.object;
      isHoveredRef.current = true;

      if (hoveredStepRef.current !== hoveredObject) {
        if (hoveredStepRef.current) {
          hoveredStepRef.current.scale.set(1, 1, 1);
        }
        hoveredStepRef.current = hoveredObject;
        
        // Responsive scale effect
        const scaleValue = isMobile ? 1.1 : isTablet ? 1.15 : 1.2;
        hoveredObject.scale.set(scaleValue, scaleValue, scaleValue);

        const stepData = hoveredObject.userData.stepData;
        let tooltipContent = "";
        if (stepData.level) {
          tooltipContent = `${stepData.level} at ${stepData.institution}${stepData.percentage ? ` (${stepData.percentage}%)` : ''}`;
        } else {
          tooltipContent = `${stepData.role} at ${stepData.company}${stepData.period ? ` (${stepData.period})` : ''}`;
        }
        setTooltipText(tooltipContent);
        setTooltipVisible(true);
      }
    };

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

    // Touch-friendly drag controls
    const handlePointerDown = (event) => {
      isDraggingRef.current = true;
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      lastX.current = clientX;
    };

    const handlePointerMoveDrag = (event) => {
      if (!isDraggingRef.current) return;
      
      const clientX = event.clientX || (event.touches && event.touches[0].clientX);
      const deltaX = clientX - lastX.current;
      lastX.current = clientX;
      
      // Device-specific rotation sensitivity
      let rotationSensitivity;
      if (isMobile) {
        rotationSensitivity = 0.01;
      } else if (isTablet) {
        rotationSensitivity = 0.008;
      } else {
        rotationSensitivity = 0.005;
      }
      
      const rotationDelta = deltaX * rotationSensitivity;
      stepsGroup.rotation.y += rotationDelta;

      rotationTimeRef.current = stepsGroup.rotation.y / 0.4;
      camera.position.x = settings.cameraDistance * Math.sin(rotationTimeRef.current * 0.1);
      camera.position.z = settings.cameraDistance * Math.cos(rotationTimeRef.current * 0.1);
      camera.lookAt(new THREE.Vector3(0, journeyData.length / 2, 0));
    };

    const handlePointerUp = () => {
      if (isDraggingRef.current) {
        rotationTimeRef.current = stepsGroup.rotation.y / 0.4;
        isDraggingRef.current = false;
      }
    };

    // Add all pointer and touch events
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMoveDrag);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);
    renderer.domElement.addEventListener("touchstart", handlePointerDown, { passive: true });
    renderer.domElement.addEventListener("touchmove", handlePointerMoveDrag, { passive: true });
    renderer.domElement.addEventListener("touchend", handlePointerUp, { passive: true });
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("touchend", handlePointerUp, { passive: true });

    let animationId;
    let lastTime = Date.now();
    
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const now = Date.now();
      const delta = (now - lastTime) * 0.001;
      lastTime = now;

      if (!isHoveredRef.current && !isDraggingRef.current) {
        rotationTimeRef.current += delta;
        stepsGroup.rotation.y = rotationTimeRef.current * 0.4;

        camera.position.x = settings.cameraDistance * Math.sin(rotationTimeRef.current * 0.1);
        camera.position.z = settings.cameraDistance * Math.cos(rotationTimeRef.current * 0.1);
        camera.lookAt(new THREE.Vector3(0, journeyData.length / 2, 0));
      }

      stepsGroup.children.forEach((stepMesh) => {
        const label = stepMesh.children[0];
        if (label) label.lookAt(camera.position);
      });

      renderer.autoClear = false;
      renderer.clear();
      renderer.render(bgScene, bgCamera);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      
      // Update dimensions state - this will trigger a re-render
      setDimensions({ width: newWidth, height: newHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerleave", handlePointerLeave);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMoveDrag);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      renderer.domElement.removeEventListener("touchstart", handlePointerDown);
      renderer.domElement.removeEventListener("touchmove", handlePointerMoveDrag);
      renderer.domElement.removeEventListener("touchend", handlePointerUp);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("touchend", handlePointerUp);
    };
  }, [dimensions, isMobile, isTablet, isDesktop]); // Re-run when device state changes

  // Get responsive title classes
  const getTitleClasses = () => {
    if (isMobile) {
      return dimensions.width < 480 
        ? 'text-2xl sm:text-3xl' 
        : 'text-3xl sm:text-4xl';
    } else if (isTablet) {
      return 'text-4xl md:text-5xl';
    } else {
      return 'text-5xl md:text-6xl lg:text-7xl';
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
      <div className="absolute top-0 left-0 w-full z-10 px-2 sm:px-4">
        <p className={`w-full p-2 text-white text-center mt-2 sm:mt-4 font-bold ${getTitleClasses()}`}>
          My Journey so far!!
        </p>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-screen"
        style={{ 
          touchAction: "none" // Prevent default touch behaviors for better control
        }}
      />
      {tooltipVisible && (
        <div
          className="absolute bg-white text-black rounded shadow-lg text-wrap pointer-events-none z-[1000] transition-opacity duration-200"
          style={{
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            transform: "translate(-50%, -100%)",
            padding: isMobile ? "6px 10px" : isTablet ? "7px 11px" : "8px 12px",
            fontSize: isMobile ? "11px" : isTablet ? "13px" : "14px",
            maxWidth: isMobile ? "180px" : isTablet ? "250px" : "300px",
            wordWrap: "break-word",
          }}
        >
          {tooltipText}
        </div>
      )}
    </div>
  );
};

export default ReactDeveloperJourney;