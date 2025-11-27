import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ⚡ TỐI ƯU BUILD – CHIA CHUNK TỰ ĐỘNG
  build: {
    chunkSizeWarningLimit: 1500, // tăng giới hạn để không warning

    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react";
            if (id.includes("supabase")) return "supabase";
            if (id.includes("mui") || id.includes("@emotion")) return "mui";
            if (id.includes("axios")) return "axios";

            return "vendor"; // fallback chung
          }
        },
      },
    },
  },

  // ⚙️ CẤU HÌNH SERVER
  server: {
    host: true,
    port: 5173,

    allowedHosts: [
      "bok-noneatable-indefatigably.ngrok-free.dev",
    ],

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
            console.log("Sending Request to Target:", req.method, req.url);
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "Response from Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
