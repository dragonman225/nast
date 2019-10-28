"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Logger } = require('@dnpr/logger');
/** Default log level is "warn". */
const log = new Logger('nast-util-to-html');
function raiseWarning(..._arguments) {
    log.warn.apply(log, _arguments);
}
exports.raiseWarning = raiseWarning;
//# sourceMappingURL=log-utils.js.map