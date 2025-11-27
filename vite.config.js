import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ⚡ TỐI ƯU BUILD
  build: {
    chunkSizeWarningLimit: 1500, // Tăng giới hạn để không báo warning

    rollupOptions: {
      output: {
        manualChunks(id) {
          // ❗ Không tách React ra chunk riêng (sẽ lỗi forwardRef)
          if (id.includes("node_modules")) {
            // Tách Supabase riêng
            if (id.includes("@supabase")) return "supabase";

            // Tách axios riêng
            if (id.includes("axios")) return "axios";

            // Các thư viện còn lại gom vào vendor
            return "vendor";
          }
        },
      },
    },
  },

  // ⚙️ SERVER CONFIG, GIỮ NGUYÊN CỦA BẠN
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
            console.log("Rewritten path:", proxyReq.path);
          });
          proxy.on("proxyRes", (proxyRes, req) => {
            console.log(
              "Received Response from Target:",
              proxyRes.statusCode,
              req.url
            );
          });
        },
      },
    },
  },
});
