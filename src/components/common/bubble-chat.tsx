import React from "react";
import { X } from "lucide-react";

interface BubbleChatProps {
  message: string;
  sender: string;
}

const BubbleChat: React.FC<BubbleChatProps> = ({ message, sender }) => {
  return (
    <div className={`max-w-md p-3 rounded-xl ${sender === "user" ? "bg-cyan-500 text-gray-900 font-medium" : "bg-gray-700/80 text-gray-200"}`}>
      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
    </div>
  );
};

export default BubbleChat;
