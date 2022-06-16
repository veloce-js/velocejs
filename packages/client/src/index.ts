// Here we export two base client of different connection
// they will require to actually comm layer to work
export { HttpClient } from './lib/http-client'
export { WsClient } from './lib/ws-client'
export {
  velocejsClient,
  velocejsClientAsync
} from './node-client'
