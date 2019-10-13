"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformImage(node) {
    const format = node.format || {};
    const nastNode = {
        id: node.id,
        type: 'image',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        width: format.block_width || 9999,
        source: format.display_source
            ? utils_1.convertImageUrl(format.display_source, format.block_width) : '#',
        fullWidth: typeof format.block_full_width !== 'undefined'
            ? format.block_full_width : false,
        pageWidth: typeof format.block_page_width !== 'undefined'
            ? format.block_page_width : false
    };
    return nastNode;
}
exports.default = transformImage;
//# sourceMappingURL=transformImage.js.map