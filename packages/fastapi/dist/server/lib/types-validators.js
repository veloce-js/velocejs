"use strict";
/*
check primitive type as well as custom types

• string : Must be of type string . This is the default type.
• number : Must be of type number .
• boolean : Must be of type boolean .
• method : Must be of type function .
• regexp : Must be an instance of RegExp or a string that does not generate an
exception when creating a new RegExp .
• integer : Must be of type number and an integer.
• float : Must be of type number and a ﬂoating point number.
• array : Must be an array as determined by Array.isArray .
• object : Must be of type object and not Array.isArray .
• enum : Value must exist in the enum .
• date : Value must be valid as determined by Date
• url : Must be of type url .
• hex : Must be of type hex .
• email : Must be of type email .
• any : Can be any type
*/
// this is quite useless really
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumericOnlyValidation = exports.LettersRegexpOnlyValidation = void 0;
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
