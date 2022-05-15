import { WebsocketServer } from './socket-server'
import open from 'open'

const server = new WebsocketServer()

server.$start()
  .then((url: string) => {
    open(url)
  })
