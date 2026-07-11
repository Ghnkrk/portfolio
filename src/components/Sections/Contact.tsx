import React from "react";
import { Mail, FileText, ArrowRight, Terminal } from "lucide-react";

// Custom inline SVG icons because registry has older lucide-react package versions
const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const Linkedin = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const Contact: React.FC = () => {
  const contactLinks = [
    { 
      label: "GITHUB", 
      icon: <Github className="w-4 h-4 text-accent-cyan" />, 
      value: "github.com/Ghnkrk", 
      url: "https://github.com/Ghnkrk",
      command: "curl -s https://api.github.com/users/Ghnkrk"
    },
    { 
      label: "LINKEDIN", 
      icon: <Linkedin className="w-4 h-4 text-accent-cyan" />, 
      value: "linkedin.com/in/guhankarthik-a-g", 
      url: "https://linkedin.com/in/guhankarthik-a-g-86379a2a1/",
      command: "ssh -T git@linkedin.com/guhankarthik"
    },
    { 
      label: "EMAIL", 
      icon: <Mail className="w-4 h-4 text-accent-cyan" />, 
      value: "Guhan.karthik25@gmail.com", 
      url: "mailto:Guhan.karthik25@gmail.com",
      command: "mail -s 'Hello Systems Engineer' Guhan.karthik25@gmail.com"
    },
    { 
      label: "RESUME", 
      icon: <FileText className="w-4 h-4 text-accent-cyan" />, 
      value: "Download PDF (July 2026)", 
      url: "/resume-july-8.pdf",
      command: "wget https://guhankarthik.dev/resume-july-8.pdf"
    }
  ];

  return (
    <section id="contact" className="relative max-w-4xl mx-auto px-6 py-24 select-none">
      
      {/* Module Title */}
      <div className="mb-16 text-center md:text-left">
        <div className="text-xs font-mono text-accent-cyan tracking-wider uppercase mb-1">
          Module // Contact // Output_Stream
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight font-sans">
          Establish System Connection
        </h2>
        <div className="h-[1px] w-24 bg-gradient-to-r from-accent-cyan to-transparent mt-2 mx-auto md:mx-0" />
      </div>

      {/* UNIX-style command interface */}
      <div className="bg-black/45 border border-white/5 rounded-lg overflow-hidden font-mono text-xs">
        
        {/* Terminal Header */}
        <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-white/5 text-[10px] text-white/50">
          <div className="flex items-center space-x-1.5">
            <Terminal className="w-3.5 h-3.5 text-accent-cyan" />
            <span className="font-bold text-white">SYSTEM_DIALER</span>
          </div>
          <span>tty/vconsole</span>
        </div>

        {/* Terminal Content */}
        <div className="p-6 space-y-6">
          <p className="text-secondary/70 italic">
            # Run terminal queries to query contact details:
          </p>

          <div className="space-y-4">
            {contactLinks.map((link) => (
              <div key={link.label} className="space-y-1.5 group">
                {/* Command Line Input */}
                <div className="flex items-center space-x-2 text-white/40">
                  <span className="text-accent-cyan">$</span>
                  <span>{link.command}</span>
                </div>
                {/* Command Line Output Response */}
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-3 p-3 bg-white/[0.02] border border-white/5 rounded-md hover:bg-white/5 hover:border-white/10 transition-all duration-300 w-full sm:w-auto"
                >
                  <div className="p-1.5 bg-white/5 border border-white/5 rounded">
                    {link.icon}
                  </div>
                  <div className="text-left font-mono">
                    <div className="text-[9px] text-white/40 tracking-wider uppercase font-bold">{link.label}</div>
                    <div className="text-xs text-white group-hover:text-accent-cyan transition-colors flex items-center space-x-1">
                      <span>{link.value}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-4 text-center text-white/30 text-[10px] leading-relaxed">
            Designed &amp; built by Guhankarthik A G. All rights reserved © 2026.
          </div>
        </div>

      </div>
    </section>
  );
};
export default Contact;
