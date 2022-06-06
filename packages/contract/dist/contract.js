"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contract = void 0;
const contract_1 = require("@jsonql/contract");
// main
class Contract extends contract_1.JsonqlContractWriter {
    constructor(routeForContract, _validators) {
        super(routeForContract);
        this._validators = _validators;
    }
    /** this is use in fastapi._`prepareRouteForContract */
    static formatRoute(propertyName, args, type, path) {
        return {
            name: propertyName,
            params: args,
            method: type,
            route: path
        };
    }
    /** output the contract without write */
    generate() {
        if (this._validators) {
            const { schema, plugins } = this._validators.exportAll();
            console.dir(schema, { depth: null });
            this.appendValidations(schema, plugins);
        }
        // at this point should be the final call
        const contract = this.output();
        return contract;
    }
}
exports.Contract = Contract;
