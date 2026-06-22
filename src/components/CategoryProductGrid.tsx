"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMoodboard } from "@/context/MoodboardContext";
import MoodboardWidget from "@/components/MoodboardWidget";
import type { Product, CategoryInfo } from "@/data/products";

interface CategoryProductGridProps {
    category: CategoryInfo;
    products: Product[];
}

export default function CategoryProductGrid({ category, products }: CategoryProductGridProps) {
    const { addToMoodboard, removeFromMoodboard, isItemSelected } = useMoodboard();
    const router = useRouter();

    const toggleSelection = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (isItemSelected(id)) {
            removeFromMoodboard(id);
        } else {
            addToMoodboard(id);
        }
    };

    const handleBackToCollection = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push('/');
        // Scroll to gallery after navigation completes
        const checkAndScroll = () => {
            const el = document.getElementById('gallery');
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            } else {
                requestAnimationFrame(checkAndScroll);
            }
        };
        requestAnimationFrame(checkAndScroll);
    };

    return (
        <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
                    <a
                        href="/"
                        onClick={handleBackToCollection}
                        className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            className="transform group-hover:-translate-x-1 transition-transform duration-300"
                        >
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        <span className="text-sm tracking-wide">Back to Collection</span>
                    </a>

                    <Link
                        href="/"
                        className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent"
                    >
                        Meow Creative Concepts
                    </Link>
                </div>
            </div>

            {/* Hero Header */}
            <div className="pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-amber-400 text-sm tracking-[0.2em] uppercase mb-3"
                >
                    The Collection
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-4"
                >
                    {category.name}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg text-white/40 max-w-xl"
                >
                    {category.description}
                </motion.p>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-px w-32 bg-gradient-to-r from-amber-500 to-transparent mt-8 origin-left"
                />
            </div>

            {/* Product Grid */}
            <div className="px-4 md:px-8 pb-32 max-w-7xl mx-auto">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence>
                        {products.map((product, index) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                key={product.id}
                                className={`group relative aspect-[4/5] rounded-xl overflow-hidden cursor-pointer bg-[#0f0f0f] border border-white/5 hover:border-white/20 transition-colors ${product.color || 'bg-white/5'}`}
                            >
                                {/* Background Image */}
                                {product.image && (
                                    <img
                                        src={product.thumbnail || product.image}
                                        alt={product.title}
                                        loading={index < 3 ? "eager" : "lazy"}
                                        decoding="async"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

                                {/* Heart Button */}
                                <button
                                    onClick={(e) => toggleSelection(e, product.id)}
                                    className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 transition-all duration-300 group/btn"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill={isItemSelected(product.id) ? "currentColor" : "none"}
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        className={`${isItemSelected(product.id) ? "text-white" : "text-white/70 group-hover/btn:text-white"}`}
                                    >
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                    </svg>
                                </button>

                                {/* Product Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-amber-400 text-xs tracking-widest uppercase mb-1">{product.category}</p>
                                    <h3 className="text-xl font-serif text-white mb-2">{product.title}</h3>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {product.specs.slice(0, 2).map(spec => (
                                            <span key={spec} className="text-[10px] uppercase tracking-wide px-2 py-1 rounded bg-white/10 text-white/70 backdrop-blur-sm">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Ghost Card (Custom Request CTA) */}
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: products.length * 0.1 }}
                            className="aspect-[4/5] rounded-xl border-2 border-dashed border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300 flex flex-col items-center justify-center text-center p-8 cursor-pointer group"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40 group-hover:text-amber-400">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-light text-white mb-2">Have a unique vision?</h3>
                            <p className="text-sm text-white/50 mb-6">We love custom challenges. Let&apos;s design it from scratch.</p>
                            <span className="text-xs text-amber-400 uppercase tracking-widest border-b border-amber-400 pb-1">Start Custom Request</span>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Floating Moodboard Widget */}
            <MoodboardWidget />
        </main>
    );
}
