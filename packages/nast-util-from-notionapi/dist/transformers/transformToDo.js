"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
async function transformToDo(node) {
    const nastNode = {
        id: node.id,
        type: 'to_do',
        color: utils_1.getBlockColor(node),
        createdTime: node.created_time,
        lastEditedTime: node.last_edited_time,
        children: [],
        text: utils_1.getBlockTitle(node),
        checked: node.properties
            ? node.properties.checked
                ? node.properties.checked[0][0] === 'Yes'
                : false
            : false
    };
    return nastNode;
}
exports.default = transformToDo;
//# sourceMappingURL=transformToDo.js.map