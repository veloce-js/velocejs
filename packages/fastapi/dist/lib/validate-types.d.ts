export declare type StringValidateRules = {
    maxLength?: number;
    minLength?: number;
    pattern?: string;
};
export declare type StringValidateRulesAlias = {
    max?: number;
    min?: number;
};
export declare type JsonValidateStringRule = StringValidateRules & StringValidateRulesAlias;
export declare type NumericValidateRules = {
    multipleOf?: number;
    maximum?: number;
    exclusiveMaxmimum?: number;
    minimum?: number;
    exclusiveMinimum?: number;
};
export declare type NumericValidateRulesAlias = {
    less?: number;
    greater?: number;
};
export declare type JsonValidateNumericRule = StringValidateRulesAlias & NumericValidateRules & NumericValidateRulesAlias;
export declare type JsonValidateArrayRule = {
    items?: Array<any>;
    additionalItems?: Array<any>;
    maxItems?: number;
    minItems?: number;
    uniqueItems?: boolean;
    contains?: any;
};
export declare type ObjectValidateRules = {
    maxProperties?: number;
    minProperties?: number;
    required?: boolean;
    properties?: any;
    patternProperties?: string;
    additonalPropties?: any;
    dependencies?: any;
    propertyNames?: string | symbol;
};
export declare type ObjectValidateRulesAlias = {
    maxProps?: number;
    minProps?: number;
    props?: any;
    patternProps?: string;
    addProps?: any;
    deps?: any;
};
export declare type JsonValidateObjectRule = ObjectValidateRules & ObjectValidateRulesAlias;
export declare type JsonValidationEntry = {
    index?: number;
    name?: string;
    type?: string;
    required?: boolean;
    rules?: Array<JsonValidateStringRule | JsonValidateNumericRule | JsonValidateArrayRule | JsonValidateObjectRule>;
};
export declare type ValidationObjectRule = {
    [argName: string]: {
        required?: boolean;
        rules: Array<ValidationObjectRuleEntry>;
        [propName: string]: any;
    };
};
export declare type ValidationObjectObjectRule = {
    [argName: string]: any;
};
export declare type ValidationObjectArrayRule = {
    [argName: string]: any[];
};
export declare type ValidationObjectRuleEntry = {
    required?: boolean;
    type?: string;
    message?: string;
    server?: boolean;
    [key: string]: any;
};
export declare type ValidationObjectSimpleRule = {
    message?: string;
    required?: boolean;
    server?: boolean;
    [key: string]: any;
};
/**  this will check if the validator rules is correct or not @deprecated */
export declare const checkTypeOfRules: (rules: unknown) => string;
export declare type JsonValidationOption = {
    status?: number;
};
export interface TypeValidator<T> {
    isAcceptable(s: T): boolean;
}
export declare class LettersRegexpOnlyValidation implements TypeValidator<string> {
    isAcceptable(s: string): boolean;
}
export declare class NumericOnlyValidation implements TypeValidator<number> {
    isAcceptable(s: unknown): boolean;
}
