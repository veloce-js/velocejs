# @velocejs/fastapi

This is built on top of our [@velocejs/server]() package that let you build
your API in no time.

## Installation

```sh
$ npm i @velocejs/fastapi
```

## Example

```ts
import {
  FastApi,
  ServeStatic,
  Websocket,
  Rest,
  Get,
  Post,
  Validate
} from '@velocej/fastapi'
import fsx from 'fs-extra'
// Class decorator
@Rest
class MyExample extends FastApi {

  @Get('/markdown')
  public markdown() {
    // path to a markdown file
    const content = fsx.readFileSync('/path/to/markdown.md')
    this.$text('markdown', content)
  }

  // support dynamic route
  @Get('/posts/:year/:month/:day(:/slug)')
  public posts(year: string, month: string, day: string, slug?: string) {

    this.$json({
      date: [year, month, day].join('-')
    })
  }


  // Method decorator
  @Post('/submit')
  @Validate({ // validate provide by @jsonql/validator
    email: { plugin: 'email'}
  })
  submitHandler(id: number, name: string, address: string, email: string) {
    // do your things with result
    this.$json({OK: true})
  }

  // Allow you to serve up a folder of static file automatic discover the index.html
  @ServeStatic('/*')
  get staticPath(): string {
    return '/path/to/where/your/static/files'
  }

  // Websocket support
  @Websocket('/realtime/*')
  get getSocketHandlers: any {
    // @NOTE we require this to be a getter
    return {
      open: function(ws: WebSocket) {
        ws.send('Hello!')
        ws.subscribe('/channel/good-stuff/#') // also support pub sub (coming soon)
      },
      messsage: function(ws: WebSocket, message: ArrayBuffer) {
        ws.send('Got your call')
      }
    }
  }
}

const myForm = new MyFormExample()
myForm.$start()
  .then((url: string) => {
    console.log(`Server started on ${url}`)
  })
  .catch((err: Error) => {
    console.error(`Server could not start`, err)
  })
```

And you can gracefully stop the server (very useful for testing)

```ts
myForm.$stop()
```

All the public callable method prefix with `$` to avoid name collision.


## Documentation

**Coming soon**

## TODO

- ~~Validation~~
- ~~AST to extract type info~~
- ~~Contract generator~~
- Client
- Protected route

---

Joel Chu (c) 2022
