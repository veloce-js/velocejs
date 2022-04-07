// testing the bodyParser
import test from 'ava'
import { parse } from '../src/parse-multipart-data'
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

test(`It should able to return the file name within the parse result`, t => {

  const result = parse(body1, boundary1)

  console.log(result)

  t.pass()
})

test.todo(`It should able to parse the array of files`)
