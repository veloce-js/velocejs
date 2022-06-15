import { JsonqlContractTemplate, JsonqlContractEntry, GenericKeyValue, HttpMethod, Whatever } from './types';
import { BaseClient } from './base-client';
export declare class HttpClient extends BaseClient {
    protected _httpMethod: HttpMethod;
    protected _host: string;
    constructor(contract: JsonqlContractTemplate, _httpMethod: HttpMethod, _host?: string);
    /** The one method to handle all the method calls */
    comm(propertyName: string, params?: Whatever[]): Promise<any>;
    /** wrap all the construct class member in one */
    private _mapMethod;
    /** create the http calls, it was a private but keep having this method is declare but not read?
    warning - which stop the compiler but its read - see above!
    */
    protected _executeHttpCall(entry: JsonqlContractEntry, args: GenericKeyValue): Promise<JSON>;
}
