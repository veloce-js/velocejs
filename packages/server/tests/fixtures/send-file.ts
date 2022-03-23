// wrap the whole thing together here
/*
import fetch, {
  // Blob,
  // blobFrom,
  // blobFromSync,
  // File,
  // fileFrom,
  fileFromSync,
} from 'node-fetch'


export const sendFile = (url: string, file: string, mimetype: string): Promise<any> => {
  // const mimetype = 'text/plain'
  const blob = fileFromSync(file, mimetype)
  // const url = 'https://httpbin.org/post'
  return fetch(url, { method: 'POST', body: blob })
}

const response = await
const data = await response.json()
*/


import fetch, { FormData, File, fileFrom } from 'node-fetch'

export const sendFile = (url: string, file: string, mimetype: string): Promise<any> => {

  const formData = new FormData()

  const abc = new File([binary], 'abc.txt'), { type: 'text/plain' })
  formData.set('file-upload', abc, 'new name.txt')
  return fetch(httpbin, { method: 'POST', body: formData })
}
