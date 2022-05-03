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

## Extra export from this module

The follow two exports can use in any node.js project

### parseMultipart
### getBoundary



---
