// all the status related code here
// ----------------------- HTTP RESPONSE STATUS ------------------ //
// FROM: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
// successful
export const C100 = '100 Continue'
export const C101 = '101 Switching Protocols'
export const C102 = '102 Processing'
export const C103 = '103 Early Hints'
export const C200 = '200 OK'
export const C201 = '201 Created'
export const C203 = '203 Non-Authoritative Information'
export const C204 = '204 No Content'
export const C205 = '205 Reset Content'
export const C206 = '206 Partial Content'
export const C207 = '207 Multi-Status'
export const C208 = '208 Already Reported'
export const C226 = '226 IM Used'
// redirect message
export const C300 = '300 Multiple Choice'
export const C301 = '301 Moved Permanently'
export const C302 = '302 Found'
export const C303 = '303 See Other'
export const C304 = '304 Not Modified'
export const C307 = '307 Temporary Redirect'
export const C308 = '308 Permanent Redirect'
// client error
export const C400 = '400 Bad Request'
export const C401 = '401 Unauthorized'
export const C402 = '402 Payment Required'
export const C403 = '403 Forbidden'
export const C404 = '404 Not Found'
export const C405 = '405 Method Not Allowed'
export const C406 = '406 Not Acceptable'
export const C407 = '407 Proxy Authentication Required'
export const C408 = '408 Request Timeout'
export const C409 = '409 Conflict'
export const C410 = '410 Gone'
export const C411 = '411 Length Required'
export const C412 = '412 Precondition Failed'
export const C413 = '413 Payload Too Large'
export const C414 = '414 URI Too Long'
export const C415 = '415 Unsupported Media Type'
export const C416 = '416 Range Not Satisfiable'
export const C417 = '417 Expectation Failed'
export const C418 = '418 I\'m a teapot'
export const C421 = '421 Misdirected Request'
export const C422 = '422 Unprocessable Entity'
export const C423 = '423 Locked'
export const C424 = '424 Failed Dependency'
export const C425 = '425 Too Early'
export const C426 = '426 Upgrade Required'
export const C428 = '428 Precondition Required'
export const C429 = '429 Too Many Requests'
export const C431 = '431 Request Header Fields Too Large'
export const C451 = '451 Unavailable For Legal Reasons'
// server error
export const C500 = '500 Internal Server Error'
export const C501 = '501 Not Implemented'
export const C502 = '502 Bad Gateway'
export const C503 = '503 Service Unavailable'
export const C504 = '504 Gateway Timeout'
export const C505 = '505 HTTP Version Not Supported'
export const C506 = '506 Variant Also Negotiates'
export const C507 = '507 Insufficient Storage'
export const C508 = '508 Loop Detected'
export const C510 = '510 Not Extended'
export const C511 = '511 Network Authentication Required'

export const STATUS_MAP = {
  C100 ,
  C101 ,
  C102 ,
  C103 ,
  C200 ,
  C201 ,
  C203 ,
  C204 ,
  C205 ,
  C206 ,
  C207 ,
  C208 ,
  C226 ,
  // redirect message
  C300 ,
  C301 ,
  C302 ,
  C303 ,
  C304 ,
  C307 ,
  C308 ,
  // client error
  C400 ,
  C401 ,
  C402 ,
  C403 ,
  C404 ,
  C405 ,
  C406 ,
  C407 ,
  C408 ,
  C409 ,
  C410 ,
  C411 ,
  C412 ,
  C413 ,
  C414 ,
  C415 ,
  C416 ,
  C417 ,
  C418 ,
  C421 ,
  C422 ,
  C423 ,
  C424 ,
  C425 ,
  C426 ,
  C428 ,
  C429 ,
  C431 ,
  C451 ,
  // server error
  C500 ,
  C501 ,
  C502 ,
  C503 ,
  C504 ,
  C505 ,
  C506 ,
  C507 ,
  C508 ,
  C510 ,
  C511 ,
}

// look up the code by the number
export function lookupStatus(status: number): string {
  const key = `C${status}`

  return STATUS_MAP[key]
}
