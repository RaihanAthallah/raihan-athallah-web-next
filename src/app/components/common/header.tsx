"use client";
import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiGoland, SiPostgresql, SiDotnet, SiDocker, SiGit, SiMysql } from "react-icons/si";
import { IconType } from "react-icons";

// --- PROPS DEFINITIONS ---

type CodeBlockProps = {
  // Pass position and animation delay for more control
  top: string;
  right?: string;
  left?: string;
  animationDelay: string;
  animationDuration: string;
};

type FloatingIconProps = {
  icon: IconType;
  top: string;
  right?: string;
  left?: string;
  size?: number;
  color?: string;
  animationDelay: string;
  animationDuration: string;
  text: string;
};

// --- REFINED UI COMPONENTS ---

/**
 * CodeBlock Component: Represents a floating, abstract code window.
 * Now accepts position and animation properties for flexible placement.
 */
const CodeBlock: React.FC<CodeBlockProps> = ({ top, right, left, animationDelay, animationDuration }) => {
  const style: React.CSSProperties = {
    top,
    right,
    left,
    animationDelay,
    animationDuration,
  };

  return (
    <div className="absolute bg-cyan-400/5 rounded-lg p-3 md:p-4 backdrop-blur-sm animate-float border border-cyan-400/10" style={style}>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-slate-600"></div>
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-slate-600"></div>
        <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-slate-600"></div>
      </div>
      <div className="space-y-1.5">
        <div className="h-2 w-24 bg-cyan-400/20 rounded"></div>
        <div className="h-2 w-20 bg-cyan-400/15 rounded"></div>
        <div className="h-2 w-28 bg-cyan-400/10 rounded"></div>
      </div>
    </div>
  );
};

/**
 * FloatingIcon Component: A floating technology icon.
 * Now includes animation properties for a more dynamic, staggered effect.
 */
const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, top, right, left, animationDelay, animationDuration, size = 56, color = "#00ADD8", text }) => {
  const style: React.CSSProperties = {
    top,
    right,
    left,
    animationDelay,
    animationDuration,
  };

  return (
    <div className="absolute animate-float group" style={style}>
      <div className="relative group-hover:scale-110 transition-transform duration-300 ease-in-out">
        <Icon size={size} color={color} className="opacity-80 group-hover:opacity-100 transition-opacity" />
        {/* Tooltip for icon name on hover */}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs text-white bg-gray-900/80 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{text}</span>
      </div>
    </div>
  );
};

// --- MAIN HEADER COMPONENT ---

const Header: React.FC = () => {
  return (
    <section className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Animation Canvas */}
      <div className="absolute inset-0 w-full h-full opacity-50 md:opacity-100">
        <FloatingIcon icon={SiGoland} top="15%" left="10%" animationDelay="0s" animationDuration="10s" text="Go (Golang)" color="#00ADD8" />
        <FloatingIcon icon={SiPostgresql} top="20%" right="12%" animationDelay="1s" animationDuration="12s" text="PostgreSQL" color="#336791" />
        <FloatingIcon icon={SiDocker} top="65%" right="8%" animationDelay="2s" animationDuration="11s" text="Docker" color="#0DB7ED" size={64} />
        <FloatingIcon icon={SiDotnet} top="70%" left="15%" animationDelay="0.5s" animationDuration="13s" text=".NET" color="#512BD4" />
        <FloatingIcon icon={SiMysql} top="45%" right="25%" animationDelay="1.5s" animationDuration="9s" text="MySQL" color="#00758F" size={48} />
        <FloatingIcon icon={SiGit} top="40%" left="20%" animationDelay="2.5s" animationDuration="14s" text="Git" color="#F05032" size={44} />

        {/* Add decorative CodeBlock elements for more visual flair */}
        <CodeBlock top="80%" right="20%" animationDelay="0.2s" animationDuration="15s" />
        <CodeBlock top="10%" right="40%" animationDelay="1.8s" animationDuration="18s" />
      </div>

      {/* Foreground Content */}
      <div className="relative container mx-auto px-6 text-center z-10">
        <h2 className="text-cyan-400 text-lg md:text-xl font-medium animate-fade-in">Backend Developer & Database Architect</h2>
        <h1 className="mt-2 text-4xl sm:text-5xl md:text-7xl font-bold text-white animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Hello, I'm <span className="text-cyan-400">Raihan</span>
          <span className="animate-wave inline-block ml-4 origin-[70%_70%]">👋</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-gray-300 text-md md:text-lg leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          I architect and build robust backend systems and high-performance web applications. As an Informatics graduate from ITS, I thrive on solving complex problems, optimizing database performance, and creating seamless digital experiences.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <a
            href="#PROJECTS"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector("#PROJECTS")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group inline-flex items-center justify-center px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-bold rounded-lg transition-all transform hover:scale-105"
          >
            View My Work
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </a>

          <a href="mailto:rraihan1947@gmail.com" className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 font-medium rounded-lg transition-all">
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Header;
