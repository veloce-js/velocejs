import { WebSocket } from './types'

// this is from the examples/RateLimit.js
export function rateLimit(limit: number, interval: number): (ws: WebSocket) => boolean | void {
  let now = 0;
  // we couldn't use the symbol as key here, the problem is in the Type definition
  // the ws has ws[string]: any but not Symbol they need to expand this crap

  // const last: symbol = Symbol('last')
  // const count: symbol = Symbol('count')

  setInterval(() => {
    ++now
  }, interval)

  return (ws: WebSocket): boolean | void => {
    if (ws.last != now) {
      ws.last = now
      ws.count = 1
    } else {
      return ++ws.count > limit
    }
  }
}
