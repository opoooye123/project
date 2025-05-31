import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Load environment variables from .env files
import dotenv from 'dotenv'
dotenv.config()

// Get backend URL from environment variable or default to localhost
const backendUrl = process.env.VITE_API_URL || 'http://localhost:5000'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      // Proxy all /api requests to your backend URL (removes CORS issues)
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
