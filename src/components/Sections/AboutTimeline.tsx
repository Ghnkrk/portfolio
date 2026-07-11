import React from "react";
import { motion } from "framer-motion";
import { timelineStages } from "../../data/portfolioData";

export const AboutTimeline: React.FC = () => {
  // Coordinates tracker for glass reflections
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
  };

  return (
    <section id="about" className="relative max-w-5xl mx-auto px-6 py-16 md:py-28 select-none">
      
      {/* Module Title */}
      <div className="mb-16 text-center md:text-left">
        <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-1">
          Module // About // Timeline
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
          Systems Engineering Progression
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-accent-cyan to-transparent mt-2 mx-auto md:mx-0" />
      </div>

      <div className="relative border-l border-white/5 pl-6 md:pl-10 ml-4 md:ml-10 space-y-12">
        {/* Glow pipeline line */}
        <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-cyan via-accent-blue to-transparent pointer-events-none opacity-40" />

        {timelineStages.map((stage, idx) => (
          <motion.div
            key={stage.id}
            className="relative group"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            {/* Blinking stage connector node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3 h-3 rounded-full bg-black border-2 border-white/10 group-hover:border-accent-cyan transition-colors flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-white/40 group-hover:bg-accent-cyan transition-colors group-hover:scale-125" />
            </div>

            <div 
              className="grid grid-cols-1 md:grid-cols-4 gap-6 glass-panel rounded-2xl p-6 card-reflection overflow-hidden"
              onMouseMove={handleMouseMove}
            >
              
              {/* Left Column: Stage Name */}
              <div className="md:col-span-1 flex flex-col justify-start">
                <span className="text-[10px] font-mono text-accent-cyan tracking-wider">
                  STAGE // 0{idx + 1}
                </span>
                <span className="text-lg font-bold text-white font-mono mt-1">
                  {stage.title}
                </span>
              </div>

              {/* Right Column: Descriptions */}
              <div className="md:col-span-3 space-y-2">
                <h4 className="text-xs font-mono text-white/90">
                  {stage.subtitle}
                </h4>
                <p className="text-xs text-secondary/80 leading-relaxed font-sans">
                  {stage.description}
                </p>
                <div className="text-[10px] font-mono text-accent-blue/80 bg-accent-blue/5 border border-accent-blue/10 px-2.5 py-1 rounded-lg inline-block">
                  {stage.details}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
export default AboutTimeline;
