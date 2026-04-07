import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Sparkles, Loader2, User, Bot } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { Button } from "./Button";
import { cn } from "../lib/utils";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: "user" | "bot";
  text: string;
}

export function EcoCoach() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState<Message[]>([
    { role: "bot", text: "Hi! I'm your EcoCoach. How can I help you on your sustainability journey today?" }
  ]);
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are EcoCoach, a friendly and expert sustainability assistant. Answer this question concisely and helpfully: ${userMessage}` }]
          }
        ],
        config: {
          systemInstruction: "You are EcoCoach, a friendly sustainability expert. Keep answers concise, actionable, and encouraging. Focus on waste reduction, composting, and circular economy.",
        }
      });

      const botText = response.text || "I'm sorry, I couldn't process that. Could you try rephrasing?";
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      console.error("EcoCoach Error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "Oops! I'm having a bit of trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 md:bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] h-[500px] bg-white rounded-[2rem] shadow-2xl border border-eco-leaf/20 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 bg-eco-dark text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-eco-leaf flex items-center justify-center text-eco-dark">
                  <Bot size={24} />
                </div>
                <div>
                  <div className="font-bold">EcoCoach</div>
                  <div className="text-[10px] uppercase tracking-widest opacity-60 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-eco-green animate-pulse" />
                    AI Assistant
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-eco-leaf/5">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex gap-3 max-w-[85%]",
                    msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    msg.role === "user" ? "bg-eco-green text-white" : "bg-white border border-eco-leaf/20 text-eco-dark"
                  )}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" ? "bg-eco-green text-white rounded-tr-none" : "bg-white border border-eco-leaf/10 text-eco-dark rounded-tl-none shadow-sm"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-lg bg-white border border-eco-leaf/20 flex items-center justify-center text-eco-dark">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-white border border-eco-leaf/10 rounded-tl-none shadow-sm">
                    <Loader2 size={16} className="animate-spin text-eco-green" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-eco-leaf/10">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask EcoCoach anything..."
                  className="w-full pl-4 pr-12 py-3 rounded-xl bg-eco-leaf/5 border border-eco-leaf/10 focus:border-eco-green outline-none transition-all text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-eco-green text-white disabled:opacity-50 hover:scale-105 transition-transform"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95",
          isOpen ? "bg-eco-dark rotate-90" : "bg-eco-green"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
