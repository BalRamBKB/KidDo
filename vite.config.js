import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'KidDo Academy',
        short_name: 'KidDo',
        description: 'Magical Gamified Learning Dashboard for Kids',
        theme_color: '#fbbf24', // Matches your playful amber layout color
        background_color: '#f0fdf4', // Light playful green theme background
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: '/KidDo/', // 🌟 MUST match your GitHub repository name exact casing!
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
 ],
    base: '/KidDo/',
})
