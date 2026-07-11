import React, { useState, useEffect, useRef } from "react";
import { GitCompare, Network, Code, Server, Database, Library } from "lucide-react";
import { skillNodes, projects } from "../../data/portfolioData";

export const SkillsConstellation: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Track center positions of nodes to draw SVG connections
  const [lines, setLines] = useState<{ from: { x: number; y: number }; to: { x: number; y: number } }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  const handleResizeOrScroll = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const activeLines: { from: { x: number; y: number }; to: { x: number; y: number } }[] = [];

    if (hoveredSkill) {
      const skillNode = skillNodes.find((s) => s.id === hoveredSkill);
      const skillEl = nodeRefs.current[`skill-${hoveredSkill}`];
      
      if (skillNode && skillEl) {
        const skillRect = skillEl.getBoundingClientRect();
        const fromX = skillRect.left + skillRect.width / 2 - containerRect.left;
        const fromY = skillRect.top + skillRect.height / 2 - containerRect.top;

        skillNode.connectedProjects.forEach((projId) => {
          const projEl = nodeRefs.current[`proj-${projId}`];
          if (projEl) {
            const projRect = projEl.getBoundingClientRect();
            const toX = projRect.left + projRect.width / 2 - containerRect.left;
            const toY = projRect.top + projRect.height / 2 - containerRect.top;
            activeLines.push({ from: { x: fromX, y: fromY }, to: { x: toX, y: toY } });
          }
        });
      }
    } else if (hoveredProject) {
      const projNode = projects.find((p) => p.id === hoveredProject);
      const projEl = nodeRefs.current[`proj-${hoveredProject}`];

      if (projNode && projEl) {
        const projRect = projEl.getBoundingClientRect();
        const fromX = projRect.left + projRect.width / 2 - containerRect.left;
        const fromY = projRect.top + projRect.height / 2 - containerRect.top;

        // Find skills connected to this project
        skillNodes.forEach((s) => {
          if (s.connectedProjects.includes(hoveredProject)) {
            const skillEl = nodeRefs.current[`skill-${s.id}`];
            if (skillEl) {
              const skillRect = skillEl.getBoundingClientRect();
              const toX = skillRect.left + skillRect.width / 2 - containerRect.left;
              const toY = skillRect.top + skillRect.height / 2 - containerRect.top;
              activeLines.push({ from: { x: fromX, y: fromY }, to: { x: toX, y: toY } });
            }
          }
        });
      }
    }

    setLines(activeLines);
  };

  useEffect(() => {
    handleResizeOrScroll();
    const timer = setTimeout(handleResizeOrScroll, 100);
    return () => clearTimeout(timer);
  }, [hoveredSkill, hoveredProject]);

  useEffect(() => {
    window.addEventListener("resize", handleResizeOrScroll);
    document.addEventListener("scroll", handleResizeOrScroll, true);
    return () => {
      window.removeEventListener("resize", handleResizeOrScroll);
      document.removeEventListener("scroll", handleResizeOrScroll, true);
    };
  }, [hoveredSkill, hoveredProject]);

  const categories = {
    languages: { label: "Languages", icon: <Code className="w-3.5 h-3.5 text-accent-cyan" /> },
    ai: { label: "AI / Machine Learning", icon: <Network className="w-3.5 h-3.5 text-accent-cyan" /> },
    frameworks: { label: "Tools & Frameworks", icon: <Library className="w-3.5 h-3.5 text-accent-cyan" /> },
    databases: { label: "Databases & Vector stores", icon: <Database className="w-3.5 h-3.5 text-accent-cyan" /> },
    infrastructure: { label: "Engineering Infrastructure", icon: <Server className="w-3.5 h-3.5 text-accent-cyan" /> }
  };

  const isNodeDimmed = (id: string, isSkill: boolean) => {
    if (hoveredSkill) {
      if (isSkill) {
        return hoveredSkill !== id;
      } else {
        const skill = skillNodes.find((s) => s.id === hoveredSkill);
        return !skill?.connectedProjects.includes(id);
      }
    }
    if (hoveredProject) {
      if (!isSkill) {
        return hoveredProject !== id;
      } else {
        const skill = skillNodes.find((s) => s.id === id);
        return !skill?.connectedProjects.includes(hoveredProject);
      }
    }
    return false;
  };

  const isNodeHighlighted = (id: string, isSkill: boolean) => {
    if (hoveredSkill) {
      if (isSkill) {
        return hoveredSkill === id;
      } else {
        const skill = skillNodes.find((s) => s.id === hoveredSkill);
        return skill?.connectedProjects.includes(id) || false;
      }
    }
    if (hoveredProject) {
      if (!isSkill) {
        return hoveredProject === id;
      } else {
        const skill = skillNodes.find((s) => s.id === id);
        return skill?.connectedProjects.includes(hoveredProject) || false;
      }
    }
    return false;
  };

  return (
    <section id="skills" className="relative max-w-6xl mx-auto px-6 py-16 md:py-28 select-none">
      
      {/* Module Title */}
      <div className="mb-16 text-center md:text-left">
        <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-1">
          Module // Skills // Constellation
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
          Technology Relationship Map
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-accent-cyan to-transparent mt-2 mx-auto md:mx-0" />
      </div>

      <div 
        ref={containerRef}
        className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start p-6 glass-panel rounded-2xl overflow-visible card-reflection"
        onMouseMove={handleMouseMove}
      >
        {/* SVG connection overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {lines.map((line, idx) => {
            const dx = line.to.x - line.from.x;
            const controlPointX1 = line.from.x + dx * 0.4;
            const controlPointY1 = line.from.y;
            const controlPointX2 = line.from.x + dx * 0.6;
            const controlPointY2 = line.to.y;

            return (
              <g key={idx}>
                {/* Background faint glow line */}
                <path
                  d={`M ${line.from.x} ${line.from.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${line.to.x} ${line.to.y}`}
                  fill="none"
                  stroke="rgba(6, 182, 212, 0.12)"
                  strokeWidth="3"
                />
                {/* Foreground animated laser line */}
                <path
                  d={`M ${line.from.x} ${line.from.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${line.to.x} ${line.to.y}`}
                  fill="none"
                  stroke="url(#glowing-gradient)"
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                  className="stroke-pulse"
                  style={{
                    animation: "dash 30s linear infinite"
                  }}
                />
              </g>
            );
          })}
          
          <defs>
            <linearGradient id="glowing-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
          </defs>
        </svg>

        {/* Left Side: Skills categories */}
        <div className="md:col-span-8 space-y-6 z-20">
          <div className="text-[10px] font-mono text-white/40 tracking-wider mb-2 flex items-center space-x-1">
            <Code className="w-3 h-3" />
            <span>CATEGORIZED_CAPABILITIES</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(categories).map(([catKey, catVal]) => (
              <div 
                key={catKey} 
                className="glass-panel rounded-2xl p-5 space-y-3 card-reflection overflow-hidden"
                onMouseMove={handleMouseMove}
              >
                <div className="flex items-center space-x-1.5 border-b border-white/5 pb-1.5">
                  {catVal.icon}
                  <span className="text-[10px] font-mono text-white font-semibold uppercase">{catVal.label}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skillNodes
                    .filter((s) => s.category === catKey)
                    .map((skill) => {
                      const dimmed = isNodeDimmed(skill.id, true);
                      const highlighted = isNodeHighlighted(skill.id, true);

                      return (
                        <div
                          key={skill.id}
                          ref={(el) => { nodeRefs.current[`skill-${skill.id}`] = el; }}
                          onMouseEnter={() => setHoveredSkill(skill.id)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          className={`cursor-pointer px-2.5 py-1 text-[10px] font-mono rounded border transition-all duration-300 select-none ${
                            highlighted 
                              ? "bg-accent-cyan/15 border-accent-cyan text-white shadow-glass-glow" 
                              : dimmed 
                              ? "opacity-20 border-white/5 text-secondary/30 scale-95" 
                              : "bg-white/5 border-white/5 text-secondary hover:text-white hover:border-white/20 hover:scale-105"
                          }`}
                        >
                          {skill.name}
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Projects list */}
        <div className="md:col-span-4 space-y-4 z-20">
          <div className="text-[10px] font-mono text-white/40 tracking-wider mb-2 flex items-center space-x-1">
            <GitCompare className="w-3 h-3" />
            <span>TARGET_SYSTEMS</span>
          </div>

          <div className="space-y-2">
            {projects.map((proj) => {
              const dimmed = isNodeDimmed(proj.id, false);
              const highlighted = isNodeHighlighted(proj.id, false);

              return (
                <div
                  key={proj.id}
                  ref={(el) => { nodeRefs.current[`proj-${proj.id}`] = el; }}
                  onMouseEnter={() => setHoveredProject(proj.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 font-mono text-left select-none ${
                    highlighted 
                      ? "bg-accent-blue/15 border-accent-blue text-white shadow-neon-glow translate-x-2" 
                      : dimmed 
                      ? "opacity-20 border-white/5 text-secondary/30 scale-95" 
                      : "bg-black/35 border-white/5 text-secondary hover:text-white hover:border-white/20 hover:translate-x-1"
                  }`}
                >
                  <div className="text-[10px] font-bold tracking-tight">{proj.title}</div>
                  <div className="text-[8px] text-white/40 mt-0.5 truncate">{proj.subtitle}</div>
                </div>
              );
            })}
          </div>
          
          <div className="border border-white/5 bg-black/25 rounded-xl p-4 text-[10px] font-mono text-white/40 leading-relaxed">
            Hover over a technical skill to trace paths linking it directly to downstream target projects, or highlight a project to review its specific system requirements stack.
          </div>
        </div>

      </div>
    </section>
  );
};
export default SkillsConstellation;
