// using node-fetch
// as experiement interface keep the same as the fetch api for compatibility
import fetch from 'node-fetch'



// main
export default function main(url: string, options?: any) {
  const opts = {
    headers: { 'Content-Type': 'application/json' }, // @TODO change to jsonql next
  }
}
