"use client";

import { motion } from "motion/react";

interface Lecture {
    name: string;
    title: string;
    description: string;
    image: string;
}

const lecturesData: Lecture[] = [
    {
        name: "N. SUDHEER KUMAR",
        title: "Chief Guest",
        description: "Former ISRO Director (CBPO) with over three decades of experience in industrial engineering, infrastructure development, project management, and space program leadership.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
    },
    {
        name: "PROF. CHRISTOPHER IMPEY",
        title: "Guest Lecturer",
        description: "Distinguished Professor of Astronomy at the University of Arizona. Renowned author and researcher in observational cosmology, astrobiology, and science education.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800"
    },
    {
        name: "ANSYS WORKSHOP",
        title: "Special Workshop",
        description: "Hands-on engineering simulation on Ansys HFSS. Deep dive into antennas, arrays, radomes, radar cross-sections (RCS), and RFCM SAR/ISAR system design.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800"
    },
    {
        name: "DR. SHUBHA RAO",
        title: "Keynote Speaker",
        description: "Senior Scientist at ISRO Satellite Centre. Pioneer in space debris mitigation models, orbital mechanics, and satellite attitude control system engineering.",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
    },
    {
        name: "DR. AMITABH GHOSH",
        title: "Guest Lecturer",
        description: "Planetary Scientist and Rover Operations Lead for NASA's Mars Exploration Rover Mission. Recipient of the NASA Outstanding Leadership Medal.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800"
    },
    {
        name: "ISRO EXHIBITION",
        title: "Special Event",
        description: "Exclusive exhibition showcasing launch vehicle scales, satellite structures, cryogenic rocket engines, and interactive telemetry system demonstrations.",
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800"
    }
];

export default function GuestLecturesPage() {
    return (
        <main className="w-full min-h-screen pt-10 flex flex-col items-center bg-transparent text-white px-6 md:px-12 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

            <div className="text-center mb-16 relative">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold tracking-wider mb-4 bg-gradient-to-r from-white via-cyan-200 to-[#00bfff] bg-clip-text text-transparent"
                >
                    GUEST LECTURES & WORKSHOPS
                </motion.h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl relative z-10 px-4">
                {lecturesData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative w-full aspect-[3/4] bg-black/40 border border-light-50 shadow-[0_0_10px_4px_rgba(255,255,255,0.70)] rounded-[32px] overflow-hidden backdrop-blur-md cursor-pointer transition-all duration-500 hover:border-light-50 hover:shadow-[0_0_30px_3px_rgba(0,191,255,0.4)]"
                    >
                        {/* Default View (fades out on hover) */}
                        <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none z-0">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                            <div className="absolute bottom-8 left-0 right-0 text-center px-6">
                                <h3 className="text-xl md:text-2xl font-black tracking-widest uppercase text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                    {item.name}
                                </h3>
                            </div>
                        </div>

                        {/* Hover View (fades in and slides up on hover) */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 bg-black/75 backdrop-blur-md rounded-[32px] z-10">
                            <div className="relative w-24 h-24 rounded-full border-2 border-[#00bfff] shadow-[0_0_15px_rgba(0,191,255,0.5)] overflow-hidden mb-4">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <h3 className="text-xl font-extrabold tracking-wider uppercase text-white mb-1">
                                {item.name}
                            </h3>
                            <p className="text-[#00bfff] italic text-sm font-bold mb-4">
                                {item.title}
                            </p>
                            <p className="text-gray-300 text-xs leading-relaxed max-w-xs mb-6 line-clamp-4">
                                {item.description}
                            </p>

                            <button className="px-6 py-2 border border-[#00bfff] text-[#00bfff] rounded-full text-xs font-bold tracking-wider uppercase bg-transparent hover:bg-[#00bfff] hover:text-black transition-all duration-300">
                                Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </main>
    );
}