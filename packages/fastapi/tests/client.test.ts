// Testing the client
import test from 'ava'

/*
test.before(() => {

})

test.after(() => {

})
*/

test(`Test await with Reflect.apply`, async t => {
  const fn = async (args: string): Promise<string> => 'some result: ' + args

  const result = await Reflect.apply(fn, null, ['me'])

  console.log(result)

  t.truthy(result)
})


test.todo(`Testing the client`)
