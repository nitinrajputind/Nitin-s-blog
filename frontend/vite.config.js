import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target : 'http://localhost:8080',
        secure:false
      }
    }
  },
  plugins: [react()],
})
