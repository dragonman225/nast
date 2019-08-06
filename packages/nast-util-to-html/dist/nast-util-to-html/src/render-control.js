"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_map_1 = __importDefault(require("./block-map"));
const render_utils_1 = require("./render-utils");
const log_utils_1 = require("./log-utils");
const render_blocks_1 = require("./render-blocks");
const text_1 = __importDefault(require("./widgets/text"));
const heading_1 = __importDefault(require("./widgets/heading"));
const column_helper_1 = __importDefault(require("./widgets/column-helper"));
const list_1 = __importDefault(require("./widgets/list"));
const toggle_1 = __importDefault(require("./widgets/toggle"));
const to_do_1 = __importDefault(require("./widgets/to-do"));
const equation_1 = __importDefault(require("./widgets/equation"));
const collection_1 = __importDefault(require("./widgets/collection"));
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
            html = render_blocks_1.renderDivider(node);
            break;
        case block_map_1.default.quote:
            html = render_blocks_1.renderQuote(node);
            break;
        case block_map_1.default.callout:
            html = render_blocks_1.renderCallout(node);
            break;
        case block_map_1.default.image:
            html = render_blocks_1.renderImage(node);
            break;
        case block_map_1.default.bookmark:
            html = render_blocks_1.renderBookmark(node);
            break;
        case block_map_1.default.embed:
        case block_map_1.default.video:
            html = render_blocks_1.renderEmbed(node);
            break;
        case block_map_1.default.audio:
            html = render_blocks_1.renderAudio(node);
            break;
        case block_map_1.default.code:
            html = render_blocks_1.renderCode(node);
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