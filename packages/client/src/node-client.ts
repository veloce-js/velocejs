// this is using our node-fetch-fn.ts client
import type { JsonqlContractTemplate } from './types'
import { HttpClient } from './lib/http-client'
import nodeFetchFn from './fetch/node-fetch-fn'
import { DEFAULT_CONTRACT_PATH } from './lib/constants'
/** factory method to create a new node client */
export function velocejsClient(
  contract: JsonqlContractTemplate,
  host?: string
): HttpClient {
  return new HttpClient(contract, nodeFetchFn, host)
}

/** export another one which is async */
export async function velocejsClientAsync(
  host = ''
): Promise<HttpClient | void> {
  return nodeFetchFn({
    url: [host, DEFAULT_CONTRACT_PATH].join('')
  }).then((contract: JsonqlContractTemplate) =>
    new HttpClient(contract, nodeFetchFn, host)
  )
}
