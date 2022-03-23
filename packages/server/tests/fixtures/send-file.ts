// wrap the whole thing together here

import fetch, {
  // Blob,
  // blobFrom,
  // blobFromSync,
  // File,
  // fileFrom,
  fileFromSync,
} from 'node-fetch'
import { lookup } from 'mime-types'

export const sendFile = (url: string, file: string): Promise<any> => {
  // const mimetype = 'text/plain'
  const type = lookup(file) || 'application/octet-stream'
  const blob = fileFromSync(file, type)
  return fetch(url, {
    method: 'POST',
    body: blob
  })
}
/*
const response = await
const data = await response.json()
*/
