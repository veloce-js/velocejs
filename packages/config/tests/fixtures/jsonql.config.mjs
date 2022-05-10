// this use a different name
import { join } from 'node:path'

const __dirname = import.meta.url

export default {
  contract: {
    cacheDir: join(__dirname, 'cache')
  }
}
