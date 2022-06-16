
import Fetch from 'node-fetch'

export async function sendJson(
  url: string,
  payload: object,
  header = false
) {

  return await Fetch(url, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {'Content-Type': 'application/json'}
  })
  .then(async (res) => {
    const json = await res.json()
    return header ? { headers: res.headers.raw(), json } : json
  })
}
