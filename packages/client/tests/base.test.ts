import test from 'ava'
import { writeJsonSync } from 'fs-extra'
import { join } from 'node:path'

import jsonStr from './fixtures/contract/public-contract'


const jsonOut = join(__dirname, 'fixtures', 'contract', 'public-contract.json')


test(`You need to write some test`, t => {

  // const file = readFileSync(jsonStr)


  const jsonFile = JSON.stringify(jsonStr)

  // writeJsonSync(jsonOut, JSON.parse(jsonFile))

  t.truthy(jsonStr)
})
