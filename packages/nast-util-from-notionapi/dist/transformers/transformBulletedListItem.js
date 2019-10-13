"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformBulletedListItem(node) {
    const nastNode = {
        id: node.id,
        type: 'bulleted_list_item',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformBulletedListItem;
//# sourceMappingURL=transformBulletedListItem.js.map