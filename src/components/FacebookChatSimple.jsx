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
    };

    // Load Facebook SDK script
    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('FacebookChatSimple: Facebook SDK script loaded');
    };
    script.onerror = (error) => {
      console.error('FacebookChatSimple: Error loading Facebook SDK:', error);
    };
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      const script = document.getElementById('facebook-jssdk');
      if (script) script.remove();
      
      const root = document.getElementById('fb-root');
      if (root) root.remove();
      
      const chat = document.getElementById('fb-customer-chat');
      if (chat) chat.remove();
    };
  }, []);

  return null;
}
