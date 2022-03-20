
import uWS from 'uWebSockets.js'
import { createApp } from './create-app'
import { HttpResponse } from 'uWebSockets.js'
import Fetch from 'node-fetch'

createApp()
  .get('/*', (res: HttpResponse) => {
    res.end('Hello')
  })
  .listen(0, async (token) => {
    if (token) {
      const port = uWS.us_socket_local_port(token)

      const response = await Fetch(`http://localhost:${port}`)
      const txt = await response.text()

      console.log(txt)

    }
  })
