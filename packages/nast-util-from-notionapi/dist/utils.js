"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Wrapper of console.log().
 */
function log(..._arguments) {
    const args = Array.from(_arguments);
    args.unshift('(nast-util-from-notionapi)');
    console.log.apply(null, args);
}
exports.log = log;
/**
 * Failsafe JSON.parse() wrapper.
 * @param str - Payload to parse.
 * @returns Parsed object when success, undefined when fail.
 */
function parseJSON(str) {
    try {
        return JSON.parse(str);
    }
    catch (error) {
        return undefined;
    }
}
exports.parseJSON = parseJSON;
//# sourceMappingURL=utils.js.map