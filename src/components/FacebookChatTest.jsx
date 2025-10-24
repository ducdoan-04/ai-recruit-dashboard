import { useEffect, useState } from 'react';

/**
 * Test component để debug Facebook Chat
 */
export default function FacebookChatTest() {
  const [debugInfo, setDebugInfo] = useState([]);
  const [pageId, setPageId] = useState('');

  const addDebugInfo = (message) => {
    console.log(message);
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    const envPageId = import.meta.env.VITE_FB_PAGE_ID;
    setPageId(envPageId || 'NOT_SET');
    
    addDebugInfo(`Environment VITE_FB_PAGE_ID: ${envPageId || 'NOT_SET'}`);
    addDebugInfo(`Window.FB exists: ${!!window.FB}`);
    addDebugInfo(`fb-root exists: ${!!document.getElementById('fb-root')}`);
    addDebugInfo(`fb-customer-chat exists: ${!!document.getElementById('fb-customer-chat')}`);
  }, []);

  const testFacebookChat = () => {
    addDebugInfo('=== Testing Facebook Chat ===');
    
    // Create fb-root
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
      addDebugInfo('Created fb-root div');
    }

    // Create customer chat
    if (!document.getElementById('fb-customer-chat')) {
      const chatDiv = document.createElement('div');
      chatDiv.id = 'fb-customer-chat';
      chatDiv.className = 'fb-customerchat';
      chatDiv.setAttribute('page_id', '830352943493751'); // Real page ID
      chatDiv.setAttribute('attribution', 'biz_inbox');
      document.body.appendChild(chatDiv);
      addDebugInfo('Created fb-customer-chat div');
    }

    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      addDebugInfo('Facebook SDK initializing...');
      window.FB.init({
        appId: '797708303042269', // App ID from Facebook Developer Console
        xfbml: true,
        version: 'v18.0'
      });
      addDebugInfo('Facebook SDK initialized');
      
      // Parse the chat widget after SDK is ready
      setTimeout(() => {
        if (window.FB && window.FB.XFBML) {
          addDebugInfo('Parsing XFBML...');
          window.FB.XFBML.parse();
        } else {
          addDebugInfo('Facebook XFBML not available');
        }
      }, 1000);
    };

    // Load Facebook SDK
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        addDebugInfo('Facebook SDK script loaded successfully');
      };
      script.onerror = (error) => {
        addDebugInfo(`Error loading Facebook SDK: ${error}`);
      };
      document.head.appendChild(script);
      addDebugInfo('Facebook SDK script added to head');
    }
  };


  return (
    <div className="fixed top-4 right-4 bg-white p-4 border rounded-lg shadow-lg max-w-md z-50">
      <h3 className="font-bold text-lg mb-2">Facebook Chat Debug</h3>
      <div className="mb-2">
        <strong>Page ID:</strong> {pageId}
      </div>
      <button 
        onClick={testFacebookChat}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
      >
        Test Facebook Chat
      </button>
      <div className="max-h-40 overflow-y-auto text-xs">
        {debugInfo.map((info, index) => (
          <div key={index} className="mb-1">{info}</div>
        ))}
      </div>
    </div>
  );
}
