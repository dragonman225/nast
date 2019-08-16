"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_utils_1 = require("../render-utils");
function renderAudio(node) {
    let content = `\
<audio controls>
  <source src="${node.source}">
</audio>
  `;
    return render_utils_1.renderBlock(node, content);
}
exports.default = renderAudio;
//# sourceMappingURL=audio.js.map