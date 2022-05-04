"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericOnlyValidation = exports.LettersRegexpOnlyValidation = exports.checkTypeOfRules = void 0;
const constants_1 = require("./constants");
/**  this will check if the validator rules is correct or not @deprecated */
const checkTypeOfRules = (rules) => {
    if (Array.isArray(rules)) {
        if (rules.length) {
            return Array.isArray(rules[0]) ? constants_1.RULE_LIST : constants_1.RULE_SIMPLE;
        }
    }
    if (typeof rules === 'object' && !Array.isArray(rules)) {
        for (const name in rules) {
            const rule = rules[name];
            // when { argName: {rules: [] || {}}}
            if (Object.prototype.hasOwnProperty.call(rule, 'rules')) {
                return constants_1.RULE_FULL;
            }
            // when { argName: [{max: 30}, {min: 10}]}
            if (Array.isArray(rule)) {
                for (const r in rule) {
                    if (typeof r === 'object') {
                        return constants_1.RULE_FULL;
                    }
                }
            }
            // when { argName: {max: 30} }
            if (typeof rule === 'object') {
                return constants_1.RULE_FULL;
            }
        }
    }
    console.log('rules', rules);
    throw new Error(`Unknown validation rule structure!`);
};
exports.checkTypeOfRules = checkTypeOfRules;
// this is quite useless really
const lettersRegexp = /^[A-Za-z]+$/;
const numberRegexp = /^[0-9]+$/;
class LettersRegexpOnlyValidation {
    isAcceptable(s) {
        return lettersRegexp.test(s);
    }
}
exports.LettersRegexpOnlyValidation = LettersRegexpOnlyValidation;
class NumericOnlyValidation {
    isAcceptable(s) {
        return numberRegexp.test(s);
    }
}
exports.NumericOnlyValidation = NumericOnlyValidation;
// example from https://dev-tips.com/typescript/ensuring-reliable-typings-using-typescripts-type-guards#:~:text=To%20allow%20such%20type%20detection%2Fvalidation%2C%20TypeScript%20uses%20type,a%20certain%20type%20for%20a%20certain%20scope.%20typeof
/*
type Post = {
  id: number;
  title: string;
  text: string;
};

const isValidPost = (input: unknown): input is Post => {
  return (
    typeof input === 'object' &&
    input !== null &&
    Object.prototype.hasOwnProperty.call(input, 'id') &&
    Object.prototype.hasOwnProperty.call(input, 'title') &&
    Object.prototype.hasOwnProperty.call(input, 'text')
  );
};
*/
