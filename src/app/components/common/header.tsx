"use client";
import React, { useEffect, useState } from "react";
import { Laptop } from "lucide-react";
import { SiGoland, SiPostgresql, SiDotnet, SiDocker, SiGit, SiMysql } from "react-icons/si";
import { IconType } from "react-icons";
// import { icons } from "react-icons";

type CodeBlockProps = {
  delay?: number;
};

type FloatingIconProps = {
  icon: IconType;
  x: number;
  y: number;
  size?: number;
  color?: string;
  delay: number;
  text: string;
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const CodeBlock: React.FC<CodeBlockProps> = ({ delay = 0 }) => {
  const [styles, setStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    setStyles({
      animationDelay: `${delay}s`,
      top: `${Math.sin(delay * Math.PI) * 40}%`,
      right: `${Math.cos(delay * Math.PI) * 20}%`,
    });
  }, [delay]);

  return (
    <div className="absolute bg-cyan-400/10 rounded-lg p-4 backdrop-blur-sm animate-float" style={styles}>
      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
      </div>
      <div className="space-y-1">
        <div className="h-2 w-24 bg-cyan-400/20 rounded"></div>
        <div className="h-2 w-20 bg-cyan-400/15 rounded"></div>
        <div className="h-2 w-16 bg-cyan-400/10 rounded"></div>
      </div>
    </div>
  );
};
/* eslint-enable @typescript-eslint/no-unused-vars */

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, x, y, delay, size = 69, color = "#00ADD8", text }) => {
  const [styles, setStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    setStyles({
      //   animationDelay: `${delay}s`,
      top: `${y}%`,
      right: `${x}%`,
    });
  }, [x, y, delay]);

  return (
    <div
      className="absolute animate-float group" // Added group class for hover effects
      style={styles}
    >
      <div className="relative group-hover:scale-110 transition-all duration-300">
        <Icon size={size} color={color} />
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full text-xs text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">{text}</span>
      </div>
    </div>
  );
};

const Header: React.FC = () => {
  return (
    <section className="min-h-screen relative overflow-hidden">
      <div className="relative container px-6 pt-20 md:pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Text content */}
          <div>
            <h2 className="text-cyan-400 text-md md:text-lg font-medium animate-fade-in">Backend Developer & Database Enthusiast</h2>
            <h1 className="text-4xl md:text-6xl font-bold text-white typing-effect">
              Hello, I am <span className="text-cyan-400 inline-block animate-text-slide-up">Raihan</span>
              <span className="animate-wave inline-block ml-2">👋</span>
            </h1>
            <p className="text-gray-300 text-md md:text-lg leading-relaxed animate-fade-in-up">
              Informatics graduate from Institut Teknologi Sepuluh Nopember with a passion for building scalable backend systems and dynamic web applications. Always eager to solve complex problems, optimize performance, and create seamless
              digital experiences.
            </p>

            <div className="flex flex-col md:flex-row gap-4 animate-fade-in-up mt-4">
              <a
                href="#PROJECTS"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#PROJECTS")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-medium rounded-lg transition-all transform hover:scale-105 text-center"
              >
                View Projects
              </a>

              <a href="mailto:rraihan1947@gmail.com" className="px-6 py-3 border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all text-center">
                Contact Me
              </a>
            </div>
          </div>

          {/* Right side - Programming Animation */}
          <div className="relative h-[300px] md:h-[500px] hidden md:block">
            <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2">
              <Laptop size={90} className="text-cyan-400" />
            </div>
            <FloatingIcon icon={SiGoland} x={30} y={20} delay={0} color="#00ADD8" text="Golang" />
            <FloatingIcon icon={SiPostgresql} x={60} y={20} delay={0} color="#336791" text="PostgreSQL" />
            <FloatingIcon icon={SiMysql} x={70} y={45} delay={0} color="#00758F" text="MySQL" />
            <FloatingIcon icon={SiGit} x={20} y={45} delay={0} color="#F05032" text="Git" />
            <FloatingIcon icon={SiDotnet} x={30} y={70} delay={0} color="#512BD4" text=".NET" />
            <FloatingIcon icon={SiDocker} x={60} y={70} delay={0} color="#0DB7ED" text="Docker" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
