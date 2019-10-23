"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render_utils_1 = require("../render-utils");
function renderEmbed(node) {
    let width = node.fullWidth ? '100%' : `${node.width}px`;
    let source = node.source;
    let aspectRatio = node.aspectRatio * 100;
    let iframeSandbox = 'allow-scripts allow-popups allow-forms allow-same-origin';
    let iframeStyle = 'position: absolute; left: 0px; top: 0px; width: 100%;\
 height: 100%; border: none; border-radius: 1px; pointer-events: auto;\
 background-color: rgb(247, 246, 245);';
    let content = `\
<div style="width: ${width};">
  <div style="position: relative; min-height: 100px; height: 0; padding-bottom: ${aspectRatio}%;">
    <iframe src="${source}" sandbox="${iframeSandbox}" allowfullscreen style="${iframeStyle}"></iframe>
  </div>
</div>`;
    return render_utils_1.renderBlock(node, content);
}
exports.default = renderEmbed;
//# sourceMappingURL=embed.js.map