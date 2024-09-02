import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  // server:{
  //     proxy:{
  //        "/api":"http://localhost:8000"
  //     },
  // },
  server: {
    proxy: {
      // '/api' is the path that will be proxied
      '/api': {
        target: 'https://instagram-mxpp.onrender.com', // Backend server URL
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, 'api'),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
