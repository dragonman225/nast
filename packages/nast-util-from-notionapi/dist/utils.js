"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Logger } = require('@dnpr/logger');
const log = new Logger('nast-util-from-notionapi');
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