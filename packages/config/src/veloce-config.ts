import * as fsx from 'fs-extra'
import { join } from 'node:path'
import {
  FILE_NAME,
  SUPPORT_EXT
} from './constants'
import { VeloceConfigEntry, PromiseCallback } from './types'
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
    if (pathToConfigFile) {
      if (!fsx.existsSync(pathToConfigFile)) {
        const msg = `${pathToConfigFile} does not exist!`
        this._configReject(msg)
        // throw new Error(msg)
      } else {
        this._readContent(pathToConfigFile)
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

  private _readContent(pathToFile: string) {
    this._src = pathToFile
    import(pathToFile)
      .then((content: VeloceConfigEntry) => {
        this._content = content.default // there is a default before the config
        this._configResolve(this._content)
      })
  }

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
