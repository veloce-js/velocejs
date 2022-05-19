var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// node_modules/.pnpm/url-pattern@1.0.3/node_modules/url-pattern/lib/url-pattern.js
var require_url_pattern = __commonJS({
  "node_modules/.pnpm/url-pattern@1.0.3/node_modules/url-pattern/lib/url-pattern.js"(exports, module) {
    var slice = [].slice;
    (function(root, factory) {
      if (typeof define === "function" && define.amd != null) {
        return define([], factory);
      } else if (typeof exports !== "undefined" && exports !== null) {
        return module.exports = factory();
      } else {
        return root.UrlPattern = factory();
      }
    })(exports, function() {
      var P, UrlPattern, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
      escapeForRegex = function(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      };
      concatMap = function(array, f2) {
        var i, length, results;
        results = [];
        i = -1;
        length = array.length;
        while (++i < length) {
          results = results.concat(f2(array[i]));
        }
        return results;
      };
      stringConcatMap = function(array, f2) {
        var i, length, result;
        result = "";
        i = -1;
        length = array.length;
        while (++i < length) {
          result += f2(array[i]);
        }
        return result;
      };
      regexGroupCount = function(regex) {
        return new RegExp(regex.toString() + "|").exec("").length - 1;
      };
      keysAndValuesToObject = function(keys, values) {
        var i, key, length, object, value;
        object = {};
        i = -1;
        length = keys.length;
        while (++i < length) {
          key = keys[i];
          value = values[i];
          if (value == null) {
            continue;
          }
          if (object[key] != null) {
            if (!Array.isArray(object[key])) {
              object[key] = [object[key]];
            }
            object[key].push(value);
          } else {
            object[key] = value;
          }
        }
        return object;
      };
      P = {};
      P.Result = function(value, rest) {
        this.value = value;
        this.rest = rest;
      };
      P.Tagged = function(tag, value) {
        this.tag = tag;
        this.value = value;
      };
      P.tag = function(tag, parser) {
        return function(input) {
          var result, tagged;
          result = parser(input);
          if (result == null) {
            return;
          }
          tagged = new P.Tagged(tag, result.value);
          return new P.Result(tagged, result.rest);
        };
      };
      P.regex = function(regex) {
        return function(input) {
          var matches, result;
          matches = regex.exec(input);
          if (matches == null) {
            return;
          }
          result = matches[0];
          return new P.Result(result, input.slice(result.length));
        };
      };
      P.sequence = function() {
        var parsers;
        parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return function(input) {
          var i, length, parser, rest, result, values;
          i = -1;
          length = parsers.length;
          values = [];
          rest = input;
          while (++i < length) {
            parser = parsers[i];
            result = parser(rest);
            if (result == null) {
              return;
            }
            values.push(result.value);
            rest = result.rest;
          }
          return new P.Result(values, rest);
        };
      };
      P.pick = function() {
        var indexes, parsers;
        indexes = arguments[0], parsers = 2 <= arguments.length ? slice.call(arguments, 1) : [];
        return function(input) {
          var array, result;
          result = P.sequence.apply(P, parsers)(input);
          if (result == null) {
            return;
          }
          array = result.value;
          result.value = array[indexes];
          return result;
        };
      };
      P.string = function(string) {
        var length;
        length = string.length;
        return function(input) {
          if (input.slice(0, length) === string) {
            return new P.Result(string, input.slice(length));
          }
        };
      };
      P.lazy = function(fn) {
        var cached;
        cached = null;
        return function(input) {
          if (cached == null) {
            cached = fn();
          }
          return cached(input);
        };
      };
      P.baseMany = function(parser, end, stringResult, atLeastOneResultRequired, input) {
        var endResult, parserResult, rest, results;
        rest = input;
        results = stringResult ? "" : [];
        while (true) {
          if (end != null) {
            endResult = end(rest);
            if (endResult != null) {
              break;
            }
          }
          parserResult = parser(rest);
          if (parserResult == null) {
            break;
          }
          if (stringResult) {
            results += parserResult.value;
          } else {
            results.push(parserResult.value);
          }
          rest = parserResult.rest;
        }
        if (atLeastOneResultRequired && results.length === 0) {
          return;
        }
        return new P.Result(results, rest);
      };
      P.many1 = function(parser) {
        return function(input) {
          return P.baseMany(parser, null, false, true, input);
        };
      };
      P.concatMany1Till = function(parser, end) {
        return function(input) {
          return P.baseMany(parser, end, true, true, input);
        };
      };
      P.firstChoice = function() {
        var parsers;
        parsers = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        return function(input) {
          var i, length, parser, result;
          i = -1;
          length = parsers.length;
          while (++i < length) {
            parser = parsers[i];
            result = parser(input);
            if (result != null) {
              return result;
            }
          }
        };
      };
      newParser = function(options) {
        var U;
        U = {};
        U.wildcard = P.tag("wildcard", P.string(options.wildcardChar));
        U.optional = P.tag("optional", P.pick(1, P.string(options.optionalSegmentStartChar), P.lazy(function() {
          return U.pattern;
        }), P.string(options.optionalSegmentEndChar)));
        U.name = P.regex(new RegExp("^[" + options.segmentNameCharset + "]+"));
        U.named = P.tag("named", P.pick(1, P.string(options.segmentNameStartChar), P.lazy(function() {
          return U.name;
        })));
        U.escapedChar = P.pick(1, P.string(options.escapeChar), P.regex(/^./));
        U["static"] = P.tag("static", P.concatMany1Till(P.firstChoice(P.lazy(function() {
          return U.escapedChar;
        }), P.regex(/^./)), P.firstChoice(P.string(options.segmentNameStartChar), P.string(options.optionalSegmentStartChar), P.string(options.optionalSegmentEndChar), U.wildcard)));
        U.token = P.lazy(function() {
          return P.firstChoice(U.wildcard, U.optional, U.named, U["static"]);
        });
        U.pattern = P.many1(P.lazy(function() {
          return U.token;
        }));
        return U;
      };
      defaultOptions = {
        escapeChar: "\\",
        segmentNameStartChar: ":",
        segmentValueCharset: "a-zA-Z0-9-_~ %",
        segmentNameCharset: "a-zA-Z0-9",
        optionalSegmentStartChar: "(",
        optionalSegmentEndChar: ")",
        wildcardChar: "*"
      };
      baseAstNodeToRegexString = function(astNode, segmentValueCharset) {
        if (Array.isArray(astNode)) {
          return stringConcatMap(astNode, function(node) {
            return baseAstNodeToRegexString(node, segmentValueCharset);
          });
        }
        switch (astNode.tag) {
          case "wildcard":
            return "(.*?)";
          case "named":
            return "([" + segmentValueCharset + "]+)";
          case "static":
            return escapeForRegex(astNode.value);
          case "optional":
            return "(?:" + baseAstNodeToRegexString(astNode.value, segmentValueCharset) + ")?";
        }
      };
      astNodeToRegexString = function(astNode, segmentValueCharset) {
        if (segmentValueCharset == null) {
          segmentValueCharset = defaultOptions.segmentValueCharset;
        }
        return "^" + baseAstNodeToRegexString(astNode, segmentValueCharset) + "$";
      };
      astNodeToNames = function(astNode) {
        if (Array.isArray(astNode)) {
          return concatMap(astNode, astNodeToNames);
        }
        switch (astNode.tag) {
          case "wildcard":
            return ["_"];
          case "named":
            return [astNode.value];
          case "static":
            return [];
          case "optional":
            return astNodeToNames(astNode.value);
        }
      };
      getParam = function(params, key, nextIndexes, sideEffects) {
        var index, maxIndex, result, value;
        if (sideEffects == null) {
          sideEffects = false;
        }
        value = params[key];
        if (value == null) {
          if (sideEffects) {
            throw new Error("no values provided for key `" + key + "`");
          } else {
            return;
          }
        }
        index = nextIndexes[key] || 0;
        maxIndex = Array.isArray(value) ? value.length - 1 : 0;
        if (index > maxIndex) {
          if (sideEffects) {
            throw new Error("too few values provided for key `" + key + "`");
          } else {
            return;
          }
        }
        result = Array.isArray(value) ? value[index] : value;
        if (sideEffects) {
          nextIndexes[key] = index + 1;
        }
        return result;
      };
      astNodeContainsSegmentsForProvidedParams = function(astNode, params, nextIndexes) {
        var i, length;
        if (Array.isArray(astNode)) {
          i = -1;
          length = astNode.length;
          while (++i < length) {
            if (astNodeContainsSegmentsForProvidedParams(astNode[i], params, nextIndexes)) {
              return true;
            }
          }
          return false;
        }
        switch (astNode.tag) {
          case "wildcard":
            return getParam(params, "_", nextIndexes, false) != null;
          case "named":
            return getParam(params, astNode.value, nextIndexes, false) != null;
          case "static":
            return false;
          case "optional":
            return astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes);
        }
      };
      stringify = function(astNode, params, nextIndexes) {
        if (Array.isArray(astNode)) {
          return stringConcatMap(astNode, function(node) {
            return stringify(node, params, nextIndexes);
          });
        }
        switch (astNode.tag) {
          case "wildcard":
            return getParam(params, "_", nextIndexes, true);
          case "named":
            return getParam(params, astNode.value, nextIndexes, true);
          case "static":
            return astNode.value;
          case "optional":
            if (astNodeContainsSegmentsForProvidedParams(astNode.value, params, nextIndexes)) {
              return stringify(astNode.value, params, nextIndexes);
            } else {
              return "";
            }
        }
      };
      UrlPattern = function(arg1, arg2) {
        var groupCount, options, parsed, parser, withoutWhitespace;
        if (arg1 instanceof UrlPattern) {
          this.isRegex = arg1.isRegex;
          this.regex = arg1.regex;
          this.ast = arg1.ast;
          this.names = arg1.names;
          return;
        }
        this.isRegex = arg1 instanceof RegExp;
        if (!(typeof arg1 === "string" || this.isRegex)) {
          throw new TypeError("argument must be a regex or a string");
        }
        if (this.isRegex) {
          this.regex = arg1;
          if (arg2 != null) {
            if (!Array.isArray(arg2)) {
              throw new Error("if first argument is a regex the second argument may be an array of group names but you provided something else");
            }
            groupCount = regexGroupCount(this.regex);
            if (arg2.length !== groupCount) {
              throw new Error("regex contains " + groupCount + " groups but array of group names contains " + arg2.length);
            }
            this.names = arg2;
          }
          return;
        }
        if (arg1 === "") {
          throw new Error("argument must not be the empty string");
        }
        withoutWhitespace = arg1.replace(/\s+/g, "");
        if (withoutWhitespace !== arg1) {
          throw new Error("argument must not contain whitespace");
        }
        options = {
          escapeChar: (arg2 != null ? arg2.escapeChar : void 0) || defaultOptions.escapeChar,
          segmentNameStartChar: (arg2 != null ? arg2.segmentNameStartChar : void 0) || defaultOptions.segmentNameStartChar,
          segmentNameCharset: (arg2 != null ? arg2.segmentNameCharset : void 0) || defaultOptions.segmentNameCharset,
          segmentValueCharset: (arg2 != null ? arg2.segmentValueCharset : void 0) || defaultOptions.segmentValueCharset,
          optionalSegmentStartChar: (arg2 != null ? arg2.optionalSegmentStartChar : void 0) || defaultOptions.optionalSegmentStartChar,
          optionalSegmentEndChar: (arg2 != null ? arg2.optionalSegmentEndChar : void 0) || defaultOptions.optionalSegmentEndChar,
          wildcardChar: (arg2 != null ? arg2.wildcardChar : void 0) || defaultOptions.wildcardChar
        };
        parser = newParser(options);
        parsed = parser.pattern(arg1);
        if (parsed == null) {
          throw new Error("couldn't parse pattern");
        }
        if (parsed.rest !== "") {
          throw new Error("could only partially parse pattern");
        }
        this.ast = parsed.value;
        this.regex = new RegExp(astNodeToRegexString(this.ast, options.segmentValueCharset));
        this.names = astNodeToNames(this.ast);
      };
      UrlPattern.prototype.match = function(url) {
        var groups, match;
        match = this.regex.exec(url);
        if (match == null) {
          return null;
        }
        groups = match.slice(1);
        if (this.names) {
          return keysAndValuesToObject(this.names, groups);
        } else {
          return groups;
        }
      };
      UrlPattern.prototype.stringify = function(params) {
        if (params == null) {
          params = {};
        }
        if (this.isRegex) {
          throw new Error("can't stringify patterns generated from a regex");
        }
        if (params !== Object(params)) {
          throw new Error("argument must be an object or undefined");
        }
        return stringify(this.ast, params, {});
      };
      UrlPattern.escapeForRegex = escapeForRegex;
      UrlPattern.concatMap = concatMap;
      UrlPattern.stringConcatMap = stringConcatMap;
      UrlPattern.regexGroupCount = regexGroupCount;
      UrlPattern.keysAndValuesToObject = keysAndValuesToObject;
      UrlPattern.P = P;
      UrlPattern.newParser = newParser;
      UrlPattern.defaultOptions = defaultOptions;
      UrlPattern.astNodeToRegexString = astNodeToRegexString;
      UrlPattern.astNodeToNames = astNodeToNames;
      UrlPattern.getParam = getParam;
      UrlPattern.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
      UrlPattern.stringify = stringify;
      return UrlPattern;
    });
  }
});

// src/client.ts
var import_url_pattern = __toESM(require_url_pattern());

// node_modules/.pnpm/@jsonql+constants@0.7.2/node_modules/@jsonql/constants/index.js
var CONTENT_TYPE = "application/vnd.api+json";
var CHARSET = "charset=utf-8";
var DEFAULT_HEADER = {
  "Accept": CONTENT_TYPE,
  "Content-Type": [CONTENT_TYPE, CHARSET].join("")
};
var CONTRACT_REQUEST_METHODS = ["GET", "HEAD"];
var PEM_EXT = "pem";
var PUBLIC_KEY_NAME = "publicKey";
var PRIVATE_KEY_NAME = "privateKey";
var DEFAULT_PUBLIC_KEY_FILE = [PUBLIC_KEY_NAME, PEM_EXT].join(".");
var DEFAULT_PRIVATE_KEY_FILE = [PRIVATE_KEY_NAME, PEM_EXT].join(".");

// src/client.ts
var VeloceClient = class {
  constructor(_transportFn, options) {
    this._transportFn = _transportFn;
    this.methods = {};
    this._options = options || {
      contractUrl: "/veloce/contract"
    };
    this._isAppReady = new Promise((resolver, rejecter) => {
      this._isSetupSuccess = resolver;
      this._isSetupFail = rejecter;
      this._setup().then((methods) => {
        this._isSetupSuccess(methods);
      }).catch((e) => {
        this._isSetupFail(e);
      });
    });
  }
  client() {
    return __async(this, null, function* () {
      return this.methods || this._isAppReady;
    });
  }
  _getContract() {
    return __async(this, null, function* () {
      return this._transportFn(this._options.contractUrl, CONTRACT_REQUEST_METHODS[0]);
    });
  }
  _createMethod(route, method, params) {
    return (...args) => __async(this, null, function* () {
      let _args = this._createArgs(args, params);
      if (method !== "ws") {
        if (route.indexOf(":") > -1) {
          const urlLib = new import_url_pattern.default(route);
          route = urlLib.stringify(_args);
          _args = {};
        }
        return this._transportFn(route, method, _args);
      } else {
        console.info(`@TODO setup ws connection for`, route);
      }
      return false;
    });
  }
  _createArgs(args, params) {
    return params.map((param, i) => ({ [param.name]: args[i] })).reduce((a, b) => Object.assign(a, b), {});
  }
  _setup() {
    return __async(this, null, function* () {
      return this._getContract().then((reader) => {
        return reader.data.map((d) => ({ [d.name]: this._createMethod(d.route, d.method, d.params) })).reduce((a, b) => Object.assign(a, b), this.methods);
      });
    });
  }
};

// src/fetch.ts
function f(url, method, params, options) {
  return __async(this, null, function* () {
    const opts = {
      method,
      headers: { "Content-Type": "application/json" }
    };
    if (method === "get") {
      const query = [];
      for (const key in params) {
        query.push(`${key}=${params[key]}`);
      }
      url = url + "?" + query.join("&");
    } else {
      opts["body"] = JSON.stringify(params);
    }
    const _opt = options ? Object.assign(opts, options) : opts;
    return fetch(url, _opt).then((res) => res.json());
  });
}
var VeloceFetchClient = class extends VeloceClient {
  constructor(options) {
    super(f, options);
  }
};
export {
  VeloceFetchClient,
  f
};
