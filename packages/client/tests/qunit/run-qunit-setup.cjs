// this will grab the list of test files
// inject into the html and run the server
const glob = require('glob')
const { join, resolve } = require('path')
const serverIoCore = require('server-io-core')
/**
 * @param {object} config configuration
 * @return {object} promise resolve the config for server-io-core
 */
const getConfig = (config) => {
  const baseDir = resolve(join(config.baseDir, 'qunit', 'files'))
  return new Promise((resolver, rejecter) => {
    glob(join(baseDir, config.testFilePattern), function(err, files) {
      if (err || !files.length) {
        console.error('FAILED TO FETCH ANY TEST FILES!')
        return rejecter(err)
      }
      // now start the server
      let opts = {
        port: config.port,
        webroot: config.webroot,
        open: config.open,
        reload: config.reload,
        middlewares: [], // you can add your koa 2 middleware as well
        // DON"T TOUCH THIS UNLESS YOU KNOW WHAT YOU ARE DOING //
        inject: {
          insertBefore: false,
          target: {
            body: files.map( file => file.replace(baseDir, '') )
          }
        }
      }
      resolver(opts)
    })
  })
}
// export it
module.exports = async function runQunit(userConfig) {
  return getConfig(userConfig)
    .then(serverIoCore)
    .catch(err => {
      console.error(err)
    })
}
