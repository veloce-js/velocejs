// testing the process.env
import test from 'ava'
import { join } from 'node:path'
// this is useless - it doesn't work
process.env.VELOCE_CONFIG = join(__dirname, 'fixtures', 'jsonql.config.cjs')

import { VeloceConfig, PATH_TO_VELOCE_CONFIG } from '../src'

let config1: VeloceConfig

test.before(async () => {
  config1 = new VeloceConfig()
})

test(`Should able to find the config file via process.env.VELOCE_CONFIG`, async (t) => {

  const config = await config1.getConfig()

  t.false(!!PATH_TO_VELOCE_CONFIG)

  t.truthy(config)
})
