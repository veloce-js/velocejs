# @veloce/server

The core is using [uWebSocket.js]() with several additional helpers methods

## How to

The following example using Typescript

### createServer(opt?: AppOptions): TemplatedApp

```ts
import { createServer } from '@velocejs/server'
const port = 9001

createServer()
  .get('/*', (res: HttpResponse) => {
    res.end('Hello')
  })
  .listen(port, token => {
    if (token) {
      console.log(`Server is running ${port}`)
    }
  })
```
If you pass the following object, then it will create a `SSLApp`

```js
{
  key_file_name: 'path/to/key.pem',
  cert_file_name: 'path/to/cert.pem',
  passphrase: 'your_pass_phrase'
}
```

### async readJsonAsync(res: HttpResponse): Promise<any>

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

### writeJson(res: HttpResponse, jsonObj: any): void

Super simple return json

```ts
writeJson(res, {OK: true}) // <-- as seen in the above example 
```

### async serveStatic(path: string | Array<string>): void

It's not a good idea to use the node server to serve up static file, instead your should use your actual webserver (i.e. Nginx) we will provide you with working example how to combine it, but if you really need to, there here it is for you to use.


---

Joel Chu (c) 2022
