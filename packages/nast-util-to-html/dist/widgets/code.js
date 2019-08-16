"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_utils_1 = require("../render-utils");
function renderCode(node) {
    let content = `\
<pre>
  <code>
${render_utils_1.renderTitle(node.text, true, node.language)}
  </code>
</pre>`;
    return render_utils_1.renderBlock(node, content);
}
exports.default = renderCode;
//# sourceMappingURL=code.js.map