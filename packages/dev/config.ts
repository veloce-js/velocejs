// testing the VeloceConfig here without the veloce.config.js

import { VeloceConfig } from '@velocejs/config'

const config = new VeloceConfig()

config.isReady
.then(config => {
  console.info('config', config)
})
.catch(e => {
  console.info('e', e)
})
