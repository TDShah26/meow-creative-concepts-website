"use client";

import { useState } from "react";
import GiftScroll from "@/components/GiftScroll";
import Navbar from "@/components/Navbar";
import AboutUs from "@/components/AboutUs";
import MoodboardGallery from "@/components/MoodboardGallery";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const [showCopied, setShowCopied] = useState(false);

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
    <main className="min-h-screen bg-black text-white selection:bg-amber-500/30">
      <Navbar />

      {/* Hero Section */}
      <GiftScroll />

      <div className="relative z-10 bg-[#0a0a0a]">

        {/* Selected Works / Gallery */}
        <MoodboardGallery />

        {/* Testimonials */}
        <Testimonials />

        {/* About Section */}
        <AboutUs />

        {/* Footer */}
        <footer id="contact" className="py-32 px-4 text-center border-t border-white/10 bg-gradient-to-b from-[#0f0f0f] to-[#050505]">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-7xl font-light tracking-tight hover:text-amber-100 transition-colors duration-500 cursor-default">
              Let’s create something <span className="font-serif italic text-amber-200">amazing</span> together!
            </h2>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href="mailto:meowcreativeconcepts@gmail.com"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full overflow-hidden hover:bg-amber-50 transition-colors duration-300 w-full sm:w-auto justify-center"
              >
                <span className="relative z-10 font-medium tracking-wide">Get in Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200 to-orange-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>

              {/* Share Website Button */}
              <button
                onClick={handleShare}
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer w-full sm:w-auto justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/70 group-hover:text-white transition-colors">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span className="font-medium tracking-wide">{showCopied ? "Link Copied!" : "Share Website"}</span>
              </button>
            </div>

            <div className="pt-24 text-white/20 text-xs tracking-widest uppercase">
              © {new Date().getFullYear()} Meow Creative Concepts
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
