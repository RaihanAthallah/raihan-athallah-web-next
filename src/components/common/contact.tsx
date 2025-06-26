// app/components/sections/Contact.tsx

import React from "react";
import { SiLinkedin, SiInstagram, SiGithub } from "react-icons/si";
import { Mail } from "lucide-react";
import { IconType } from "react-icons";

interface ContactLink {
  name: string;
  url: string;
  handle: string;
  icon: IconType | React.ElementType;
}

// --- IMPORTANT: UPDATE YOUR LINKS HERE ---
// Replace the placeholder URLs and handles with your actual information.
const contactLinks: ContactLink[] = [
  {
    name: "Email",
    url: "mailto:rraihan1947@gmail.com",
    handle: "rraihan1947@gmail.com",
    icon: Mail,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/raihanath19", // Replace with your LinkedIn URL
    handle: "raihanath19", // Replace with your LinkedIn handle
    icon: SiLinkedin,
  },
  {
    name: "GitHub",
    url: "https://github.com/raihanathallah", // Replace with your GitHub URL
    handle: "@raihanathallah", // Replace with your GitHub handle
    icon: SiGithub,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/raihanthl19", // Replace with your Instagram URL
    handle: "@raihanthl19", // Replace with your Instagram handle
    icon: SiInstagram,
  },
];

const Contact: React.FC = () => {
  return (
    <section id="CONTACT" className="py-20 md:py-28 border-t border-gray-800">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400">Get In Touch</h2>
          <p className="text-gray-400 mt-2 text-lg">I am open to discussing new projects and opportunities. Lets connect!</p>
        </div>

        {/* Contact Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactLinks.map((link) => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="group bg-gray-800/40 p-8 rounded-xl border border-gray-700/50 text-center transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10">
              <div className="flex justify-center mb-4">
                <link.icon className="text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" size={40} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-1">{link.name}</h3>
              <p className="text-sm text-cyan-400 group-hover:underline">{link.handle}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
