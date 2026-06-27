"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Genuine Email Verification Helper
const validateEmail = (email: string): { valid: boolean; error?: string } => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return { valid: false, error: "Please enter a valid email address format (e.g., name@domain.com)." };
  }

  const parts = email.split("@");
  const domain = parts[1].toLowerCase();

  const disposableDomains = [
    "mailinator.com", "trashmail.com", "10minutemail.com", "tempmail.com", 
    "yopmail.com", "dispostable.com", "guerrillamail.com", "sharklasers.com", 
    "getairmail.com", "throwawaymail.com", "temp-mail.org", "maildrop.cc",
    "fakermail.com", "fakemailgenerator.com", "tempmailaddress.com", "mytrashmail.com"
  ];

  if (disposableDomains.includes(domain)) {
    return { valid: false, error: "Temporary or disposable email addresses are not permitted. Please use a genuine email." };
  }

  const typoDomains: { [key: string]: string } = {
    "gmil.com": "gmail.com",
    "gmali.com": "gmail.com",
    "gmai.com": "gmail.com",
    "yahooo.com": "yahoo.com",
    "hotmial.com": "hotmail.com",
  };

  if (typoDomains[domain]) {
    return { valid: false, error: `Did you mean ${parts[0]}@${typoDomains[domain]}?` };
  }

  return { valid: true };
};

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [emailError, setEmailError] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const message = formData.get("message") as string;

    if (!name || !emailInput || !message) return;

    // Perform Genuine Email Check
    const validation = validateEmail(emailInput.trim());
    if (!validation.valid) {
      setEmailError(validation.error || "Invalid email address.");
      return;
    }

    setEmailError("");

    // 1. Create message object
    const newMessage = {
      id: Date.now().toString(),
      name,
      email: emailInput.trim(),
      message,
      date: new Date().toISOString()
    };

    // 2. Save to Admin panel storage
    const existing = localStorage.getItem("portfolio_messages");
    const messages = existing ? JSON.parse(existing) : [];
    const updated = [newMessage, ...messages]; // Put newest first
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));

    // 3. Show success state and reset form
    setStatus("success");
    form.reset();
    setEmailInput("");

    // Auto dismiss success alert after 6 seconds
    setTimeout(() => {
      setStatus("idle");
    }, 6000);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <div className="section-label"><span style={{ color: "#10b981" }}>05. Contact</span></div>
        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-3xl md:text-4xl font-bold mb-6">
          Let&apos;s <span style={{ background: "linear-gradient(135deg, #10b981, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-zinc-400 text-lg mb-12 max-w-2xl">
          Have a project in mind? Let&apos;s build something amazing together.
        </motion.p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="space-y-8">
            <div className="space-y-6">
              {[
                { icon: "📧", label: "Email", value: "kailasnath357@gmail.com", color: "#6366f1" },
                { icon: "📱", label: "Phone", value: "+91 9495951677", color: "#a855f7" },
                { icon: "📍", label: "Location", value: "Kozhikode, Kerala, India", color: "#06b6d4" },
              ].map((item, i) => (
                <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 + i * 0.1 }} className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all group-hover:scale-110" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}>{item.icon}</div>
                  <div><p className="text-zinc-500 text-xs uppercase tracking-wider">{item.label}</p><p className="text-white font-medium">{item.value}</p></div>
                </motion.div>
              ))}
            </div>
            <div>
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4">
                Follow Me
              </p>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="https://github.com/KailasnathB"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: "#6366f110",
                    color: "#6366f1",
                    border: "1px solid #6366f130",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0.297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385 0.6 0.113 0.82-0.258 0.82-0.577 0-0.285-0.01-1.04-0.015-2.04-3.338 0.724-4.042-1.61-4.042-1.61-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.745 0.084-0.729 0.084-0.729 1.205 0.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492 0.997 0.108-0.776 0.417-1.305 0.76-1.605-2.665-0.305-5.467-1.334-5.467-5.931 0-1.311 0.469-2.381 1.236-3.221-0.124-0.303-0.535-1.523 0.117-3.176 0 0 1.008-0.322 3.301 1.23 0.957-0.266 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.138 3.006 0.404 2.291-1.552 3.297-1.23 3.297-1.23 0.653 1.653 0.242 2.873 0.118 3.176 0.77 0.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921 0.43 0.371 0.814 1.103 0.814 2.222 0 1.606-0.014 2.898-0.014 3.293 0 0.322 0.216 0.694 0.824 0.576 4.765-1.588 8.199-6.084 8.199-11.385 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/kailasnath-b-905605376"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: "#06b6d410",
                    color: "#06b6d4",
                    border: "1px solid #06b6d430",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-0.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667h-3.554v-11.452h3.414v1.561h0.046c0.477-0.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zm-15.11-13.013c-1.144 0-2.063-0.926-2.063-2.065 0-1.138 0.92-2.063 2.063-2.063 1.14 0 2.064 0.925 2.064 2.063 0 1.139-0.925 2.065-2.064 2.065zm1.782 13.013h-3.564v-11.452h3.564v11.452zm15.106-20.465h-20.454c-0.979 0-1.771 0.774-1.771 1.729v20.541c0 0.956 0.792 1.729 1.771 1.729h20.451c0.978 0 1.778-0.773 1.778-1.729v-20.541c0-0.955-0.8-1.729-1.778-1.729z"/>
                  </svg>
                  LinkedIn
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/https://www.instagram.com/kaila_s8846?igsh=MTVkbnR2eG45d2ZlNg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: "#ec489910",
                    color: "#ec4899",
                    border: "1px solid #ec489930",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584 0.012 4.85 0.07 3.252 0.148 4.771 1.691 4.919 4.919 0.058 1.265 0.069 1.645 0.069 4.849 0 3.205-0.012 3.584-0.069 4.849-0.149 3.225-1.664 4.771-4.919 4.919-1.266 0.058-1.644 0.07-4.85 0.07-3.204 0-3.584-0.012-4.849-0.07-3.26-0.149-4.771-1.699-4.919-4.92-0.058-1.265-0.07-1.644-0.07-4.849 0-3.204 0.013-3.583 0.07-4.849 0.149-3.227 1.664-4.771 4.919-4.919 1.266-0.057 1.645-0.069 4.849-0.069zm0-2.163c-3.259 0-3.667 0.014-4.947 0.072-4.358 0.2-6.78 2.618-6.98 6.98-0.059 1.281-0.073 1.689-0.073 4.948 0 3.259 0.014 3.668 0.072 4.948 0.2 4.358 2.618 6.78 6.98 6.98 1.281 0.058 1.689 0.072 4.948 0.072 3.259 0 3.668-0.014 4.948-0.072 4.354-0.2 6.782-2.618 6.979-6.98 0.059-1.28 0.073-1.689 0.073-4.948 0-3.259-0.014-3.667-0.072-4.947-0.196-4.354-2.617-6.78-6.979-6.98-1.281-0.059-1.69-0.073-4.949-0.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-0.796 0-1.441 0.645-1.441 1.44s0.645 1.44 1.441 1.44c0.795 0 1.439-0.645 1.439-1.44s-0.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                </motion.a>
                <motion.a
                  href="https://x.com/kailas4405"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{
                    background: "#ffffff10",
                    color: "#ffffff",
                    border: "1px solid #ffffff30",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817h-3.31l7.73-8.835-8.156-10.665h6.826l4.713 6.231 5.452-6.231zm-1.161 17.52h1.833l-5.214-6.852-1.227 1.403 4.608 5.449z"/>
                  </svg>
                  X
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }}>
            <form onSubmit={handleSubmit} className="card space-y-5">
              <div>
                <input className="input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition-all" type="text" name="name" placeholder="Your Name" required />
              </div>
              <div>
                <input 
                  className={`input w-full px-4 py-3 bg-zinc-900 border ${emailError ? "border-red-500 focus:border-red-500" : "border-zinc-800 focus:border-emerald-500"} rounded-xl text-white placeholder-zinc-500 focus:outline-none transition-all`} 
                  type="email" 
                  name="email" 
                  value={emailInput}
                  onChange={(e) => { setEmailInput(e.target.value); if (emailError) setEmailError(""); }}
                  placeholder="Your Email" 
                  required 
                />
                {/* EMAIL ERROR ALERT */}
                {emailError && (
                  <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-medium flex items-center gap-1.5">
                    <span>⚠️</span> {emailError}
                  </motion.div>
                )}
              </div>
              <div>
                <textarea className="input w-full px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none transition-all" name="message" rows={5} placeholder="Your Message" required style={{ resize: "none" }} />
              </div>
              
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2">
                <span>Send Message</span> ✉️
              </button>

              {status === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-center text-sm font-medium"
                >
                  🎉 Message sent successfully! I will will reply you shortly
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
