import test from 'ava'
import { join } from 'node:path'
import { VeloceConfig } from '../dist'

let config1: VeloceConfig
let config2: VeloceConfig

const nonExistConfigFile = join(__dirname, 'fixtures', 'I-dont-exist.js')

test.before(async () => {
  config1 = new VeloceConfig()
  config2 = new VeloceConfig(join(__dirname, 'fixtures', 'jsonql.config.cjs'))
})


test(`Should throw error if the dev provide file doesn't exist`, async (t) => {
  t.plan(1)
  const configX = new VeloceConfig(nonExistConfigFile)

  configX.isReady.catch((e: Error) => {

    t.truthy(e)
  })

})

test(`Should able to automatically discover the config file`, async (t) => {

  const config = await config1.getConfig()
  t.truthy(config)
})

test(`Should able to read the config using a path to the content automatic`, async (t) => {

  const config = await config1.getConfig('contract')

  t.true(config.cacheDir !== undefined)
})


test(`Should able to read the custom path config file`, async (t) => {
  const config = await config2.getConfig()
  t.truthy(config)
})

test(`Should able to read the config using a path to the content custom path`, async (t) => {

  const config = await config2.getConfig('contract')

  t.true(config.cacheDir !== undefined)

  t.is(config.method, 'get', `We should also able to get the default value`)
})

test(`Should able to use dot notation path to access the content directly`, async (t) => {

  const config = await config2.getConfig('contract.cacheDir')

  // console.log(config)

  t.truthy(config)
})
