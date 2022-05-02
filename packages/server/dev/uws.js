// have to test the uws again from the bottom
const uws = require('uWebSockets.js')

uws.App()
.get('/*', (res, req) => {

  /* It does Http as well */
  res.writeStatus('200 OK').writeHeader('IsExample', 'Yes').end('Hello there!')

}).listen(9001, (listenSocket) => {

  if (listenSocket) {
    console.log('Listening to port 9001')
  }
})
