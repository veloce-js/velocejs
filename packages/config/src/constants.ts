export const VELOCE_DEFAULT_URL = '/veloce'
export const FILE_NAME = 'veloce.config'
export const SUPPORT_EXT = ['js', 'cjs'] // can only support cjs style due to the f**king typescript
export const CONTRACT_KEY = 'contract'
export const CACHE_DIR = 'cacheDir'
export const SERVER_KEY = 'server'
export const BODYPARSER_KEY = 'bodyparser'
export const ORG_ROUTE_REF = '_originalRouteDef'
export const STRIP_UNDERSCORE = 'stripUnderscoreParam'
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
  [CONTRACT_KEY]: {
    method: 'get',
    path: `${VELOCE_DEFAULT_URL}/${CONTRACT_KEY}`
  },
  [SERVER_KEY]: {
    port: 0
  },
  [BODYPARSER_KEY]: {
    [STRIP_UNDERSCORE]: true
  }
}
