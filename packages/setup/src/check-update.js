/*
https://github.com/npm/registry/blob/master/docs/responses/package-metadata.md

"Accept: application/vnd.npm.install-v1+json" https://registry.npmjs.org/@velocejs/setup
*/
import https from 'https'

/**
 *
 * @param {number} timeout set a timeout if the result not return before that we just resolve it
 * @return Promise<any> json
 */
export function checkUpdate(timeout = 1000) {
  return new Promise((resolver, rejecter) => {
    // set a timeout to resolve it
    const timer = setTimeout(() => {
      resolver(true)
    }, timeout)
    // making the call
    https.get('https://registry.npmjs.org/@velocejs/setup', {
      headers: {
        'Accept': 'application/vnd.npm.install-v1+json'
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
          resolver(parsedData)
        } catch (e) {
          rejecter(e.message)
        }
      })
    })
  })
}
