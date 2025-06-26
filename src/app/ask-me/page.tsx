"use client";

import { useState, useEffect, useRef, FormEvent } from "react";
import Navbar from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { ChatbotService } from "@/services/chatbot";
import { sendMessage, receiveMessage } from "@/cores/types/chat"; // Assuming receiveMessage is the type for response.data
import { Cpu, SendHorizontal, User } from "lucide-react";
import BubbleChat from "@/components/common/bubble-chat";

// Define a unified chat message type for the history
interface ChatMessage {
  sender: "user" | "bot";
  text: string;
}

const Home: React.FC = () => {
  // A single state to hold the entire conversation history
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Hello! I'm an AI assistant trained on Raihan's professional background. Feel free to ask me about his skills, projects, or experience.",
    },
  ]);

  // State for the user's current input
  const [currentMessage, setCurrentMessage] = useState("");
  // State to show a loading/thinking indicator for the bot
  const [isLoading, setIsLoading] = useState(false);
  // Ref for the chat container to handle auto-scrolling
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Effect to scroll to the bottom of the chat on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const userInput = currentMessage.trim();
    if (!userInput) return;

    const userMsg: ChatMessage = { sender: "user", text: userInput };
    setChatHistory((prevHistory) => [...prevHistory, userMsg]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const messageToSend: sendMessage = { message: userInput };
      const response = await ChatbotService.sendMessage(messageToSend);

      if (response.success === true) {
        const botMsg: ChatMessage = { sender: "bot", text: (response.data as receiveMessage).response };
        setChatHistory((prevHistory) => [...prevHistory, botMsg]);
      } else {
        const errorMsg: ChatMessage = { sender: "bot", text: response.message || "An unexpected error occurred." };
        setChatHistory((prevHistory) => [...prevHistory, errorMsg]);
      }
    } catch (error) {
      console.error("Network or fatal error:", error);
      const networkErrorMsg: ChatMessage = { sender: "bot", text: "Sorry, I'm having trouble connecting. Please try again later." };
      setChatHistory((prevHistory) => [...prevHistory, networkErrorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-gray-900 text-white w-full flex flex-col min-h-screen">
      <Navbar />
      {/* Main chat container */}
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-3xl h-[70vh] flex flex-col bg-gray-800/40 rounded-xl border border-gray-700/50 shadow-2xl shadow-cyan-500/5">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-700/50">
            <h2 className="text-xl font-bold text-cyan-400 text-center">RAISA (Raihan's Smart Assistance)</h2>
          </div>

          {/* Message Display Area */}
          <div ref={chatContainerRef} className="flex-grow p-6 space-y-6 overflow-y-auto">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`flex items-start gap-4 ${msg.sender === "user" ? "justify-end" : ""}`}>
                {msg.sender === "bot" && (
                  <div className="w-8 h-8 flex-shrink-0 bg-cyan-900/50 rounded-full flex items-center justify-center">
                    <Cpu size={18} className="text-cyan-400" />
                  </div>
                )}
                <BubbleChat message={msg.text} sender={msg.sender} />
                {msg.sender === "user" && (
                  <div className="w-8 h-8 flex-shrink-0 bg-gray-700 rounded-full flex items-center justify-center">
                    <User size={18} className="text-gray-300" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 flex-shrink-0 bg-cyan-900/50 rounded-full flex items-center justify-center">
                  <Cpu size={18} className="text-cyan-400" />
                </div>
                <div className="max-w-md p-3 rounded-xl bg-gray-700/80">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0s" }}></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.15s" }}></span>
                    <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "0.3s" }}></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-700/50">
            <form onSubmit={handleSubmit} className="flex items-center gap-4">
              <input type="text" value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} placeholder="Ask about my skills, projects, etc..." disabled={isLoading} className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50" />
              <button type="submit" disabled={isLoading || !currentMessage.trim()} className="bg-cyan-500 text-gray-900 font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-all hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed">
                <SendHorizontal size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
