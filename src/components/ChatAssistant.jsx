import React, { useState, useRef, useEffect } from 'react';
import { askElectionQuestion } from '../services/geminiService';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { validateChatInput } from '../utils/validation';

const STARTER_QUESTIONS = [
  "How do I register to vote?",
  "What happens on polling day?",
  "What is the Model Code of Conduct?",
  "How are votes counted?",
  "What ID do I need to vote?"
];

const ChatAssistant = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Namaste! I am ElectIQ, your election guide. How can I help you understand the Indian election process today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const saveToFirestore = async (msgObj) => {
    if (!user) return;
    try {
      await addDoc(collection(db, `users/${user.uid}/chat_history`), {
        role: msgObj.role,
        content: msgObj.content,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error("Failed to save to Firestore", error);
    }
  };

  const handleClearChat = () => {
    setMessages([
      { 
        role: 'assistant', 
        content: 'Chat cleared. How can I help you today?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const handleSend = async (text) => {
    const validation = validateChatInput(text);
    if (!validation.isValid) return;

    const sanitizedText = validation.sanitizedText;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { role: 'user', content: sanitizedText, time: currentTime };
    
    // We capture current messages before updating state to pass as history
    const historyForApi = messages.map(m => ({ role: m.role, content: m.content }));
    
    setMessages(prev => [...prev, userMsg]);
    saveToFirestore(userMsg);
    
    setQuery('');
    setLoading(true);

    try {
      const responseText = await askElectionQuestion(sanitizedText, historyForApi);
      
      const aiMsg = {
        role: 'assistant',
        content: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, aiMsg]);
      saveToFirestore(aiMsg);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I am having trouble connecting right now. Please try again later.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(query);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] min-h-[500px] max-w-4xl mx-auto bg-[#efeae2] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden relative font-sans">
      
      {/* Header */}
      <div className="bg-[#075e54] text-white px-4 py-3 flex justify-between items-center z-20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-xl shadow-sm border border-gray-200">
            🇮🇳
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight">ElectIQ</h2>
            <p className="text-xs text-[#d9fdd3] font-medium">Online</p>
          </div>
        </div>
        <button 
          onClick={handleClearChat}
          className="text-white hover:bg-white/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          title="Clear Conversation"
          aria-label="Clear Chat Conversation"
        >
          Clear Chat
        </button>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 relative z-10" style={{ backgroundImage: 'radial-gradient(#000000 0.5px, transparent 0.5px)', backgroundSize: '15px 15px', backgroundColor: '#efeae2', backgroundPosition: '0 0', opacity: 0.9 }}>
        
        {/* Starter Questions (only show if no user messages yet) */}
        {messages.filter(m => m.role === 'user').length === 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-6 mt-2">
            {STARTER_QUESTIONS.map((sq, i) => (
              <button
                key={i}
                onClick={() => handleSend(sq)}
                className="bg-white text-[#075e54] border border-[#075e54]/20 px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:bg-[#d9fdd3] hover:border-[#075e54]/40 transition-colors focus:outline-none focus:ring-2 focus:ring-[#075e54] w-full sm:w-auto"
                aria-label={`Ask: ${sq}`}
              >
                {sq}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, index) => {
          const isUser = msg.role === 'user';
          return (
            <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-xs md:text-sm shadow-sm mr-2 flex-shrink-0 self-end mb-1 border border-gray-100">
                  🇮🇳
                </div>
              )}
              
              <div className={`max-w-[85%] md:max-w-[70%] relative ${
                isUser 
                  ? 'bg-[#d9fdd3] text-gray-800 rounded-2xl rounded-br-none shadow-sm' 
                  : 'bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm border border-gray-100'
              }`}>
                {/* Tail ornament for WhatsApp look */}
                <div className={`absolute bottom-0 w-4 h-4 ${
                  isUser 
                    ? '-right-2 bg-[#d9fdd3] clip-tail-right' 
                    : '-left-2 bg-white clip-tail-left border-b border-l border-gray-100'
                }`} style={{ clipPath: isUser ? 'polygon(0 0, 0% 100%, 100% 100%)' : 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>
                
                <div className="p-3 md:p-4 text-sm md:text-[15px] leading-relaxed whitespace-pre-wrap">
                  {/* Basic markdown bold parser */}
                  {msg.content.split('**').map((text, i) => i % 2 === 1 ? <strong key={i} className="text-gray-900">{text}</strong> : text)}
                </div>
                
                <div className={`text-[10px] px-3 pb-2 text-right ${isUser ? 'text-gray-500' : 'text-gray-400'}`}>
                  {msg.time} {isUser && <span className="text-blue-500 ml-1">✓✓</span>}
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Typing Indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white flex items-center justify-center text-xs md:text-sm shadow-sm mr-2 flex-shrink-0 self-end mb-1 border border-gray-100">
              🇮🇳
            </div>
            <div className="bg-white rounded-2xl rounded-bl-none shadow-sm border border-gray-100 p-4 px-5 flex items-center gap-1.5 relative">
              <div className="absolute bottom-0 -left-2 w-4 h-4 bg-white" style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-2" />
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] px-3 py-2 z-20 mt-auto sticky bottom-0 w-full">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden relative">
            <textarea
              rows={1}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend(query);
                }
              }}
              placeholder="Message ElectIQ..."
              aria-label="Type your message to ElectIQ"
              className="w-full p-3 px-4 max-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#075e54] text-gray-800 rounded-2xl"
              disabled={loading}
              style={{ minHeight: '44px' }}
            />
            {query.length > 0 && (
              <div className={`absolute bottom-2 right-3 text-xs font-medium ${query.length > 500 ? 'text-red-500' : 'text-gray-400'}`}>
                {query.length}/500
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading || !query.trim() || query.length > 500}
            className="w-[48px] h-[48px] rounded-full bg-[#00a884] text-white flex items-center justify-center flex-shrink-0 hover:bg-[#008f6f] transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed mb-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#075e54]"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M1.101 21.757 23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"></path>
            </svg>
          </button>
        </form>
        {!user && (
          <div className="text-center mt-2 text-xs text-gray-500 font-medium">
            Sign in to save this conversation to your history.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatAssistant;
