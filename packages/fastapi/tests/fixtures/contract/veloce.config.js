// for testing the contract
const { join } = require('node:path')

module.exports = {
  contract: {
    cacheDir: join(__dirname, 'tmp')
  }
}
