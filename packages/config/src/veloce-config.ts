import * as fsx from 'fs-extra'
import { join } from 'node:path'
import {
  FILE_NAME,
  SUPPORT_EXT,
  VELOCE_DEFAULTS,
  PATH_TO_VELOCE_CONFIG,
} from './constants'
import {
  VeloceConfigEntry,
  PromiseCallback
} from './types'
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
    // we only throw error when dev provide a file that doesn't exist
    if (pathToConfigFile || PATH_TO_VELOCE_CONFIG) {
      const _path = pathToConfigFile || PATH_TO_VELOCE_CONFIG
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
    if (moduleName && moduleName.indexOf('.')) {
      const parts = moduleName.split('.')
      const ctn = parts.length
      let _tmp: any
      for (let i = 0; i < ctn; ++i) {
        const key = parts[i]
        if (_tmp && _tmp[key]) {
          _tmp = _tmp[key]
        } else {
          _tmp = content[key]
        }
        if (i === ctn - 1) {
          return _tmp
        }
      }
    } else {
      return moduleName ? content[moduleName] : content
    }
  }
}
