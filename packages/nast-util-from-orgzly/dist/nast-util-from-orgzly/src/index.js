"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orga_1 = require("orga");
const unist_util_visit_1 = __importDefault(require("unist-util-visit"));
function orgStringToNast(str) {
    let ast = orga_1.parse(str);
    unist_util_visit_1.default(ast, transformNode);
    return ast;
}
exports.orgStringToNast = orgStringToNast;
function transformNode(node) {
    /** Populate general props */
    if (!node.children)
        node.children = [];
    node.id = '';
    node.createdTime = 0;
    node.lastEditedTime = 0;
    switch (node.type) {
        case 'root':
            node.type = 'page';
            delete node.meta;
            break;
        case 'paragraph':
            node.type = 'text';
            node.text = [[node.children[0].value]];
            node.children = []; // There should be no other section in paragraph
            break;
        case 'section':
            node.type = 'toggle';
            node.text = [[node.children[0].children[0].value]]; // Use headline as title.
            node.children.shift(); // Remove headline
            break;
        case 'list':
            if (node.ordered) {
                node.type = 'numbered_list';
            }
            else {
                node.type = 'bulleted_list';
            }
            break;
        case 'list.item':
            if (node.parent.ordered) {
                node.type = 'numbered_list_item';
            }
            else {
                node.type = 'bulleted_list_item';
            }
            node.text = [[node.children[0].value]];
            node.children = [];
            break;
        default:
            console.log(`Unsupported type ${node.type}`);
            console.log(node);
    }
    if (node.level)
        delete node.level;
    delete node.parent;
}
//# sourceMappingURL=index.js.map