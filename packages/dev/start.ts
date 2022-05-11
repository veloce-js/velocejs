import { ApiWithContract } from './api-with-contract'


const api = new ApiWithContract()

api.start()
  .then(() => {

    console.log(api.fastApiInfo)
  })
