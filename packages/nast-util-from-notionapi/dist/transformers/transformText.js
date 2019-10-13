"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformText(node) {
    const nastNode = {
        id: node.id,
        type: 'text',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformText;
//# sourceMappingURL=transformText.js.map