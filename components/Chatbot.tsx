
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import { ChatIcon, CloseIcon, SendIcon } from './icons';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: 'سلام! من Digi-bot هستم. چطور میتونم کمکتون کنم؟', sender: 'bot' },
  ]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userInput.trim() === '') return;

    const newUserMessage: ChatMessage = {
      id: Date.now(),
      text: userInput,
      sender: 'user',
    };
    const loadingMessage: ChatMessage = {
      id: Date.now() + 1,
      text: '...',
      sender: 'loading',
    };

    setMessages((prev) => [...prev, newUserMessage, loadingMessage]);
    setUserInput('');

    const botResponseText = await getChatbotResponse(userInput);
    const newBotMessage: ChatMessage = {
      id: Date.now() + 2,
      text: botResponseText,
      sender: 'bot',
    };

    setMessages((prev) => [...prev.filter((m) => m.sender !== 'loading'), newBotMessage]);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 left-5 bg-dk-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <CloseIcon className="h-8 w-8" /> : <ChatIcon className="h-8 w-8" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-5 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col z-50" dir="rtl">
          <header className="bg-dk-dark-gray text-white p-3 rounded-t-lg">
            <h3 className="font-bold text-center">پشتیبانی آنلاین دیجی‌کالا</h3>
          </header>

          <div className="flex-1 p-4 overflow-y-auto bg-dk-light-gray">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex mb-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'loading' ? (
                  <div className="bg-gray-200 text-gray-700 rounded-lg p-2 max-w-xs">
                    <div className="flex items-center justify-center space-x-1">
                       <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
	                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
	                     <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-lg p-2 max-w-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-dk-dark-gray'
                    }`}
                  >
                    {msg.text}
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-2 border-t flex items-center">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="پیام خود را بنویسید..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dk-red"
            />
            <button type="submit" className="mr-2 text-dk-red p-2 rounded-full hover:bg-red-100">
              <SendIcon className="h-6 w-6" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
