"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const details = [
  { label: "Full Name", value: "Kailasnath B", icon: "👤" },
  { label: "Email", value: "kailasnath357@gmail.com", icon: "📧" },
  { label: "Phone", value: "+91 9495951677", icon: "📱" },
  { label: "Location", value: "Kozhikode, Kerala, India", icon: "📍" },
  { label: "Education", value: "B.Tech in Computer Science", icon: "🎓" },
  { label: "Education Status", value: "Pursuing", icon: "🎓" },
  { label: "Languages", value: "English, Hindi, Malayalam", icon: "🌐" },
  { label: "Freelance", value: "Available", icon: "💼" },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [resumePdf, setResumePdf] = useState<string>("");

  useEffect(() => {
    const savedResume = localStorage.getItem("portfolio_resume_pdf");
    if (savedResume) {
      setResumePdf(savedResume);
    }
  }, []);

  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <div className="section-label"><span style={{ color: "#a855f7" }}>01. About Me</span></div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-3xl md:text-4xl font-bold mb-6">Know Me <span className="gradient-cyan">Better</span></motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg mb-12 max-w-3xl leading-relaxed">
          I&apos;m a passionate engineering student who is so passionate about coding. I specialize in Python programming, Arduino and IoT Development, and creating seamless user experiences.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {details.map((d, i) => (
            <motion.div key={d.label} initial={{ opacity: 0, x: -10 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 + i * 0.05 }} className="card flex items-center gap-4 py-4 px-5">
              <span className="text-2xl">{d.icon}</span>
              <div><p className="text-zinc-500 text-xs uppercase tracking-wider font-medium">{d.label}</p><p className="text-white font-medium text-sm">{d.value}</p></div>
            </motion.div>
          ))}
        </motion.div>

        {/* RESUME DOWNLOAD CARD */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }} className="max-w-xl">
          {resumePdf ? (
            <a 
              href={resumePdf}
              download="Kailasnath_B_Resume.pdf"
              className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-3xl flex items-center justify-between group hover:border-emerald-500/50 transition-all shadow-xl block"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-2xl flex items-center justify-center group-hover:scale-110 transition-all">📄</div>
                <div>
                  <h4 className="text-white font-bold text-lg group-hover:text-emerald-400 transition-colors">Curriculum Vitae / Resume</h4>
                  <p className="text-zinc-400 text-sm mt-1">Verified PDF document attached</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold group-hover:bg-emerald-500/20 transition-all">
                Download PDF
              </span>
            </a>
          ) : (
            <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-3xl flex items-center justify-between opacity-80">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-zinc-800 text-zinc-500 text-2xl flex items-center justify-center">📄</div>
                <div>
                  <h4 className="text-white font-bold text-lg">Curriculum Vitae / Resume</h4>
                  <p className="text-zinc-500 text-sm mt-1">Currently updating... Check back shortly!</p>
                </div>
              </div>
              <span className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-xl text-xs font-medium">
                Updating...
              </span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
