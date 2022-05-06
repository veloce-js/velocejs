// using the url-pattern lib to match against the dynamic url
import UrlPatternLib from 'url-pattern'
import { UwsStringPairObj } from '../index'

export class UrlPattern {
  private _libObj: UrlPatternLib
  private _originalUrl!: string
  private _transformUrl!: string
  // private _urls: string[] = []

  constructor(basePattern: string) {
    this._libObj = new UrlPatternLib(
      this._validate(basePattern)
    )
    // also we need to use this to create a base url
    // for example the url is like /posts/:day/:month/:year/:slug
    // then we have to create a url like /post/* for uws then parse it
  }

  get route() {
    return this._transformUrl
  }

  get orginal() {
    return this._originalUrl
  }

  private _validate(url: string) {
    url = url.substring(0,1) === '/' ? url.substring(1) : url
    // console.log(url)
    const parts = url.split('/')
    if (parts[0].indexOf(':') > -1) {
      throw new Error(`The first part of the dynamic url must be a full string!`)
    }
    this._originalUrl = '/' + url
    this._transformUrl = '/' + parts[0] + '/*'
    return this._originalUrl
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
