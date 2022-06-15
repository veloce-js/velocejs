import { defineConfig } from 'vitest/config'
// the hook didn't work complain there is no main export from the vitest
// only use this for pure esm files
export default defineConfig({
  test: {
    include: ['**/vite-tests/*.spec.ts'], // just to narrow it down to avoid conflict with existing tests
    setupFiles: ['./hook']
  },
  esbuild: {
    target: 'node18',
    format: 'cjs'
  }
})
