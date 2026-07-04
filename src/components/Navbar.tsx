"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showCopied, setShowCopied] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { label: "Work", href: "#gallery" },
        { label: "Client Love", href: "#client-love" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
    ];

    const handleMobileLinkClick = (href: string) => {
        setIsMobileMenuOpen(false);
        // Small delay to let the menu close animation start before scrolling
        setTimeout(() => {
            const el = document.querySelector(href);
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);
    };

    const handleShare = async () => {
        const shareData = {
            title: 'Meow Creative Concepts',
            text: 'Check out Meow Creative Concepts — curated handcrafted gifting!',
            url: 'https://www.meowcreativeconcepts.com',
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch (err) {
                // user cancelled or error
            }
        } else {
            try {
                await navigator.clipboard.writeText(shareData.url);
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
            } catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    };

    return (
        <>
            <div className="fixed top-6 left-0 w-full z-50 flex justify-between items-start px-6 md:px-12 pointer-events-none">
                {/* Left Pill: Brand Name */}
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
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
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="pointer-events-auto px-6 py-3 
                               bg-white/5 backdrop-blur-2xl saturate-150
                               border border-white/10
                               rounded-full
                               shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]
                               text-white relative group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

                    {/* Desktop Links & Share */}
                    <div className="relative z-10 hidden md:flex items-center gap-8 text-xs md:text-sm font-medium tracking-wide">
                        {navLinks.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="relative text-white/70 hover:text-white transition-colors duration-300"
                            >
                                {item.label}
                            </a>
                        ))}
                        
                        {/* Share Button (Desktop) */}
                        <button
                            onClick={handleShare}
                            className="relative text-white/70 hover:text-white transition-colors duration-300 flex items-center justify-center cursor-pointer border-l border-white/25 pl-4"
                            title={showCopied ? "Link Copied!" : "Share Website"}
                        >
                            {showCopied ? (
                                <span className="text-xs text-amber-400 font-medium animate-pulse">Copied!</span>
                            ) : (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 hover:opacity-100 transition-opacity">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="relative z-10 md:hidden p-1 cursor-pointer"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open navigation menu"
                    >
                        <div className="space-y-1.5 flex flex-col items-end">
                            <div className="w-6 h-0.5 bg-white/80 rounded-full" />
                            <div className="w-4 h-0.5 bg-white/80 rounded-full" />
                        </div>
                    </button>
                </motion.div>
            </div>

            {/* Mobile Full-Screen Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-2xl"
                        />

                        {/* Menu Content */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-[70] flex flex-col"
                        >
                            {/* Close Button Row */}
                            <div className="flex justify-between items-center px-6 pt-6">
                                {/* Brand in menu */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                    className="text-sm font-bold tracking-widest uppercase bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent"
                                >
                                    Meow Creative
                                </motion.div>

                                {/* X Close Button */}
                                <motion.button
                                    initial={{ opacity: 0, rotate: -90 }}
                                    animate={{ opacity: 1, rotate: 0 }}
                                    transition={{ delay: 0.1, duration: 0.4 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-label="Close navigation menu"
                                    className="w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-colors duration-200"
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M18 6L6 18M6 6l12 12" />
                                    </svg>
                                </motion.button>
                            </div>

                            {/* Nav Links — large stacked text */}
                            <div className="flex-1 flex flex-col justify-center px-8 gap-2">
                                {navLinks.map((item, index) => (
                                    <motion.button
                                        key={item.label}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -40 }}
                                        transition={{ delay: 0.15 + index * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => handleMobileLinkClick(item.href)}
                                        className="group text-left py-4 border-b border-white/10 last:border-none"
                                    >
                                        <span className="text-4xl font-light text-white/60 group-hover:text-white transition-colors duration-300 tracking-tight">
                                            {item.label}
                                        </span>
                                        <span className="ml-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                                            →
                                        </span>
                                    </motion.button>
                                ))}

                                {/* Share Link in Mobile Menu */}
                                <motion.button
                                    initial={{ opacity: 0, x: -40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -40 }}
                                    transition={{ delay: 0.15 + navLinks.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    onClick={handleShare}
                                    className="group text-left py-4 border-b border-white/10 last:border-none w-full"
                                >
                                    <span className="text-4xl font-light text-white/60 group-hover:text-white transition-colors duration-300 tracking-tight flex items-center gap-3">
                                        {showCopied ? "Link Copied!" : "Share Website"}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
                                            <circle cx="18" cy="5" r="3" />
                                            <circle cx="6" cy="12" r="3" />
                                            <circle cx="18" cy="19" r="3" />
                                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                        </svg>
                                    </span>
                                </motion.button>
                            </div>

                            {/* Footer of menu */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="px-8 pb-12 text-white/20 text-xs tracking-widest uppercase"
                            >
                                Meow Creative Concepts — Curated Gifting
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
