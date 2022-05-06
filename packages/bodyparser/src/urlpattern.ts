// using the url-pattern lib to match against the dynamic url
import UrlPatternLib from 'url-pattern'
import { UwsStringPairObj } from '../index'

export class UrlPattern {
  private _libObj: UrlPatternLib

  constructor(basePattern: string) {
    this._libObj = new UrlPatternLib(basePattern)
  }

  /** parse the var from url */
  parse(url: string) {
    return this._libObj.match(url)
  }

  /** construct a url */
  create(params: UwsStringPairObj) {
    return this._libObj.stringify(params)
  }

}
