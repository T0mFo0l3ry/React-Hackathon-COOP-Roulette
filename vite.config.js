import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Local endpoint for the RAWG Database API
      '/api-rawg': {
        target: 'https://rawg-video-games-database.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-rawg/, ''),
      },
      // Local endpoint for the GameBrain API
      '/api-gamebrain': {
        target: 'https://gamebrain-video-game-discovery.p.rapidapi.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api-gamebrain/, ''),
      }
    }
  }
})