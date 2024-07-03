import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
server: {
    proxy: {
        "/api" : "http://prontogram:8000",
      },
    host: true,
    port: 4173
    },
  plugins: [react()],
})
