"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_map_1 = __importDefault(require("../block-map"));
const log_utils_1 = require("../log-utils");
const render_utils_1 = require("../render-utils");
function renderColumnList(node, renderNext) {
    let numOfColumns = node.children.length;
    let columnArrHTML = node.children.map((column, i) => {
        return renderColumn(column, renderNext, i === 0, numOfColumns);
    });
    let html = `\
<div class="${block_map_1.default.columnList}" style="display: flex; flex-wrap: wrap;">
  ${columnArrHTML.join('')}
</div>`;
    return html;
}
function renderColumn(node, renderNext, isFirst, numOfColumns) {
    if (node.type !== block_map_1.default.column) {
        log_utils_1.raiseWarning(`Non-column node in column_list. Block ID: ${node.id}`);
        return '';
    }
    let columnSpacing = 46;
    let margin = isFirst ? '' : `margin-left: ${columnSpacing}px;`;
    let columnRatio = node.ratio;
    let width = `width: calc((100% - ${columnSpacing * (numOfColumns - 1)}px) * ${columnRatio});`;
    let html = `\
<div class="${block_map_1.default.column}" style="${margin} ${width} word-break: break-word;">
  ${render_utils_1.renderChildren(node.children, renderNext)}
</div>`;
    /** Experiment: Simpler way, but not working well with nested ColumnList */
    //   let html = `\
    // <div class="${blockMap.column}" style="flex-grow: ${columnRatio};">
    //   ${renderChildren(node.children, renderNext)}
    // </div>
    //   `
    return html;
}
exports.default = renderColumnList;
//# sourceMappingURL=column-helper.js.map