// file array
// export function DemoData(): { body: Buffer; boundary: string } {
let body1 = 'trash1\r\n'
  body1 += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n'
  body1 +=
    'Content-Disposition: form-data; name="uploads[]"; filename="A.txt"\r\n'
  body1 += 'Content-Type: text/plain\r\n'
  body1 += '\r\n'
  body1 += '@11X'
  body1 += '111Y\r\n'
  body1 += '111Z\rCCCC\nCCCC\r\nCCCCC@\r\n\r\n'
  body1 += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n'
  body1 +=
    'Content-Disposition: form-data; name="uploads[]"; filename="B.txt"\r\n'
  body1 += 'Content-Type: text/plain\r\n'
  body1 += '\r\n'
  body1 += '@22X'
  body1 += '222Y\r\n'
  body1 += '222Z\r222W\n2220\r\n666@\r\n'
  body1 += '------WebKitFormBoundaryvef1fLxmoUdYZWXp\r\n'
  body1 += 'Content-Disposition: form-data; name="input1"\r\n'
  body1 += '\r\n'
  body1 += 'value1\r\n'
  body1 += '------WebKitFormBoundaryvef1fLxmoUdYZWXp--\r\n'


  export const body = Buffer.from(body1)
  export const boundary = '----WebKitFormBoundaryvef1fLxmoUdYZWXp'
