# @veloce/server

The core is using [uWebSocket.js]() with several additional helpers methods

## Helpers

- async readJsonAsync(res: HttpResponse): Promise<any>
- async applyFilters(filters: Array<T>): void - This is like adding middleware(s), but due to the fact that the core doesn't support middleware, therefore it's basically apply call(s) before it reaches your main method
- async serveStatic(path: string | Array<string>): void - it's not a good idea to use the node server to serve up static file, instead your should use your actual webserver (i.e. Nginx) we will provide you with working example how to combine it, but if you really need to, there here it is for you to use.


---

Joel Chu (c) 2022
