# @veloce/server

The core is using [uWebSocket.js]() with several additional helpers methods

## Helpers

- createApp(opt?: AppOptions): TemplatedApp
- async readJsonAsync(res: HttpResponse): Promise<any>
- async serveStatic(path: string | Array<string>): void - it's not a good idea to use the node server to serve up static file, instead your should use your actual webserver (i.e. Nginx) we will provide you with working example how to combine it, but if you really need to, there here it is for you to use.


---

Joel Chu (c) 2022
