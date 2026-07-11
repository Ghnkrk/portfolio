import React, { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { SystemDock } from "./components/UI/SystemDock";
import { CustomCursor } from "./components/UI/CustomCursor";
import { BackgroundGrid } from "./components/UI/BackgroundGrid";
import { Landing } from "./components/Sections/Landing";
import { ProjectPanel } from "./components/UI/ProjectPanel";
import { AboutTimeline } from "./components/Sections/AboutTimeline";
import { SkillsConstellation } from "./components/Sections/SkillsConstellation";
import { GitExperience } from "./components/Sections/GitExperience";
import { ArxivBlogs } from "./components/Sections/ArxivBlogs";
import { Contact } from "./components/Sections/Contact";
import type { Project } from "./data/portfolioData";

export const App: React.FC = () => {
  // Initialize Lenis smooth scroll
  useLenis();

  // Selected project state to slide in panel
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNodeSelect = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="relative min-h-screen text-white bg-background selection:bg-accent-blue/30 selection:text-white">
      {/* Custom lagging cursor */}
      <CustomCursor />

      {/* Ambient backgrounds */}
      <BackgroundGrid />

      {/* OS System Dock Toolbar */}
      <SystemDock />

      {/* Main OS desktop dashboard container */}
      <main className="relative z-10 w-full flex flex-col">
        
        {/* Landing 3D Canvas Constellation */}
        <Landing onNodeSelect={handleNodeSelect} selectedProject={selectedProject} />

        {/* Scrollable details sections */}
        <div className="w-full bg-gradient-to-b from-transparent via-[#050507] to-background">
          {/* About Milestone Progression */}
          <AboutTimeline />

          {/* Technology map constellation */}
          <SkillsConstellation />

          {/* Git commits experience timeline */}
          <GitExperience />

          {/* ArXiv Research papers list */}
          <ArxivBlogs />

          {/* Contact shell terminal */}
          <Contact />
        </div>
      </main>

      {/* Slide drawer for project report */}
      <ProjectPanel project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};
export default App;
