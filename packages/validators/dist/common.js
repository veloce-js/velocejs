"use strict";
/**
  when we take the plugin defintion file with the main method
  sometime it could be
  main(value) {}
  which is unusable out of it's context therefore we need to transform it
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformMainFn = void 0;
function transformMainFn(fnStr) {
    // very dummy way
    const target = 'main(';
    if (fnStr.indexOf(target) > -1) {
        return fnStr.replace(target, 'function(');
    }
    return fnStr;
}
exports.transformMainFn = transformMainFn;
