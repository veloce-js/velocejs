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
  private _isConfigResolve!: PromiseCallback
  private _isConfigReject!: PromiseCallback

  constructor(pathToConfigFile?: string) {
    this._setupCallback()

    const cwd = process.cwd()
    if (pathToConfigFile) {
      if (!fsx.existsSync(pathToConfigFile)) {
        this._isConfigReject(true)
        throw new Error(`${pathToConfigFile} does not exist!`)
      }
      this._readContent(pathToConfigFile)
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
        // if there is no config file then we just reject it
        this._isConfigReject(`No config file`)
      }
    }
  }

  private _readContent(pathToFile: string) {
    this._src = pathToFile
    import(pathToFile)
      .then((content: VeloceConfigEntry) => {
        this._content = content.default // there is a default before the config
        this._isConfigResolve(this._content)
      })
  }

  private _setupCallback() {
    this._isConfigReady = new Promise((resolver, rejecter) => {
      this._isConfigResolve = resolver
      this._isConfigReject = rejecter
    })
  }

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
