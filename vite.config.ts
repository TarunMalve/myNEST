import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  esbuild: {
    // Allow erasing type-only imports without requiring 'import type' syntax
    target: 'es2023',
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'recharts',
      'zustand',
      'zustand/middleware',
      'framer-motion',
      'lucide-react',
      'date-fns',
    ],
  },
})
