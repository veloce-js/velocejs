// server static methods
import type { HttpResponse, HttpRequest } from './types'
import fs from 'node:fs'
import path from 'node:path'
import { DEFAULT_FILE } from './lib/constants'
import { write404 } from './writers'
import { renderFile } from './render'
import { isFunction, toArray } from '@jsonql/utils'

import debug from 'debug'
const debugFn = debug('velocejs:server:serve-static')

// @TODO investigate the compression
/** serve static files from assetDir */
export function serveStatic(
  assetDir: string | string[],
  onAbortedHandler?: () => void
) {
  const dirs: Array<string> = toArray(assetDir)
  // return handler
  return function(res: HttpResponse, req: HttpRequest) {
    // we need to provide a onAbortedHandler here
    res.onAborted(() => {
      if (onAbortedHandler && isFunction(onAbortedHandler)) {
        onAbortedHandler() // @TODO should we pass the res ?
      } else {
        debugFn(`Serve static aborted`)
      }
    })
    let url = req.getUrl()
    if (url === '/') {
      url = DEFAULT_FILE // @TODO should we allow change this
    }
    debugFn(url)
    const file = dirs
      .filter((dir: string) => fs.existsSync(path.join(dir, url)))
      .map((dir: string) => fs.readFileSync(path.join(dir, url)))

    if (file.length) {
      renderFile(res)(url, file[0])
    } else {
      write404(res)
    }
  }
}
