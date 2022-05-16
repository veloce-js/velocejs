import { DevApi } from './api'
import open from 'open'

const api = new DevApi()

api.$start()
  .then((url: string) => {
    setTimeout(()=> {
      console.log(`Running on ${url}`)
      open(url)
    }, 300)
  })
