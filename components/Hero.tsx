"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function Hero() {
  const [resumePdf, setResumePdf] = useState<string>("");

  useEffect(() => {
    const savedResume = localStorage.getItem("portfolio_resume_pdf");
    if (savedResume) {
      setResumePdf(savedResume);
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-20 right-20 w-[350px] h-[350px] rounded-full bg-purple-600/10 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-pink-600/5 blur-[80px]" />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex-1 text-center lg:text-left">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            ✨ Available for opportunities
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Hi, I&apos;m <span className="gradient">Kailasnath B</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-lg md:text-xl text-zinc-400 max-w-xl mb-10 leading-relaxed">
            A passionate <span className="text-indigo-400 font-semibold">B-TECH COMPUTER SCIENCE STUDENT</span> crafting beautiful digital experiences with modern technologies.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="flex flex-wrap justify-center lg:justify-start gap-4">
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-outline">Get in Touch</a>
            
            {/* DYNAMIC RESUME DOWNLOAD BUTTON */}
            {resumePdf ? (
              <a 
                href={resumePdf} 
                download="Kailasnath_B_Resume.pdf"
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-2xl shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all flex items-center gap-2 text-sm group"
              >
                <span>📄</span> Download Resume
              </a>
            ) : (
              <button 
                onClick={() => alert("Resume is currently being updated. Please check back shortly or use the Let's Connect form!")}
                className="px-6 py-3.5 bg-zinc-800/80 hover:bg-zinc-800 border border-zinc-700 text-zinc-400 font-medium rounded-2xl transition-all flex items-center gap-2 text-sm cursor-pointer"
              >
                <span>📄</span> Resume (Updating...)
              </button>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
            <div className="flex items-center gap-2 text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Open to work</span>
            </div>
            <div className="text-zinc-500">📍 Kozhikode</div>
            <div className="text-zinc-500">🎓 KMCT INSTITUTE OF EMERGING TECHNOLOGY AND MANAGEMENT</div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.4 }} className="flex-shrink-0 relative">
          <div className="photo-ring">
             <div className="photo-ring-inner">
               <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-indigo-600/20 via-purple-600/20 to-pink-600/20 flex items-center justify-center overflow-hidden">
                <img 
                src="/PHOTO.jpg" 
                alt="Your Name" 
                className="w-full h-full object-cover" 
                onError={(e) => { 
                   console.error("Image failed to load:", (e.target as HTMLImageElement).src);
                }}
                />
              </div>
            </div>
          </div>
          <motion.div className="absolute -top-2 -right-2 px-4 py-2 rounded-full bg-zinc-900 border border-indigo-500/30 text-indigo-400 text-xs font-bold shadow-xl flex items-center gap-1.5" animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity }}>
            <span>💡</span> Python & IoT Dev
          </motion.div>
          <motion.div className="absolute -bottom-2 -left-2 px-4 py-2 rounded-full bg-zinc-900 border border-purple-500/30 text-purple-400 text-xs font-bold shadow-xl flex items-center gap-1.5" animate={{ y: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
            <span>🚀</span> B.Tech CSE Student
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
