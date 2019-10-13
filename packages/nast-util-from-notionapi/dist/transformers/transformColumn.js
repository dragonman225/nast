"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformColumn(node) {
    const nastNode = {
        id: node.id,
        type: 'column',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        ratio: node.format
            ? node.format.column_ratio
                ? node.format.column_ratio
                : 1
            : 1
    };
    return nastNode;
}
exports.default = transformColumn;
//# sourceMappingURL=transformColumn.js.map