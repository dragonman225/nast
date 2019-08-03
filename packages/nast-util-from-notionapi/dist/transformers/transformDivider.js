"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformDivider(node) {
    let nastNode = {
        id: node.id,
        type: 'divider',
        color: utils_1.getBlockColor(node),
        children: []
    };
    return nastNode;
}
exports.default = transformDivider;
