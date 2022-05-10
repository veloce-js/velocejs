// put this on the root directory for testing purpose
const { join } = require('node:path')

module.exports = {
  contract: {
    cacheDir: join(__dirname, 'test/fixtures')
  }
}
