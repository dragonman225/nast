"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformPage(node) {
    const format = node.format || {};
    const nastNode = {
        id: node.id,
        type: 'page',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        title: utils_1.getBlockTitle(node)[0] ? utils_1.getBlockTitle(node)[0][0] : '',
        icon: utils_1.getBlockIcon(node),
        cover: format.page_cover ? utils_1.convertImageUrl(format.page_cover) : undefined,
        fullWidth: typeof format.page_full_width !== 'undefined'
            ? format.page_full_width : false,
        coverPosition: format.page_cover_position || 1,
        properties: node.properties
    };
    return nastNode;
}
exports.default = transformPage;
//# sourceMappingURL=transformPage.js.map