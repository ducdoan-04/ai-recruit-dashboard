import axios from 'axios';

// Configuration
const N8N_WEBHOOK_URL = 'https://n8n.airecruit.io.vn/webhook/chatbot';
const DEFAULT_TIMEOUT = 10000; // 10 seconds

/**
 * Send message to n8n webhook
 * @param {string} message - User message
 * @param {string} sessionId - Session ID for conversation tracking
 * @param {Object} metadata - Additional metadata
 * @returns {Promise<Object>} Response from n8n
 */
export async function sendChatMessage(message, sessionId = null, metadata = {}) {
  try {
    const payload = {
      message: message.trim(),
      timestamp: new Date().toISOString(),
      sessionId: sessionId || generateSessionId(),
      metadata: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer,
        ...metadata
      }
    };

    const response = await axios.post(N8N_WEBHOOK_URL, payload, {
      timeout: DEFAULT_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return {
      success: true,
      data: response.data,
      reply: response.data.reply || response.data.message || 'Xin lỗi, tôi chưa hiểu rõ. Bạn có thể nói lại không?'
    };

  } catch (error) {
    console.error('Chat API Error:', error);
    
    // Handle different types of errors
    if (error.code === 'ECONNABORTED') {
      return {
        success: false,
        error: 'timeout',
        message: 'Kết nối quá lâu. Vui lòng thử lại sau.'
      };
    }
    
    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      if (status >= 500) {
        return {
          success: false,
          error: 'server_error',
          message: 'Lỗi server. Vui lòng thử lại sau.'
        };
      } else if (status === 404) {
        return {
          success: false,
          error: 'not_found',
          message: 'Webhook không tồn tại. Vui lòng kiểm tra cấu hình.'
        };
      } else if (status === 429) {
        return {
          success: false,
          error: 'rate_limit',
          message: 'Bạn đã gửi quá nhiều tin nhắn. Vui lòng chờ một chút.'
        };
      }
    }
    
    if (error.request) {
      // Network error
      return {
        success: false,
        error: 'network',
        message: 'Lỗi kết nối mạng. Vui lòng kiểm tra internet và thử lại.'
      };
    }
    
    // Other errors
    return {
      success: false,
      error: 'unknown',
      message: 'Có lỗi xảy ra. Vui lòng thử lại sau.'
    };
  }
}

/**
 * Generate a unique session ID
 * @returns {string} Session ID
 */
export function generateSessionId() {
  const sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  localStorage.setItem('ai-recruit-session-id', sessionId);
  return sessionId;
}

/**
 * Get or create session ID
 * @returns {string} Session ID
 */
export function getSessionId() {
  let sessionId = localStorage.getItem('ai-recruit-session-id');
  if (!sessionId) {
    sessionId = generateSessionId();
  }
  return sessionId;
}

/**
 * Save chat history to localStorage
 * @param {Array} messages - Array of message objects
 */
export function saveChatHistory(messages) {
  try {
    localStorage.setItem('ai-recruit-chat-history', JSON.stringify(messages));
  } catch (error) {
    console.error('Error saving chat history:', error);
  }
}

/**
 * Load chat history from localStorage
 * @returns {Array} Array of message objects
 */
export function loadChatHistory() {
  try {
    const saved = localStorage.getItem('ai-recruit-chat-history');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
}

/**
 * Clear chat history
 */
export function clearChatHistory() {
  try {
    localStorage.removeItem('ai-recruit-chat-history');
    localStorage.removeItem('ai-recruit-session-id');
  } catch (error) {
    console.error('Error clearing chat history:', error);
  }
}

/**
 * Test webhook connection
 * @param {string} webhookUrl - Webhook URL to test
 * @returns {Promise<Object>} Test result
 */
export async function testWebhookConnection(webhookUrl = N8N_WEBHOOK_URL) {
  try {
    const response = await axios.post(webhookUrl, {
      message: 'test',
      timestamp: new Date().toISOString(),
      sessionId: 'test_session',
      metadata: {
        test: true
      }
    }, {
      timeout: 5000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return {
      success: true,
      status: response.status,
      data: response.data
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      status: error.response?.status
    };
  }
}

/**
 * Get chat statistics
 * @returns {Object} Chat statistics
 */
export function getChatStats() {
  const history = loadChatHistory();
  const userMessages = history.filter(msg => msg.sender === 'user');
  const botMessages = history.filter(msg => msg.sender === 'bot');
  
  return {
    totalMessages: history.length,
    userMessages: userMessages.length,
    botMessages: botMessages.length,
    sessionId: getSessionId(),
    lastActivity: history.length > 0 ? history[history.length - 1].timestamp : null
  };
}

// Default export for convenience
export default {
  sendChatMessage,
  generateSessionId,
  getSessionId,
  saveChatHistory,
  loadChatHistory,
  clearChatHistory,
  testWebhookConnection,
  getChatStats
};

