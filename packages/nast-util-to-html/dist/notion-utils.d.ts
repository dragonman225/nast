declare function getPageIDFromNotionDatabaseURL(str: string): string;
declare function getBookmarkLinkFromNotionPageURL(str: string | undefined): string | undefined;
declare function getPageIDFromNotionPageURL(str: string): string;
declare function toDashID(str: string): string;
declare function isValidDashID(str: string): boolean;
/** Deprecated. Please use getBookmarkLinkfromNotionPageURL() instead. */
declare function convertNotionURLToLocalLink(str: string): string | undefined;
/** Deprecated. Please use getPageIDFromNotionPageURL() instead. */
declare function getPageIDfromNotionURL(str: string): string;
export { getPageIDFromNotionDatabaseURL, getBookmarkLinkFromNotionPageURL, getPageIDFromNotionPageURL, toDashID, isValidDashID, convertNotionURLToLocalLink, // Deprecated
getPageIDfromNotionURL };
//# sourceMappingURL=notion-utils.d.ts.map