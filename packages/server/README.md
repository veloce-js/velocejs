# @veloce/server

The core is using [uWebSocket.js]() with several additional helpers methods

## How to

The following example using Typescript

### createServer(opt?: AppOptions): TemplatedApp
### shutdownServer(token: any)

```ts
import { createServer, shutdownServer } from '@velocejs/server'
const port = 9001
let connectedSocket

createServer()
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
import { createServer, getPort } from '@velocejs/server'
const port = 0

createServer()
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
createServer()
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

It's not a good idea to use the node server to serve up static file, instead your should use your actual webserver (i.e. Nginx) we will provide you with working example how to combine it, but if you really need to, there here it is for you to use.

```ts
createServer()
  .get('/assets/*', serveStatic('/path/to/assets'))
  .listen(port, token => {
    console.log("running")
  })
```

**MORE TO COME** 


---

Joel Chu (c) 2022
