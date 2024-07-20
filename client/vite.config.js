import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import envCompatible from 'vite-plugin-env-compatible';

export default defineConfig({
  mode: 'development', // Or 'production' as needed
  plugins: [react(), envCompatible({
    prefix: 'REACT_APP_'
  })
],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/graphql': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    }
  },
  css: {
    postcss: "./postcss.config.cjs",
  },
});