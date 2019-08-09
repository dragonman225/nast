"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const render_utils_1 = require("../render-utils");
function renderText(node, renderNext) {
    let blockColorClass = node.color ? render_utils_1.renderColor(node.color) : '';
    let content = `\
<div class="${constants_1.CSS.blockClass} ${constants_1.CSS.blockClass}--${constants_1.NAST_BLOCK_TYPES.text} ${blockColorClass}">
  ${render_utils_1.renderTitle(node.text, false, '')}
</div>`;
    let childrenContent = '';
    if (node.children.length > 0) {
        childrenContent = `\
<div class="${constants_1.CSS.blockIndentClass}">
  ${render_utils_1.renderChildren(node.children, renderNext)}
</div>`;
    }
    return content + childrenContent;
}
exports.default = renderText;
//# sourceMappingURL=text.js.map