import { useEffect } from 'react';

export default function N8nChatWidget() {
  useEffect(() => {
    // Load n8n Chat UI Widget
    const loadN8nChatUI = async () => {
      try {
        const n8nChatUiWidget = await import('https://proxy.n8nchatui.com/api/embed/dlKgNx');
        n8nChatUiWidget.default.load();
      } catch (error) {
        console.error("Failed to load n8n Chat UI widget:", error);
      }
    };

    loadN8nChatUI();
  }, []);

  // This component doesn't need to render anything as the widget is loaded globally
  return null;
}