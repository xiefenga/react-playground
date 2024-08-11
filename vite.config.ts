import path from 'node:path'
import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr"
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      icon: true
    }
  })],
  resolve: {
    alias: {
      '@': path.resolve('src'),
    }
  }
})
