"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Award, 
  BookOpen, 
  Sparkles,
  Play,
  CheckCircle,
  Clock3
} from "lucide-react";

interface ScheduleEvent {
  id: string;
  time: string;
  title: string;
  category: "competition" | "workshop" | "lecture" | "other";
  venue: string;
  description: string;
  status: "completed" | "live" | "upcoming";
}

const scheduleData: Record<string, ScheduleEvent[]> = {
  "Day 1": [
    {
      id: "d1-1",
      time: "09:00 AM - 10:30 AM",
      title: "Inaugural Ceremony & Opening Keynote",
      category: "other",
      venue: "Netaji Auditorium, IIT Kharagpur",
      description: "Welcome address, lightning showcase of NSSC 2025 theme, and special keynote speech from chief ISRO guest.",
      status: "completed",
    },
    {
      id: "d1-2",
      time: "11:00 AM - 01:00 PM",
      title: "Space Quiz - Preliminary Rounds",
      category: "competition",
      venue: "Raman Lecture Hall",
      description: "Test your astronomy and cosmological awareness in a rapid-fire multiple choice questionnaire qualifier.",
      status: "completed",
    },
    {
      id: "d1-3",
      time: "02:00 PM - 04:30 PM",
      title: "Hoverpod Challenge - Phase 1 Testing",
      category: "competition",
      venue: "TSG Gymkhana Ground",
      description: "Teams launch their built hovercrafts on the custom obstacle course to evaluate hovering stability and maneuverability.",
      status: "completed",
    },
    {
      id: "d1-4",
      time: "05:00 PM - 07:00 PM",
      title: "Astrophotography Workshop & Processing Guide",
      category: "workshop",
      venue: "Kalpana Chawla Seminar Room",
      description: "Master the art of long-exposure imaging, deep-sky tracking, and noise filtering using standard editing tools.",
      status: "completed",
    },
  ],
  "Day 2": [
    {
      id: "d2-1",
      time: "09:30 AM - 11:30 AM",
      title: "Case Study Presentation - Finals",
      category: "competition",
      venue: "Vikram Sarabhai Auditorium",
      description: "Finalist pitches on sustainable lunar habitats and orbital debris clearance solutions in front of an esteemed panel.",
      status: "live",
    },
    {
      id: "d2-2",
      time: "11:45 AM - 01:15 PM",
      title: "Guest Lecture: The Future of Space Colonization",
      category: "lecture",
      venue: "Netaji Auditorium",
      description: "A visionary talk by prominent astrobiologists on the biological challenges and breakthroughs of Mars habitation.",
      status: "upcoming",
    },
    {
      id: "d2-3",
      time: "02:30 PM - 05:00 PM",
      title: "Water Rocketry Challenge - Launch Phase",
      category: "competition",
      venue: "Main Stadium Ground",
      description: "Witness aerodynamically optimized single-stage and double-stage water bottle rockets take off to achieve maximum range.",
      status: "upcoming",
    },
    {
      id: "d2-4",
      time: "05:30 PM - 07:00 PM",
      title: "Interactive Panel Discussion: Private Space Commerce",
      category: "lecture",
      venue: "Raman Lecture Hall",
      description: "A conversation with commercial space startup founders regarding private launch systems, payload deployment, and space tourism.",
      status: "upcoming",
    },
  ],
  "Day 3": [
    {
      id: "d3-1",
      time: "09:00 AM - 12:00 PM",
      title: "Rocket Science Championship - Flight Finals",
      category: "competition",
      venue: "Main Stadium Launch Pad",
      description: "The grand finale flight launches of model rockets equipped with altitude sensors and recovery parachutes.",
      status: "upcoming",
    },
    {
      id: "d3-2",
      time: "01:30 PM - 03:30 PM",
      title: "Guest Lecture: Deep Space Exploration Horizons",
      category: "lecture",
      venue: "Netaji Auditorium",
      description: "Exclusive presentation sharing updates and high-definition telemetry data from ongoing outer planetary missions.",
      status: "upcoming",
    },
    {
      id: "d3-3",
      time: "04:00 PM - 06:30 PM",
      title: "Valedictory & Awards Distribution Ceremony",
      category: "other",
      venue: "Netaji Auditorium",
      description: "Announcing the champions of NSSC 2025, handing out physical trophies, and celebrating collective space excellence.",
      status: "upcoming",
    },
  ],
};

const CATEGORY_COLORS = {
  competition: "border-cyan-500/30 text-cyan-400 bg-cyan-950/20",
  workshop: "border-purple-500/30 text-purple-400 bg-purple-950/20",
  lecture: "border-amber-500/30 text-amber-400 bg-amber-950/20",
  other: "border-emerald-500/30 text-emerald-400 bg-emerald-950/20",
};

const CATEGORY_ICONS = {
  competition: <Award className="w-4 h-4 mr-1.5" />,
  workshop: <Sparkles className="w-4 h-4 mr-1.5" />,
  lecture: <BookOpen className="w-4 h-4 mr-1.5" />,
  other: <Calendar className="w-4 h-4 mr-1.5" />,
};

const STATUS_CONFIGS = {
  completed: {
    label: "Completed",
    badge: "bg-gray-800/80 text-gray-400 border-gray-700/60",
    dot: "bg-gray-500",
    icon: <CheckCircle className="w-4 h-4 mr-1" />
  },
  live: {
    label: "LIVE NOW",
    badge: "bg-rose-950/30 text-rose-400 border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.2)] animate-pulse",
    dot: "bg-rose-500 animate-ping",
    icon: <Play className="w-4 h-4 mr-1 animate-pulse" />
  },
  upcoming: {
    label: "Upcoming",
    badge: "bg-[#00bfff]/10 text-[#00bfff] border-[#00bfff]/20",
    dot: "bg-[#00bfff]",
    icon: <Clock3 className="w-4 h-4 mr-1" />
  }
};

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<string>("Day 2");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const days = ["Day 1", "Day 2", "Day 3"];

  const filteredEvents = useMemo(() => {
    const events = scheduleData[selectedDay] || [];
    return events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            event.venue.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = selectedFilter === "all" || event.category === selectedFilter;
      
      return matchesSearch && matchesFilter;
    });
  }, [selectedDay, searchQuery, selectedFilter]);

  return (
    <main className="w-full min-h-screen pt-32 pb-20 flex flex-col items-center bg-transparent text-white px-4 md:px-8 relative overflow-hidden">
      {/* Aesthetic glowing nebula lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-12 relative z-10 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold tracking-wider mb-4 bg-gradient-to-r from-white via-cyan-200 to-[#00bfff] bg-clip-text text-transparent"
        >
          EVENT SCHEDULE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-gray-400 text-sm md:text-base leading-relaxed font-light"
        >
          Embark on the Space Odyssey. Track matches, workshops, panels, and grand keynotes across the three stellar days of National Students' Space Challenge 2025.
        </motion.p>
      </div>

      {/* Control Panel (Search, Filters, Day Switchers) */}
      <div className="w-full max-w-5xl mb-12 relative z-10 space-y-6">
        
        {/* Day selection tabs */}
        <div className="flex justify-center gap-4">
          {days.map((day) => {
            const isActive = selectedDay === day;
            const sub = day === "Day 1" ? "Nov 7: Launch" : day === "Day 2" ? "Nov 8: Orbit" : "Nov 9: Re-entry";
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative px-6 md:px-10 py-3 md:py-4 rounded-3xl text-sm md:text-base font-bold tracking-wider uppercase transition-all duration-300 border backdrop-blur-md cursor-pointer flex flex-col items-center justify-center min-w-[100px] md:min-w-[150px] ${
                  isActive
                    ? "bg-[#00bfff] text-black border-[#00bfff] shadow-[0_0_30px_rgba(0,191,255,0.5)] scale-105"
                    : "bg-black/40 text-gray-400 border-gray-700/60 hover:text-white hover:border-gray-500 hover:shadow-[0_0_15px_rgba(0,191,255,0.15)]"
                }`}
              >
                <span>{day}</span>
                <span className={`text-[9px] font-medium tracking-normal mt-1 opacity-70 ${isActive ? "text-neutral-900" : "text-gray-500"}`}>
                  {sub}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Event Filters Grid */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-black/40 border border-gray-800/80 rounded-3xl p-4 backdrop-blur-md">
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search space events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/50 border border-gray-800 focus:border-[#00bfff] text-white rounded-full pl-11 pr-5 py-2.5 outline-none transition-all w-full text-sm placeholder-gray-500 focus:shadow-[0_0_15px_rgba(0,191,255,0.1)]"
            />
          </div>

          {/* Event type filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
            {[
              { id: "all", label: "All Events" },
              { id: "competition", label: "Competitions" },
              { id: "workshop", label: "Workshops" },
              { id: "lecture", label: "Lectures" },
              { id: "other", label: "Keynotes/Other" }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                  selectedFilter === filter.id
                    ? "bg-[#00bfff]/20 text-[#00bfff] border-[#00bfff]/50 shadow-[0_0_15px_rgba(0,191,255,0.15)]"
                    : "bg-transparent text-gray-400 border-gray-800 hover:text-white hover:border-gray-600"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="w-full max-w-4xl relative z-10">
        
        {/* Glow neon timeline central vertical axis */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00bfff]/80 via-purple-500/50 to-transparent -translate-x-1/2 pointer-events-none hidden sm:block shadow-[0_0_10px_rgba(0,191,255,0.4)]" />

        {/* Outer animations list */}
        <AnimatePresence mode="popLayout">
          {filteredEvents.length > 0 ? (
            <div className="space-y-12">
              {filteredEvents.map((event, index) => {
                const isLeft = index % 2 === 0;
                const status = STATUS_CONFIGS[event.status];

                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`flex flex-col sm:flex-row relative items-start ${
                      isLeft ? "sm:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Node pulse */}
                    <div className="absolute left-6 md:left-1/2 top-8 -translate-x-1/2 z-20 pointer-events-none hidden sm:block">
                      <div className="relative flex items-center justify-center">
                        <div className={`absolute w-6 h-6 rounded-full opacity-35 ${status.dot} animate-ping`} />
                        <div className={`w-4 h-4 rounded-full border-2 border-black ${status.dot}`} />
                      </div>
                    </div>

                    {/* Outer Spacer to balance timeline on large screens */}
                    <div className="w-full md:w-1/2 hidden md:block" />

                    {/* Timeline Event Card */}
                    <div className={`w-full md:w-[46%] pl-12 sm:pl-16 md:pl-0 ${isLeft ? "md:pr-10" : "md:pl-10"}`}>
                      <div className="relative group p-6 rounded-3xl bg-black/40 border border-gray-800/80 backdrop-blur-md hover:border-[#00bfff]/50 hover:shadow-[0_0_30px_rgba(0,191,255,0.15)] transition-all duration-500">
                        
                        {/* Top Accent line glow */}
                        <div className="absolute top-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#00bfff]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                        
                        {/* Meta Info Header */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <span className={`flex items-center text-xs font-semibold px-3 py-1.5 rounded-full border ${CATEGORY_COLORS[event.category]}`}>
                            {CATEGORY_ICONS[event.category]}
                            {event.category.toUpperCase()}
                          </span>

                          <span className={`flex items-center text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${status.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full mr-2 ${status.dot}`} />
                            {status.icon}
                            {status.label}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold mb-3 group-hover:text-[#00bfff] transition-colors duration-300 tracking-wide leading-tight">
                          {event.title}
                        </h3>

                        {/* Event details block */}
                        <div className="space-y-2 mb-4 text-xs md:text-sm text-gray-400 font-light">
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2.5 text-[#00bfff]/70 shrink-0" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2.5 text-purple-400/70 shrink-0" />
                            <span className="truncate">{event.venue}</span>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-gray-500 leading-relaxed font-light mb-0">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-black/30 border border-gray-800/80 rounded-3xl p-8 backdrop-blur-md"
            >
              <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No interstellar events found</h3>
              <p className="text-gray-500 text-sm font-light">
                Try searching for other words or reset the active filter tag.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>


    </main>
  );
}
