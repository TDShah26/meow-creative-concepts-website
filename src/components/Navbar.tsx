"use client";

import { motion } from "framer-motion";
import { useMoodboard } from "@/context/MoodboardContext";

export default function Navbar() {
    const { isDrawerOpen } = useMoodboard();

    return (
        <div className="fixed top-6 left-0 w-full z-50 flex justify-between items-start px-6 md:px-12 pointer-events-none">
            {/* Left Pill: Brand Name */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: isDrawerOpen ? 0 : 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-auto px-6 py-3 
                           bg-white/5 backdrop-blur-2xl saturate-150
                           border border-white/10
                           rounded-full
                           shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                           text-white relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                <div className="relative z-10 text-sm md:text-base font-bold tracking-widest uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                    Meow Creative Concepts
                </div>
            </motion.div>

            {/* Right Pill: Navigation */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: isDrawerOpen ? 0 : 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="pointer-events-auto px-6 py-3 
                           bg-white/5 backdrop-blur-2xl saturate-150
                           border border-white/10
                           rounded-full
                           shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                           text-white relative group overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                {/* Desktop Links */}
                <div className="relative z-10 hidden md:flex gap-8 text-xs md:text-sm font-medium tracking-wide">
                    {['Work', 'Client Love', 'About', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase().replace(' ', '-')}`}
                            className="relative text-white/70 hover:text-white transition-colors duration-300"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Icon Placeholder */}
                <div className="relative z-10 md:hidden p-1">
                    <div className="space-y-1.5 cursor-pointer flex flex-col items-end">
                        <div className="w-6 h-0.5 bg-white/80 rounded-full"></div>
                        <div className="w-4 h-0.5 bg-white/80 rounded-full"></div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
