import React from "react";
import { motion } from "framer-motion";
import { FolderGit2, Cpu, Compass, Layers, Activity, Sparkles, ArrowRight } from "lucide-react";
import { projects } from "../../data/portfolioData";
import type { Project } from "../../data/portfolioData";

interface ProjectsGridProps {
  onProjectSelect: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ onProjectSelect }) => {
  // Local card mouse glow tracker for reflections
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "dyn-eye":
        return <Cpu className="w-5 h-5 text-accent-cyan" />;
      case "auto-agentic":
        return <Compass className="w-5 h-5 text-accent-cyan" />;
      case "tiny-llm":
        return <Layers className="w-5 h-5 text-accent-cyan" />;
      case "q-system":
        return <Activity className="w-5 h-5 text-accent-cyan" />;
      case "med-comply":
        return <Sparkles className="w-5 h-5 text-accent-cyan" />;
      default:
        return <FolderGit2 className="w-5 h-5 text-accent-cyan" />;
    }
  };

  return (
    <section id="projects-grid" className="relative max-w-6xl mx-auto px-6 py-16 md:py-28 select-none">
      
      {/* Section Header */}
      <div className="mb-16 text-center md:text-left">
        <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-1">
          Module // Portfolio // Projects_Inventory
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
          Intelligent Systems Directory
        </h2>
        <p className="text-xs text-secondary mt-2 max-w-xl font-mono leading-relaxed">
          Standard grid catalog of all engineering installations. Select cards to open deep-dive architectural specifications, or project them onto the 3D Neural Canvas above.
        </p>
        <div className="h-[1px] w-24 bg-gradient-to-r from-accent-cyan to-transparent mt-2 mx-auto md:mx-0" />
      </div>

      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="glass-panel rounded-2xl p-6 flex flex-col justify-between card-reflection overflow-hidden group hover:scale-[1.01] hover:border-white/10"
            onMouseMove={handleMouseMove}
          >
            {/* Card Header */}
            <div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                <div className="flex items-center space-x-2.5">
                  {getProjectIcon(project.id)}
                  <span className="text-[10px] font-mono text-white/50 tracking-wider uppercase">Installation // 0{idx + 1}</span>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-white font-sans tracking-tight group-hover:text-accent-cyan transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-white/40 font-mono mt-1 mb-3">
                {project.subtitle}
              </p>
              <p className="text-xs text-secondary/85 leading-relaxed line-clamp-3 mb-5 font-sans">
                {project.description}
              </p>

              {/* Mini Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 bg-black/30 border border-white/5 rounded-xl p-3 mb-5 font-mono select-none">
                {project.metrics.slice(0, 3).map((metric, mIdx) => (
                  <div key={mIdx} className="text-center">
                    <span className="text-[8px] text-white/40 block uppercase truncate">{metric.label}</span>
                    <span className="text-xs font-bold text-accent-cyan block mt-0.5">{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Technologies Badge List */}
            <div>
              <div className="flex flex-wrap gap-1 mb-6">
                {project.tech.slice(0, 4).map((techName) => (
                  <span
                    key={techName}
                    className="px-2 py-0.5 text-[8px] font-mono bg-white/5 border border-white/5 rounded text-white"
                  >
                    {techName}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="px-1.5 py-0.5 text-[8px] font-mono bg-white/5 border border-white/5 rounded text-white/40">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* Card Footer Triggers */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 gap-3">
                <a
                  href="#hero"
                  onClick={() => onProjectSelect(project)}
                  className="flex items-center space-x-1 py-1.5 px-3 bg-white/5 border border-white/5 rounded-lg text-[9px] font-mono text-secondary hover:text-white hover:bg-white/10 transition-all cursor-pointer select-none"
                >
                  <span>EXPLORE ON GRAPH</span>
                </a>
                
                <button
                  onClick={() => onProjectSelect(project)}
                  className="flex items-center space-x-1 py-1.5 px-3 bg-accent-blue/15 border border-accent-blue/30 rounded-lg text-[9px] font-mono text-white hover:bg-accent-blue/25 hover:border-accent-blue/50 transition-all cursor-pointer select-none"
                >
                  <span>SPECIFICATIONS</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default ProjectsGrid;
