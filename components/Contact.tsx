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
              <p className="text-zinc-500 text-xs uppercase tracking-wider mb-4">Follow Me</p>
              <div className="flex gap-3">
                {["GitHub", "LinkedIn", "Twitter", "Instagram"].map((s, i) => {
                  const colors = ["#6366f1", "#06b6d4", "#a855f7", "#ec4899"];
                  return (
                    <motion.a key={s} href="#" className="px-4 py-2 rounded-xl text-sm font-medium transition-all" style={{ background: `${colors[i]}10`, color: colors[i], border: `1px solid ${colors[i]}20` }} whileHover={{ scale: 1.05, background: `${colors[i]}20` }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 10 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.6 + i * 0.1 }}>{s}</motion.a>
                  );
                })}
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
                  🎉 Message sent successfully! I will check it in the admin dashboard.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
