// use the same contract to create clients
import { readJsonSync } from 'fs-extra'
import { join } from 'node:path'
import { HttpClient } from '../../src/http-client'


const contract = readJsonSync(join(__dirname, 'contract', 'public-contract.json'))

const client = new HttpClient(contract)
// just re-export it
export default client
