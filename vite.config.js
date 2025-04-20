import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path' // This import is missing

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5180, // Ensure this matches the port in docker-compose.yml
    strictPort: true, // Optional: Prevents Vite from choosing a different port if 5173 is unavailable
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@features": path.resolve(__dirname, "src/features"),
      "@/lib": path.resolve(__dirname, "./src/lib"),
    },
  },
})