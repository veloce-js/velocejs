// specify your types here

export type GenericKeyValue = {
  [key: string]: any
}

export type AbortedSignal = {
  aborted: boolean
  reason: string,
  addEventListener: any
  removeEventListener: any
}

export type InitOptions = Partial<{
  method: string
  headers: { [key: string]: string }
  params: GenericKeyValue
  body: string
  mode: string
  credentials: 'omit' | 'same-origin' | 'inclucde'
  cache: string
  redirect: 'follow' | 'error' | 'manual'
  referrer: string
  referrerPolicy: 'no-referrer' | 'no-referrer-when-downgrade' | 'same-origin' | 'origin' | 'strict-origin' | 'origin-when-cross-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url'
  integrity: string
  keepalive: string
  signal: AbortedSignal
}>

export type FetchResponseOptions = Readonly<{
  body: ReadableStream<any> | null
  bodyUsed: boolean
  headers: GenericKeyValue // replace with Headers object later
  ok: boolean
  redirected: string
  status: number
  statusText: string
  // trailers ???
  type: 'basic' | 'cors'
  url: string
}>

export type FetchResponseMethods = {
  arrayBuffer: () => Promise<ArrayBuffer>
  blob: () => Promise<Blob>
  clone: () => FetchResponse
  error: () => FetchResponse
  formData: () => Promise<FormData>
  json: () => PromiseLike<JSON> | JSON
  redirect: () => FetchResponse
  text: () => Promise<string>
}

export type FetchResponse = FetchResponseOptions & FetchResponseMethods

export type FetchRequestOptions = Readonly<{
  body: ReadableStream
  bodyUsed: boolean
  cache: 'default' | 'reload' | 'no-cache'
  credentials: 'omit' | 'same-origin' | 'include'
  destination: string
  headers: Headers
  integrity: string
  method: string
  mode: 'cors' | 'no-cors' | 'same-origin' | 'navigate'
  priority: 'high' | 'low' | 'auto'
  redirect: 'follow' | 'error' | 'manual'
  referrer: string
  referrerPolicy: string
  url: string
}>

export type FetchRequestMethods = {
  arrayBuffer: () => Promise<ArrayBuffer>
  clone: () => FetchRequest
  formData: () => Promise<FormData>
  json: () => Promise<JSON>
  text: () => Promise<string>
}

export type FetchRequest = FetchRequestOptions & FetchRequestMethods

// we don't want to bind to particular ajax client
// you should able to use anything (default we have a Fetch wrapper)
// same principle apply you could use fly anxios whatever as long as you have
// this types defined
export type FetchMethod = (
  url: string,
  init?: InitOptions
) => Promise<FetchResponse>
