"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlPattern = void 0;
const tslib_1 = require("tslib");
const url_pattern_1 = tslib_1.__importDefault(require("url-pattern"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
class UrlPattern {
    constructor(basePatternUrl) {
        // we need this when we encounter spread argument method handler
        this.names = [];
        this._libObj = new url_pattern_1.default(this._validate(basePatternUrl));
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
        this._getNames(url);
        return this._originalUrl;
    }
    /** super simple check */
    static check(url) {
        // now just a wrapper
        return (0, utils_1.isDynamicRoute)(url);
    }
    /** parse the var from url */
    parse(url) {
        return this._libObj.match(url);
    }
    /** construct a url */
    create(params) {
        return this._libObj.stringify(params);
    }
    /** this is not great solution but ... */
    _getNames(url) {
        const parts = url.split(constants_1.DYNAMIC_ROUTE_PATTERN);
        parts.shift();
        this.names = parts.map((part) => part.replace('(', '').replace(')', ''));
    }
}
exports.UrlPattern = UrlPattern;
