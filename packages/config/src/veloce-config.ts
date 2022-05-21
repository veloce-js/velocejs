import * as fsx from 'fs-extra'
import { join, resolve } from 'node:path'
import { accessByPath } from '@jsonql/utils'
import {
  FILE_NAME,
  SUPPORT_EXT,
  VELOCE_DEFAULTS,
} from './constants'
import {
  VeloceConfigEntry,
  PromiseCallback
} from './types'
import debugFn from 'debug'
const debug = debugFn('velocejs:config:class')
export const PATH_TO_VELOCE_CONFIG = process.env.VELOCE_CONFIG
// main
export class VeloceConfig {

  private _src!: string
  private _content?: VeloceConfigEntry

  private _isConfigReady!: Promise<VeloceConfigEntry>
  private _configResolve!: PromiseCallback
  private _configReject!: PromiseCallback

  constructor(pathToConfigFile?: string) {
    this._setupCallback()
    const cwd = process.cwd()
    let _path = pathToConfigFile || PATH_TO_VELOCE_CONFIG
    // we only throw error when dev provide a file that doesn't exist
    if (_path) {
      _path = resolve(_path)
      debug('pathToConfigFile', _path)
      if (!fsx.existsSync(_path as string)) {
        this._configReject(new Error(`${_path} does not exist!`))
      } else {
        this._readContent(_path as string)
      }
    } else {
      let found = false
      SUPPORT_EXT.forEach(ext => {
        if (!this._src) {
          const file = join(cwd, [ FILE_NAME, ext].join('.') )
          debug('search for file', file)
          if ( fsx.existsSync(file) ) {
            found = true
            this._readContent(file)
          }
        }
      })
      if (!found) {
        // Even if there is no config file we just resolve with an empty object
        // means there is no config
        this._configResolve({})
      }
    }
  }

  /** a quick way to grab some of the default to fill the gap */
  static getDefaults(key?: string) {
    return key ? VELOCE_DEFAULTS[key] : VELOCE_DEFAULTS
  }

  /** this let us to able to tell if the system is ready or not */
  public get isReady() {
    return this._isConfigReady
  }

  /** The main method to get config */
  public async getConfig(moduleName?: string) {
    if (this._content) {
      const config = this._getByPath(this._content, moduleName)
      return config ?
        Promise.resolve(config) :
        Promise.reject(`${moduleName} not found in config`)
    }
    return this._isConfigReady
            .then((config: VeloceConfigEntry) =>
              this._getByPath(config, moduleName)
            )
  }

  /** storing the content of the config file */
  private _readContent(pathToFile: string) {
    this._src = pathToFile
    import(pathToFile)
      .then((content: VeloceConfigEntry) => {
        this._content = this._prepareConfig(content.default) // there is a default before the config
        this._configResolve(this._content)
      })
  }

  /** merge default info into the dev provide one */
  private _prepareConfig(content: VeloceConfigEntry) {
    const _config = {}
    for (const key in content) {
      _config[key] = VELOCE_DEFAULTS[key] !== undefined ?
                     Object.assign({}, VELOCE_DEFAULTS[key], content[key]) :
                     content[key]
    }
    return _config
  }

  /** setup the api internal callback to know if it's ready to use  */
  private _setupCallback() {
    this._isConfigReady = new Promise((resolver, rejecter) => {
      this._configResolve = resolver
      this._configReject = rejecter
    })
  }

  /** allow using dot notation path to extract content */
  private _getByPath(content: VeloceConfigEntry, moduleName?: string) {
    if (moduleName) {
      if (moduleName.indexOf('.') > -1) {
        return accessByPath(content, moduleName as string)
      }
      return content[moduleName]
    }
    return content
  }
}
