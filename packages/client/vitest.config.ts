import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/tests/*.spec.ts'], // just to narrow it down to avoid conflict with existing tests 
  },
})
