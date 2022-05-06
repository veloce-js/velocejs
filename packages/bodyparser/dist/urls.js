"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlPattern = void 0;
const tslib_1 = require("tslib");
// using the url-pattern lib to match against the dynamic url
const url_pattern_1 = tslib_1.__importDefault(require("url-pattern"));
class UrlPattern {
    // private _urls: string[] = []
    constructor(basePattern) {
        this._libObj = new url_pattern_1.default(this._validate(basePattern));
        // also we need to use this to create a base url
        // for example the url is like /posts/:day/:month/:year/:slug
        // then we have to create a url like /post/* for uws then parse it
    }
    get route() {
        return this._transformUrl;
    }
    get orginal() {
        return this._originalUrl;
    }
    _validate(url) {
        url = url.substring(0, 1) === '/' ? url.substring(1) : url;
        // console.log(url)
        const parts = url.split('/');
        if (parts[0].indexOf(':') > -1) {
            throw new Error(`The first part of the dynamic url must be a full string!`);
        }
        this._originalUrl = '/' + url;
        this._transformUrl = '/' + parts[0] + '/*';
        return this._originalUrl;
    }
    /** parse the var from url */
    parse(url) {
        return this._libObj.match(url);
    }
    /** construct a url */
    create(params) {
        return this._libObj.stringify(params);
    }
}
exports.UrlPattern = UrlPattern;
