import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['Favicon.png'],
      manifest: {
        name: 'AetherPawn Chess',
        short_name: 'AetherPawn',
        description: 'Play chess online free against AI or locally with friends using AetherPawn.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          {
            src: '/Favicon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/Favicon.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/Favicon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
});