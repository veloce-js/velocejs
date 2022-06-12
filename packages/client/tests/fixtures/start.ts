import { ApiWithContract } from '../../../fastapi/tests/fixtures/contract/api-with-contract-with-rules'
import fetch from 'node-fetch'

const api = new ApiWithContract()

api.$start()
  .then(url => {
    console.log(`ApiWithContract started on ${url}`)


    fetch(`${url}/veloce/contract`)
      .then(res => res.json())
      .then(contract => {

        console.dir(contract, { depth : null })

        api.$stop()
      })

  })
