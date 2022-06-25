"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
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
      var P, UrlPattern2, astNodeContainsSegmentsForProvidedParams, astNodeToNames, astNodeToRegexString, baseAstNodeToRegexString, concatMap, defaultOptions, escapeForRegex, getParam, keysAndValuesToObject, newParser, regexGroupCount, stringConcatMap, stringify;
      escapeForRegex = function(string) {
        return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      };
      concatMap = function(array, f) {
        var i, length, results;
        results = [];
        i = -1;
        length = array.length;
        while (++i < length) {
          results = results.concat(f(array[i]));
        }
        return results;
      };
      stringConcatMap = function(array, f) {
        var i, length, result;
        result = "";
        i = -1;
        length = array.length;
        while (++i < length) {
          result += f(array[i]);
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
      UrlPattern2 = function(arg1, arg2) {
        var groupCount, options, parsed, parser, withoutWhitespace;
        if (arg1 instanceof UrlPattern2) {
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
      UrlPattern2.prototype.match = function(url) {
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
      UrlPattern2.prototype.stringify = function(params) {
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
      UrlPattern2.escapeForRegex = escapeForRegex;
      UrlPattern2.concatMap = concatMap;
      UrlPattern2.stringConcatMap = stringConcatMap;
      UrlPattern2.regexGroupCount = regexGroupCount;
      UrlPattern2.keysAndValuesToObject = keysAndValuesToObject;
      UrlPattern2.P = P;
      UrlPattern2.newParser = newParser;
      UrlPattern2.defaultOptions = defaultOptions;
      UrlPattern2.astNodeToRegexString = astNodeToRegexString;
      UrlPattern2.astNodeToNames = astNodeToNames;
      UrlPattern2.getParam = getParam;
      UrlPattern2.astNodeContainsSegmentsForProvidedParams = astNodeContainsSegmentsForProvidedParams;
      UrlPattern2.stringify = stringify;
      return UrlPattern2;
    });
  }
});

// node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.2/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/common.js"(exports, module) {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0; i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug4(...args) {
          if (!debug4.enabled) {
            return;
          }
          const self = debug4;
          const curr = Number(new Date());
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug4.namespace = namespace;
        debug4.useColors = createDebug.useColors();
        debug4.color = createDebug.selectColor(namespace);
        debug4.extend = extend;
        debug4.destroy = createDebug.destroy;
        Object.defineProperty(debug4, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug4);
        }
        return debug4;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        let i;
        const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        const len = split.length;
        for (i = 0; i < len; i++) {
          if (!split[i]) {
            continue;
          }
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            createDebug.skips.push(new RegExp("^" + namespaces.slice(1) + "$"));
          } else {
            createDebug.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        const namespaces = [
          ...createDebug.names.map(toNamespace),
          ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        if (name[name.length - 1] === "*") {
          return true;
        }
        let i;
        let len;
        for (i = 0, len = createDebug.skips.length; i < len; i++) {
          if (createDebug.skips[i].test(name)) {
            return false;
          }
        }
        for (i = 0, len = createDebug.names.length; i < len; i++) {
          if (createDebug.names[i].test(name)) {
            return true;
          }
        }
        return false;
      }
      function toNamespace(regexp) {
        return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/browser.js"(exports, module) {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {
    });
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {
      }
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug");
      } catch (error) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  }
});

// node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js
var require_has_flag = __commonJS({
  "node_modules/.pnpm/has-flag@4.0.0/node_modules/has-flag/index.js"(exports, module) {
    "use strict";
    module.exports = (flag, argv = process.argv) => {
      const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
      const position = argv.indexOf(prefix + flag);
      const terminatorPosition = argv.indexOf("--");
      return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
  }
});

// node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js
var require_supports_color = __commonJS({
  "node_modules/.pnpm/supports-color@7.2.0/node_modules/supports-color/index.js"(exports, module) {
    "use strict";
    var os = __require("os");
    var tty = __require("tty");
    var hasFlag = require_has_flag();
    var { env } = process;
    var forceColor;
    if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
      forceColor = 0;
    } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
      forceColor = 1;
    }
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        forceColor = 1;
      } else if (env.FORCE_COLOR === "false") {
        forceColor = 0;
      } else {
        forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
      }
    }
    function translateLevel(level) {
      if (level === 0) {
        return false;
      }
      return {
        level,
        hasBasic: true,
        has256: level >= 2,
        has16m: level >= 3
      };
    }
    function supportsColor(haveStream, streamIsTTY) {
      if (forceColor === 0) {
        return 0;
      }
      if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
      if (haveStream && !streamIsTTY && forceColor === void 0) {
        return 0;
      }
      const min = forceColor || 0;
      if (env.TERM === "dumb") {
        return min;
      }
      if (process.platform === "win32") {
        const osRelease = os.release().split(".");
        if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
          return Number(osRelease[2]) >= 14931 ? 3 : 2;
        }
        return 1;
      }
      if ("CI" in env) {
        if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
          return 1;
        }
        return min;
      }
      if ("TEAMCITY_VERSION" in env) {
        return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
      }
      if (env.COLORTERM === "truecolor") {
        return 3;
      }
      if ("TERM_PROGRAM" in env) {
        const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
        switch (env.TERM_PROGRAM) {
          case "iTerm.app":
            return version >= 3 ? 3 : 2;
          case "Apple_Terminal":
            return 2;
        }
      }
      if (/-256(color)?$/i.test(env.TERM)) {
        return 2;
      }
      if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
        return 1;
      }
      if ("COLORTERM" in env) {
        return 1;
      }
      return min;
    }
    function getSupportLevel(stream) {
      const level = supportsColor(stream, stream && stream.isTTY);
      return translateLevel(level);
    }
    module.exports = {
      supportsColor: getSupportLevel,
      stdout: translateLevel(supportsColor(true, tty.isatty(1))),
      stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js
var require_node = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/node.js"(exports, module) {
    var tty = __require("tty");
    var util = __require("util");
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.destroy = util.deprecate(() => {
    }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    exports.colors = [6, 2, 3, 4, 5, 1];
    try {
      const supportsColor = require_supports_color();
      if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
        exports.colors = [
          20,
          21,
          26,
          27,
          32,
          33,
          38,
          39,
          40,
          41,
          42,
          43,
          44,
          45,
          56,
          57,
          62,
          63,
          68,
          69,
          74,
          75,
          76,
          77,
          78,
          79,
          80,
          81,
          92,
          93,
          98,
          99,
          112,
          113,
          128,
          129,
          134,
          135,
          148,
          149,
          160,
          161,
          162,
          163,
          164,
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          173,
          178,
          179,
          184,
          185,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
          207,
          208,
          209,
          214,
          215,
          220,
          221
        ];
      }
    } catch (error) {
    }
    exports.inspectOpts = Object.keys(process.env).filter((key) => {
      return /^debug_/i.test(key);
    }).reduce((obj, key) => {
      const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
        return k.toUpperCase();
      });
      let val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) {
        val = true;
      } else if (/^(no|off|false|disabled)$/i.test(val)) {
        val = false;
      } else if (val === "null") {
        val = null;
      } else {
        val = Number(val);
      }
      obj[prop] = val;
      return obj;
    }, {});
    function useColors() {
      return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
    }
    function formatArgs(args) {
      const { namespace: name, useColors: useColors2 } = this;
      if (useColors2) {
        const c = this.color;
        const colorCode = "\x1B[3" + (c < 8 ? c : "8;5;" + c);
        const prefix = `  ${colorCode};1m${name} \x1B[0m`;
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = getDate() + name + " " + args[0];
      }
    }
    function getDate() {
      if (exports.inspectOpts.hideDate) {
        return "";
      }
      return new Date().toISOString() + " ";
    }
    function log(...args) {
      return process.stderr.write(util.format(...args) + "\n");
    }
    function save(namespaces) {
      if (namespaces) {
        process.env.DEBUG = namespaces;
      } else {
        delete process.env.DEBUG;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function init(debug4) {
      debug4.inspectOpts = {};
      const keys = Object.keys(exports.inspectOpts);
      for (let i = 0; i < keys.length; i++) {
        debug4.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
    };
    formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
  }
});

// node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js
var require_src = __commonJS({
  "node_modules/.pnpm/debug@4.3.4/node_modules/debug/src/index.js"(exports, module) {
    if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
      module.exports = require_browser();
    } else {
      module.exports = require_node();
    }
  }
});

// src/constants.ts
var BOUNDARY = "boundary";
var CONTENT_TYPE = "content-type";
var IS_OTHER = "other";
var IS_FORM = "form";
var IS_MULTI = "multipart";
var IS_JSON = "json";
var IS_DYNAMIC = "dynamic";
var IS_FILE = "binary";
var GET_NAME = "get";
var DEFAULT_FORM_HEADER = "application/x-www-form-urlencoded";
var FILE_POST_HEADER = "multipart/form-data";
var DYNAMIC_ROUTE_PATTERN = "/:";
var DEFAULT_CONFIG = {
  stripUnderscoreParam: true,
  originalRouteDef: ""
};
var QUERY_PARAM = "queryParams";
var DYNAMIC_PARAM = "dynamicParams";
var DYNAMIC_NAMES = "names";
var STRIP_UNDERSCORE = "stripUnderscoreParam";
var ORG_ROUTE_REF = "_originalRouteDef";
var URL_PATTERN_OBJ = "_urlPatternObj";
var JSONQL_CONTENT_TYPE = "application/vnd.api+json";
var CHARSET = "charset=utf-8";
var CLIENT_KEY = "x-client";
var CLIENT_NAME = "velocejs";
var DEFAULT_HEADERS = {
  "Accept": JSONQL_CONTENT_TYPE,
  "Content-Type": [JSONQL_CONTENT_TYPE, CHARSET].join("; "),
  [CLIENT_KEY]: CLIENT_NAME
};

// src/utils.ts
function applyConfig(config) {
  return Object.assign(DEFAULT_CONFIG, config || {});
}
function getHeaders(req) {
  const headers = {};
  req.forEach((key, value) => {
    headers[key.toLowerCase()] = value;
  });
  return headers;
}
function toArr(value) {
  return Array.isArray(value) ? value : [value];
}
function toBuffer(data) {
  return Buffer.isBuffer(data) ? data : Buffer.from(data);
}
function takeApartName(name) {
  return name.indexOf("[") > -1 ? [name.split("[")[0], true] : [name, false];
}
var isEmptyObj = (obj) => obj && Object.keys(obj).length === 0 && obj.constructor === Object;
var isJson = (headers) => headers[CONTENT_TYPE] !== void 0 && headers[CONTENT_TYPE].indexOf(IS_JSON) > -1;
var isForm = (headers) => headers[CONTENT_TYPE] !== void 0 && headers[CONTENT_TYPE].indexOf(DEFAULT_FORM_HEADER) > -1;
var isMultipart = (headers) => headers[CONTENT_TYPE] !== void 0 && headers[CONTENT_TYPE].indexOf(FILE_POST_HEADER) > -1;
var isDynamicRoute = (route) => route.indexOf(DYNAMIC_ROUTE_PATTERN) > -1;

// src/url-pattern.ts
var import_url_pattern = __toESM(require_url_pattern());
var UrlPattern = class {
  constructor(basePatternUrl) {
    this.names = [];
    this._libObj = new import_url_pattern.default(this._validate(basePatternUrl));
  }
  get route() {
    return this._transformUrl;
  }
  get orginal() {
    return this._originalUrl;
  }
  _validate(url) {
    url = url.substring(0, 1) === "/" ? url.substring(1) : url;
    const parts = url.split("/");
    if (parts[0].indexOf(":") > -1) {
      throw new Error(`The first part of the dynamic url must be a full string!`);
    }
    this._originalUrl = "/" + url;
    this._transformUrl = "/" + parts[0] + "/*";
    this._getNames(url);
    return this._originalUrl;
  }
  static check(url) {
    return isDynamicRoute(url);
  }
  parse(url) {
    return this._libObj.match(url);
  }
  create(params) {
    return this._libObj.stringify(params);
  }
  _getNames(url) {
    const parts = url.split(DYNAMIC_ROUTE_PATTERN);
    parts.shift();
    this.names = parts.map((part) => part.replace("(", "").replace(")", ""));
  }
};

// src/parse-query.ts
var import_debug = __toESM(require_src());
var debug = (0, import_debug.default)("velocejs:bodypaser:parse-query");
function parseQuery(url, query, config) {
  const c = config;
  let params = {
    [QUERY_PARAM]: processQueryParameters(query, c[STRIP_UNDERSCORE])
  };
  if (c[URL_PATTERN_OBJ] || c[ORG_ROUTE_REF]) {
    params = Object.assign(params, processDynamicRoute(url, c));
  }
  return params;
}
function processQueryParameters(query, stripUnderscoreParam) {
  const params = new URLSearchParams(query);
  const result = {};
  for (const pair of params.entries()) {
    const key = pair[0];
    if (stripUnderscoreParam) {
      if (key.substring(0, 1) === "_") {
        continue;
      }
    }
    result[key] = pair[1];
  }
  return result;
}
function processDynamicRoute(url, config) {
  if (config[URL_PATTERN_OBJ]) {
    debug("parse url using UrlPattern");
    return processDynamicRouteByUrlPattern(url, config[URL_PATTERN_OBJ]);
  }
  debug("parse url with pattern url");
  return processDynamicRouteWithOrgRef(url, config[ORG_ROUTE_REF]);
}
function processDynamicRouteWithOrgRef(url, originalRouteDef) {
  const orgUrl = originalRouteDef;
  if (UrlPattern.check(orgUrl)) {
    const obj = new UrlPattern(orgUrl);
    return processDynamicRouteByUrlPattern(url, obj);
  }
  return {};
}
function processDynamicRouteByUrlPattern(url, urlPatternObj) {
  return {
    [DYNAMIC_PARAM]: urlPatternObj.parse(url),
    [DYNAMIC_NAMES]: urlPatternObj.names
  };
}

// src/handle-upload.ts
var import_debug2 = __toESM(require_src());
var debugFn2 = (0, import_debug2.default)("velocejs:server:body-parser:handle-upload");
function uploadHandler(res, bufferHandler, onAbortedHandler) {
  onDataHandler(res, bufferHandler);
  res.onAborted(() => {
    onAbortedHandler ? onAbortedHandler() : debugFn2("uploadHandler onAborted");
  });
}
function onDataHandler(res, bufferHandler) {
  let data;
  res.onData((chunk, isLast) => {
    const _chunk = Buffer.from(chunk);
    data = data ? Buffer.concat([data, _chunk]) : Buffer.concat([_chunk]);
    if (isLast) {
      bufferHandler(data);
    }
  });
}

// src/parse-multipart.ts
function parse(multipartBodyBuffer, boundary) {
  let lastline = "";
  let header = "";
  let info = "";
  let state = 0;
  let buffer = [];
  const allParts = [];
  for (let i = 0; i < multipartBodyBuffer.length; i++) {
    const oneByte = multipartBodyBuffer[i];
    const prevByte = i > 0 ? multipartBodyBuffer[i - 1] : null;
    const newLineDetected = oneByte === 10 && prevByte === 13 ? true : false;
    const newLineChar = oneByte === 10 || oneByte === 13 ? true : false;
    if (!newLineChar)
      lastline += String.fromCharCode(oneByte);
    if (state === 0 && newLineDetected) {
      if ("--" + boundary === lastline) {
        state = 1;
      }
      lastline = "";
    } else if (state === 1 && newLineDetected) {
      header = lastline;
      state = 2;
      if (header.indexOf("filename") === -1) {
        state = 3;
      }
      lastline = "";
    } else if (state === 2 && newLineDetected) {
      info = lastline;
      state = 3;
      lastline = "";
    } else if (state === 3 && newLineDetected) {
      state = 4;
      buffer = [];
      lastline = "";
    } else if (state === 4) {
      if (lastline.length > boundary.length + 4)
        lastline = "";
      if ("--" + boundary === lastline) {
        const j = buffer.length - lastline.length;
        const part = buffer.slice(0, j - 1);
        const p = { header, info, part };
        allParts.push(process2(p));
        buffer = [];
        lastline = "";
        state = 5;
        header = "";
        info = "";
      } else {
        buffer.push(oneByte);
      }
      if (newLineDetected)
        lastline = "";
    } else if (state === 5) {
      if (newLineDetected)
        state = 1;
    }
  }
  return allParts;
}
function getBoundary(header) {
  const items = header.split(";");
  if (items) {
    for (let i = 0; i < items.length; i++) {
      const item = new String(items[i]).trim();
      if (item.indexOf("boundary") >= 0) {
        const k = item.split("=");
        return new String(k[1]).trim().replace(/^["']|["']$/g, "");
      }
    }
  }
  return "";
}
function process2(part) {
  const obj = function(str) {
    const k = str.split("=");
    const a = k[0].trim();
    const b = JSON.parse(k[1].trim());
    const o = {};
    Object.defineProperty(o, a, {
      value: b,
      writable: true,
      enumerable: true,
      configurable: true
    });
    return o;
  };
  const header = part.header.split(";");
  const filenameData = header[2];
  let input = {};
  if (filenameData) {
    input = obj(filenameData);
    const contentType = part.info.split(":")[1].trim();
    Object.defineProperty(input, "type", {
      value: contentType,
      writable: true,
      enumerable: true,
      configurable: true
    });
  }
  Object.defineProperty(input, "name", {
    value: header[1].split("=")[1].replace(/"/g, ""),
    writable: true,
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(input, "data", {
    value: Buffer.from(part.part),
    writable: true,
    enumerable: true,
    configurable: true
  });
  return input;
}

// src/body-parser.ts
var import_debug3 = __toESM(require_src());
var debugFn3 = (0, import_debug3.default)("velocejs:body-parser:main");
function bodyParser(res, req, options) {
  return __async(this, null, function* () {
    debugFn3("bodyparser options", options);
    const url = req.getUrl();
    const query = req.getQuery();
    const method = req.getMethod();
    const headers = getHeaders(req);
    const queryParams = parseQuery(url, query, applyConfig(options == null ? void 0 : options.config));
    const params = {};
    const body = { url, method, query, headers, params, queryParams };
    body[QUERY_PARAM] = queryParams[QUERY_PARAM];
    if (queryParams[DYNAMIC_PARAM]) {
      body[DYNAMIC_NAMES] = queryParams[DYNAMIC_NAMES];
      body.params = queryParams[DYNAMIC_PARAM];
      body.type = IS_DYNAMIC;
    }
    if (method === GET_NAME) {
      if (!body.type) {
        body.type = isJson(headers) ? IS_JSON : IS_OTHER;
      }
      return Promise.resolve(body);
    }
    return new Promise((resolver) => {
      onDataHandler(res, (buffer) => {
        body.payload = buffer;
        switch (true) {
          case isJson(headers):
            body.type = IS_JSON;
            body.params = handleJsonRequestParams(buffer, params);
            break;
          case isForm(headers):
            body.type = IS_FORM;
            body.params = processQueryParameters(buffer.toString());
            break;
          case isMultipart(headers):
            body.type = IS_MULTI;
            body.params = parseMultipart(headers, buffer);
            break;
          default:
            body.type = IS_OTHER;
        }
        resolver(body);
      });
    });
  });
}
function handleJsonRequestParams(buffer, params) {
  const payload = buffer.toString();
  return payload ? JSON.parse(payload) : isEmptyObj(params) ? {} : params;
}
function parseMultipart(headers, body) {
  const boundary = getBoundary(headers[CONTENT_TYPE]);
  if (boundary) {
    const params = parse(body, boundary);
    if (Array.isArray(params) && params.length) {
      return processParams(params);
    }
  }
  return {};
}
function processFileArray(params) {
  return params.filter((param) => param.filename && param.type).map((param) => {
    const { name, type, filename, data } = param;
    const [strName, arr] = takeApartName(name);
    const content = { type, filename, data };
    const value = arr ? [content] : content;
    return { name: strName, value };
  }).reduce((a, b) => {
    switch (true) {
      case isEmptyObj(a):
        return { [b.name]: b.value };
      case a[b.name] !== void 0:
        return Object.assign(a, {
          [b.name]: toArr(a[b.name]).concat(toArr(b.value))
        });
      default:
        return Object.assign(a, { [b.name]: b.value });
    }
  }, {});
}
function processTextArray(params) {
  return params.filter((param) => !param.filename && !param.type).map((param) => ({ [param.name]: toBuffer(param.data).toString() })).reduce((a, b) => Object.assign(a, b), {});
}
function processParams(params) {
  return Object.assign(processFileArray(params), processTextArray(params));
}

// src/index.ts
var src_default = bodyParser;
export {
  BOUNDARY,
  CHARSET,
  CLIENT_KEY,
  CLIENT_NAME,
  CONTENT_TYPE,
  DEFAULT_CONFIG,
  DEFAULT_FORM_HEADER,
  DEFAULT_HEADERS,
  DYNAMIC_NAMES,
  DYNAMIC_PARAM,
  DYNAMIC_ROUTE_PATTERN,
  FILE_POST_HEADER,
  GET_NAME,
  IS_DYNAMIC,
  IS_FILE,
  IS_FORM,
  IS_JSON,
  IS_MULTI,
  IS_OTHER,
  JSONQL_CONTENT_TYPE,
  ORG_ROUTE_REF,
  QUERY_PARAM,
  STRIP_UNDERSCORE,
  URL_PATTERN_OBJ,
  UrlPattern,
  src_default as default,
  getBoundary,
  getHeaders,
  isDynamicRoute,
  parse as parseMultipart,
  uploadHandler
};
//# sourceMappingURL=esm.js.map
