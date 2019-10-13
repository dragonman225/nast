"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformCode(node) {
    const props = node.properties || {};
    const format = node.format || {};
    const nastNode = {
        id: node.id,
        type: 'code',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node),
        language: props.language ? props.language[0][0] : undefined,
        wrap: typeof format.code_wrap !== 'undefined'
            ? format.code_wrap : false
    };
    return nastNode;
}
exports.default = transformCode;
//# sourceMappingURL=transformCode.js.map