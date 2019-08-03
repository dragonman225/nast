"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformColumn(node) {
    let nastNode = {
        id: node.id,
        type: 'column',
        color: utils_1.getBlockColor(node),
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
