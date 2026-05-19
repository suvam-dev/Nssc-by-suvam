"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  Laptop, 
  PlaneTakeoff, 
  Calendar, 
  Award, 
  Users, 
  Hourglass, 
  Globe,
  Sparkles
} from "lucide-react";

// Custom dynamic count-up component triggering on viewport intersection
const Counter = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );
    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}</span>;
};

// Premium custom SVG Logo for spAts (Space Technology Students' Society)
const SpatsLogo = () => {
  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-black/40 rounded-full border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] p-4 group">
      {/* Glow outer ring */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/30 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
      <div className="absolute -inset-1 rounded-full bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />
      
      <svg width="100%" height="100%" viewBox="0 0 240 240" className="w-full h-full">
        <defs>
          <path id="spatsPathTop" d="M 35,120 A 85,85 0 0,1 205,120" fill="none" />
          <path id="spatsPathBottom" d="M 205,120 A 85,85 0 0,1 35,120" fill="none" />
          <radialGradient id="spatsCenterGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00bfff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Animated outer spinning dashes */}
        <circle 
          cx="120" 
          cy="120" 
          r="108" 
          stroke="#00bfff" 
          strokeWidth="1" 
          strokeDasharray="6 8" 
          className="animate-spin" 
          style={{ animationDuration: "40s" }} 
          fill="none" 
          opacity="0.35" 
        />
        
        {/* Inner solid circular track */}
        <circle cx="120" cy="120" r="92" stroke="#00bfff" strokeWidth="1.5" fill="none" opacity="0.4" />

        {/* Dynamic nebulous core */}
        <circle cx="120" cy="120" r="40" fill="url(#spatsCenterGlow)" />
        <circle cx="120" cy="120" r="22" fill="#030712" stroke="#00bfff" strokeWidth="2" />
        
        {/* Saturn-like orbital ellipse */}
        <ellipse 
          cx="120" 
          cy="120" 
          rx="72" 
          ry="16" 
          stroke="#ffffff" 
          strokeWidth="2" 
          fill="none" 
          transform="rotate(-22 120 120)" 
          opacity="0.8" 
        />

        {/* Orbiting dot/satellite */}
        <circle cx="180" cy="95" r="4.5" fill="#ffffff" className="animate-pulse" />

        {/* Curved Labels in Space Fonts */}
        <text fill="#ffffff" fontSize="9.5" fontWeight="bold" letterSpacing="3.2" className="font-mono">
          <textPath href="#spatsPathTop" startOffset="50%" textAnchor="middle">
            SPACE TECHNOLOGY
          </textPath>
        </text>
        <text fill="#00bfff" fontSize="9" fontWeight="bold" letterSpacing="3.2" className="font-mono">
          <textPath href="#spatsPathBottom" startOffset="50%" textAnchor="middle">
            STUDENTS' SOCIETY
          </textPath>
        </text>
      </svg>
    </div>
  );
};

// Premium custom SVG Logo for NSSC (National Students' Space Challenge)
const NsscLogo = () => {
  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-black/40 rounded-full border border-cyan-500/20 shadow-[0_0_30px_rgba(6,182,212,0.1)] p-4 group">
      {/* Glow outer ring */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/30 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
      <div className="absolute -inset-1 rounded-full bg-cyan-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none" />

      <svg width="100%" height="100%" viewBox="0 0 240 240" className="w-full h-full">
        <defs>
          <linearGradient id="nsscPlanetGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="60%" stopColor="#111827" />
            <stop offset="100%" stopColor="#00bfff" />
          </linearGradient>
          <filter id="nsscGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Outer dash track */}
        <circle cx="120" cy="120" r="105" stroke="#00bfff" strokeWidth="1" fill="none" opacity="0.3" />
        <circle cx="120" cy="120" r="92" stroke="#00bfff" strokeWidth="1.5" strokeDasharray="12 6" fill="none" opacity="0.6" />

        {/* Core Planet */}
        <circle cx="120" cy="120" r="50" fill="url(#nsscPlanetGrad)" />
        
        {/* Shadow Overlay */}
        <path d="M 70,120 A 50,50 0 0,0 170,120 A 50,42 0 0,1 70,120" fill="#00bfff" opacity="0.25" />
        
        {/* Soaring Trajectory Swoosh */}
        <path d="M 50,185 Q 120,175 180,95 T 212,35" fill="none" stroke="#00bfff" strokeWidth="2.5" filter="url(#nsscGlow)" />
        <path d="M 50,185 Q 120,175 180,95 T 212,35" fill="none" stroke="#ffffff" strokeWidth="1" />
        
        {/* Soaring Rocket Silhouette */}
        <g transform="translate(204, 30) rotate(32)">
          <path d="M0,-11 L3.5,0 L1.8,3.5 L-1.8,3.5 L-3.5,0 Z" fill="#ffffff" />
          <path d="M-1.8,3.5 L0,7.5 L1.8,3.5 Z" fill="#ff5500" />
        </g>
        
        {/* Footer Typography */}
        <text x="120" y="215" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="bold" letterSpacing="4.5" className="font-mono">
          NSSC KGP
        </text>
      </svg>
    </div>
  );
};

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState(3); // 4th timeline card selected by default

  const achievements = [
    { value: 13, label: "Successful Years", suffix: "+", icon: <Hourglass className="w-5 h-5 text-cyan-400" /> },
    { value: 150, label: "STAC", suffix: "+", icon: <Globe className="w-5 h-5 text-cyan-400" /> },
    { value: 1500, label: "Yearly participants", suffix: "+", icon: <Users className="w-5 h-5 text-cyan-400" /> },
    { value: 12000, label: "Total participants", suffix: "+", icon: <Award className="w-5 h-5 text-cyan-400" /> },
  ];

  const milestones = [
    {
      date: "18th September",
      event: "Registration for NSSC starts",
      icon: <UserPlus className="w-6 h-6 text-cyan-400" />
    },
    {
      date: "18th September",
      event: "Online events start",
      icon: <Laptop className="w-6 h-6 text-cyan-400" />
    },
    {
      date: "7th November",
      event: "Reporting for NSSC",
      icon: <PlaneTakeoff className="w-6 h-6 text-cyan-400" />
    },
    {
      date: "7th-9th November",
      event: "NSSC 2025",
      icon: <Calendar className="w-6 h-6 text-cyan-400" />
    }
  ];

  return (
    <main className="w-full min-h-screen bg-transparent text-white relative overflow-hidden flex flex-col items-center">
      
      {/* BACKGROUND NEBULA GLOWS */}
      <div className="absolute top-[10%] left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[50%] right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] left-1/3 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-[130px] pointer-events-none -z-10" />

      {/* ── SECTION 1: HERO CONTAINER ── */}
      <div className="w-full relative min-h-[75vh] md:min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden border-b border-gray-800/60">
        
        {/* Background photorealistic space landscape */}
        <div 
          className="absolute inset-0 bg-cover bg-center -z-20 opacity-90 scale-[1.02]" 
          style={{ backgroundImage: "url('/assest/lunar_surface_earth_view.png')" }} 
        />
        
        {/* Elegant overlay shading mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-[#000000]/60 to-[#000000]/30 -z-10" />
        <div className="absolute inset-0 bg-radial-gradient(ellipse at center, transparent 30%, #000000 100%) -z-10" />

        {/* Hero content details */}
        <div className="text-center max-w-4xl relative z-10 space-y-6 px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs md:text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>ESTABLISHED 2008</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-8xl font-extrabold tracking-wider bg-gradient-to-r from-white via-cyan-200 to-[#00bfff] bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(0,191,255,0.2)]"
          >
            NSSC 2025
          </motion.h1>

          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg md:text-3xl font-light uppercase tracking-[0.25em] text-gray-300 font-mono"
          >
            Asia's Largest Astrotech Fest
          </motion.h3>
        </div>

        {/* Sleek bottom scroll-down indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 flex flex-col items-center gap-1.5 opacity-60"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase font-mono">EXPLORE MISSION</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#00bfff] to-transparent shadow-[0_0_8px_#00bfff]" />
        </motion.div>
      </div>

      {/* ── SECTION 2: THE NARRATIVE READS ── */}
      <div className="w-full max-w-7xl px-4 md:px-8 py-24 space-y-32 relative z-10">
        
        {/* NARRATIVE BLOCK 1: spAts */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Logo Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 flex justify-center order-2 lg:order-1"
          >
            <SpatsLogo />
          </motion.div>

          {/* Description Container Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8 order-1 lg:order-2 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.3em] text-[#00bfff] font-mono uppercase">FOUNDING STUDENT BODY</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">Space Technology Students' Society</h2>
            </div>
            
            <div className="relative p-6 md:p-8 rounded-3xl bg-black/40 border border-gray-800/80 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-500 text-gray-300 text-sm md:text-base font-light leading-relaxed space-y-4">
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#00bfff]/30 to-transparent" />
              <p>
                Space Technology Students' Society, or <strong className="text-cyan-400 font-semibold font-mono">spAts</strong>, is the official student body under the Kalpana Chawla Space Technology Cell, IIT Kharagpur. Established in 2008 by a small group of young and ambitious undergraduate students, spAts had humble beginnings.
              </p>
              <p>
                A small club founded as a congregation of students with a common interest called space, spAts started as an ordinary student-run society with big ambitions. Since its inception, the society has seen multiple changes. From what used to be a regular space discussion forum, spAts evolved into a professionally run society that hosts many events, along with the first and largest space technology fest in India, the National Students' Space Challenge.
              </p>
            </div>
          </motion.div>
        </div>

        {/* NARRATIVE BLOCK 2: NSSC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Description Container Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-8 space-y-6"
          >
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-[0.3em] text-[#00bfff] font-mono uppercase">OUR flagship ORBITAL</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide uppercase">National Students' Space Challenge</h2>
            </div>
            
            <div className="relative p-6 md:p-8 rounded-3xl bg-black/40 border border-gray-800/80 backdrop-blur-md hover:border-cyan-500/30 transition-all duration-500 text-gray-300 text-sm md:text-base font-light leading-relaxed space-y-4">
              <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#00bfff]/30 to-transparent" />
              <p>
                The National Students' Space Challenge (<strong className="text-[#00bfff] font-bold font-mono">NSSC</strong>) is the centrepiece of spAts. As the name suggests, NSSC is a national-level fest dedicated solely towards space and space technology.
              </p>
              <p>
                The fest began in 2011 when the society decided to independently host a fest to provide a platform to the aspiring engineers and scientists of India who were only waiting for an opportunity to showcase their talents. Various other events, such as autonomous and manual bot-making, space quizzes, case studies and astrophotography, have been added over the years. Besides the events, the National Students' Space Challenge is famous for its supremely successful guest lectures, exhibitions and workshops.
              </p>
            </div>
          </motion.div>

          {/* Logo Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 flex justify-center"
          >
            <NsscLogo />
          </motion.div>
        </div>

      </div>

      {/* ── SECTION 3: ANIMATED STATS COUNTERS ── */}
      <div className="w-full max-w-7xl px-4 md:px-8 py-20 relative z-10">
        
        {/* Glow Header */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-xs font-bold tracking-[0.3em] text-[#00bfff] font-mono uppercase">METRICS & INFLUENCE</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-wider uppercase">Our Achievements</h2>
        </div>

        {/* stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, borderColor: "rgba(6,182,212,0.4)" }}
              className="relative overflow-hidden p-8 rounded-3xl bg-black/40 border border-gray-800/80 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-[0_0_20px_rgba(0,191,255,0.02)] transition-all duration-300 group"
            >
              {/* Dynamic top gradient path */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#00bfff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Floating glass overlay sphere */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-cyan-500/5 rounded-full blur-lg group-hover:bg-cyan-500/10 transition-all duration-500" />

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-500">
                {item.icon}
              </div>

              {/* Number with dynamic rolling counter */}
              <div className="text-4xl md:text-5xl font-black font-mono tracking-tight text-white mb-2 filter drop-shadow-[0_0_8px_rgba(0,191,255,0.15)] flex items-center">
                <Counter end={item.value} />
                <span className="text-[#00bfff] ml-0.5">{item.suffix}</span>
              </div>

              {/* Label */}
              <p className="text-xs uppercase tracking-widest text-gray-400 font-medium font-mono">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── SECTION 4: HORIZONTAL DYNAMIC TIMELINE ── */}
      <div className="w-full max-w-6xl px-4 md:px-8 py-24 pb-36 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20 space-y-2">
          <span className="text-xs font-bold tracking-[0.3em] text-[#00bfff] font-mono uppercase">LAUNCH SEQUENCE & MILESTONES</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-wider uppercase">Timeline</h2>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {milestones.map((item, index) => {
            const isActive = activeTimeline === index;
            return (
              <motion.div
                key={index}
                onMouseEnter={() => setActiveTimeline(index)}
                onClick={() => setActiveTimeline(index)}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`relative p-6 rounded-3xl bg-black/40 border transition-all duration-500 cursor-pointer flex flex-col items-center text-center backdrop-blur-md select-none group ${
                  isActive
                    ? "border-[#00bfff] shadow-[0_0_25px_rgba(0,191,255,0.2)] bg-black/60 scale-105"
                    : "border-gray-800/80 hover:border-gray-600 hover:shadow-[0_0_15px_rgba(0,191,255,0.08)]"
                }`}
              >
                {/* Micro accent top glow */}
                <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#00bfff]/40 to-transparent transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                }`} />

                {/* Floating bubble background */}
                <div className={`absolute -inset-1 rounded-3xl bg-cyan-500/5 blur-xl transition-opacity duration-500 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`} />

                {/* Icon wrapper */}
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 transition-all duration-500 ${
                  isActive
                    ? "bg-[#00bfff] border-[#00bfff] text-black shadow-[0_0_15px_rgba(0,191,255,0.4)] scale-110"
                    : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400 group-hover:scale-105"
                }`}>
                  {React.cloneElement(item.icon, {
                    className: `w-6 h-6 transition-colors duration-500 ${isActive ? "text-neutral-900" : "text-cyan-400"}`
                  })}
                </div>

                {/* Date */}
                <h3 className={`text-lg font-bold font-mono tracking-wide mb-2 transition-colors duration-300 ${
                  isActive ? "text-[#00bfff]" : "text-white"
                }`}>
                  {item.date}
                </h3>

                {/* Event Description */}
                <p className="text-xs text-gray-400 font-light leading-relaxed">
                  {item.event}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Slider Track (Bottom Axis Line) */}
        <div className="w-full relative mt-20 h-[3px] bg-gray-800/50 rounded-full hidden lg:block">
          
          {/* Active progress fill line */}
          <motion.div 
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00bfff]/30 to-[#00bfff] shadow-[0_0_8px_#00bfff]"
            animate={{ 
              width: activeTimeline === 0 ? "15%" : activeTimeline === 1 ? "38%" : activeTimeline === 2 ? "61%" : "85%" 
            }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
          />

          {/* Sliding interactive pointer handle */}
          <motion.div
            className="absolute -top-[5px] w-3.5 h-3.5 rounded-full bg-white border-2 border-[#00bfff] shadow-[0_0_12px_#00bfff] cursor-grab flex items-center justify-center"
            animate={{ 
              left: activeTimeline === 0 ? "15%" : activeTimeline === 1 ? "38%" : activeTimeline === 2 ? "61%" : "85%"
            }}
            transition={{ type: "spring", stiffness: 100, damping: 18 }}
            style={{ x: "-50%" }}
          >
            {/* Pulsing inner dot */}
            <div className="w-1.5 h-1.5 rounded-full bg-[#00bfff] animate-ping" />
          </motion.div>
        </div>

      </div>

    </main>
  );
}
