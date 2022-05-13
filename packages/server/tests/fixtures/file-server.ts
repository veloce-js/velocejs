// test server to serve up files
// @TODO
import * as fs from 'node:fs'
import { HttpResponse, HttpRequest, us_socket } from '../../src/types'
import { createApp } from '../../src/create-app'
import { pipeStreamOverResponse, getFileSize } from '../../src/lib/files'
const port = 0

createApp()
  .get('/*', (res: HttpResponse, req: HttpRequest) => {
    

    // @TODO get the file path
    const fileName = ''

    const totalSize = getFileSize(fileName)

    // @TODO search for the files
    const readStream = fs.createReadStream(fileName)
    pipeStreamOverResponse(res, readStream, totalSize)
  })
  .listen(port, (token: us_socket) => {
    if (token) {

    }
  })
