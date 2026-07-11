import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "canvas">("default");

  // Motion values for lag position tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for high-end fluid physics
  const springConfig = { damping: 30, stiffness: 250, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Watch hovers
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.closest("a") || 
        target.closest("button") || 
        target.closest(".interactive-node") ||
        target.style.cursor === "pointer" ||
        target.classList.contains("cursor-pointer");

      const isCanvas = target.closest("canvas");

      if (isInteractive) {
        setIsHovered(true);
        setCursorType("pointer");
      } else if (isCanvas) {
        setIsHovered(true);
        setCursorType("canvas");
      } else {
        setIsHovered(false);
        setCursorType("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent-cyan/40 pointer-events-none z-[9999] mix-blend-screen -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: cursorType === "pointer" ? 1.5 : cursorType === "canvas" ? 2.0 : 1,
          borderColor: cursorType === "pointer" 
            ? "rgba(59, 130, 246, 0.8)" 
            : cursorType === "canvas" 
            ? "rgba(6, 182, 212, 0.8)" 
            : "rgba(6, 182, 212, 0.4)",
          backgroundColor: cursorType === "pointer" 
            ? "rgba(59, 130, 246, 0.05)" 
            : cursorType === "canvas" 
            ? "rgba(6, 182, 212, 0.02)" 
            : "rgba(0,0,0,0)",
          boxShadow: isHovered 
            ? "0 0 15px rgba(6, 182, 212, 0.25)" 
            : "0 0 0px rgba(0,0,0,0)",
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent-cyan pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: cursorType === "pointer" ? 0.5 : cursorType === "canvas" ? 0 : 1,
          backgroundColor: cursorType === "pointer" ? "#3b82f6" : "#06b6d4"
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.1 }}
      />
    </>
  );
};
