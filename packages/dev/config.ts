// testing the VeloceConfig here without the veloce.config.js

import { VeloceConfig } from '@velocejs/config'

const config = new VeloceConfig()

config.isReady
.then(_config => {
  console.info('config', _config)

  config.getConfig('contract')
    .then(result => {
      console.log('result', result)
    })
    .catch(noResult => {
      console.log('noResult', noResult)
    })


})
.catch(e => {
  console.info('e', e)
})
