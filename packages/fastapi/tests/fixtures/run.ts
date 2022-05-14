
import { MyExample } from './my-example'

const obj = new MyExample()


obj.$start()
  .then(() => {
    console.log(`started?`, obj.$fastApiInfo)
  })
  .catch((e:Error) => {
    console.error('failed', e)
  })
