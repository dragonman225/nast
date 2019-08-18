"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dashIDLen = '0eeee000-cccc-bbbb-aaaa-123450000000'.length;
const noDashIDLen = '0eeee000ccccbbbbaaaa123450000000'.length;
function getPageIDFromNotionDatabaseURL(str) {
    const re = /https:\/\/www.notion.so\/([\da-f]+)\?v=([\da-f]+)/;
    const found = str.match(re);
    if (found != null && found[1] != null) {
        let dashID = toDashID(found[1]);
        return dashID;
    }
    else {
        throw new Error(`Cannot get pageID from ${str}.`);
    }
}
exports.getPageIDFromNotionDatabaseURL = getPageIDFromNotionDatabaseURL;
function getBookmarkLinkFromNotionPageURL(str) {
    if (!str)
        return str;
    let re = /https:\/\/www.notion.so\/.+#([\da-f]+)/;
    let found = str.match(re);
    if (found != null && found[1] != null) {
        let dashID = toDashID(found[1]);
        return `#${dashID}`;
    }
    else {
        return str;
    }
}
exports.getBookmarkLinkFromNotionPageURL = getBookmarkLinkFromNotionPageURL;
function getPageIDFromNotionPageURL(str) {
    let lastStrInUrl = str.split('/').pop();
    let pageID = lastStrInUrl
        ? lastStrInUrl.split('-').pop() : '';
    if (pageID && pageID.length === noDashIDLen) {
        return toDashID(pageID);
    }
    else {
        return str;
    }
}
exports.getPageIDFromNotionPageURL = getPageIDFromNotionPageURL;
function toDashID(str) {
    if (isValidDashID(str)) {
        return str;
    }
    let s = str.replace(/-/g, '');
    if (s.length !== noDashIDLen) {
        return str;
    }
    let res = str.substring(0, 8) + '-' + str.substring(8, 12) + '-' + str.substring(12, 16) + '-' + str.substring(16, 20) + '-' + str.substring(20);
    return res;
}
exports.toDashID = toDashID;
function isValidDashID(str) {
    if (str.length !== dashIDLen) {
        return false;
    }
    if (str.indexOf('-') === -1) {
        return false;
    }
    return true;
}
exports.isValidDashID = isValidDashID;
/** Deprecated. Please use getBookmarkLinkfromNotionPageURL() instead. */
function convertNotionURLToLocalLink(str) {
    return getBookmarkLinkFromNotionPageURL(str);
}
exports.convertNotionURLToLocalLink = convertNotionURLToLocalLink;
/** Deprecated. Please use getPageIDFromNotionPageURL() instead. */
function getPageIDfromNotionURL(str) {
    return getPageIDFromNotionPageURL(str);
}
exports.getPageIDfromNotionURL = getPageIDfromNotionURL;
//# sourceMappingURL=notion-utils.js.map