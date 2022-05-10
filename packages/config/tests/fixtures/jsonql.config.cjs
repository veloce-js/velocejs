// this use a different name
const { join } = require('node:path')

module.exports = {
  contract: {
    cacheDir: join(__dirname, 'cache')
  }
}
