"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_map_1 = __importDefault(require("./block-map"));
const render_utils_1 = require("./render-utils");
const log_utils_1 = require("./log-utils");
const audio_1 = __importDefault(require("./widgets/audio"));
const bookmark_1 = __importDefault(require("./widgets/bookmark"));
const callout_1 = __importDefault(require("./widgets/callout"));
const code_1 = __importDefault(require("./widgets/code"));
const collection_1 = __importDefault(require("./widgets/collection"));
const column_helper_1 = __importDefault(require("./widgets/column-helper"));
const divider_1 = __importDefault(require("./widgets/divider"));
const embed_1 = __importDefault(require("./widgets/embed"));
const equation_1 = __importDefault(require("./widgets/equation"));
const heading_1 = __importDefault(require("./widgets/heading"));
const image_1 = __importDefault(require("./widgets/image"));
const list_1 = __importDefault(require("./widgets/list"));
const quote_1 = __importDefault(require("./widgets/quote"));
const text_1 = __importDefault(require("./widgets/text"));
const to_do_1 = __importDefault(require("./widgets/to-do"));
const toggle_1 = __importDefault(require("./widgets/toggle"));
/**
 * Render with given root node.
 */
function renderRoot(node, elemClass = 'nast-document') {
    /**
     * The root node can be any type of block, if it's a "page" block it
     * will be treated specially.
     */
    if (node.type === 'page') {
        /**
         * To solve the casting error:
         * If this was intentional, convert the expression to 'unknown' first.
         * The following is what that means.
         */
        let pageNode = node;
        let title = pageNode.title;
        let icon = pageNode.icon ? pageNode.icon : '';
        let cover = pageNode.cover;
        let fullWidth = pageNode.fullWidth;
        let coverPosition = (1 - pageNode.coverPosition) * 100;
        let containerClass = fullWidth
            ? `${elemClass}-full` : `${elemClass}`;
        let coverDiv = '';
        if (pageNode.cover != null) {
            coverDiv = `\
<div class="page-cover">
  <img src="${cover}" style="object-position: center ${coverPosition}%">
</div>`;
        }
        return `\
<div class="${containerClass}">
  ${coverDiv}
  <div id="${node.id}" class="page-title">
    <span class="page-icon">${icon}</span>
    <h1>${title}</h1>
  </div>
  ${render_utils_1.renderChildren(node.children, renderNode)}
</div>`;
    }
    else {
        return `\
<div class="${elemClass}">
  ${renderNode(node)}
</div>`;
    }
}
exports.renderRoot = renderRoot;
function renderNode(node) {
    let html = '';
    switch (node.type) {
        case block_map_1.default.text:
            html = text_1.default(node, renderNode);
            break;
        case block_map_1.default.heading:
            html = heading_1.default(node);
            break;
        case block_map_1.default.columnList:
            html = column_helper_1.default(node, renderNode);
            break;
        case block_map_1.default.bulletedList:
        case block_map_1.default.numberedList:
            html = list_1.default(node, renderNode);
            break;
        case block_map_1.default.toggle:
            html = toggle_1.default(node, renderNode);
            break;
        case block_map_1.default.toDo:
            html = to_do_1.default(node, renderNode);
            break;
        case block_map_1.default.divider:
            html = divider_1.default(node);
            break;
        case block_map_1.default.quote:
            html = quote_1.default(node);
            break;
        case block_map_1.default.callout:
            html = callout_1.default(node);
            break;
        case block_map_1.default.image:
            html = image_1.default(node);
            break;
        case block_map_1.default.bookmark:
            html = bookmark_1.default(node);
            break;
        case block_map_1.default.embed:
        case block_map_1.default.video:
            html = embed_1.default(node);
            break;
        case block_map_1.default.audio:
            html = audio_1.default(node);
            break;
        case block_map_1.default.code:
            html = code_1.default(node);
            break;
        case block_map_1.default.equation:
            html = equation_1.default(node);
            break;
        case block_map_1.default.collection:
            html = collection_1.default(node);
            break;
        default:
            log_utils_1.raiseWarning(`No render function for ${node.type}. Ignored.`);
    }
    return html;
}
exports.renderNode = renderNode;
//# sourceMappingURL=render-control.js.map