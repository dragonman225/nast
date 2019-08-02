"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformPage(node) {
    let nastNode = {
        id: node.id,
        type: 'page',
        color: utils_1.getBlockColor(node),
        children: [],
        title: utils_1.getBlockTitle(node)[0][0],
        icon: node.format
            ? node.format.page_icon
            : undefined,
        cover: node.format
            ? node.format.page_cover
            : undefined,
        fullWidth: node.format
            ? node.format.page_full_width
            : false,
        coverPosition: node.format
            ? node.format.page_cover_position
            : 1
    };
    return nastNode;
}
exports.default = transformPage;
