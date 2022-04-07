// testing the bodyParser
import test from 'ava'
import { parse } from '../src/parse-multipart-data'
// import { parse } from 'parse-multipart-data'
import { processParams } from '../src/base/body-parser'
// single file
import {
  body as body1,
  boundary as boundary1
} from './fixtures/upload1'
// file array
import {
  body as body2,
  boundary as boundary2
} from './fixtures/upload2'

import {
  data1, data2, data3
} from './fixtures/test-data'

test(`It should able to return the file name within the parse result`, t => {
  const result = parse(body1, boundary1)
  t.is(result.length, 3)
})

test(`It should able to parse the array of files`, t => {
  const result = parse(body2, boundary2)
  t.true(Array.isArray(result))
  t.truthy(result[0].name)
})

test.only(`Unit test the processFileArray method`, t => {
  const result1 = processParams(data1)
  const result2 = processParams(data2)
  const result3 = processParams(data3)

  console.log(result2)
  // console.log(result3)

  t.truthy(result1.fileKey.filename)

})
