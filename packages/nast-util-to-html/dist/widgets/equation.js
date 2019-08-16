"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const katex_1 = __importDefault(require("katex"));
const render_utils_1 = require("../render-utils");
function renderEquation(node) {
    let katexOpts = {
        throwOnError: false,
        displayMode: true
    };
    let content = katex_1.default.renderToString(node.latex, katexOpts);
    return render_utils_1.renderBlock(node, content);
}
exports.default = renderEquation;
//# sourceMappingURL=equation.js.map