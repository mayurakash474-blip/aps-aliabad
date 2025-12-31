import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Jai Hind! I am the AI Assistant for APS Aliabad. How can I help you today regarding admissions, fees, or academics?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: userText } as ChatMessage];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const apiKey = process.env.API_KEY;
      if (!apiKey) {
         setMessages(prev => [...prev, { role: 'model', text: 'Please configure the API_KEY in the environment to use this feature.' }]);
         setIsLoading(false);
         return;
      }
      
      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
         model: 'gemini-3-flash-preview',
         config: {
            systemInstruction: `You are the official AI Assistant for Army Public School (APS) Aliabad. 
            Your tone should be professional, respectful, encouraging, and informative.
            Target audience: Parents, students, and potential staff.

            Key School Information:
            - **Name:** Army Public School Aliabad.
            - **Motto:** "Truth is God".
            - **Affiliation:** CBSE (Central Board of Secondary Education).
            - **Principal:** Mrs. S. Kapoor.
            - **Location:** Aliabad Cantt.
            - **Facilities:** Smart classrooms, Science Labs (Physics, Chem, Bio), Computer Lab, Library, Sports Complex (Basketball, Football, Tennis), Music & Art rooms.
            - **Admissions:** Open for the academic session 2024-25 for Classes I to IX and XI. Admission is based on an entrance test.
            - **Values:** Discipline, Academic Excellence, Patriotism, Character Building.

            If asked about specific fees, say: "Please visit the school administration office or the Admissions page for the detailed fee structure as it varies by grade and category."
            If asked about things not related to the school/education, politely decline to answer.
            Keep answers concise.`,
         },
         history: messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
         })),
      });

      const result = await chat.sendMessage({ message: userText });
      const responseText = result.text || '';

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error('Chat Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'I encountered an error. Please try again later.', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center
          ${isOpen ? 'bg-aps-red rotate-90' : 'bg-aps-gold hover:bg-yellow-500 hover:scale-110'}
        `}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-alt'} text-white text-2xl`}></i>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 animate-fade-in h-[500px]">
          {/* Header */}
          <div className="bg-aps-green p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">APS Assistant</h3>
                <p className="text-aps-gold text-xs">Online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user' 
                      ? 'bg-aps-green text-white rounded-br-none' 
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                    }
                    ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}
                  `}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-200 flex space-x-2 items-center">
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about admissions..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-aps-green focus:ring-1 focus:ring-aps-green"
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="w-10 h-10 bg-aps-green text-white rounded-full flex items-center justify-center hover:bg-green-900 disabled:opacity-50 transition-colors"
              >
                <i className="fas fa-paper-plane text-xs"></i>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatWidget;