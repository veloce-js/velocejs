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

test(`processFileArray should have the name field`, t => {
  const result1 = processParams(data1)
  const name = 'fileKey'
  t.truthy(result1[name].filename)
})

test(`processFileArray should able to merge files into array with same name key`, t => {
  const result2 = processParams(data2)
  // const result3 = processParams(data3)
  t.true(result2.fileData.length === 2)
})

test(`processFileArray should able to return different keys of array when encounter different array like key names`, t => {

  const result3 = processParams(data3)

  t.true(result3.file1.length === 1)
  t.true(result3.file2.length === 2)
  t.truthy(result3.input3)
})

test('Testing the GET url param', t => {
  
})

test('Testing the POST param', t => {

})

test(`Testing the json`, t => {

})
