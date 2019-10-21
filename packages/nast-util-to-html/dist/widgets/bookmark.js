"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_utils_1 = require("../render-utils");
function renderBookmark(node) {
    let titleHTML = node.title ? `<h5>${node.title}</h5>` : '';
    let descHTML = node.description ? `<p>${node.description}</p>` : '';
    let linkHTML = `<p>${node.link}</p>`;
    let content = `\
<a href="${node.link}">
  ${titleHTML}
  ${descHTML}
  ${linkHTML}
</a>`;
    return render_utils_1.renderBlock(node, content);
}
exports.default = renderBookmark;
//# sourceMappingURL=bookmark.js.map