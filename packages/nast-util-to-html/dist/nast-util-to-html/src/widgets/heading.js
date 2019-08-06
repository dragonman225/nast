"use strict";
const render_utils_1 = require("../render-utils");
const constants_1 = require("./constants");
function renderHeading(node) {
    let blockColorClass = node.color ? render_utils_1.renderColor(node.color) : '';
    let textHTML = render_utils_1.renderTitle(node.text, false, '');
    let content = '';
    if (node.depth < 6 && node.depth > 0) {
        content = `<h${node.depth + 1}>${textHTML}</h${node.depth + 1}>`;
    }
    else {
        content = `<h6>${textHTML}</h6>`;
    }
    let html = `\
<div class="${constants_1.blockClass} ${blockColorClass}">
  ${content}
</div>`;
    return html;
}
module.exports = renderHeading;
//# sourceMappingURL=heading.js.map