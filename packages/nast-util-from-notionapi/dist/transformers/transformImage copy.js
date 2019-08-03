"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformImage(node) {
    let format = node.format;
    let nastNode = {
        id: node.id,
        type: 'image',
        color: utils_1.getBlockColor(node),
        children: [],
        width: format
            ? format.block_width
                ? format.block_width
                : 9999
            : 9999,
        source: format
            ? format.display_source
                ? format.display_source
                : '#'
            : '#',
        fullWidth: format
            ? format.block_full_width
                ? format.block_full_width
                : false
            : false,
        pageWidth: format
            ? format.block_page_width
                ? format.block_page_width
                : false
            : false
    };
    return nastNode;
}
exports.default = transformImage;
