"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformEmbed(node) {
    const format = node.format || {};
    const nastNode = {
        id: node.id,
        type: node.type === 'video'
            ? 'video' : 'embed',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        width: format.block_width || 9999,
        source: format.display_source || '#',
        fullWidth: typeof format.block_full_width !== 'undefined'
            ? format.block_full_width : false,
        pageWidth: typeof format.block_page_width !== 'undefined'
            ? format.block_page_width : false,
        aspectRatio: format.block_aspect_ratio || 0.562,
        preserveScale: typeof format.block_preserve_scale !== 'undefined'
            ? format.block_preserve_scale : true
    };
    return nastNode;
}
exports.default = transformEmbed;
//# sourceMappingURL=transformEmbed.js.map