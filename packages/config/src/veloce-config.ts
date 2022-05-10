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
          console.log(file)
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
        this._content = content
        this._isConfigResolve(content)
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
      const config = moduleName ? this._content[moduleName] : this._content
      return config ?
        Promise.resolve(config) :
        Promise.reject(`${moduleName} not found in config`)
    }
    return this._isConfigReady
            .then((config: VeloceConfigEntry) =>
              moduleName ? config[moduleName] : config
            )
  }
}
