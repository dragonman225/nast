"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformMath(node) {
    let nastNode = {
        id: node.id,
        type: 'equation',
        color: utils_1.getBlockColor(node),
        children: [],
        latex: node.properties
            ? node.properties.title
                ? node.properties.title[0][0]
                : ''
            : ''
    };
    return nastNode;
}
exports.default = transformMath;
