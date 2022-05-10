// this use a different name
import { join } from 'node:path'
import { __dirname } from '../../src'

export default {
  contract: {
    cacheDir: join(__dirname(import.meta.url), 'cache')
  }
}
