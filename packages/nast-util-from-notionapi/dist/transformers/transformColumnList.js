"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformColumnList(node) {
    const nastNode = {
        id: node.id,
        type: 'column_list',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: []
    };
    return nastNode;
}
exports.default = transformColumnList;
//# sourceMappingURL=transformColumnList.js.map