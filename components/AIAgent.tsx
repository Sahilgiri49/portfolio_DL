import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, SendHorizonal, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Page } from '../types';

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hello! I am your guide in this MindSpace. How can I assist you? (Type 'help' for commands)" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const { setCurrentPage } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCommand = (command: string) => {
    const lowerCaseCommand = command.toLowerCase().trim();
    let aiResponseText = "I'm sorry, I don't understand that command. Type 'help' to see what I can do.";

    const commandMap: { [key: string]: { page: Page; response: string } } = {
        'home': { page: 'home', response: 'Returning to the main neural cluster.' },
        'skills': { page: 'skills', response: 'Navigating to the Input Layer: Skills.' },
        'projects': { page: 'projects', response: 'Entering the Hidden Layers: Projects.' },
        'achievements': { page: 'achievements', response: 'Displaying the Output Layer: Achievements.' },
        'education': { page: 'education', response: 'Accessing the Memory Bank: Education.' },
        'contact': { page: 'contact', response: 'Establishing a Synaptic Connection.' },
    };

    for (const key in commandMap) {
        if (lowerCaseCommand.includes(key)) {
            setCurrentPage(commandMap[key].page);
            aiResponseText = commandMap[key].response;
            break;
        }
    }

    if (lowerCaseCommand.includes('resume') || lowerCaseCommand.includes('cv')) {
        window.open('/resume.pdf', '_blank');
        aiResponseText = 'Opening resume.pdf in a new tab for you.';
    } else if (lowerCaseCommand === 'help') {
        aiResponseText = "You can ask me to navigate. Try: 'home', 'skills', 'projects', 'achievements', 'education', 'contact', or 'open resume'.";
    } else if (lowerCaseCommand.includes('hello') || lowerCaseCommand.includes('hi')) {
        aiResponseText = "Hello there! It's a pleasure to guide you through this digital mind.";
    }

    const aiMessage: Message = { sender: 'ai', text: aiResponseText };
    setMessages(prev => [...prev, { sender: 'user', text: command }, aiMessage]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleCommand(inputValue);
    setInputValue('');
  };

  return (
    <>
      <div className="fixed bottom-24 right-4 z-50 pointer-events-auto">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-cyan-glow/80 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_theme(colors.cyan-glow)] hover:bg-cyan-glow transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle AI Agent"
        >
          {isOpen ? <X size={32} /> : <Bot size={32} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-44 right-4 w-full max-w-sm h-96 bg-black/80 backdrop-blur-md rounded-lg border border-cyan-glow/30 z-50 flex flex-col font-jetbrains-mono shadow-[0_0_30px_rgba(0,255,255,0.3)] pointer-events-auto"
          >
            <div className="p-3 border-b border-cyan-glow/30 text-center">
              <h3 className="font-bold text-cyan-glow">AI MindSpace Guide</h3>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-blue-glow/20 text-white' : 'bg-cyan-glow/10 text-cyan-glow'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-3 border-t border-cyan-glow/30 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me to navigate..."
                className="flex-grow bg-black/50 border border-blue-glow/50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow text-white"
              />
              <button type="submit" className="bg-blue-glow text-black p-2 rounded-md transition hover:bg-opacity-80 aspect-square flex items-center justify-center">
                <SendHorizonal size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAgent;
