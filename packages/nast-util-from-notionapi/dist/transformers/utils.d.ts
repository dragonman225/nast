import * as Notion from 'notionapi-agent';
declare function getBlockColor(node: Notion.Block): string | undefined;
declare function getBlockTitle(node: Notion.Block): Notion.StyledString[];
/**
 * Get emoji character or public accessible URL of the icon of a block
 * @param node - A Notion block
 */
declare function getBlockIcon(node: Notion.Block): string | undefined;
/**
 * Convert an image source string to a public accessible URL
 * @param url - Image URL
 * @param width - Image width
 */
declare function convertImageUrl(url: string, width?: number): string;
export { getBlockColor, getBlockTitle, getBlockIcon, convertImageUrl };
//# sourceMappingURL=utils.d.ts.map