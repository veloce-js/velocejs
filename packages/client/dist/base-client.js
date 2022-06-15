"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const object_1 = require("@jsonql/utils/dist/object");
const validators_client_1 = require("@jsonql/validators/dist/validators-client");
const validators_1 = require("@jsonql/validators");
// main
class BaseClient {
    constructor(contract, _host = '/') {
        this._host = _host;
        this._validators = this._prepareValidators(contract);
    }
    /** init the validators instance */
    _prepareValidators(contract) {
        return new validators_client_1.ValidatorsClient((0, object_1.arrToObj)(contract.data, (data) => ({
            [data.name]: data.params
        })));
    }
    /**
    create the validator, now there will be a new field validate to indicate if
    this api actually need to validation
     */
    _getValidatorFn(entry) {
        const validator = this._validators.getValidator(entry.name);
        if (entry.params && entry.validate === true) {
            const rules = (0, object_1.arrToObj)(entry.params, (params) => (params.rules ? { [params.name]: params.rules } : {}));
            validator.addValidationRules(rules);
            const fn = 'validate';
            return { [fn]: async (args) => Reflect.apply(validator.validate, validator, [args, validators_1.RETURN_AS_OBJ]) }[fn];
        }
        else if (entry.validate === false) {
            const fn = 'notValidate';
            return { [fn]: async (args) => Reflect.apply(validator.prepareArgValues, validator, [args]) }[fn];
        }
        // everything else
        const fn = 'dummy';
        return { [fn]: async () => [] }[fn];
    }
}
exports.BaseClient = BaseClient;
