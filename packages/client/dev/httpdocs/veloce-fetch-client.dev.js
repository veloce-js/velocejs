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
    return (...args) => {
      if (method !== "ws") {
        this._transportFn(route, method, this._createArgs(args, params));
      } else {
        console.info(`@TODO setup ws connection for`, route);
      }
    };
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
