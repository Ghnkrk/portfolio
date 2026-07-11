import React, { useState, useEffect } from "react";
import { KnowledgeGraph } from "../Canvas/KnowledgeGraph";
import { TerminalStatus } from "../UI/TerminalStatus";
import type { Project } from "../../data/portfolioData";
import { ChevronDown, Network } from "lucide-react";

interface LandingProps {
  onNodeSelect: (project: Project) => void;
  selectedProject: Project | null;
}

export const Landing: React.FC<LandingProps> = ({ onNodeSelect, selectedProject }) => {
  const [scrollRatio, setScrollRatio] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = window.innerHeight; // Animate fully over the first fold
      const current = Math.min(window.scrollY, maxScroll);
      setScrollRatio(current / maxScroll);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
      
      {/* Background canvas wrapper (zooms, fades, and blurs on scroll) */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-75 ease-out"
        style={{
          opacity: 1 - scrollRatio * 0.82, // fades to 18% to remain as dark backdrop
          transform: `scale(${1 + scrollRatio * 0.15})`, // zooms in by 15%
          filter: `blur(${scrollRatio * 5}px)` // blur to 5px
        }}
      >
        <KnowledgeGraph onNodeClick={onNodeSelect} selectedProject={selectedProject} />
      </div>

      {/* Hero Header text (translates and fades on scroll) */}
      <div 
        className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-24 pointer-events-none select-none flex flex-col md:flex-row justify-between items-start md:items-end transition-all duration-75"
        style={{
          opacity: Math.max(0, 1 - scrollRatio * 1.5),
          transform: `translateY(${-scrollRatio * 40}px)`
        }}
      >
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-mono text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded uppercase tracking-wider">
            AI Systems Engineer
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight font-sans">
            Guhankarthik A G
          </h1>
          <p className="text-sm md:text-base text-secondary font-mono leading-relaxed">
            Building end-to-end intelligent systems — from transformer internals to containerized deployments.
          </p>
        </div>
      </div>

      {/* Floating System Console Terminal (translates and fades on scroll) */}
      <div 
        className="relative z-10 pointer-events-none transition-all duration-75"
        style={{
          opacity: Math.max(0, 1 - scrollRatio * 1.5),
          transform: `translateY(${-scrollRatio * 30}px)`
        }}
      >
        <TerminalStatus />
      </div>

      {/* Floating Instructions & Status (translates and fades on scroll) */}
      <div 
        className="absolute bottom-6 right-6 z-10 max-w-xs font-mono text-[10px] md:text-xs bg-black/60 border border-white/5 shadow-glass backdrop-blur-md rounded-xl p-4 text-secondary/80 select-none hidden md:block transition-all duration-75"
        style={{
          opacity: Math.max(0, 1 - scrollRatio * 1.5),
          transform: `translateY(${-scrollRatio * 30}px)`
        }}
      >
        <div className="flex items-center space-x-2 text-white font-bold border-b border-white/5 pb-1 mb-2">
          <Network className="w-3.5 h-3.5 text-accent-cyan" />
          <span>GRAPH_TELEMETRY</span>
        </div>
        <p className="leading-relaxed">
          Hover over nodes to scan neural weights. Click a node to fly camera and load project specifications blueprint reports.
        </p>
        <div className="mt-2 text-accent-cyan flex justify-between items-center text-[9px] uppercase">
          <span>Active Nodes: 5</span>
          <span>FPS: 60 // Target</span>
        </div>
      </div>

      {/* Bottom Scroll Cue (fades quickly on scroll) */}
      <div 
        className="relative z-10 w-full flex flex-col items-center pb-6 select-none pointer-events-none transition-all duration-75"
        style={{
          opacity: Math.max(0, 1 - scrollRatio * 2.0)
        }}
      >
        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase mb-1">
          Scroll to explore modules
        </span>
        <ChevronDown className="w-4 h-4 text-white/30 animate-bounce" />
      </div>
    </section>
  );
};
export default Landing;
