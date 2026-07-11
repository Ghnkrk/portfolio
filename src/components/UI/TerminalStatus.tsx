import React, { useEffect, useState } from "react";

const SIMULATED_LOGS = [
  "Initialize core neural networks...",
  "CUDA device 0 initialized: NVIDIA V100 / Compute 8.6",
  "Initializing TinyLLM weights [2.75M parameters]...",
  "Loading DINOv2 feature extractor embeddings...",
  "Initializing LangGraph L0/L1 agents orchestrator...",
  "FAISS index loaded with 137 defect anomalies...",
  "Walk-forward regimes: Sharpe 1.64 / MaxDD 0.06%...",
  "QSystem active. News parser connected to FinBERT...",
  "MedComply loaded. 10 NABH clauses vectorized...",
  "Telemetry stream online. Listening on port 8000...",
  "Agent DYN-EYE: Scanning workspace files...",
  "Agent AutoAgenticML: Optimizing hyperparameters...",
  "All systems online. Interactive UI loaded."
];

export const TerminalStatus: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Incrementally print initial logs
    let delay = 300;
    SIMULATED_LOGS.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev.slice(-4), `> ${log}`]);
      }, delay);
      delay += Math.min(600, 150 + Math.random() * 400);
    });

    // Add random operational logs periodically
    const logInterval = setInterval(() => {
      const randomActivities = [
        "CPU temp: 42°C | Fan speed: 2100 RPM",
        "AgenticML query: Executing cross-validation loops...",
        "QSystem: Regimes updated. Volatility regime: LOW",
        "TinyLLM: Tokenizer cache flushed.",
        "MedComply: SOP similarity map generated successfully.",
        "DYN-EYE: Cluster cohesion re-evaluated to 0.80."
      ];
      const randomLog = randomActivities[Math.floor(Math.random() * randomActivities.length)];
      const timestamp = new Date().toLocaleTimeString("en-US", { hour12: false });
      setLogs((prev) => [...prev.slice(-4), `[${timestamp}] ${randomLog}`]);
    }, 8000);

    return () => clearInterval(logInterval);
  }, []);

  return (
    <div className="absolute bottom-6 left-6 z-10 w-80 md:w-96 select-none font-mono text-[10px] md:text-xs leading-relaxed bg-black/60 border border-white/5 shadow-glass backdrop-blur-md rounded p-3 text-secondary/80">
      <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-2">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue animate-pulse-glow" />
          <span className="text-[10px] text-white font-bold tracking-wider">SYSTEM_CONSOLE</span>
        </div>
        <span className="text-[9px] text-white/40">ONLINE // STABLE</span>
      </div>
      
      <div className="space-y-1 h-20 overflow-hidden flex flex-col justify-end">
        {logs.map((log, idx) => (
          <div 
            key={idx} 
            className={`truncate transition-opacity duration-300 ${
              idx === logs.length - 1 ? "text-accent-cyan" : "text-secondary/70"
            }`}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};
