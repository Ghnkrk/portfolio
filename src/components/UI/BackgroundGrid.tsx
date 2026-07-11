import React from "react";

export const BackgroundGrid: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-background">
      {/* Radial glow background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(circle at 50% 30%, rgba(59, 130, 246, 0.08) 0%, rgba(6, 182, 212, 0.03) 50%, rgba(0, 0, 0, 0) 100%)"
        }}
      />
      
      {/* Grid lines */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px"
        }}
      />
      
      {/* Animated scanline effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.01] animate-scanline bg-gradient-to-b from-transparent via-white to-transparent h-1/4" />
      
      {/* Faint blue/cyan glow spots */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[140px] pointer-events-none" />
    </div>
  );
};
