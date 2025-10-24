import { useEffect } from 'react';

/**
 * Simple Facebook Customer Chat Plugin Component
 * Uses the official Facebook Customer Chat Plugin code
 */
export default function FacebookChatSimple() {
  useEffect(() => {
    const pageId = import.meta.env.VITE_FB_PAGE_ID;
    
    console.log('FacebookChatSimple: Initializing...', { pageId });
    
    if (!pageId) {
      console.warn('VITE_FB_PAGE_ID environment variable is not set. Facebook Chat will not be available.');
      return;
    }

    // Remove any existing Facebook scripts and elements
    const existingScript = document.getElementById('facebook-jssdk');
    if (existingScript) {
      existingScript.remove();
    }
    
    const existingRoot = document.getElementById('fb-root');
    if (existingRoot) {
      existingRoot.remove();
    }
    
    const existingChat = document.getElementById('fb-customer-chat');
    if (existingChat) {
      existingChat.remove();
    }

    // Create fb-root div
    const fbRoot = document.createElement('div');
    fbRoot.id = 'fb-root';
    document.body.appendChild(fbRoot);

    // Create customer chat div
    const chatDiv = document.createElement('div');
    chatDiv.id = 'fb-customer-chat';
    chatDiv.className = 'fb-customerchat';
    chatDiv.setAttribute('page_id', pageId);
    chatDiv.setAttribute('attribution', 'biz_inbox');
    document.body.appendChild(chatDiv);

    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      console.log('FacebookChatSimple: Facebook SDK initializing...');
      window.FB.init({
        appId: '797708303042269',
        xfbml: true,
        version: 'v18.0'
      });
      console.log('FacebookChatSimple: Facebook SDK initialized');
      
      // Load Customer Chat plugin after SDK is ready
      loadCustomerChatPlugin();
    };

    // Load Facebook SDK script
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('FacebookChatSimple: Facebook SDK script loaded');
    };
    script.onerror = (error) => {
      console.error('FacebookChatSimple: Error loading Facebook SDK:', error);
    };
    document.head.appendChild(script);

    // Function to load Customer Chat plugin
    const loadCustomerChatPlugin = () => {
      console.log('FacebookChatSimple: Loading Customer Chat plugin...');
      
      // Load Customer Chat plugin script
      if (!document.getElementById('facebook-customer-chat-plugin')) {
        const pluginScript = document.createElement('script');
        pluginScript.id = 'facebook-customer-chat-plugin';
        pluginScript.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
        pluginScript.async = true;
        pluginScript.defer = true;
        pluginScript.onload = () => {
          console.log('FacebookChatSimple: Customer Chat plugin loaded');
          // Parse the chat widget after plugin is loaded
          if (window.FB && window.FB.XFBML) {
            console.log('FacebookChatSimple: Parsing XFBML...');
            window.FB.XFBML.parse();
          }
        };
        pluginScript.onerror = (error) => {
          console.error('FacebookChatSimple: Error loading Customer Chat plugin:', error);
        };
        document.head.appendChild(pluginScript);
      }
    };

    // Cleanup function
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) script.remove();
      
      const pluginScript = document.getElementById('facebook-customer-chat-plugin');
      if (pluginScript) pluginScript.remove();
      
      const root = document.getElementById('fb-root');
      if (root) root.remove();
      
      const chat = document.getElementById('fb-customer-chat');
      if (chat) chat.remove();
    };
  }, []);

  return null;
}
