import React, { useEffect, useState } from "react";

export const SystemDock: React.FC = () => {
  const [time, setTime] = useState("");
  const [cpuUsage, setCpuUsage] = useState("1.8%");
  const [memoryUsage, setMemoryUsage] = useState("42%");

  useEffect(() => {
    // Update local time clock
    const updateTime = () => {
      const date = new Date();
      setTime(date.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Simulate mild telemetry fluctuates
    const telemetryInterval = setInterval(() => {
      const cpu = (1.2 + Math.random() * 2).toFixed(1);
      const mem = Math.floor(41 + Math.random() * 3);
      setCpuUsage(`${cpu}%`);
      setMemoryUsage(`${mem}%`);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearInterval(telemetryInterval);
    };
  }, []);

  const navLinks = [
    { label: "CANVAS", href: "#hero" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "RESEARCH", href: "#research" },
    { label: "CONTACT", href: "#contact" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-3 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-11 px-4 rounded-lg bg-black/40 border border-white/5 shadow-glass backdrop-blur-md">
        
        {/* Left: System Branding */}
        <div className="flex items-center space-x-2 text-xs font-mono text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan"></span>
          </span>
          <a href="#hero" className="font-bold text-white hover:text-accent-cyan transition-colors">
            G_KART.SYS
          </a>
          <span className="hidden sm:inline text-white/20">|</span>
          <span className="hidden sm:inline text-white/50">ENG-CORE // V1.0.0</span>
        </div>

        {/* Center: OS-Style Nav links */}
        <nav className="hidden md:flex items-center space-x-1 text-xs font-mono">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded text-secondary hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Mini Nav (Visible on small screens) */}
        <div className="md:hidden flex items-center space-x-3 text-xs font-mono">
          <a href="#about" className="text-secondary hover:text-white">ABOUT</a>
          <a href="#skills" className="text-secondary hover:text-white">SKILLS</a>
          <a href="#research" className="text-secondary hover:text-white">RESEARCH</a>
        </div>

        {/* Right: Hardware Telemetry Dashboard */}
        <div className="flex items-center space-x-3 text-[10px] md:text-xs font-mono text-secondary">
          <div className="hidden lg:flex items-center space-x-2">
            <span className="text-white/30">CPU:</span>
            <span className="text-accent-cyan w-10 text-right">{cpuUsage}</span>
          </div>
          <div className="hidden lg:flex items-center space-x-2">
            <span className="text-white/30">MEM:</span>
            <span className="text-accent-blue w-8 text-right">{memoryUsage}</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-white font-medium">{time}</span>
        </div>
      </div>
    </header>
  );
};
