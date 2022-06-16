// this one won't bundle the contract instead it call the server to fetch one
import type { JsonqlContractTemplate } from './types'
import { HttpClient } from './lib/http-client'
import nodeFetchFn from './fetch/browser-fetch-fn'

/** factory method to create a new node client */
export async function velocejsClientAsync(
  host = '/'
) {
  return nodeFetchFn({
    url: [host, 'veloce/contract'].join('')
  }).then(
    (contract: JsonqlContractTemplate) =>
      new HttpClient(contract, nodeFetchFn, host)
  )
}
