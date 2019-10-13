"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformStub(node) {
    const nastNode = {
        id: node.id,
        type: node.type,
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        raw: node
    };
    return nastNode;
}
exports.default = transformStub;
//# sourceMappingURL=transformStub.js.map