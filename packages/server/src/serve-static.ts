// server static methods
import mime from 'mime-types'
import fs from 'fs'
import path from 'path'

import { HttpResponse, HttpRequest } from 'uWebSockets.js'


export function serveStatic(assetDir: string) {

  return function(res: HttpResponse, req: HttpRequest) {
    const url = req.getUrl()
    const file = fs.readFileSync(path.join(assetDir, url))
    if (file) {
      const mimeType = mime.lookup(url) || 'application/octet-stream'
      // console.log(mimeType, url)
      res.writeHeader('Content-Type', mimeType)
      res.end(file)
    } else {
      // @TODO
      res.writeStatus('404')
    }
  }
}
