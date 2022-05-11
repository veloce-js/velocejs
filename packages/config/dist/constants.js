"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VELOCE_DEFAULTS = exports.SERVER_KEY = exports.CACHE_DIR = exports.CONTRACT_KEY = exports.PATH_TO_VELOCE_CONFIG = exports.SUPPORT_EXT = exports.FILE_NAME = exports.VELOCE_DEFAULT_URL = void 0;
exports.VELOCE_DEFAULT_URL = '/veloce';
exports.FILE_NAME = 'veloce.config';
exports.SUPPORT_EXT = ['js', 'cjs']; // can only support cjs style due to the f**king typescript
exports.PATH_TO_VELOCE_CONFIG = process.env.VELOCE_CONFIG;
exports.CONTRACT_KEY = 'contract';
exports.CACHE_DIR = 'cacheDir';
exports.SERVER_KEY = 'server';
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
        path: `${exports.VELOCE_DEFAULT_URL}/contract`
    },
    [exports.SERVER_KEY]: {
        port: 0
    }
};
