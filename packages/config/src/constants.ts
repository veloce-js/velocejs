
export const VELOCE_DEFAULT_URL = '/veloce'
export const FILE_NAME = 'veloce.config'
export const SUPPORT_EXT = ['js', 'cjs'] // can only support cjs style due to the f**king typescript

export const PATH_TO_VELOCE_CONFIG = process.env.VELOCE_CONFIG

export const CONTRACT_KEY = 'contract'
export const CACHE_DIR = 'cacheDir'

/*
  provide some of the default values for config
  For example:

  {
    contract: {
      cacheDir: '/path/to/cache'
    }
  }

  For the app we need to know
  if it's GET or HEAD (default: GET)
  path (default: '/velocejs/contract')
  so when we found there is contract provided then we add this default info
*/

export const VELOCE_DEFAULTS = {
  contract: {
    method: 'get',
    path: `${VELOCE_DEFAULT_URL}/contract`
  }
}
