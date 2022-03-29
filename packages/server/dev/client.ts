// client to do request and other things
import fetch, {
  // Blob,
  // blobFrom,
  // blobFromSync,
  // File,
  // fileFrom,
  fileFromSync,
} from 'node-fetch'
import { lookup } from 'mime-types'
// move from tests/fixtures/send-files.ts
export const sendFile = (url: string, file: string): Promise<any> => {
  // const mimetype = 'text/plain'
  const type = lookup(file) || 'application/octet-stream'
  const blob = fileFromSync(file, type)
  return fetch(url, {
    method: 'POST',
    body: blob
  })
}

export const request = async (url: string) => {
  const res = await fetch(url)

  return await res.text()
}
