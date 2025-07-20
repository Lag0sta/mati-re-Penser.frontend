import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    ],
     optimizeDeps: {
    include: ['html-react-parser'] // force Vite à pré-bundler ce package
  },
  build: {
    commonjsOptions: {
      include: [/html-react-parser/, /node_modules/]
    }
  }
})
