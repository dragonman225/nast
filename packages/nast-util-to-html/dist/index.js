"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const to_html_1 = require("./to-html");
exports.toHTML = to_html_1.toHTML;
const renderUtils = __importStar(require("./render-utils"));
let toHTMLInternal = renderUtils;
exports.toHTMLInternal = toHTMLInternal;
//# sourceMappingURL=index.js.map