import { JsonqlContractTemplate, JsonqlContractEntry, ValidateFn } from './types';
import { ValidatorsClient } from '@jsonql/validators/dist/validators-client';
export declare class BaseClient {
    protected _host: string;
    protected _validators: ValidatorsClient;
    constructor(contract: JsonqlContractTemplate, _host?: string);
    /** init the validators instance */
    protected _prepareValidators(contract: JsonqlContractTemplate): ValidatorsClient;
    /**
    create the validator, now there will be a new field validate to indicate if
    this api actually need to validation
     */
    protected _getValidatorFn(entry: JsonqlContractEntry): ValidateFn;
}
