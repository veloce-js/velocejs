// this is using our node-fetch-fn.ts client
import type { JsonqlContractTemplate } from './types'
import { HttpClient } from './http-client'
import nodeFetchFn from './node-fetch-fn'

/** factory method to create a new node client */
export function nodeClient(
  contract: JsonqlContractTemplate,
  host?: string
) {
  return new HttpClient(contract, nodeFetchFn, host)
}
