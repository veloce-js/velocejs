export declare function createDescriptor(argNames: string[], validationInput: any): any;
export declare function createValidator(argNames: string[], validationInput: any): (...args: any[]) => Promise<any[]>;
export declare const strAlias: {
    max: string;
    '<=': string;
    min: string;
    '>=': string;
};
export declare const numAlias: {
    max: string;
    '<=': string;
    min: string;
    '>=': string;
} & {
    less: string;
    '<': string;
    greater: string;
    '>': string;
};
