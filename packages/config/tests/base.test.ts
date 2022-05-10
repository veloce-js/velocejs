import test from 'ava'
import { join } from 'node:path'
import { VeloceConfig } from '../src'

let config1: VeloceConfig
let config2: VeloceConfig

test.before(async () => {
  config1 = new VeloceConfig()
  config2 = new VeloceConfig(join(__dirname, 'fixtures', 'jsonql.config.mjs'))
})

test.skip(`Should able to automatically discover the config file`, async (t) => {

  const config = await config1.getConfig()

  console.log(config)

  t.truthy(config)
})

test(`Should able to read the custom path config file`, async (t) => {
  const config = await config2.getConfig()

  console.log(config)

  t.truthy(config)
})
