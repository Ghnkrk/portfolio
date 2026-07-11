import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, FileText, Settings, Cpu, LineChart, ShieldCheck } from "lucide-react";
import type { Project } from "../../data/portfolioData";

// Custom inline SVG icon because registry has older lucide-react package versions
const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

interface ProjectPanelProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectPanel: React.FC<ProjectPanelProps> = ({ project, onClose }) => {
  if (!project) return null;

  // Render an interactive SVG architecture blueprint depending on the project
  const renderArchitectureDiagram = (id: string) => {
    switch (id) {
      case "forge":
        return (
          <div className="border border-white/5 bg-black/40 rounded p-4 font-mono text-[9px] text-accent-cyan space-y-3">
            <div className="text-[10px] text-white font-bold border-b border-white/5 pb-1 flex justify-between">
              <span>BLUEPRINT: DYN-EYE PIPELINE</span>
              <span className="text-white/40">v2.1</span>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">137 Defect Images</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded">YOLOv11 Detector</div>
                <div className="px-2 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded">DINOv2 Embeddings</div>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">FAISS Filter (Novelty Check)</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">HDBSCAN (6 Clusters)</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-emerald/10 border border-accent-emerald/20 rounded">Gemini VLM Auto-Label</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white font-semibold">Closed-Loop Retraining</div>
            </div>
          </div>
        );
      case "autoagent":
        return (
          <div className="border border-white/5 bg-black/40 rounded p-4 font-mono text-[9px] text-accent-cyan space-y-3">
            <div className="text-[10px] text-white font-bold border-b border-white/5 pb-1 flex justify-between">
              <span>BLUEPRINT: HIERARCHICAL AUTO-AGENT</span>
              <span className="text-white/40">v1.0</span>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">Raw Data Source</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded">L0 Orchestrator (Data Profiler)</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded">L1 Model Selection</div>
                <div className="px-2 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded">L2 Hyperparameter Optimizer</div>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-emerald/10 border border-accent-emerald/20 rounded">Human-in-the-Loop Gateway</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white">Docker Hub / Render Deploy</div>
            </div>
          </div>
        );
      case "tinyllm":
        return (
          <div className="border border-white/5 bg-black/40 rounded p-4 font-mono text-[9px] text-accent-cyan space-y-3">
            <div className="text-[10px] text-white font-bold border-b border-white/5 pb-1 flex justify-between">
              <span>BLUEPRINT: DECODER-ONLY TRANSFORMER</span>
              <span className="text-white/40">v0.9</span>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">SentencePiece Tokenizer</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded">Embedded Latent Space [D_model]</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded">RoPE Rotary Positional Encodings</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">SwiGLU Feed-Forward Blocks</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-emerald/10 border border-accent-emerald/20 rounded">KV Cache Inference [83.2 T/s]</div>
            </div>
          </div>
        );
      case "qsystem":
        return (
          <div className="border border-white/5 bg-black/40 rounded p-4 font-mono text-[9px] text-accent-cyan space-y-3">
            <div className="text-[10px] text-white font-bold border-b border-white/5 pb-1 flex justify-between">
              <span>BLUEPRINT: REGIME-AWARE FORECASTER</span>
              <span className="text-white/40">v1.2</span>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">Price Series</div>
                <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">News Feed</div>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded">Gaussian HMM Regimes</div>
                <div className="px-2 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded">FinBERT Sentiment Score</div>
              </div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">CatBoost Forecast Model</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-emerald/10 border border-accent-emerald/20 rounded">Temporal Walk-Forward Validator</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/10 border border-white/20 rounded text-white">Fee-Aware Backtesting Simulator</div>
            </div>
          </div>
        );
      case "medcomply":
        return (
          <div className="border border-white/5 bg-black/40 rounded p-4 font-mono text-[9px] text-accent-cyan space-y-3">
            <div className="text-[10px] text-white font-bold border-b border-white/5 pb-1 flex justify-between">
              <span>BLUEPRINT: COMPLIANCE REASONING ENGINE</span>
              <span className="text-white/40">v1.0</span>
            </div>
            <div className="flex flex-col space-y-2 items-center">
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">Hospital SOP Standard Text</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-blue/10 border border-accent-blue/20 rounded">NLTK Sentence Tokenizer</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-cyan/10 border border-accent-cyan/20 rounded">HuggingFace NLI Classifier</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-white/5 border border-white/10 rounded">10 NABH Clause-Level Mapping</div>
              <div className="h-3 w-px bg-white/10" />
              <div className="px-2 py-1 bg-accent-emerald/10 border border-accent-emerald/20 rounded">Automated Gap Analysis Report</div>
            </div>
          </div>
        );
      default:
        return <div className="border border-white/5 bg-black/40 rounded p-4 text-center text-xs text-white/40">Architecture diagram not available.</div>;
    }
  };

  const getMetricIcon = (idx: number) => {
    switch (idx) {
      case 0: return <Cpu className="w-4 h-4 text-accent-cyan" />;
      case 1: return <ShieldCheck className="w-4 h-4 text-accent-blue" />;
      case 2: return <LineChart className="w-4 h-4 text-accent-emerald" />;
      default: return <Settings className="w-4 h-4 text-accent-cyan" />;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed top-0 right-0 h-full w-full sm:w-[480px] bg-black/80 border-l border-white/5 shadow-2xl backdrop-blur-xl z-[100] flex flex-col pointer-events-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-accent-cyan tracking-wider flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
              <span>ACTIVE_MODULE // DETAILED_REPORT</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">{project.title}</h2>
            <p className="text-xs text-secondary font-mono">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded bg-white/5 text-secondary hover:text-white hover:bg-white/10 transition-colors border border-white/5"
            aria-label="Close panel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Panel Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 font-sans" data-lenis-prevent>
          
          {/* Key Metrics Grid */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-secondary tracking-widest uppercase">System Metrics</span>
            <div className="grid grid-cols-3 gap-3">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="bg-white/5 border border-white/5 rounded p-3 text-center flex flex-col items-center space-y-1">
                  {getMetricIcon(idx)}
                  <span className="text-[9px] font-mono text-secondary block mt-1 tracking-tight truncate w-full text-center">{metric.label}</span>
                  <span className="text-sm font-bold text-white block font-mono">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-secondary tracking-widest uppercase">Abstract / Summary</span>
            <p className="text-sm text-secondary/90 leading-relaxed bg-white/5 border border-white/5 rounded p-4">
              {project.description}
            </p>
          </div>

          {/* Achievements / Responsibilities */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-secondary tracking-widest uppercase">Functional Achievements</span>
            <ul className="space-y-2 text-xs text-secondary/80">
              {project.details.map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-accent-cyan font-mono mt-0.5 select-none">{"[" + idx + "]"}</span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technology stack */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-secondary tracking-widest uppercase">Technological Stack</span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2 py-1 text-[10px] font-mono bg-white/5 border border-white/5 rounded text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Architecture Blueprint Section */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-secondary tracking-widest uppercase">Architecture Diagram</span>
            {renderArchitectureDiagram(project.id)}
          </div>
        </div>

        {/* Panel Footer / Action Buttons */}
        <div className="p-6 border-t border-white/5 bg-black/40 flex space-x-3">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-mono bg-white/5 border border-white/10 rounded text-white hover:bg-white/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
          )}
          {project.links.blog && (
            <a
              href={project.links.blog}
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-mono bg-white/5 border border-white/10 rounded text-white hover:bg-white/10 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>PAPER</span>
            </a>
          )}
          {project.links.demo && project.links.demo !== "#" && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-mono bg-accent-blue/20 border border-accent-blue/30 rounded text-accent-cyan hover:bg-accent-blue/35 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>DEMO</span>
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
