// testing the contract generator
import test from 'ava'
import Fetch from 'node-fetch'
import { removeSync } from 'fs-extra'
import { ApiWithContract } from './fixtures/contract/api-with-contract'
import { join } from 'node:path'
// override the default
process.env.VELOCE_CONFIG = join(__dirname, 'fixtures', 'veloce.config.js')

let api: ApiWithContract
let url: string
test.before(async () => {
  api = new ApiWithContract()
  await api.start()
  const info = api.fastApiInfo
  url = `http://localhost:${info.port}`
})

test.after(() => {
  console.log('afterward')
  
})


test.todo(`Testing API with config and contract`)
