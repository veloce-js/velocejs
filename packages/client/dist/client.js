"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VeloceClient = void 0;
const tslib_1 = require("tslib");
// this could be problematic if the use the config to change the url
const constants_1 = require("@velocejs/config/dist/constants");
const reader_1 = require("@jsonql/contract/dist/reader");
const constants_2 = require("@jsonql/constants");
class VeloceClient {
    // assign the transport method on init
    constructor(_transportFn, options) {
        this._transportFn = _transportFn;
        // hold all the generate methods
        this.methods = {};
        this._options = options || {
            host: '/',
            contractUrl: `${constants_1.VELOCE_DEFAULT_URL}/${constants_1.CONTRACT_KEY}`
        };
    }
    /** The first fetch method */
    _getContract() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._transportFn(this._options.host + this._options.contractUrl, constants_2.CONTRACT_REQUEST_METHODS[0])
                .then(json => (new reader_1.JsonqlContractReader(json)));
        });
    }
    /** this will create the actual call method */
    _createMethod(route, method, params) {
        // @TODO use the new Function method to generate with name params?
        return (...args) => {
            this._transportFn(route, method, this._createArgs(args, params));
        };
    }
    /** put the value in the params */
    _createArgs(args, params) {
        return params.map((param, i) => ({ [param.name]: args[i] })).reduce((a, b) => Object.assign(a, b), {});
    }
    /** building the client with contract */
    build() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return this._getContract()
                .then((reader) => {
                const data = reader.data();
                return data.map((d) => ({ [d.name]: this._createMethod(d.route, d.method, d.params) }))
                    .reduce((a, b) => Object.assign(a, b), this.methods);
            });
        });
    }
}
exports.VeloceClient = VeloceClient;
