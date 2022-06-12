// testing the contract generator
// override the default
// process.env.VELOCE_CONFIG = join(__dirname, 'fixtures', 'veloce.config.js')
import test from 'ava'
import Fetch from 'node-fetch'
import { removeSync } from 'fs-extra'
import { join } from 'node:path'
import { VELOCE_DEFAULTS } from '@velocejs/config'
import { ApiWithContract } from './fixtures/contract/api-with-contract-with-rules'
// const veloceConfig = process.env.VELOCE_CONFI
let api: ApiWithContract
let url: string
// although this can show but the config class didn't see it
// console.log('veloceConfig', veloceConfig)
let contract
test.before(async () => {
    api = new ApiWithContract()
    url = await api.$start()
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

test(`Testing API with config and contract with Validation rules`, t => {
  const _contract = contract['data']

  // console.dir(_contract, { depth: null })

  const postEntry = _contract.filter((c: any) => c.name === 'post')[0]

  t.true(postEntry.params.filter((param: any) => param.rules).length > 0)

  const archiveEntry = _contract.filter((c: any) => c.name === 'archive')[0]

  t.false(archiveEntry.validate)
})
