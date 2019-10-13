"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformEquation(node) {
    const nastNode = {
        id: node.id,
        type: 'equation',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        latex: node.properties
            ? node.properties.title
                ? node.properties.title[0][0]
                : ''
            : ''
    };
    return nastNode;
}
exports.default = transformEquation;
//# sourceMappingURL=transformEquation.js.map