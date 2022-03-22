// @ts-check
const fs = require('fs')
const path = require('path')
// const uWS = require('uWebSockets.js')

// const uWS = require('@velocejs/server')
const { createApp, serveStatic } = require('@velocejs/server')

const mime = require('mime-types')

const port = process.env.PORT || 9001
// This is the production server using uWebSocket.js
const resolve = (p) => path.resolve(__dirname, p)

// uWS.App()
  // serve up the static files
createApp()
  .get('/assets/*', serveStatic(resolve('app/assets')))
  /*
  .get('/assets/*', async (res, req) => {
    const url = req.getUrl()
    const assetDir = path.join(__dirname, 'dist', 'client')
    const file = fs.readFileSync(path.join(assetDir, url))
    if (file) {
      const mimeType = mime.lookup(url) || 'application/octet-stream'
      console.log(mimeType, url)
      res.writeHeader('Content-Type', mimeType)
      res.end(file)
    } else {
      // @TODO
      res.writeStatus(404)
    }
  }) */
  .get('/*', async (res, req) => {

    // Here we modified it for our SSR app
    const indexProd = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    const manifest = /* @ts-ignore */ require('./dist/client/ssr-manifest.json')
    const url = req.getUrl()

    // now we just need to figure out how to serve the static files
    // and we really shouldn't serve static files here, it should be
    // the job of web server

    console.log(`request url`, url)

    // @TODO we should have a map to tell which should be SSG (cached)
    // then look up here or even better prefix with a path
    // and move to another handler to make code cleaner


    let template, render
    template = indexProd
    render = require('./dist/server/entry-server.js').render


    const [appHtml, preloadLinks] = await render(url, manifest)

    const html = template
      .replace(`<!--preload-links-->`, preloadLinks)
      .replace(`<!--app-html-->`, appHtml)

    res.end(html)


  }).listen(port, (token) => {
    if (token) {
      console.log('Listening to port ' + port);
    } else {
      console.log('Failed to listen to port ' + port);
    }
  })
