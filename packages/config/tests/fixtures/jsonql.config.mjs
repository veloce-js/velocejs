// this use a different name
import { join } from 'node:path'
import { getDirname } from '../../src'

export default {
  contract: {
    cacheDir: join(getDirname(import.meta.url), 'cache')
  }
}
