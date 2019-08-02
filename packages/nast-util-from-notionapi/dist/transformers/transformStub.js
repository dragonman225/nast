"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformStub(node) {
    let nastNode = {
        id: node.id,
        type: node.type,
        color: utils_1.getBlockColor(node),
        children: []
    };
    return nastNode;
}
exports.default = transformStub;
