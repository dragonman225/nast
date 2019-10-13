"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getBlockColor(node) {
    const color = node.format
        ? node.format['block_color']
        : undefined;
    return color;
}
exports.getBlockColor = getBlockColor;
function getBlockTitle(node) {
    const title = node.properties
        ? node.properties.title
            ? node.properties.title
            : []
        : [];
    return title;
}
exports.getBlockTitle = getBlockTitle;
function getBlockIcon(node) {
    const icon = node.format
        ? node.format.page_icon
        : undefined;
    return icon;
}
exports.getBlockIcon = getBlockIcon;
//# sourceMappingURL=utils.js.map