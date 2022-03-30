# @veloce/server

The core is using [uWebSocket.js]() with several additional helpers methods

## How to

The following example using Typescript

### createApp(opt?: AppOptions): TemplatedApp
### shutdownServer(token: any)

```ts
import { createApp, shutdownServer } from '@velocejs/server'
const port = 9001
let connectedSocket

createApp()
  .get('/*', (res: HttpResponse) => {
    res.end('Hello')
  })
  .listen(port, token => {
    if (token) {
      connectedSocket
      console.log(`Server is running ${port}`)
    }
  })

// now some time later if you need to gracefully shutdown your server
shutdownServer(connectedSocket)
```
If you pass the following object, then it will create a `SSLApp`

```js
{
  key_file_name: 'path/to/key.pem',
  cert_file_name: 'path/to/cert.pem',
  passphrase: 'your_pass_phrase'
}
```

#### Automatically determine port number

You can let server to decided which port number to use (very handy when you need to run multiple instance per CPU)

```ts
import { createApp, getPort } from '@velocejs/server'
const port = 0

createApp()
  .any('/*', (res: HttpResponse) => {
    res.end('Hello')
  })
  .listen(port, token => {
    const thisPortNumber = getPort(token)
    // it will return the actual port number this server is running on
  })
```

### async readJsonAsync(res: HttpResponse): Promise<any>
### writeJson(res: HttpResponse, json: any): void

Read the JSON from response

```ts
createApp()
  .post('/*', async (res: HttpResponse) => {
    const json = await readJsonAsync(res)
    // do your thing with your json
    writeJson(res, {OK: true})
  })
  .listen(port, token => {
    listenSocket = token
    if (!token) {
      console.log(`Start up server failed on`, port)
    }
  })
```

### async serveStatic(path: string | Array<string>): void

It's not a good idea to use the node server to serve up static file, instead your should use your actual webserver (i.e. Nginx) we will provide you with working example how to combine it, but if you really need to, here it is for you to use.

```ts
createApp()
  .get('/assets/*', serveStatic('/path/to/assets'))
  .listen(port, token => {
    console.log("running")
  })
```

All you have to do is the provide the url, and where your files are. And `serveStatic` takes care of the rest.


### UwsServer (Class)

This is an all-in-one solution to create the (UWS) server  

```ts
import { UwsServer, HttpResponse } from '@velocejs/server'

const app: UwsServer = new UwsServer()
// by default we randomly assign a port, see below for more info
app.run([
  {
    type: 'any',
    path: '/*',
    handler: (res: HttpResponse) => {
      res.end(`Hello`)
    }
  }
])
```

Next will be all available public methods

#### UwsServer.onStart(): void

By default you will get a `console.info` once the server start up. You can overwrite it by overload this method

```ts
app.onStart = () => console.info(`My own message`)
```

Please note, you have to overload this before you call `app.run`

#### UwsServer.run(handlers: UwsRouteHandler[]): void

This is the main method to create the server, apply end points (routes) and bind the server to port.

The `UwsRouteHandler` interface has this signature:

```ts
interface UwsRouteHandler {
  type: string
  path: string
  handler: any
}
```

available `type` options are `any`, `get`, `post`, `put`, `options` ,`del`, `patch`, `head`, `connect`, `trace` and `ws` (websocket)

#### UwsServer.shutdown(): void

To gracefully shutdown the server

```ts
app.shutdown()
```

#### UwsServer.getPortNum(): number

By default the server will randomly assign an unused port, you could
overwrite it by using the node environment variable `PORT` like so

Assume that you have put everything in a file call `server.js`

```sh
$ PORT=3456 node ./server.js
```

Or if you just stick with the randomly port, you can use this method
to retrieve the port number.

```ts
const port = app.getPortNum()
```

**MORE TO COME**


---

Joel Chu (c) 2022
