"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformAudio(node) {
    const nastNode = {
        id: node.id,
        type: 'audio',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        source: node.properties
            ? node.properties.source
                ? node.properties.source[0][0]
                : '#'
            : '#'
    };
    return nastNode;
}
exports.default = transformAudio;
//# sourceMappingURL=transformAudio.js.map