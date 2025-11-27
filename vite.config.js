import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1500, // giữ lại giới hạn size, KHÔNG manualChunks
  },

  server: {
    host: true, // Cho phép truy cập từ mọi địa chỉ (vd: ngrok)
    port: 5173, // Cổng dev server

    // ⚙️ Cho phép domain ngrok truy cập
    allowedHosts: [
      "bok-noneatable-indefatigably.ngrok-free.dev", // domain hiện tại của bạn https://bok-noneatable-indefatigably.ngrok-free.dev
    ],

    // ⚙️ Proxy tới server n8n
    proxy: {
      "/api/n8n": {
        target: "https://n8n.airecruit.io.vn",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/n8n/, ""),
        secure: true,
        
        configure: (proxy) => {
          proxy.on("error", (err) => {
            console.log("proxy error", err);
          });
          proxy.on("proxyReq", (proxyReq, req) => {
            console.log("Sending Request to the Target:", req.method, req.url);
            console.log("Rewritten path:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log("Received Response from the Target:", proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
});
