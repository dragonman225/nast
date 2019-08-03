"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformColumnList(node) {
    let nastNode = {
        id: node.id,
        type: 'column_list',
        color: utils_1.getBlockColor(node),
        children: []
    };
    return nastNode;
}
exports.default = transformColumnList;
