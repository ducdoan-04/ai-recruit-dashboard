Facebook Customer Chat (Messenger) plugin

This project includes a small runtime injector (in `src/main.jsx`) that will add Facebook's Customer Chat plugin to the site if you set the environment variable `VITE_FB_PAGE_ID` (used by the Page that has your n8n bot attached).

Steps to enable on Vercel:

1. In your Vercel project settings -> Environment Variables, add a variable named `VITE_FB_PAGE_ID` with the numeric Page ID of your Facebook Page.
2. In Meta (Facebook) Page settings → Messaging → Customer Chat Plugin, add your deployed domain (e.g. `ai-recruit-dashboard.vercel.app`) to the "Allowed domains" list.
3. Deploy the site (a rebuild is required for the env var to be available to the client). The Messenger icon should appear in the bottom-right corner.

Notes:
- If `VITE_FB_PAGE_ID` is not set the app logs a warning and the widget will not be inserted.
- Messages sent from the widget go to the connected Page and will be routed to your n8n flow if that Page is already connected to n8n.

If you need the chat injected in a different layout file instead of `src/main.jsx`, move the injector code to your layout component and ensure it runs on the client side only.
