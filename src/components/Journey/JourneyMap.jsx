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

  // Tooltip state

  const [tooltipVisible, setTooltipVisible] = useState(false);

  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const [tooltipText, setTooltipText] = useState("");

  const steps = [
    { color: "#1E3A8A" },

    { color: "#1D4ED8" },

    { color: "#16A34A" },

    { color: "#34D399" },

    { color: "#FBBF24" },

    { color: "#F59E0B" },

    { color: "#F97316" },

    { color: "#DC2626" },

    { color: "#B91C1C" },
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

    const angleStep = (Math.PI * 2) / steps.length;

    const stepsGroup = new THREE.Group();

    const stepMeshes = steps.map((step, index) => {
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

      // Store the step index for tooltip use

      mesh.userData = {
        originalScale: new THREE.Vector3(1, 1, 1),

        stepIndex: index,

        isMainStep: true, // Add a flag to identify this as a main step object
      };

      const canvas = document.createElement("canvas");

      canvas.width = 100;

      canvas.height = 24;

      const ctx = canvas.getContext("2d");

      ctx.font = "18px Arial";

      ctx.fillStyle = "#ffffff";

      ctx.textAlign = "center";

      ctx.fillText(
        `Step ${index + 1}`,
        canvas.width / 2,
        canvas.height / 2 + 10
      );

      const texture = new THREE.CanvasTexture(canvas);

      const labelMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });

      const labelGeometry = new THREE.PlaneGeometry(2.5, 0.6);

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

    camera.lookAt(new THREE.Vector3(0, steps.length / 2, 0));

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

        // Update tooltip content

        const stepNum = hoveredObject.userData.stepIndex + 1;

        setTooltipText(`Hello User! Welcome to Step ${stepNum}`);

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

      camera.lookAt(new THREE.Vector3(0, steps.length / 2, 0));
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

        camera.lookAt(new THREE.Vector3(0, steps.length / 2, 0));
      }

      stepsGroup.children.forEach((stepMesh) => {
        const label = stepMesh.children[0];

        if (label) label.lookAt(camera.position);
      });

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
      <p className="!w-full p-2 absolute pl-48 container bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white text-3xl">My Journey so far!!</p>
     <>
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
      </>
    </div>
  );
};

export default ReactDeveloperJourney;
