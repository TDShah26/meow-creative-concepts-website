"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutUs() {
    return (
        <section id="about" className="relative py-24 px-6 md:px-12 bg-[#0f0f0f] overflow-hidden">
            {/* Decorative gradient blur */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-900/15 rounded-full blur-[100px] translate-y-1/3 pointer-events-none" />

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
                        Hi, we’re <span className="font-serif italic text-emerald-200">Shivani</span> and{" "}
                        <span className="font-serif italic text-emerald-200">Neepa</span>,
                    </h2>

                    <h3 className="text-xl md:text-2xl text-white/80 font-light max-w-3xl mx-auto">
                        Two creative souls who believe that gifting is an art and every creation tells a story.
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
                    {/* Founders Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative aspect-square w-full md:max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl shadow-emerald-900/20 group"
                    >
                        <div className="absolute inset-0 bg-neutral-800 animate-pulse z-0" /> {/* Loading state placeholder */}
                        <Image
                            src="/founders.jpg"
                            alt="Shivani and Neepa - Founders of Meow Creative Concepts"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                        <div className="absolute bottom-6 left-6 text-white z-10">
                            <p className="font-serif italic text-lg opacity-90">Founders</p>
                        </div>
                    </motion.div>

                    {/* Story Text */}
                    <div className="space-y-10 text-lg md:text-xl font-light text-white/85 leading-relaxed text-center md:text-left">
                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Meow Creative Concepts started as a passion project—born from our love
                            for{" "}
                            <strong className="font-medium text-white">
                                handcrafted details, celebrations, and thoughtful gifting
                            </strong>
                            .
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            What began with personalized gifts for friends blossomed into a space
                            where <strong className="font-medium text-white">art meets emotion</strong>.
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            Today, we combine creativity, curiosity, and a love for beautiful things
                            to design{" "}
                            <strong className="font-medium text-white">
                                custom gifting concepts, festive décor, luxe hampers, and creative
                                workshops
                            </strong>
                            —each crafted with care and imagination.
                        </motion.p>
                    </div>
                </div>
            </div>
        </section>
    );
}
