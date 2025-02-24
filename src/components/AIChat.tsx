import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, X, Minimize2, Maximize2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateResponse, initializeGemini } from '../utils/gemini';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'error';
  content: string;
  timestamp: number;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (apiKey) {
      try {
        initializeGemini(apiKey);
        setIsInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Gemini:', error);
        toast.error('Failed to initialize AI assistant');
      }
    }
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (messages.length > 0 && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isMinimized]);

  const addMessage = (role: Message['role'], content: string) => {
    setMessages(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: Date.now()
    }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addMessage('user', userMessage);
    setIsLoading(true);

    try {
      if (!isInitialized) {
        throw new Error('AI assistant not initialized');
      }

      const response = await generateResponse(userMessage);
      addMessage('assistant', response);
    } catch (error) {
      console.error('Error:', error);
      addMessage('error', 'Sorry, I encountered an error. Please try again later.');
      toast.error('Failed to get AI response');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setInput('');
    setIsLoading(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const renderMessage = (message: Message) => {
    const isUser = message.role === 'user';
    const isError = message.role === 'error';

    return (
      <div
        key={message.id}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[80%] p-3 rounded-2xl ${
            isUser
              ? 'bg-pink-500 text-white rounded-br-none'
              : isError
              ? 'bg-red-100 text-red-800 rounded-bl-none flex items-center space-x-2'
              : 'bg-gray-100 text-gray-800 rounded-bl-none'
          }`}
        >
          {isError && <AlertCircle className="w-4 h-4" />}
          <span>{message.content}</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className={`fixed bottom-4 right-4 bg-gradient-to-r from-pink-500 to-orange-500 text-white p-4 rounded-full shadow-lg hover:opacity-90 transition-all transform hover:scale-105 ${
          isOpen ? 'hidden' : ''
        }`}
        aria-label="Open chat assistant"
      >
        <Bot className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className={`fixed right-4 bottom-4 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all ${
              isMinimized ? 'h-16' : 'h-[600px]'
            }`}
          >
            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-white">
                <Bot className="w-6 h-6" />
                <span className="font-semibold">Wedding Assistant</span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="text-white hover:opacity-80 transition-opacity p-1 rounded"
                  aria-label={isMinimized ? 'Maximize chat' : 'Minimize chat'}
                >
                  {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleClose}
                  className="text-white hover:opacity-80 transition-opacity p-1 rounded"
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 mt-8">
                      <Bot className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Hi! I'm your wedding planning assistant.</p>
                      <p className="text-sm">Ask me anything about wedding planning!</p>
                    </div>
                  )}
                  {messages.map(renderMessage)}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-bl-none">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about wedding planning..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
                      disabled={!isInitialized || isLoading}
                    />
                    <button
                      type="submit"
                      disabled={!isInitialized || isLoading || !input.trim()}
                      className="bg-gradient-to-r from-pink-500 to-orange-500 text-white p-2 rounded-full hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      aria-label="Send message"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;