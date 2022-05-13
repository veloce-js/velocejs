// this is written is plain cjs to create a Websocket client using ws
const WebSocket = require('ws')
const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter()

// myEmitter.emit('event');
let client
const msgCount = []

myEmitter.on('init', (port) => {
  client = new WebSocket('ws://localhost:' + port)

  client.on('message', function message(data) {
    process.stdout.write(`received: ${data}`)
  })
})

myEmitter.on('receive', (msg) => {

  client.on('open', function open() {
    process.stdout.write(`open = ${msg}`)
    client.send(msg)
  })
})

// run
process.stdout.write('url to connect to: ')

process.stdin.on('readable', () => {
  let chunk
  // Use a loop to make sure we read all available data.
  while ((chunk = process.stdin.read()) !== null) {
    if (msgCount.length === 0) {
      myEmitter.emit('init', chunk)
      msgCount.push(chunk)
    } else {
      process.stdout.write(`${msgCount.length}\n`)
      msgCount.push(chunk)
      // client.on('open', function open() {
        // process.stdout.write(`open = ${msg}`)
      client.send(chunk)
    //  })
    }
  }
})
