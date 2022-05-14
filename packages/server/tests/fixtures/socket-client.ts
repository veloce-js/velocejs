import WebSocket from 'ws'
import { arrayBufferToString } from '../../src/lib/files'
import { port, run } from './pubsub-server'

run()


const client = new WebSocket('ws://localhost:' + port)

client.on('message', function message(msg: Buffer) {

  const m = arrayBufferToString(msg)
  console.log(m)
  client.send(m + ' reply')
  if (m === '20 round') {
    client.close()
  }

})
