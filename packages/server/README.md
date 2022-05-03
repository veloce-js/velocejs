# @velocejs/server

The package is built on top of [uWebSocket.js](https://github:uNetworking/uWebSockets.js).

## Installation

```sh
$ npm i @velocejs/server
```

## How to

All the examples using Typscript. We will start from the
lower level code.

### createApp(opt?: AppOptions): TemplatedApp AND shutdownServer(token: any)

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
If you pass the following configuration object, then it will create a `SSLApp`

```js
{
  key_file_name: 'path/to/key.pem',
  cert_file_name: 'path/to/cert.pem',
  passphrase: 'your_pass_phrase'
}
```

You can also specify a host when you call the `listen` method

```ts
createApp()
  // ... add route handerls
  .listen('0.0.0.0', 3456, token => {
    // the rest of your code
  })
```

#### Automatically determine port number

You can let the server to decided which port number to use (very handy when you need to run multiple instance per CPU).
All you have to do is to set the startup port to 0.

```ts
import { createApp, getPort } from '@velocejs/server'
const port = 0 // <-- here

createApp()
  .any('/*', (res: HttpResponse) => {
    res.end('Hello')
  })
  .listen(port, token => {
    const thisPortNumber = getPort(token)
    // it will return the actual port number this server is running on
  })
```

### async readJsonAsync(res: HttpResponse): Promise&lt;any&gt; and writeJson(res: HttpResponse, json: any): void

Extract the JSON from the request using `readJsonAsync` and serve up your JSON using `writeJsonAsync` (It creates all the appropriate headers for you)

```ts
// store the token for use later  
let listenSocket: us_listen_socket = null
// create app
createApp()
  .post('/*', async (res: HttpResponse) => {
    const json: object = await readJsonAsync(res)
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

### async serveStatic(path: string | Array&lt;string&gt;): void

Serve up your static assets or your actual rendered HTML page etc.

```ts
const app = createApp()
  .get('/assets/*', serveStatic('/path/to/assets'))
  .listen(port, token => {
    console.log("running")
  })
```

All you have to do is the provide the `url`, and where your files are (you can pass array of directories),
and `serveStatic` takes care of the rest.

### async bodyParser(res: HttpResponse, req: HttpRequest, onAborted?: () => void): Promise&lt;UwsRespondBody&gt;

**bodyParser is now a standalone project [@velocejs/bodyparser](https://www.npmjs.com/package/@velocejs/bodyparser)**

This will help you to parse the request input, and put into easier to use format.

```ts
import bodyParser from '@velocejs/bodyparser'

const app = createApp()
  .get('/*', async (res: HttpResponse, req: HttpRequest) => {
    const result: UwsRespondBody = await bodyParser(
      res,
      req,
      /* optional onAbortedHandler */ () => console.log(`something wrong`)
    )
    // do your thing with the result  
  })
  .listen(port, token => {
    console.log("running")
  })
```

The `result` is a `UwsRespondBody` type object with this signature:

```ts
type UwsRespondBody = {
 url: string
 method: string
 query: string,
 headers: UwsStringPairObj
 params: any
 payload?: Buffer
}
```

Here are the detail:

- `url` - the full url got called
- `method` - how it was called (i.e. GET, POST etc)
- `query` - the full query string (i.e. ?a=1&b=2)
- `headers` - all the headers from this request
- `params` - if the call is a GET, then you will get result parsed from the query (i.e. {a: 1, b: 2}) if its a POST then you get all the field in one object; if you POST a json then the result json will be in this params
- `payload` - this is the raw buffer received

### Body Parser further explain

It doesn't just process your POST form or GET url parameters. It also handles files upload at the same time.

For example, you have a form with `multipart/form-data` header (default for HTML file form)
with the the follow name / value pair

```
  name: John Doe
  email: john@doe.com
  file[]: avatar.jpg
  file[]: avatar-alternative.png
```

This example form setup has two text fields, and multiple files upload field.
Once it got to the server and processed by `bodyParser`:

```ts
// server setup etc
  .post('/setup-user', async (res: HttpResponse, req: HttpRequest): void => {
    const result = await bodyParser(res, req, () => console.error(`Server aborted!`))
    // now inside your params you will get the following data
    // THIS IS FAKE CODE!!!! DON'T COPY AND PASTED!!!! //
    result.params = {
      name: 'John Doe',
      email: 'john@doe.com',
      file: [
        {
          type: 'image/jpeg',
          filename: 'avatar.jpg',
          data: <Buffer>
        },
        {
          type: 'image/png',
          filename: 'avatar-alternative.png',
          data: <Buffer>
        },
      ]

    }
    res.end('OK')
  })
```

Now you can take that input and do what you want with it. Please note, we don't store that uploaded file anywhere
so you have to deal with it yourself.

## Higher level wrapper

This section will explain how to use the higher level code to construct your server

### (Class) UwsServer

This is an all-in-one solution to create the (UWS) server  

```ts
import { UwsServer } from '@velocejs/server'

const app: UwsServer = new UwsServer()
// by default we randomly assign a port, see below for more info
app.run([
  {
    type: 'any',
    path: '/*',
    handler: (res: HttpResponse) => {
      res.onAborted(() => {
        console.log(`server aborted`)
      })
      res.end(`Hello`)
    }
  }
])
```

Please note the `res.onAborted` if you don't provide one, and when something wrong happen with the server, the server will simply crash. If you provide one, then even the handler throw error, the server will keep on running.

---

Next will be all available public methods

#### UwsServer.onStart(): void

By default there is no output, if you pass `DEBUG=velocejs:server:uws-server-class` in your startup script
then you will able to see a start-up message.

Or you can overwrite it by using `onStart` setter:

```ts
app.onStart = () => console.info(`My own message`)
```

Please note, you have to overload this before you call `app.run`

#### UwsServer.run(handlers: UwsRouteSetup[]): void

This is the main method to create the server, apply end points (routes) and bind the server to port.

The `UwsRouteSetup` interface has this signature:

```ts
interface UwsRouteSetup {
  type: string
  path: string
  handler: any
}
```

available `type` options are `any`, `get`, `post`, `put`, `options` ,`del`, `patch`, `head`, `connect`, `trace`.

#### UwsServer.shutdown(): void

To gracefully shutdown the server

```ts
app.shutdown()
```

#### getPortNum(): number AND set portNum(port: number)

By default the server will randomly assign an unused port, you could
overwrite it by:

1. `portNum` setter
2. using the node environment variable `PORT` (this will have higher priority)

Assume that you have put everything in a file call `server.js`

```sh
$ PORT=3456 node ./server.js
```

Or if you just **stick with the randomly port**, you can use this method to retrieve the port number.

```ts
const port = app.getPortNum()
```

#### hostName setter and getter

You can also specify a host name, default is `localhost`.
There are two ways to overwrite this:

1. `hostName` setter
2. using the node environment variable `HOST` (this will have higher priority)

Assume that you have put everything in a file call `server-with-hostname.js`

```sh
$ HOST=0.0.0.0 node ./server-with-hostname.js
```

---

## (Class) FastApi

This project has moved to it's npm. Coming soon.

---

Joel Chu (c) 2022
