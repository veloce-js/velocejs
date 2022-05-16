import WebSocketClient from 'ws'
import { arrayBufferToString } from '@velocejs/fastapi'
const args = process.argv.slice(2)

// pass the url on the start up
const url = args[0]
const client = new WebSocketClient(url)

client.on('open', () => {
  console.log(`Connected to `, url)
  client.send('Hello from node client')
})

client.on('message', (msg: ArrayBuffer) => {
  console.log('msg from server', arrayBufferToString(msg))
})
