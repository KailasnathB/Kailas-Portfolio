"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

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

export default function GatewayPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [authStep, setAuthStep] = useState(0); 
  const [step, setStep] = useState(0);
  const [particles] = useState(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  );

  useEffect(() => {
    setTimeout(() => setStep(1), 400);
    setTimeout(() => setStep(2), 800);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    
    // Perform Genuine Email Check
    const validation = validateEmail(email.trim());
    if (!validation.valid) {
      setEmailError(validation.error || "Invalid email address.");
      return;
    }
    
    setEmailError("");
    setLoading(true);

    try {
      // 1. Save visitor data
      const visitors = JSON.parse(localStorage.getItem("portfolio_visitors") || "[]");
      visitors.push({ name: name.trim(), email: email.trim(), date: new Date().toISOString() });
      localStorage.setItem("portfolio_visitors", JSON.stringify(visitors));
      localStorage.setItem("portfolio_entered", "true");
      localStorage.setItem("visitor_name", name.trim());
      
      // sessionStorage ensures if they close the tab/browser, they must log in again
      sessionStorage.setItem("portfolio_active_session", "true");

      // 2. Animate authentication stages
      setTimeout(() => setAuthStep(1), 600); // Verify credentials
      setTimeout(() => setAuthStep(2), 1400); // Welcome message & zoom warp
      
      // 3. Final push to portfolio
      setTimeout(() => {
        router.push("/");
      }, 2400);
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden">
      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-indigo-500/30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{
              y: [0, -50 - p.speed * 20, 0],
              opacity: [0, p.opacity, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{ duration: 3 + p.speed, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Background Glow Orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-indigo-600/15 blur-[140px]"
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-200px", left: "-200px" }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-purple-600/15 blur-[120px]"
        animate={{ x: [0, -40, 50, 0], y: [0, 30, -40, 0], scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-150px", right: "-150px" }}
      />

      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          animate={{ y: ["-100%", "100vh"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-md w-full mx-6 flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!loading ? (
            <motion.div
              key="form-card"
              className="w-full"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <motion.div className="text-center mb-10" initial={{ opacity: 0 }} animate={step >= 1 ? { opacity: 1 } : {}}>
                {/* ULTRA MODERN NEON WELCOME HEADER */}
                <motion.div
                  className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tighter font-sans"
                  initial={{ scale: 0.8 }}
                  animate={step >= 1 ? { scale: 1 } : {}}
                  transition={{ duration: 0.6, ease: "backOut" }}
                >
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]">
                    WELCOME
                  </span>
                  <span className="text-cyan-400 animate-pulse drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]">.</span>
                </motion.div>
                <p className="text-zinc-400 text-sm font-medium">Enter your details to unlock the portfolio</p>
              </motion.div>

              <motion.div
                className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                {/* PRESERVED USER'S CUSTOM PORTFOLIO BADGE HEADER */}
                <div className="flex items-center gap-2 mb-8 pb-4 border-b border-zinc-800/80">
                  <div className="w-3 h-3 rounded-full bg-cyan-400/80 shadow-lg shadow-cyan-400/20" />
                  <div className="w-3 h-3 rounded-full bg-purple-400/80 shadow-lg shadow-purple-400/20" />
                  <div className="w-3 h-3 rounded-full bg-pink-400/80 shadow-lg shadow-pink-400/20" />
                  <span className="ml-auto text-zinc-500 text-xs font-mono">KAILASNATH B</span>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={step >= 2 ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.6 }}>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider font-semibold">Your Name</label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 border border-zinc-700/80 rounded-2xl text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all text-sm font-medium"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div initial={{ opacity: 0, x: -20 }} animate={step >= 2 ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.7 }}>
                    <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-wider font-semibold">Email Address</label>
                    <div className="relative">
                      <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); if (emailError) setEmailError(""); }}
                        placeholder="you@example.com"
                        className={`w-full pl-12 pr-4 py-3.5 bg-zinc-800/50 border ${emailError ? "border-red-500 focus:border-red-500" : "border-zinc-700/80 focus:border-indigo-500"} rounded-2xl text-white placeholder-zinc-600 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all text-sm font-medium`}
                        required
                      />
                    </div>
                    {/* EMAIL ERROR ALERT */}
                    {emailError && (
                      <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-3 p-3.5 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-medium flex items-center gap-2 shadow-lg">
                        <span>⚠️</span> {emailError}
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 text-base group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={step >= 2 ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 }}
                  >
                    <span>🔐 Access Portfolio</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.button>
                </form>

                <p className="text-center text-zinc-600 text-xs mt-8 font-mono">
                  $ sudo initialize --visitor=&quot;{name || "guest"}&quot;
                </p>
              </motion.div>
            </motion.div>
          ) : (
            /* IMMERSIVE SUCCESS TRANSITION (THE "STARTING GATE" EFFECT) */
            <motion.div
              key="auth-transition"
              className="w-full flex flex-col items-center justify-center text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={authStep === 2 ? { scale: [1, 1.1, 15], opacity: [1, 1, 0] } : { opacity: 1, scale: 1 }}
              transition={{ duration: authStep === 2 ? 1.0 : 0.5, ease: "easeInOut" }}
            >
              <div className="relative w-32 h-32 flex items-center justify-center mb-8">
                {/* Outer glowing progress ring */}
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-indigo-500/30 border-t-indigo-500 border-r-purple-500 shadow-2xl shadow-indigo-500/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                {/* Inner glowing pulse */}
                <motion.div 
                  className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-purple-500/50 text-3xl"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {authStep >= 1 ? "🚀" : "🛡️"}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/90 border border-zinc-800 px-8 py-6 rounded-3xl backdrop-blur-2xl shadow-2xl max-w-sm w-full"
              >
                <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                  {authStep === 0 && "Authenticating..."}
                  {authStep === 1 && "Access Granted!"}
                  {authStep === 2 && `Welcome, ${name}!`}
                </h3>
                <p className="text-sm text-zinc-400 font-medium">
                  {authStep === 0 && "Verifying secure visitor token..."}
                  {authStep === 1 && "Establishing secure connection..."}
                  {authStep === 2 && "Entering the digital realm..."}
                </p>

                {/* Animated loading bar */}
                <div className="w-full h-1.5 bg-zinc-800 rounded-full mt-6 overflow-hidden relative">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ width: "10%" }}
                    animate={{ width: authStep === 0 ? "50%" : authStep === 1 ? "90%" : "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
