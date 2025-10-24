import { useState, useEffect, useRef } from "react";
import { sendChatMessage, getSessionId, saveChatHistory, loadChatHistory, clearChatHistory } from "../api/chatbot";

export default function ChatWidget({ 
  webhookUrl = "https://n8n.airecruit.io.vn/webhook/chatbot",
  title = "Chat với AI Recruit",
  welcomeMessage = "Xin chào! Tôi là trợ lý AI Recruit. Tôi có thể giúp gì cho bạn?",
  placeholder = "Nhập tin nhắn...",
  theme = "blue"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: "bot", 
      text: welcomeMessage,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = loadChatHistory();
    if (savedMessages.length > 0) {
      setMessages(savedMessages);
    }
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: input.trim(),
      timestamp: new Date()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    // Save user message
    saveChatHistory(newMessages);

    // Send to n8n webhook
    const result = await sendChatMessage(userMessage.text, getSessionId(), {
      webhookUrl: webhookUrl
    });

    const botMessage = {
      id: Date.now() + 1,
      sender: "bot",
      text: result.success ? result.reply : result.message,
      timestamp: new Date()
    };

    const finalMessages = [...newMessages, botMessage];
    setMessages(finalMessages);
    saveChatHistory(finalMessages);
    setIsLoading(false);
  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    const welcomeMsg = {
      id: 1,
      sender: "bot",
      text: welcomeMessage,
      timestamp: new Date()
    };
    setMessages([welcomeMsg]);
    saveChatHistory([welcomeMsg]);
    clearChatHistory();
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const themeColors = {
    blue: {
      primary: '#0084ff',
      primaryHover: '#0066cc',
      background: '#f8f9fa',
      text: '#333333'
    },
    green: {
      primary: '#25d366',
      primaryHover: '#1ea952',
      background: '#f0f8f0',
      text: '#333333'
    },
    purple: {
      primary: '#8b5cf6',
      primaryHover: '#7c3aed',
      background: '#faf5ff',
      text: '#333333'
    }
  };

  const colors = themeColors[theme] || themeColors.blue;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
          style={{ backgroundColor: colors.primary }}
        >
          <span className="text-white text-2xl">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className="w-80 h-96 bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border"
          style={{ maxWidth: 'calc(100vw - 2rem)', maxHeight: 'calc(100vh - 2rem)' }}
        >
          {/* Header */}
          <div 
            className="p-4 flex justify-between items-center text-white"
            style={{ backgroundColor: colors.primary }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="font-semibold">{title}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-white hover:text-gray-200 transition-colors"
                title="Xóa lịch sử chat"
              >
                🗑️
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors text-xl font-bold"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div 
            className="flex-1 p-4 overflow-y-auto space-y-3"
            style={{ backgroundColor: colors.background }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className="max-w-[75%]">
                  <div
                    className={`px-3 py-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "text-white"
                        : "text-gray-700 border"
                    }`}
                    style={{
                      backgroundColor: message.sender === "user" ? colors.primary : "white"
                    }}
                  >
                    {message.text}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 px-1">
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[75%]">
                  <div className="px-3 py-2 rounded-lg text-sm text-gray-700 border bg-white">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span>Đang gõ...</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t bg-white">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                disabled={isLoading}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ 
                  backgroundColor: colors.primary,
                  ':hover': { backgroundColor: colors.primaryHover }
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.primaryHover}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary}
              >
                {isLoading ? "..." : "Gửi"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile responsive styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .fixed.bottom-6.right-6 {
            bottom: 1rem !important;
            right: 1rem !important;
          }
          
          .w-80.h-96 {
            width: calc(100vw - 2rem) !important;
            height: calc(100vh - 2rem) !important;
            max-width: calc(100vw - 2rem) !important;
            max-height: calc(100vh - 2rem) !important;
          }
        }
      `}</style>
    </div>
  );
}
