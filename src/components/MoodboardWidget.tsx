"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMoodboard } from "@/context/MoodboardContext";
import { products } from "@/data/products";

export default function MoodboardWidget() {
    const { selectedItemIds, removeFromMoodboard, clearMoodboard, isDrawerOpen, setDrawerOpen } = useMoodboard();
    const [isMounted, setIsMounted] = useState(false);

    // Hydration check
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const selectedProducts = products.filter(p => selectedItemIds.includes(p.id));
    const itemCount = selectedProducts.length;

    // WhatsApp Message Generator
    const handleWhatsAppChat = () => {
        const itemNames = selectedProducts.map(p => `• ${p.title} (${p.category})`).join("\n");
        const text = `Hi Meow Concepts! 👋\n\nI have curated a moodboard from your website and I'd love to discuss a custom order based on these items:\n\n${itemNames}\n\nCan we chat about pricing and customization?`;

        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/919876543210?text=${encodedText}`, "_blank");
    };

    return (
        <>
            <AnimatePresence>
                {itemCount > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-6 right-6 z-50 pointer-events-auto"
                    >
                        <div className="flex items-center gap-1 bg-white text-black pl-2 pr-2 py-2 rounded-full shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] hover:scale-105 transition-transform duration-300">
                            {/* Main Click Area (Open Drawer) */}
                            <button
                                onClick={() => setDrawerOpen(true)}
                                className="group/main flex items-center gap-3 pr-3 border-r border-black/10"
                            >
                                <div className="flex -space-x-2 overflow-hidden">
                                    {selectedProducts.slice(0, 3).map((p) => (
                                        <div key={p.id} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-bold leading-tight">{itemCount} items</span>
                                    <span className="text-[10px] text-black/60 font-medium uppercase tracking-wider group-hover/main:text-amber-600 transition-colors">Review</span>
                                </div>
                            </button>

                            {/* Clear Button (Small X) */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (confirm('Clear your moodboard?')) clearMoodboard();
                                }}
                                className="p-2 text-black/40 hover:text-red-500 hover:bg-black/5 rounded-full transition-colors"
                                title="Clear All"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Side Drawer */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setDrawerOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#0f0f0f] border-l border-white/10 shadow-2xl z-50 flex flex-col"
                        >
                            {/* Drawer Header */}
                            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-[#0f0f0f]">
                                <div>
                                    <h2 className="text-xl font-serif text-white">Your Moodboard</h2>
                                    <p className="text-xs text-white/50 mt-1">Found {itemCount} items you love</p>
                                </div>
                                <button
                                    onClick={() => setDrawerOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/50 hover:text-white"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                                {selectedProducts.length === 0 ? (
                                    <div className="text-center py-20 opacity-50">
                                        <p>Your moodboard is empty.</p>
                                        <div className="text-center py-20 opacity-50">
                                            <p>Your moodboard is empty.</p>
                                            <button onClick={() => setDrawerOpen(false)} className="mt-4 text-amber-400 underline">Browse Gallery</button>
                                        </div>
                                    </div>
                                ) : (
                                    selectedProducts.map((p) => (
                                        <div key={p.id} className="flex gap-4 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                                            <div className="w-20 h-20 rounded bg-white/10 flex-shrink-0 overflow-hidden">
                                                <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-center">
                                                <span className="text-[10px] text-amber-400 uppercase tracking-widest mb-1">{p.category}</span>
                                                <h4 className="text-white font-medium">{p.title}</h4>
                                            </div>
                                            <button
                                                onClick={() => removeFromMoodboard(p.id)}
                                                className="self-center p-2 text-white/30 hover:text-red-400 transition-colors"
                                                title="Remove"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Drawer Footer */}
                            <div className="p-6 border-t border-white/10 bg-[#0a0a0a]">
                                <button
                                    onClick={handleWhatsAppChat}
                                    disabled={itemCount === 0}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <span>Chat on WhatsApp</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="opacity-60 group-hover:translate-x-1 transition-transform">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                    </svg>
                                </button>
                                <p className="text-[10px] text-white/30 text-center mt-3">We typically reply within 2 hours.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
