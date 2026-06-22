"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const stories = [
    {
        id: 1,
        title: "The Royal Wedding Hamper",
        clientBrief: {
            text: "We need something regal but eco-friendly. Must match our Marigold & Velvet theme. Budget: ₹2500/piece.",
            tags: ["Eco-friendly", "Velvet", "Marigold"],
            color: "bg-[#e8bcbc]" // Placeholder for "Before" image/collage
        },
        finalResult: {
            image: "/images-optimized/ezgif-frame-015.webp", // Placeholder
            color: "bg-rose-900/40"
        }
    },
    {
        id: 2,
        title: "Minimalist Shubh Labh",
        clientBrief: {
            text: "Modern apartment, no plastic. Can we do something with brass and light wood?",
            tags: ["No Plastic", "Brass", "Modern"],
            color: "bg-[#d1e8bc]"
        },
        finalResult: {
            image: "/images-optimized/ezgif-frame-035.webp",
            color: "bg-amber-900/40"
        }
    },
    {
        id: 3,
        title: "Corporate Diwali Box",
        clientBrief: {
            text: "300 boxes for employees. Needs our logo, healthy snacks, and zero waste packaging.",
            tags: ["Bulk Order", "Branding", "Zero Waste"],
            color: "bg-[#bcdce8]"
        },
        finalResult: {
            image: "/images-optimized/ezgif-frame-055.webp",
            color: "bg-blue-900/40"
        }
    },
    {
        id: 4,
        title: "Bespoke Trousseau Trunk",
        clientBrief: {
            text: "A vintage-style trunk for a bride. Needs specific compartments for jewelry and heavy embroidery. Gold accents.",
            tags: ["Vintage", "Gold", "Bridal"],
            color: "bg-[#e8dcbc]"
        },
        finalResult: {
            image: "/images-optimized/ezgif-frame-075.webp",
            color: "bg-amber-900/40"
        }
    }
];

export default function ProcessShowcase() {
    const [activeStory, setActiveStory] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setActiveStory((prev) => (prev + 1) % stories.length);
        }, 5000); // 5 seconds per slide

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleNext = () => {
        setActiveStory((prev) => (prev + 1) % stories.length);
    };

    const handlePrev = () => {
        setActiveStory((prev) => (prev - 1 + stories.length) % stories.length);
    };

    return (
        <section className="py-24 bg-[#0a0a0a] overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                {/* Section Header */}
                <div className="mb-16 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-sm md:text-base text-amber-400 tracking-[0.2em] uppercase mb-4"
                    >
                        Concept to Creation
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-light text-white"
                    >
                        You dream it. <span className="font-serif italic text-white/50">We craft it.</span>
                    </motion.h3>
                </div>

                {/* Slider Component */}
                <div
                    className="relative aspect-[16/10] md:aspect-[21/9] w-full max-w-5xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-[#0f0f0f] shadow-2xl"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    <BeforeAfterSlider story={stories[activeStory]} />

                    {/* Carousel Navigation */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-30 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                        <button
                            onClick={handlePrev}
                            className="text-white/50 hover:text-white transition-colors"
                            aria-label="Previous story"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                        </button>

                        <div className="flex gap-2">
                            {stories.map((story, index) => (
                                <button
                                    key={story.id}
                                    onClick={() => setActiveStory(index)}
                                    className={`h-1.5 rounded-full transition-all duration-300 ${activeStory === index ? "w-8 bg-amber-400" : "w-1.5 bg-white/30 hover:bg-white/50"}`}
                                    aria-label={`View story ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="text-white/50 hover:text-white transition-colors"
                            aria-label="Next story"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                {activeStory === 0 && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-white/30 text-xs mt-4 tracking-widest uppercase animate-pulse"
                    >
                        Drag the slider to see the transformation
                    </motion.p>
                )}
            </div>
        </section>
    );
}

function BeforeAfterSlider({ story }: { story: typeof stories[0] }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    // Calculate slider position as percentage (0 to 100)
    // We start at 50%
    useEffect(() => {
        // Reset slider when story changes
        // Using a small timeout to allow layout to settle if needed, but framer motion handles this well generally
    }, [story]);

    // Initial position logic would go here if we want to programmatically set it
    // For now we rely on CSS/Interaction

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full select-none"
            style={{ "--split": "50%" } as React.CSSProperties}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The "After" Image (Background / Final Result) - Right Side */}
            <div className={`absolute inset-0 w-full h-full ${story.finalResult.color} flex items-center justify-center group`}>
                {/* The "After" Image */}
                <img
                    src={story.finalResult.image}
                    alt={story.title}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay for Text Readability (Optional, fades out on hover to see full image details) */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* The "Before" Image (Foreground / Client Brief) - Left Side */}
            {/* We clip this div based on the slider position */}
            <motion.div
                className={`absolute inset-0 w-full h-full ${story.clientBrief.color} overflow-hidden`}
                style={{ clipPath: "polygon(0 0, var(--split) 0, var(--split) 100%, 0 100%)" }}
            >
                {/* Content of the "Before" side */}
                <div className="relative w-full h-full flex items-center justify-center bg-black/20">
                    <div className="max-w-md p-8 md:p-12 relative">
                        {/* Decorative 'WhatsApp' style bubble */}
                        <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-none p-6 transform -rotate-2">
                            <p className="text-xs text-amber-400 mb-2 font-mono">Incoming Request...</p>
                            <p className="text-white/90 font-light text-lg leading-relaxed">
                                "{story.clientBrief.text}"
                            </p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mt-6 justify-center">
                            {story.clientBrief.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-black/30 border border-white/5 rounded-full text-xs text-white/50 uppercase tracking-wide">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="absolute -top-10 -left-10 text-6xl text-white/5 font-serif font-bold pointer-events-none">
                            BRIEF
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Slider Handle */}
            {/* This is the interactive element that controls the --split CSS variable */}
            <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-20 focus:outline-none"
                onInput={(e) => {
                    const value = (e.target as HTMLInputElement).value;
                    if (containerRef.current) {
                        containerRef.current.style.setProperty('--split', `${value}%`);
                    }
                }}
            />

            {/* Visual Line for the Handle */}
            <div
                className="absolute top-0 bottom-0 w-px bg-white/50 z-10 pointer-events-none shadow-[0_0_30px_rgba(0,0,0,0.5)]"
                style={{ left: "var(--split, 50%)" }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8L22 12L18 16" />
                        <path d="M6 8L2 12L6 16" />
                    </svg>
                </div>
            </div>
        </div>
    );
}
