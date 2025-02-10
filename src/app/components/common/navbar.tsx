"use client";

import Link from "next/link";
import React from "react";

 const Navbar: React.FC = () =>  {
  return (
    <nav className="fixed top-0 z-50 w-full bg-gray-900/80 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-cyan-400">Raihan</div>
        <div className="hidden md:block">
          <div className="flex space-x-8">
            <Link href="/" className="text-cyan-400 hover:text-cyan-300">
              Home
            </Link>
            <Link href="#EXPERIENCES" className="text-cyan-400 hover:text-cyan-300">
              Experiences
            </Link>
            <Link href="#PROJECTS" className="text-cyan-400 hover:text-cyan-300">
              Projects
            </Link>
            <Link href="#CONTACT" className="text-cyan-400 hover:text-cyan-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
