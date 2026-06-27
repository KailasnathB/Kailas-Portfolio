"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_PASSWORD = "admin123";

interface Visitor { name: string; email: string; date: string; }
interface Message { id: string; name: string; email: string; message: string; date: string; }
interface Project { id: string; title: string; description: string; details: string; tags: string[]; link: string; icon: string; gradient: string[]; pdfData?: string; }
interface Certificate { id: string; title: string; issuer: string; date: string; description: string; icon: string; link: string; gradient: string[]; pdfData?: string; }
interface Experience { id: string; role: string; company: string; period: string; description: string; }

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState<"messages" | "resume" | "projects" | "certificates" | "visitors" | "experiences">("resume");
  
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [resumePdf, setResumePdf] = useState<string>("");
  const [resumeNotice, setResumeNotice] = useState<string>("");

  // Form states
  const [newProject, setNewProject] = useState({ title: "", description: "", details: "", tags: "", link: "", icon: "💻", pdfData: "" });
  const [newCert, setNewCert] = useState({ title: "", issuer: "", date: "", description: "", link: "", icon: "🏆", pdfData: "" });
  const [newExperience, setNewExperience] = useState({ role: "", company: "", period: "", description: "" });

  // Edit states
  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [editingCert, setEditingCert] = useState<string | null>(null);
  const [editingExp, setEditingExp] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem("admin_auth") === "true") setAuthenticated(true);
    
    const v = localStorage.getItem("portfolio_visitors");
    if (v) setVisitors(JSON.parse(v));
    
    const m = localStorage.getItem("portfolio_messages");
    if (m) setMessages(JSON.parse(m));

    const p = localStorage.getItem("portfolio_projects");
    if (p) setProjects(JSON.parse(p));

    const c = localStorage.getItem("portfolio_certificates");
    if (c) setCertificates(JSON.parse(c));

    const e = localStorage.getItem("portfolio_experiences");
    if (e) setExperiences(JSON.parse(e));

    const r = localStorage.getItem("portfolio_resume_pdf");
    if (r) setResumePdf(r);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
    } else {
      setError("Wrong password!");
    }
  };

  // PDF File Upload Handler (Converts PDF to Base64 string)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: "project" | "cert" | "edit_project" | "edit_cert" | "resume", id?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      if (target === "resume") {
        setResumePdf(base64String);
        localStorage.setItem("portfolio_resume_pdf", base64String);
        setResumeNotice("uploaded");
      } else if (target === "project") {
        setNewProject((prev) => ({ ...prev, pdfData: base64String }));
      } else if (target === "cert") {
        setNewCert((prev) => ({ ...prev, pdfData: base64String }));
      } else if (target === "edit_project" && id) {
        updateProject(id, "pdfData", base64String);
      } else if (target === "edit_cert" && id) {
        updateCertificate(id, "pdfData", base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  // Delete Resume Action
  const deleteResume = () => {
    localStorage.removeItem("portfolio_resume_pdf");
    setResumePdf("");
    setResumeNotice("deleted");
  };

  // Messages Actions
  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    localStorage.setItem("portfolio_messages", JSON.stringify(updated));
  };

  // Projects Actions
  const addProject = () => {
    if (!newProject.title) return;
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      details: newProject.details,
      tags: newProject.tags.split(",").map((t: string) => t.trim()).filter(Boolean),
      link: newProject.link || "#",
      icon: newProject.icon || "💻",
      gradient: ["#ec4899", "#a855f7"],
      pdfData: newProject.pdfData || undefined
    };
    const updated = [...projects, project];
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
    setNewProject({ title: "", description: "", details: "", tags: "", link: "", icon: "💻", pdfData: "" });
  };

  const updateProject = (id: string, field: string, value: string) => {
    const updated = projects.map((p) => p.id === id ? { ...p, [field]: field === "tags" ? value.split(",").map((t: string) => t.trim()) : value } : p);
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    localStorage.setItem("portfolio_projects", JSON.stringify(updated));
  };

  // Certificates Actions
  const addCertificate = () => {
    if (!newCert.title) return;
    const cert: Certificate = {
      id: Date.now().toString(),
      title: newCert.title,
      issuer: newCert.issuer,
      date: newCert.date || new Date().getFullYear().toString(),
      description: newCert.description,
      link: newCert.link || "#",
      icon: newCert.icon || "🏆",
      gradient: ["#f59e0b", "#f97316"],
      pdfData: newCert.pdfData || undefined
    };
    const updated = [...certificates, cert];
    setCertificates(updated);
    localStorage.setItem("portfolio_certificates", JSON.stringify(updated));
    setNewCert({ title: "", issuer: "", date: "", description: "", link: "", icon: "🏆", pdfData: "" });
  };

  const updateCertificate = (id: string, field: string, value: string) => {
    const updated = certificates.map((c) => c.id === id ? { ...c, [field]: value } : c);
    setCertificates(updated);
    localStorage.setItem("portfolio_certificates", JSON.stringify(updated));
  };

  const deleteCertificate = (id: string) => {
    const updated = certificates.filter((c) => c.id !== id);
    setCertificates(updated);
    localStorage.setItem("portfolio_certificates", JSON.stringify(updated));
  };

  // Experience Actions
  const addExperience = () => {
    if (!newExperience.role) return;
    const exp: Experience = { id: Date.now().toString(), role: newExperience.role, company: newExperience.company, period: newExperience.period, description: newExperience.description };
    const updated = [...experiences, exp];
    setExperiences(updated);
    localStorage.setItem("portfolio_experiences", JSON.stringify(updated));
    setNewExperience({ role: "", company: "", period: "", description: "" });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    const updated = experiences.map((e) => e.id === id ? { ...e, [field]: value } : e);
    setExperiences(updated);
    localStorage.setItem("portfolio_experiences", JSON.stringify(updated));
  };

  const deleteExperience = (id: string) => {
    const updated = experiences.filter((e) => e.id !== id);
    setExperiences(updated);
    localStorage.setItem("portfolio_experiences", JSON.stringify(updated));
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm mx-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Admin<span className="text-indigo-400">.</span></h1>
            <p className="text-zinc-500 text-sm">Enter password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition-all" required />
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">Login</button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Admin<span className="text-indigo-400">.</span></h1>
          <div className="flex gap-4">
            <a href="/" className="text-zinc-400 hover:text-white text-sm font-medium">← Back to Portfolio</a>
            <button onClick={() => { setAuthenticated(false); localStorage.removeItem("admin_auth"); }} className="text-zinc-400 hover:text-white text-sm font-medium">Logout</button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: "resume" as const, label: `📄 Resume Upload` },
            { id: "messages" as const, label: `Messages (${messages.length})` },
            { id: "projects" as const, label: `Projects (${projects.length})` },
            { id: "certificates" as const, label: `Certificates (${certificates.length})` },
            { id: "visitors" as const, label: `Visitors (${visitors.length})` },
            { id: "experiences" as const, label: `Experience (${experiences.length})` }
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800"}`}>{tab.label}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* RESUME TAB */}
          {activeTab === "resume" && (
            <motion.div key="resume" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-2xl mx-auto shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-3xl flex items-center justify-center mx-auto mb-4">📄</div>
                <h2 className="text-2xl font-bold text-white mb-2">Upload or Delete Your PDF Resume</h2>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                  Attach your professional PDF resume here, or remove it entirely from your live website with one click.
                </p>
              </div>

              <div className="bg-zinc-800/40 border border-zinc-700/80 rounded-2xl p-6 text-center">
                <label className="block text-sm font-bold text-zinc-300 mb-4 uppercase tracking-wider">
                  {resumePdf ? "Change Attached PDF Resume" : "Select PDF Resume File"}
                </label>
                <input 
                  type="file" 
                  accept="application/pdf" 
                  onChange={(e) => handleFileUpload(e, "resume")} 
                  className="text-sm text-zinc-400 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 file:transition-all cursor-pointer w-full mx-auto block max-w-sm mb-6" 
                />
                
                {resumePdf ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-sm font-bold flex items-center justify-center gap-2 shadow-lg">
                      <span>🎉</span> Resume PDF is active on your home page!
                    </div>
                    
                    {/* DELETE RESUME BUTTON */}
                    <button 
                      onClick={deleteResume}
                      className="w-full max-w-sm mx-auto py-3 px-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>🗑️</span> Delete Attached Resume
                    </button>
                  </div>
                ) : (
                  <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400/90 text-xs font-medium flex items-center justify-center gap-2">
                    <span>⚠️</span> No resume attached yet. Upload one above to activate download buttons.
                  </div>
                )}

                {resumeNotice === "deleted" && !resumePdf && (
                  <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
                    <span>🗑️</span> Resume successfully removed from live website!
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === "messages" && (
            <motion.div key="messages" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800"><h2 className="text-lg font-semibold">Incoming Messages</h2></div>
              {messages.length === 0 ? <div className="p-12 text-center text-zinc-500">No messages received yet. When visitors use the 'Let's Connect' form, they will appear here!</div> : (
                <div className="divide-y divide-zinc-800">
                  {messages.map((m) => (
                    <div key={m.id} className="p-6 hover:bg-zinc-800/20 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-bold text-white text-lg">{m.name}</h3>
                            <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">{m.email}</span>
                            <span className="text-xs text-zinc-500">{new Date(m.date).toLocaleString()}</span>
                          </div>
                          <p className="text-zinc-300 mt-3 bg-zinc-800/40 p-4 rounded-xl border border-zinc-700/40 whitespace-pre-wrap text-sm leading-relaxed">{m.message}</p>
                        </div>
                        <button onClick={() => deleteMessage(m.id)} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20 transition-all flex-shrink-0">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 text-indigo-400 flex items-center gap-2"><span>✨</span> Add New Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Project Title (e.g. AI Voice Bot)" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Icon Emoji (e.g. 🤖, 🚨, 💻)" value={newProject.icon} onChange={(e) => setNewProject({ ...newProject, icon: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all md:col-span-2" placeholder="Short Description (appears on card)" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
                  <textarea className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all md:col-span-2" rows={4} placeholder="Full Project Details & Explanation (appears in animated popup screen when clicked!)" value={newProject.details} onChange={(e) => setNewProject({ ...newProject, details: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Tags (comma separated, e.g. Python, OpenAI, React)" value={newProject.tags} onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="External / Live Link (optional)" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
                  
                  {/* PDF UPLOAD FIELD */}
                  <div className="md:col-span-2 bg-zinc-800/30 border border-zinc-700/80 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                      <span>📄</span> Attach PDF Document / Report for this Project
                    </label>
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={(e) => handleFileUpload(e, "project")} 
                      className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 file:transition-all cursor-pointer w-full" 
                    />
                    {newProject.pdfData && <p className="text-emerald-400 text-xs mt-2 font-medium">✓ PDF attached successfully! It will be available for download in the project popup.</p>}
                  </div>
                </div>
                <button onClick={addProject} className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/20">Save Project</button>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800"><h2 className="text-lg font-semibold">Your Custom Projects ({projects.length})</h2></div>
                {projects.length === 0 ? <div className="p-12 text-center text-zinc-500">No custom projects added yet. Add one above to populate your live website!</div> : (
                  <div className="divide-y divide-zinc-800">{projects.map((p) => (
                    <div key={p.id} className="p-6">
                      {editingProject === p.id ? (
                        <div className="space-y-4 bg-zinc-800/20 p-6 rounded-2xl border border-zinc-700/60">
                          <div className="border-b border-zinc-700 pb-3 mb-2">
                            <h3 className="text-md font-bold text-indigo-400 flex items-center gap-2"><span>✏️</span> Edit Project Texts & Details</h3>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Project Title</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none font-medium" value={p.title} onChange={(e) => updateProject(p.id, "title", e.target.value)} placeholder="Project Title" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Icon Emoji</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none font-medium" value={p.icon} onChange={(e) => updateProject(p.id, "icon", e.target.value)} placeholder="Icon Emoji (e.g. 💻, 🤖)" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Short Overview (Appears on outer card)</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none font-medium" value={p.description} onChange={(e) => updateProject(p.id, "description", e.target.value)} placeholder="Short Description" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Full Project Details & Explanation (Appears inside Animated Popup)</label>
                            <textarea className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none font-medium leading-relaxed" rows={5} value={p.details || ""} onChange={(e) => updateProject(p.id, "details", e.target.value)} placeholder="Full Project Details (Popup Content)" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Tags / Technologies (Comma Separated)</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none font-medium" value={p.tags.join(", ")} onChange={(e) => updateProject(p.id, "tags", e.target.value)} placeholder="Tags (comma separated)" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">External Live Link / Demo URL</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none font-medium" value={p.link} onChange={(e) => updateProject(p.id, "link", e.target.value)} placeholder="Link" />
                          </div>
                          
                          <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-4">
                            <label className="block text-xs font-semibold text-zinc-300 mb-2">Update Attached PDF Document</label>
                            <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, "edit_project", p.id)} className="text-xs text-zinc-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-400 hover:file:bg-indigo-500/20 file:transition-all cursor-pointer" />
                            {p.pdfData && <span className="text-emerald-400 text-xs ml-2 font-bold">✓ PDF Attached</span>}
                          </div>

                          <div className="pt-2">
                            <button onClick={() => setEditingProject(null)} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-500/20 transition-all">Save Changes & Finish Editing</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0">{p.icon || "💻"}</div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-white text-lg">{p.title}</h3>
                                {p.pdfData && <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-semibold flex items-center gap-1"><span>📄</span> PDF Attached</span>}
                              </div>
                              <p className="text-zinc-400 text-sm mt-1">{p.description}</p>
                              {p.details && <p className="text-zinc-500 text-xs mt-2 bg-zinc-800/50 p-3 rounded-xl border border-zinc-700/50"><strong>Popup Details:</strong> {p.details}</p>}
                              <div className="flex flex-wrap gap-2 mt-3">{p.tags.map((t) => (<span key={t} className="px-2.5 py-1 text-xs rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">{t}</span>))}</div>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => setEditingProject(p.id)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-all">Edit</button>
                            <button onClick={() => deleteProject(p.id)} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-all">Delete</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}</div>
                )}
              </div>
            </motion.div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === "certificates" && (
            <motion.div key="certificates" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4 text-amber-500 flex items-center gap-2"><span>🏆</span> Add New Certificate</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-all" placeholder="Certificate Title (e.g. AWS Certified Architect)" value={newCert.title} onChange={(e) => setNewCert({ ...newCert, title: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-all" placeholder="Issuer (e.g. Amazon Web Services, Coursera)" value={newCert.issuer} onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-all" placeholder="Date / Year (e.g. 2026)" value={newCert.date} onChange={(e) => setNewCert({ ...newCert, date: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-all" placeholder="Icon Emoji (e.g. 🏆, ☁️, ⚛️, 🐍)" value={newCert.icon} onChange={(e) => setNewCert({ ...newCert, icon: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-all md:col-span-2" placeholder="Description" value={newCert.description} onChange={(e) => setNewCert({ ...newCert, description: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-amber-500 focus:outline-none transition-all md:col-span-2" placeholder="Certificate URL / Verification Link (optional)" value={newCert.link} onChange={(e) => setNewCert({ ...newCert, link: e.target.value })} />
                  
                  {/* PDF UPLOAD FIELD */}
                  <div className="md:col-span-2 bg-zinc-800/30 border border-zinc-700/80 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                      <span>📄</span> Attach PDF Certificate File
                    </label>
                    <input 
                      type="file" 
                      accept="application/pdf" 
                      onChange={(e) => handleFileUpload(e, "cert")} 
                      className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 file:transition-all cursor-pointer w-full" 
                    />
                    {newCert.pdfData && <p className="text-emerald-400 text-xs mt-2 font-medium">✓ PDF Certificate attached successfully! Visitors can download/view it directly.</p>}
                  </div>
                </div>
                <button onClick={addCertificate} className="mt-6 px-6 py-3 bg-amber-600 text-white font-semibold rounded-xl hover:bg-amber-700 transition-colors shadow-lg shadow-amber-500/20">Save Certificate</button>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800"><h2 className="text-lg font-semibold">Your Custom Certificates ({certificates.length})</h2></div>
                {certificates.length === 0 ? <div className="p-12 text-center text-zinc-500">No custom certificates added yet. Add one above to populate your live website!</div> : (
                  <div className="divide-y divide-zinc-800">{certificates.map((c) => (
                    <div key={c.id} className="p-6">
                      {editingCert === c.id ? (
                        <div className="space-y-4 bg-zinc-800/20 p-6 rounded-2xl border border-zinc-700/60">
                          <div className="border-b border-zinc-700 pb-3 mb-2">
                            <h3 className="text-md font-bold text-amber-500 flex items-center gap-2"><span>✏️</span> Edit Certificate Texts & Details</h3>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Certificate Title</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none font-medium" value={c.title} onChange={(e) => updateCertificate(c.id, "title", e.target.value)} placeholder="Title" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Issuer (e.g. Coursera, AWS)</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none font-medium" value={c.issuer} onChange={(e) => updateCertificate(c.id, "issuer", e.target.value)} placeholder="Issuer" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Date / Year</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none font-medium" value={c.date} onChange={(e) => updateCertificate(c.id, "date", e.target.value)} placeholder="Date" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Icon Emoji</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none font-medium" value={c.icon} onChange={(e) => updateCertificate(c.id, "icon", e.target.value)} placeholder="Icon Emoji" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Description</label>
                            <textarea className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none font-medium leading-relaxed" rows={3} value={c.description} onChange={(e) => updateCertificate(c.id, "description", e.target.value)} placeholder="Description" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Verification Link / External URL</label>
                            <input className="w-full px-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-white focus:border-amber-500 focus:outline-none font-medium" value={c.link} onChange={(e) => updateCertificate(c.id, "link", e.target.value)} placeholder="Link" />
                          </div>
                          
                          <div className="bg-zinc-900/80 border border-zinc-700 rounded-xl p-4">
                            <label className="block text-xs font-semibold text-zinc-300 mb-2">Update Attached PDF Certificate</label>
                            <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, "edit_cert", c.id)} className="text-xs text-zinc-400 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-400 hover:file:bg-amber-500/20 file:transition-all cursor-pointer" />
                            {c.pdfData && <span className="text-emerald-400 text-xs ml-2 font-bold">✓ PDF Attached</span>}
                          </div>

                          <div className="pt-2">
                            <button onClick={() => setEditingCert(null)} className="px-6 py-3 bg-amber-600 text-white font-bold rounded-xl text-sm hover:bg-amber-700 shadow-lg shadow-amber-500/20 transition-all">Save Changes & Finish Editing</button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0">{c.icon || "🏆"}</div>
                            <div>
                              <div className="flex items-center gap-3">
                                <h3 className="font-semibold text-white text-lg">{c.title}</h3>
                                {c.pdfData && <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs rounded-full font-semibold flex items-center gap-1"><span>📄</span> PDF Attached</span>}
                              </div>
                              <p className="text-amber-400 text-sm font-medium">{c.issuer} · {c.date}</p>
                              <p className="text-zinc-400 text-sm mt-1">{c.description}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => setEditingCert(c.id)} className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-sm font-medium hover:bg-zinc-700 transition-all">Edit</button>
                            <button onClick={() => deleteCertificate(c.id)} className="px-4 py-2 bg-red-500/10 text-red-400 rounded-xl text-sm font-medium hover:bg-red-500/20 transition-all">Delete</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}</div>
                )}
              </div>
            </motion.div>
          )}

          {/* VISITORS TAB */}
          {activeTab === "visitors" && (
            <motion.div key="visitors" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-zinc-800"><h2 className="text-lg font-semibold">Visitors ({visitors.length})</h2></div>
              {visitors.length === 0 ? <div className="p-12 text-center text-zinc-500">No visitors yet</div> : (
                <table className="w-full"><thead className="bg-zinc-800/50"><tr><th className="text-left px-6 py-3 text-xs font-medium text-zinc-400 uppercase">#</th><th className="text-left px-6 py-3 text-xs font-medium text-zinc-400 uppercase">Name</th><th className="text-left px-6 py-3 text-xs font-medium text-zinc-400 uppercase">Email</th><th className="text-left px-6 py-3 text-xs font-medium text-zinc-400 uppercase">Date</th></tr></thead><tbody>{visitors.map((v, i) => (<tr key={i} className="border-t border-zinc-800"><td className="px-6 py-4 text-zinc-500 text-sm">{i + 1}</td><td className="px-6 py-4 text-sm font-medium">{v.name}</td><td className="px-6 py-4 text-sm text-zinc-400">{v.email}</td><td className="px-6 py-4 text-sm text-zinc-501">{new Date(v.date).toLocaleDateString()}</td></tr>))}</tbody></table>
              )}
            </motion.div>
          )}

          {/* EXPERIENCES TAB */}
          {activeTab === "experiences" && (
            <motion.div key="experiences" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <h2 className="text-lg font-semibold mb-4">Add Experience</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-600 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Role" value={newExperience.role} onChange={(e) => setNewExperience({ ...newExperience, role: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Company" value={newExperience.company} onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Period (e.g., 2024 - Present)" value={newExperience.period} onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })} />
                  <input className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:border-indigo-500 focus:outline-none transition-all" placeholder="Description" value={newExperience.description} onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })} />
                </div>
                <button onClick={addExperience} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">Add Experience</button>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-zinc-800"><h2 className="text-lg font-semibold">Experiences ({experiences.length})</h2></div>
                {experiences.length === 0 ? <div className="p-12 text-center text-zinc-500">No experiences yet</div> : (
                  <div className="divide-y divide-zinc-800">{experiences.map((e) => (
                    <div key={e.id} className="p-6">
                      {editingExp === e.id ? (
                        <div className="space-y-3">
                          <input className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none" value={e.role} onChange={(ev) => updateExperience(e.id, "role", ev.target.value)} placeholder="Role" />
                          <input className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none" value={e.company} onChange={(ev) => updateExperience(e.id, "company", ev.target.value)} placeholder="Company" />
                          <input className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:border-indigo-500 focus:outline-none" value={e.period} onChange={(ev) => updateExperience(e.id, "period", ev.target.value)} placeholder="Period" />
                          <input className="w-full px-4 py-2 bg-zinc-800/50 border border-zinc-700 text-white focus:border-indigo-500 focus:outline-none" value={e.description} onChange={(ev) => updateExperience(e.id, "description", ev.target.value)} placeholder="Description" />
                          <button onClick={() => setEditingExp(null)} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm">Done</button>
                        </div>
                      ) : (
                        <div className="flex items-start justify-between">
                          <div><h3 className="font-semibold text-white">{e.role}</h3><p className="text-indigo-400 text-sm">{e.company} · {e.period}</p><p className="text-zinc-400 text-sm mt-1">{e.description}</p></div>
                          <div className="flex gap-2"><button onClick={() => setEditingExp(e.id)} className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-lg text-sm hover:bg-zinc-700">Edit</button><button onClick={() => deleteExperience(e.id)} className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-sm hover:bg-red-500/20">Delete</button></div>
                        </div>
                      )}
                    </div>
                  ))}</div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
