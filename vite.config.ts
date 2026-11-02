import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves the site from /<repo-name>/. Override with BASE_PATH for forks or custom domains.
const base = process.env.BASE_PATH ?? '/ai-native-pm-academy/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    // Budget: no chunk over 450 kB minified; scripts/bundle-budget.mjs also caps gzip totals.
    // Curriculum text changes far more often than the libraries, so they cache separately.
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor', test: /node_modules/, priority: 100 },
            {
              name: 'product-loop',
              test: /src[\\/](content[\\/]productLoop\.ts|ui[\\/]ProductLoop\.tsx)$/,
              priority: 20,
            },
            {
              name: 'lesson-visuals',
              test: /src[\\/](content[\\/]illustrations\.ts|ui[\\/]LessonIllustration\.tsx)$/,
              priority: 20,
            },
            {
              // Only the lazily loaded field guide page reads it, so it stays out of the content chunk.
              name: 'field-guide',
              test: /src[\\/]content[\\/]fieldGuide\.ts$/,
              priority: 20,
            },
            {
              // Same for the starter kit page.
              name: 'starter-kit',
              test: /src[\\/]content[\\/]starterKit\.ts$/,
              priority: 20,
            },
            { name: 'teaching', test: /src[\\/]content[\\/]teaching\.ts$/, priority: 10 },
            { name: 'resources', test: /src[\\/]content[\\/]resources\.ts$/, priority: 10 },
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
