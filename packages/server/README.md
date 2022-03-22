# @veloce/server

The core is using [uWebSocket.js]() with several additional helpers methods

## How to

The following example using Typescript

### createApp(opt?: AppOptions): TemplatedApp

```ts
import { createApp } from '@velocejs/server'
const port = 9001

createApp()
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
createApp()
  .post('/*', async (res: HttpResponse) => {

    const json = await readJsonAsync(res)
    // do your thing with your json


    res.writeHeader('Content-type', 'application/json')
    res.end(JSON.stringify({OK: true}))
    
  })
  .listen(port, token => {
    listenSocket = token
    if (!token) {
      console.log(`Start up server failed on`, port)
    }
  })
```



#### async serveStatic(path: string | Array<string>): void

It's not a good idea to use the node server to serve up static file, instead your should use your actual webserver (i.e. Nginx) we will provide you with working example how to combine it, but if you really need to, there here it is for you to use.


---

Joel Chu (c) 2022
