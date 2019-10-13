"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformDivider(node) {
    const nastNode = {
        id: node.id,
        type: 'divider',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: []
    };
    return nastNode;
}
exports.default = transformDivider;
//# sourceMappingURL=transformDivider.js.map