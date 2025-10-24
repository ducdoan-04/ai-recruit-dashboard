/**
 * AI Recruit Chat Widget - Standalone Script
 * Có thể nhúng vào bất kỳ website nào
 * 
 * Sử dụng:
 * <script src="https://airecruit.io.vn/widget/chat-widget.js" 
 *         data-webhook="https://n8n.airecruit.io.vn/webhook/chatbot"
 *         data-title="Chat với AI Recruit"
 *         data-theme="blue"></script>
 */

(function() {
  'use strict';

  // Configuration từ data attributes
  const script = document.currentScript;
  const config = {
    webhookUrl: script.getAttribute('data-webhook') || 'https://n8n.airecruit.io.vn/webhook/chatbot',
    title: script.getAttribute('data-title') || 'Chat với AI Recruit',
    welcomeMessage: script.getAttribute('data-welcome') || 'Xin chào! Tôi là trợ lý AI Recruit. Tôi có thể giúp gì cho bạn?',
    placeholder: script.getAttribute('data-placeholder') || 'Nhập tin nhắn...',
    theme: script.getAttribute('data-theme') || 'blue',
    position: script.getAttribute('data-position') || 'bottom-right'
  };

  // Theme colors
  const themes = {
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

  const colors = themes[config.theme] || themes.blue;

  // State management
  let isOpen = false;
  let isLoading = false;
  let messages = [
    {
      id: 1,
      sender: 'bot',
      text: config.welcomeMessage,
      timestamp: new Date()
    }
  ];

  // Utility functions
  function generateSessionId() {
    const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('ai-recruit-session-id', sessionId);
    return sessionId;
  }

  function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  function saveChatHistory() {
    localStorage.setItem('ai-recruit-chat-history', JSON.stringify(messages));
  }

  function loadChatHistory() {
    const saved = localStorage.getItem('ai-recruit-chat-history');
    if (saved) {
      try {
        messages = JSON.parse(saved);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }

  function scrollToBottom() {
    const messagesContainer = document.getElementById('ai-recruit-messages');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }

  // API functions
  async function sendToWebhook(message) {
    try {
      const response = await fetch(config.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
          sessionId: localStorage.getItem('ai-recruit-session-id') || generateSessionId()
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.reply || 'Xin lỗi, tôi chưa hiểu rõ. Bạn có thể nói lại không?';
    } catch (error) {
      console.error('Chat error:', error);
      return 'Xin lỗi, có lỗi xảy ra khi kết nối đến server. Vui lòng thử lại sau.';
    }
  }

  // UI functions
  function createChatButton() {
    const button = document.createElement('button');
    button.id = 'ai-recruit-chat-button';
    button.innerHTML = '💬';
    button.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: none;
      background-color: ${colors.primary};
      color: white;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      z-index: 999999;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 6px 25px rgba(0,0,0,0.2)';
    });

    button.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
    });

    button.addEventListener('click', toggleChat);
    return button;
  }

  function createChatWindow() {
    const window = document.createElement('div');
    window.id = 'ai-recruit-chat-window';
    window.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 320px;
      height: 400px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.15);
      border: 1px solid #e0e0e0;
      z-index: 999999;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background-color: ${colors.primary};
      color: white;
      padding: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
    `;
    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="width: 8px; height: 8px; background-color: #4ade80; border-radius: 50%;"></div>
        <span>${config.title}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <button id="ai-recruit-clear" style="background: none; border: none; color: white; cursor: pointer; font-size: 16px;" title="Xóa lịch sử chat">🗑️</button>
        <button id="ai-recruit-close" style="background: none; border: none; color: white; cursor: pointer; font-size: 20px; font-weight: bold;">×</button>
      </div>
    `;

    // Messages container
    const messagesContainer = document.createElement('div');
    messagesContainer.id = 'ai-recruit-messages';
    messagesContainer.style.cssText = `
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      background-color: ${colors.background};
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;

    // Input container
    const inputContainer = document.createElement('div');
    inputContainer.style.cssText = `
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      background: white;
      display: flex;
      gap: 8px;
    `;

    const input = document.createElement('input');
    input.id = 'ai-recruit-input';
    input.type = 'text';
    input.placeholder = config.placeholder;
    input.style.cssText = `
      flex: 1;
      padding: 12px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.2s;
    `;

    const sendButton = document.createElement('button');
    sendButton.id = 'ai-recruit-send';
    sendButton.textContent = 'Gửi';
    sendButton.style.cssText = `
      padding: 12px 16px;
      background-color: ${colors.primary};
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    `;

    // Event listeners
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    sendButton.addEventListener('click', sendMessage);
    sendButton.addEventListener('mouseenter', function() {
      this.style.backgroundColor = colors.primaryHover;
    });
    sendButton.addEventListener('mouseleave', function() {
      this.style.backgroundColor = colors.primary;
    });

    document.getElementById('ai-recruit-close').addEventListener('click', toggleChat);
    document.getElementById('ai-recruit-clear').addEventListener('click', clearChat);

    // Assemble
    inputContainer.appendChild(input);
    inputContainer.appendChild(sendButton);
    window.appendChild(header);
    window.appendChild(messagesContainer);
    window.appendChild(inputContainer);

    return window;
  }

  function renderMessages() {
    const container = document.getElementById('ai-recruit-messages');
    if (!container) return;

    container.innerHTML = '';

    messages.forEach(message => {
      const messageDiv = document.createElement('div');
      messageDiv.style.cssText = `
        display: flex;
        ${message.sender === 'user' ? 'justify-content: flex-end' : 'justify-content: flex-start'};
      `;

      const messageContent = document.createElement('div');
      messageContent.style.cssText = `
        max-width: 75%;
        display: flex;
        flex-direction: column;
      `;

      const bubble = document.createElement('div');
      bubble.style.cssText = `
        padding: 12px;
        border-radius: 12px;
        font-size: 14px;
        line-height: 1.4;
        ${message.sender === 'user' 
          ? `background-color: ${colors.primary}; color: white;` 
          : 'background-color: white; color: #333; border: 1px solid #e0e0e0;'
        }
      `;
      bubble.textContent = message.text;

      const timestamp = document.createElement('div');
      timestamp.style.cssText = `
        font-size: 11px;
        color: #6b7280;
        margin-top: 4px;
        padding: 0 4px;
      `;
      timestamp.textContent = formatTime(message.timestamp);

      messageContent.appendChild(bubble);
      messageContent.appendChild(timestamp);
      messageDiv.appendChild(messageContent);
      container.appendChild(messageDiv);
    });

    // Add loading indicator if needed
    if (isLoading) {
      const loadingDiv = document.createElement('div');
      loadingDiv.style.cssText = 'display: flex; justify-content: flex-start;';
      
      const loadingContent = document.createElement('div');
      loadingContent.style.cssText = 'max-width: 75%;';
      
      const loadingBubble = document.createElement('div');
      loadingBubble.style.cssText = `
        padding: 12px;
        border-radius: 12px;
        font-size: 14px;
        background-color: white;
        color: #333;
        border: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      loadingBubble.innerHTML = `
        <div style="display: flex; gap: 4px;">
          <div style="width: 6px; height: 6px; background-color: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite;"></div>
          <div style="width: 6px; height: 6px; background-color: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite 0.1s;"></div>
          <div style="width: 6px; height: 6px; background-color: #9ca3af; border-radius: 50%; animation: bounce 1.4s infinite 0.2s;"></div>
        </div>
        <span>Đang gõ...</span>
      `;
      
      loadingContent.appendChild(loadingBubble);
      loadingDiv.appendChild(loadingContent);
      container.appendChild(loadingDiv);
    }

    scrollToBottom();
  }

  // Main functions
  function toggleChat() {
    const button = document.getElementById('ai-recruit-chat-button');
    const window = document.getElementById('ai-recruit-chat-window');

    if (isOpen) {
      // Close chat
      if (window) window.style.display = 'none';
      if (button) button.style.display = 'flex';
      isOpen = false;
    } else {
      // Open chat
      if (button) button.style.display = 'none';
      
      if (!window) {
        const chatWindow = createChatWindow();
        document.body.appendChild(chatWindow);
        renderMessages();
        document.getElementById('ai-recruit-input').focus();
      } else {
        window.style.display = 'flex';
        renderMessages();
        document.getElementById('ai-recruit-input').focus();
      }
      
      isOpen = true;
    }
  }

  async function sendMessage() {
    const input = document.getElementById('ai-recruit-input');
    const message = input.value.trim();
    
    if (!message || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: message,
      timestamp: new Date()
    };

    messages.push(userMessage);
    input.value = '';
    isLoading = true;
    renderMessages();
    saveChatHistory();

    // Send to webhook
    const reply = await sendToWebhook(message);
    
    // Add bot response
    const botMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: reply,
      timestamp: new Date()
    };

    messages.push(botMessage);
    isLoading = false;
    renderMessages();
    saveChatHistory();
  }

  function clearChat() {
    messages = [
      {
        id: 1,
        sender: 'bot',
        text: config.welcomeMessage,
        timestamp: new Date()
      }
    ];
    renderMessages();
    saveChatHistory();
  }

  // CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes bounce {
      0%, 80%, 100% {
        transform: scale(0);
      }
      40% {
        transform: scale(1);
      }
    }

    @media (max-width: 768px) {
      #ai-recruit-chat-button {
        bottom: 16px !important;
        right: 16px !important;
      }
      
      #ai-recruit-chat-window {
        width: calc(100vw - 32px) !important;
        height: calc(100vh - 32px) !important;
        max-width: calc(100vw - 32px) !important;
        max-height: calc(100vh - 32px) !important;
        bottom: 16px !important;
        right: 16px !important;
      }
    }

    @media (max-width: 480px) {
      #ai-recruit-chat-button {
        bottom: 8px !important;
        right: 8px !important;
      }
      
      #ai-recruit-chat-window {
        width: calc(100vw - 16px) !important;
        height: calc(100vh - 16px) !important;
        max-width: calc(100vw - 16px) !important;
        max-height: calc(100vh - 16px) !important;
        bottom: 8px !important;
        right: 8px !important;
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize
  function init() {
    // Load chat history
    loadChatHistory();

    // Create and append chat button
    const chatButton = createChatButton();
    document.body.appendChild(chatButton);

    // Make functions globally available for debugging
    window.aiRecruitChat = {
      toggle: toggleChat,
      clear: clearChat,
      send: sendMessage,
      config: config
    };
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

