// testing the VeloceError class
import test from 'ava'
import { VeloceError } from '../src/lib/errors'


test(`VeloceError should have the same signature of the JsonqlError`, t => {
  t.plan(2)

  const fn = () => { throw new VeloceError('here', [1,1]) }

  t.throws(() => {
    try {
      fn()
    } catch (e) {
      // console.log(e)
      t.deepEqual(e.detail, [1,1])
      throw e
    }
  })
})
