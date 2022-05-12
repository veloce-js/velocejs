import { DevApi } from './api'
import * as open from 'open'

const api = new DevApi()

api.start()
  .then((url: string) => {
    setTimeout(()=> {
      open(url)
    }, 300)
  })
