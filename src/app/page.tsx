import GiftScroll from "@/components/GiftScroll";
import Navbar from "@/components/Navbar";
import AboutUs from "@/components/AboutUs";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
      <Navbar />

      {/* Hero Section */}
      <GiftScroll />

      <div className="relative z-10 bg-[#0a0a0a]">

        {/* Selected Works / Gallery */}
        <Gallery />

        {/* Testimonials */}
        <Testimonials />

        {/* About Section */}
        <AboutUs />

        {/* Footer */}
        <footer id="contact" className="py-32 px-4 text-center border-t border-white/10 bg-gradient-to-b from-[#0f0f0f] to-[#050505]">
          <div className="max-w-3xl mx-auto space-y-12">
            <h2 className="text-4xl md:text-7xl font-light tracking-tight hover:text-emerald-100 transition-colors duration-500 cursor-default">
              Let’s create something <span className="font-serif italic text-emerald-200">amazing</span> together!
            </h2>

            <div className="flex justify-center gap-6">
              <a
                href="mailto:meowcreativeconcepts@gmail.com"
                className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full overflow-hidden hover:bg-emerald-50 transition-colors duration-300"
              >
                <span className="relative z-10 font-medium tracking-wide">Get in Touch</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
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
