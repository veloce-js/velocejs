// testing the contract generator
// override the default
process.env.VELOCE_CONFIG = join(__dirname, 'fixtures', 'veloce.config.js')

import test from 'ava'
import Fetch from 'node-fetch'
import { removeSync } from 'fs-extra'
import { join } from 'node:path'
import { VELOCE_DEFAULTS } from '@velocejs/config'
import { ApiWithContract } from './fixtures/contract/api-with-contract'


const veloceConfig = process.env.VELOCE_CONFIG

let api: ApiWithContract
let url: string
test.before(async () => {
  if (veloceConfig) {
    api = new ApiWithContract()
    await api.start()
    const info = api.fastApiInfo
    url = `http://localhost:${info.port}`
  }
})

test.after(() => {
  if (veloceConfig) {
    api.stop()
    const base = join(__dirname, 'fixtures', 'contract', 'tmp')
    const list = ['contract.json', 'public-contract.json']
    list.forEach((contract: string) => {
        removeSync(join(base, contract))
    })
  }
})

test(`Testing API with config and contract`, async  t => {
  t.plan(1)
  if (veloceConfig) {
    const res = await Fetch(`${url}${VELOCE_DEFAULTS.contract.path}`)
    const json = await res.json()
    // console.dir(json, { depth: null })
    t.truthy(json)

  } else {
    t.pass()
  }
})
