"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformCallout(node) {
    const nastNode = {
        id: node.id,
        type: 'callout',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        icon: utils_1.getBlockIcon(node),
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformCallout;
//# sourceMappingURL=transformCallout.js.map