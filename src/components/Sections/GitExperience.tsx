import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, GitBranch, Briefcase, Tag } from "lucide-react";
import { commitExperiences } from "../../data/portfolioData";

export const GitExperience: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>("exp1");

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Local card mouse glow coordinate tracker for premium reflections
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <section id="experience" className="relative max-w-5xl mx-auto px-6 py-16 md:py-28 select-none">
      
      {/* Module Title */}
      <div className="mb-16 text-center md:text-left">
        <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-1">
          Module // Experience // Version_Control
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
          Git-Commit Career Log
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-accent-cyan to-transparent mt-2 mx-auto md:mx-0" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Git Graph Visualizer */}
        <div 
          className="lg:col-span-4 glass-panel rounded-2xl p-6 font-mono text-xs text-secondary/70 card-reflection overflow-hidden"
          onMouseMove={handleMouseMove}
        >
          <div className="text-[10px] text-white font-bold border-b border-white/5 pb-2 mb-4 flex items-center space-x-1.5">
            <GitBranch className="w-3.5 h-3.5 text-accent-blue" />
            <span>GIT_GRAPH_VISUALIZER</span>
          </div>

          {/* Simple ASCII/SVG commit tree illustration */}
          <div className="space-y-6">
            
            {/* Present Node */}
            <div className="flex items-center space-x-3">
              <div className="flex flex-col items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-accent-cyan animate-pulse-glow" />
                <div className="w-0.5 h-8 bg-accent-cyan" />
              </div>
              <div>
                <span className="text-[10px] bg-accent-cyan/15 border border-accent-cyan/25 px-1.5 py-0.5 rounded text-accent-cyan font-bold">HEAD</span>
                <p className="text-white font-semibold mt-1">Present Milestone</p>
                <span className="text-[10px] text-white/40">ref: origin/main</span>
              </div>
            </div>

            {/* Forge Innovation Commit */}
            <div 
              className={`flex items-center space-x-3 cursor-pointer p-1.5 rounded transition-colors ${
                expandedId === "exp1" ? "bg-white/5 border border-white/5" : "hover:bg-white/[0.02]"
              }`}
              onClick={() => toggleExpand("exp1")}
            >
              <div className="flex flex-col items-center">
                <span className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${expandedId === "exp1" ? "bg-accent-blue border-accent-blue" : "bg-black border-accent-blue"}`} />
                <div className="w-0.5 h-8 bg-accent-blue" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-accent-blue font-bold">commit f07ge26</span>
                <p className="text-white font-semibold mt-1 truncate">feat: DYN-EYE anomaly pipeline</p>
                <span className="text-[10px] text-white/40">Forge Innovation</span>
              </div>
            </div>

            {/* Branch Out */}
            <div className="flex items-center space-x-3 pl-2.5">
              <div className="flex flex-col items-center relative">
                <div className="absolute -top-4 -left-1.5 w-4 h-6 border-l border-b border-white/20 rounded-bl" />
                <div className="w-0.5 h-6 bg-white/20 mt-2" />
              </div>
              <div className="pl-2">
                <span className="text-[9px] text-white/30 italic">Branch 'feat/cv-pipelines' created</span>
              </div>
            </div>

            {/* The Fusion Apps Commit */}
            <div 
              className={`flex items-center space-x-3 cursor-pointer p-1.5 rounded transition-colors ${
                expandedId === "exp2" ? "bg-white/5 border border-white/5" : "hover:bg-white/[0.02]"
              }`}
              onClick={() => toggleExpand("exp2")}
            >
              <div className="flex flex-col items-center">
                <span className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${expandedId === "exp2" ? "bg-accent-emerald border-accent-emerald" : "bg-black border-accent-emerald"}`} />
                <div className="w-0.5 h-4 bg-white/20" />
              </div>
              <div className="truncate">
                <span className="text-[10px] text-accent-emerald font-bold">commit c0a2512</span>
                <p className="text-white font-semibold mt-1 truncate">feat: video violence detectors</p>
                <span className="text-[10px] text-white/40">The Fusion Apps</span>
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Commit Metadata & Detail Card Expansion */}
        <div className="lg:col-span-8 space-y-4">
          
          <AnimatePresence mode="wait">
            {expandedId ? (
              <motion.div
                key={expandedId}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="glass-panel rounded-2xl p-6 md:p-8 card-reflection overflow-hidden"
                onMouseMove={handleMouseMove}
              >
                {/* Commit Metadata Header */}
                <div className="font-mono text-xs border-b border-white/5 pb-4 mb-6 space-y-2 text-secondary/80">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold flex items-center space-x-1.5">
                      <GitCommit className="w-4 h-4 text-accent-cyan" />
                      <span>COMMIT_DETAILS</span>
                    </span>
                    <span className="text-[10px] text-white/30">ID: {commitExperiences.find(c => c.id === expandedId)?.commitHash}</span>
                  </div>
                  <div>
                    <span className="text-white/40">Author: </span>
                    <span className="text-white font-medium">Guhankarthik A G</span>
                    <span className="text-white/30"> &lt;Guhan.karthik25@gmail.com&gt;</span>
                  </div>
                  <div>
                    <span className="text-white/40">Date: </span>
                    <span>{commitExperiences.find(c => c.id === expandedId)?.period}</span>
                  </div>
                  <div>
                    <span className="text-white/40">Branch: </span>
                    <span className="text-accent-cyan">origin/{commitExperiences.find(c => c.id === expandedId)?.branch}</span>
                  </div>
                </div>

                {/* Role and Company */}
                <div className="space-y-4 font-sans">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight flex items-center space-x-2">
                      <Briefcase className="w-4.5 h-4.5 text-accent-cyan" />
                      <span>{commitExperiences.find(c => c.id === expandedId)?.role}</span>
                    </h3>
                    <p className="text-xs text-accent-blue font-mono mt-1">
                      {commitExperiences.find(c => c.id === expandedId)?.company}
                    </p>
                  </div>

                  {/* Achievements */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-secondary tracking-widest uppercase block">Commit Delta // Achievements</span>
                    <ul className="space-y-3 text-xs text-secondary/80 leading-relaxed">
                      {commitExperiences.find(c => c.id === expandedId)?.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-accent-cyan font-mono mt-0.5 select-none">+</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack used in experience */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-secondary tracking-widest uppercase block flex items-center space-x-1">
                      <Tag className="w-3 h-3 text-secondary/60" />
                      <span>Dependencies Updated</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {commitExperiences.find(c => c.id === expandedId)?.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/5 rounded text-white"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            ) : (
              <div className="glass-panel rounded-2xl border-dashed p-16 text-center text-xs font-mono text-white/30">
                SELECT A COMMIT NODE ON THE GRAPH MODULE TO LOAD CONTENT LOGS
              </div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
export default GitExperience;
