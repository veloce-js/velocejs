// this use a different name
import { join } from 'node:path'

export default {
  contract: {
    cacheDir: join(__dirname, 'cache')
  }
}
