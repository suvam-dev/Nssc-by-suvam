"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Globe } from "lucide-react";

interface Sponsor {
    name: string;
    logo: string;
    website: string;
}

interface SponsorData {
    [year: string]: {
        [category: string]: Sponsor[];
    };
}

const sponsorsData: SponsorData = {
    "2024": {
        "Title Sponsor": [
            {
                "name": "Dummy Title Sponsor 2024",
                "logo": "/logos/2024/title.png",
                "website": "https://example.com"
            }
        ],
        "Technical Partner": [
            {
                "name": "Dummy Technical Partner 2024",
                "logo": "/logos/2024/technical.png",
                "website": "https://example.com"
            }
        ],
        "Media Partner": [
            {
                "name": "Dummy Media Partner 2024",
                "logo": "/logos/2024/media.png",
                "website": "https://example.com"
            }
        ]
    },
    "2025": {
        "Title Sponsor": [
            {
                "name": "Dummy Title Sponsor 2025",
                "logo": "/logos/2025/title.png",
                "website": "https://example.com"
            }
        ],
        "Co-Title Sponsor": [
            {
                "name": "Dummy Co-Title Sponsor 2025",
                "logo": "/logos/2025/co-title.png",
                "website": "https://example.com"
            }
        ],
        "Workshop Partner": [
            {
                "name": "Dummy Workshop Partner 2025",
                "logo": "/logos/2025/workshop.png",
                "website": "https://example.com"
            }
        ]
    },
    "2026": {
        "Title Sponsor": [
            {
                "name": "Dummy Title Sponsor 2026",
                "logo": "/logos/2026/title.png",
                "website": "https://example.com"
            }
        ],
        "Technical Partner": [
            {
                "name": "Dummy Technical Partner 2026",
                "logo": "/logos/2026/technical.png",
                "website": "https://example.com"
            }
        ],
        "Food Partner": [
            {
                "name": "Dummy Food Partner 2026",
                "logo": "/logos/2026/food.png",
                "website": "https://example.com"
            }
        ]
    }
};

export default function SponsorsPage() {
    const [selectedYear, setSelectedYear] = useState<string>("2026");
    const years = ["2025", "2026", "2024"];
    const currentSponsors = sponsorsData[selectedYear] || {};

    return (
        <main className="w-full min-h-screen pt-32 pb-20 flex flex-col items-center bg-transparent text-white px-4 md:px-8 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="text-center mb-16 relative">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-6xl font-bold tracking-wider mb-4 bg-gradient-to-r from-white via-cyan-200 to-[#00bfff] bg-clip-text text-transparent"
                >
                    OUR SPONSORS
                </motion.h1>
            </div>

            <div className="flex justify-center gap-4 mb-16 relative z-10">
                {years.map((year) => {
                    const isActive = selectedYear === year;
                    return (
                        <button
                            key={year}
                            onClick={() => setSelectedYear(year)}
                            className={`relative px-8 py-3 rounded-full text-base font-bold tracking-widest uppercase transition-all duration-300 border backdrop-blur-md cursor-pointer ${isActive
                                ? "bg-[#00bfff] text-black border-[#00bfff] shadow-[0_0_25px_rgba(0,191,255,0.6)] scale-120 mx-4"
                                : "bg-black/40 text-gray-400 border-gray-700/60 hover:text-white hover:border-gray-500 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-102"
                                }`}
                        >
                            {year}
                        </button>
                    );
                })}
            </div>

            <div className="w-full max-w-6xl z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedYear}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-20"
                    >
                        {Object.keys(currentSponsors).length === 0 ? (
                            <div className="text-center py-10 text-gray-500">
                                No sponsor records available for {selectedYear}.
                            </div>
                        ) : (
                            Object.entries(currentSponsors).map(([category, sponsors]) => (
                                <div key={category} className="flex flex-col items-center justify-center">
                                    <h2 className="text-2xl md:text-3xl  tracking-wider text-center uppercase mb-10 text-white font-extrabold flex items-center gap-3">
                                        <span className="h-[2px] w-12 bg-gradient-to-r from-transparent to-cyan-400 hidden sm:block"></span>
                                        {category}
                                        <span className="h-[2px] w-12 bg-gradient-to-l from-transparent to-cyan-400 hidden sm:block"></span>
                                    </h2>

                                    <div className="flex flex-row flex-wrap gap-8 w-full justify-center items-center">
                                        {sponsors.map((sponsor, index) => (
                                            <SponsorCard key={index} sponsor={sponsor} />
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </main>
    );
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
    const [imageError, setImageError] = useState(false);

    return (
        <motion.a
            href={sponsor.website}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group w-full max-w-sm aspect-video sm:aspect-auto sm:h-52 bg-black/40 border border-gray-700/40 rounded-3xl p-6 flex flex-col justify-center items-center relative overflow-hidden backdrop-blur-md cursor-pointer transition-all duration-300 hover:border-[#00bfff]/60 hover:shadow-[0_0_30px_3px_rgba(0,191,255,0.25)]"
        >
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00bfff]/30 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00bfff]/30 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />

            <div className="w-full flex flex-col items-center justify-center space-y-4">
                {imageError ? (
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-purple-950/40 border border-cyan-500/20 flex flex-col items-center justify-center group-hover:border-cyan-500/40 shadow-inner transition-colors duration-300">
                        <Globe className="w-8 h-8 text-cyan-400 animate-pulse" />
                    </div>
                ) : (
                    <div className="h-24 w-full flex items-center justify-center px-4 overflow-hidden relative">
                        <img
                            src={sponsor.logo}
                            alt={sponsor.name}
                            onError={() => setImageError(true)}
                            className="max-h-full max-w-full object-contain filter brightness-95 contrast-105 group-hover:brightness-100 group-hover:scale-105 transition-all duration-500"
                        />
                    </div>
                )}

                <div className="text-center">
                    <h3 className="font-bold text-lg text-white group-hover:text-[#00bfff] transition-colors duration-300 line-clamp-1">
                        {sponsor.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-500 group-hover:text-gray-400 mt-1 transition-colors duration-300">
                        Visit Website <ExternalLink className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </motion.a>
    );
}