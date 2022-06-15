// use the same contract to create clients
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { nodeClient } from '../../src/node-client'
const contract = readJsonSync(join(__dirname, 'contract', 'public-contract.json'))
//main
export default function getClient(url: string) {
  return nodeClient(contract, url)
}
