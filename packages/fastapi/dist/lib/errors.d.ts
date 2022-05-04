import { JsonqlError } from '@jsonql/errors';
export declare class VeloceError extends JsonqlError {
    constructor(message?: string, details?: any);
}
export declare class VeloceValidationError extends JsonqlError {
    constructor(message?: string, details?: any);
}
