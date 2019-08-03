"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformImage(node) {
    let format = node.format || {};
    let nastNode = {
        id: node.id,
        type: 'image',
        color: utils_1.getBlockColor(node),
        children: [],
        width: format.block_width || 9999,
        source: format.display_source || '#',
        fullWidth: typeof format.block_full_width !== 'undefined'
            ? format.block_full_width : false,
        pageWidth: typeof format.block_page_width !== 'undefined'
            ? format.block_page_width : false
    };
    return nastNode;
}
exports.default = transformImage;
