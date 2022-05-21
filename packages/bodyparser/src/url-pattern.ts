// using the url-pattern lib to match against the dynamic url
import type { UwsStringPairObj } from '../index'
import UrlPatternLib from 'url-pattern'
import { isDynamicRoute } from './utils'
import { DYNAMIC_ROUTE_PATTERN } from './constants'

export class UrlPattern {
  private _libObj: UrlPatternLib
  private _originalUrl!: string
  private _transformUrl!: string
  // we need this when we encounter spread argument method handler
  public names: string[] = []

  constructor(basePatternUrl: string) {
    this._libObj = new UrlPatternLib(
      this._validate(basePatternUrl)
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
    this._getNames(url)

    return this._originalUrl
  }

  /** super simple check */
  static check(url: string): boolean {
    // now just a wrapper
    return isDynamicRoute(url)
  }

  /** parse the var from url */
  parse(url: string) {
    this._getNames(url) // get the names at the same time

    return this._libObj.match(url)
  }

  /** construct a url */
  create(params: UwsStringPairObj): string {
    return this._libObj.stringify(params)
  }

  /** this is not great solution but ... */
  private _getNames(url: string): void {
    const parts = url.split(DYNAMIC_ROUTE_PATTERN)
    parts.shift()
    this.names = parts.map((part: string) =>
      part.replace('(','').replace(')','')
    )
  }
}
