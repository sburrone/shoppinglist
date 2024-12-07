import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSemiTheme from '@kousum/vite-plugin-semi-theme'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteSemiTheme({
      theme: '@semi-bot/semi-theme-gosh_mobile',
    }),
  ],
})
