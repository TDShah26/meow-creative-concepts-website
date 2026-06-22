"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { categoryInfo } from "@/data/products";

export default function MoodboardGallery() {
    return (
        <section id="gallery" className="py-24 bg-[#0a0a0a] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-8">

                {/* Header */}
                <div className="mb-16">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-amber-400 text-sm tracking-[0.2em] uppercase mb-2"
                    >
                        The Collection
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-light text-white"
                    >
                        Curate your <span className="font-serif italic text-white/50">vibe</span>
                    </motion.h3>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {categoryInfo.map((cat, index) => (
                        <Link key={cat.slug} href={`/collection/${cat.slug}`} className="block">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.15 }}
                                className="group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-colors duration-500"
                            >
                                {/* Background Image */}
                                <img
                                    src={cat.coverThumbnail || cat.coverImage}
                                    alt={cat.name}
                                    loading={index === 0 ? "eager" : "lazy"}
                                    decoding="async"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-85 group-hover:opacity-100"
                                />

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />

                                {/* Content Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end p-8">
                                    <p className="text-amber-400 text-xs tracking-[0.2em] uppercase mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                        Explore
                                    </p>
                                    <h3 className="text-3xl md:text-4xl font-serif text-white mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-white/50 mb-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                                        {cat.description}
                                    </p>

                                    {/* Arrow CTA */}
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 transform translate-y-4 group-hover:translate-y-0">
                                        <span className="text-xs text-white/70 uppercase tracking-widest">View Collection</span>
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            className="text-amber-400 transform group-hover:translate-x-1 transition-transform duration-300"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
