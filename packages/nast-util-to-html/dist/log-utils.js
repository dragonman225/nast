"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function raiseWarning(..._arguments) {
    let args = Array.from(_arguments);
    args.unshift('(nast-util-to-html) Warning:');
    console.log.apply(console, args);
}
exports.raiseWarning = raiseWarning;
//# sourceMappingURL=log-utils.js.map