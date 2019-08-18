import Nast from 'notajs-types/nast';
import Notion from 'notajs-types/notion';
/**
 * Render children nodes.
 * @param {*} nodeArray - Children nodes to render.
 * @param {*} renderNext - Render controller that will assign a node to
 * a corresponding render function when iterating through nodeArray.
 * @returns {String} HTML.
 */
declare function renderChildren(nodeArray: Nast.Block[], renderNext: Function): string;
/**
 * Render a block.
 * @param {Block} node
 * @param {String} contentHTML
 * @returns {String}
 */
declare function renderBlock(node: Nast.Block, contentHTML: string, tag?: string): string;
/**
 * Render styled strings.
 * @param {StyledString[]} titleTokens
 * @returns {String} HTML
 */
declare function renderTitle(titleTokens?: Notion.StyledString[], isCode?: boolean, lang?: string): string;
/**
 * Map color string in NAST to another string that is intended to use
 * as a CSS class.
 * @param {String} str
 * @returns {String}
 */
declare function renderColor(str: string): string;
/**
 * Escape special characters in a string.
 * @param {String} str
 * @returns {String}
 */
declare function escapeString(str: string): string;
/**
 * Add BulletedList and NumberedList helper blocks to the tree,
 * so it's easier to render.
 * @param treeRoot
 */
declare function preRenderTransform(treeRoot: Nast.Block): Nast.Block;
export { renderChildren, renderBlock, renderTitle, renderColor, escapeString, preRenderTransform };
//# sourceMappingURL=render-utils.d.ts.map