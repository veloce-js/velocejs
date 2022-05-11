// testing the contract generator
// override the default
process.env.VELOCE_CONFIG = join(__dirname, 'fixtures', 'veloce.config.js')

import test from 'ava'
import Fetch from 'node-fetch'
import { removeSync } from 'fs-extra'

import { VELOCE_DEFAULTS } from '@velocejs/config'

import { ApiWithContract } from './fixtures/contract/api-with-contract'
import { join } from 'node:path'

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


test(`Testing API with config and contract`, async  t => {

  const res = await Fetch(`${url}${VELOCE_DEFAULTS.contract.path}`)

  const json = await res.json()

  console.dir(json, { depth: null })

  t.truthy(json)
})
