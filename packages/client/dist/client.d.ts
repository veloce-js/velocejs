/** the velocejs client to connect to the backend */
import { TransportAsyncFunc, GenericKeyValue } from './types';
export declare class VeloceClient {
    protected _transportFn: TransportAsyncFunc;
    private _options;
    methods: {};
    constructor(_transportFn: TransportAsyncFunc, options?: GenericKeyValue);
    /** The first fetch method */
    private _getContract;
    /** this will create the actual call method */
    private _createMethod;
    /** put the value in the params */
    private _createArgs;
    /** building the client with contract */
    build(): Promise<any>;
}
