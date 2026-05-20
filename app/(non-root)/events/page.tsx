"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Users, 
  BookOpen, 
  FileText, 
  X, 
  Sparkles, 
  ChevronRight 
} from "lucide-react";

interface EventData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  rules: string[];
  prizePool: string;
  teamSize: string;
  category: "robotics_field" | "astro_tech" | "creative_research";
  image: string;
}

const eventsData: EventData[] = [
  {
    id: "ares",
    name: "ARES",
    tagline: "Design and simulate the next-generation planetary rover.",
    category: "robotics_field",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=800",
    description: "NSSC's premier flagship space robotics challenge. Teams are tasked with designing and simulating an autonomous space rover capable of traversing harsh planetary terrains, identifying hazards, and collecting soil samples.",
    prizePool: "₹50,000",
    teamSize: "2 - 5 Members",
    rules: [
      "The bot must navigate the simulated alien terrain autonomously without any human manual override.",
      "Custom rover configurations must satisfy the strict size and weight thresholds (30x30x30 cm max).",
      "Points will be awarded based on hazard detection, mapping resolution, and exploration completion speed.",
      "A complete system design document and control code must be submitted prior to simulation testing."
    ]
  },
  {
    id: "maze-runner",
    name: "Maze Runner",
    tagline: "Navigate the unknown. Program your bot to solve the labyrinth.",
    category: "robotics_field",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=800",
    description: "Design an autonomous, sensor-equipped micro-mouse bot capable of mapping and exploring a complex, dynamic maze in the shortest time. A test of advanced dead-reckoning, navigation, and graph traversal algorithms.",
    prizePool: "₹25,000",
    teamSize: "1 - 3 Members",
    rules: [
      "The bot must be completely autonomous; no active remote control is permitted during runs.",
      "Only on-board computational units and optical/IR sensors may be used for real-time navigation.",
      "Each team gets a maximum of three runs; the fastest successful navigation determines final placement.",
      "Pre-programmed maze maps are strictly forbidden. The bot must solve the labyrinth live."
    ]
  },
  {
    id: "lift-off",
    name: "Lift Off",
    tagline: "Master aerodynamics. Launch your water rocket to the skies.",
    category: "robotics_field",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=800",
    description: "NSSC's legendary water rocketry event! Fabricate a high-performance rocket using plastic bottles, water, and compressed air, and launch it to achieve maximum airtime and landing precision.",
    prizePool: "₹30,000",
    teamSize: "2 - 4 Members",
    rules: [
      "Rockets must be propelled solely by compressed air and water. Chemical propellants are strictly forbidden.",
      "Launcher mechanisms must satisfy engineering safety criteria and provide stable release vectors.",
      "All rockets must undergo a structural pressure test (Burst Test) at 60 PSI before being cleared for launch.",
      "Scores are computed from a weighted average of total flight duration (airtime) and spot landing precision."
    ]
  },
  {
    id: "eggstravaganza",
    name: "Eggstravaganza",
    tagline: "Protect the payload. Land the egg astronaut safely.",
    category: "robotics_field",
    image: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=800",
    description: "Design and construct a passive landing capsule that can successfully protect a raw egg 'astronaut' from breaking upon impact from extreme heights. A hands-on test of mechanics and impact dissipation.",
    prizePool: "₹15,000",
    teamSize: "1 - 3 Members",
    rules: [
      "Only the provided pack of raw materials (straws, rubber bands, tape, paper) can be used to construct the capsule.",
      "Parachutes, gliders, or motorized dampening devices are completely disallowed.",
      "The egg must remain completely uncracked after drop impact to qualify for measurement.",
      "The lightest successful landing capsule that preserves the egg scores the highest points."
    ]
  },
  {
    id: "astrobyte",
    name: "Astrobyte",
    tagline: "Code the cosmos. Solve astrophysical puzzles in python.",
    category: "astro_tech",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800",
    description: "A high-octane coding hackathon that bridges computer science and astrophysics. Analyze astronomical big data, trace light spectra, or compute relativity geometries using efficient, elegant code.",
    prizePool: "₹25,000",
    teamSize: "1 - 3 Members",
    rules: [
      "All codebase submissions must be written in Python, C++, or Julia and submitted within the 24-hour sprint.",
      "Use of open-source frameworks is allowed, but the underlying data processing algorithm must be original.",
      "Solutions will be automatically tested on a cloud sandbox against hidden astronomical test sets.",
      "Evaluation is strictly based on numerical precision, computational complexity, and execution speed."
    ]
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    tagline: "Extract insights. Decode massive satellite datasets.",
    category: "astro_tech",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800",
    description: "Deep dive into cosmological datasets. Build robust regression or classification models to detect exoplanet transits from light curves, identify star clusters, or track orbital anomalies.",
    prizePool: "₹25,000",
    teamSize: "1 - 3 Members",
    rules: [
      "Teams must submit a clean Jupyter Notebook containing extensive EDA, model training, and cross-validation.",
      "Final models will be executed against a private test set; F1-score and Log-Loss will determine the ranking.",
      "Feature engineering methodology and statistical choices must be clearly detailed in the notebook markdowns."
    ]
  },
  {
    id: "cosmomath",
    name: "Cosmomath",
    tagline: "Solve the cosmic equations. Master mathematical space physics.",
    category: "astro_tech",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800",
    description: "A highly challenging exam pushing the boundaries of mathematics. Solve intense problems in orbital trajectories, celestial mechanics, quantum gravity mathematics, and general relativity.",
    prizePool: "₹15,000",
    teamSize: "Individual",
    rules: [
      "This is an individual invigilated examination composed of numerical-entry and proof-based questions.",
      "Scientific calculators are permitted, but programmable calculators or online aids are strictly banned.",
      "Marks are awarded for both the final numeric solution and the mathematical rigour shown in working steps."
    ]
  },
  {
    id: "space-quiz",
    name: "Space Quiz",
    tagline: "Test your trivia. Prove your mastery of space exploration history.",
    category: "astro_tech",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
    description: "NSSC's flagship space trivia contest. Benchmark your knowledge against space enthusiasts nationwide across topics spanning NASA/ISRO mission histories, astrophysics breakthroughs, and sci-fi trivia.",
    prizePool: "₹15,000",
    teamSize: "1 - 2 Members",
    rules: [
      "The competition consists of a written preliminary round, leading to an offline stage finale.",
      "Questions cover historical space missions, astronautics milestones, cosmology, and astrophotography slides.",
      "In all rounds, the quizmaster's decision is final and binding on all participating teams."
    ]
  },
  {
    id: "case-study",
    name: "Case Study",
    tagline: "Architect space policy. Solve core industry bottlenecks.",
    category: "creative_research",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800",
    description: "A conceptual case analysis event challenging participants to address pressing obstacles in the space industry, such as orbital debris cleanup networks, lunar mining economies, or Mars colonization rules.",
    prizePool: "₹30,000",
    teamSize: "2 - 4 Members",
    rules: [
      "Teams must submit an initial abstract (PDF) framing their technical and financial proposal.",
      "Shortlisted teams will present their structural slide-deck to a panel of ISRO experts and academic professors.",
      "Evaluation hinges on technical feasibility, budget models, risk management, and presentation effectiveness."
    ]
  },
  {
    id: "paper-presentation",
    name: "Paper Presentation",
    tagline: "Publish your thesis. Present cutting-edge space research.",
    category: "creative_research",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800",
    description: "The ideal academic stage to present original research papers and technical designs. Showcase your innovations in rockets, aerospace fuels, microgravity materials, or space telescopes.",
    prizePool: "₹25,000",
    teamSize: "1 - 3 Members",
    rules: [
      "Abstracts and full research papers must be formatted strictly in IEEE or AIP style guides.",
      "All submissions will undergo plagiarism checks; a similarity score exceeding 10% will cause instant disqualification.",
      "Finalists will present their work for 8 minutes, followed by a live 4-minute Q&A with the expert jury."
    ]
  },
  {
    id: "pitch-the-cosmos",
    name: "Pitch The Cosmos",
    tagline: "Launch your astro-startup. Pitch space business models.",
    category: "creative_research",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=800",
    description: "NSSC's entrepreneurship launchpad! Pitch your space tech business model, orbital payload service, or cosmic software solution to venture capital groups and industry accelerators.",
    prizePool: "₹40,000",
    teamSize: "1 - 4 Members",
    rules: [
      "Pitch decks must cover market sizing (TAM/SAM/SOM), revenue flow models, and developmental milestones.",
      "Active customer revenues are not mandatory, but a working MVP or solid prototype blueprint is highly scored.",
      "Teams are allocated a strict 5-minute pitch slot, followed by 5 minutes of rapid investor questioning."
    ]
  },
  {
    id: "space-art",
    name: "Space Art",
    tagline: "Illustrate the void. Express the beauty of space.",
    category: "creative_research",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800",
    description: "Express your cosmological visions! Create inspiring art (paintings, digital sketches, or 3D renders) visualizing interstellar colony ships, massive planetary nebulae, or futuristic space stations.",
    prizePool: "₹10,000",
    teamSize: "Individual",
    rules: [
      "Both traditional physical sketches (scanned high-res) and digital canvas creations are warmly accepted.",
      "All submissions must be completely original. Use of generative AI art tools is prohibited.",
      "Include a concise 150-word abstract detailing the astronomical principles or conceptual inspiration behind the art."
    ]
  },
  {
    id: "astrophotography",
    name: "Astrophotography",
    tagline: "Capture the stars. Freeze the beauty of the celestial dome.",
    category: "creative_research",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800",
    description: "A showcase of patience and astrometric skills. Submit your best photographs capturing starry alignments, nebula clouds, solar paths, deep-sky galaxies, or terrestrial nightscapes.",
    prizePool: "₹15,000",
    teamSize: "Individual",
    rules: [
      "All images must be shot by the participant. Complete EXIF data must remain attached to verify settings.",
      "Light stacking and exposure blending are allowed, but combining independent sky backdrops is strictly banned.",
      "Provide a detailed checklist of the gear utilized (camera body, focal lenses, equatorial trackers, scope details)."
    ]
  }
];

const categories = [
  { id: "all", name: "ALL COMPETITIONS" },
  { id: "robotics_field", name: "ROBOTICS & FIELD" },
  { id: "astro_tech", name: "ASTRO-TECH & DATA" },
  { id: "creative_research", name: "CREATIVE & RESEARCH" }
];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);

  const filteredEvents = activeTab === "all" 
    ? eventsData 
    : eventsData.filter(e => e.category === activeTab);

  return (
    <main className="w-full min-h-screen pt-10 flex flex-col items-center bg-transparent text-white px-6 md:px-12 relative overflow-hidden">
      {/* Background Neon Space Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,191,255,0.15)]"
        >
          <Sparkles className="w-3.5 h-3.5" /> COMPETITIONS & CHALLENGES
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-black tracking-widest mb-4 bg-gradient-to-r from-white via-cyan-100 to-[#00bfff] bg-clip-text text-transparent"
        >
          FEST EVENTS
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-medium"
        >
          Push the boundaries of space technology, coding, and engineering in our flagship national contests.
        </motion.p>
      </div>

      {/* Categories Tabs Filter */}
      <div className="flex justify-center w-full mb-12 relative z-20 overflow-x-auto pb-4 scrollbar-none px-4">
        <div className="flex space-x-2 md:space-x-4 bg-black/50 border border-gray-800/80 p-1.5 rounded-full backdrop-blur-md max-w-full whitespace-nowrap">
          {categories.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 md:px-6 py-2.5 rounded-full text-xs font-bold font-mono tracking-widest transition-all duration-300 select-none ${
                  isActive 
                    ? "text-black" 
                    : "text-white hover:text-cyan-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeEventTab"
                    className="absolute inset-0 bg-cyan-400 rounded-full"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Events Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl relative z-10 px-4 mb-24"
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative w-full aspect-[3/4] bg-black/40 border border-gray-800/80 shadow-[0_0_15px_rgba(255,255,255,0.03)] rounded-[32px] overflow-hidden backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_25px_rgba(0,191,255,0.25)]"
            >
              {/* Default View (Image Backdrop + Title Overlay) */}
              <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none z-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Header Badge */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 border border-white/10 rounded-full text-[10px] font-bold font-mono tracking-wider text-cyan-400 uppercase backdrop-blur-sm">
                  {item.category.replace("_", " ")}
                </div>

                <div className="absolute bottom-8 left-0 right-0 text-center px-6">
                  <h3 className="text-2xl font-black tracking-widest uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {item.name}
                  </h3>
                  <p className="text-cyan-400 font-mono text-[10px] tracking-wider uppercase mt-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] font-bold">
                    {item.tagline}
                  </p>
                </div>
              </div>

              {/* Hover View (Fades in and content transitions on hover) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-black/90 backdrop-blur-md rounded-[32px] z-10 border border-cyan-500/20">
                <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 shadow-[0_0_15px_rgba(0,191,255,0.15)]">
                  <Trophy className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-black tracking-widest uppercase text-white mb-1">
                  {item.name}
                </h3>
                
                <p className="text-cyan-400 font-mono text-[10px] tracking-widest uppercase mb-4 font-bold">
                  {item.tagline}
                </p>
                
                <p className="text-gray-300 text-xs leading-relaxed max-w-xs mb-6 line-clamp-3">
                  {item.description}
                </p>

                {/* Micro Badges */}
                <div className="flex space-x-4 mb-6">
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Trophy className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-bold">{item.prizePool}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                    <Users className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-bold">{item.teamSize}</span>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedEvent(item)}
                  className="px-6 py-2.5 bg-cyan-500 text-black border border-cyan-400 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-transparent hover:text-cyan-400 transition-all duration-300 shadow-[0_0_15px_rgba(0,191,255,0.3)] flex items-center gap-1.5"
                >
                  Details <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expanded Details Modal Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-6"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-3xl bg-neutral-950 border border-gray-800 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,191,255,0.2)] flex flex-col max-h-[85vh]"
            >
              {/* Header Image banner */}
              <div className="h-40 md:h-56 w-full relative shrink-0">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-transparent" />
                
                {/* Category tag */}
                <div className="absolute top-6 left-6 px-3 py-1 bg-black/60 border border-white/10 rounded-full text-[10px] font-bold font-mono tracking-wider text-cyan-400 uppercase backdrop-blur-sm">
                  {selectedEvent.category.replace("_", " ")}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-black/60 border border-white/10 text-white hover:bg-cyan-500 hover:text-black hover:scale-105 transition-all duration-300 shadow-md backdrop-blur-sm"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Title */}
                <div className="absolute bottom-4 left-6 md:left-8">
                  <h2 className="text-3xl md:text-4xl font-black tracking-widest text-white uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {selectedEvent.name}
                  </h2>
                  <p className="text-cyan-400 font-mono text-[10px] md:text-xs tracking-wider uppercase mt-1 font-bold">
                    {selectedEvent.tagline}
                  </p>
                </div>
              </div>

              {/* Main Content Area (Scrollable) */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
                {/* Core Parameters Row */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border-b border-gray-900 pb-6 shrink-0">
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold font-mono text-gray-500 tracking-wider uppercase">Prize Pool</span>
                    <span className="text-lg font-black text-cyan-400 font-mono">{selectedEvent.prizePool}</span>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold font-mono text-gray-500 tracking-wider uppercase">Team Size</span>
                    <span className="text-lg font-black text-white font-mono">{selectedEvent.teamSize}</span>
                  </div>
                  <div className="col-span-2 md:col-span-1 p-4 bg-white/5 border border-white/5 rounded-2xl flex flex-col gap-1">
                    <span className="text-[10px] font-bold font-mono text-gray-500 tracking-wider uppercase">Contest Type</span>
                    <span className="text-lg font-black text-white font-mono uppercase">{selectedEvent.category === "robotics_field" ? "Offline" : "Online"}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold font-mono text-cyan-400 tracking-widest uppercase mb-2 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4" /> Description
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed font-light">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Rules & Guidelines */}
                <div>
                  <h4 className="text-xs font-bold font-mono text-cyan-400 tracking-widest uppercase mb-3 flex items-center gap-1.5">
                    <FileText className="w-4 h-4" /> Structure & Guidelines
                  </h4>
                  <ul className="space-y-3">
                    {selectedEvent.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-2" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-gray-900 bg-neutral-950 flex justify-end gap-3 shrink-0">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-5 py-2.5 border border-gray-800 hover:border-gray-500 rounded-full text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors duration-300"
                >
                  Close
                </button>
                <button
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 text-black rounded-full text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(0,191,255,0.25)] transition-all duration-300"
                  onClick={() => {
                    setSelectedEvent(null);
                    window.location.href = "/register";
                  }}
                >
                  Register Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
