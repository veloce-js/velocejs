import * as fsx from 'fs-extra'
import { join } from 'node:path'
import { FILE_NAME, SUPPRT_EXT } from './constants'


export class VeloceConfig {

  private _dir!: string
  private _content?: {[key: string]: any}

  private _isConfigReady: any
  private _isConfigResolve: any
  private _isConfigReject: any

  constructor(pathToConfigFile?: string) {
    this._setupCallback()

    const cwd = process.cwd()
    if (pathToConfigFile) {
      if (!fsx.existsSync(pathToConfigFile)) {
        this._isConfigReject(true)
        throw new Error(`${pathToConfigFile} does not exist!`)
      }
      import(pathToConfigFile)
        .then(content => {
          this._content = content
          this._isConfigReady(content)
        })
    } else {
      this._dir = pathToConfig ? join(cwd, pathToConfig) : cwd
      const file = SUPPORT_EXT.filter(ext => {

      })
    }
  }

  private _setupCallback() {
    this._isConfigReady = new Promise((resolver, rejecter) => {
      this._isConfigResolve = resolver
      this._isConfigReject = rejecter
    })
  }

  public async getConfig() {
    return this._isConfigReady
  }

}
