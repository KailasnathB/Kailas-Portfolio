"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const skills = [
  { name: "Arduino", level: 95, color: "#6366f1" },
  { name: "Python", level: 90, color: "#8b5cf6" },
  { name: "C-programing", level: 85, color: "#a855f7" },
  { name: "Web Development", level: 92, color: "#06b6d4" },
  ];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <div className="section-label"><span style={{ color: "#06b6d4" }}>02. Tech Stack</span></div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-3xl md:text-4xl font-bold mb-6">Skills & <span className="gradient-cyan">Expertise</span></motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg mb-12 max-w-2xl">Technologies I work with daily to build modern, scalable applications.</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((skill, i) => (
            <motion.div key={skill.name} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.08 }}>
              <div className="card py-5 px-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-zinc-200 font-medium">{skill.name}</span>
                  <span className="text-xs font-mono" style={{ color: skill.color }}>{skill.level}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : {}} transition={{ duration: 1, delay: 0.3 + i * 0.08, ease: "easeOut" }} className="h-full rounded-full" style={{ background: `linear-gradient(90deg, ${skill.color}, ${skill.color}80)`, boxShadow: `0 0 12px ${skill.color}40` }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
