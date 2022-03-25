// @ts-check
import fs from 'fs'
import path from 'path'
import express from 'express'
import { createServer } from 'vite'
import getDirname from './lib/get-dirname.js'

const __dirname = getDirname(import.meta.url)
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

/**
 * There was a isProd param which has been taken out here
 *
 */
export async function createDevServer(
  root = process.cwd()
) {
  const resolve = (p) => path.resolve(__dirname, p)
  const indexProd = ''
  const manifest = {}
  const app = express()
  const vite = await createServer({
    root,
    logLevel: isTest ? 'error' : 'info',
    server: {
      middlewareMode: 'ssr',
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100
      }
    }
  })
  app.use(vite.middlewares)
  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl
      let template, render
      // always read fresh template in dev
      template = fs.readFileSync(resolve('index.html'), 'utf-8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/app/entry-server.js')).render

      const [appHtml, preloadLinks] = await render(url, manifest)
      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch(e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}

if (!isTest) {
  const PORT = process.env.PORT || 3004
  createDevServer().then(({ app }) =>
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`)
    })
  )
}
