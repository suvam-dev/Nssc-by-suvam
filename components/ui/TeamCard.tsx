"use client"
import { Mail } from "lucide-react"
import FacebookIcon from "@/components/facebook"
import LinkedinIcon from "@/components/linkedin"
import Waves from "@/components/Waves"

interface TeamCardProps {
    name: string;
    role: string;
    fb: string;
    linkedin: string;
    mail: string;
}

const TeamCard = ({ name, role, fb, linkedin, mail }: TeamCardProps) => {
    return (
        <div className="relative overflow-hidden w-full max-w-80 max-h-85 rounded-4xl flex flex-col mb-5  items-center bg-black border-white border py-4 shadow-[0_0_9px_4px_rgba(0,191,255,0.8)] backdrop-blur-lg group">

            {/* Waves Background - only visible on hover */}
            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-80 transition-opacity duration-500">
                <Waves
                    lineColor="rgba(255, 255, 255, 0.15)"
                    backgroundColor="transparent"
                    waveSpeedX={0.02}
                    waveSpeedY={0.01}
                    waveAmpX={15}
                    waveAmpY={8}
                    friction={0.9}
                    tension={0.01}
                    maxCursorMove={60}
                    xGap={8}
                    yGap={18}
                />
            </div>

            {/* Main Content Layer */}
            <div className="relative z-10 w-full flex flex-col items-center pointer-events-none">
                <div className="w-40 h-40 mx-auto rounded-full bg-cyan-500/80 mt-5 shadow-[0_0_30px_12px_rgba(0,191,255,0.3)] backdrop-blur-sm pointer-events-auto"></div>
                <h1 className="text-2xl text-[#00bfff] font-bold mt-3 pointer-events-auto">{name}</h1>
                <h4 className="text-gray-300 mb-4 pointer-events-auto text-sm">{role}</h4>
                <div className="w-full h-[.1px] bg-[#00bfff] mb-4"></div>
                <div className="flex justify-center items-center gap-5 pointer-events-auto">
                    <a href={mail}><li className="list-none text-white hover:scale-110 hover:-translate-y-2 hover:rotate-z-20 hover:text-[#00bfff] transition-all duration-500 ease-in-out cursor-pointer mx-2"><Mail size={24} /></li></a>
                    <a href={linkedin}><li className="list-none text-white hover:scale-110 hover:-translate-y-2 hover:rotate-z-20 hover:text-[#00bfff] transition-all duration-500 ease-in-out cursor-pointer "><LinkedinIcon size={24} /></li></a>
                    <a href={fb}><li className="list-none text-white hover:scale-110 hover:-translate-y-2 hover:rotate-z-20 hover:text-[#00bfff] transition-all duration-500 ease-in-out cursor-pointer "><FacebookIcon size={24} /></li></a>
                </div>
            </div>
        </div>
    )
}

export default TeamCard