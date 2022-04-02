"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * Just to help get rip of that stupid TS warning
 * @param {array} args anything (mostly string)
 * @param {boolean} str turn it into a string
 * @return {any} concat buffer
 */
function bconcat(args, str) {
    const b = Buffer.concat(args);
    return str ? b.toString() : b;
}
// Reading buffer from response and return the json object
function readJsonAsync(res) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return new Promise((resolver, rejecter) => {
            let buffer;
            res.onData((ab, isLast) => {
                let chunk = Buffer.from(ab);
                if (isLast) {
                    let json;
                    if (buffer) {
                        try {
                            json = JSON.parse(bconcat([buffer, chunk], true)); // Buffer to string
                        }
                        catch (e) {
                            res.close(); // Do we need to call close here?
                            return rejecter(e);
                        }
                        return resolver(json);
                    }
                    else {
                        try {
                            json = JSON.parse(chunk.toString());
                        }
                        catch (e) {
                            res.close();
                            return rejecter(e);
                        }
                    }
                    return resolver(json);
                }
                else {
                    buffer = buffer ? bconcat([buffer, chunk]) : bconcat([chunk]);
                }
            });
            res.onAborted(rejecter);
        }); // end promise
    });
}
exports.readJsonAsync = readJsonAsync;
