import type { UwsStringPairObj, JsonqlRouteForContract } from './types';
import { Validators } from '@velocejs/validators/dist/validators-server';
import { JsonqlContractWriter } from '@jsonql/contract';
export declare class Contract extends JsonqlContractWriter {
    private _validators?;
    constructor(routeForContract: JsonqlRouteForContract, _validators?: Validators | undefined);
    /** this is use in fastapi._`prepareRouteForContract */
    static formatRoute(propertyName: string, args: UwsStringPairObj[], type: string, path: string): {
        name: string;
        params: UwsStringPairObj[];
        method: string;
        route: string;
    };
    /** output the contract without write */
    generate(): import("@jsonql/contract/dist/types").JsonqlContractTemplate;
}
