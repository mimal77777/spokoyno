import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/spokoyno/',
  server: {
    host: true,
    port: 5174,
  },
})