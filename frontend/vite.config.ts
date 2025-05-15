import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 3000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  define: {
    // This ensures environment variables are available in your app
    'import.meta.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL || 'https://retinascan-backend.onrender.com')
  },
  base: '/',
});
