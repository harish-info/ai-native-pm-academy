import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo-name>/. Override with BASE_PATH for forks or custom domains.
const base = process.env.BASE_PATH ?? '/ai-native-pm-academy/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    // Budget: no chunk over 500 kB minified (scripts/bundle-budget.mjs enforces gzip totals).
    // Curriculum text changes far more often than the libraries, so they cache separately.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor', test: /node_modules/ },
            { name: 'content', test: /src[\\/]content[\\/]/ },
          ],
        },
      },
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    testTimeout: 15000,
  },
})
