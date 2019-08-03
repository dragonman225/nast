"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformQuote(node) {
    let nastNode = {
        id: node.id,
        type: 'quote',
        color: utils_1.getBlockColor(node),
        children: [],
        text: utils_1.getBlockTitle(node)
    };
    return nastNode;
}
exports.default = transformQuote;
