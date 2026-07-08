"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const TESTIMONIALS = [
    {
        text: "The festive hampers were an absolute hit at our corporate event! Meow Creative Concepts knows how to make gifting memorable.",
        name: "Priya S.",
        role: "Event Manager",
    },
    {
        text: "I ordered the Diya Platter for Diwali, and the craftsmanship was stunning. It added a beautiful touch to our pooja room.",
        name: "Rahul M.",
        role: "Client",
    },
    {
        text: "Exceptional quality and exquisite packaging. It felt like opening a box of magic. Highly recommended for premium gifts.",
        name: "Sneha K.",
        role: "CEO",
    },
    {
        text: "The customized Toran for my housewarming was exactly what I envisioned. Traditional yet elegant!",
        name: "Anjali P.",
        role: "Client",
    },
    {
        text: "Meow Creative Concepts took the stress out of our wedding favors. Everything was delivered on time and looked flawless.",
        name: "Vikram & Neha",
        role: "Clients",
    },
    {
        text: "The Shubh Labh hangings are beautiful. You can see the love and effort put into every handcrafted piece.",
        name: "Kavita D.",
        role: "Client",
    },
    {
        text: "Simply amazing! The attention to detail in every hamper is just outstanding. They truly bring a magical touch to gifting.",
        name: "Rohan B.",
        role: "Client",
    },
    {
        text: "A seamless experience from ordering to delivery. The products exceeded my expectations in both design and quality.",
        name: "Sunita R.",
        role: "Client",
    },
    {
        text: "Their Table Runners transformed my dining space for the holidays. So chic and well-made!",
        name: "Aarti G.",
        role: "Interior Designer",
    },
    {
        text: "Best bespoke gifting service I've ever used. The personal touch on every item makes it so special.",
        name: "Karan T.",
        role: "Client",
    },
];

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(true);
    const [mounted, setMounted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const itemsPerView = mounted ? (isMobile ? 1 : 3) : 3;
    const maxIndex = Math.max(0, TESTIMONIALS.length - itemsPerView);

    const startTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
        }, 5000);
    };

    useEffect(() => {
        if (!mounted) return;
        startTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [maxIndex, mounted]); // Kept at size 2 to avoid Next.js HMR errors!

    const handleDotClick = (index: number) => {
        setCurrentIndex(index);
        if (mounted) startTimer();
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
        if (mounted) startTimer();
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
        if (mounted) startTimer();
    };

    return (
        <section id="client-love" className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#141414] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 md:mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light px-2"
                    >
                        Client <span className="font-serif italic font-normal text-amber-200">love</span> we have received so far
                    </motion.h2>
                </div>

                <div className="relative px-8 md:px-16">
                    <div className="overflow-hidden -mx-2 md:-mx-4 px-2 md:px-4">
                        <motion.div 
                            className="flex"
                            animate={{ 
                                x: mounted ? `-${currentIndex * (isMobile ? 85 : 33.333333)}%` : '0%' 
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            {TESTIMONIALS.map((testimonial, i) => (
                                <div
                                    key={i}
                                    className="w-[85%] md:w-1/3 flex-shrink-0 px-2 md:px-4"
                                >
                                    <div className="p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative h-full flex flex-col justify-between hover:bg-white/10 transition-colors duration-300">
                                        <div>
                                            <div className="text-5xl text-amber-200/20 font-serif absolute top-2 left-4 md:top-4 md:left-6">&quot;</div>
                                            <p className="text-white/85 italic leading-relaxed relative z-10 mb-6 font-light text-sm md:text-base mt-4">
                                                {testimonial.text}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 md:gap-4 mt-auto">
                                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-black font-medium text-lg shadow-lg">
                                                {testimonial.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-sm md:text-base font-medium">{testimonial.name}</h4>
                                                <span className="text-xs md:text-sm text-white/40">{testimonial.role}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl"
                        aria-label="Previous testimonials"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-xl"
                        aria-label="Next testimonials"
                    >
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Dots */}
                <div className="flex justify-center items-center gap-2 mt-8 md:mt-12 flex-wrap max-w-full px-4">
                    {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            className={`h-1.5 rounded-full transition-all duration-300 flex-shrink-0 ${
                                i === currentIndex ? "w-8 bg-amber-200" : "w-2 bg-white/20 hover:bg-white/40"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
