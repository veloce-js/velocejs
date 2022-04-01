// server static methods
import mime from 'mime-types'
import fs from 'fs'
import path from 'path'

import { HttpResponse, HttpRequest } from 'uWebSockets.js'

/**
 * serve static files from assetDir
 */
export function serveStatic(assetDir: string | string[]) {

  const dirs = Array.isArray(assetDir) ? assetDir : [assetDir]

  return function(res: HttpResponse, req: HttpRequest) {
    const url = req.getUrl()
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
    }
  }
}
