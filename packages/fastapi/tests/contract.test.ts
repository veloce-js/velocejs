// testing the contract generator
// override the default
// process.env.VELOCE_CONFIG = join(__dirname, 'fixtures', 'veloce.config.js')

import test from 'ava'
import Fetch from 'node-fetch'
import { removeSync } from 'fs-extra'
import { join } from 'node:path'
import { VELOCE_DEFAULTS } from '@velocejs/config'
import { ApiWithContract } from './fixtures/contract/api-with-contract'

// const veloceConfig = process.env.VELOCE_CONFIG

let api: ApiWithContract
let url: string
// although this can show but the config class didn't see it
// console.log('veloceConfig', veloceConfig)
let contract
test.before(async () => {
    api = new ApiWithContract()
    await api.$start()
    const info = api.$fastApiInfo
    url = `http://localhost:${info.port}`
    // we need to grab the contract first
    const contractUrl = `${url}${VELOCE_DEFAULTS.contract.path}`
    // console.log('contract url', contractUrl)
    // t.pass()
    const res = await Fetch(contractUrl)
    contract = await res.json()
})

test.after(() => {
  api.$stop()
  removeSync(join(__dirname, 'fixtures', 'contract', 'tmp'))
})

test(`Testing API with config and contract`, t => {
  // console.dir(json, { depth: null })
  // should have a ws route here
  t.true(!!contract['data'].filter((data: any) => data.method === 'ws').length)
})

test.only(`Testing the dynamic route with spread parameter`, async t => {
  t.plan(1)
  
  const res = await Fetch(`${url}/archive/2022/5/16`)
  const txt = await res.text()

  t.is('2022-5-16', txt)
})
