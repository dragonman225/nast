"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const render_utils_1 = require("../render-utils");
const constants_1 = require("./constants");
const block_map_1 = __importDefault(require("../block-map"));
function renderText(node, renderNext) {
    let blockColorClass = node.color ? render_utils_1.renderColor(node.color) : '';
    let content = `\
<div class="${constants_1.blockClass} ${constants_1.blockClass}--${block_map_1.default.text} ${blockColorClass}">
  ${render_utils_1.renderTitle(node.text, false, '')}
</div>`;
    let childrenContent = '';
    if (node.children.length > 0) {
        childrenContent = `\
<div class="${constants_1.blockIndentClass}">
  ${render_utils_1.renderChildren(node.children, renderNext)}
</div>`;
    }
    return content + childrenContent;
}
module.exports = renderText;
//# sourceMappingURL=text.js.map