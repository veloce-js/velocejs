
import { UwsServer, serveStatic } from '@velocejs/server'

const app = new UwsServer()

app.run([
  {
    type: 'get',
    path: '/*',
    handler: serveStatic(__dirname)
  }
])
