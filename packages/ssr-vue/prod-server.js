// @ts-check
import fs from 'fs'
import path from 'path'
import { createApp, serveStatic } from '@velocejs/server'
// import mime from 'mime-types'
import getDirname from './lib/get-dirname.js'

const port = process.env.PORT || 9001
const __dirname = getDirname(import.meta.url)
const resolve = (p) => path.resolve(__dirname, p)

// serve up the static files
createApp()
  .get('/assets/*', serveStatic(resolve('app/assets')))
  .get('/*', async (res, req) => {
    // Here we modified it for our SSR app
    const indexProd = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    const manifest = /* @ts-ignore */ require('./dist/client/ssr-manifest.json')
    const url = req.getUrl()
    // now we just need to figure out how to serve the static files
    // and we really shouldn't serve static files here, it should be
    // the job of web server
    console.log('request url', url)
    // @TODO we should have a map to tell which should be SSG (cached)
    // then look up here or even better prefix with a path
    // and move to another handler to make code cleaner
    const template = indexProd
    const render = require('./dist/server/entry-server.js').render

    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace('<!--preload-links-->', preloadLinks)
      .replace('<!--app-html-->', appHtml)
    res.end(html)
  }).listen(port, (token) => {
    if (token) {
      console.log('Listening to port ' + port)
    } else {
      console.log('Failed to listen to port ' + port)
    }
  })
