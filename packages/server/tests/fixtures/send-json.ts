
import Fetch from 'node-fetch'

export async function sendJson(url: string, payload: object) {

  return await Fetch(url, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  })
  
}
