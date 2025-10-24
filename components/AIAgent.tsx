import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, SendHorizonal, X, Mic, MicOff, Volume2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Page } from '../types';
import { GoogleGenAI } from '@google/genai';
import { generateSystemInstruction } from '../data/context';
import { FemaleBotIcon } from './FemaleBotIcon';

// Manually implement base64 decoding as per guidelines
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


// Speech Recognition setup
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let recognition: any;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
}

type Message = {
  sender: 'user' | 'ai';
  text: string;
};

const AIAgent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hello! I am Khushbuu, your guide in Sir Sahil's MindSpace. How can I assist you? You can talk to me or type 'help'." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setCurrentPage } = useStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const systemInstruction = useRef(generateSystemInstruction());
  const aiRef = useRef<GoogleGenAI | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (isOpen) {
        // Initialize AI and AudioContext only when the chat opens
        if (!aiRef.current) {
          aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY! });
        }
        if (!audioContextRef.current) {
          audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        }
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const playAudio = useCallback(async (base64Audio: string) => {
      if (!audioContextRef.current) return;
      setIsSpeaking(true);
      try {
          const audioBuffer = await decodeAudioData(
              decode(base64Audio),
              audioContextRef.current,
              24000,
              1,
          );
          const source = audioContextRef.current.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContextRef.current.destination);
          source.start();
          source.onended = () => setIsSpeaking(false);
      } catch (error) {
          console.error('Error playing audio:', error);
          setIsSpeaking(false);
      }
  }, []);

  const getAIResponse = async (prompt: string): Promise<{ text: string; audio?: string }> => {
    if (!aiRef.current) throw new Error("AI not initialized");
    
    const textModel = 'gemini-2.5-flash';
    const textResponse = await aiRef.current.models.generateContent({
        model: textModel,
        contents: prompt,
        config: {
            systemInstruction: systemInstruction.current,
        },
    });
    const text = textResponse.text;

    if (!isVoiceMode) {
        return { text };
    }
    
    const ttsModel = 'gemini-2.5-flash-preview-tts';
    const audioResponse = await aiRef.current.models.generateContent({
        model: ttsModel,
        contents: [{ parts: [{ text }] }],
        config: {
            responseModalities: ['AUDIO'],
            speechConfig: {
                voiceConfig: {
                    prebuiltVoiceConfig: { voiceName: 'Kore' },
                },
            },
        },
    });

    const base64Audio = audioResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return { text, audio: base64Audio };
  };

  const handleCommand = useCallback(async (command: string) => {
    const lowerCaseCommand = command.toLowerCase().trim();
    if (!lowerCaseCommand) return;

    const userMessage: Message = { sender: 'user', text: command };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const commandMap: { [key: string]: { page: Page; response: string } } = {
        'home': { page: 'home', response: 'Returning to the main neural cluster.' },
        'skills': { page: 'skills', response: 'Navigating to the Input Layer: Skills.' },
        'projects': { page: 'projects', response: 'Entering the Hidden Layers: Projects.' },
        'achievements': { page: 'achievements', response: 'Displaying the Output Layer: Achievements.' },
        'education': { page: 'education', response: 'Accessing the Memory Bank: Education.' },
        'contact': { page: 'contact', response: 'Establishing a Synaptic Connection.' },
        'resume': { page: 'resume', response: 'Displaying the core data file: Resume.' },
        'cv': { page: 'resume', response: 'Displaying the core data file: Resume.' },
    };

    let isNavCommand = false;
    for (const key in commandMap) {
        if (lowerCaseCommand.includes(key)) {
            setCurrentPage(commandMap[key].page);
            const aiResponseText = commandMap[key].response;
            const aiMessage: Message = { sender: 'ai', text: aiResponseText };
            setMessages(prev => [...prev, aiMessage]);
            isNavCommand = true;
            break;
        }
    }
    
    if (lowerCaseCommand === 'help') {
        const helpText = "You can ask me anything about Sir Sahil, or ask me to navigate. Try: 'home', 'skills', 'projects', 'achievements', 'education', 'contact', or 'view resume'.";
        setMessages(prev => [...prev, { sender: 'ai', text: helpText }]);
        isNavCommand = true;
    }

    if (!isNavCommand) {
        try {
            const { text, audio } = await getAIResponse(command);
            const aiMessage: Message = { sender: 'ai', text };
            setMessages(prev => [...prev, aiMessage]);
            if (audio) {
                await playAudio(audio);
            }
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage = "I apologize, there was a glitch in my neural connection. Please try again.";
            setMessages(prev => [...prev, { sender: 'ai', text: errorMessage }]);
        }
    }
    setIsLoading(false);
  }, [isVoiceMode, setCurrentPage, playAudio]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    handleCommand(inputValue);
    setInputValue('');
  };

  const toggleListen = () => {
      if (!recognition) return;
      if (isListening) {
          recognition.stop();
          setIsListening(false);
      } else {
          recognition.start();
          setIsListening(true);
      }
  };

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleCommand(transcript);
        setIsListening(false);
    };
    recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
    };
    recognition.onend = () => {
        setIsListening(false);
    };
  }, [handleCommand]);

  const getBotState = (): 'idle' | 'listening' | 'speaking' => {
      if (isListening) return 'listening';
      if (isSpeaking) return 'speaking';
      return 'idle';
  }

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
          {isOpen ? <X size={32} /> : (isVoiceMode ? <FemaleBotIcon state={getBotState()} /> : <Bot size={32} />)}
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
            <div className="p-3 border-b border-cyan-glow/30 text-center flex justify-between items-center">
              <h3 className="font-bold text-cyan-glow">AI MindSpace Guide</h3>
              <button
                onClick={() => setIsVoiceMode(!isVoiceMode)}
                className={`p-2 rounded-full transition-colors ${isVoiceMode ? 'bg-purple-glow/30 text-purple-glow' : 'text-cyan-glow/70 hover:bg-cyan-glow/20'}`}
                aria-label="Toggle Voice Mode"
              >
                {isVoiceMode ? <Volume2 size={20} /> : <MicOff size={20} />}
              </button>
            </div>
            <div className="flex-grow p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.sender === 'user' ? 'bg-blue-glow/20 text-white' : 'bg-cyan-glow/10 text-cyan-glow'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="p-2 rounded-lg text-sm bg-cyan-glow/10 text-cyan-glow">Thinking...</div></div>}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="p-3 border-t border-cyan-glow/30 flex gap-2">
              {isVoiceMode && recognition && (
                  <button type="button" onClick={toggleListen} className={`p-2 rounded-md aspect-square flex items-center justify-center transition ${isListening ? 'bg-red-500/80 text-white animate-pulse' : 'bg-purple-glow text-black'}`}>
                      <Mic size={20}/>
                  </button>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isVoiceMode ? "Tap mic to talk..." : "Ask me anything..."}
                className="flex-grow bg-black/50 border border-blue-glow/50 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-glow text-white"
                readOnly={isVoiceMode}
              />
              <button type="submit" disabled={isLoading || isVoiceMode} className="bg-blue-glow text-black p-2 rounded-md transition hover:bg-opacity-80 aspect-square flex items-center justify-center disabled:bg-gray-500 disabled:cursor-not-allowed">
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
