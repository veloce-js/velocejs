// use the same contract to create clients
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { HttpClient } from '../../src/http-client'
import nodeFetchFn from '../../src/node-fetch-fn'

const contract = readJsonSync(join(__dirname, 'contract', 'public-contract.json'))

export default function getClient(url: string) {
  return new HttpClient(contract, nodeFetchFn, url)
}
