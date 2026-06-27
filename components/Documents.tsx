"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";

export function Documents() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const [docs, setDocs] = useState({
    abstract: { title: "", desc: "", link: "" },
    pdf1: { title: "", link: "" },
    pdf2: { title: "", link: "" }
  });

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_documents");
    if (saved) {
      try {
        setDocs(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading documents", e);
      }
    }
  }, []);

  const hasContent = docs.abstract.link || docs.pdf1.link || docs.pdf2.link;

  if (!hasContent) return null;

  return (
    <section id="documents" className="section" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span style={{ color: "#f59e0b" }}>04. Documents</span>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          animate={isInView ? { opacity: 1, y: 0 } : {}} 
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          Research & <span className="gradient-warm">Resources</span>
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Main Abstract Card */}
          {docs.abstract.link && (
            <motion.a
              href={docs.abstract.link}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="md:col-span-2 group block rounded-2xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #13131a, #1a1a24)", border: "1px solid #27272a" }}
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, #f59e0b, #ef4444)` }} />
              <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0" style={{ background: "rgba(245, 158, 11, 0.1)", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                  📄
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">{docs.abstract.title}</h3>
                  <p className="text-zinc-400 text-sm mt-2 leading-relaxed">{docs.abstract.desc}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-indigo-400">
                    <span>View / Download Abstract</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </motion.a>
          )}

          {/* Extra PDF 1 */}
          {docs.pdf1.link && (
            <motion.a
              href={docs.pdf1.link}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="group block rounded-2xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #13131a, #1a1a24)", border: "1px solid #27272a" }}
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, #06b6d4, #6366f1)` }} />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(6, 182, 212, 0.1)", border: "1px solid rgba(6, 182, 212, 0.3)" }}>📎</div>
                  <h3 className="font-semibold text-white">{docs.pdf1.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-400">
                  <span>Download PDF</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </motion.a>
          )}

          {/* Extra PDF 2 */}
          {docs.pdf2.link && (
            <motion.a
              href={docs.pdf2.link}
              target="_blank"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="group block rounded-2xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ background: "linear-gradient(135deg, #13131a, #1a1a24)", border: "1px solid #27272a" }}
            >
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, #a855f7, #ec4899)` }} />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: "rgba(168, 85, 247, 0.1)", border: "1px solid rgba(168, 85, 247, 0.3)" }}>📂</div>
                  <h3 className="font-semibold text-white">{docs.pdf2.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-indigo-400">
                  <span>Download PDF</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
              </div>
            </motion.a>
          )}

        </div>
      </div>
    </section>
  );
}