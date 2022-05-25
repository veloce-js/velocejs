/*
import { MyExample } from './my-example'
const obj = new MyExample()
*/

import { MyApi } from './my-api'
const obj = new MyApi()


obj.$start()
  .then(() => {
    console.log(`started?`, obj.$fastApiInfo)
  })
  .catch((e:Error) => {
    console.error('failed', e)
  })
