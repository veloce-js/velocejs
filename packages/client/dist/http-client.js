"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
const constants_1 = require("./constants");
const common_1 = require("./common");
const base_client_1 = require("./base-client");
// main
class HttpClient extends base_client_1.BaseClient {
    constructor(contract, _httpMethod, _host = '') {
        super(contract, _host);
        this._httpMethod = _httpMethod;
        this._host = _host;
        contract.data.forEach((entry) => {
            this._mapMethod(entry);
        });
    }
    /** The one method to handle all the method calls */
    async comm(propertyName, params) {
        return Reflect.apply(this[propertyName], this, params || []);
    }
    /** wrap all the construct class member in one */
    _mapMethod(entry) {
        const { name, type } = entry;
        if (type === constants_1.WEBSOCKET_METHOD) {
            return; // skip it
        }
        const validateFn = this._getValidatorFn(entry);
        // create the function as seen in
        // https://stackoverflow.com/questions/5905492/dynamic-function-name-in-javascript
        // its not amazing but at least we can see the name in console.log
        // @TODO how to pass the type info to the arguments
        this[name] = {
            [name]: async function (...args) {
                // console.log('pass the arguments', args, 'to call', entry)
                // set validator
                return validateFn(args)
                    .then((result) => this._executeHttpCall(entry, result));
            }
        }[name];
    }
    /** create the http calls, it was a private but keep having this method is declare but not read?
    warning - which stop the compiler but its read - see above!
    */
    _executeHttpCall(entry, args) {
        const httpOpts = {
            url: [this._host, (0, common_1.prepareUrl)(entry, args)].join('')
        };
        if (entry.type !== constants_1.DEFAULT_REQUEST_METHOD) {
            httpOpts.method = entry.type;
            httpOpts.payload = args;
        }
        console.log('httpOpts', httpOpts, args);
        // now call fetch
        return this._httpMethod(httpOpts);
    }
}
exports.HttpClient = HttpClient;
