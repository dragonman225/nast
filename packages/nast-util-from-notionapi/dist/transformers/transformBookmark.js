"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformBookmark(node) {
    const props = node.properties || {};
    const format = node.format || {};
    const nastNode = {
        id: node.id,
        type: 'bookmark',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        link: props.link ? props.link[0][0] : '#',
        title: props.title ? props.title[0][0] : undefined,
        description: props.description ? props.description[0][0] : undefined,
        icon: format.bookmark_icon,
        cover: format.bookmark_cover,
    };
    return nastNode;
}
exports.default = transformBookmark;
//# sourceMappingURL=transformBookmark.js.map