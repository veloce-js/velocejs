import test from 'ava'
import { writeJsonSync } from 'fs-extra'
import { join } from 'node:path'

import jsonStr from './fixtures/contract/public-contract'


const jsonOut = join(__dirname, 'fixtures', 'contract', 'public-contract.json')


test(`dummy test to generate the correct contract file`, t => {

  // const file = readFileSync(jsonStr)

  const jsonFile = JSON.stringify(jsonStr)

  writeJsonSync(jsonOut, JSON.parse(jsonFile))

  t.truthy(jsonStr)
})
