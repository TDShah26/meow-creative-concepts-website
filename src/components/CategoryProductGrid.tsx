"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import type { Product, CategoryInfo } from "@/data/products";

interface CategoryProductGridProps {
    category: CategoryInfo;
    products: Product[];
}

export default function CategoryProductGrid({ category, products }: CategoryProductGridProps) {
    const router = useRouter();

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
            <div className="pt-24 md:pt-32 pb-8 md:pb-16 px-4 md:px-8 max-w-7xl mx-auto">
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-amber-400 text-xs md:text-sm tracking-[0.2em] uppercase mb-2 md:mb-3"
                >
                    The Collection
                </motion.p>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl sm:text-5xl md:text-7xl font-serif text-white mb-3 md:mb-4"
                >
                    {category.name}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm md:text-lg text-white/40 max-w-xl"
                >
                    {category.description}
                </motion.p>
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="h-px w-24 md:w-32 bg-gradient-to-r from-amber-500 to-transparent mt-4 md:mt-8 origin-left"
                />
            </div>

            {/* Product Grid */}
            <div className="px-4 md:px-8 pb-16 md:pb-32 max-w-7xl mx-auto">
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
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
                                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-40 group-hover:opacity-70 transition-opacity" />

                                {/* WhatsApp Connect Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const imageUrl = `https://www.meowcreativeconcepts.com${product.image}`;
                                        const text = `Hi Meow Creative Concepts! 👋\n\nI love this item from your collection:\n\n🎁 *${product.title}* (${product.category})\n📸 ${imageUrl}\n\nCan we chat about pricing and customization?`;
                                        const encodedText = encodeURIComponent(text);
                                        window.open(`https://wa.me/919867077353?text=${encodedText}`, "_blank");
                                    }}
                                    className="absolute top-2 right-2 md:top-4 md:right-4 z-20 group/btn"
                                    title="Like this? Click to connect with us"
                                >
                                    <div className="relative w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-300 shadow-lg">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white/70 group-hover/btn:text-[#25D366] transition-colors duration-300 md:w-5 md:h-5">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </div>
                                    {/* Tooltip */}
                                    <div className="absolute top-1/2 right-10 md:right-12 -translate-y-1/2 scale-0 group-hover/btn:scale-100 bg-[#0f0f0f]/90 border border-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-[9px] md:text-xs text-white/95 whitespace-nowrap shadow-xl transition-all duration-300 origin-right pointer-events-none">
                                        Like this? Click to connect with us
                                    </div>
                                </button>

                                {/* Product Info */}
                                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-amber-400 text-[9px] md:text-xs tracking-widest uppercase mb-0.5 md:mb-1">{product.category}</p>
                                    <h3 className="text-sm md:text-xl font-serif text-white mb-1 md:mb-2">{product.title}</h3>
                                    <div className="flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                        {product.specs.slice(0, 2).map(spec => (
                                            <span key={spec} className="text-[8px] md:text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded bg-white/10 text-white/70 backdrop-blur-sm">
                                                {spec}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* Ghost Card (Custom Request CTA) — Now connected to WhatsApp */}
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: products.length * 0.1 }}
                            onClick={() => {
                                const text = `Hi Meow Creative Concepts! 👋\n\nI'd love to discuss a custom order. I have a unique vision and would love to design something from scratch with you!\n\nCan we chat about what's possible?`;
                                const encodedText = encodeURIComponent(text);
                                window.open(`https://wa.me/919867077353?text=${encodedText}`, "_blank");
                            }}
                            className="aspect-[4/5] rounded-xl border-2 border-dashed border-white/10 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300 flex flex-col items-center justify-center text-center p-4 md:p-8 cursor-pointer group"
                        >
                            <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white/5 flex items-center justify-center mb-3 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/40 group-hover:text-amber-400 md:w-6 md:h-6">
                                    <path d="M12 5v14M5 12h14" />
                                </svg>
                            </div>
                            <h3 className="text-base md:text-xl font-light text-white mb-1 md:mb-2">Have a unique vision?</h3>
                            <p className="text-xs md:text-sm text-white/50 mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">We love custom challenges. Let&apos;s design it from scratch.</p>
                            <span className="text-[10px] md:text-xs text-amber-400 uppercase tracking-widest border-b border-amber-400 pb-0.5">Start Custom Request</span>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            </div>
        </main>
    );
}
