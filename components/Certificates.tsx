"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

interface Certificate {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  gradient: string[];
  icon: string;
  link: string;
  pdfData?: string;
}

export function Certificates() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  // Start with a completely clean slate (no hardcoded dummy certificates)
  const [certificates, setCertificates] = useState<Certificate[]>([]);

  // Load custom certificates directly from Admin Panel storage
  useEffect(() => {
    const savedCertificates = localStorage.getItem("portfolio_certificates");
    if (savedCertificates) {
      try {
        const parsed = JSON.parse(savedCertificates);
        if (parsed && Array.isArray(parsed)) {
          setCertificates(parsed);
        }
      } catch (e) {
        console.error("Error loading certificates", e);
      }
    }
  }, []);

  return (
    <section id="certificates" className="section" ref={ref}>
      <div className="container">
        <div className="section-label">
          <span style={{ color: "#f59e0b" }}>04. Certificates</span>
        </div>
        
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-3xl md:text-4xl font-bold mb-6">
          My <span className="gradient-warm">Certifications</span>
        </motion.h2>
        
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg mb-12 max-w-2xl">
          Continuous learning is key. Here are the certifications I&apos;ve earned. Click on any custom certificate to view or download the attached PDF.
        </motion.p>
        
        {certificates.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-12 text-center max-w-2xl mx-auto backdrop-blur-xl shadow-xl"
          >
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-white mb-2">Certifications are being verified</h3>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              I am currently uploading my verified PDF certificates and credentials through the Admin portal. Check back shortly to review them!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, i) => {
              const grad = cert.gradient || ["#f59e0b", "#f97316"];
              const targetUrl = cert.pdfData || cert.link || "#";
              const isPdf = !!cert.pdfData;

              return (
                <motion.a 
                  key={cert.title} 
                  href={targetUrl}
                  download={isPdf ? `${cert.title.replace(/\s+/g, "_")}_Certificate.pdf` : undefined}
                  target={isPdf ? undefined : "_blank"} 
                  rel={isPdf ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, y: 30 }} 
                  animate={isInView ? { opacity: 1, y: 0 } : {}} 
                  transition={{ duration: 0.5, delay: i * 0.1 }} 
                  className="block rounded-2xl overflow-hidden relative transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group flex flex-col h-full" 
                  style={{ background: "linear-gradient(135deg, #13131a, #1a1a24)", border: "1px solid #27272a" }}
                >
                  <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${grad[0]}, ${grad[1]})` }} />
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <motion.div 
                          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" 
                          style={{ background: `linear-gradient(135deg, ${grad[0]}20, ${grad[1]}20)`, border: `1px solid ${grad[0]}30` }} 
                          whileHover={{ rotate: 10, scale: 1.1 }}
                        >
                          {cert.icon || "🏆"}
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-white group-hover:text-indigo-300 transition-colors text-sm leading-snug">{cert.title}</h3>
                          <p className="text-zinc-500 text-xs mt-1">{cert.issuer} · {cert.date}</p>
                        </div>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-6">{cert.description}</p>
                    </div>

                    <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                      {isPdf ? (
                        <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-all">
                          <span>📄</span> Download PDF Certificate
                        </span>
                      ) : (
                        <div className="flex items-center gap-1 text-xs font-medium" style={{ color: grad[0] }}>
                          🏆 <span>View Certificate</span>
                          <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
