"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { customizationProjects, CustomizationProject } from "@/data/customizations";

function CustomizationCard({ project }: { project: CustomizationProject }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev >= project.images.length - 1 ? 0 : prev + 1));
        }, 4000);
    };

    useEffect(() => {
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [project.images.length]);

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        startTimer();
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : project.images.length - 1));
        startTimer();
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < project.images.length - 1 ? prev + 1 : 0));
        startTimer();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-6 md:p-10 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/[0.08] transition-colors duration-500 flex flex-col md:flex-row gap-8 md:gap-12 items-center"
        >
            {/* Left Side: Content */}
            <div className="w-full md:w-[35%] space-y-4 text-left">
                <span className="text-amber-400 text-xs tracking-[0.2em] uppercase font-light">
                    {project.label}
                </span>
                
                <h3 className="text-2xl md:text-3xl font-serif text-white font-light flex flex-wrap items-center gap-3">
                    {project.title}
                    {project.tag && (
                        <span className="text-[10px] font-sans tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-white/60">
                            {project.tag}
                        </span>
                    )}
                </h3>

                <p className="text-white/60 font-light text-sm md:text-base leading-relaxed">
                    {project.description}
                </p>
            </div>

            {/* Right Side: Carousel */}
            <div className="w-full md:w-[65%] flex flex-col items-center">
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] md:aspect-[16/9.5] rounded-xl overflow-hidden bg-black/40 border border-white/5 group">
                    
                    {/* Carousel Slides */}
                    <div className="w-full h-full overflow-hidden relative">
                        <motion.div
                            className="flex h-full w-full"
                            animate={{ x: `-${currentIndex * 100}%` }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {project.images.map((img, i) => (
                                <div key={i} className="w-full h-full flex-shrink-0 relative">
                                    <img
                                        src={img}
                                        alt={`${project.title} mockup ${i + 1}`}
                                        className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-300"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 text-white/70 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer"
                        aria-label="Previous image"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/30 hover:bg-black/50 border border-white/10 text-white/70 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl cursor-pointer"
                        aria-label="Next image"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center items-center gap-1.5 mt-4">
                    {project.images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                                i === currentIndex ? "w-6 bg-amber-200" : "w-1.5 bg-white/20 hover:bg-white/40"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function Customizations() {
    return (
        <section id="customizations" className="py-16 md:py-24 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                
                {/* Header */}
                <div className="mb-12 md:mb-20 text-left">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-amber-400 text-xs md:text-sm tracking-[0.2em] uppercase mb-2 font-light"
                    >
                        Beyond the Collection
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-light text-white"
                    >
                        Request to <span className="font-serif italic text-white/50">reality</span>
                    </motion.h3>
                </div>

                {/* Stacked Cards */}
                <div className="space-y-8 md:space-y-16 mb-16 md:mb-24">
                    {customizationProjects.map((project) => (
                        <CustomizationCard key={project.id} project={project} />
                    ))}
                </div>

                {/* Bottom CTA Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border-t border-white/5 pt-16 md:pt-24 text-center max-w-4xl mx-auto"
                >
                    <h4 className="text-2xl md:text-4xl font-light text-white mb-6 md:mb-8 leading-snug">
                        Have a <span className="font-serif italic text-amber-200">unique request</span> or custom idea? <br className="hidden md:inline" />
                        Let’s bring it to life.
                    </h4>
                    
                    <a
                        href="mailto:meowcreativeconcepts@gmail.com?subject=Customization Request"
                        className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full overflow-hidden hover:bg-amber-50 transition-colors duration-300 cursor-pointer"
                    >
                        <span className="relative z-10 font-medium tracking-wide">Request a Customization</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                </motion.div>
                
            </div>
        </section>
    );
}
