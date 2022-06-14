import test from 'ava'

test('How to detect if input is ArrayBuffer', t => {

  const buffer = new ArrayBuffer(8)
  const view = new Int32Array(buffer)

  // console.log(view instanceof Int32Array)

  t.is(typeof view, 'object') // not very useful
  t.true(buffer instanceof ArrayBuffer) // this is useful

  t.is(buffer.byteLength, 8)

})

test('See if something is Buffer', t => {
  const buffer = Buffer.from('whatever this is')
  t.is(typeof buffer, 'object')
})

/*
test('See what test will throw error', t => {

  const testCase = [Buffer.from('string'), new ArrayBuffer(8), 'some text']
  testCase.forEach((c) => {
    if ('byteLength' in c) {
      console.log('ok')
    }
  })
  t.pass()
})
*/
