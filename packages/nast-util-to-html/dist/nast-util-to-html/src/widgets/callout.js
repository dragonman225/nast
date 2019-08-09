"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const color_map_1 = __importDefault(require("../color-map"));
const render_utils_1 = require("../render-utils");
function renderCallout(node) {
    let content = `\
<div>
  ${node.icon ? node.icon : ''}
</div>
<div style="margin-left: 8px;">
  ${render_utils_1.renderTitle(node.text, false, '')}
</div>`;
    return render_utils_1.renderBlock(node, content, color_map_1.default.yellowBg);
}
exports.default = renderCallout;
//# sourceMappingURL=callout.js.map