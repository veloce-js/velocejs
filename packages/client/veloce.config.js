// for testing the contract
// for testing purpose
const { join } = require('node:path')

module.exports = {
  contract: {
    cacheDir: join(__dirname, 'tests','fixtures', 'contract')
  }
}
