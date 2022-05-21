"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VELOCE_DEFAULTS = exports.STRIP_UNDERSCORE = exports.ORG_ROUTE_REF = exports.BODYPARSER_KEY = exports.SERVER_KEY = exports.CACHE_DIR = exports.CONTRACT_KEY = exports.SUPPORT_EXT = exports.FILE_NAME = exports.VELOCE_DEFAULT_URL = void 0;
exports.VELOCE_DEFAULT_URL = '/veloce';
exports.FILE_NAME = 'veloce.config';
exports.SUPPORT_EXT = ['js', 'cjs']; // can only support cjs style due to the f**king typescript
exports.CONTRACT_KEY = 'contract';
exports.CACHE_DIR = 'cacheDir';
exports.SERVER_KEY = 'server';
exports.BODYPARSER_KEY = 'bodyparser';
exports.ORG_ROUTE_REF = '_originalRouteDef';
exports.STRIP_UNDERSCORE = 'stripUnderscoreParam';
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
exports.VELOCE_DEFAULTS = {
    [exports.CONTRACT_KEY]: {
        method: 'get',
        path: `${exports.VELOCE_DEFAULT_URL}/${exports.CONTRACT_KEY}`
    },
    [exports.SERVER_KEY]: {
        port: 0
    },
    [exports.BODYPARSER_KEY]: {
        [exports.STRIP_UNDERSCORE]: true
    }
};
