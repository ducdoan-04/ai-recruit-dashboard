import { useState } from 'react';
import N8nChatWidget from '../components/N8nChatWidget';
import { testWebhookConnection, getChatStats } from '../api/chatbot';

export default function ChatDemo() {
  const [webhookUrl, setWebhookUrl] = useState('https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat');
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);
  const [chatStats, setChatStats] = useState(null);

  const handleTestWebhook = async () => {
    setIsTesting(true);
    setTestResult(null);
    
    try {
      const result = await testWebhookConnection(webhookUrl);
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error.message
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleGetStats = () => {
    const stats = getChatStats();
    setChatStats(stats);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🤖 n8n Official Chat Widget Demo
          </h1>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Configuration Panel */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Cấu hình Chatbot</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Webhook URL (n8n)
                </label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleTestWebhook}
                  disabled={isTesting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {isTesting ? 'Đang test...' : 'Test Webhook'}
                </button>
                
                <button
                  onClick={handleGetStats}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Xem Thống kê
                </button>
              </div>

              {/* Test Result */}
              {testResult && (
                <div className={`p-3 rounded-md ${
                  testResult.success 
                    ? 'bg-green-50 border border-green-200' 
                    : 'bg-red-50 border border-red-200'
                }`}>
                  <div className={`text-sm font-medium ${
                    testResult.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {testResult.success ? '✅ Kết nối thành công!' : '❌ Kết nối thất bại'}
                  </div>
                  {testResult.error && (
                    <div className="text-sm text-red-600 mt-1">
                      {testResult.error}
                    </div>
                  )}
                  {testResult.data && (
                    <div className="text-sm text-green-600 mt-1">
                      Phản hồi: {JSON.stringify(testResult.data)}
                    </div>
                  )}
                </div>
              )}

              {/* Chat Stats */}
              {chatStats && (
                <div className="bg-blue-50 border border-blue-200 p-3 rounded-md">
                  <div className="text-sm font-medium text-blue-800 mb-2">
                    📊 Thống kê Chat
                  </div>
                  <div className="text-sm text-blue-600 space-y-1">
                    <div>Tổng tin nhắn: {chatStats.totalMessages}</div>
                    <div>Tin nhắn người dùng: {chatStats.userMessages}</div>
                    <div>Tin nhắn bot: {chatStats.botMessages}</div>
                    <div>Session ID: {chatStats.sessionId}</div>
                    {chatStats.lastActivity && (
                      <div>Hoạt động cuối: {new Date(chatStats.lastActivity).toLocaleString('vi-VN')}</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">Hướng dẫn sử dụng</h2>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="font-medium text-yellow-800 mb-1">1. Cấu hình n8n Webhook</div>
                  <div>Đảm bảo webhook URL đúng và n8n workflow đang chạy</div>
                </div>
                
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="font-medium text-blue-800 mb-1">2. Test kết nối</div>
                  <div>Nhấn "Test Webhook" để kiểm tra kết nối đến n8n</div>
                </div>
                
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <div className="font-medium text-green-800 mb-1">3. Chat thử</div>
                  <div>Nhấn nút chat ở góc phải để bắt đầu trò chuyện</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">📝 Cấu trúc n8n Workflow</h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>1. <strong>Webhook Trigger</strong> - Nhận tin nhắn từ chatbot</div>
                  <div>2. <strong>AI/GPT Node</strong> - Xử lý tin nhắn</div>
                  <div>3. <strong>Respond to Webhook</strong> - Trả về phản hồi</div>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Response format: <code>{"{ \"reply\": \"Tin nhắn phản hồi\" }"}</code>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integration Examples */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🔧 Cách tích hợp
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* React Component */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">React Component</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto">
                <pre>{`import N8nChatWidget from './components/N8nChatWidget';

function App() {
  return (
    <div>
      <N8nChatWidget 
        webhookUrl="https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat"
        title="Chat với AI Recruit"
        subtitle="Trợ lý AI tuyển dụng thông minh"
        primaryColor="#0084ff"
      />
    </div>
  );
}`}</pre>
              </div>
            </div>

            {/* Standalone Script */}
            <div>
              <h3 className="font-medium text-gray-800 mb-3">Script nhúng</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-x-auto">
                <pre>{`<link href="https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css" rel="stylesheet" />
<script type="module">
  import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js';

  createChat({
    webhookUrl: 'https://n8n.airecruit.io.vn/webhook/b6e42d57-3bba-4602-bf18-22bc11efe690/chat',
    title: 'Chat với AI Recruit',
    primaryColor: '#0084ff'
  });
</script>`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* n8n Chat Widget */}
          <N8nChatWidget />
    </div>
  );
}
