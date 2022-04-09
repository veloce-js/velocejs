// server static methods
import mime from 'mime-types'
import fs from 'fs'
import path from 'path'
import { HttpResponse, HttpRequest } from '../types'
import { DEFAULT_FILE } from '../constants'
import debug from 'debug'

const debugFn = debug('velocejs:server:serve-static')

/**
 * serve static files from assetDir
 */
export function serveStatic(assetDir: string | string[]) {
  const dirs: string[] = Array.isArray(assetDir) ? assetDir : [assetDir]

  return function(res: HttpResponse, req: HttpRequest) {
    // we need to provide a onAbortedHandler here
    res.onAborted(() => {
      debugFn(`Serve static aborted`)
    })

    let url = req.getUrl()

    // @TODO how to configure a default file to serve up
    if (url === '/') {
      url = DEFAULT_FILE
    }
    debugFn(url)
    const file = dirs
      .filter(dir => fs.existsSync(path.join(dir, url)))
      .map(dir => fs.readFileSync(path.join(dir, url)))

    if (file.length) {
      const mimeType = mime.lookup(url) || 'application/octet-stream'
      // console.log(mimeType, url)
      res.writeHeader('Content-Type', mimeType)
      // first come first serve
      res.end(file[0])
    } else {
      // @TODO
      res.writeStatus('404')
      res.end()
    }
  }
}
