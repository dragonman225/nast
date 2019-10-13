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
/**
 * Get emoji character or public accessible URL of the icon of a block
 * @param node - A Notion block
 */
function getBlockIcon(node) {
    let icon = node.format
        ? node.format.page_icon
        : undefined;
    if (icon) {
        icon = convertImageUrl(icon);
    }
    return icon;
}
exports.getBlockIcon = getBlockIcon;
/**
 * Convert an image source string to a public accessible URL
 * @param url - Image URL
 * @param width - Image width
 */
function convertImageUrl(url, width) {
    const prefixS3 = /^https:\/\/s3/;
    const prefixBuiltIn = /^\/image/;
    let rUrl;
    if (prefixS3.test(url)) {
        const cleanUrl = url.split('?')[0].replace('s3.us-west', 's3-us-west');
        rUrl = `https://notion.so/image/${encodeURIComponent(cleanUrl)}`;
    }
    else if (prefixBuiltIn.test(url)) {
        rUrl = `https://notion.so${url}`;
    }
    else {
        rUrl = url;
    }
    if (width) {
        return `${rUrl}?width=${width}`;
    }
    else {
        return rUrl;
    }
}
exports.convertImageUrl = convertImageUrl;
//# sourceMappingURL=utils.js.map