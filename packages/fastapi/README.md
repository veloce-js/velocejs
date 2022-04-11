# Fast Api

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
  Post  
} from '@velocej/fastapi'
// Class decorator
@Rest
class MyExample extends FastApi {
  // Method decorator
  @Post('/submit')
  submitHandler(result) {
    // do your things with result
  return {OK: true}
  }
  // Accessor decorator
  @ServeStatic('/*')
  get staticPath(): string {
    return '/path/to/where/your/static/files'
  }
}

const myForm = new MyFormExample()
myForm.start()
  .then(url => {
    console.log(`Server started on ${url}`)
  })
  .catch(err => {
    console.error(`Server could not start`, err)
  })
```

## Documentation

**Coming soon**

## TODO

- Validation
- AST to extract type info
- Contract generator
- Client
- Protected route 

---

Joel Chu (c) 2022
