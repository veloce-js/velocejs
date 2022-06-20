/*
https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md

"Accept: application/vnd.npm.install-v1+json" https://registry.npmjs.org/@velocejs/setup
*/
import https from 'https'

const urls = {
  int: 'registry.npmjs.org',
  cn: 'registry.npmmirror.com'
}

/**
 *
 * @param {number} timeout set a timeout if the result not return before that we just resolve it
 * @return Promise<any> json
 */
export async function checkUpdate (timeout = 2000) {
  return new Promise((resolve, reject) => {
    // set a timeout to resolve it
    const timer = setTimeout(() => {
      resolve(false)
    }, timeout)
    // making the call
    https.get(`https://${urls.cn}/@velocejs/setup`, {
      headers: {
        Accept: 'application/vnd.npm.install-v1+json'
      }
    }, res => {
      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', (chunk) => {
        rawData += chunk
      })
      res.on('end', () => {
        clearTimeout(timer)
        try {
          const parsedData = JSON.parse(rawData)
          // we only need this bit
          // "dist-tags":{"latest":"0.0.2"}
          const version = parsedData['dist-tags'].latest

          resolve(version)
        } catch (e) {
          reject(e.message)
        }
      })
    })
  })
}
