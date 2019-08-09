"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_utils_1 = require("../render-utils");
function renderDivider(node) {
    let content = '\
<div style="width: 100%; border: 1px solid rgba(55, 53, 47, 0.09);"></div>';
    return render_utils_1.renderBlock(node, content);
}
exports.default = renderDivider;
//# sourceMappingURL=divider.js.map