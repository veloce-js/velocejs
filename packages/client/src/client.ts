// browser client with default fetch fn
import type { JsonqlContractTemplate } from './types'
import { HttpClient } from './lib/http-client'
import nodeFetchFn from './fetch/browser-fetch-fn'

/** factory method to create a new node client */
export function velocejsClient(
  contract: JsonqlContractTemplate,
  host?: string
) {
  return new HttpClient(contract, nodeFetchFn, host)
}
