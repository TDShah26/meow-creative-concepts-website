"use client";

import { motion } from "framer-motion";

export default function Gallery() {
    const projects = [
        { id: 1, color: "bg-rose-900/20" },
        { id: 2, color: "bg-amber-900/20" },
        { id: 3, color: "bg-indigo-900/20" },
        { id: 4, color: "bg-blue-900/20" },
        { id: 5, color: "bg-teal-900/20" },
        { id: 6, color: "bg-amber-950/20" },
    ];

    return (
        <section id="work" className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto bg-[#0f0f0f]">
            <div className="mb-10 md:mb-16 text-center md:text-left">
                <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-5xl font-light mb-4"
                >
                    What we have <span className="font-serif italic font-normal text-amber-200">created</span> so far
                </motion.h2>
                <div className="h-px w-24 bg-gradient-to-r from-amber-500 to-transparent mx-auto md:mx-0" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
                {projects.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className={`aspect-[4/5] ${item.color} rounded-lg group overflow-hidden relative cursor-pointer border border-white/5 hover:border-white/20 transition-colors`}
                    >
                        {/* Placeholder Content */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-500 blur-xl" />
                        </div>

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center p-4 text-center">
                            <span className="text-xs md:text-sm tracking-widest uppercase mb-1 md:mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Project {item.id}</span>
                            <p className="text-[10px] md:text-xs text-white/60 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Custom Hamper</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
