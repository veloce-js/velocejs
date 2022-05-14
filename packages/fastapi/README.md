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
}

const myForm = new MyFormExample()
myForm.$start()
  .then(url => {
    console.log(`Server started on ${url}`)
  })
  .catch(err => {
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
