
import {
  tsClassParser,
  // tsFunctionParser,
} from '@jsonql/ast'
import { showDeep } from '@jsonql/utils'
import * as fs from 'fs-extra'
import { join } from 'path'
// class file

tsClassParser(join(__dirname, 'multi-api.ts'))
  .then(result => {
    showDeep(result)
    return fs.writeJson(join(__dirname, 'multi-api.json'), result, {spaces: 2})
  })

/*
tsFunctionParser(join(__dirname, 'function-style.ts'))
  .then(result => {
    showDeep(result)
    return fs.writeJson(join(__dirname, 'function-style.json'), result, {spaces: 2})
  })
*/
