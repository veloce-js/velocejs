// need to test those common function in smaller unit
import test from 'ava'
import { lookup } from '../src/lib/mime'

test(`mime-types lookup should able to return the right types`, t => {
  const html = lookup('html')
  const text = lookup('txt')
  const mark = lookup('md')
  t.is(html, 'text/html')
  t.is(text, 'text/plain')
  t.is(mark, 'text/markdown')
})
