// need to test those common function in smaller unit
import test from 'ava'
import { lookupMimeType } from '../src/lib/mime'

test(`mime-types lookup should able to return the right types`, t => {
  const html = lookupMimeType('html')
  const text = lookupMimeType('txt')
  const mark = lookupMimeType('md')
  t.is(html, 'text/html')
  t.is(text, 'text/plain')
  t.is(mark, 'text/markdown')
})
