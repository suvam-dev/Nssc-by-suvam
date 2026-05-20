"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { motion } from "motion/react";
import Link from "next/link";
import { Compass, UserPlus } from "lucide-react";

export default function ThreeDLandingPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const headBoneRef = useRef<THREE.Object3D | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    // Camera setup - Pulled back slightly for the dancing animation details
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.5, 7);

    // WebGL Renderer setup with transparent alpha channel
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Ambient Lighting to illuminate the model evenly
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    // Core Directional Light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Subtle blue/purple backlight for an atmospheric space rim-light effect
    const backLight = new THREE.DirectionalLight(0x4444ff, 2);
    backLight.position.set(-5, 5, -5);
    scene.add(backLight);

    // Model Loading & Skeletal Traverse
    const gltfLoader = new GLTFLoader();
    let animationFrameId: number;
    const clock = new THREE.Clock();

    gltfLoader.load(
      "/assest/dancing_stormtrooper.glb",
      (gltf) => {
        const model = gltf.scene;

        // Position and scale adjusted perfectly so footwork isn't cut off on screen
        model.position.set(0, -2.5, 0);
        model.scale.set(1.25, 1.25, 1.25);
        scene.add(model);

        // Initialize Animation Mixer
        const mixer = new THREE.AnimationMixer(model);
        mixerRef.current = mixer;

        // Play the 0th dancing animation track
        if (gltf.animations.length > 0) {
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }

        // Traverse skeletal bones to find the head or neck for mouse tracking
        model.traverse((child) => {
          if (child instanceof THREE.Bone) {
            const boneName = child.name.toLowerCase();
            // Look for standard head/neck naming schemes in standard rigs
            if (!headBoneRef.current && (boneName.includes("head") || boneName.includes("neck"))) {
              headBoneRef.current = child;
            }
          }
        });

        setModelLoaded(true);
      },
      undefined,
      (error) => console.error("Error loading 3D model:", error)
    );

    // Mouse Tracking Logic
    const mouse = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates from -1 to +1
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Linear interpolation helper for seamless bone movements
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    // Responsive Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Animation / Render Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Update dancing animation mixer
      if (mixerRef.current) {
        mixerRef.current.update(delta);
      }

      // Smoothly update head bone rotation to track mouse movements safely
      if (headBoneRef.current) {
        // Limit head rotation bounds to prevent unnatural neck twists
        targetRotation.x = mouse.x * 0.6;
        targetRotation.y = -mouse.y * 0.6;

        // Apply smooth lerped rotation offsets
        headBoneRef.current.rotation.y = lerp(
          headBoneRef.current.rotation.y,
          targetRotation.x,
          0.05
        );
        headBoneRef.current.rotation.x = lerp(
          headBoneRef.current.rotation.x,
          targetRotation.y,
          0.05
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup WebGL contexts and observers
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <main className="w-screen h-screen bg-[#050505] overflow-hidden text-white font-sans relative flex items-center justify-center select-none">
      
      {/* 1. THREE.JS 3D CANVAS sitting in background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 outline-none"
      />

      {/* Ambient gradient layer */}
      <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 40%, #050505 100%) pointer-events-none z-1" />

      {/* 2. BRADING HEADER row (No navbar as requested) */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-10 flex items-center justify-between z-25 pointer-events-auto">
        {/* NSSC Logo Left */}
        <Link href="/" className="flex items-center gap-3 active:scale-95 transition-transform duration-300">
          <img
            src="/assest/logo.png"
            alt="NSSC Logo"
            className="h-10 md:h-12 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(0,191,255,0.45)]"
          />
        </Link>

        {/* ISRO & IIT Kharagpur logos right */}
        <div className="flex items-center gap-4 md:gap-8 bg-black/30 border border-gray-800/40 backdrop-blur-md rounded-2xl px-5 py-2.5 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg"
            alt="ISRO"
            className="h-7 md:h-9 w-auto object-contain"
          />
          <div className="w-[1px] h-6 bg-gray-800" />
          <img
            src="https://upload.wikimedia.org/wikipedia/en/2/21/IIT_Kharagpur_logo.png"
            alt="IIT Kharagpur"
            className="h-7 md:h-9 w-auto object-contain filter brightness-105"
          />
        </div>
      </header>

      {/* 3. HERO CONTENT OVERLAYS */}
      <div className="relative z-10 text-center flex flex-col items-center max-w-4xl px-4 pointer-events-none space-y-6">
        
        {/* Fest details header taglines */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-2 flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-7xl font-extrabold tracking-[0.2em] text-white uppercase font-sans filter drop-shadow-[0_0_15px_rgba(255,255,255,0.15)] leading-tight">
            NSSC 2025
          </h1>
          <h2 className="text-xs md:text-sm font-bold font-mono tracking-[0.45em] text-gray-300 uppercase">
            National Students' Space Challenge
          </h2>
        </motion.div>

        {/* Theme visual highlight taglines */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-1 py-4 flex flex-col items-center bg-black/40 border border-gray-800/40 backdrop-blur-sm rounded-3xl px-8 py-5 shadow-[0_0_20px_rgba(0,191,255,0.05)] border-dashed border-cyan-500/10"
        >
          <div className="flex items-center justify-center font-mono">
            <span className="text-xl md:text-3xl font-light tracking-[0.2em] text-cyan-400 italic">caelestia</span>
            <span className="text-xl md:text-3xl font-light text-gray-400 mx-4">|</span>
            <span className="text-xl md:text-3xl font-normal text-white tracking-[0.1em]">अन्वेषणा</span>
          </div>
          <p className="text-[10px] md:text-xs font-bold font-mono tracking-[0.55em] text-cyan-400 uppercase mt-2">
            DECODING THE COSMIC CYPHER
          </p>
        </motion.div>

        {/* 4. ACTIONS REDIRECT CTAs (Re-enabling click cursor events) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center gap-4 pt-6 pointer-events-auto"
        >
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-extrabold rounded-md shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.65)] hover:scale-105 transition-all duration-300 font-mono tracking-[0.15em] text-xs uppercase"
          >
            <Compass className="w-4 h-4 mr-2" />
            EXPLORE
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-white font-extrabold rounded-md border border-white/80 hover:bg-white hover:text-black hover:scale-105 transition-all duration-300 font-mono tracking-[0.15em] text-xs uppercase"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            REGISTER
          </Link>
        </motion.div>

      </div>

      {/* Subtle loader display while model files initialize */}
      {!modelLoaded && (
        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50 transition-opacity duration-700">
          <div className="space-y-4 text-center">
            <div className="w-10 h-10 border-t-2 border-r-2 border-cyan-400 rounded-full animate-spin mx-auto" />
            <p className="text-[10px] tracking-[0.4em] font-mono uppercase text-gray-500">Initializing WebGL Scene...</p>
          </div>
        </div>
      )}

    </main>
  );
}
