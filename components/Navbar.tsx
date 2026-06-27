"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const links = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Certs", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogoutClick = () => {
    sessionStorage.removeItem("portfolio_active_session");
    localStorage.removeItem("portfolio_entered");
    localStorage.removeItem("visitor_name");
    router.push("/logout");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-zinc-800/50 shadow-2xl" : ""
        }`}
      >
        <div className="max-w-[1100px] mx-auto px-6 py-4 flex items-center justify-between">
          {/* UPDATED LOGO FROM dev. TO Kailas. */}
          <a href="#" className="text-xl font-bold tracking-tight">
            Kailas<span className="text-indigo-400">.</span>
          </a>

          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-zinc-400 hover:text-white px-3 py-2 rounded-lg transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            
            <div className="w-px h-6 bg-zinc-800 mx-1" />

            <a
              href="/admin"
              className="text-sm text-indigo-400 hover:text-indigo-300 px-3.5 py-2 rounded-xl transition-all border border-indigo-500/30 bg-indigo-500/10 font-semibold flex items-center gap-1.5"
            >
              <span>⚙️</span> Admin
            </a>

            <button
              onClick={handleLogoutClick}
              className="text-sm text-red-400 hover:text-red-300 px-3.5 py-2 rounded-xl transition-all border border-red-500/30 bg-red-500/10 font-semibold flex items-center gap-1.5 hover:bg-red-500/20 cursor-pointer"
            >
              <span>🔒</span> Logout
            </button>
          </div>

          <button className="md:hidden text-zinc-400" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-6"
        >
          {links.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-2xl font-medium text-zinc-300 hover:text-white"
              onClick={() => setMobileOpen(false)}
            >
              {link.name}
            </motion.a>
          ))}
          
          <motion.a
            href="/admin"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-indigo-400 text-xl font-semibold flex items-center gap-2 mt-4"
            onClick={() => setMobileOpen(false)}
          >
            <span>⚙️</span> Admin Panel
          </motion.a>

          <button
            onClick={() => { setMobileOpen(false); handleLogoutClick(); }}
            className="text-red-400 text-xl font-semibold flex items-center gap-2 mt-2 cursor-pointer"
          >
            <span>🔒</span> Logout
          </button>
        </motion.div>
      )}
    </>
  );
}
