import React from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md space-y-4 rounded-lg bg-gray-800/50 p-6 shadow-lg shadow-cyan-500/10">
        {title && (
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold text-cyan-400">{title}</h3>
          </div>
        )}
        <button className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-700/50 hover:text-cyan-400" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>
        <div className="text-gray-300">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
