import { WebsocketServer } from './socket-server'
import * as open from 'open'

const server = new WebsocketServer()

server.$start()
  .then((url: string) => {
    open(url)
  })
