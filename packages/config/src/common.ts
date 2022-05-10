// add a helper method to get the __dirname when using the mjs file

import { dirname } from 'node:path'
import { fileURLToPath } from 'url'

export const __dirname = (import_meta_url: string) => (
  dirname(fileURLToPath(import_meta_url))
)
