"use client";

import { motion } from "framer-motion";

export default function Testimonials() {
    return (
        <section id="client-love" className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#141414]">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-light"
                    >
                        Client <span className="font-serif italic font-normal text-emerald-200">love</span> we have received so far
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="p-8 rounded-2xl bg-white/8 border border-white/10 backdrop-blur-sm relative"
                        >
                            <div className="text-4xl text-emerald-200/20 font-serif absolute top-4 left-6">"</div>
                            <p className="text-white/85 italic leading-relaxed relative z-10 mb-6 font-light">
                                Simply amazing! The attention to detail in every hamper is just outstanding.
                                Meow Creative Concepts truly brings a magical touch to gifting.
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400" />
                                <div>
                                    <h4 className="text-sm font-medium">Happy Client</h4>
                                    <span className="text-xs text-white/40">CEO, Company</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
