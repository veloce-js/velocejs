import { VeloceClient } from './client';
import { GenericKeyValue } from './types';
/** Fetch Wrapper */
export declare function f(url: string, method: string, params?: GenericKeyValue, options?: GenericKeyValue): Promise<any>;
/** Supply our fetch client here */
export declare class VeloceFetchClient extends VeloceClient {
    constructor(options?: GenericKeyValue);
}
