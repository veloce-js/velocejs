// specify your types here

export type GenericKeyValue = {
  [key: string]: any
  headers?: {[key: string]: string} // this should be a must
}

// we don't want to bind to particular ajax client
// you should able to use anything (default we have a Fetch wrapper)
// same principle apply you could use fly anxios whatever as long as you have
// this types defined
export type TransportAsyncFunc = (
  url: string,
  type: string,
  params?: GenericKeyValue,
  options?: GenericKeyValue
) => Promise<any>
