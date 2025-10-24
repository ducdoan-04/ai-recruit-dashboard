import { useEffect } from 'react';

/**
 * Facebook Customer Chat Plugin Component
 * Automatically injects Facebook Messenger chat widget if VITE_FB_PAGE_ID is set
 */
export default function FacebookChat() {
  useEffect(() => {
    const pageId = import.meta.env.VITE_FB_PAGE_ID;
    
    console.log('FacebookChat: Initializing...', { pageId });
    
    if (!pageId) {
      console.warn('VITE_FB_PAGE_ID environment variable is not set. Facebook Chat will not be available.');
      return;
    }

    console.log('FacebookChat: Page ID found, initializing chat...');

    // Simple approach - directly inject the Facebook Chat code
    initializeFacebookChat(pageId);
  }, []);

  const initializeFacebookChat = (pageId) => {
    console.log('FacebookChat: Initializing Facebook Chat with page ID:', pageId);

    // Create fb-root div if it doesn't exist
    if (!document.getElementById('fb-root')) {
      const fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
      console.log('FacebookChat: fb-root div created');
    }

    // Create customer chat div if it doesn't exist
    if (!document.getElementById('fb-customer-chat')) {
      const chatDiv = document.createElement('div');
      chatDiv.id = 'fb-customer-chat';
      chatDiv.className = 'fb-customerchat';
      chatDiv.setAttribute('page_id', pageId);
      chatDiv.setAttribute('attribution', 'biz_inbox');
      document.body.appendChild(chatDiv);
      console.log('FacebookChat: Chat widget div created and added to DOM');
    }

    // Initialize Facebook SDK
    window.fbAsyncInit = function() {
      console.log('FacebookChat: Facebook SDK initializing...');
      window.FB.init({
        appId: '797708303042269', // App ID from Facebook Developer Console
        xfbml: true,
        version: 'v18.0'
      });
      console.log('FacebookChat: Facebook SDK initialized');
      
      // Parse the chat widget after SDK is ready
      setTimeout(() => {
        if (window.FB && window.FB.XFBML) {
          console.log('FacebookChat: Parsing XFBML...');
          window.FB.XFBML.parse();
        } else {
          console.warn('FacebookChat: Facebook XFBML not available');
        }
      }, 1000);
    };

    // Load Facebook SDK script if not already loaded
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('FacebookChat: Facebook SDK script loaded');
      };
      script.onerror = (error) => {
        console.error('FacebookChat: Error loading Facebook SDK:', error);
      };
      document.head.appendChild(script);
      console.log('FacebookChat: Facebook SDK script added to head');
    } else {
      console.log('FacebookChat: Facebook SDK script already exists');
    }
  };


  return null; // This component doesn't render anything visible
}
