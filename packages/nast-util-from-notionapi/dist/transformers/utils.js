"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as Nast from '../types/nast'
function getBlockColor(node) {
    let color = node.format
        ? node.format['block_color']
        : undefined;
    return color;
}
exports.getBlockColor = getBlockColor;
function getBlockTitle(node) {
    let title = node.properties
        ? node.properties.title
            ? node.properties.title
            : []
        : [];
    return title;
}
exports.getBlockTitle = getBlockTitle;
function getBlockIcon(node) {
    let icon = node.format
        ? node.format.page_icon
        : undefined;
    return icon;
}
exports.getBlockIcon = getBlockIcon;
