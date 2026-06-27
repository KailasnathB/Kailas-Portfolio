"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Project {
  id?: string;
  title: string;
  description: string;
  details?: string;
  gradient: string[];
  tags: string[];
  link: string;
  icon: string;
  pdfData?: string;
}

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  // Start with a completely clean slate (no hardcoded projects)
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Load custom projects directly from Admin Panel storage
  useEffect(() => {
    const savedProjects = localStorage.getItem("portfolio_projects");
    if (savedProjects) {
      try {
        const parsed = JSON.parse(savedProjects);
        if (parsed && Array.isArray(parsed)) {
          setProjects(parsed);
        }
      } catch (e) {
        console.error("Error loading projects", e);
      }
    }
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span style={{ color: "#ec4899" }}>03. Projects</span>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Featured <span style={{ background: "linear-gradient(135deg, #ec4899, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Work</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          transition={{ delay: 0.1 }} 
          className="text-zinc-400 text-lg mb-12 max-w-2xl"
        >
          A collection of projects I&apos;m proud of. Click on any project to explore full details and download attached PDF reports.
        </motion.p>
        
        {/* Grid layout */}
        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-12 text-center max-w-2xl mx-auto backdrop-blur-xl shadow-xl"
          >
            <div className="text-4xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">Projects are being curated</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              I am currently uploading and structuring my project reports through the Admin portal. Check back shortly to explore my latest work!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {projects.map((p, i) => {
              const grad = p.gradient || ["#ec4899", "#a855f7"];
              return (
                <motion.div 
                  key={p.title} 
                  onClick={() => setSelectedProject(p)}
                  initial={{ opacity: 0, y: 30 }} 
                  animate={isInView ? { opacity: 1, y: 0 } : {}} 
                  transition={{ duration: 0.5, delay: i * 0.1 }} 
                  className="group block rounded-2xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer flex flex-col h-full" 
                  style={{ background: "linear-gradient(135deg, #13131a, #1a1a24)", border: "1px solid #27272a" }}
                >
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${grad[0]}, ${grad[1]})` }} />
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div 
                          className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" 
                          style={{ background: `linear-gradient(135deg, ${grad[0]}20, ${grad[1]}20)`, border: `1px solid ${grad[0]}30` }} 
                          whileHover={{ rotate: 5, scale: 1.1 }}
                        >
                          {p.icon || "💻"}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors text-lg mb-1">{p.title}</h3>
                          {p.pdfData && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] rounded-full font-bold tracking-wide uppercase">
                              <span>📄</span> PDF Report Attached
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3">{p.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.tags && p.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 text-xs rounded-lg font-medium" style={{ background: `${grad[0]}15`, color: grad[0], border: `1px solid ${grad[0]}25` }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: grad[0] }}>
                        <span>View Project Details</span>
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>

                      {/* DIRECT PDF DOWNLOAD BUTTON ON THE CARD */}
                      {p.pdfData && (
                        <a 
                          href={p.pdfData} 
                          download={`${p.title.replace(/\s+/g, "_")}_Report.pdf`}
                          onClick={(e) => e.stopPropagation()} // Prevent opening modal when clicking download directly
                          className="px-3 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <span>📥</span> Download PDF
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* ANIMATED POPUP MODAL */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[#13131a] border border-zinc-800 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8 relative"
              >
                {/* Header gradient bar */}
                <div 
                  className="h-2 w-full" 
                  style={{ background: `linear-gradient(90deg, ${selectedProject.gradient?.[0] || "#ec4899"}, ${selectedProject.gradient?.[1] || "#a855f7"})` }} 
                />

                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-zinc-800/60 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-all z-10"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-8 md:p-10">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-5 mb-6">
                    <div 
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ 
                        background: `linear-gradient(135deg, ${selectedProject.gradient?.[0] || "#ec4899"}20, ${selectedProject.gradient?.[1] || "#a855f7"}20)`, 
                        border: `1px solid ${selectedProject.gradient?.[0] || "#ec4899"}30` 
                      }}
                    >
                      {selectedProject.icon || "💻"}
                    </div>
                    <div className="pr-8">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                      {selectedProject.pdfData && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-bold uppercase tracking-wide">
                          <span>📄</span> PDF Document Attached
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {selectedProject.tags && selectedProject.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-3 py-1.5 text-xs rounded-xl font-semibold" 
                        style={{ 
                          background: `${selectedProject.gradient?.[0] || "#ec4899"}15`, 
                          color: selectedProject.gradient?.[0] || "#ec4899", 
                          border: `1px solid ${selectedProject.gradient?.[0] || "#ec4899"}25` 
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Short Description */}
                  <div className="mb-8">
                    <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-3">Overview</h4>
                    <p className="text-zinc-300 text-base leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Detailed Explanation */}
                  {selectedProject.details && (
                    <div className="mb-10">
                      <h4 className="text-xs uppercase tracking-wider text-zinc-500 font-bold mb-3">Full Project Breakdown</h4>
                      <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-6 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap">
                        {selectedProject.details}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-zinc-800">
                    {selectedProject.pdfData && (
                      <a 
                        href={selectedProject.pdfData} 
                        download={`${selectedProject.title.replace(/\s+/g, "_")}_Report.pdf`}
                        className="flex-1 py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-center shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 group"
                      >
                        <span>📄 Download PDF Report</span>
                        <svg className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    )}
                    {selectedProject.link && selectedProject.link !== "#" && (
                      <a 
                        href={selectedProject.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 py-4 px-6 rounded-2xl text-white font-bold text-center shadow-lg transition-all flex items-center justify-center gap-2 group hover:opacity-90"
                        style={{ background: `linear-gradient(135deg, ${selectedProject.gradient?.[0] || "#ec4899"}, ${selectedProject.gradient?.[1] || "#a855f7"})` }}
                      >
                        <span>Visit Live Project</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white font-bold rounded-2xl transition-all text-center"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
