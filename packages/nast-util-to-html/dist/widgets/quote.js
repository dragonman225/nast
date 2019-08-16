"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_utils_1 = require("../render-utils");
function renderQuote(node) {
    let content = `\
<blockquote>
  ${render_utils_1.renderTitle(node.text, false, '')}
</blockquote>`;
    return render_utils_1.renderBlock(node, content);
}
exports.default = renderQuote;
//# sourceMappingURL=quote.js.map