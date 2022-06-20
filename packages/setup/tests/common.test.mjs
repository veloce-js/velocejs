import test from 'ava'
import { spaceInValue } from '../src/common.mjs'

test('It should be false', t => {
  t.false(spaceInValue('no_space_in_here'))
})
