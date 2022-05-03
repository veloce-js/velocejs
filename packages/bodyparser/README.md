# @velocejs/bodyparser

This module is for `uWebSocket.js`

```ts
import bodyParser from '@velocejs/bodyparser'
import uws from 'uWebsocket.js'

uws.App()
  .any('/*', async (res, req) => {
    const result = await bodyParser(res, req)
    // take a look
    console.log(result)
    res.end('OK')
  })
```

This body parser is all in one solution that can deal with GET, POST
as well as file upload. As long as you use the appropriate header and
it will able to produce the result you want.  

## Example using our @velocejs/server

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

## Extra export from this module

The follow two exports can use in any node.js project

### parseMultipart
### getBoundary

First you use the `getBoundary(headers: string[])` to extract the boundary
then use the `parseMultipart(body: Buffer, boundary: string)` to parse the input.
And you will get the result in an array, file will also be in it.

---

Joel Chu (c) 2022
