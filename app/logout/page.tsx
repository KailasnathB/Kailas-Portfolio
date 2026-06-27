"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LogoutPage() {
  const [visitorName, setVisitorName] = useState("");
  const [logoutStep, setLogoutStep] = useState(0);

  useEffect(() => {
    // Get visitor name before clearing
    const name = localStorage.getItem("visitor_name") || "Visitor";
    setVisitorName(name);

    // Completely purge session and storage credentials
    sessionStorage.removeItem("portfolio_active_session");
    localStorage.removeItem("portfolio_entered");
    localStorage.removeItem("visitor_name");

    // Animation timeline
    setTimeout(() => setLogoutStep(1), 1000); // Cleared credentials
    setTimeout(() => setLogoutStep(2), 2200); // Goodbye message
    setTimeout(() => {
      // Using window.location.href forces Next.js to do a clean document reload,
      // completely wiping the router cache and ensuring the gateway appears fresh!
      window.location.href = "/gateway";
    }, 3500); // Back to gateway
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center relative overflow-hidden text-white">
      {/* Background Glow Orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-red-600/10 blur-[120px]"
        animate={{ scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "-150px", left: "-150px" }}
      />
      <motion.div
        className="absolute w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[100px]"
        animate={{ scale: [1, 0.9, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "-150px", right: "-150px" }}
      />

      {/* Main Card */}
      <motion.div
        className="relative z-10 max-w-md w-full mx-6 bg-zinc-900/90 border border-zinc-800 rounded-3xl p-10 backdrop-blur-2xl shadow-2xl text-center"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center mb-8">
          {/* Rotating lock ring */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-red-500/30 border-t-red-500 border-l-purple-500 shadow-xl shadow-red-500/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          {/* Inside Lock Icon */}
          <motion.div 
            className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg shadow-red-500/40"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            🔒
          </motion.div>
        </div>

        <motion.h3 
          className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {logoutStep === 0 && "Securing Session..."}
          {logoutStep === 1 && "Credentials Cleared"}
          {logoutStep === 2 && `Goodbye, ${visitorName}!`}
        </motion.h3>

        <motion.p 
          className="text-zinc-400 text-sm font-medium mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {logoutStep === 0 && "Locking portfolio access and purging temporary visitor tokens..."}
          {logoutStep === 1 && "Secure disconnect verified. System successfully locked."}
          {logoutStep === 2 && "Thank you for exploring my digital workspace. Have a wonderful day!"}
        </motion.p>

        {/* Animated Progress Bar */}
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden relative">
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-indigo-500"
            initial={{ width: "15%" }}
            animate={{ width: logoutStep === 0 ? "55%" : logoutStep === 1 ? "90%" : "100%" }}
            transition={{ duration: 0.8 }}
          />
        </div>

        <p className="text-zinc-600 text-xs font-mono mt-8">
          $ sudo lock --session=ended --purge-cache
        </p>
      </motion.div>
    </div>
  );
}
