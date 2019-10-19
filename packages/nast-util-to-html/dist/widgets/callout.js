"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const render_utils_1 = require("../render-utils");
function renderCallout(node) {
    let iconHTML = /^http/.test(node.icon || '')
        ? `<img src="${node.icon}" style="height: 1.5em;">` : node.icon;
    let content = `\
<div style="padding-top: 2.5px;">
  ${iconHTML}
</div>
<div style="margin-left: 8px;">
  ${render_utils_1.renderTitle(node.text, false, '')}
</div>`;
    return render_utils_1.renderBlock(node, content, constants_1.COLOR.yellowBg);
}
exports.default = renderCallout;
//# sourceMappingURL=callout.js.map